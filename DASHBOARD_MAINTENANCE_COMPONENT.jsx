// MaintenanceControl.jsx
// Composant pour contrôler le mode maintenance depuis le dashboard admin
// À placer dans: platform-admin/src/app/admin/components/MaintenanceControl.jsx

'use client';

import { useState, useEffect } from 'react';
import { FiPower, FiCheck, FiX, FiClock, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export default function MaintenanceControl() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // URL de l'API (à adapter selon votre configuration)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  // Charger l'état actuel au montage du composant
  useEffect(() => {
    fetchMaintenanceStatus();
  }, []);

  // Fonction pour récupérer le statut de maintenance
  const fetchMaintenanceStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/maintenance`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez votre token d'authentification si nécessaire
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch maintenance status');
      }

      const data = await response.json();
      setIsMaintenanceMode(data.isMaintenanceMode || false);
      setMessage(data.message || '');
      setEstimatedTime(data.estimatedTime || '');
      setLastUpdate(data.lastUpdate ? new Date(data.lastUpdate) : null);
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
      // En cas d'erreur, ne rien faire (garder les valeurs par défaut)
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour sauvegarder le statut
  const saveMaintenanceStatus = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez votre token d'authentification si nécessaire
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          isMaintenanceMode,
          message,
          estimatedTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save maintenance status');
      }

      const data = await response.json();
      setLastUpdate(new Date());
      
      // Afficher une notification de succès
      showNotification('success', 'Statut de maintenance mis à jour avec succès !');
    } catch (error) {
      console.error('Error saving maintenance status:', error);
      showNotification('error', 'Erreur lors de la sauvegarde du statut');
    } finally {
      setIsSaving(false);
    }
  };

  // Fonction pour afficher une notification (à adapter selon votre système de toast)
  const showNotification = (type, message) => {
    // Utilisez votre système de notification préféré
    if (type === 'success') {
      console.log('✅', message);
    } else {
      console.error('❌', message);
    }
  };

  // Toggle le mode maintenance
  const toggleMaintenance = () => {
    setIsMaintenanceMode(!isMaintenanceMode);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Mode Maintenance</h2>
          <p className="text-gray-400 text-sm mt-1">
            Contrôlez l'affichage de la page de maintenance sur le site principal
          </p>
        </div>
        
        <button
          onClick={fetchMaintenanceStatus}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          title="Actualiser"
        >
          <FiRefreshCw className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Status Card */}
      <div className={`p-6 rounded-xl border-2 transition-all ${
        isMaintenanceMode 
          ? 'bg-red-500/10 border-red-500/50' 
          : 'bg-emerald-500/10 border-emerald-500/50'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${
              isMaintenanceMode ? 'bg-red-500/20' : 'bg-emerald-500/20'
            }`}>
              <FiPower className={`w-6 h-6 ${
                isMaintenanceMode ? 'text-red-500' : 'text-emerald-500'
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isMaintenanceMode ? 'Mode Maintenance ACTIVÉ' : 'Site en Ligne'}
              </h3>
              <p className="text-sm text-gray-400">
                {isMaintenanceMode 
                  ? 'Les visiteurs voient la page de maintenance' 
                  : 'Le site fonctionne normalement'}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={toggleMaintenance}
            className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
              isMaintenanceMode ? 'bg-red-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                isMaintenanceMode ? 'translate-x-11' : 'translate-x-1'
              }`}
            >
              {isMaintenanceMode ? (
                <FiCheck className="w-8 h-8 text-red-500 p-1.5" />
              ) : (
                <FiX className="w-8 h-8 text-gray-600 p-1.5" />
              )}
            </span>
          </button>
        </div>

        {/* Last Update Info */}
        {lastUpdate && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiClock className="w-4 h-4" />
            <span>Dernière mise à jour: {lastUpdate.toLocaleString('fr-FR')}</span>
          </div>
        )}
      </div>

      {/* Configuration Form */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Configuration</h3>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message de maintenance
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nous effectuons une maintenance pour améliorer votre expérience..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ce message sera affiché sur la page de maintenance
          </p>
        </div>

        {/* Estimated Time */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Temps estimé
          </label>
          <input
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="30 minutes"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Durée estimée de la maintenance (ex: "30 minutes", "2 heures")
          </p>
        </div>

        {/* Alert Info */}
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <FiAlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-200/80">
            <p className="font-medium mb-1">Important:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>La page de maintenance s'affichera pour tous les visiteurs du site</li>
              <li>Les changements prennent effet dans les 30 secondes maximum</li>
              <li>Les administrateurs connectés peuvent toujours accéder au dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={fetchMaintenanceStatus}
          className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Annuler
        </button>
        
        <button
          onClick={saveMaintenanceStatus}
          disabled={isSaving}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            isSaving
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
          }`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sauvegarde...
            </span>
          ) : (
            'Enregistrer les modifications'
          )}
        </button>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Aperçu</h3>
        
        <div className="bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-orange-900/40 p-8 rounded-lg text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-block p-4 bg-white/10 rounded-lg">
              <FiAlertCircle className="w-12 h-12 text-amber-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white">
              EN MAINTENANCE
            </h2>
            
            <p className="text-gray-300">
              {message || 'Nous effectuons une maintenance pour améliorer votre expérience...'}
            </p>
            
            {estimatedTime && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300">
                <FiClock className="w-4 h-4" />
                <span>Temps estimé: {estimatedTime}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          Aperçu de la page de maintenance telle qu'elle apparaîtra aux visiteurs
        </p>
      </div>
    </div>
  );
}
