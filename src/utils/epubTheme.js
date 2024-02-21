let styles = {
	body: {
		background: '#fafafa',
		color: '#121212',
		'font-family': 'Default',
		'font-size': '100%',
		'line-height': 'normal'
	},
}

const themeToStyle = theme => {
	styles.body = {
		background: theme.bg,
		color: theme.color,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	}
	return styles
}

export default { themeToStyle }