# 🔧 Guide d'Installation - Dashboard Admin Maintenance

> Guide complet pour intégrer le contrôle de maintenance dans le dashboard admin

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation du Dashboard](#installation-du-dashboard)
3. [Ajout du Composant Maintenance](#ajout-du-composant-maintenance)
4. [Configuration de l'API Backend](#configuration-de-lapi-backend)
5. [Tests](#tests)
6. [Déploiement](#déploiement)

---

## 🎯 Prérequis

- ✅ Node.js ≥18.0.0
- ✅ npm ou yarn
- ✅ Dashboard admin cloné: `https://github.com/anouar9999/platform-admin`
- ✅ Backend Laravel configuré (ou en cours de configuration)

---

## 📦 Installation du Dashboard

### Étape 1: Cloner et Installer

```powershell
# Si pas encore fait
cd C:\Users\MRCONNECT\Desktop
git clone https://github.com/anouar9999/platform-admin
cd platform-admin

# Installer les dépendances
npm install
```

### Étape 2: Vérifier la Structure

```powershell
# Explorer la structure
ls src/app/admin/components
```

Vous devriez voir:
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----                                             brackets
d-----                                             Steps
d-----                                             widgets
-a----                                      5344   AdvanceButton.jsx
-a----                                      2197   CustomButton.jsx
...
```

---

## 🎨 Ajout du Composant Maintenance

### Étape 1: Copier le Composant

Le composant `MaintenanceControl.jsx` a été créé dans:
```
C:\Users\MRCONNECT\Desktop\gamiusapp\DASHBOARD_MAINTENANCE_COMPONENT.jsx
```

**Copiez-le vers:**
```
C:\Users\MRCONNECT\Desktop\platform-admin\src\app\admin\components\MaintenanceControl.jsx
```

**PowerShell:**
```powershell
# Depuis le dossier gamiusapp
Copy-Item DASHBOARD_MAINTENANCE_COMPONENT.jsx ..\platform-admin\src\app\admin\components\MaintenanceControl.jsx
```

### Étape 2: Créer une Page Dédiée (Option A)

Créez une nouvelle page pour la gestion de maintenance:

```powershell
# Créer le dossier
New-Item -ItemType Directory -Path "src\app\admin\(pages)\maintenance"

# Créer le fichier page.jsx
```

**Fichier: `src/app/admin/(pages)/maintenance/page.jsx`**
```jsx
import MaintenanceControl from '../../components/MaintenanceControl';

export const metadata = {
  title: 'Gestion de Maintenance | Admin Dashboard',
  description: 'Contrôlez le mode maintenance du site',
};

export default function MaintenancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MaintenanceControl />
    </div>
  );
}
```

### Étape 3: Ajouter au Dashboard Principal (Option B)

Ou ajoutez directement dans le dashboard principal:

**Fichier: `src/app/admin/page.jsx`** (à modifier)

```jsx
// Ajouter l'import
import MaintenanceControl from './components/MaintenanceControl';

// Dans le return, ajouter une section:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Autres widgets... */}
  
  <div className="col-span-1 lg:col-span-2">
    <MaintenanceControl />
  </div>
</div>
```

### Étape 4: Ajouter au Menu de Navigation

**Fichier: `src/app/admin/layout/Navigation.jsx`** (ou équivalent)

Ajoutez un lien dans le menu:

```jsx
<NavLink 
  href="/admin/maintenance" 
  icon={<FiTool />}
>
  Maintenance
</NavLink>
```

---

## 🔧 Configuration de l'API Backend

### Option 1: Backend Laravel (Recommandé)

#### 1. Créer la Migration

```bash
php artisan make:migration create_maintenance_settings_table
```

**Fichier de migration:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('maintenance_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_maintenance_mode')->default(false);
            $table->text('message')->nullable();
            $table->string('estimated_time')->nullable();
            $table->timestamp('last_update')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenance_settings');
    }
};
```

```bash
php artisan migrate
```

#### 2. Créer le Controller

```bash
php artisan make:controller MaintenanceController
```

**Fichier: `app/Http/Controllers/MaintenanceController.php`**
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaintenanceSetting;

class MaintenanceController extends Controller
{
    /**
     * Obtenir le statut de maintenance
     */
    public function getStatus()
    {
        $setting = MaintenanceSetting::first();
        
        if (!$setting) {
            $setting = MaintenanceSetting::create([
                'is_maintenance_mode' => false,
                'message' => '',
                'estimated_time' => '',
            ]);
        }

        return response()->json([
            'isMaintenanceMode' => $setting->is_maintenance_mode,
            'message' => $setting->message,
            'estimatedTime' => $setting->estimated_time,
            'lastUpdate' => $setting->updated_at,
        ]);
    }

    /**
     * Mettre à jour le statut de maintenance
     */
    public function updateStatus(Request $request)
    {
        $request->validate([
            'isMaintenanceMode' => 'required|boolean',
            'message' => 'nullable|string|max:500',
            'estimatedTime' => 'nullable|string|max:100',
        ]);

        $setting = MaintenanceSetting::first();
        
        if (!$setting) {
            $setting = new MaintenanceSetting();
        }

        $setting->is_maintenance_mode = $request->isMaintenanceMode;
        $setting->message = $request->message;
        $setting->estimated_time = $request->estimatedTime;
        $setting->last_update = now();
        $setting->save();

        return response()->json([
            'success' => true,
            'message' => 'Statut de maintenance mis à jour',
            'data' => [
                'isMaintenanceMode' => $setting->is_maintenance_mode,
                'message' => $setting->message,
                'estimatedTime' => $setting->estimated_time,
                'lastUpdate' => $setting->updated_at,
            ]
        ]);
    }
}
```

#### 3. Créer le Model

```bash
php artisan make:model MaintenanceSetting
```

**Fichier: `app/Models/MaintenanceSetting.php`**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceSetting extends Model
{
    protected $fillable = [
        'is_maintenance_mode',
        'message',
        'estimated_time',
        'last_update',
    ];

    protected $casts = [
        'is_maintenance_mode' => 'boolean',
        'last_update' => 'datetime',
    ];
}
```

#### 4. Configurer les Routes

**Fichier: `routes/api.php`**
```php
use App\Http\Controllers\MaintenanceController;

// Routes publiques (pour le frontend)
Route::get('/maintenance', [MaintenanceController::class, 'getStatus']);

// Routes protégées (pour les admins uniquement)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/maintenance', [MaintenanceController::class, 'updateStatus']);
});
```

#### 5. Configurer CORS

**Fichier: `config/cors.php`**
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['https://gnews.ma', 'http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### Option 2: Backend Simple (Node.js/Express)

Si vous préférez un backend Node.js simple:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const MAINTENANCE_FILE = './maintenance.json';

// Initialiser le fichier si n'existe pas
if (!fs.existsSync(MAINTENANCE_FILE)) {
  fs.writeFileSync(MAINTENANCE_FILE, JSON.stringify({
    isMaintenanceMode: false,
    message: '',
    estimatedTime: '',
    lastUpdate: null
  }));
}

// GET /api/maintenance
app.get('/api/maintenance', (req, res) => {
  const data = JSON.parse(fs.readFileSync(MAINTENANCE_FILE));
  res.json(data);
});

// POST /api/maintenance
app.post('/api/maintenance', (req, res) => {
  const { isMaintenanceMode, message, estimatedTime } = req.body;
  
  const data = {
    isMaintenanceMode,
    message,
    estimatedTime,
    lastUpdate: new Date().toISOString()
  };
  
  fs.writeFileSync(MAINTENANCE_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, data });
});

app.listen(8000, () => {
  console.log('Maintenance API running on http://localhost:8000');
});
```

---

## 🧪 Tests

### Test Local du Dashboard

```powershell
cd C:\Users\MRCONNECT\Desktop\platform-admin
npm run dev
```

Accédez à: `http://localhost:3000/admin/maintenance`

### Test de l'API

**Tester GET:**
```powershell
curl http://localhost:8000/api/maintenance
```

**Tester POST:**
```powershell
curl -X POST http://localhost:8000/api/maintenance `
  -H "Content-Type: application/json" `
  -d '{"isMaintenanceMode": true, "message": "Test", "estimatedTime": "30 min"}'
```

### Test d'Intégration Complète

1. **Activer la maintenance depuis le dashboard:**
   - Ouvrez http://localhost:3000/admin/maintenance
   - Activez le toggle
   - Ajoutez un message
   - Cliquez "Enregistrer"

2. **Vérifier sur le site principal:**
   - Ouvrez http://localhost:5173/
   - La page de maintenance devrait s'afficher dans les 30 secondes

3. **Désactiver:**
   - Retournez au dashboard
   - Désactivez le toggle
   - Enregistrez
   - Rafraîchissez le site principal

---

## 🚀 Déploiement

### Backend Laravel

```bash
# En production
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```

### Dashboard Admin (Next.js)

```powershell
# Build
npm run build

# Tester le build
npm start

# Ou déployer sur Vercel
vercel --prod
```

### Variables d'Environnement

**Fichier: `.env.local`** (dashboard admin)
```env
NEXT_PUBLIC_API_URL=https://admin.gnews.ma/api
```

**Fichier: `.env`** (site principal)
```env
VITE_API_URL=https://admin.gnews.ma/api
```

---

## ✅ Checklist Finale

- [ ] Dashboard admin installé et lance
- [ ] Composant MaintenanceControl ajouté
- [ ] Page /admin/maintenance créée
- [ ] Lien dans le menu de navigation
- [ ] Backend API Laravel configuré
- [ ] Migration de base de données exécutée
- [ ] Routes API configurées
- [ ] CORS configuré
- [ ] Tests GET/POST réussis
- [ ] Test d'intégration complet réussi
- [ ] Variables d'environnement configurées
- [ ] Build de production testé

---

## 📞 Support

En cas de problème, vérifiez:

1. **Console navigateur** (F12) pour les erreurs frontend
2. **Logs Laravel** (`storage/logs/laravel.log`)
3. **Network tab** pour les appels API
4. **localStorage** dans DevTools pour le cache

---

<div align="center">

**🔧 Guide d'Installation Maintenance**

**Dashboard Admin + Backend API**

*Créé le 27 octobre 2025*

</div>
