# Système de Gestion des Publicités

Ce dossier contient l'ensemble des composants et outils nécessaires pour administrer et afficher les publicités sur le site MGE Gaming. Le système a été conçu pour être à la fois flexible, attrayant visuellement et informatif.

## 🔍 Aperçu du Système

Le système de publicité comprend plusieurs éléments clés :

1. **Contexte centralisé** (`AdContext.jsx`) - Gère l'état global des publicités, les statistiques et les configurations
2. **Emplacements publicitaires** (`AdSpot.jsx`) - Composants réutilisables pour afficher les publicités dans différents formats
3. **Contrôleur utilisateur** (`AdController.jsx`) - Permet aux utilisateurs d'activer/désactiver les publicités
4. **Publicités spécifiques** :
   - `HeroAdOverlay.jsx` - Superposition publicitaire sur la section héro
   - `FooterAd.jsx` - Bannière publicitaire avant le pied de page
   - `PopupAd.jsx` - Popup publicitaire après un délai
5. **Panneau d'administration** (`AdAdmin.jsx`) - Interface pour visualiser et gérer les statistiques des publicités

## 🛠️ Comment l'utiliser

### Afficher un emplacement publicitaire

Pour ajouter un nouvel emplacement publicitaire, utilisez le composant `AdSpot` :

```jsx
import AdSpot from './components/AdSpot';
import { useAds } from './context/AdContext';

function MyComponent() {
  const { showAds } = useAds();
  
  return (
    <div>
      {/* Votre contenu */}
      
      {showAds && (
        <AdSpot 
          width="728" 
          height="90" 
          className="mx-auto my-5" 
          spotId="myNewAdSpot"
          data-ad-spot="myNewAdSpot"
        />
      )}
      
      {/* Suite de votre contenu */}
    </div>
  );
}
```

### Configurer un nouvel emplacement publicitaire

Pour ajouter la configuration d'un nouvel emplacement, modifiez `AD_SPOTS_CONFIG` dans `AdContext.jsx` :

```javascript
const AD_SPOTS_CONFIG = {
  // Emplacements existants...
  
  myNewAdSpot: {
    name: "Nom affiché",
    dimensions: "728×90",
    ctr: 0.9, // CTR estimé en pourcentage
    price: "2000-3000 DH",
    priority: 8 // Plus élevé = plus prioritaire pour le chargement
  },
};
```

### Utiliser le Panneau d'Administration

Le panneau d'admin est automatiquement ajouté à l'application et accessible via un bouton flottant en bas à droite de l'écran. Il propose trois onglets :

1. **Statistiques** - Affiche les impressions, clics et CTR pour chaque emplacement
2. **Gestion** - Permet de visualiser et contrôler les emplacements actifs
3. **Aperçu** - Montre des aperçus des différents formats d'annonces

## 🎯 Fonctionnalités Avancées

### Interaction avec les Emplacements

Le système inclut des interactions visuelles comme :
- Animation d'apparition des emplacements publicitaires
- Survol pour afficher des informations détaillées
- Mise en évidence des emplacements depuis le panneau d'administration

### Persistance des Préférences

Les préférences des utilisateurs concernant l'affichage des publicités sont sauvegardées dans le localStorage du navigateur.

### Statistiques Simulées

Le système simule des statistiques pour démonstration, mais peut facilement être connecté à une API réelle pour des données en temps réel.

## 📋 Formats Publicitaires Disponibles

| Format | Dimensions | Usage Recommandé |
|--------|------------|------------------|
| Leaderboard | 728×90 | En-tête, entre les sections |
| Billboard | 970×250 | Bannière premium en haut de page |
| MREC | 300×250 | Format medium rectangle intégré au contenu |
| Skyscraper | 300×600 | Bannière verticale latérale |
| Mobile Banner | 320×50 | Format adapté aux mobiles |
| Interstitial | Plein écran | Publicité popup ou interstitielle |

## ⚙️ Paramètres de Configuration

Le délai d'apparition des popups est configurable dans `PopupAd.jsx` (actuellement réglé à 15 secondes).

Pour modifier le style global des publicités, ajustez les classes CSS dans les composants individuels ou dans les fichiers de style généraux.

---

Pour toute question ou amélioration, contactez l'équipe de développement MGE Gaming. 