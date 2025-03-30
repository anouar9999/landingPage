import React, { useEffect } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <NavBar />
      
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-nightWarrior text-primary mb-8">Politique de Confidentialité</h1>
        
        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              Morocco Gaming Expo (MGE) s'engage à protéger la vie privée des utilisateurs de notre plateforme. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles.
            </p>
            <p>
              En utilisant notre site et en participant à nos tournois, vous acceptez les pratiques décrites dans cette politique.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">2. Données collectées</h2>
            <p className="mb-4">Nous pouvons collecter les types d'informations suivants :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Informations personnelles : nom, prénom, adresse email, numéro de téléphone</li>
              <li>Informations de compte de jeu : noms d'utilisateur, identifiants de jeu</li>
              <li>Informations techniques : adresse IP, type de navigateur, appareil utilisé</li>
              <li>Données d'utilisation : pages visitées, durée de visite, actions effectuées sur le site</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">3. Utilisation des données</h2>
            <p className="mb-4">Nous utilisons vos données personnelles pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Gérer votre inscription et participation aux tournois</li>
              <li>Vous contacter concernant votre participation</li>
              <li>Améliorer notre site et nos services</li>
              <li>Assurer la sécurité de notre plateforme</li>
              <li>Vous informer sur les événements à venir (si vous avez consenti à recevoir ces communications)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">4. Partage des données</h2>
            <p className="mb-4">
              Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données avec :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nos partenaires de tournoi (uniquement les informations nécessaires pour la gestion des compétitions)</li>
              <li>Des sous-traitants qui nous aident à gérer notre plateforme (avec des garanties de confidentialité)</li>
              <li>Les autorités, si la loi l'exige</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">5. Sécurité des données</h2>
            <p>
              Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données 
              contre l'accès non autorisé, la modification, la divulgation ou la destruction. Malgré ces efforts, 
              aucune méthode de transmission sur Internet n'est totalement sécurisée.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">6. Vos droits</h2>
            <p className="mb-4">
              Conformément à la législation sur la protection des données, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit de limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, veuillez nous contacter à l'adresse email : privacy@moroccogamingexpo.ma
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">7. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.
              Vous pouvez contrôler les cookies via les paramètres de votre navigateur.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">8. Modifications de la politique</h2>
            <p>
              Nous pouvons modifier cette politique de confidentialité de temps à autre. Nous vous informerons de tout 
              changement important par email ou par une notification sur notre site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">9. Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à : 
              privacy@moroccogamingexpo.ma
            </p>
          </section>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-primary font-valorant">Dernière mise à jour : Mai 2025</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 