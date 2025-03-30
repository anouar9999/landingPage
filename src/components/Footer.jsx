import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// Composant personnalisé pour l'icône X (anciennement Twitter)
const XIcon = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    width={props.size || 24} 
    height={props.size || 24} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
  >
    <path d="M 2.9921094 3 L 9.7089844 12.861328 L 2.8867188 21 L 5.3886719 21 L 10.773438 14.488281 L 15.212891 21 L 21.214844 21 L 14.078125 10.511719 L 20.53125 3 L 18.03125 3 L 13.017578 9.015625 L 8.9375 3 L 2.9921094 3 z" fill="currentColor"></path>
  </svg>
);

const GamingFooter = () => {
  const { t, isRtl } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  // Liens et ressources mis à jour pour correspondre à la structure de la page
  const resources = [
    { name: t('nav.discover'), path: '#about' },
    { name: t('nav.proPath'), path: '#pro-path' },
    { name: t('nav.passGamers'), path: '#PassGamers' },
    { name: t('nav.documentation'), path: '/downloads' },
    { name: t('nav.faq'), path: '#faq' }
  ];
  
  const legalLinks = [
    { name: t('footer.legal.privacy'), path: '/privacy-policy' },
    { name: t('footer.legal.terms'), path: '/terms-of-use' }
  ];
  
  // Utilisation des mêmes liens de réseaux sociaux que dans Navbar
  const socialLinks = [
    { Icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/mgex.ma' },
    { Icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/mgex.ma/' },
    { Icon: Youtube, name: 'YouTube', url: 'https://www.youtube.com/channel/UCN-qYwRN2RABWRTenM1WTSg' },
    { Icon: Linkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/company/102805036/' },
    { Icon: XIcon, name: 'X', url: 'https://twitter.com/mgexma' }
  ];

  return (
    <footer className="bg-black text-white pt-12 pb-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo et description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-8">
          <div className="max-w-md">
            <img 
              src="/img/Logo-MGE-2025-white.svg" 
              alt="Morocco Gaming Expo Logo" 
              className="h-14 mb-4"
            />
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>
          
          {/* Liens et réseaux sociaux */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16">
            {/* Liens rapides */}
            <div>
              <h3 className="text-primary font-valorant uppercase mb-4 text-sm">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {resources.map((link, index) => (
                  <li key={index}>
                    {link.path.startsWith('#') ? (
                      <a 
                        href={link.path} 
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.path} 
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Suivez-nous */}
            <div>
              <h3 className="text-primary font-valorant uppercase mb-4 text-sm">{t('footer.followUs')}</h3>
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
        
        {/* Logo MJCC */}
        <div className="flex justify-center my-8">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-xs mb-2">{t('footer.sponsoredBy') || 'Sous le patronage du'}</p>
            <img 
              src="/img/mjcc.svg" 
              alt="Ministère de la Jeunesse, de la Culture et de la Communication" 
              className="h-16"
            />
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="h-px bg-gray-800 w-full my-6"></div>
        
        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            {t('footer.copyright', { year: currentYear })}
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