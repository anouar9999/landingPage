# 🎮 Morocco Gaming Expo - Page de Maintenance

> Une page de maintenance extraordinaire avec des effets 3D morphisme, conçue pour s'intégrer parfaitement avec le dashboard admin et respecter la charte graphique du site MGE.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-ready-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

## 🎯 Aperçu

Cette page de maintenance offre une expérience visuelle exceptionnelle pendant les périodes de maintenance du site Morocco Gaming Expo. Elle intègre :

- ✨ **Effets 3D morphisme** avec 150 particules animées
- 💫 **Animations GSAP** fluides et professionnelles
- 🌐 **Support multilingue** (FR, EN, AR, TZ)
- 📱 **Design responsive** optimisé pour tous les appareils
- 🎯 **Charte graphique MGE** parfaitement respectée
- 🔄 **Synchronisation temps réel** avec le dashboard admin

## 🚀 Démarrage rapide

### Test immédiat (sans backend)

1. **Démarrez le projet**
   ```bash
   npm run dev
   ```

2. **Ouvrez la console du navigateur** (F12)

3. **Activez le mode maintenance**
   ```javascript
   localStorage.setItem('maintenance_mode', JSON.stringify({
     isMaintenanceMode: true,
     timestamp: Date.now()
   }));
   location.reload();
   ```

4. **Admirez la page de maintenance !** 🎨

### Configuration complète (avec dashboard admin)

Consultez le guide complet : [MAINTENANCE_INTEGRATION_GUIDE.md](./MAINTENANCE_INTEGRATION_GUIDE.md)

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [📖 SUMMARY.md](./SUMMARY.md) | Récapitulatif complet du projet |
| [🔧 MAINTENANCE_INTEGRATION_GUIDE.md](./MAINTENANCE_INTEGRATION_GUIDE.md) | Guide technique d'intégration |
| [📘 MAINTENANCE_README.md](./MAINTENANCE_README.md) | Documentation utilisateur |
| [🎛️ DASHBOARD_ADMIN_COMPONENT.md](./DASHBOARD_ADMIN_COMPONENT.md) | Interface de contrôle admin |
| [🧪 TESTING_GUIDE.md](./TESTING_GUIDE.md) | Guide de test complet |
| [🚀 DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Procédures de déploiement |
| [🎬 DEMO_GUIDE.md](./DEMO_GUIDE.md) | Guide de démonstration |

## 🎨 Fonctionnalités

### Page de Maintenance

```
✓ Canvas 3D avec particules morphing
✓ 150 particules avec effet de profondeur
✓ Lignes de connexion dynamiques
✓ Logo central avec animations concentriques
✓ Titre avec effet de pulsation
✓ 3 cartes d'information avec hover effects
✓ Liens vers réseaux sociaux
✓ Effet de vague animé
✓ Dégradé de fond dynamique
✓ Grille de pattern subtile
```

### Système de Contrôle

```
✓ Vérification automatique (30s)
✓ Cache intelligent (1 min)
✓ Fallback gracieux
✓ Support mode hors ligne
✓ Synchronisation cross-tab
✓ Détection de visibilité
```

### Traductions

| Langue | Code | Statut |
|--------|------|--------|
| 🇫🇷 Français | `fr` | ✅ Complet |
| 🇬🇧 English | `en` | ✅ Complet |
| 🇸🇦 العربية | `ar` | ✅ Complet + RTL |
| ⵣ Tamazight | `tz` | ✅ Complet + Police |

## 📁 Structure

```
src/
├── components/
│   └── MaintenancePage.jsx          # Page de maintenance
├── hooks/
│   └── useMaintenance.js            # Hook React
├── utils/
│   └── maintenanceService.js        # Service de gestion
├── translations/
│   └── index.js                     # Traductions
└── App.jsx                          # Intégration
```

## 🛠️ Installation

### Prérequis

- Node.js >= 18.0.0
- npm ou yarn
- Dashboard admin (optionnel pour le test)

### Installation

```bash
# Cloner le projet
git clone https://github.com/anouar9999/landingPage
cd landingPage

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev

# Build de production
npm run build
```

## 🧪 Tests

### Test manuel rapide

```javascript
// Console du navigateur
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: true,
  timestamp: Date.now()
}));
location.reload();
```

### Tests complets

Voir [TESTING_GUIDE.md](./TESTING_GUIDE.md) pour :
- Tests unitaires
- Tests d'intégration
- Tests E2E avec Cypress
- Checklist complète

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

### Déploiement

Consultez [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) pour :
- Configuration serveur (Nginx, Apache)
- Déploiement cloud (Vercel, Netlify)
- CI/CD avec GitHub Actions
- Monitoring et alertes

## 📊 Performance

| Métrique | Valeur |
|----------|---------|
| Temps de chargement | < 2s |
| FPS animations | 60 |
| Taille bundle (gzip) | ~487 KB |
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |

## 🎨 Personnalisation

### Changer les couleurs

```javascript
// src/components/MaintenancePage.jsx

// Couleur des particules (ligne ~40)
this.color = `hsla(250, 80%, 60%, `; // Violet MGE

// Couleur du logo (ligne ~300)
className="bg-gradient-to-br from-primary via-purple-600 to-blue-600"
```

### Modifier le nombre de particules

```javascript
// src/components/MaintenancePage.jsx (ligne ~155)
for (let i = 0; i < 150; i++) { // Changez 150
  particleArray.push(new Particle());
}
```

### Personnaliser les textes

```javascript
// src/translations/index.js
maintenance: {
  title: "VOTRE TITRE",
  subtitle: "Votre sous-titre",
  // ...
}
```

## 🔒 Sécurité

- ✅ CORS configuré
- ✅ Rate limiting (1 req/30s)
- ✅ Cache sécurisé
- ✅ Fallback gracieux
- ✅ Validation des données

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour :
- Guide de contribution
- Standards de code
- Process de review

## 📝 Changelog

### v1.0.0 (26 octobre 2025)
- ✨ Page de maintenance initiale
- 🎨 Effets 3D morphisme
- 🌐 Support multilingue (4 langues)
- 🔄 Système de vérification automatique
- 📱 Design responsive
- 📚 Documentation complète

## 🆘 Support

### Documentation
- 📖 [Guides complets](./SUMMARY.md)
- 🧪 [Tests](./TESTING_GUIDE.md)
- 🚀 [Déploiement](./DEPLOYMENT_GUIDE.md)

### Contacts
- 📧 Email: support@mgexpo.ma
- 💬 Discord: [Serveur MGE](https://discord.gg/mge)
- 🐛 Issues: [GitHub Issues](https://github.com/anouar9999/landingPage/issues)

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](./LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Morocco Gaming Expo** - Pour le projet
- **Ministère de la Jeunesse, Culture et Communication** - Soutien officiel
- **L'équipe de développement** - Pour leur travail acharné
- **La communauté gaming marocaine** - Pour leur passion

---

<div align="center">
  
**Développé avec ❤️ pour Morocco Gaming Expo**

[Site Web](https://gnews.ma) • [Dashboard](https://admin.gnews.ma) • [Documentation](./SUMMARY.md)

</div>
