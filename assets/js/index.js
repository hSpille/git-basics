var buildIndex = function(selector) {
	var ul = document.createElement('ul')

	  ul.className = 'nav nav-pills nav-stacked'

	var ueberschriften = document.querySelectorAll('h2, h3')
	for (var i = 0; i < ueberschriften.length; i++) {
		var ueberschrift = ueberschriften[i]
		  ,	li = document.createElement('li')
		  ,	a = document.createElement('a')

		li.appendChild(a)
		li.role = 'presentation'

		inhalt = {
			title: ueberschrift.innerText,
			level: (''+ueberschrift.tagName).substring(1),
			id: ueberschrift.id
		}

		a.innerText = inhalt.title
		a.href = '#'+inhalt.id
		li.className = 'level-'+inhalt.level

		ul.appendChild(li)
	}

	var inhaltUeberschrift = document.querySelector(selector)
	inhaltUeberschrift.parentNode.insertBefore(ul, inhaltUeberschrift)
}