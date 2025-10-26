# 🚀 Système de Maintenance - Morocco Gaming Expo

## 📖 Vue d'ensemble

Un système de page de maintenance extraordinaire avec des effets 3D morphisme, conçu pour s'intégrer parfaitement avec le dashboard admin et la charte graphique du site MGE.

## ✨ Fonctionnalités

### Page de Maintenance
- 🎨 **Effets 3D Morphisme**: Particules animées avec effets de profondeur 3D
- 💫 **Animations GSAP**: Animations fluides et professionnelles
- 🌐 **Multilingue**: Support complet FR, EN, AR, TZ
- 📱 **Responsive**: S'adapte à tous les écrans
- 🎯 **Charte graphique**: Couleurs et design alignés avec MGE

### Système de Contrôle
- ⚡ **Vérification automatique**: Check toutes les 30 secondes
- 💾 **Cache intelligent**: Réduit les appels API
- 🔄 **Sync temps réel**: Détection de changement de focus
- 🎛️ **Dashboard admin**: Interface de contrôle centralisée

## 📁 Structure des fichiers

```
src/
├── components/
│   └── MaintenancePage.jsx          # Page de maintenance
├── hooks/
│   └── useMaintenance.js            # Hook React pour l'état
├── utils/
│   └── maintenanceService.js        # Service de gestion
├── translations/
│   └── index.js                     # Traductions (mis à jour)
└── App.jsx                          # Intégration (modifié)
```

## 🔧 Installation

1. **Cloner le repository du dashboard admin**
```bash
git clone https://github.com/anouar9999/platform-admin
cd platform-admin
npm install
```

2. **Configurer l'URL de l'API**

Dans `src/utils/maintenanceService.js`, modifiez:
```javascript
const MAINTENANCE_API_URL = 'https://admin.gnews.ma/api/maintenance';
```

3. **Tester en local**
```bash
npm run dev
```

## 🎮 Utilisation

### Depuis le Dashboard Admin

1. Accédez à la section "Mode Maintenance"
2. Activez/désactivez le mode avec le switch
3. Les changements sont appliqués en temps réel sur le site

### Test manuel (sans dashboard)

```javascript
// Dans la console du navigateur
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: true,
  timestamp: Date.now()
}));

// Rafraîchir la page
location.reload();
```

## 🌍 Traductions

Les traductions sont déjà configurées pour:
- 🇫🇷 Français
- 🇬🇧 English  
- 🇸🇦 العربية (Arabe)
- ⵣ Tamazight

Pour modifier les textes, éditez `src/translations/index.js`

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans la page:
```javascript
// Primaire: #8a2be2 (Violet MGE)
// Secondaire: Dégradés purple-blue
```

### Particules 3D

Modifiez le nombre de particules:
```javascript
// Dans MaintenancePage.jsx
for (let i = 0; i < 150; i++) { // Changez 150
  particleArray.push(new Particle());
}
```

### Durée des animations

```javascript
// Dans MaintenancePage.jsx
gsap.timeline()
  .from('.maintenance-logo', {
    duration: 1.5, // Modifiez la durée ici
  })
```

## 🔒 Sécurité

### CORS
Assurez-vous que le dashboard admin autorise les requêtes depuis votre domaine:

```php
// Laravel config/cors.php
'allowed_origins' => [
  'https://gnews.ma',
  'http://localhost:5173'
],
```

### Rate Limiting
Le service vérifie toutes les 30 secondes max pour éviter de surcharger l'API.

## 📊 Monitoring

Le système log automatiquement les erreurs dans la console:
```javascript
console.error('Error checking maintenance status:', error);
```

En production, vous pouvez ajouter un service de monitoring comme Sentry.

## 🧪 Tests

### Test local avec mock

1. Créez `public/api/maintenance.json`:
```json
{
  "isMaintenanceMode": true,
  "message": "Maintenance en cours",
  "estimatedEndTime": null
}
```

2. Modifiez temporairement dans `maintenanceService.js`:
```javascript
const MAINTENANCE_API_URL = '/api/maintenance.json';
```

### Test de charge

```javascript
// Simuler plusieurs vérifications
for(let i = 0; i < 10; i++) {
  await maintenanceService.forceCheck();
}
```

## 🚀 Déploiement

### 1. Build de production
```bash
npm run build
```

### 2. Vérifier les variables d'environnement
```bash
# .env.production
VITE_MAINTENANCE_API_URL=https://admin.gnews.ma/api/maintenance
```

### 3. Déployer
```bash
# Exemple avec un serveur
rsync -avz dist/ user@server:/var/www/html/
```

## 🐛 Dépannage

### La page de maintenance ne s'affiche pas

1. Vérifiez l'URL de l'API
2. Vérifiez les CORS
3. Vérifiez la console pour les erreurs
4. Forcez un refresh du cache: `Ctrl+Shift+R`

### Les animations sont saccadées

1. Réduisez le nombre de particules
2. Vérifiez les performances GPU
3. Désactivez les animations complexes sur mobile

### Le cache ne se met pas à jour

```javascript
// Forcer une vérification
maintenanceService.forceCheck();

// Réinitialiser le service
maintenanceService.reset();
```

## 📝 Changelog

### v1.0.0 (2025-10-26)
- ✨ Page de maintenance initiale
- 🎨 Effets 3D morphisme
- 🌐 Support multilingue
- 🔄 Système de vérification automatique
- 📱 Design responsive

## 🤝 Contribution

Pour contribuer:
1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 👥 Support

Pour toute question ou problème:
- 📧 Email: support@mgexpo.ma
- 💬 Discord: [Serveur MGE](https://discord.gg/mge)
- 🐛 Issues: [GitHub Issues](https://github.com/anouar9999/landingPage/issues)

---

**Développé avec ❤️ pour Morocco Gaming Expo**
