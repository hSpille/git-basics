Aufruf von JavaScript
---------------------

JavaScript-Interpreter finden sich
* im Browser
* in Shells
* in Serverprozessen

### im Browser
Jeder aktuelle Webbrowser besitzt einen integrierten JavaScript-Interpreter. Mit diesem können in HTML-Seiten eingebettete Skripte ausgeführt werden.
In diesem Interpreter stehen dem Entwickler verschiedene APIs zur Verfügung, die durch das Skript genutzt werden können.

Skripte werden über das ```script```-Tag eingebunden:
```html
<html>
...
<body>
	<!-- externe Skriptdatei -->
	<script src="meinSkript.js"></script>

	<!-- inline JavaScript -->
	<script>
		alert('test')
	</script>
</body>
</html>
```
Die Attribute ```type``` und ```language``` werden mittlerweile nicht mehr benötigt.

Die wichtigste API, die zur Verfügung steht, ist die DOM-API.
Mit dieser lassen sich Elemente im HTML-Dokument manipulieren.

Weitere interessante APIs wurden vor allem durch den HTML5-Standard integriert. Bsp: Canvas, LocalStorage und Device Orientation

### als lokaler Prozess (z.B. auf dem Server)

Es gibt verschiedene JavaScript-Implementierungen, mit denen sich Skripte als lokaler Prozess außerhalb des Browsers ausführen lassen. Dazu gehören die Rhino-Engine von Mozilla, die Nashorn-Engine von Oracle und Node.js von Ryan Dahl.

Node.js ist eine JS-Umgebung, die auf den Einsatz auf Servern optimiert ist. Damit ist es möglich sowohl Webserver-, als auch -anwendung in JavaScript zu implementieren.

Node.js und Rhino ermöglichen es jeweils eine .js-Datei oder direkt aus einer Shell Code auszuführen.