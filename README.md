# !nsights (Draft)

## Description
Interface HTML/JS simple permettant de d'importer des processus (voir insight-factory) puis de créer, modifier et exporter des instances de ce processus. 
Le projet ne demande pas de build et utilise uniquement du JavaScript, du CSS et **une dépendance ZIP via CDN**.

## Fonctionnalités
- Création, duplication, suppression et édition de fiches d’analyse
- Organisation par catégories / tags
- Aperçu en lecture seule
- Sauvegarde automatique locale (IndexedDB)
- Export en ODT (non chiffré)
- Export en ZIP chiffré (AES-256)
- Import d’archives (ZIP ou projet)
- Ajout et gestion de fichiers liés aux fiches
- Glossaire intégré (création, édition, export)
- Recherche rapide (fiches + glossaire)
- Mode hors-ligne, aucune dépendance serveur
- Interface responsive (navigation, split-view, panneaux repliables)
- Notifications d’erreurs et d’avertissements (chiffrement, navigateur, API manquante)

## Utilisation
Ouvrir `index.html` dans un navigateur récent. 
Certaines options d’import/export nécessitent un contexte sécurisé (HTTPS ou localhost).
Certaines options d'import ne fonctionnent pas sans File System Access API.

---

Code à refactorer complètement.
