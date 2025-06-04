// utils/BroadcastAuthManager.js - Enhanced for True Cross-Origin Support
import { BroadcastChannel } from 'broadcast-channel';

export class BroadcastAuthManager {
  constructor(channelName = 'auth-sync-channel') {
    this.channelName = channelName;
    this.channel = null;
    this.data = new Map();
    this.subscribers = new Set();
    this.isInitialized = false;
    this.debugMode = true;
    
    // Cross-origin specific properties
    this.crossOriginKey = 'cross-origin-auth-data';
    this.lastSyncTime = Date.now();
    
    console.log('🔧 BroadcastAuthManager constructor called');
    console.log('🔧 Current origin:', window.location.origin);
    console.log('🔧 Channel name:', channelName);
    
    // Initialize the channel
    this.initializeChannel();
  }
  
  async initializeChannel() {
    try {
      console.log('🔧 Initializing BroadcastChannel...');
      
      // Create broadcast channel with explicit options
      this.channel = new BroadcastChannel(this.channelName, {
        type: 'localstorage',
        webWorkerSupport: false
      });
      
      console.log('🔧 BroadcastChannel created successfully');
      console.log('🔧 Channel type:', this.channel.type);
      
      // Listen for messages
      this.channel.addEventListener('message', (event) => {
        console.log('🔧 RAW message received:', event);
        this.handleMessage(event);
      });
      
      // ✅ NEW: Initialize cross-origin sync mechanism
      this.initializeCrossOriginSync();
      
      // Check localStorage immediately
      this.checkInitialLocalStorageData();
      
      // Request initial data from other instances
      await this.requestInitialData();
      
      this.isInitialized = true;
      console.log('🔧 BroadcastChannel initialized successfully');
      
    } catch (error) {
      console.error('🔧 Error initializing BroadcastChannel:', error);
      this.initializeLocalStorageFallback();
    }
  }
  
  // ✅ NEW: Cross-origin sync mechanism
  initializeCrossOriginSync() {
    console.log('🔧 Initializing cross-origin sync mechanism...');
    
    // Method 1: Try postMessage to other origins
    this.setupPostMessageSync();
    
    // Method 2: Use a shared external storage mechanism (localStorage with timestamp)
    this.setupSharedStorageSync();
    
    // Method 3: Regular polling for cross-origin detection
    this.startCrossOriginPolling();
  }
  
  // ✅ NEW: PostMessage setup for cross-origin communication
  setupPostMessageSync() {
    // Listen for messages from other origins
    window.addEventListener('message', (event) => {
      // Verify it's our auth message
      if (event.data && event.data.type === 'cross-origin-auth') {
        console.log('🔧 Received cross-origin auth message:', event.data);
        this.handleCrossOriginMessage(event.data);
      }
    });
    
    // Try to find and communicate with other windows
    this.attemptCrossOriginCommunication();
  }
  
  // ✅ NEW: Attempt to communicate with other origins
  attemptCrossOriginCommunication() {
    const possibleOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:3001',
      'http://localhost:8080'
    ];
    
    const currentOrigin = window.location.origin;
    
