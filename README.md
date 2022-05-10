# nodejs_auth_roles
Donc, je voudrais faire quelques routes dans une API qui vous montrera les différentes données de base sur le rôle de l'utilisateur, définies dans MongoDB. Voici un échantillon de ce que j'ai en ce moment, il fonctionne...
# Explication :
Le premier middleware est utilisé pour vérifier l’authentification du client lorsque le serveur démarre et que le 
client entre l’adresse localhost. Initialement, req.headers.authorization.split(' ')[1]  n’est pas défini et la fonction de rappel next() 
renvoie un code d’état 401 pour un accès non autorisé au navigateur. Le client renseigne les identifiants et les identifiants 
chiffrés au format base64. Après cela, il décrypte les données au format base64 qui contiennent le nom d’utilisateur 
et le mot de passe, puis après avoir vérifié que le nom d’utilisateur et le mot de passe sont corrects, la méthode next()
appelle le prochain middleware qui est mentionné sous le middleware d’authentification,
sinon le formulaire d’authentification apparaît encore et encore .

# Modèle de sécurité des autorisations utilisateur Node.js + Express.js + jwt

Nous avons une application qui a deux types d'utilisateurs. Selon la 
façon dont l'utilisateur se connecte, nous voulons qu'il ait accès à différentes parties de l'application.

j'ai implémenté un modèle de sécurité pour empêcher de supprimer les utilisateurs  ils n'ont pas accès sauf vous avez été admin .

nous faisons de la sécurité une partie intégrante de la mise en œuvre de chaque route .
