# Composant Dashboard Admin - Contrôle de Maintenance

## Installation dans le Dashboard Admin

Placez ce composant dans votre dashboard admin (probablement dans `src/components/` ou `src/pages/`).

## Exemple de composant React (pour le dashboard admin)

```jsx
// src/pages/MaintenanceControl.jsx
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const MaintenanceControl = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [message, setMessage] = useState('');
  const [estimatedEndTime, setEstimatedEndTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  // Charger les paramètres au montage
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/maintenance');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des paramètres');
      }
      
      const data = await response.json();
      setIsMaintenanceMode(data.isMaintenanceMode || false);
      setMessage(data.message || '');
      setEstimatedEndTime(
        data.estimatedEndTime 
          ? new Date(data.estimatedEndTime).toISOString().slice(0, 16)
          : ''
      );
    } catch (error) {
      console.error('Error loading settings:', error);
      showAlert('error', 'Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          is_maintenance_mode: isMaintenanceMode,
          message: message,
          estimated_end_time: estimatedEndTime || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement');
      }

      showAlert('success', 'Paramètres enregistrés avec succès!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showAlert('error', 'Erreur lors de l\'enregistrement des paramètres');
    } finally {
      setSaving(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const getAuthToken = () => {
    return localStorage.getItem('auth_token');
  };

  const handleToggleChange = async (checked) => {
    setIsMaintenanceMode(checked);
    // Auto-save quand on toggle
    setTimeout(saveSettings, 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Mode Maintenance</span>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              isMaintenanceMode 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {isMaintenanceMode ? '🔴 ACTIF' : '🟢 INACTIF'}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Alert Messages */}
          {alert && (
            <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
              {alert.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          {/* Statut principal */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">Activer le mode maintenance</h3>
              <p className="text-sm text-gray-600">
                {isMaintenanceMode 
                  ? 'Le site affiche actuellement la page de maintenance'
                  : 'Le site fonctionne normalement'
                }
              </p>
            </div>
            <Switch
              checked={isMaintenanceMode}
              onCheckedChange={handleToggleChange}
              disabled={saving}
            />
          </div>

          {/* Avertissement */}
          {isMaintenanceMode && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ⚠️ Le mode maintenance est actuellement actif. Les utilisateurs ne peuvent pas accéder au site.
              </AlertDescription>
            </Alert>
          )}

          {/* Message personnalisé */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Message de maintenance (optionnel)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Maintenance planifiée pour améliorer les performances..."
              className="w-full px-3 py-2 border rounded-md min-h-[100px] focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500">
              Ce message sera affiché aux utilisateurs (si vous le configurez dans la page de maintenance)
            </p>
          </div>

          {/* Heure de fin estimée */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Heure de fin estimée (optionnel)
            </label>
            <input
              type="datetime-local"
              value={estimatedEndTime}
              onChange={(e) => setEstimatedEndTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500">
              Indiquez quand la maintenance devrait se terminer
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={saveSettings}
              disabled={saving}
              className="flex-1"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                'Enregistrer les paramètres'
              )}
            </Button>
            
            <Button
              onClick={loadSettings}
              variant="outline"
              disabled={saving}
            >
              Annuler
            </Button>
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-blue-900">ℹ️ Informations</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Les changements sont appliqués en temps réel (30s max)</li>
              <li>La page de maintenance s'affiche automatiquement</li>
              <li>Les utilisateurs voient une page avec effets 3D</li>
              <li>Support multilingue (FR, EN, AR, TZ)</li>
            </ul>
          </div>

          {/* Statistiques (optionnel) */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {isMaintenanceMode ? '✓' : '—'}
              </div>
              <div className="text-xs text-gray-600 mt-1">Statut</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {message ? '✓' : '—'}
              </div>
              <div className="text-xs text-gray-600 mt-1">Message</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {estimatedEndTime ? '✓' : '—'}
              </div>
              <div className="text-xs text-gray-600 mt-1">Heure de fin</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceControl;
```

## Intégration dans les routes

```jsx
// src/App.jsx ou src/routes.jsx
import MaintenanceControl from './pages/MaintenanceControl';

// Dans vos routes
<Route path="/admin/maintenance" element={<MaintenanceControl />} />
```

## Composants UI requis

Si vous n'avez pas encore les composants Shadcn/UI, installez-les:

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add alert
```

Ou créez-les manuellement en suivant la documentation Shadcn.

## Alternative sans Shadcn/UI

Si vous préférez utiliser des composants HTML natifs, voici une version simplifiée:

```jsx
// Version sans dépendances externes
const MaintenanceControl = () => {
  // ... même logique ...

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Mode Maintenance</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              isMaintenanceMode 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {isMaintenanceMode ? '🔴 ACTIF' : '🟢 INACTIF'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold">Activer le mode maintenance</h3>
              <p className="text-sm text-gray-600">
                {isMaintenanceMode 
                  ? 'Le site affiche la page de maintenance'
                  : 'Le site fonctionne normalement'
                }
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isMaintenanceMode}
                onChange={(e) => handleToggleChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Reste du contenu... */}
        </div>
      </div>
    </div>
  );
};
```

## Notes importantes

1. **Authentification**: Assurez-vous que seuls les administrateurs peuvent accéder à cette page
2. **Middleware**: Protégez la route avec un middleware d'authentification
3. **Logs**: Enregistrez les changements de statut pour l'audit
4. **Notifications**: Envoyez des notifications aux administrateurs lors des changements

## Test de l'interface

1. Accédez à `/admin/maintenance` sur votre dashboard
2. Testez le toggle on/off
3. Vérifiez que le site principal affiche bien la page de maintenance
4. Testez les différents champs (message, heure de fin)
