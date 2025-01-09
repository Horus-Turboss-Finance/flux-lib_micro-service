<div align="center">
  <h1>Cash Sight (flux-lib_micro-service api documentation)</h1>
  <h6>Micro-service gérant l'aspect financier des utilisateurs de cash sight.</h6>
  <a href="https://github.com/Horus-Turboss-Finance/flux-lib_micro-service/issues"><img alt="Issues" src="https://img.shields.io/github/issues/Horus-Turboss-Finance/flux-lib_micro-service?style=for-the-badge" /></a>
</div>

### Table des matières.
- [Packages](#packages)
  - [Dev-packages](#dev-packages)
  - [Packages](#packages-1)
- [Backend installation](#backend-installation)
- [Démarer le backend de l'application](#démarer-le-backend-de-lapplication)
- [API](#api)
  - [Budget](#budget)
    - [Create budget](#create-budget)
      - [URL](#url)
      - [Request Parameters :](#request-parameters-)
      - [*Exemple de requête*](#exemple-de-requête)
      - [Response Parameters :](#response-parameters-)
      - [*Exemple de réponse*](#exemple-de-réponse)
    - [Update Budget](#update-budget)
      - [URL](#url-1)
      - [Request Parameters :](#request-parameters--1)
      - [*Exemple de requête*](#exemple-de-requête-1)
      - [Response Parameters :](#response-parameters--1)
      - [*Exemple de réponse*](#exemple-de-réponse-1)
    - [Delete Budget](#delete-budget)
      - [URL](#url-2)
      - [Request Parameters :](#request-parameters--2)
      - [*Exemple de requête*](#exemple-de-requête-2)
      - [Response Parameters :](#response-parameters--2)
      - [*Exemple de réponse*](#exemple-de-réponse-2)
    - [Get All User Budget](#get-all-user-budget)
      - [URL](#url-3)
      - [*Exemple de requête*](#exemple-de-requête-3)
      - [Response Parameters :](#response-parameters--3)
      - [*Exemple de réponse*](#exemple-de-réponse-3)
    - [Get Budget By Id](#get-budget-by-id)
      - [URL](#url-4)
      - [*Exemple de requête*](#exemple-de-requête-4)
      - [Response Parameters :](#response-parameters--4)
      - [*Exemple de réponse*](#exemple-de-réponse-4)
    - [Create transaction budget](#create-transaction-budget)
      - [URL](#url-5)
      - [Request Parameters :](#request-parameters--3)
      - [*Exemple de requête*](#exemple-de-requête-5)
      - [Response Parameters :](#response-parameters--5)
      - [*Exemple de réponse*](#exemple-de-réponse-5)
  - [Categorie](#categorie)
    - [Create categorie](#create-categorie)
      - [URL](#url-6)
      - [Request Parameters :](#request-parameters--4)
      - [*Exemple de requête*](#exemple-de-requête-6)
      - [Response Parameters :](#response-parameters--6)
      - [*Exemple de réponse*](#exemple-de-réponse-6)
    - [Mise à jour d'une catéogorie](#mise-à-jour-dune-catéogorie)
      - [URL](#url-7)
      - [Request Parameters :](#request-parameters--5)
      - [*Exemple de requête*](#exemple-de-requête-7)
      - [Response Parameters :](#response-parameters--7)
      - [*Exemple de réponse*](#exemple-de-réponse-7)
    - [Delete categorie](#delete-categorie)
      - [URL](#url-8)
      - [Request Parameters :](#request-parameters--6)
      - [*Exemple de requête*](#exemple-de-requête-8)
      - [Response Parameters :](#response-parameters--8)
      - [*Exemple de réponse*](#exemple-de-réponse-8)
    - [Get all user categorie](#get-all-user-categorie)
      - [URL](#url-9)
      - [*Exemple de requête*](#exemple-de-requête-9)
      - [Response Parameters :](#response-parameters--9)
      - [*Exemple de réponse*](#exemple-de-réponse-9)
    - [Get categorie by id](#get-categorie-by-id)
      - [URL](#url-10)
      - [*Exemple de requête*](#exemple-de-requête-10)
      - [Response Parameters :](#response-parameters--10)
      - [*Exemple de réponse*](#exemple-de-réponse-10)
  - [Objectif](#objectif)
    - [Create objectif](#create-objectif)
      - [URL](#url-11)
      - [Request Parameters :](#request-parameters--7)
      - [*Exemple de requête*](#exemple-de-requête-11)
      - [Response Parameters :](#response-parameters--11)
      - [*Exemple de réponse*](#exemple-de-réponse-11)
    - [Update Objectif](#update-objectif)
      - [URL](#url-12)
      - [Request Parameters :](#request-parameters--8)
      - [*Exemple de requête*](#exemple-de-requête-12)
      - [Response Parameters :](#response-parameters--12)
      - [*Exemple de réponse*](#exemple-de-réponse-12)
    - [Delete objectif](#delete-objectif)
      - [URL](#url-13)
      - [Request Parameters :](#request-parameters--9)
      - [*Exemple de requête*](#exemple-de-requête-13)
      - [Response Parameters :](#response-parameters--13)
      - [*Exemple de réponse*](#exemple-de-réponse-13)
    - [Update wallet objectif](#update-wallet-objectif)
      - [URL](#url-14)
      - [Request Parameters :](#request-parameters--10)
      - [*Exemple de requête*](#exemple-de-requête-14)
      - [Response Parameters :](#response-parameters--14)
      - [*Exemple de réponse*](#exemple-de-réponse-14)
    - [Get all user objectif](#get-all-user-objectif)
      - [URL](#url-15)
      - [*Exemple de requête*](#exemple-de-requête-15)
      - [Response Parameters :](#response-parameters--15)
      - [*Exemple de réponse*](#exemple-de-réponse-15)
    - [Get objectif by id](#get-objectif-by-id)
      - [URL](#url-16)
      - [*Exemple de requête*](#exemple-de-requête-16)
      - [Response Parameters :](#response-parameters--16)
      - [*Exemple de réponse*](#exemple-de-réponse-16)
  - [Transaction](#transaction)
    - [Ajout d'une transaction](#ajout-dune-transaction)
      - [URL](#url-17)
      - [Request Parameters :](#request-parameters--11)
      - [*Exemple de requête*](#exemple-de-requête-17)
      - [Response Parameters :](#response-parameters--17)
      - [*Exemple de réponse*](#exemple-de-réponse-17)
    - [Update Transaction](#update-transaction)
      - [URL](#url-18)
      - [Request Parameters :](#request-parameters--12)
      - [*Exemple de requête*](#exemple-de-requête-18)
      - [Response Parameters :](#response-parameters--18)
      - [*Exemple de réponse*](#exemple-de-réponse-18)
    - [Delete Transaction](#delete-transaction)
      - [URL](#url-19)
      - [Request Parameters :](#request-parameters--13)
      - [*Exemple de requête*](#exemple-de-requête-19)
      - [Response Parameters :](#response-parameters--19)
      - [*Exemple de réponse*](#exemple-de-réponse-19)
    - [Find all user transaction](#find-all-user-transaction)
      - [URL](#url-20)
      - [*Exemple de requête*](#exemple-de-requête-20)
      - [Response Parameters :](#response-parameters--20)
      - [*Exemple de réponse*](#exemple-de-réponse-20)
    - [Find transaction by id](#find-transaction-by-id)
      - [URL](#url-21)
      - [*Exemple de requête*](#exemple-de-requête-21)
      - [Response Parameters :](#response-parameters--21)
      - [*Exemple de réponse*](#exemple-de-réponse-21)
    - [Find transaction by date](#find-transaction-by-date)
      - [URL](#url-22)
      - [*Exemple de requête*](#exemple-de-requête-22)
      - [Response Parameters :](#response-parameters--22)
      - [*Exemple de réponse*](#exemple-de-réponse-22)
  - [Ping](#ping)
      - [URL](#url-23)
      - [*Exemple de requête*](#exemple-de-requête-23)
      - [Response Parameters :](#response-parameters--23)
      - [*Exemple de réponse*](#exemple-de-réponse-23)
- [About :](#about-)


## Packages
### Dev-packages
- `@commitlint/cli` - Un module très utile pour la normalisation des noms de commit git [^1].
- `@commitlint/config-conventional`  - configuration conventionnel de commitlint [^2]. 
- `@types/express` - Définitions des types du module express [^3].
- `@types/node` - Définitions des types du module nodejs [^4].
- `@typescript-eslint/eslint-plugin` - Un plugin ESLint qui fournit des règles de contrôle pour les bases de code TypeScript [^5].
- `@typescript-eslint/parser` - Un analyseur ESLint qui exploite TypeScript ESTree pour permettre à ESLint d'analyser le code source TypeScript [^6].
- `eslint` - ESLint est un outil permettant d'identifier et de signaler les schémas trouvés dans le code ECMAScript/JavaScript [^7].
- `husky` - Husky améliore vos commits et plus encore [^8].
- `nodemon` - nodemon est un outil qui redémarre automatiquement l'application node lorsque des changements sont détectés [^9].
- `ts-node` - Exécution TypeScript et REPL pour node.js, avec support source map et ESM natif [^10].
- `typescript` - Javascript avec typage fort [^11].

### Packages
- `axios` - packages pour les requêtes [^12].
- `express` - Framework web minimaliste, rapide et sans opinion pour Node.js [^13].
- `mongoose` - Mongoose est un outil de modélisation d'objets MongoDB conçu pour fonctionner dans un environnement asynchrone [^14].
- `packages` - fonctions et définitions partagé entre plusieurs services [^15].


## Backend installation

**1. Packages**

```shell
npm install
```

**2. Créer les fichiers de configuration**

```shell
cd ../
nano .env
```

```js
// Dans le fichier `.env`
WEBHOOK_ERROR_FOR_DISCORD="Lien de votre webhook discord"
URLDB="L'url de votre base de donnée mongodb"

PORT_APIGATEWAY="Le port où vous souhaitez que l'api gateway écoute"
PORT_ADRESSMANAGER="Le port où vous souhaitez que l'adress manager écoute"

PASSWORD_SERVICE="Le mot de passe qui sécurise tout les services et leurs communications"
TOKEN_EXPIRATION="Le temps d'expiration du token en miliseconde"

IP_APIGATEWAY="l'ip de la machine de l'api gateway (127.0.0.1 si tout roule sur la même machine)"
IP_USER_SERVICE="l'ip de la machine de l'user service (127.0.0.1 si tout roule sur la même machine)"
IP_ADRESSMANAGER="l'ip de la machine de l'adress manager (127.0.0.1 si tout roule sur la même machine)"
//SI VOUS SOUHAITEZ METTRE PLUSIEURS IP WHITELIST METTRE UN ";" exemple : 172.0.0.1;0.0.0.0;192.168.27.10
IP_SERVICE_WHITELIST="l'ip des machines autorisé à se connecter directement entre services (127.0.0.1 si tout roule sur la même machine)"

NODE_ENV="DEVELOPMENT|PRODUCTION|TEST"
```

**2. Créer les dossiers de log**
```shell
cd ./flux-lib_micro-service/src
mkdir log
cd ../
```

## Démarer le backend de l'application
Pour démarer le backend vous avez besoin de faire les étapes précédemment expliquées puis les commandes suivantes.
```shell
npm run build
npm run prod
# OR
npm start
```

## API

> [!CAUTION]
> Toutes les requêtes doivent être accompagné d'un paramètre "trust" et "token" dans le body ou le header de la requête.

### Budget
#### Create budget
##### URL
```http
POST /budget
```

##### Request Parameters : 
| Parameter   |   Type   |            Description            |
| :---------- | :------: | :-------------------------------- |
| `categorie` | `Id`     | L'id de la catégorie associéé     |
| `montant`   | `Number` | Le montant mensuel du budget      |
| `devise`    | `String` | Votre identifiant                 |
| `date`      | `String` | Votre identifiant                 |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget',
        method: 'POST',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            categorie : input.category,
            montant : input.montant,
            devise : "EUR",
            date : input.date,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```
##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"66b3af30ebbb97b1d38821f8","montant":1000,"devise":"EUR","categorie":"66b3af30ebbb97b1d38821f8","dateTime":1234567890,"history":[{"to":"66b3af30ebbb97b1d38821f8","id":"66b3af30ebbb97b1d38821f8","from":"66b3af30ebbb97b1d38821f8","montant":125,"date":"12/2024","dateTime":1234567890123456}]}]'
}
```

#### Update Budget 
##### URL 
```http
PUT /budget
```

##### Request Parameters :
| Parameter |   Type   |       Description       |
| :-------- | :------: | :---------------------- |
| `montant` | `Number` | Le montant du budget    |
| `devise`  | `String` | La devise du budget     |
| `id`      | `Id`     | L'identifiant du budget |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/password',
        method: 'PUT',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            montant : input.montant,
            devise : "EUR",
            id : input.id,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"66b3af30ebbb97b1d38821f8","montant":1000,"devise":"EUR","categorie":"66b3af30ebbb97b1d38821f8","dateTime":1234567890,"history":[{"to":"66b3af30ebbb97b1d38821f8","id":"66b3af30ebbb97b1d38821f8","from":"66b3af30ebbb97b1d38821f8","montant":125,"date":"12/2024","dateTime":1234567890123456}]}]'
}
```

#### Delete Budget
##### URL
```http
DELETE /budget
```

##### Request Parameters : 
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `id` | `Id` | L'id du budget à supprimer |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget',
        method: 'DELETE',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            id : input.id,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : 'Budget supprimé'
}
```

#### Get All User Budget
##### URL
```http
GET /budget/find/all
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget/find/all',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"66b3af30ebbb97b1d38821f8","montant":1000,"devise":"EUR","categorie":"66b3af30ebbb97b1d38821f8","dateTime":1234567890,"history":[{"to":"66b3af30ebbb97b1d38821f8","id":"66b3af30ebbb97b1d38821f8","from":"66b3af30ebbb97b1d38821f8","montant":125,é:"12/2024","dateTime":1234567890123456}]}]'
}
```

#### Get Budget By Id
##### URL
```http
GET /budget/find/id/:id
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget/find/id/aezfsdzasd12azs',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"aezfsdzasd12azs","montant":1000,"devise":"EUR","categorie":"aezfsdzasd12azs","dateTime":1234567890,"history":[{"to":"66b3af30ebbb97b1d38821f8","id":"66b3af30ebbb97b1d38821f8","from":"aezfsdzasd12azs","montant":125,"date":"12/2024","dateTime":1234567890123456}]}]'
}
```

#### Create transaction budget
##### URL
```http
POST /budget/transaction
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `to` | `Id` | L'id du budget qui reçoit |
| `from` | `Id` | L'id du budget qui est prélevé |
| `montant` | `Number` | Le montant transféré |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget/transaction',
        method: 'POST',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            to : input.to,
            from : input.from,
            montant : input.montant
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"aezfsdzasd12azs","montant":1000,"devise":"EUR","categorie":"aezfsdzasd12azs","dateTime":1234567890,"history":[{"to":"66b3af30ebbb97b1d38821f8","id":"66b3af30ebbb97b1d38821f8","from":"aezfsdzasd12azs","montant":125,"date":"12/2024","dateTime":1234567890123456}]},{"id":"aezfsdzasd12azs","montant":1000,"devise":"EUR","categorie":"aezfsdzasd12azs","dateTime":1234567890,"history":[{"to":"66b3af30ebbb97b1d38821f8","id":"66b3af30ebbb97b1d38821f8","from":"aezfsdzasd12azs","montant":125,"date":"12/2024","dateTime":1234567890123456}]}]'
}
```

### Categorie

#### Create categorie
##### URL
```http
POST /categorie
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `nom` | `String` | Le nom de la catégorie |
| `color` | `String` | La couleur souhaité |
| `type` | `Number` | Le type de catégorie dépense, revenu, transfère (bientôt achat et vente) |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/categorie',
        method: 'POST',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            nom : input.nom,
            type : input.type,
            color : input.color,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"aezfsdzasd12azs","nom":"cuisine","color":"#ffffff","typeCategorie":0}]'
}
```

#### Mise à jour d'une catéogorie
##### URL
```http
PUT /categorie
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `nom` | `String` | Le nom de la catégorie |
| `color` | `String` | La couleur souhaité |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/categorie',
        method: 'PUT',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            nom : input.nom,
            color : input.color,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"aezfsdzasd12azs","nom":"cuisine","color":"#ffffff","typeCategorie":0}]'
}
```

#### Delete categorie
##### URL
```http
DELETE /categorie
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `id` | `Id` | L'id de la catégorie |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/categorie',
        method: 'DELETE',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            id : input.id,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : 'Catégorie supprimé'
}
```


#### Get all user categorie
##### URL
```http
GET /categorie/find/all
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/categorie/find/all',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"aezfsdzasd12azs","nom":"cuisine","color":"#ffffff","typeCategorie":0}]'
}
```


#### Get categorie by id
##### URL
```http
GET /categorie/find/id/:id
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/categorie/find/id/aezfsdzasd12azs',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"id":"aezfsdzasd12azs","nom":"cuisine","color":"#ffffff","typeCategorie":0}]'
}
```

### Objectif

#### Create objectif
##### URL
```http
POST /objectif
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `idParent` | `Id` | L'id de l'objectif parent' |
| `wallet` | `Id` | L'id du wallet qui suivra l'objectif |
| `devise` | `string` | La devise de l'objectif |
| `title` | `string` | Le titre de l'objectif |
| `montant` | `Number` | Le montant de l'objectif |
| `start` | `Number` | Le date de début de l'objectif |
| `end` | `Number` | La date de fin de l'objectif |
| `type` | `Number` | Le type d'objectif |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'POST',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            idParent : input.idParent,
            montant : input.montant,
            wallet : input.wallet,
            devise : input.devise,
            title : input.title,
            type : input.type,
            end : input.end,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"startDate":"Dimanche 28 avril 2024 14:04","endDate":"Dimanche 30 avril 2027 14:04","devise":"EUR","montant":123456789123145,"startTime":123456789123145,"type":9,"finished":false,"endTime":123456789123145,"id":"aezfsdzasd12azs","idParent":null,"wallet":["aezfsdzasd12azs"],"title":"vacance bob"}]'
}
```

#### Update Objectif
##### URL
```http
PUT /objectif
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `title` | `string` | Le titre de l'objectif |
| `montant` | `Number` | Le montant de l'objectif |
| `end` | `Number` | La date de fin de l'objectif |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'PUT',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            montant : input.montant,
            title : input.title,
            end : input.end,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"startDate":"Dimanche 28 avril 2024 14:04","endDate":"Dimanche 30 avril 2027 14:04","devise":"EUR","montant":123456789123145,"startTime":123456789123145,"type":9,"finished":false,"endTime":123456789123145,"id":"aezfsdzasd12azs","idParent":null,"wallet":["aezfsdzasd12azs"],"title":"vacance bob"}]'
}
```

#### Delete objectif
##### URL
```http
DELETE /objectif
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `id` | `Id` | L'id de l'objectif' |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'DELETE',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            id : input.id,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : 'Objectif supprimé'
}
```


#### Update wallet objectif
##### URL
```http
PUT /objectif/wallet/modify
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `id` | `Id` | L'id de l'objectif' |
| `wallet` | `Id` | L'id du wallet qui suit l'objectif' |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'PUT',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            id : input.id,
            wallet : input.walletID
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"startDate":"Dimanche 28 avril 2024 14:04","endDate":"Dimanche 30 avril 2027 14:04","devise":"EUR","montant":123456789123145,"startTime":123456789123145,"type":9,"finished":false,"endTime":123456789123145,"id":"aezfsdzasd12azs","idParent":null,"wallet":["aezfsdzasd12azs"],"title":"vacance bob"}]'
}
```

#### Get all user objectif
##### URL
```http
GET /objectif/find/all
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif/find/all',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"startDate":"Dimanche 28 avril 2024 14:04","endDate":"Dimanche 30 avril 2027 14:04","devise":"EUR","montant":123456789123145,"startTime":123456789123145,"type":9,"finished":false,"endTime":123456789123145,"id":"aezfsdzasd12azs","idParent":null,"wallet":["aezfsdzasd12azs"],"title":"vacance bob"}]'
}
```

#### Get objectif by id
##### URL
```http
GET /objectif/find/id/:id
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif/find/id/aoiozzoxczx1',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"startDate":"Dimanche 28 avril 2024 14:04","endDate":"Dimanche 30 avril 2027 14:04","devise":"EUR","montant":123456789123145,"startTime":123456789123145,"type":9,"finished":false,"endTime":123456789123145,"id":"aoiozzoxczx1","idParent":null,"wallet":["aezfsdzasd12azs"],"title":"vacance bob"}]'
}
```

### Transaction
#### Ajout d'une transaction
##### URL
```http
POST /transaction
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `categorieID` | `Id` | L'id de la catégorie associé parent' |
| `liedTransactionsID` | `Id` | L'id de la transaction associé (lors de transfère) |
| `walletID` | `Id` | L'id du wallet quiest lié à la transaction |
| `devise` | `string` | La devise de la transaction |
| `commentaire` | `string` | Le commentaire décrivant la transaction |
| `montant` | `Number` | Le montant de la transaction |
| `date` | `Number` | Le date de la transaction |
| `type` | `Number` | Le type de transaction (dépense, revenu, transfère) |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'POST',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            liedTransactionsID : input.liedTransactionsID,
            categorieID : input.categorieID,
            commentaire : input.commentaire,
            walletID : input.walletID,
            montant : input.montant,
            devise : input.devise,
            date : input.date,
            type : input.type,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"dateDate":"Dimanche 28 avril 2024 14:04","liedTransactionsID":null,"categorieID":"asasasasasasasasasasasasasasa","type":2,"walletID":"aezfsdzasd12azs","datetime":123456789123145,"commentaire":"vacance bob","id":"aezfsdzasd12azs","devise":"EUR","montant":123456789123145}]'
}
```

#### Update Transaction
##### URL
```http
PUT /transaction
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `categorieID` | `Id` | L'id de la catégorie associé' |
| `walletID` | `Id` | L'id du wallet quiest lié à la transaction |
| `id` | `Id` | L'id de la transaction à modifier |
| `devise` | `string` | La devise de la transaction |
| `commentaire` | `string` | Le commentaire décrivant la transaction |
| `montant` | `Number` | Le montant de la transaction |
| `date` | `Number` | Le date de la transaction |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'PUT',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            categorieID : input.categorieID,
            commentaire : input.commentaire,
            walletID : input.walletID,
            montant : input.montant,
            devise : input.devise,
            date : input.date,
            id : input.id,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"dateDate":"Dimanche 28 avril 2024 14:04","liedTransactionsID":null,"categorieID":"asasasasasasasasasasasasasasa","type":2,"walletID":"aezfsdzasd12azs","datetime":123456789123145,"commentaire":"vacance bob","id":"aezfsdzasd12azs","devise":"EUR","montant":123456789123145}]'
}
```
#### Delete Transaction
##### URL
```http
DELETE /transaction
```

##### Request Parameters :
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `id` | `Id` | L'id de la transaction à supprimer |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'DELETE',
        body: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
            id : input.id,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : 'Transaction supprimé'
}
```
#### Find all user transaction
##### URL
```http
GET /transaction/find/all?page=Number
```

Récupère les 100 premières transactions
##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction/find/all',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"dateDate":"Dimanche 28 avril 2024 14:04","liedTransactionsID":null,"categorieID":"asasasasasasasasasasasasasasa","type":2,"walletID":"aezfsdzasd12azs","datetime":123456789123145,"commentaire":"vacance bob","id":"aezfsdzasd12azs","devise":"EUR","montant":123456789123145}]'
}
```

#### Find transaction by id
##### URL
```http
GET /transaction/find/id/:id
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction/find/id/aiejoizoiruzofij',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"dateDate":"Dimanche 28 avril 2024 14:04","liedTransactionsID":null,"categorieID":"asasasasasasasasasasasasasasa","type":2,"walletID":"aezfsdzasd12azs","datetime":123456789123145,"commentaire":"vacance bob","id":"aezfsdzasd12azs","devise":"EUR","montant":123456789123145}]'
}
```

#### Find transaction by date
##### URL
```http
GET /transaction/find/date/:year/:month
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction/find/date/2024/4',
        method: 'GET',
        header: {
            trust : process.env.PASSWORD_SERVICE,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : '[{"dateDate":"Dimanche 28 avril 2024 14:04","liedTransactionsID":null,"categorieID":"asasasasasasasasasasasasasasa","type":2,"walletID":"aezfsdzasd12azs","datetime":123456789123145,"commentaire":"vacance bob","id":"aezfsdzasd12azs","devise":"EUR","montant":123456789123145}]'
}
```

### Ping
##### URL
```http
GET /ping
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/ping',
        method: 'GET',
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

##### *Exemple de réponse*
```js
{
  success : true,
  status : 200,
  data : 'Service en ligne'
}
```

------------
## About :
- `CHANGELOG` [source](./CHANGELOG.md)

Ref :
[^1]: [Url du dépot `@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli)
[^2]: [Url du dépot `@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional)
[^3]: [Url du dépot `@types/express`](https://www.npmjs.com/package/@types/express)
[^4]: [Url du dépot `@types/node`](https://www.npmjs.com/package/@types/node)
[^5]: [Url du dépot `@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
[^6]: [Url du dépot `@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
[^7]: [Url du dépot `eslint`](https://www.npmjs.com/package/eslint)
[^8]: [Url du dépot `husky`](https://www.npmjs.com/package/husky)
[^9]: [Url du dépot `nodemon`](https://www.npmjs.com/package/nodemon)
[^10]: [Url du dépot `ts-node`](https://www.npmjs.com/package/ts-node)
[^11]: [Url du dépot `typescript`](https://www.npmjs.com/package/typescript)
[^12]: [Url du dépot `axios`](https://www.npmjs.com/package/axios)
[^13]: [Url du dépot `express`](https://www.npmjs.com/package/express)
[^14]: [Url du dépot `mongoose`](https://www.npmjs.com/package/mongoose)
[^15]: [Url du dépot `packages`](https://github.com/Horus-Turboss-Finance/Packages/)