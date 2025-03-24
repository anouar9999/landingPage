import React from 'react';

/**
 * Composant représentant un emplacement publicitaire
 * @param {object} props - Les propriétés du composant
 * @param {string} props.position - Position CSS (absolute, relative, etc.)
 * @param {string} props.top - Position top en CSS
 * @param {string} props.left - Position left en CSS
 * @param {string} props.bottom - Position bottom en CSS
 * @param {string} props.right - Position right en CSS
 * @param {string} props.width - Largeur de l'emplacement
 * @param {string} props.height - Hauteur de l'emplacement
 * @param {string} props.className - Classes CSS additionnelles
 * @param {string} props.type - Type d'emplacement publicitaire (banner, sidebar, etc.)
 */
const AdSpot = ({ 
  position = "relative", 
  top, 
  left, 
  bottom, 
  right, 
  width = "300px", 
  height = "250px", 
  className = "", 
  type = "banner",
  isVisible = true
}) => {
  // Si l'emplacement n'est pas visible, ne rien rendre
  if (!isVisible) return null;

  return (
    <div 
      className={`ad-spot ${className}`}
      style={{
        position,
        top,
        left,
        bottom,
        right,
        width,
        height,
        background: 'rgba(20, 20, 30, 0.7)',
        border: '2px dashed #D7C6AF',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#D7C6AF',
        fontFamily: "'Valorant', sans-serif",
        fontSize: '14px',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        textTransform: 'uppercase',
        zIndex: 20,
        padding: '10px',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 10px rgba(215, 198, 175, 0.3)'
      }}
    >
      <div className="font-bold">Emplacement Publicitaire</div>
      <div className="text-xs mt-2">{type}</div>
      <div className="text-xs mt-1">{width} × {height}</div>
    </div>
  );
};

export default AdSpot; 