# 🚀 Guide de Déploiement - Page de Maintenance

## Résumé des fichiers créés/modifiés

### ✅ Fichiers créés
```
src/
├── components/
│   └── MaintenancePage.jsx              ✅ Page de maintenance 3D
├── hooks/
│   └── useMaintenance.js                ✅ Hook React
└── utils/
    └── maintenanceService.js            ✅ Service de gestion

Documentation/
├── MAINTENANCE_INTEGRATION_GUIDE.md     ✅ Guide d'intégration complet
├── MAINTENANCE_README.md                ✅ Documentation utilisateur
├── DASHBOARD_ADMIN_COMPONENT.md         ✅ Composant dashboard
└── TESTING_GUIDE.md                     ✅ Guide de test
```

### 🔄 Fichiers modifiés
```
src/
├── App.jsx                              🔄 Intégration de la maintenance
└── translations/index.js                🔄 Ajout des traductions
```

## 📋 Checklist avant déploiement

### 1. Vérifications locales
- [ ] Tester la page de maintenance en local
- [ ] Vérifier toutes les langues (FR, EN, AR, TZ)
- [ ] Tester sur différents navigateurs
- [ ] Tester responsive (mobile, tablette, desktop)
- [ ] Vérifier les animations

### 2. Configuration
- [ ] Modifier l'URL de l'API dans `maintenanceService.js`
- [ ] Configurer les CORS sur le serveur backend
- [ ] Vérifier les variables d'environnement
- [ ] Tester la connexion à l'API

### 3. Dashboard Admin
- [ ] Cloner le repository admin
- [ ] Installer les dépendances
- [ ] Créer les migrations de base de données
- [ ] Créer l'endpoint API `/api/maintenance`
- [ ] Tester l'interface de contrôle

## 🔧 Étapes de déploiement

### Étape 1: Préparer le frontend

```bash
# 1. Vérifier que tout compile
cd gamiusapp
npm run build

# 2. Tester le build localement
npm run preview

# 3. Vérifier qu'il n'y a pas d'erreurs
npm run lint
```

### Étape 2: Configurer le backend

```bash
# 1. Cloner le dashboard admin
git clone https://github.com/anouar9999/platform-admin
cd platform-admin

# 2. Installer les dépendances
npm install  # ou composer install pour Laravel

# 3. Créer la migration
php artisan make:migration create_maintenance_settings_table

# 4. Exécuter les migrations
php artisan migrate

# 5. Créer le contrôleur
php artisan make:controller Api/MaintenanceController
```

### Étape 3: Déployer sur le serveur

#### Option A: Serveur avec SSH

```bash
# 1. Build du frontend
npm run build

# 2. Upload via rsync
rsync -avz --delete dist/ user@server:/var/www/html/

# 3. Redémarrer nginx/apache si nécessaire
ssh user@server 'sudo systemctl reload nginx'
```

#### Option B: Déploiement automatique (GitHub Actions)

Créez `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_MAINTENANCE_API_URL: ${{ secrets.MAINTENANCE_API_URL }}
    
    - name: Deploy to server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SERVER_SSH_KEY }}
        source: "dist/*"
        target: "/var/www/html"
```

#### Option C: Plateforme cloud (Vercel, Netlify, etc.)

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Cloudflare Pages
wrangler pages publish dist
```

### Étape 4: Configuration du serveur web

#### Nginx

```nginx
server {
    listen 80;
    server_name gnews.ma www.gnews.ma;
    
    root /var/www/html;
    index index.html;
    
    # Gestion du routing React
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache des assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Pas de cache pour index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # API proxy (si nécessaire)
    location /api/ {
        proxy_pass https://admin.gnews.ma/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache des assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

### Étape 5: Tester en production

```bash
# 1. Activer le mode maintenance depuis le dashboard admin
curl -X POST https://admin.gnews.ma/api/maintenance \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"is_maintenance_mode": true}'

# 2. Vérifier que la page de maintenance s'affiche
curl https://gnews.ma

# 3. Désactiver
curl -X POST https://admin.gnews.ma/api/maintenance \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"is_maintenance_mode": false}'

# 4. Vérifier que le site normal s'affiche
curl https://gnews.ma
```

## 🔍 Vérifications post-déploiement

### Checklist technique
- [ ] Le site est accessible via HTTPS
- [ ] Les certificats SSL sont valides
- [ ] Le DNS est correctement configuré
- [ ] Les redirections fonctionnent
- [ ] Le cache fonctionne correctement

### Checklist fonctionnelle
- [ ] La page de maintenance s'active correctement
- [ ] Les animations 3D fonctionnent
- [ ] Toutes les langues sont disponibles
- [ ] Le responsive fonctionne
- [ ] Les liens sociaux fonctionnent

### Checklist performance
- [ ] Lighthouse score > 90
- [ ] Temps de chargement < 3s
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

## 📊 Monitoring

### Configurer les alertes

```javascript
// Dans maintenanceService.js, ajouter:
const logToMonitoring = (event, data) => {
  // Envoyer à votre service de monitoring
  // Exemple: Sentry, LogRocket, etc.
  if (window.analytics) {
    window.analytics.track(event, data);
  }
};

// Utiliser dans les fonctions
async checkMaintenanceStatus() {
  try {
    // ... code existant ...
    logToMonitoring('maintenance_check', { status: this.isMaintenanceMode });
  } catch (error) {
    logToMonitoring('maintenance_error', { error: error.message });
  }
}
```

### Métriques à surveiller

1. **Disponibilité**
   - Uptime du site
   - Temps de réponse de l'API
   - Erreurs 5xx

2. **Performance**
   - Temps de chargement
   - Métriques Core Web Vitals
   - Utilisation de la bande passante

3. **Utilisation**
   - Nombre de visiteurs bloqués par la maintenance
   - Durée moyenne en mode maintenance
   - Fréquence d'activation

## 🆘 Rollback en cas de problème

### Plan de rollback

```bash
# 1. Revenir à la version précédente
git revert HEAD
git push

# 2. Ou redéployer la version précédente
git checkout <previous-commit>
npm run build
# Déployer...

# 3. Désactiver le mode maintenance d'urgence
# Via la console du navigateur:
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: false,
  timestamp: Date.now()
}));
```

### Contacts d'urgence

- **DevOps**: devops@mgexpo.ma
- **Backend**: backend@mgexpo.ma  
- **Frontend**: frontend@mgexpo.ma
- **On-call**: +212 XXX XXX XXX

## 📝 Documentation finale

Une fois déployé, mettez à jour:

1. **Wiki interne**: Procédures de maintenance
2. **Documentation API**: Endpoints de maintenance
3. **Runbook**: Procédures d'urgence
4. **Changelog**: Nouvelles fonctionnalités

## 🎉 Félicitations !

Votre page de maintenance est maintenant déployée et opérationnelle ! 

Pour toute question ou support:
- 📧 Email: support@mgexpo.ma
- 💬 Discord: [Serveur MGE](https://discord.gg/mge)
- 🐛 Issues: [GitHub](https://github.com/anouar9999/landingPage/issues)

---

**Déployé avec ❤️ pour Morocco Gaming Expo**
