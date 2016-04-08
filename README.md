#Faire un chat sous socket.io(node.js) !

Une fois le repo cloné, il vous suffit de faire un 'npm install'. Une fois le repos prêt, lancez deux terminales. Dans le permier, écrivez "nodemonde index.js" dans le second "gulp watch".

Votre serveur est maintenant en ligne sur votre localhost au port 3000 !




On commence par faire un prompt pour récupérer le pseudo, on l'envoie au serveur (socket.emit) et on l'affiche dans le titre pour le style.
```
var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('newusr', pseudo);
document.title = pseudo + ' - ' + document.title;
```



Côté serveur, index.js, on va poser une écoute pour qu'à chaque connexion les fonctions s’exécutent. 

```
// A chaque connexion, ce code sera exécuté.

io.sockets.on('connection', function(socket, pseudo){
	console.log('New user');
	
//On pose une écoute avec le mot clef 'newusr'
// On lui donne en paramètre le pseudo puis nous encodons ce pseudo
// On le stock dans une variable puis on avertit tous les autres utilisateurs.
	
	socket.on('newusr', function(pseudo){
		pseudo = ent.encode(pseudo);
		socket.pseudo = pseudo;
		io.sockets.emit('newusr', pseudo);
	})
}); 
```

Maintenant que l’écoute est posée, on va récupérer tout ça sur le fichier client app.js.
```
// Grâce à notre mot clef 'newusr'  on a récupéré le pseudo et on l'affiche avec un append.  
socket.on('newusr', function(pseudo){
	$("#zone_tchat").append('<p><em>'+ pseudo + ' vient de se connecter</em></p>');
})
```

C'est parti pour les messages

```
// Dès qu'on reçoit un message,
// on récupère le pseudo de son auteur et on le transmet aux autres personnes.

socket.on('message', function (message) {
   message = ent.encode(message);
   socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
});
```

Notre fichier serveur est (déjà) fini ! Don't be sad, ils nous reste du travail côté client ! 

```
// Lorsqu'on envoie le formulaire,on récupère la valeur de l'input
// On emit le message et on l'affiche avec notre fonction insertMessage sur la page

 $('#formulaire_chat').submit(function () {
     var message = $('#message').val();
     socket.emit('message', message); // Transmet le message aux autres
     insereMessage(pseudo, message); // Affiche le message aussi sur notre page
     $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
     return false; // Permet de bloquer l'envoi "classique" du formulaire
 });
```


```
// Ajoute un message dans la page
function insereMessage(pseudo, message) {
     $('#zone_tchat').append('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
}

```
```
// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
insereMessage(data.pseudo, data.message)
})
```

Si tout va bien vous devriez avoir un tchat qui fonctionne (pseudo + message). Maintenant que vous avez tout compris :) vous allez pouvoir le personnaliser ! C'est la que le fun commence ! 

## Bonus  :
*Modifier la couleur du pseudo && || du message. // il suffit de comprendre a quel endroit du code on integre le pseudo.
*Afficher l'heure a l'envoi des messages. 
*Afficher la liste des utilisateurs connectes.
