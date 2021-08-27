# ESPERANCE CHARTRES DE BRETAGNE FOOTBALL SITE 2021

## Setup

Il faut avoir node d'installer.

```
npm install
```

## Production

Build une version optimisée de l'app dans `/dist/`:

```
npm run build
```

## Development

Lancer l'application en mode développement avec le hot reloading:

```
npm start
```

ou

```
npm run development
```

## Configuration de base

Webpack configuration in `webpack.config.build.js` or `webpack.config.development.js`.

Global config file (merged with other) in `webpack.config.js`

## Structure

```bash
├── /app/
    ├── /animations/                    # Fichiers gérant les anims de paragraphes, lignes, titres
    ├── /classes/                       # Fichiers génériques définissant les pages, animation, components (animation des pages, intersection observer...)
    ├── /components/                    # Composants que l'on va retrouver sur l'ensemble de l'app et qui vont être partagés (preloader pages, navigation)
    ├── /pages/                         # Fichiers par pages pour instancier chaque page au besoin (composants unique de page...) (étendent la classe page)
    ├── /utils/                         # Fonctions utiles de math ou autre
    ├── index.js                        # Point d'entrée js => instancie toutes les pages (ne pas oublier si nouveaux templates)et l'app en général
├── /assets/                            # Toutes les images, icones
├── /dist/                              # Dossier de build, pour une app optimisée
├── /fonts/                             # Dossier contenant les fonts
├── /shared/                            # dossier contenant les éléménts partagés comme les favicons par ex
├── /styles/                            # Dossier contenant les styles de l'app (+- 7in1 architecture)
    ├── /base/                          # Contient les styles de base (html et body), les fonts et le reset
    ├── /components/                    # Composants que l'on retrouve sur toute l'app (cta, forms, preloader)
    ├── /layout/                        # Ce qui permet la navigation et de gérer les contenus (containers, footer, nav)
    ├── /pages/                         # Un dossier par page lui meme divisé en fichiers pour plus de séparation / modularité
    ├── /shared/                        # Tous les éléments partagés (tailles de typo...)
    ├── /utils/                         # Tous les utilitaires (variables, functions, mixins, breakpoints avec @include-media)
    ├── index.scss                      # Point d'entrée scss (ordre d'import important)
├── /views/pages/                       # Contient toutes les vues de l'app (normalement template avec pug mais ici utilisation de l'html)
├── .editorconfig                       # Config de l'éditeur de code
├── .eslintrc.js                        # Config des règles de code appliquées au javascript
├── index.html                          # Point d'entrée des vues de l'app
├── package.json                        # Versioning et gestion des packages npm
├── postcss.config.js                   # Config css appliquée
├── webpack.config.build.js             # Configuration du build (public path peut être enlevé car utile pour publier sur github pages, clean du dossier, image opti)
├── webpack.config.development.js       # Configuration du development (bon public path du coup)
├── webpack.config.js                   # Configuration générale de webpack (merge avec les build et dev, ne pas oublier si une vue est ajoutée de la répercuter ici)
```


## Advanced configuration

### Styles

Utilisation de SASS
Utilisation de postcss pour optimiser davantage le code
Traduction en un unique fichier CSS

### JS

Utilisation de babel pour adapter le code aux anciennes versions des navigateurs.
Minification

### Librairies

Utilisation de GSAP pour les animations
Utilisation de smooth-scrollbar pour le smooth scroll
Utilisation de FontFaceObserver pour s'assurer du chargement des fonts

### Build

Utilisation d'imagemin qui réduit la taille des images


#### Fait par Florian Cario
