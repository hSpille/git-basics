git Grundlagen 
----------------------


### Verteiltes SCM ###

Git ist ein verteiltes Sourcecode Management System. Das heißt, es gibt nicht wie bei SVN oder CSV 'den einen' Server der in der Mitte steht und 
das Repository hält. Vielmehr ensteht bei jedem clone eine komplette kopie des git-repositories. 

Man unterscheidet zwischen dem lokalen Repository und den entfernten Repsitories, den sogenannten remotes. Es können jederzeit mehrere remotes auf unterschiedlichen ständen existieren. Zu allen kann commitet (svn commit) und auch gepullt (svn update) werden. 


<img src="remotes.png" alt="Git">

```bash
git clone [--template=<template_directory>]
	  [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
	  [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
	  [--dissociate] [--separate-git-dir <git dir>]
	  [--depth <depth>] [--[no-]single-branch]
	  [--recursive | --recurse-submodules] [--] <repository>
	  [<directory>]
```	 

Klonen eines Repo's mit clone

```bash
hspille@pc4065:~/$ cd /tmp
hspille@pc4065:/tmp$ mkdir gitA
hspille@pc4065:/tmp$ cd gitA
hspille@pc4065:/tmp/gitA$ git clone git@github.com:jclohmann/javascript-basics.git
Klone nach 'javascript-basics'...
remote: Counting objects: 154, done.
remote: Total 154 (delta 0), reused 0 (delta 0), pack-reused 154
Empfange Objekte: 100% (154/154), 287.06 KiB | 0 bytes/s, Fertig.
Löse Unterschiede auf: 100% (64/64), Fertig.
Prüfe Konnektivität... Fertig.
```

Klonen des geklonten repos
```bash
hspille@pc4065:/tmp/gitA$ cd ..
hspille@pc4065:/tmp$ mkdir gitB
hspille@pc4065:/tmp$ cd gitB
hspille@pc4065:/tmp/gitB$ git clone ../gitA/javascript-basics/
Klone nach 'javascript-basics'...
Fertig.
```

Beweis das es ein remote hat in /tmp/gitA
```bash
hspille@pc4065:/tmp/gitB$ cd javascript-basics/
hspille@pc4065:/tmp/gitB/javascript-basics$ git remote --v
origin	/tmp/gitB/../gitA/javascript-basics/ (fetch)
origin	/tmp/gitB/../gitA/javascript-basics/ (push)
hspille@pc4065:/tmp/gitB/javascript-basics$ 

```

### git status ###

Ähnlich wie bei SVN können mit git einzelne Dateien die verändert wurden in einem commit zusammengefasst werden. Um zu sehen welche Dateien für einen commit vorgemerkt sind, bietet sich 'git status' an.

```bash
hspille@pc4065:/tmp/gitA/javascript-basics/src$ git st
Auf Branch master
Ihr Branch ist auf dem selben Stand wie 'origin/master'.
Änderungen, die nicht zum Commit vorgemerkt sind:
  (benutzen Sie "git add <Datei>...", um die Änderungen zum Commit vorzumerken)
  (benutzen Sie "git checkout -- <Datei>...", um die Änderungen im Arbeitsverzeichnis zu verwerfen)

	geändert:       02-grundlagen-der-sprache.md

keine Änderungen zum Commit vorgemerkt (benutzen Sie "git add" und/oder "git commit -a")
```

Git gibt ausserdem Hinweise wie Dateien zum commit hinzugefügt bzw. wieder entfernt werden können. Würde man im obigen Status commiten, enthielte der commit nichts - git würde nicht commiten.



### git add ###

Um eine Datei einem Commit hinzuzufügen muss diese mittels git add ausgewählt werden. 
```bash
git add  [--verbose | -v] [--dry-run | -n] [--force | -f] [--interactive | -i] [--patch | -p]
	  [--edit | -e] [--[no-]all | --[no-]ignore-removal | [--update | -u]]
	  [--intent-to-add | -N] [--refresh] [--ignore-errors] [--ignore-missing]
	  [--] [<pathspec>...]
```

Konkret
```bash
git add 02-grundlagen-der-sprache.md
```

