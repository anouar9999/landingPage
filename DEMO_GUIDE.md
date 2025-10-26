# 🎯 Démo Rapide - Page de Maintenance

## Tester immédiatement (sans backend)

### Option 1: Via localStorage (Le plus rapide)

1. **Ouvrez votre site en local**
   ```bash
   npm run dev
   ```

2. **Ouvrez la console du navigateur** (F12)

3. **Exécutez cette commande**
   ```javascript
   localStorage.setItem('maintenance_mode', JSON.stringify({
     isMaintenanceMode: true,
     timestamp: Date.now()
   }));
   location.reload();
   ```

4. **BOOM ! 💥** Vous devriez voir la page de maintenance avec les effets 3D !

5. **Pour revenir au site normal**
   ```javascript
   localStorage.setItem('maintenance_mode', JSON.stringify({
     isMaintenanceMode: false,
     timestamp: Date.now()
   }));
   location.reload();
   ```

### Option 2: Via fichier JSON local

1. **Créez le fichier** `public/api/maintenance.json`
   ```json
   {
     "isMaintenanceMode": true,
     "message": "Test de la page de maintenance",
     "estimatedEndTime": null
   }
   ```

2. **Modifiez temporairement** `src/utils/maintenanceService.js`
   ```javascript
   // Ligne 2, changez:
   const MAINTENANCE_API_URL = '/api/maintenance.json';
   ```

3. **Redémarrez le serveur**
   ```bash
   npm run dev
   ```

4. **Admirez !** La page de maintenance s'affiche automatiquement

## 🎨 Personnalisation rapide

### Changer les couleurs

Dans `src/components/MaintenancePage.jsx`, modifiez:

```javascript
// Ligne ~40 - Couleur des particules
this.color = `hsla(${Math.random() * 60 + 250}, 80%, ${Math.random() * 30 + 50}%, `;

// Essayez:
// Rouge: hsla(${Math.random() * 60}, 80%, ${Math.random() * 30 + 50}%, 
// Vert: hsla(${Math.random() * 60 + 120}, 80%, ${Math.random() * 30 + 50}%, 
// Cyan: hsla(${Math.random() * 60 + 180}, 80%, ${Math.random() * 30 + 50}%, 
```

### Changer le nombre de particules

```javascript
// Ligne ~155
for (let i = 0; i < 150; i++) { // Changez 150
  particleArray.push(new Particle());
}

// Plus de particules = plus beau mais plus lourd
// Recommandé: 50-200
```

### Modifier le texte

Dans `src/translations/index.js`, section `maintenance`:

```javascript
maintenance: {
  title: "VOTRE TITRE ICI",
  subtitle: "Votre sous-titre",
  message: "Votre message",
  // ...
}
```

## 📱 Test sur mobile

### Avec ngrok (exposer localhost)

```bash
# Installer ngrok
npm install -g ngrok

# Démarrer votre serveur local
npm run dev

# Dans un autre terminal
ngrok http 5173

# Vous obtiendrez une URL comme:
# https://abc123.ngrok.io
# Ouvrez-la sur votre téléphone !
```

### Avec votre IP locale

```bash
# Trouver votre IP
# Windows:
ipconfig

# Mac/Linux:
ifconfig

# Démarrer avec votre IP
npm run dev -- --host

# Accéder depuis mobile:
# http://192.168.x.x:5173
```

## 🎥 Vidéo de démo

Pour créer une vidéo de démo:

1. **Activer la maintenance**
2. **Enregistrer l'écran** avec OBS, QuickTime, ou Windows Game Bar
3. **Montrer:**
   - La page qui se charge
   - Les particules qui se déplacent
   - Le logo qui pulse
   - Les cartes qui s'animent
   - Le changement de langue
   - La version mobile

## 🚀 Partager avec l'équipe

### Option 1: Deploy sur Vercel (gratuit)

```bash
# Installer Vercel CLI
npm install -g vercel

# Deploy
vercel

# Suivre les instructions
# Vous obtiendrez une URL publique !
```

### Option 2: Deploy sur Netlify (gratuit)

```bash
# Build
npm run build

# Drag & drop le dossier dist/ sur netlify.com
# Ou utilisez Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: Partager une capture d'écran

```bash
# Prendre une capture d'écran
# Ou utiliser la touche F12 > Device toolbar > Capture screenshot

# Partager sur Slack/Discord/Email
```

## 🎬 Scénario de démo complet

### Pour une présentation client

1. **Intro** (30s)
   - "Voici notre nouvelle page de maintenance"
   - Montrer le site normal qui fonctionne

2. **Activation** (30s)
   - Ouvrir le dashboard admin (ou la console)
   - Activer le mode maintenance
   - Montrer le délai de propagation (~30s max)

3. **Page de maintenance** (2 min)
   - Montrer les effets 3D et particules
   - Montrer les 3 cartes d'info
   - Montrer les liens sociaux
   - Changer de langue (FR → EN → AR)

4. **Responsive** (1 min)
   - Desktop
   - Tablette
   - Mobile

5. **Désactivation** (30s)
   - Désactiver depuis le dashboard
   - Montrer le retour au site normal

6. **Questions** (temps restant)

## 💡 Astuces de présentation

### Préparer à l'avance

```javascript
// Créez des bookmarks dans votre navigateur

// Bookmark 1: "Activer maintenance"
javascript:(function(){localStorage.setItem('maintenance_mode',JSON.stringify({isMaintenanceMode:true,timestamp:Date.now()}));location.reload();})();

// Bookmark 2: "Désactiver maintenance"
javascript:(function(){localStorage.setItem('maintenance_mode',JSON.stringify({isMaintenanceMode:false,timestamp:Date.now()}));location.reload();})();
```

### Avoir un plan B

1. **Enregistrer une vidéo** au cas où Internet coupe
2. **Avoir des captures d'écran** de backup
3. **Tester sur plusieurs navigateurs** avant la démo
4. **Avoir le code ouvert** dans VSCode pour montrer la simplicité

## 🎯 Points à souligner

Pendant la démo, mettez en avant:

✨ **Visuellement impressionnant**
- Effets 3D professionnels
- Animations fluides
- Design moderne

🌍 **Multilingue**
- 4 langues supportées
- RTL pour l'arabe
- Police Tifinagh pour le tamazight

📱 **Responsive**
- Optimisé mobile
- Tablette
- Desktop

⚡ **Performance**
- Léger et rapide
- Pas de lag
- Animations à 60 fps

🎨 **Charte graphique**
- Couleurs MGE
- Style cohérent
- Branding respecté

🔧 **Facile à gérer**
- Interface admin simple
- Activation en 1 clic
- Temps réel

## 📞 Si quelque chose ne fonctionne pas

1. **Vérifier la console** (F12)
2. **Vérifier le localStorage**
3. **Vider le cache** (Ctrl+Shift+R)
4. **Redémarrer le serveur**
5. **Vérifier la version de Node** (>= 18)

## 🎊 Enjoy !

La page de maintenance est prête à impressionner ! 

---

**Créé avec ❤️ pour Morocco Gaming Expo**
