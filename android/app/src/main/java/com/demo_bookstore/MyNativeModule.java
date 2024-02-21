package com.demo_bookstore;


import static android.content.Context.TELEPHONY_SERVICE;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.Settings;
import android.telecom.Call;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.commons.io.FileUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import vn.mekosoft.drm.client.impl.DRMServiceImpl;
import vn.mekosoft.drm.client.service.DRMService;

public class MyNativeModule extends ReactContextBaseJavaModule {
    MyNativeModule(ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    private static final String SECRET_KEY = "mekosoft";
    private static final String SALT = "ctuebook";
    private static final String TAG = "DEBUG_EBOOK";
    private static final String userPasspharse = "admin";

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void nativeDecryptFile(String license,String path,Promise promise) throws Exception  {

        try {
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(license);
            JSONObject signature = (JSONObject) jsonObject.remove("signature");
            String signature_value = (String) signature.get("value");

            String strJson = jsonObject.toJSONString();
            strJson = strJson.replace("\\","");
            DRMService drmService = new DRMServiceImpl();
            boolean verifySignature = drmService.verifyContent(strJson.getBytes(), Base64.getDecoder().decode(signature_value));
            Log.i(TAG,"license-string="+strJson);
            Log.i(TAG,"signature_value="+signature_value);
            Log.i(TAG,"verifySignature="+verifySignature);
            if(!verifySignature) promise.reject("message","verifySignature="+verifySignature);

            //Tao userkey
//            String userKey =  userPasspharse ;//hash256(userPasspharse);
//            Log.i(TAG,"userKey="+userKey);
//            if(userKey == null) promise.reject("message","userKeyNull");

            //Giai ma contentKey
            JSONObject encryption = (JSONObject) jsonObject.get("encryption");
            JSONObject content_key = (JSONObject) encryption.get("content_key");
            String encrypted_content_key = (String) content_key.get("encrypted_value");
            Log.i(TAG,"encrypted_content_key="+encrypted_content_key);
            String userKey = userPasspharse;//admin
            String user = new String();
            String book = new String();
            String device = new String();

            //new String(Base64.getDecoder().decode(encrypted_content_key))
            byte[]  content_key_byte = drmService.decryptKey(userKey, encrypted_content_key, user, book, device);
            Log.i(TAG,"content_key="+new String(content_key_byte));

            //Giai ma file EPUB bang ContentKey
            byte[] epub_byte = drmService.decryptContent(FileUtils.readFileToByteArray(new File(path)), new String(content_key_byte));
            promise.resolve(Base64.getEncoder().encodeToString(epub_byte));
        }catch (Exception e) {
            Log.i(TAG,e.getMessage());
            promise.reject(e);
        }



    }

    public static String hash256(String originalString) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = digest.digest(
                originalString.getBytes(StandardCharsets.UTF_8));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getEncoder().encodeToString(encodedhash);
        }
        return null;
    }

    @ReactMethod
    public void nativeDecryptFileOld(String path,String secretKey ,Promise promise) {
//        File decryptedFile = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),"tamq.epub");
//        File encryptedFile = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)+"/"+fileName);
        File encryptedFile = new File(path);
        try {
            byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            IvParameterSpec ivspec = new IvParameterSpec(iv);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), SALT.getBytes(),4096 , 256); //65536
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivspec);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                byte[] data = FileUtils.readFileToByteArray(encryptedFile);
                byte[] decryptedByte = cipher.doFinal(data);
//                decrypted to file
//                Path decryptedPath = Files.write(decryptedFile.toPath(), decryptedByte);
//                Log.d(TAG, String.valueOf(decryptedPath));

//              decrypted to base64
                promise.resolve(Base64.getEncoder().encodeToString(decryptedByte));
            }

        } catch (Exception e) {
            //System.out.println("Error while decrypting: " + e.toString());
            e.printStackTrace();
            Log.e(TAG, String.valueOf(e));
            promise.reject(e);
        }

    }
}
