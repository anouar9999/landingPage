# 🎯 Guide de Test Complet - Page de Maintenance MGE

> Guide pratique pour tester la page de maintenance en 5 minutes

## 🚀 Démarrage Rapide

### Étape 1: Lancer le serveur de développement

```powershell
npm run dev
```

✅ **Résultat attendu:**
```
VITE v5.4.14  ready in 409 ms
➜  Local:   http://localhost:5173/
```

### Étape 2: Ouvrir le testeur de maintenance

Double-cliquez sur `TEST_MAINTENANCE.html` ou lancez:

```powershell
start TEST_MAINTENANCE.html
```

## 🔧 Utilisation du Testeur

### Interface du Testeur

Le testeur affiche:
- ✅ **Statut actuel** du mode maintenance (ACTIVÉ/DÉSACTIVÉ)
- 🔴 **Bouton Activer** - Active le mode maintenance
- 🟢 **Bouton Désactiver** - Désactive le mode maintenance
- 🔄 **Bouton Recharger** - Recharge la page principale
- 🗑️ **Bouton Vider Cache** - Supprime le cache localStorage

### Scénario de Test #1: Activer la Maintenance

1. **Cliquez sur "🔴 Activer"**
   - Le statut devient "✅ ACTIVÉ" avec animation
   - Une alerte de confirmation s'affiche

2. **Cliquez sur "🔄 Recharger la Page"**
   - Redirige vers http://localhost:5173/
   - La page de maintenance s'affiche avec effets 3D

3. **Vérifiez les éléments suivants:**
   - [ ] Particules 3D animées (150 particules)
   - [ ] Logo MGE avec effet de pulse
   - [ ] Titre "EN MAINTENANCE" animé
   - [ ] Message de maintenance
   - [ ] Estimation du temps
   - [ ] Cartes d'information animées
   - [ ] Dégradé de couleurs violet/rose
   - [ ] Connexions entre particules

### Scénario de Test #2: Désactiver la Maintenance

1. **Retournez au testeur** (TEST_MAINTENANCE.html)

2. **Cliquez sur "🟢 Désactiver"**
   - Le statut devient "⚠️ DÉSACTIVÉ"
   - Une alerte de confirmation s'affiche

3. **Cliquez sur "🔄 Recharger la Page"**
   - Redirige vers http://localhost:5173/
   - La page normale du site s'affiche

### Scénario de Test #3: Test de Cache

1. **Activez la maintenance**
2. **Attendez 60 secondes** (durée du cache)
3. **Rechargez la page** - Le cache devrait être expiré
4. **Testez sans backend API** - Devrait utiliser le cache localStorage

## 🧪 Tests Manuels

### ✅ Checklist de Validation

#### Affichage

- [ ] **Particules 3D**
  - [ ] 150 particules visibles sur desktop
  - [ ] 80 particules sur tablette
  - [ ] 50 particules sur mobile
  - [ ] Mouvement fluide (60 FPS)
  - [ ] Connexions entre particules proches

- [ ] **Logo MGE**
  - [ ] Logo centré
  - [ ] Animation de pulse (scale 1.0 → 1.05)
  - [ ] Durée 2 secondes, répétition infinie

- [ ] **Titre Principal**
  - [ ] Texte "EN MAINTENANCE" visible
  - [ ] Animation de fondu (opacity 0 → 1)
  - [ ] Animation de position (y: 50 → 0)
  - [ ] Durée 1 seconde

- [ ] **Message de Maintenance**
  - [ ] Message visible et centré
  - [ ] Animation de fondu retardée (delay 0.3s)
  - [ ] Texte lisible

- [ ] **Cartes d'Information**
  - [ ] 3 cartes visibles
  - [ ] Animation séquentielle (stagger 0.2s)
  - [ ] Hover effect fonctionnel
  - [ ] Icônes visibles

#### Responsive Design

- [ ] **Desktop (1920px+)**
  - [ ] Layout horizontal correct
  - [ ] Toutes les particules visibles
  - [ ] Cartes en ligne
  - [ ] Espacement correct

- [ ] **Tablette (768px - 1024px)**
  - [ ] Layout adapté
  - [ ] Nombre de particules réduit
  - [ ] Cartes empilées si nécessaire
  - [ ] Texte lisible

- [ ] **Mobile (<768px)**
  - [ ] Layout vertical
  - [ ] 50 particules seulement
  - [ ] Cartes empilées verticalement
  - [ ] Boutons tactiles fonctionnels

