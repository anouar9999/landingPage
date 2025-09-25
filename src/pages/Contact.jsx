import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, MapPin, Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';
import AnimatedTitle from '../components/AnimatedTitle';

const Contact = () => {
  const { t, isRtl, getTextClass } = useTranslation();
  const [formStatus, setFormStatus] = useState(null);
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Fonction pour revenir en arrière
  const handleGoBack = () => {
    window.history.back();
  };
  
  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Simuler l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulation d'envoi de formulaire
    setFormStatus('loading');
    
    // Simuler un délai de traitement
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% de chance de succès
        setFormStatus('success');
        // Réinitialiser le formulaire après succès
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };
  
  // Animation lors du chargement
  useEffect(() => {
    if (sectionRef.current) {
      // Animer l'entrée des sections
      gsap.fromTo(
        '.contact-section',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power2.out" 
        }
      );
    }
    
    // Animer la carte
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" 
        },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut"
        }
      );
    }
  }, []);
  
  // Réinitialiser le statut après 5 secondes
  useEffect(() => {
    if (formStatus === 'success' || formStatus === 'error') {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <div 
      className="min-h-screen py-20 lg:py-32 bg-gradient-to-b from-black to-black relative"
      ref={sectionRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay with gradient - lighter at top, darker below */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bouton retour */}
        <div className="mb-8 contact-section">
          <button
            onClick={handleGoBack}
            className={`
              flex items-center gap-2 text-white/70 hover:text-primary transition-colors duration-300
              group py-2 px-4 rounded-lg font-nightWarrior
              ${isRtl ? 'flex-row-reverse' : ''}
            `}
          >
            <ArrowLeft 
              size={20} 
              className={`group-hover:translate-x-[-2px] transition-transform duration-300 ${isRtl ? 'rotate-180' : ''}`} 
            />
            <span className={`font-medium tracking-wider text-xl`}>
              {t('common.back', "Retour")}
            </span>
          </button>
        </div>

        {/* En-tête de la page */}
        <div className="text-center mb-16 contact-section">
          <div className="inline-block  px-4 py-1 rounded-full mb-4">
            {/* <span className={`text-primary font-valorant text-sm uppercase tracking-wider ${getTextClass()}`}>
              {t('contact.tagline', "Contactez notre équipe")}
            </span> */}
            <p className="font-general  text-white text-xs sm:text-xs md:text-sm lg:text-sm uppercase px-2 md:px-4 max-w-2xl mx-auto">
              {t('contact.tagline', "Contactez notre équipe")}
        </p>
          </div>
              <AnimatedTitle
          title={t('contact.title', "Contactez-nous")}
          containerClass=" text-center !text-primary"
        />
          {/* <h1 className="text-4xl md:text-5xl font-nightWarrior text-primary mb-6">
            {t('contact.title', "Contactez-nous")}
          </h1> */}
          
          <p className={`text-white/80 font-circular-web max-w-2xl mx-auto  mt-4`}>
            {t('contact.description', "Vous avez des questions sur les tournois GAMIUS ou besoin d'assistance ? Notre équipe est là pour vous aider. Remplissez le formulaire ci-dessous ou utilisez nos coordonnées directes.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-primary/20 shadow-lg contact-section">
            <h2 className={`text-2xl special-font text-white mb-6`}>
              {t('contact.formTitle', "Envoyez-nous un message")}
            </h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-circular-web">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-white/80 mb-2 ${getTextClass()}`}>
                    {t('contact.form.name', "Nom complet")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white"
                    placeholder={t('contact.form.namePlaceholder', "Votre nom")}
                  />
                </div>
                <div>
                  <label className={`block text-white/80 mb-2 ${getTextClass()}`}>
                    {t('contact.form.email', "Email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white"
                    placeholder={t('contact.form.emailPlaceholder', "Votre email")}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-white/80 mb-2 ${getTextClass()}`}>
                  {t('contact.form.subject', "Sujet")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white"
                  placeholder={t('contact.form.subjectPlaceholder', "Sujet de votre message")}
                />
              </div>
              
              <div>
                <label className={`block text-white/80 mb-2 ${getTextClass()}`}>
                  {t('contact.form.message', "Message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white resize-none"
                  placeholder={t('contact.form.messagePlaceholder', "Votre message...")}
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className={`
                    w-full flex items-center justify-center special-font tracking-wider gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300
                    ${formStatus === 'loading' ? 'opacity-70 cursor-wait' : ''}
                  `}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <span className="animate-pulse">{t('contact.form.sending', "Envoi en cours...")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.form.send', "Envoyer")}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
                
                {/* Message de statut */}
                {formStatus === 'success' && (
                  <div className="mt-4 bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className={`text-green-400 ${getTextClass()}`}>
                      {t('contact.form.successMessage', "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.")}
                    </span>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center gap-3">
                    <AlertCircle className="text-red-500" size={20} />
                    <span className={`text-red-400 ${getTextClass()}`}>
                      {t('contact.form.errorMessage', "Une erreur s'est produite. Veuillez réessayer plus tard ou utiliser un autre moyen de contact.")}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Coordonnées et carte */}
          <div>
            {/* Coordonnées */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-primary/20 shadow-lg mb-8 contact-section">
              <h2 className={`text-2xl special-font text-white mb-6`}>
                {t('contact.infoTitle', "Nos coordonnees")}
              </h2>
              
              <div className="space-y-6 ">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className={`text-white font-robert-medium -tracking-wider mb-1 text-xl`}>
                      {t('contact.phone', "Téléphone")}
                    </h3>
                    <p className="text-white/70">+212 522 000 000</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className={`text-white font-robert-medium -tracking-wider mb-1 text-xl`}>
                      {t('contact.email', "Email")}
                    </h3>
                    <p className="text-white/70">contact@gamiusgroup.ma</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className={`text-white font-robert-medium -tracking-wider mb-1 text-xl`}>
                      {t('contact.address', "Adresse")}
                    </h3>
                    <p className="text-white/70">GAMIUS GROUP, Avenue Hassan II, Casablanca, Maroc</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte */}
            <div className="rounded-xl overflow-hidden h-80 contact-section" ref={mapRef}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846547439023!2d-7.6192650842542!3d33.59274948073429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d282687b63f3%3A0x9d3a5136a8e3b6ac!2sAvenue%20Hassan%20II%2C%20Casablanca%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1653429834937!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="GAMIUS GROUP Location"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* FAQ rapide */}
        <div className="mt-20 bg-primary/5 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 contact-section">
          <h2 className={`text-center text-4xl font-robert-medium text-primary mb-8 -tracking-wider`}>
            {t('contact.faqTitle', "Questions frequentes")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 p-6 rounded-xl border border-white/5">
              <h3 className={`text-white special-font mb-2 ${getTextClass()}`}>
                {t('contact.faq.q1', "Comment puis-je participer aux tournois GAMIUS ?")}
              </h3>
              <p className={`text-white/70 font-circular-web ${getTextClass()}`}>
                {t('contact.faq.a1', "Inscrivez-vous sur notre plateforme et suivez les instructions pour rejoindre les qualifications. Consultez notre calendrier des événements pour connaître les dates des prochains tournois.")}
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-xl border border-white/5">
              <h3 className={`text-white special-font mb-2 ${getTextClass()}`}>
                {t('contact.faq.q2', "Comment fonctionne le GAMIUS Pass Gamers ?")}
              </h3>
              <p className={`text-white/70 font-circular-web ${getTextClass()}`}>
                {t('contact.faq.a2', "Le Pass Gamers vous donne accès à des avantages exclusifs comme des places prioritaires aux tournois, des réductions et des contenus premium. Vous pouvez l'acquérir directement sur notre plateforme.")}
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-xl border border-white/5">
              <h3 className={`text-white special-font mb-2 ${getTextClass()}`}>
                {t('contact.faq.q3', "Puis-je participer si je suis mineur ?")}
              </h3>
              <p className={`text-white/70 font-circular-web ${getTextClass()}`}>
                {t('contact.faq.a3', "Les participants de moins de 18 ans doivent fournir une autorisation parentale. Certains tournois peuvent avoir des restrictions d'âge spécifiques, veuillez consulter le règlement de chaque compétition.")}
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-xl border border-white/5">
              <h3 className={`text-white special-font mb-2 ${getTextClass()}`}>
                {t('contact.faq.q4', "Comment devenir partenaire de GAMIUS ?")}
              </h3>
              <p className={`text-white/70 font-circular-web ${getTextClass()}`}>
                {t('contact.faq.a4', "Pour les demandes de partenariat, veuillez nous contacter via le formulaire en sélectionnant 'Partenariat' comme sujet ou envoyez-nous un email à partnership@gamiusgroup.ma")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;