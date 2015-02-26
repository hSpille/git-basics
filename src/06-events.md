Events
------

Die folgenden Beispiele funktionieren nur im Browser. In anderen Umgebungen wurde das Eventhandling anders gelöst.

Mit ```[element].addEventListener([typ], [handler])``` kann auf Events reagiert werden. Im MDN gibt es eine [Auflistung aller Events](https://developer.mozilla.org/en-US/docs/Web/Events).

Eventlistener registrieren
```javascript
document.addEventListener('resize', function(event) {
	console.log('Die Fenstergröße wurde geändert. Weitere Informationen finde ich im event.')
})

var button = document.querySelector('button')  // finde den ersten Button auf der Seite
button.addEventListener('click', function(event) {
	console.log('Der Button wurde geklickt.')
	var referenzZumButton = event.srcElement  // Referenz zum Element, welches das Event ausgelöst hat
})
```


### EventBubbling ###

Events, die nicht gefangen werden, "bubblen". D.h., sie werden zum Parent des Elements, an dem sie auftreten weitergegeben.
Werden sie dort ebenfalls nicht gefangen, werden sie wieder zum Parent-Element weitergegeben. usw.

Das hat den Vorteil, dass Events in einigen Fällen an höherer Stelle verarbeitet werden und damit mehrere Elemente abdecken können.

<div class="panel panel-info">
<div class="panel-heading">
	Aufgabe: Zugriff auf "Event-werfende" Elemente
</div>
<div class="panel-body">
	HTML-Vorgabe:
<pre>```
<div id="buttonContainer">
<button>0</button>
<button>0</button>
<button>0</button>
</div>
```</pre>
	Jeder der drei Buttons soll anzeigen, wie oft er geklickt wurde.

	Schreibe einen JavaScript-Handler, der sich auf das Element mit der id ```buttonContainer``` registriert. Bei einem Klick, soll die Zahl im Buttontext um eins erhöht werden.
</div>
</div>

### Eigene Events ###

Es gibt die Möglichkeit eigene Events zu definieren.

```javascript
setTimeout(function() {
	var event = new Event('kaffeeIstFertig')  // Event definieren
	window.dispatchEvent(event)  // Event am window-Element auslösen
}, 3000)

window.addEventListener('kaffeeIstFertig', function() {  // Eventlistener registieren
	console.log('Der Kaffee ist wohl fertig.')
	// tu etwas
})
```

CustomEvents ermöglichen auch die Weitergabe von weiteren Informationen.

```javascript
setTimeout(function() {
    var event = new CustomEvent('kaffeeIstFertig', {
        detail: {
            zucker: false,
            milch: true
        }
    })  // Event definieren
    window.dispatchEvent(event)  // Event auslösen
}, 3000)

window.addEventListener('kaffeeIstFertig', function(event) {  // Eventlistener registieren
    console.log('Der Kaffee ist fertig.')
    var detail = event.detail
    if (detail.zucker)
        console.log('mit Zucker')  // wird nicht ausgegeben
    if (detail.milch)
        console.log('mit Milch')
})
```