#### Multi-langue

- [ ] **Français (FR)**
  - [ ] "EN MAINTENANCE"
  - [ ] Message correct
  - [ ] Cartes traduites

- [ ] **English (EN)**
  - [ ] "UNDER MAINTENANCE"
  - [ ] Message correct
  - [ ] Cards translated

- [ ] **العربية (AR)**
  - [ ] "قيد الصيانة"
  - [ ] Texte RTL correct
  - [ ] Direction de texte inversée

- [ ] **ⵜⴰⵎⴰⵣⵉⵖⵜ (TZ)**
  - [ ] "ⴷⴳ ⵓⵙⵎⴰⵜⵜⴰⵢ"
  - [ ] Police Tifinagh chargée
  - [ ] Caractères spéciaux visibles

#### Performance

- [ ] **Temps de chargement**
  - [ ] Page affichée en < 1 seconde
  - [ ] Animations démarrent immédiatement
  - [ ] Pas de lag visible

- [ ] **Animations**
  - [ ] 60 FPS constant
  - [ ] Pas de saccades
  - [ ] Transitions fluides

- [ ] **Mémoire**
  - [ ] Pas de fuite mémoire
  - [ ] Utilisation CPU raisonnable
  - [ ] Canvas nettoyé correctement

## 🌐 Tests Console Navigateur

### Ouvrir la Console

- **Chrome/Edge**: `F12` ou `Ctrl + Shift + J`
- **Firefox**: `F12` ou `Ctrl + Shift + K`

### Commandes de Test

#### 1. Activer la maintenance

```javascript
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: true,
  timestamp: Date.now(),
  message: "Le site est en maintenance",
  estimatedTime: "30 minutes"
}));
location.reload();
```

#### 2. Désactiver la maintenance

```javascript
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: false,
  timestamp: Date.now()
}));
location.reload();
```

#### 3. Vérifier l'état actuel

```javascript
const status = JSON.parse(localStorage.getItem('maintenance_mode'));
console.log('Mode maintenance:', status?.isMaintenanceMode ? 'ACTIVÉ' : 'DÉSACTIVÉ');
console.log('Timestamp:', new Date(status?.timestamp).toLocaleString());
console.log('Message:', status?.message);
```

#### 4. Tester le cache

```javascript
const cache = JSON.parse(localStorage.getItem('maintenance_mode'));
const age = Date.now() - cache.timestamp;
console.log('Âge du cache:', Math.floor(age / 1000), 'secondes');
console.log('Cache expiré?', age > 60000 ? 'OUI' : 'NON');
```

#### 5. Vider le cache

```javascript
localStorage.removeItem('maintenance_mode');
console.log('Cache supprimé ✅');
```

## 📱 Tests sur Différents Appareils

### Desktop

1. **Chrome Desktop** (1920x1080)
   - [ ] Ouvrir http://localhost:5173/
   - [ ] Activer la maintenance
   - [ ] Vérifier les 150 particules
   - [ ] Tester le hover sur les cartes

2. **Firefox Desktop** (1920x1080)
   - [ ] Mêmes tests que Chrome
   - [ ] Vérifier la compatibilité Canvas

3. **Edge Desktop** (1920x1080)
   - [ ] Mêmes tests que Chrome
   - [ ] Vérifier les animations GSAP

### Mobile (Simulateur)

1. **Chrome DevTools** (iPhone 12 Pro)
   ```
   - Appuyer sur F12
   - Cliquer sur l'icône "Toggle device toolbar"
   - Sélectionner "iPhone 12 Pro"
   ```
   - [ ] Layout vertical correct
   - [ ] 50 particules maximum
   - [ ] Texte lisible
   - [ ] Boutons tactiles fonctionnels

2. **Chrome DevTools** (iPad Pro)
   - [ ] Layout tablette correct
   - [ ] 80 particules
   - [ ] Cartes adaptées

### Navigateurs

- [ ] **Chrome** (v120+) - Recommandé
- [ ] **Firefox** (v115+) - Compatible
- [ ] **Edge** (v120+) - Compatible
- [ ] **Safari** (v16+) - À tester

## 🔍 Débogage

### Problème: Page de maintenance ne s'affiche pas

**Solutions:**

1. **Vérifier le cache:**
   ```javascript
   console.log(localStorage.getItem('maintenance_mode'));
   ```

2. **Vider le cache navigateur:**
   - Chrome: `Ctrl + Shift + Delete`
   - Cocher "Cached images and files"
   - Cliquer "Clear data"

