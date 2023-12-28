# Problématique

En tant que développeur full-stack, nous allons être régulièrement amenés à créer, utiliser, maintenir, faire évoluer, des endpoints d'API. Cela va représenter une partie importante de notre temps de travail.
Il est donc important de créer un cadre, des conventions, des outils, qui nous permettent de faire toutes ces tâches efficacement et sereinement, pour pouvoir nous concentrer sur la création de valeur pour les clients finaux.

L'objectif de cet exercice va être de travailler sur ce qui peut être mis en place, notamment avec TypeScript, pour organiser son code de façon plus lisible et maintenable (un "mini-framework").

J'ai tenté de concevoir un exercice qui dans tous les cas apprendra des choses au candidat qui lui seront utiles dans la suite.
J'espère que ce sera le cas. Votre feedback m'intéresse pour aller dans ce sens.

Bonne chance !

## Plus concrètement

Considérons un endpoint de base, par exemple un endpoint de login.
Classiquement, le endpoint demande un nom d'utilisateur et un mot de passe, et renvoie un token d'authentification en cas de succès - ou une erreur sinon.
Dans la documentation d'express ou n'importe quel tutorial, l'implémentation d'un tel endpoint pourrait ressembler à ça :

```ts
// Back-end
// handler
export const handler_postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // for simplicity sake, there is no database in this project. Instead, we do fake hard-coded checks.
  if (username !== 'Fusion') {
    return res
      .status(401)
      .send({ error: { status: 401, message: "Cet utilisateur n'existe pas" } });
  }

  if (password !== '123456') {
    res.status(401).send({ status: 401, message: 'Mot de passe incorrect' });
  }

  res.status(200).send({ jwtToken: '123_secretJWTAccessToken_ABC' });
};

// server/index.ts
app.post('/api/login/', handler_postLogin);
```

```tsx
// Front-end
<Button onClick={getAccessToken(form.name.value, form.password.value)}>Se connecter</Button>;

// ...

const getAccessToken = async (name: string, password: string) => {
  const URL = 'http://localhost:8080/login/';
  const res = axios.post(URL, { name, password });
  return res.accessToken;
};
```

Ce code compilerait sans problème. Pourtant il contient déjà 5 bugs. Les avez-vous tous remarqués dès la première lecture ?

<details>
  <summary>Voir les 5 bugs</summary>

1. le format de retour de l'API en cas d'erreur est inconsistant : `{ error: { status, message }}` dans un cas vs `{ status, message }` dans l'autre
2. il manque un `return` dans le cas d'un mot de passe invalide

- donc la suite du code est éxécutée même si le mot de passe est invalide ! C'est une erreur qui semble anecdotique et qui est très facile à laisser passer. Mais en réalité elle est très grave.

3. l'url est incorrect : `/api/login/` dans le back-end vs `/login/` dans le front-end
4. l'appel depuis le front-end est incorrect : on passe `name` alors que le body doit contenir `username`
5. le front-end tente d'extraire la propriété `accessToken` au lieu de `jwtToken`
</details>

Il est bien sûr possible de détecter tout ça au premier coup d'oeil, mais il est normal et fréquent de laisser passer ces détails.
Notamment parce que :

- du code technique (express et axios) est mélangé à du code métier
- il y a duplication d'informations entre le back-end et le front-end
- le compilateur ne nous aide pas à remarquer les incohérences

---

Ces problèmes vont à l'encontre de notre vélocité. Comment peut-on façonner notre codebase et utiliser les outils à notre disposition (notamment TypeScript) pour être efficaces dans la création, l'utilisation, l'évolution et la maintenance de ces endpoints ?
On aimerait préparer la codebase de sorte qu'il soit **impossible** de louper toutes ces classes d'erreurs auxquelles on ne pourra pas penser à chaque fois.

# Objectif

Ce repo contient un projet full-stack (serveur et client) d'exemple, quasiment fonctionnel (plus de détails dans les sections suivantes).

L'objectif est de mettre en place une architecture et des fonctions qui aident :

- à augmenter la lisbilité du code
  - en encapsulant les parties techniques
  - avec une source unique de spécification pour chaque endpoint
  - avec une façon standardisée d'organiser les endpoints (fichiers et nomenclature), pour pouvoir facilement se repérer dans la codebase
- avec un typage fort pour bénéficier
  - de l'auto-completion sur les payload d'entrée / sortie des handlers et des appels à l'API depuis le client.
  - des alertes de types dans le back-end et le front-end quand on fait évoluer la définition d'un endpoint

Pour gagner du temps et servir de point de départ à la réflexion, nous proposons déjà dans ce repo une architecture de fichiers et un certain nombres de types permettant l'isolation du métier et la standardisation des endpoints.

Voilà à quoi pourrait ressembler l'exemple précédent avec la nouvelle organisation :

```ts
// shared file used by both back-end and front-end
// a single source of truth to avoid duplication of types and values -> prevents bug 3
export const path_postLogin = '/api/login/';
export type In_postLogin = { password: string; username: string };
export type Out_postLogin = { jwtToken: string };

export const endpoint_postLogin = {
  path: path_postLogin,
  handler: handler_postLogin,
};

export const client_postLogin = makeClientForEndpoint(endpoint_postLogin); // encapsulates axios and typings
```

```ts
// Back-end
export const handler_postLogin = async (payload: In_postLogin): Result<Out_postLogin> => {
  // handlers contains nothing related to express, only business logic -> improve readability
  const { username, password } = payload;

  if (username !== 'Fusion') {
    return { error: { status: 404, message: "Cet utilisateur n'existe pas" } }; // auto-completed
  }

  if (password !== '123456') {
    // no way to forget to return -> prevents bug 2
    return { status: 401, message: 'Mot de passe incorrect' }; // <- type error ! -> prevents bug 1
  }

  return { data: { jwtToken: '123_secretJWTAccessToken_ABC' } }; // auto-completed
};

// server/index.ts
setupEndpoint(endpoint_postLogin); // encapsulates express and typings
```

