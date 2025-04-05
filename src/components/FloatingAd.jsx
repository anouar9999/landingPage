import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Enregistrer le plugin GSAP
gsap.registerPlugin(ScrollTrigger);

const FloatingAd = ({ onClose, autoHideTime = 15000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef(null);
  const timerRef = useRef(null);
  const firstRenderRef = useRef(true);
  
  useEffect(() => {
    // Créer le ScrollTrigger pour afficher la publicité quand l'utilisateur défile
    const trigger = ScrollTrigger.create({
      start: "top+=300 top", // Commence après 300px de défilement
      onEnter: () => {
        if (firstRenderRef.current) {
          firstRenderRef.current = false;
          return;
        }
        setIsVisible(true);
      }
    });
    
    // Nettoyage
    return () => {
      trigger.kill();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      // Animation d'entrée
      const ctx = gsap.context(() => {
        gsap.fromTo(
          adRef.current,
          { 
            y: 50, 
            opacity: 0,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }, adRef);
      
      // Auto-fermeture après le délai spécifié
      timerRef.current = setTimeout(() => {
        handleClose();
      }, autoHideTime);
      
      return () => ctx.revert();
    }
  }, [isVisible, autoHideTime]);
  
  const handleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Animation de sortie
    const ctx = gsap.context(() => {
      gsap.to(adRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIsVisible(false);
          if (onClose) onClose();
        }
      });
    }, adRef);
    
    return () => ctx.revert();
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={adRef}
      className="fixed bottom-4 right-4 z-50 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-64 ad-container"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(106, 90, 205, 0.2)'
      }}
    >
      <button 
        onClick={handleClose} 
        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors"
        aria-label="Fermer la publicité"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">MGE</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Pass Premium</h3>
            <p className="text-slate-300 text-xs">Profitez de jeux exclusifs</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-lg mb-2 bg-slate-900">
          <img 
            src="https://via.placeholder.com/300x150" 
            alt="Pass Premium"
            className="w-full h-24 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent flex items-end p-2">
            <span className="text-white text-xs font-bold">-25% aujourd'hui !</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-slate-300 text-xs">
            <span className="line-through">39,99€</span>
            <span className="text-white font-bold ml-2">29,99€</span>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-3 rounded-full transition-colors relative overflow-hidden shine-effect">
            En profiter
            <span className="shine-element"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingAd; 