    possibleOrigins.forEach(origin => {
      if (origin !== currentOrigin) {
        // Try to send a handshake message
        try {
          // This won't work directly, but we'll use iframe approach
          this.createCrossOriginBridge(origin);
        } catch (e) {
          console.log('🔧 Cannot directly communicate with', origin);
        }
      }
    });
  }
  
  // ✅ NEW: Create invisible iframe for cross-origin communication
  createCrossOriginBridge(targetOrigin) {
    console.log('🔧 Creating cross-origin bridge to:', targetOrigin);
    
    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `${targetOrigin}/auth-bridge.html`; // We'll need this file
    
    iframe.onload = () => {
      console.log('🔧 Cross-origin bridge loaded for:', targetOrigin);
      // Send handshake
      iframe.contentWindow.postMessage({
        type: 'auth-handshake',
        origin: window.location.origin
      }, targetOrigin);
    };
    
    iframe.onerror = () => {
      console.log('🔧 Failed to load cross-origin bridge for:', targetOrigin);
      document.body.removeChild(iframe);
    };
    
    document.body.appendChild(iframe);
    
    // Store reference
    this.crossOriginBridges = this.crossOriginBridges || [];
    this.crossOriginBridges.push({ iframe, origin: targetOrigin });
  }
  
  // ✅ NEW: Shared storage sync (using a common key that all origins can access)
  setupSharedStorageSync() {
    // Use a special mechanism that can work across origins
    this.sharedStorageKey = 'auth-data-' + Date.now();
    
    // Try to use IndexedDB for cross-origin data sharing
    this.setupIndexedDBSync();
  }
  
  // ✅ NEW: IndexedDB for cross-origin storage (more reliable than localStorage)
  setupIndexedDBSync() {
    console.log('🔧 Setting up IndexedDB cross-origin sync...');
    
    const request = indexedDB.open('CrossOriginAuth', 1);
    
    request.onerror = () => {
      console.error('🔧 IndexedDB setup failed');
    };
    
    request.onsuccess = (event) => {
      this.db = event.target.result;
      console.log('🔧 IndexedDB setup successful');
      
      // Check for existing data
      this.loadFromIndexedDB();
      
      // Start monitoring for changes
      this.startIndexedDBPolling();
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('authData', { keyPath: 'id' });
      objectStore.createIndex('timestamp', 'timestamp', { unique: false });
    };
  }
  
  // ✅ NEW: Load data from IndexedDB
  loadFromIndexedDB() {
    if (!this.db) return;
    
    const transaction = this.db.transaction(['authData'], 'readonly');
    const objectStore = transaction.objectStore('authData');
    const request = objectStore.get('current');
    
    request.onsuccess = (event) => {
      const result = event.target.result;
      if (result && result.data) {
        console.log('🔧 Loaded auth data from IndexedDB:', result.data);
        this.data.set('authData', result.data);
        this.notifySubscribers('auth-success', 'authData', result.data);
      }
    };
  }
  
  // ✅ NEW: Save data to IndexedDB
  saveToIndexedDB(data) {
    if (!this.db) return;
    
    const transaction = this.db.transaction(['authData'], 'readwrite');
    const objectStore = transaction.objectStore('authData');
    
    objectStore.put({
      id: 'current',
      data: data,
      timestamp: Date.now(),
      origin: window.location.origin
    });
    
    console.log('🔧 Saved auth data to IndexedDB');
  }
  
  // ✅ NEW: Poll IndexedDB for changes
  startIndexedDBPolling() {
    setInterval(() => {
      this.checkIndexedDBChanges();
    }, 1000);
  }
  
  checkIndexedDBChanges() {
    if (!this.db) return;
    
    const transaction = this.db.transaction(['authData'], 'readonly');
    const objectStore = transaction.objectStore('authData');
    const request = objectStore.get('current');
    
    request.onsuccess = (event) => {
      const result = event.target.result;
      if (result && result.timestamp > this.lastSyncTime && result.origin !== window.location.origin) {
        console.log('🔧 Detected auth data change from another origin:', result);
        this.lastSyncTime = result.timestamp;
        
        if (result.data) {
          this.data.set('authData', result.data);
          this.syncToLocalStorage('authData', result.data);
          this.notifySubscribers('auth-success', 'authData', result.data);
        } else {
          this.data.delete('authData');
          this.clearFromLocalStorage();
          this.notifySubscribers('logout', 'authData');
        }
      }
    };
  }
  
  // ✅ NEW: Regular cross-origin polling
  startCrossOriginPolling() {
    // Check every 2 seconds for cross-origin changes
    setInterval(() => {
      this.pollForCrossOriginChanges();
    }, 2000);
  }
  
  pollForCrossOriginChanges() {
    // Try to detect if auth data has been set in another origin
    // by checking for special markers or using other detection methods
    
    // Method 1: Check for auth data in current localStorage that might have been set by other means
    const authKeys = ['authData', 'userData', 'broadcast-auth-data'];
    
    authKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value && !this.data.has('authData')) {
        try {
          const parsed = JSON.parse(value);
          if (parsed && (parsed.username || parsed.sessionToken || (parsed.user && parsed.user.username))) {
            console.log('🔧 Detected auth data via polling:', parsed);
            const authData = parsed.user || parsed;
            this.data.set('authData', authData);
            this.notifySubscribers('auth-success', 'authData', authData);
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    });
  }
  
  // ✅ UPDATED: Enhanced setAuthData with cross-origin sync
  async setAuthData(userData) {
    console.log('🔧 BroadcastAuthManager.setAuthData called:', userData);
    
    if (!userData) {
      console.error('🔧 setAuthData called with null/undefined userData');
      return;
    }
    
    // Store locally
    this.data.set('authData', userData);
    console.log('🔧 Auth data stored in memory');
    
    // Sync to localStorage
    this.syncToLocalStorage('authData', userData);
    
    // ✅ NEW: Save to IndexedDB for cross-origin access
    this.saveToIndexedDB(userData);
    
    // Update sync timestamp
    this.lastSyncTime = Date.now();
    
    // Notify local subscribers first
    this.notifySubscribers('auth-success', 'authData', userData);
    
    // Broadcast to other instances
    const message = {
      type: 'auth-success',
      key: 'authData',
      value: userData,
      timestamp: this.lastSyncTime
    };
    
    await this.broadcastMessage(message);
    
    // ✅ NEW: Try cross-origin communication
    this.broadcastCrossOrigin(message);
  }
  
  // ✅ NEW: Cross-origin broadcasting
  broadcastCrossOrigin(message) {
    console.log('🔧 Broadcasting cross-origin message:', message);
    
    // Try to communicate with cross-origin bridges
    if (this.crossOriginBridges) {
      this.crossOriginBridges.forEach(({ iframe, origin }) => {
        try {
          iframe.contentWindow.postMessage({
            type: 'cross-origin-auth',
            ...message
          }, origin);
        } catch (e) {
          console.log('🔧 Failed to send cross-origin message to', origin);
        }
      });
    }
  }
  
  // ✅ UPDATED: Enhanced clearAuthData with cross-origin sync
  async clearAuthData() {
    console.log('🔧 BroadcastAuthManager.clearAuthData called');
    
    // Clear from memory
    this.data.delete('authData');
    console.log('🔧 Auth data cleared from memory');
    
    // Clear from localStorage
    this.clearFromLocalStorage();
    
    // ✅ NEW: Clear from IndexedDB
    if (this.db) {
      const transaction = this.db.transaction(['authData'], 'readwrite');
      const objectStore = transaction.objectStore('authData');
      objectStore.delete('current');
    }
    
    // Update sync timestamp
    this.lastSyncTime = Date.now();
    
    // Notify local subscribers
    this.notifySubscribers('logout', 'authData');
    
    // Broadcast to other instances
    const message = {
      type: 'logout',
      key: 'authData',
      timestamp: this.lastSyncTime
    };
    
    await this.broadcastMessage(message);
    
    // ✅ NEW: Broadcast cross-origin logout
    this.broadcastCrossOrigin(message);
  }
  
  // ✅ Keep all existing methods (handleMessage, subscribe, etc.) unchanged
  handleMessage(event) {
    const { type, key, value, requestId, snapshot, timestamp } = event;
    console.log('🔧 BroadcastAuthManager.handleMessage:', { type, key, value, timestamp });
    
    if (timestamp && this.lastSentTimestamp === timestamp) {
      console.log('🔧 Ignoring own message');
      return;
    }
    
    switch(type) {
      case 'connection-test':
        break;
        
      case 'set':
      case 'auth-success':
        if (key === 'authData' || type === 'auth-success') {
          console.log('🔧 Received auth data:', value);
          this.data.set('authData', value);
          this.syncToLocalStorage('authData', value);
          this.notifySubscribers('auth-success', 'authData', value);
        }
        break;
        
      case 'delete':
      case 'logout':
        if (key === 'authData' || type === 'logout') {
          console.log('🔧 Received logout command');
          this.data.delete('authData');
          this.clearFromLocalStorage();
          this.notifySubscribers('logout', 'authData');
        }
        break;
        
      case 'request-data':
        console.log('🔧 Received request for data, requestId:', requestId);
        this.sendDataSnapshot(requestId);
        break;
        
      case 'data-snapshot':
        console.log('🔧 Received data snapshot:', snapshot);
        this.handleDataSnapshot(snapshot);
        break;
        
      case 'sync':
        if (value && value.authData) {
          console.log('🔧 Received sync data:', value.authData);
          this.data.set('authData', value.authData);
          this.notifySubscribers('sync', 'authData', value.authData);
        }
        break;
        
      default:
        console.log('🔧 Unknown message type:', type);
    }
  }
  
  // ✅ Keep all existing methods unchanged
  subscribe(callback) {
    console.log('🔧 BroadcastAuthManager.subscribe called');
    this.subscribers.add(callback);
    
    const existingAuthData = this.data.get('authData');
    if (existingAuthData) {
      console.log('🔧 Notifying new subscriber of existing auth data');
      try {
        callback('auth-success', 'authData', existingAuthData);
      } catch (error) {
        console.error('🔧 Error notifying new subscriber:', error);
      }
    }
    
    return () => {
      console.log('🔧 BroadcastAuthManager.unsubscribe called');
      this.subscribers.delete(callback);
    };
  }
  
  notifySubscribers(type, key, value) {
    console.log('🔧 BroadcastAuthManager.notifySubscribers:', { 
      type, 
      key, 
      value: value ? (value.username || 'data') : value,
      subscriberCount: this.subscribers.size 
    });
    
    this.subscribers.forEach(callback => {
      try {
        callback(type, key, value);
      } catch (error) {
        console.error('🔧 Error in subscriber callback:', error);
      }
    });
  }
  
  getAuthData() {
    let authData = this.data.get('authData');
    console.log('🔧 getAuthData - from memory:', authData);
    
    if (!authData) {
      console.log('🔧 No auth data in memory, checking localStorage...');
      authData = this.loadAuthDataFromLocalStorage();
      
      if (authData) {
        console.log('🔧 Found auth data in localStorage, storing in memory');
        this.data.set('authData', authData);
      }
    }
    
    console.log('🔧 getAuthData final result:', authData);
    return authData;
  }
  
  // ✅ Keep all other existing methods (syncToLocalStorage, clearFromLocalStorage, etc.)
  syncToLocalStorage(key, value) {
    console.log('🔧 syncToLocalStorage:', key, value);
    
    if (key === 'authData') {
      localStorage.setItem('broadcast-auth-data', JSON.stringify(value));
      localStorage.setItem('authData', JSON.stringify(value));
      localStorage.setItem('userData', JSON.stringify({ user: value }));
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log('🔧 Auth data synced to localStorage');
    }
  }
  
  clearFromLocalStorage() {
    console.log('🔧 clearFromLocalStorage called');
    
    const keysToRemove = [
      'broadcast-auth-data',
      'authData',
      'userData',
      'isAuthenticated',
      'authToken',
      'userId'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🔧 Removed localStorage.${key}`);
    });
  }
  
  loadAuthDataFromLocalStorage() {
    const sources = [
      () => {
        const data = localStorage.getItem('broadcast-auth-data');
        return data ? JSON.parse(data) : null;
      },
      () => {
        const data = localStorage.getItem('authData');
        return data ? JSON.parse(data) : null;
      },
      () => {
        const data = localStorage.getItem('userData');
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.user || parsed;
        }
        return null;
      }
    ];
    
    for (const source of sources) {
      try {
        const data = source();
        if (data && (data.username || data.userId || data.sessionToken)) {
          console.log('🔧 Successfully loaded auth data from localStorage');
          return data;
        }
      } catch (e) {
        console.error('🔧 Error loading from localStorage source:', e);
      }
    }
    
    return null;
  }
  
  checkInitialLocalStorageData() {
    console.log('🔧 Checking initial localStorage data...');
    
    const keys = ['broadcast-auth-data', 'authData', 'userData', 'isAuthenticated'];
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`🔧 localStorage.${key}:`, value);
    });
    
    const authData = this.loadAuthDataFromLocalStorage();
    if (authData) {
      console.log('🔧 Found auth data in localStorage:', authData);
      this.data.set('authData', authData);
    }
  }
  
  async broadcastMessage(message) {
    this.lastSentTimestamp = message.timestamp;
    console.log('🔧 Broadcasting message:', message);
    
    if (this.channel) {
      try {
        await this.channel.postMessage(message);
        console.log('🔧 Message broadcasted successfully via BroadcastChannel');
      } catch (error) {
        console.error('🔧 Error broadcasting message:', error);
      }
    }
  }
  
  async requestInitialData() {
    const requestId = `${Date.now()}-${Math.random()}`;
    console.log('🔧 requestInitialData called, requestId:', requestId);
    
    const message = {
      type: 'request-data',
      requestId,
      timestamp: Date.now()
    };
    
    await this.broadcastMessage(message);
    
    const authData = this.getAuthData();
    if (authData) {
      console.log('🔧 Found auth data during initial request');
      this.notifySubscribers('auth-success', 'authData', authData);
    }
  }
  
  async sendDataSnapshot(requestId) {
    const snapshot = Object.fromEntries(this.data);
    console.log('🔧 sendDataSnapshot called:', { requestId, snapshot });
    
    if (Object.keys(snapshot).length > 0) {
      const message = {
        type: 'data-snapshot',
        requestId,
        snapshot,
        timestamp: Date.now()
      };
      
      await this.broadcastMessage(message);
    }
  }
  
  handleDataSnapshot(snapshot) {
    console.log('🔧 handleDataSnapshot called:', { 
      snapshot, 
      currentDataSize: this.data.size 
    });
    
    if (this.data.size === 0 && snapshot && Object.keys(snapshot).length > 0) {
      console.log('🔧 Applying snapshot data');
      
      Object.entries(snapshot).forEach(([key, value]) => {
        this.data.set(key, value);
        if (key === 'authData') {
          this.syncToLocalStorage(key, value);
        }
      });
      
      if (snapshot.authData) {
        this.notifySubscribers('auth-success', 'authData', snapshot.authData);
      }
      
      this.notifySubscribers('sync', null, snapshot);
    }
  }
  
  isAuthenticated() {
    const authData = this.getAuthData();
    const isAuth = authData && (authData.sessionToken || authData.userId);
    console.log('🔧 isAuthenticated check:', { authData, isAuth });
    return isAuth;
  }
  
  debug() {
    console.log('🔧 ===========================================');
    console.log('🔧 BroadcastAuthManager Debug Info:');
    console.log('🔧 ===========================================');
    console.log('🔧 Current origin:', window.location.origin);
    console.log('🔧 Channel name:', this.channelName);
    console.log('🔧 Is initialized:', this.isInitialized);
    console.log('🔧 Has channel:', !!this.channel);
    console.log('🔧 Channel type:', this.channel?.type);
    console.log('🔧 Data size:', this.data.size);
    console.log('🔧 Data contents:', Object.fromEntries(this.data));
    console.log('🔧 Subscriber count:', this.subscribers.size);
    console.log('🔧 Has IndexedDB:', !!this.db);
    console.log('🔧 Cross-origin bridges:', this.crossOriginBridges?.length || 0);
    
    const keys = ['broadcast-auth-data', 'authData', 'userData', 'isAuthenticated'];
    console.log('🔧 localStorage contents:');
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`🔧   ${key}:`, value);
    });
    
    console.log('🔧 Auth data (getAuthData):', this.getAuthData());
    console.log('🔧 Is authenticated:', this.isAuthenticated());
    console.log('🔧 ===========================================');
  }
  
  async destroy() {
    console.log('🔧 BroadcastAuthManager.destroy called');
    
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
    
    if (this.crossOriginBridges) {
      this.crossOriginBridges.forEach(({ iframe }) => {
        document.body.removeChild(iframe);
      });
    }
    
    if (this.db) {
      this.db.close();
    }
    
    if (this.channel) {
      await this.channel.close();
    }
    
    this.subscribers.clear();
    this.data.clear();
  }
}