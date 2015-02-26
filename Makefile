build: target/document.html

target/document.html: dependencies
	mkdir target 2> /dev/null | true
	cp -r assets/* target/
	node build-markdown.js

dependencies: node_modules

node_modules:
	npm install

open: build
	gnome-open target/document.html

clean:
	rm -rf target

full-clean: clean
	rm -rf node_modules