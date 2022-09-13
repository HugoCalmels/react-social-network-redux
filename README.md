# Clonebook 

### Lien permanent : https://clonebook-super.netlify.app 

Clonebook est un réseau social depuis lequel les utilisateurs peuvent partager leurs pensées et passions grace à des publications.

## Comment lancer l'application depuis le terminal
### 1. Backend ( Lien github : https://github.com/HugoCalmels/rails-api-social-network )
1. Télécharger l'application et ouvrir le dossier
2. Installer les dépendences en utilisant la commande `bundle install`
3. Créer la base de données, les associations, et générer des données aléatoires avec `rails db:create db:migrate db:seed`
4. Lancer le serveur avec `rails s`, l'application est hébergée sur http://localhost:3000
5. Pour tester si l'API fonctionne, se rendre sur http://localhost:3000/api/v1/getAllUsernames, une liste devrait apparaitre sous format JSON
6. Variables d'environnement :
#### Variables sur le .env de `dotenv` :
- SMTP_USER_NAME=*votre compte gmail avec double vérification*
- SMTP_PASSWORD=*votre mot de passe d'applications*
- FRONT_DOMAIN="https://clonebook-super.netlify.app" ou "http://localhost:3000"
#### Variables dans les credentials :
##### devise:
-    jwt_secret_key: *taper `rake secret` pour générer une clef aléatoire*
##### aws:
-    access_key_id: *Votre compte aws avec S3 & IAM*
-    secret_access_key: *Votre compte aws avec S3 & IAM*
    
### 2. Frontend ( Lien github : https://github.com/HugoCalmels/react-social-network-redux )
1. Télécharger l'application et ouvrir le dossier
2. Installer les dépendences en utilisant la commande `npm i`
3. Lancer le serveur avec `npm start`, et confirmer le port 3001
4. Se rendre sur http://localhost:3001 et créer un compte
5. Définir la variable d'environnement .env :
- REACT_APP_PROD_BACK_DOMAIN=https://clonebook-api.herokuapp.com ( quand l'API est herbergée en ligne )
ou
- REACT_APP_PROD_BACK_DOMAIN=http://localhost:3000 ( quand l'API est herbergée en local )

## Fonctionnalités 

### 1. Authentification 
1. L'utilisateur peut s'inscrire et se connecter
2. Si l'email ou le mot de passe rentré par l'utilisateur est incorrect, il est redirigé sur une seconde page de connexion
3. L'utilisateur peut rechercher son compte et envoyer un email de changement de mot de passe

### 2. Navbar
1. Une searchbar est disponible, avec une liste de tous les utilisateurs, une liste des amis de l'utilisateur connecté avatar compris, et une liste d'historique de recherches précédentes
2. Une notification apparait à chaque invitation recue
3. En créant son compte, l'utilisateur recoit 3 invitations aléatoires pour montrer le fonctionnement de l'application

### 3. Page acceuil
1. L'utilisateur peut créer une publication, avec texte et image
2. Chaque publication est modifiable, ou supprimable par l'auteur de la publication
3. Chaque publication est commentable et likable
4. Chaque commentaire est modifiable, ou supprimable par l'auteur du commentaire
5. Seuls les publications de l'auteur et celles de ses amis sont disponibles sur la Home page
6. Un menu des amis connectés au cours des 30 dernieres minutes est disponible

### 4. Page profil
1. L'utilisateur peut publier une photo de type bannière
2. L'utilisateur peut publier une photo de type avatar
3. Une liste d'amis est disponible avec un menu déroulant selon le nombre d'amis en commun
4. Un bouton est disponible pour ajouter, ou supprimer un ami
5. Une liste de publication filtrée seulement sur l'utilisateur est disponible
6. L'utilisateur a accès plusieurs galeries photos

### 5. Page amis 
1. L'utilisateur un autre accès à ses invitations recues
2. L'utilisateur a accès à une liste de suggestions
3. L'utilisateur est redirigé sur une page d'erreur si l'url est inconnue

## Extra notes
Beaucoup d'élements on été recopiés depuis Facebook originel
- Login / Register / Mot de passe perdu
- Les publications
- Créer ou modifier une publication
- La searchbar principale
- L'ensemble de l'architecture, les liens de navigation, les menus

La base de donnée est à 50 utilisateurs minimum, et la performance n'en souffre pas trop, nottament en ayant compressé toutes les images

## Dépendences 
- Ruby on Rails ( API )
- reduxjs/toolkit
- compress.js
- js-cookie

## A quoi ressemble l'application

![title](./src/assets/images/example.png)


