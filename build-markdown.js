var marked = require('marked')
  ,	fs = require('fs')
  ,	path = require('path')
  ,	SRC_DIR = 'src'
  ,	TARGET_DIR = 'target'

// fs.mkdir(TARGET_DIR)

var template = {
	before: fs.readFileSync('template/before.html'),
	after: fs.readFileSync('template/after.html')
}


var files = fs.readdirSync(SRC_DIR)

var html = '' + template.before + '\n'

for (index in files) {
	var file = files[index]
		,	md = fs.readFileSync(path.join(SRC_DIR, file)).toString()

	html += marked(md/*, { renderer: renderer }*/) + '\n'
}

html += template.after + '\n'

fs.writeFileSync('target/document.html', html)