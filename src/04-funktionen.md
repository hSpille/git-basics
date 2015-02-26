Funktionen
----------

```javascript
function add(a, b) { return a + b }
add(3, 4)  // => 7

var add = function(a, b) { return a + b }
add(3, 4)  // => 7
```

In JavaScript sind Funktionen "first-class citizens". Das bedeutet Funktionen können...
* einer Variablen zugewiesen werden.
* Funktionen als Parameter übergeben werden.
* von einer Funktion als Rückgabewert übergeben werden.
* in einer Datenstruktur gespeichert und zur Laufzeit erzeugt werden
* als anonyme Funktionen erzeugt werden

### Scope ###

In JavaScript (bis ES7) ist der Scope von Variablen immer bezogen auf eine Funktion.

```javascript
var fn = function() {
	for (var i = 0; i < 10; i++) {
	}

	console.log(i)  // Ausgabe: 10
}

fn()
console.log(i)  // Ausgabe: undefined
```

Dies kann in einer selbstausführenden Funktion genutzt werden, um Variablen und Funktionen zu kapseln:
```javascript
(function() {
	console.log('Hello World!')
})()  // <-- sorgt dafür, dass die Funktion direkt nach der Deklaration ausgeführt wird
```

Somit lässt sich beispielsweise eine Funktion schreiben, die mitzählt, wie oft sie selbst aufgerufen wurde:
```javascript
var counter = (function() {  // Diese Funktion wird zur Kapselung des Zählwertes genutzt.
	var anzahlAusfuehrungen = 0

	return function() {  // Die innere Funktion hat Zugriff auf den Scope der äußeren Funktion. Egal, wann und wo sie aufgerufen wird.
		console.log(++anzahlAusfuehrungen)
	}
})()  // Die äußere Funktion wird sofort aufgerufen und gibt die innere Funktion zurück.
```

### Closures/Callbacks ###
Dass Funktionen als Parameter übergeben werden können, wird häufig zur realisierung von asynchronen Programmabläufen genutzt.

Nicht nur in Node.js und jQuery is es möglich, auf bestimmte Events zu reagieren. Bereits der JS-Standard lässt dies zum Beispiel bei Timern zu. Hierzu wird das Event angegeben und eine Funktion (ein Callback), die ausgeführt wird, sobald das Event aufgetreten ist.

JavaScript
```javascript
console.log(1)
window.setTimeout(function() {
	console.log(3)
}, 1000)
console.log(2)

Ausgabe:
1
2
3
```

jQuery
```javascript
var onClickCallback = function() {
	console.log('ein Button wurde geklickt')	
}

$('button').click(onClickCallback)
// Die Funktion onClickCallback soll ausgeführt werden, wenn das click-Event auf einem Button-Element auftritt.


// Die Funktion kann auch inline (und anonym) definiert werden.
$('button').click(function() {
	console.log('ein Button wurde geklickt')	
})
```

Node.js
```javascript
var http = require('http')  // http-Library laden

var handleRequest = function (req, res) {
	res.write('Hello World!')  // dem Client antworten
	res.end()  // Verbindung schließen
}

http.createServer(handleRequest).listen(8080)
// Die Funktion handleRequest soll ausgeführt werden, wenn ein Client eine neue Verbindung aufgebaut hat.
```

Das gleiche Verfahren wird auch in dem oben aufgeführten Beispiel genutzt:
```javascript
// per forEach-Funktion über Einträge iterieren
arr.forEach(function(obj, index, referenceToArr) {
})
```