3. **Vérifier la console:**
   - Ouvrir DevTools (F12)
   - Chercher les erreurs en rouge
   - Vérifier les warnings

### Problème: Particules ne s'affichent pas

**Solutions:**

1. **Vérifier Canvas:**
   ```javascript
   const canvas = document.querySelector('canvas');
   console.log('Canvas trouvé:', canvas !== null);
   console.log('Dimensions:', canvas?.width, 'x', canvas?.height);
   ```

2. **Vérifier les animations:**
   ```javascript
   console.log('GSAP chargé:', typeof gsap !== 'undefined');
   ```

### Problème: Traductions incorrectes

**Solutions:**

1. **Vérifier la langue:**
   ```javascript
   console.log('Langue actuelle:', localStorage.getItem('language'));
   ```

2. **Changer la langue:**
   ```javascript
   localStorage.setItem('language', 'en'); // ou 'fr', 'ar', 'tz'
   location.reload();
   ```

## 📊 Résultats Attendus

### Performances Cibles

| Métrique | Valeur Cible | Comment Mesurer |
|----------|--------------|-----------------|
| **FPS** | ≥ 60 FPS | Chrome DevTools > Performance |
| **Temps de chargement** | < 1s | Network Tab > DOMContentLoaded |
| **Taille bundle** | < 500KB | Build output |
| **Particules desktop** | 150 | Console > Count |
| **Particules mobile** | 50 | Console > Count |
| **Cache duration** | 60s | localStorage timestamp |

### Captures d'Écran à Faire

1. **Desktop - État normal**
   - Page principale du site
   - Sans maintenance

2. **Desktop - Mode maintenance**
   - Page de maintenance complète
   - Avec particules 3D
   - Logo et titre visibles

3. **Mobile - Mode maintenance**
   - Layout responsive
   - Particules réduites
   - Cartes empilées

4. **Testeur de maintenance**
   - Interface du testeur
   - Statut ACTIVÉ
   - Boutons visibles

## ✅ Validation Finale

### Avant de Déployer

- [ ] **Tests locaux réussis** (tous les scénarios ci-dessus)
- [ ] **Build production OK** (`npm run build`)
- [ ] **Pas d'erreurs console**
- [ ] **Performances acceptables** (≥60 FPS)
- [ ] **Responsive testé** (3 tailles)
- [ ] **Multi-langue testé** (4 langues)
- [ ] **Cache fonctionnel**
- [ ] **Testeur HTML fonctionnel**

### Après Validation

1. **Créer une branche Git:**
   ```powershell
   git checkout -b feature/maintenance-page
   git add .
   git commit -m "feat: Add maintenance page with 3D effects"
   git push origin feature/maintenance-page
   ```

2. **Créer un Pull Request** sur GitHub

3. **Demander une review** à l'équipe

4. **Merger** après approbation

5. **Déployer** sur le serveur de staging

6. **Tester** en staging

7. **Déployer** en production

## 🎬 Vidéo de Démo

### Script de Démo

1. **Introduction** (30s)
   - "Bonjour, voici la nouvelle page de maintenance MGE"
   - Montrer le site normal

2. **Activation** (1min)
   - Ouvrir TEST_MAINTENANCE.html
   - Cliquer "Activer"
   - Montrer le changement de statut
   - Recharger la page

3. **Présentation** (2min)
   - Montrer les particules 3D
   - Montrer l'animation du logo
   - Montrer le titre et le message
   - Montrer les cartes d'information
   - Changer de langue

4. **Responsive** (1min)
   - Redimensionner la fenêtre
   - Montrer le mode tablette
   - Montrer le mode mobile

5. **Désactivation** (30s)
   - Retour au testeur
   - Cliquer "Désactiver"
   - Recharger la page
   - Retour au site normal

**Durée totale:** 5 minutes

## 📞 Support

### En cas de problème

1. **Vérifier la documentation:**
   - INDEX.md - Navigation complète
   - QUICK_START.md - Démarrage rapide
   - TROUBLESHOOTING.md - Résolution de problèmes

2. **Consulter les logs:**
   - Console navigateur (F12)
   - Terminal Vite
   - Fichiers de log

3. **Contacter l'équipe:**
   - GitHub Issues
   - Discord MGE
   - Email: support@mgexpo.ma

---

<div align="center">

**🔧 Guide de Test Complet**

**Page de Maintenance MGE v1.0.0**

*Dernière mise à jour: 26 octobre 2025*

</div>
