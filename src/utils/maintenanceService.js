// Service pour gérer l'état de maintenance
// Détection de l'environnement
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

// URL de l'API - utilise HTTP en développement pour éviter les erreurs SSL
const MAINTENANCE_API_URL = isDevelopment 
  ? 'http://localhost:8000/api/maintenance' // API locale en développement
  : 'https://admin.gnews.ma/api/maintenance'; // API production

const MAINTENANCE_STORAGE_KEY = 'maintenance_mode';
const CACHE_DURATION = 60000; // 1 minute

class MaintenanceService {
  constructor() {
    this.isMaintenanceMode = false;
    this.lastCheck = null;
    this.checkInterval = null;
    this.apiAvailable = false; // Flag pour savoir si l'API est disponible
  }

  /**
   * Vérifie si le mode maintenance est activé depuis l'API
   */
  async checkMaintenanceStatus() {
    try {
      // En développement, si l'API n'est pas encore créée, utiliser uniquement le localStorage
      if (isDevelopment && !this.apiAvailable) {
        console.log('🔧 Mode développement: Utilisation du localStorage uniquement');
        const cached = this.getCachedStatus();
        if (cached !== null) {
          this.isMaintenanceMode = cached;
          return cached;
        }
        return false;
      }

      const response = await fetch(MAINTENANCE_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch maintenance status');
      }

      const data = await response.json();
      this.isMaintenanceMode = data.isMaintenanceMode || false;
      this.lastCheck = Date.now();
      this.apiAvailable = true; // API fonctionne

      // Sauvegarder en localStorage pour le cache
      localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify({
        isMaintenanceMode: this.isMaintenanceMode,
        timestamp: this.lastCheck,
      }));

      return this.isMaintenanceMode;
    } catch (error) {
      // Erreur silencieuse en développement si l'API n'existe pas encore
      if (!isDevelopment) {
        console.error('Error checking maintenance status:', error);
      }
      
      // En cas d'erreur, utiliser le cache local
      const cached = this.getCachedStatus();
      if (cached !== null) {
        return cached;
      }

      // Par défaut, pas de mode maintenance si erreur et pas de cache
      return false;
    }
  }

  /**
   * Obtenir le statut depuis le cache local
   */
  getCachedStatus() {
    try {
      const cached = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
      if (!cached) return null;

      const { isMaintenanceMode, timestamp } = JSON.parse(cached);
      
      // Vérifier si le cache est encore valide
      if (Date.now() - timestamp < CACHE_DURATION) {
        this.isMaintenanceMode = isMaintenanceMode;
        return isMaintenanceMode;
      }

      return null;
    } catch (error) {
      console.error('Error reading cached maintenance status:', error);
      return null;
    }
  }

  /**
   * Démarrer la vérification périodique du statut
   */
  startPeriodicCheck(interval = 30000) { // Par défaut toutes les 30 secondes
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      this.checkMaintenanceStatus();
    }, interval);
  }

  /**
   * Arrêter la vérification périodique
   */
  stopPeriodicCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Obtenir le statut actuel (avec cache si disponible)
   */
  async getStatus() {
    // Si on a vérifié récemment, utiliser le cache
    if (this.lastCheck && Date.now() - this.lastCheck < CACHE_DURATION) {
      return this.isMaintenanceMode;
    }

    // Sinon, faire une nouvelle vérification
    return await this.checkMaintenanceStatus();
  }

  /**
   * Forcer une vérification immédiate
   */
  async forceCheck() {
    return await this.checkMaintenanceStatus();
  }

  /**
   * Réinitialiser le service
   */
  reset() {
    this.isMaintenanceMode = false;
    this.lastCheck = null;
    this.stopPeriodicCheck();
    localStorage.removeItem(MAINTENANCE_STORAGE_KEY);
  }
}

// Singleton instance
const maintenanceService = new MaintenanceService();

export default maintenanceService;