Einfacher arbeitet der Pararmeter -A. Dieser fuegt alle Dateien hinzu die geändert wurden rekursiv in allen enthaltenen Ordner aufsteigend vom aktuellen Ordner
```bash
git add -A .
```
Und hinterher prüfen mit status:
```bash
hspille@pc4065:/tmp/gitA/javascript-basics/src$ git status
Auf Branch master
Ihr Branch ist auf dem selben Stand wie 'origin/master'.
zum Commit vorgemerkte Änderungen:
  (benutzen Sie "git reset HEAD <Datei>..." zum Entfernen aus der Staging-Area)

	geändert:       02-grundlagen-der-sprache.md
hspille@pc4065:/tmp/gitA/javascript-basics/src$
```



### git commit ###

Durch einen commit fuegt man alle vorgemerkten Dateien in das lokale repository in den aktuellen Branch hinzu. Zu jedem commit wird ähnlich wie bei SVN ein Kommentar eingegeben. 

```bash
git commit [-a | --interactive | --patch] [-s] [-v] [-u<mode>] [--amend]
	   [--dry-run] [(-c | -C | --fixup | --squash) <commit>]
	   [-F <file> | -m <msg>] [--reset-author] [--allow-empty]
	   [--allow-empty-message] [--no-verify] [-e] [--author=<author>]
	   [--date=<date>] [--cleanup=<mode>] [--[no-]status]
	   [-i | -o] [-S[<key-id>]] [--] [<file>...]
```

Commiten der vorher vorgemerkten Dateien

```bash
hspille@pc4065:/tmp/gitA/javascript-basics/src$ git commit -m 'Some Changes'
[master a174710] Some Changes
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### git log ###

Um zu sehen ob ein commit erfolgte kann sich jeder die history eines Repositories anschauen. Git log ist hierzu das Werkzeug.

```bash
commit a1747103c09ef7d7ce580444492b5fef54fa3d37
Author: hspille <henning.spille@vit.de>
Date:   Thu Feb 26 14:09:13 2015 +0100

    Some Changes

commit a5210d0c0e32bb7d32cb50e641ed095e4f868daa
Author: jlohman <jan-christoph.lohmann@vit.de>
Date:   Tue Feb 3 11:58:16 2015 +0100

    Events

commit f733be79d299dca086b3f0d0fe4844fc795d5453
Author: jlohman <jan-christoph.lohmann@vit.de>
Date:   Fri Jan 23 14:40:55 2015 +0100

    Vererbung

	...

```

### git push remote/origin ###

Git push teilt das repository mit den remotes. Ist das lokale Repository synchron mit dem remote, können die Änderungen publiziert werden. 
Sollte es im Remote neuere commits geben z.B. durch einen anderen Entwickler, kann dies durch ein Rebase oder ein Merge-Commit gelöst werden. 

```bash
git push [--all | --mirror | --tags] [--follow-tags] [-n | --dry-run] [--receive-pack=<git-receive-pack>]
	   [--repo=<repository>] [-f | --force] [--prune] [-v | --verbose]
	   [-u | --set-upstream] [--signed]
	   [--force-with-lease[=<refname>[:<expect>]]]
	   [--no-verify] [<repository> [<refspec>...]]
```


Push bei Synchronen remotes. Status abfragen.

```bash
hspille@pc4065:/tmp/gitA/javascript-basics/src$ git st
Auf Branch master
Ihr Branch ist vor 'origin/master' um 1 Commit.
  (benutzen Sie "git push", um lokale Commits zu publizieren)
nichts zu committen, Arbeitsverzeichnis unverändert
hspille@pc4065:/tmp/gitA/javascript-basics/src$ 
```

Push von /tmp/gitB -> /tmp/gibA

```Beachte: Da /tmp/gitA kein bare repository ist darf der Branch in den gepusht wird nicht der sein, der gerade ausgecheckt ist.```

```bash
hspille@pc4065:/tmp/gitB/javascript-basics$ git push
Zähle Objekte: 3, Fertig.
Delta compression using up to 4 threads.
Komprimiere Objekte: 100% (3/3), Fertig.
Schreibe Objekte: 100% (3/3), 292 bytes | 0 bytes/s, Fertig.
Total 3 (delta 2), reused 0 (delta 0)
To /tmp/gitB/../gitA/javascript-basics/
   a5210d0..915990c  master -> master
```

```javascript
for (/* Initialisierung */; /* Bedingung */; /* Iteration */) {
	// Statement
}

