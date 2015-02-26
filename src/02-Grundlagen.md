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

```Beachte: Da /tmp/gitA kein bare Repository ist darf der Branch in den gepusht wird nicht der sein, der gerade ausgecheckt ist. Bei git Servern - echten remotes - wie z.B. gitHub.com, existiert dieses Problem nicht.```

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


### git fetch ###

Um das lokale Repository zu aktualisieren, werden Änderungen von den remotes gefetcht. 

```bash
git fetch [<options>] [<repository> [<refspec>...]]
git fetch [<options>] <group>
git fetch --multiple [<options>] [(<repository> | <group>)...]
git fetch --all [<options>]
```


Der Schalter ```--all``` ermöglicht das gleichzeitige fetchen aller remote branches - hier der master und test1


```bash
hspille@pc4065:/tmp/gitB/javascript-basics$ git fetch --all
Fordere an von origin
remote: Zähle Objekte: 3, Fertig.
remote: Komprimiere Objekte: 100% (3/3), Fertig.
remote: Total 3 (delta 2), reused 0 (delta 0)
Entpacke Objekte: 100% (3/3), Fertig.
Von /tmp/gitB/../gitA/javascript-basics
   915990c..f1d2fe2  master     -> origin/master
 * [neuer Branch]    test1      -> origin/test1
```

#### git rebase - nach dem fetch

Sollte das lokale Repository's commit's enthalten die noch nicht im remote enthalten sind, bietet sich ein rebase an um kein merge-commit zu erzeugen. Auf diese weise bleibt der commit-tree maximal sauber. 

```bash
git rebase [-i | --interactive] [options] [--exec <cmd>] [--onto <newbase>]
	[<upstream> [<branch>]]
git rebase [-i | --interactive] [options] [--exec <cmd>] [--onto <newbase>]
	--root [<branch>]
git rebase --continue | --skip | --abort | --edit-todo
```

```bash
hspille@pc4065:/tmp/gitB/javascript-basics$ git rebase
Zunächst wird der Branch zurückgespult, um Ihre Änderungen
darauf neu anzuwenden...
master zu refs/remotes/origin/master vorgespult
```

### How rebase works

Angenommen die aktuelle Arbeitskopie auf dem gearbeitet wurde ist 'local'. Währenddessen wurde im remote weitergearbeitet, es wurden weitere commits gemacht, die nur im remote exisiteren. Gleichzeitig wurden im lokalen Repository commits gemacht die nicht im remote existieren. 
<pre>     
     	  A---B---C local
         /
    D---E---F---G remote
</pre>

Nach einem fetch und einem rebase wurden die lokalen commits 'umgezogen' auf den HEAD - rebased. 
<pre>     
     	  		 A---B---C local
     			/
    D---E---F---G remote
</pre>

Nach dem push sieht der Tree dann recht unspektakulär aus. 

<pre>     
    			
    D---E---F---G---A---B---C remote

</pre>

Anders wäre es bei einem direkten pull:
<pre>     
		  A---B---C
    	 /		   \
    D---E-----------F---G remote

</pre>

Dies führt schnell in die merge hölle:

<img src="merge.gif" style="max-width:600px" alt="Git">






