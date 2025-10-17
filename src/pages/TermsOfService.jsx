import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  const { t, isRtl } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      <NavBar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-circular-web"
          >
            <ArrowLeft size={20} />
            {t('termsOfService.backHome')}
          </Link>

          {/* Title */}
          <h1 className="special-font text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase mb-4 text-white font-black tracking-tight leading-tight">
            {t('termsOfService.title')}
          </h1>
          
          <p className="text-gray-400 mb-8 font-circular-web">
            {t('termsOfService.lastUpdated')}: {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Content */}
          <div className="space-y-8 font-circular-web text-gray-300">
            {/* Acceptance */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.acceptance.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.acceptance.content')}
              </p>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.services.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.services.content')}
              </p>
            </section>

            {/* User Account */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.userAccount.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('termsOfService.userAccount.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('termsOfService.userAccount.items.accurate')}</li>
                <li>{t('termsOfService.userAccount.items.confidential')}</li>
                <li>{t('termsOfService.userAccount.items.responsible')}</li>
                <li>{t('termsOfService.userAccount.items.notify')}</li>
              </ul>
            </section>

            {/* Code of Conduct */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.conduct.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('termsOfService.conduct.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('termsOfService.conduct.items.cheating')}</li>
                <li>{t('termsOfService.conduct.items.harassment')}</li>
                <li>{t('termsOfService.conduct.items.impersonation')}</li>
                <li>{t('termsOfService.conduct.items.illegal')}</li>
                <li>{t('termsOfService.conduct.items.spam')}</li>
              </ul>
            </section>

            {/* Tournament Rules */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.tournaments.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.tournaments.content')}
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.intellectualProperty.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.intellectualProperty.content')}
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.liability.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.liability.content')}
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.termination.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.termination.content')}
              </p>
            </section>

            {/* Applicable Law */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.applicableLaw.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.applicableLaw.content')}
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.modifications.title')}
              </h2>
              <p className="leading-relaxed">
                {t('termsOfService.modifications.content')}
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-900/50 p-6 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('termsOfService.contact.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('termsOfService.contact.content')}
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:contact@gamiusgroup.ma" className="text-primary hover:underline">contact@gamiusgroup.ma</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
