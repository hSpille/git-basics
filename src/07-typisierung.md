dynamische Typisierung
----------------------

<!-- TypeOf-Operator
```javascript
typeof 'foo'  // 'string'

typeof 3  // 'number'

typeof new Object()  // => 'object'
typeof {}  // => 'object'

typeof []  // => 'object'

typeof function() { console.log('Hello World') }  // => 'function'
typeof console.log  // => 'function'
``` -->

<!-- Duck-Typing

Wenn es aussieht wie eine Ente und klingt wie eine Ente, ist es wahrscheinlich auch eine Ente.
```javascript
var arr = {
	foo: 'bar'
}

if (arr.push && arr.slice && arr.join) {
	// arr ist wahrscheinlich ein Array
}
``` -->

Zahlen zu Strings wandeln
```javascript
var string = 'abc' + 3  // => 'abc3'
var string = 'abc' + 3 + 5  // => 'abc35'
var string = 'abc' + (3 + 5)  // => 'abc8'
```

Strings zu Zahlen wandeln
```javascript
var nichtAcht = '3' + 5  // => 35
var acht = Number('3') + 5  // => 8
var acht = 1 * '3' + 5  // => 8
```

### Prototypen/Klassen ###

Konstruktor
```javascript
var Auto = function() {}

var auto = new Auto()  // Es wird ein Kontext zurückgegeben, auf dem die Konstruktorfunktion aufgerufen wurde.

// auto ist vom Typ Auto
auto instanceof Auto  // => true

// typeof liefert trotzdem 'object'!
typeof auto  // => 'object'
```

Methoden
```javascript
var Auto = function() {}
Auto.prototype.fahre = function() {
	console.log('Brumm, brumm')
}

var auto = new Auto()
auto.fahre()
```

Attribute
```javascript
var Auto = function() {
	this.farbe = 'blau'  // farbe ist eine Instanzvariable
}
Auto.prototype.setFarbe = function(neueFarbe) {
	this.farbe = neueFarbe  // mit this kann darauf zugegriffen werden
}

var auto = new Auto()
console.log(auto.farbe)  // => 'blau'
console.log(auto.setFarbe('rot'))
console.log(auto.farbe)  // => 'rot'

var auto2 = new Auto()
console.log(auto2.farbe)  // => 'blau'
```

Vererbung (ein verbreiteter Weg der Vererbung)
```javascript
var Auto = function() {
}
Auto.prototype.fahre = function() {
	console.log('Brumm, brumm')
}

var Elektroauto = function() {
}

Elektroauto.prototype = new Auto()
Elektroauto.prototype.constructor = Elektroauto

Elektroauto.prototype.lade = function() {
	console.log('wird geladen')
}

var elektroauto = new Elektroauto()
elektroauto.fahre()
elektroauto.lade()

console.log(elektroauto instanceof Auto)  // => true
console.log(elektroauto instanceof Elektroauto)  // => true
```