# Guide d'intégration du mode maintenance avec le Dashboard Admin

## 🎨 Page de Maintenance

Une page de maintenance extraordinaire avec des effets 3D morphisme a été créée et intégrée au site.

## 📁 Fichiers créés

### Frontend (Landing Page)
1. `src/components/MaintenancePage.jsx` - Page de maintenance avec effets 3D
2. `src/utils/maintenanceService.js` - Service pour gérer l'état de maintenance
3. `src/hooks/useMaintenance.js` - Hook React pour utiliser le service de maintenance
4. `src/App.jsx` - Modifié pour intégrer la page de maintenance

## 🔧 Fonctionnalités

### Page de Maintenance
- ✨ Effets 3D morphisme avec particules animées
- 🎨 Dégradés et effets de brillance
- 📱 Design responsive
- 🌐 Support multilingue (FR, AR, TZ)
- 💫 Animations GSAP fluides
- 🔗 Liens vers les réseaux sociaux

### Système de contrôle
- 🔄 Vérification automatique toutes les 30 secondes
- 💾 Cache local pour réduire les appels API
- ⚡ Détection de changement de focus de la fenêtre
- 🎯 Basculement automatique entre mode normal et maintenance

## 🚀 Configuration du Dashboard Admin

### Structure API recommandée

Créez un endpoint API dans votre dashboard admin :

**URL**: `https://admin.gnews.ma/api/maintenance`

**Méthode**: `GET`

**Réponse**:
```json
{
  "isMaintenanceMode": false,
  "message": "Maintenance planifiée",
  "estimatedEndTime": "2025-10-27T10:00:00Z"
}
```

### Exemple d'implémentation Backend (Laravel/PHP)

#### 1. Migration pour la table maintenance

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaintenanceSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('maintenance_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_maintenance_mode')->default(false);
            $table->text('message')->nullable();
            $table->timestamp('estimated_end_time')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenance_settings');
    }
}
```

#### 2. Modèle

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceSetting extends Model
{
    protected $fillable = [
        'is_maintenance_mode',
        'message',
        'estimated_end_time',
    ];

    protected $casts = [
        'is_maintenance_mode' => 'boolean',
        'estimated_end_time' => 'datetime',
    ];
}
```

#### 3. Contrôleur API

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceSetting;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    /**
     * Get maintenance status (public endpoint)
     */
    public function getStatus()
    {
        $setting = MaintenanceSetting::latest()->first();
        
        return response()->json([
            'isMaintenanceMode' => $setting ? $setting->is_maintenance_mode : false,
            'message' => $setting ? $setting->message : null,
            'estimatedEndTime' => $setting && $setting->estimated_end_time 
                ? $setting->estimated_end_time->toIso8601String() 
                : null,
        ]);
    }

    /**
     * Update maintenance status (admin only)
     */
    public function updateStatus(Request $request)
    {
        $request->validate([
            'is_maintenance_mode' => 'required|boolean',
            'message' => 'nullable|string',
            'estimated_end_time' => 'nullable|date',
        ]);

        $setting = MaintenanceSetting::latest()->first();
        
        if (!$setting) {
            $setting = new MaintenanceSetting();
        }

        $setting->is_maintenance_mode = $request->is_maintenance_mode;
        $setting->message = $request->message;
        $setting->estimated_end_time = $request->estimated_end_time;
        $setting->save();

        return response()->json([
            'success' => true,
            'data' => $setting,
        ]);
    }
}
```

#### 4. Routes API

```php
<?php

use App\Http\Controllers\Api\MaintenanceController;

// Public route
Route::get('/maintenance', [MaintenanceController::class, 'getStatus']);

