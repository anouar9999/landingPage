# 🧪 Script de Test - Page de Maintenance

## Test rapide dans la console du navigateur

Ouvrez la console de votre navigateur (F12) et exécutez ces commandes:

### 1. Activer la page de maintenance manuellement

```javascript
// Activer le mode maintenance
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: true,
  timestamp: Date.now()
}));

// Rafraîchir la page
location.reload();
```

### 2. Désactiver la page de maintenance

```javascript
// Désactiver le mode maintenance
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: false,
  timestamp: Date.now()
}));

// Rafraîchir la page
location.reload();
```

### 3. Tester le service de maintenance

```javascript
// Importer le service (si disponible dans window)
// ou copier-coller le code ci-dessous

class MaintenanceTest {
  async testService() {
    console.log('🧪 Début des tests...');
    
    // Test 1: Vérifier le cache
    const cached = localStorage.getItem('maintenance_mode');
    console.log('📦 Cache actuel:', cached);
    
    // Test 2: Forcer une vérification
    try {
      const response = await fetch('/api/maintenance');
      const data = await response.json();
      console.log('✅ Réponse API:', data);
    } catch (error) {
      console.log('❌ Erreur API:', error);
    }
    
    // Test 3: Vérifier le localStorage
    const stored = localStorage.getItem('maintenance_mode');
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('💾 État stocké:', parsed);
      console.log('⏰ Temps écoulé:', Date.now() - parsed.timestamp, 'ms');
    }
    
    console.log('✨ Tests terminés!');
  }
}

const test = new MaintenanceTest();
test.testService();
```

## Test avec mock API local

### Créer un fichier mock

Créez `public/api/maintenance.json`:

```json
{
  "isMaintenanceMode": true,
  "message": "Test de maintenance",
  "estimatedEndTime": "2025-10-27T10:00:00Z"
}
```

### Modifier temporairement le service

Dans `src/utils/maintenanceService.js`, changez temporairement:

```javascript
// Ligne à modifier temporairement
const MAINTENANCE_API_URL = '/api/maintenance.json';
```

### Tester

```bash
npm run dev
```

Ouvrez `http://localhost:5173` - Vous devriez voir la page de maintenance.

## Tests automatisés avec Jest

Si vous utilisez Jest, créez `src/utils/__tests__/maintenanceService.test.js`:

```javascript
import maintenanceService from '../maintenanceService';

describe('MaintenanceService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('devrait récupérer le statut depuis le cache', () => {
    const mockData = {
      isMaintenanceMode: true,
      timestamp: Date.now()
    };
    
    localStorage.setItem('maintenance_mode', JSON.stringify(mockData));
    
    const cached = maintenanceService.getCachedStatus();
    expect(cached).toBe(true);
  });

  test('devrait retourner null si le cache est expiré', () => {
    const mockData = {
      isMaintenanceMode: true,
      timestamp: Date.now() - 120000 // 2 minutes dans le passé
    };
    
    localStorage.setItem('maintenance_mode', JSON.stringify(mockData));
    
    const cached = maintenanceService.getCachedStatus();
    expect(cached).toBe(null);
  });

  test('devrait appeler l\'API si pas de cache', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ isMaintenanceMode: false })
      })
    );

    const status = await maintenanceService.checkMaintenanceStatus();
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/maintenance'),
      expect.any(Object)
    );
    expect(status).toBe(false);
  });
});
```

## Test E2E avec Cypress

Créez `cypress/e2e/maintenance.cy.js`:

```javascript
describe('Page de Maintenance', () => {
  it('devrait afficher la page de maintenance quand activée', () => {
    // Activer le mode maintenance via localStorage
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('maintenance_mode', JSON.stringify({
          isMaintenanceMode: true,
          timestamp: Date.now()
        }));
      }
    });

    // Vérifier que la page de maintenance s'affiche
    cy.contains('EN MAINTENANCE').should('be.visible');
    cy.contains('Nous améliorons votre expérience de jeu').should('be.visible');
  });

  it('devrait afficher le site normal quand désactivée', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('maintenance_mode', JSON.stringify({
          isMaintenanceMode: false,
          timestamp: Date.now()
        }));
      }
    });

    // Vérifier que le site normal s'affiche
    cy.contains('Morocco Gaming Expo').should('be.visible');
  });

  it('devrait avoir des animations 3D qui fonctionnent', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('maintenance_mode', JSON.stringify({
          isMaintenanceMode: true,
          timestamp: Date.now()
        }));
      }
    });

    // Vérifier la présence du canvas
    cy.get('canvas').should('exist');
    
    // Vérifier les animations GSAP
    cy.get('.maintenance-logo').should('have.class', 'maintenance-logo');
  });

  it('devrait changer de langue correctement', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('maintenance_mode', JSON.stringify({
          isMaintenanceMode: true,
          timestamp: Date.now()
        }));
      }
    });

    // Français par défaut
    cy.contains('EN MAINTENANCE').should('be.visible');

    // Changer en arabe (simuler le changement de langue)
    // Note: Adapter selon votre système de changement de langue
  });
});
```

## Checklist de test manuelle

### ✅ Tests de base
- [ ] La page de maintenance s'affiche quand `isMaintenanceMode = true`
- [ ] Le site normal s'affiche quand `isMaintenanceMode = false`
- [ ] Le loader s'affiche pendant la vérification initiale
- [ ] Le cache fonctionne correctement

### ✅ Tests visuels
- [ ] Les animations 3D fonctionnent
- [ ] Les particules se déplacent correctement
- [ ] Le logo pulse
- [ ] Les cartes s'animent au chargement
- [ ] Les liens sociaux sont cliquables

### ✅ Tests responsive
- [ ] Desktop (1920x1080) : Tout s'affiche correctement
- [ ] Tablette (768x1024) : Adapté au format
- [ ] Mobile (375x667) : Optimisé pour petit écran

### ✅ Tests de langues
- [ ] Français : Tous les textes corrects
- [ ] Anglais : Tous les textes corrects
- [ ] Arabe : Tous les textes corrects + RTL
- [ ] Tamazight : Tous les textes corrects

### ✅ Tests de performance
- [ ] Temps de chargement < 2 secondes
- [ ] Animations fluides (60 fps)
- [ ] Pas de lag au scroll
- [ ] Mémoire stable (pas de fuite)

### ✅ Tests d'intégration
- [ ] L'API du dashboard admin répond correctement
- [ ] Les changements se propagent en < 30 secondes
- [ ] Le cache expire après 1 minute
- [ ] Les erreurs sont gérées gracieusement

## Outils de debug

### Debug du service

```javascript
// Activer les logs
maintenanceService.debug = true;

// Voir l'état actuel
console.log('État:', maintenanceService.isMaintenanceMode);
console.log('Dernière vérification:', maintenanceService.lastCheck);
```

### Debug des animations

```javascript
// Dans la console
gsap.globalTimeline.pause(); // Pause toutes les animations
gsap.globalTimeline.play();  // Reprendre les animations
gsap.globalTimeline.seek(0); // Retour au début
```

### Debug du canvas

```javascript
// Voir le nombre de particules
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log('Canvas:', canvas.width, 'x', canvas.height);
```

## Rapport de bugs

Si vous trouvez un bug, créez un issue avec:

1. **Description**: Que se passe-t-il ?
2. **Étapes**: Comment reproduire ?
3. **Attendu**: Que devrait-il se passer ?
4. **Environnement**: Navigateur, OS, résolution
5. **Screenshots**: Si possible
6. **Console**: Erreurs dans la console

---

**Bon tests ! 🚀**
