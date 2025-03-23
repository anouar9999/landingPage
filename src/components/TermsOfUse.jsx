import React, { useEffect } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

const TermsOfUse = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <NavBar />
      
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-nightWarrior text-primary mb-8">Conditions d'Utilisation</h1>
        
        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">1. Acceptation des Conditions</h2>
            <p className="mb-4">
              Bienvenue sur le site Morocco Gaming Expo (MGE). En accédant à ce site et en utilisant nos services, 
              vous acceptez d'être lié par ces conditions d'utilisation, notre politique de confidentialité et tous les 
              autres règlements applicables.
            </p>
            <p>
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">2. Admissibilité</h2>
            <p className="mb-4">
              Pour utiliser nos services et participer aux tournois MGE, vous devez :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Être âgé d'au moins 16 ans (ou l'âge minimum requis pour le tournoi spécifique)</li>
              <li>Résider au Maroc ou dans un pays autorisé à participer</li>
              <li>Respecter les conditions spécifiques d'admissibilité de chaque tournoi</li>
              <li>Disposer d'un compte actif et en règle sur la plateforme</li>
            </ul>
            <p className="mt-4">
              Les organisateurs se réservent le droit de vérifier l'admissibilité des participants à tout moment.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">3. Inscription et Comptes</h2>
            <p className="mb-4">
              Lors de votre inscription :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Vous devez fournir des informations exactes, complètes et à jour</li>
              <li>Vous êtes responsable de la confidentialité de votre mot de passe</li>
              <li>Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
              <li>Un seul compte par personne est autorisé</li>
            </ul>
            <p className="mt-4">
              Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de violation de ces conditions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">4. Règles des Tournois</h2>
            <p className="mb-4">
              Chaque tournoi MGE possède ses propres règles spécifiques qui complètent ces conditions générales. En participant à un tournoi :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Vous acceptez de respecter les règles spécifiques du tournoi</li>
              <li>Vous acceptez les décisions des administrateurs et des arbitres</li>
              <li>Vous reconnaissez que les organisateurs peuvent modifier les règles pour assurer l'intégrité de la compétition</li>
              <li>Vous comprenez que toute tricherie entraînera une disqualification immédiate</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">5. Comportement des Utilisateurs</h2>
            <p className="mb-4">
              En utilisant notre plateforme, vous acceptez de ne pas :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Utiliser des logiciels de triche, exploits ou tout moyen déloyal</li>
              <li>Tenir des propos discriminatoires, injurieux ou offensants</li>
              <li>Harceler ou intimider d'autres utilisateurs</li>
              <li>Perturber le déroulement des tournois ou le fonctionnement de la plateforme</li>
              <li>Violer la propriété intellectuelle de MGE ou de tiers</li>
              <li>Utiliser la plateforme à des fins illégales ou non autorisées</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">6. Prix et Récompenses</h2>
            <p className="mb-4">
              Concernant les prix et récompenses :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Les prix annoncés sont sujets aux conditions spécifiques de chaque tournoi</li>
              <li>Les gagnants peuvent être tenus de fournir des pièces d'identité pour recevoir leurs prix</li>
              <li>Les prix peuvent être soumis à des taxes selon la législation en vigueur</li>
              <li>MGE se réserve le droit de modifier les prix avec préavis raisonnable en cas de circonstances exceptionnelles</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">7. Propriété Intellectuelle</h2>
            <p className="mb-4">
              Tous les contenus présents sur notre site (logos, textes, graphiques, vidéos, etc.) sont la propriété de MGE 
              ou de nos partenaires et sont protégés par les lois sur la propriété intellectuelle.
            </p>
            <p>
              Vous ne pouvez pas utiliser, reproduire ou distribuer ces contenus sans autorisation explicite.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">8. Limitation de Responsabilité</h2>
            <p className="mb-4">
              Dans la mesure permise par la loi :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>MGE n'est pas responsable des interruptions ou dysfonctionnements temporaires du service</li>
              <li>Nous ne garantissons pas que le site sera exempt d'erreurs ou disponible en permanence</li>
              <li>Nous ne sommes pas responsables des actions des autres utilisateurs</li>
              <li>Notre responsabilité est limitée au montant payé (le cas échéant) pour participer à un tournoi</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">9. Modifications des Conditions</h2>
            <p>
              MGE se réserve le droit de modifier ces conditions d'utilisation à tout moment. 
              Les modifications seront effectives dès leur publication sur le site. 
              En continuant à utiliser le site après ces modifications, vous acceptez les nouvelles conditions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">10. Loi Applicable et Litiges</h2>
            <p>
              Ces conditions sont régies par les lois du Maroc. Tout litige relatif à ces conditions 
              sera soumis à la compétence exclusive des tribunaux de Casablanca, Maroc.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-valorant text-white mb-4">11. Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à : 
              terms@moroccogamingexpo.ma
            </p>
          </section>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-primary font-valorant">Dernière mise à jour : Mai 2024</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse; 