import { useState, useEffect } from 'react';
import maintenanceService from '../utils/maintenanceService';

/**
 * Hook personnalisé pour gérer l'état de maintenance
 */
export const useMaintenance = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const checkMaintenance = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const status = await maintenanceService.getStatus();
        
        if (mounted) {
          setIsMaintenanceMode(status);
        }
      } catch (err) {
        console.error('Error in useMaintenance:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Vérification initiale
    checkMaintenance();

    // Démarrer la vérification périodique
    maintenanceService.startPeriodicCheck(30000); // Toutes les 30 secondes

    // Écouter les changements de focus de la fenêtre pour revérifier
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkMaintenance();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const forceCheck = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const status = await maintenanceService.forceCheck();
      setIsMaintenanceMode(status);
      return status;
    } catch (err) {
      console.error('Error forcing maintenance check:', err);
      setError(err.message);
      return isMaintenanceMode;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isMaintenanceMode,
    isLoading,
    error,
    forceCheck,
  };
};
