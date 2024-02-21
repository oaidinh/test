// import React, { Component } from 'react'
// import { Button, Linking, Text, View } from 'react-native'

// import WebView from 'react-native-webview'

// const HTML = `
// <!DOCTYPE html>\n
// <html>
//   <head>
//     <title>Context Menu</title>
//     <meta http-equiv="content-type" content="text/html charset=utf-8">
//     <meta name="viewport" content="width=320, user-scalable=no">
//     <style type="text/css">
//       body {
//         margin: 0
//         padding: 0
//         font: 62.5% arial, sans-serif
//         background: #ccc
//       }
//     </style>
//     <script>
//       //script to clear selection/highlight
//       const messageEventListenerFn = (e) =>{
//         try{  
//           if(e.origin === '' && typeof window.ReactNativeWebView === 'object'){
//             const parsedData = JSON.parse(e.data)  
//             if(parsedData?.what === 'clearSelection'){
//               window.getSelection()?.removeAllRanges()
//             }
//           }
//         }catch(e){
//           console.log('External: ', 'exception in eventListener: ', e.message)
//         } 
//       }
//       window.addEventListener('message', (e) => messageEventListenerFn(e))
//       document.addEventListener('message', (e) => messageEventListenerFn(e))
//     </script>
//   </head>
//   <body>
//     <p>
//       Select the text to see the custom context menu.
//     </p>
//     <p>
//       The custom context menu will show the custom menus defined in the menuItems prop and call the onCustomMenuSelection
//       on clicking on the menu Item. Testing symbols ' " < & > + - = ^ % $ # @ ! ~  :  ? 
//     </p>
//     <p>
//       "Third Para with quotes"
//     </p>
//   </body>
// </html>
// `


// // export default class CustomMenu extends Component<Props, State> {
// export default CustomMenu = () => {
//   const [selectionInfo, setSelectionInfo] = React.useState(null)
//   const webviewRef = React.useRef()

//   return (
//     <View>
//       <View style={{ height: 120 }}>
//         <WebView
//           ref={webviewRef}
//           source={{ html: HTML }}
//           automaticallyAdjustContentInsets={false}
//           menuItems={[{ label: 'Highlight', key: 'highlight' }, { label: 'Strikethrough', key: 'strikethrough' }]}
//           onCustomMenuSelection={(webViewEvent) => {
//             const { label, key, selectedText } = webViewEvent.nativeEvent
//             setSelectionInfo(webViewEvent.nativeEvent)
//             // clearing the selection by sending a message. This would need a script on the source page to listen to the message.
//             webviewRef.current?.postMessage(JSON.stringify({ what: 'clearSelection' }))
//           }}
//         />
//       </View>
//       {selectionInfo
//         && <Text>
//           onCustomMenuSelection called: {"\n"}
//           - label: {selectionInfo?.label}{"\n"}
//           - key: {selectionInfo?.key}{"\n"}
//           - selectedText: {selectionInfo?.selectedText}
//         </Text>
//       }
//     </View>
//   )
// }

import React, { useState } from 'react'
import { View, TouchableOpacity, Dimensions, Text } from 'react-native'

const { height } = Dimensions.get('window')
const sections = [
  { name: 'contents', icon: 'book-open' },
  { name: 'search', icon: 'search' },
  { name: 'settings', icon: 'settings' },
  { name: 'bookmark', icon: 'bookmark' }
]

const Content = () => {

  return (
    <View><Text>Content</Text></View>
  )

}
const BookSearch = () => {

  return (
    <View><Text>BookSearch</Text></View>
  )

}
const Settings = () => {

  return (
    <View><Text>Settings</Text></View>
  )

}

function CustomMenu(props) {
  const [currentSection, setCurrentSection] = useState('contents')

  function renderSection() {
    switch (currentSection) {
      case 'contents':
        return <Content {...props} />
      case 'search':
        return <BookSearch {...props} />
      case 'settings':
        return <Settings />
      default:
        return null
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>
        {sections.map(({ name, icon }, i) => (
          <TouchableOpacity
            onPress={() => setCurrentSection(name)}
            style={
              currentSection === name
                ? [styles.sectionButton, styles.selectedSectionButton]
                : styles.sectionButton
            }
            key={i}>
            <Text>{icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderSection()}
    </View>
  )
}

export default CustomMenu

const styles = {
  wrapper: {
    flex: 1,
    height,
    paddingTop: 10,
    paddingLeft: 15
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingBottom: 10
  },
  sectionButton: {
    height: 50,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedSectionButton: {
    borderColor: "red",
    borderBottomWidth: 2
  }
}