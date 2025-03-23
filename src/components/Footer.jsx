import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Twitch } from 'lucide-react';

const GamingFooter = () => {
  const currentYear = new Date().getFullYear();
  
  // Liens et ressources
  const resources = [
    { name: 'Accueil', path: '/' },
    { name: 'Tournois', path: '#Discover' },
    { name: 'Prix', path: '#PrizePool' },
    { name: 'Contact', path: '#welliMchhorm' }
  ];
  
  const legalLinks = [
    { name: 'Politique de Confidentialité', path: '/privacy-policy' },
    { name: 'Conditions d\'Utilisation', path: '/terms-of-use' }
  ];
  
  const socialLinks = [
    { Icon: Instagram, name: 'Instagram', url: 'https://instagram.com/moroccogamingexpo' },
    { Icon: Facebook, name: 'Facebook', url: 'https://facebook.com/moroccogamingexpo' },
    { Icon: Twitter, name: 'Twitter', url: 'https://twitter.com/MoroccoGamingExpo' },
    { Icon: Youtube, name: 'YouTube', url: 'https://youtube.com/moroccogamingexpo' },
    { Icon: Twitch, name: 'Twitch', url: 'https://twitch.tv/moroccogamingexpo' }
  ];

  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo et description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-8">
          <div className="max-w-md">
            <img 
              src="https://moroccogamingexpo.ma/wp-content/uploads/2024/02/Logo-MGE-2025-white.svg" 
              alt="Morocco Gaming Expo Logo" 
              className="h-14 mb-4"
            />
            <p className="text-gray-400 text-sm">
              Morocco Gaming Expo (MGE) est le plus grand événement de gaming et d'esport au Maroc, 
              réunissant les meilleurs joueurs pour des compétitions de haut niveau et célébrant 
              la passion du jeu vidéo.
            </p>
          </div>
          
          {/* Liens et réseaux sociaux */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16">
            {/* Liens rapides */}
            <div>
              <h3 className="text-primary font-valorant uppercase mb-4 text-sm">Liens Rapides</h3>
              <ul className="space-y-2">
                {resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Suivez-nous */}
            <div>
              <h3 className="text-primary font-valorant uppercase mb-4 text-sm">Suivez-nous</h3>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
                    aria-label={social.name}
                  >
                    <social.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="h-px bg-gray-800 w-full my-6"></div>
        
        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear} Morocco Gaming Expo. Tous droits réservés. MGE et les logos associés sont des marques déposées.
          </p>
          
          <div className="flex gap-6">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GamingFooter;  