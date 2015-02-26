DOM
---

<blockquote>
	<p>The Document Object Model (DOM) is a programming interface for HTML, XML and SVG documents. It provides a structured representation of the document (a tree) and it defines a way that the structure can be accessed from programs so that they can change the document structure, style and content.</p>
	<footer>https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model</footer>
</blockquote>

Der gesamte Zugriff auf die HTML-Seite erfolgt über das [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)-Objekt.

### Elemente im Dokument suchen ###

Mit ```document.querySelector``` und ```document.querySelectorAll``` kann das Dokument nach Elementen durchsucht werden.

```javascript
var h2 = document.querySelector('h2')  // gibt das HTML-Element der ersten h2-Überschrift zurück

var p = document.querySelectorAll('p')  // gibt eine NodeList zurück, in der alle p-Elemente der Seite stehen
```

### Elemente erstellen, hinzufügen und entfernen ###

```javascript
var body = document.body

var div = document.createElement('div')  // erzeugt ein neues Element vom Typ div (ist noch nicht in der Seite)
div.innerText = 'ich bin ein div'  // einen Text in das div schreiben

body.appendChild(div)  // das div-Element in die Seite einfügen
```

```javascript
var h1 = document.querySelector('h1')  // sucht das erste h1-Element im Dokument
var parentOfH1 = h1.parentNode
parentOfH1.removeChild(h1)  // entfernt das Element aus dem Dokument
```

Jedes dieser Elemente (außer document) implementiert das Interface [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).