// Protected route (admin only)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/maintenance', [MaintenanceController::class, 'updateStatus']);
});
```

#### 5. Interface Admin (Vue/React Component)

```vue
<template>
  <div class="maintenance-control">
    <h2>Mode Maintenance</h2>
    
    <div class="control-panel">
      <div class="switch-container">
        <label>
          <input 
            type="checkbox" 
            v-model="isMaintenanceMode"
            @change="updateMaintenanceMode"
          />
          Mode Maintenance
        </label>
      </div>

      <div class="status" :class="{ active: isMaintenanceMode }">
        <span v-if="isMaintenanceMode">🔴 ACTIF</span>
        <span v-else>🟢 INACTIF</span>
      </div>

      <div class="message-input">
        <label>Message (optionnel)</label>
        <textarea 
          v-model="message"
          placeholder="Message à afficher aux utilisateurs"
        ></textarea>
      </div>

      <div class="time-input">
        <label>Heure de fin estimée (optionnel)</label>
        <input 
          type="datetime-local" 
          v-model="estimatedEndTime"
        />
      </div>

      <button 
        @click="saveSettings"
        class="btn-save"
        :disabled="saving"
      >
        {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMaintenanceMode: false,
      message: '',
      estimatedEndTime: null,
      saving: false,
    };
  },
  
  mounted() {
    this.loadSettings();
  },
  
  methods: {
    async loadSettings() {
      try {
        const response = await fetch('/api/maintenance');
        const data = await response.json();
        
        this.isMaintenanceMode = data.isMaintenanceMode;
        this.message = data.message || '';
        this.estimatedEndTime = data.estimatedEndTime 
          ? new Date(data.estimatedEndTime).toISOString().slice(0, 16)
          : null;
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    },
    
    async saveSettings() {
      this.saving = true;
      
      try {
        const response = await fetch('/api/maintenance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`,
          },
          body: JSON.stringify({
            is_maintenance_mode: this.isMaintenanceMode,
            message: this.message,
            estimated_end_time: this.estimatedEndTime,
          }),
        });
        
        if (response.ok) {
          alert('Paramètres enregistrés avec succès!');
        }
      } catch (error) {
        console.error('Error saving settings:', error);
        alert('Erreur lors de l\'enregistrement');
      } finally {
        this.saving = false;
      }
    },
    
    updateMaintenanceMode() {
      this.saveSettings();
    },
    
    getAuthToken() {
      // Récupérer le token d'authentification
      return localStorage.getItem('auth_token');
    },
  },
};
</script>

<style scoped>
.maintenance-control {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.switch-container label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}

.status {
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.status.active {
  background: #fee;
  color: #c00;
}

.status:not(.active) {
  background: #efe;
  color: #0c0;
}

.message-input textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
}

.time-input input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-save {
  padding: 0.75rem 1.5rem;
  background: #8a2be2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## 📝 Configuration du service frontend

Modifiez l'URL de l'API dans `src/utils/maintenanceService.js` :

```javascript
const MAINTENANCE_API_URL = 'https://admin.gnews.ma/api/maintenance';
```

## 🧪 Test local

### 1. Sans dashboard admin (test manuel)

Pour tester localement sans le dashboard admin, vous pouvez utiliser le localStorage :

```javascript
// Dans la console du navigateur
localStorage.setItem('maintenance_mode', JSON.stringify({
  isMaintenanceMode: true,
  timestamp: Date.now()
}));

// Rafraîchir la page
```

### 2. Avec un serveur mock

Créez un fichier `public/api/maintenance.json` :

```json
{
  "isMaintenanceMode": true,
  "message": "Maintenance en cours",
  "estimatedEndTime": null
}
```

Et modifiez temporairement l'URL dans le service :
```javascript
const MAINTENANCE_API_URL = '/api/maintenance.json';
```

## 🔒 Sécurité CORS

Assurez-vous que le dashboard admin autorise les requêtes CORS depuis votre domaine :

```php
// Dans config/cors.php (Laravel)
'paths' => ['api/*'],
'allowed_origins' => ['https://gnews.ma', 'http://localhost:5173'],
```

## 🎯 Prochaines étapes

1. ✅ Cloner le dashboard admin : `git clone https://github.com/anouar9999/platform-admin`
2. ✅ Installer les dépendances : `npm install`
3. ✅ Ajouter les fichiers du guide ci-dessus
4. ✅ Tester en local : `npm run dev`
5. ✅ Déployer sur le serveur live

## 🆘 Support

Si vous avez besoin d'aide pour l'intégration, consultez la documentation ou contactez l'équipe de développement.

---

**Note**: Ce système est conçu pour être flexible et facile à maintenir. Vous pouvez l'adapter selon vos besoins spécifiques.