for (var i = 0; i < array.length; i++) {
	var item = array[i]
	console.log(item)
}
```

```javascript
do {
	// Statement
} while (/* Bedingung */)
```

<div class="panel panel-info">
<div class="panel-heading">
	Aufgabe: Schleifen
</div>
<div class="panel-body">
	Schreibe eine Funktion, die die Summe der Zahlen von 1 bis 100 ausgibt.
</div>
<div class="panel-footer">
	Erwartetes Ergebnis: 5050
</div>
</div>

### Arrays ###

JavaScript-Arrays können als einfache Listen betrachtet werden. Sie besitzen keine initial festgelegte Größe, sondern lassen sich dynamisch erweitern. Sie können Daten von verschiedenen Typen beinhalten.

Erzeugen von Arrays
```javascript
var arr = [ 'wert1', 'wert2', 'foo', 'bar' ]

var leeresArray = []

var gemischtesArray = [ 'string', 1, 3.141592653589793 ]
```

Zugriff auf einzelne Elemente
```javascript
console.log(arr[3])  // Ausgabe: 'foo'
```

Hinzufügen und entfernen von Elementen
```javascript
arr.push('test')  // => [ 'wert1', 'wert2', 'foo', 'bar', 'test' ]

arr.splice(2, 1)  // => 'foo'
arr  // => [ 'wert1', 'wert2', 'bar', 'test' ]
```

Join & Split
```javascript
var str = 'Hello World'

var arr = str.split('')  // => [ 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd' ]

var newStr = arr.join('')  // => 'Hello World'
```

<div class="panel panel-info">
<div class="panel-heading">
	Aufgabe: Arrays, Join &amp; Split
</div>
<div class="panel-body">
	Schreibe eine Funktion, die das lägste Wort im folgenden Satz ausgibt:<br>
	JavaScript ist eine Skriptsprache, die ursprünglich für dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen auszuwerten, Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten von HTML und CSS zu erweitern.
</div>
<div class="panel-footer">
	wort: 'Benutzerinteraktionen', laenge: 21
</div>
</div>

Iterieren
```javascript
// Schleife über Anzahl Einträge
for (var i = 0; i < arr.length; i++) {
	var obj = arr[i]
}

// Über Index iterieren
for (i in arr) {
	var obj = arr[i]
}

// per forEach-Funktion über Einträge iterieren
arr.forEach(function(obj, index, referenceToArr) {
})
```

Mappen und Filtern

Auch durch die Nutzung von Closures und die Funktionen ```Array.prototype.map(..)``` und ```Array.prototype.filter(..)``` lassen sich Arrays modifizieren.

```javascript
var artikelListe = [
	{ nr: 1, name: 'Artikel 1', kategorie: 1 },
	{ nr: 2, name: 'Artikel 2', kategorie: 1 },
	{ nr: 3, name: 'Artikel 3', kategorie: 2 },
	{ nr: 4, name: 'Artikel 4', kategorie: 2 },
	{ nr: 5, name: 'Artikel 5', kategorie: 3 },
	{ nr: 6, name: 'Artikel 6', kategorie: 1 },
]


// map
var artikelnamen = artikelListe.map(function(artikel) {  // wird für jeden Eintrag aufgerufen
	return artikel.name  // nur den Namen zurückgeben
})
// ```artikelnamen``` enthält eine Liste von Strings 'Artikel 1', 'Artikel 2', ...


// filter
var artikelKategorieEins = artikelListe.filter(function(artikel) {  // wird für jeden Eintrag aufgerufen
	return artikel.kategorie == 1  // gibt true für Kategorie 1 zurück
})
// ```artikelKategorieEins``` enthält nur Artikel, bei denen ```kategorie == 1``` ist.

// ```artikelListe``` bleibt unverändert
```

### Objekte ###

Erzeugen von Objekten
```javascript
var obj = new Object()

var obj = {}

var obj = {
	attribut: 'wert',
	foo: 'bar',
	setFoo: function(newFoo) { this.foo = newFoo }
}

obj.setFoo('test')

console.log(obj)  // Ausgabe: { attribut: 'wert', foo: 'test', setFoo: [Function] }
```
```attribut``` und ```foo``` werden Properties genannt, setFoo ist eine Methode des Objektes.
Die Objekte wurden nicht aus Klassen erzeugt. Sie sind vom Typ ```Object```.