```tsx
// Front-end
<Button onClick={getAccessToken(form.name.value, form.password.value)}>Se connecter</Button>;

// ...

const getAccessToken = async (name: string, password: string) => {
  const res = client_postLogin.fire({ name, password }); // <- type error ! -> prevents bug 4
  return res.accessToken; // <- type error ! -> prevents bug 5
};
```

Les erreurs sont soient supprimées de fait, soit mises en valeurs.

# Exercice

Pour rendre le repo fonctionnel, il faut implémenter les parties marquées en `// TODO` (code et types).
Voici une suggestion d'approche du problème :

1. Parcourir le repo en détails et comprendre l'organisation globale et ce qu'il manque.
1. Implémenter le package `requests-utils` pour que le code tourne (difficile)
1. Typer strictement le package `requests-utils` pour atteindre les bénéfices évoqués plus haut (difficile)

   - chercher là aussi les `TODO` et les `any`. Idéalement, on peut tout typer strictement et se passer de tous les `any` (sauf un qui est signalé).
   - note : selon les goûts, le typage peut se faire avant l'implémentation pour guider celle-ci.

1. Créer un 3ème endpoint, `postSignUp` (création d'un nouvel utilisateur), en suivant les différentes conventions et en tirant profit de ce qui a été construit

   - le endpoint accepte un nom d'utilisateur, un email et un mot de passe, et renvoie un token JWT.
     - Déclenche une erreur si le nom d'utilisateur est "Fusion", car il est déjà utilisé.
   - bien entendu, faire une fausse implémentation avec des valeurs hardcodées comme les autres endpoints.
   - ne pas oublier de faire un appel à ce endpoint depuis le client
   - est-ce que le compilateur a aidé à implémenter ce nouveau endpoint plus confortablement ?

1. Modifier le endpoint `postLogin` pour qu'il utilise l'email en identifiant au lieu du username.

   - en commençant par la définition des types du endpoint pour profiter des outils mis en place

1. Prendre du recul et bien comprendre le repo pour que l'on puisse en discuter

   - Est-ce que cette architecture vous plaît ? Pourquoi ? Quels sont les avantages et les inconvénients ?
   - Qu'est-ce que vous auriez envie d'améliorer pour aller plus loin ?
   - Quelles autres fonctions transverses importantes auriez-vous envie d'intégrer à ce mini-framework pour augmenter votre confort d'écriture et de lecture de code, votre vélocité (ou tout simplement l'étendue de ses fonctionnalités) ?
     - En bonus, si vous avez le temps et que ça vous tente, implémentez une de ces améliorations
       - Probablement intéressant d'en discuter avant ! Je suis disponible, n'hésitez pas.

## Remarques diverses

- Faire une Pull Request avec différents commits pour les différentes étapes directement sur le repo
  - Ne pas hésiter à mettre des commentaires ou questions directement sur la PR pour qu'on puisse facilement en discuter ensuite.
  - C'est un repo personnel pour chaque candidat
- Le projet est pré-configuré avec TypeScript et prettier pour VSCode.
- L'exercice demande une utilisation un peu poussée des "generics" de Typescript.
- L'exercice demande un peu de programmation fonctionnelle, dans le sens fonctions qui prennent / retournent des fonctions
- Les fonctions d'axios peuvent être typées. Explorer par exemple les types de `axios.post()` via F12 sur VSCode.
- Au total, le dossier requests-utils n'a pas forcément besoin de faire plus que quelques dizaines de lignes

# Les différents fichiers de ce repo

## Dossier `requests-utils`

C'est principalement ce qu'il faut implémenter dans cet exercice.
Il faut imaginer que c'est un package externe en charge d'encapsuler la complexité technique et le typage.
Pour des raisons de simplicité pour cet exercice (notamment import et build), c'est un simple dossier dans le projet et non un vrai package.

## Dossier `app`

Notre codebase à proprement parler, le code de notre pseudo-SaaS. Contient à la fois le serveur et le "client".

### Dossier `app/shared`

Contient les définitions des interfaces des endpoints, utilisées à la fois par le serveur et le client.
On a les prémices d'une architecture modulaire, avec un dossier par module fonctionnel. Il y a potentiellement plusieurs endpoints liés à la même fonctionnalité dans celui-ci.
On retrouvera cette structure dans les fichiers du serveur.

### Dossier `app/server`

- sous-dossier `api` : contient les implémentations métiers des endpoints.
- `index.ts` : setup d'express et point d'entrée du serveur

### Dossier `app/client`

Le client devrait être une app React complète. Pour des raisons de simplicité, notamment pour pouvoir facilement importer les mêmes fichiers sans faire un build complexe et illisible sur cet exercice, on se limite à un fichier qui fait des appels à l'api lorsqu'il est éxécuté.

# Installation et démarrage

- `yarn`
- `yarn watch-build` : compile (en mode watch) tous les dossiers de code
- `yarn start-server` : démarre le serveur (en mode watch)
- `yarn run-client` : éxécute (une fois) les requêtes d'API depuis le client (une fois le module `requests-utils` implémenté)

# Conclusion

Bonne chance ! Très important, ne pas hésiter à m'écrire.
Comme lorsqu'on travaille ensemble, il est largement préférable d'avoir des échanges constructifs qui permettent d'avancer plutôt qu'un blocage ou une incompréhesion coûteuse.
