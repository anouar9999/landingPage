import { useEffect } from 'react';
import { CrossStorageHub } from 'cross-storage';

export default function StorageHub() {
  useEffect(() => {
    // Initialize the hub with permissions
    CrossStorageHub.init([
      // Allow all origins (not recommended for production)
      // Replace with your specific domain patterns
      {origin: /.*/,  allow: ['get', 'set', 'del', 'getKeys', 'clear']}
    ]);
  }, []);

  return (
    <div>
      <h1>Cross-Domain Storage Hub</h1>
      <p>This page allows secure cross-domain localStorage access.</p>
    </div>
  );
}