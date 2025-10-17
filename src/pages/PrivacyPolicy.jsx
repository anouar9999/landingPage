import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
            {t('privacyPolicy.backHome')}
          </Link>

          {/* Title */}
          <h1 className="special-font text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase mb-4 text-white font-black tracking-tight leading-tight">
            {t('privacyPolicy.title')}
          </h1>
          
          <p className="text-gray-400 mb-8 font-circular-web">
            {t('privacyPolicy.lastUpdated')}: {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Content */}
          <div className="space-y-8 font-circular-web text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.intro.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.intro.content')}
              </p>
              <p className="leading-relaxed mt-4 text-primary">
                {t('privacyPolicy.intro.moroccanLaw')}
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.dataCollection.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacyPolicy.dataCollection.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacyPolicy.dataCollection.items.personal')}</li>
                <li>{t('privacyPolicy.dataCollection.items.contact')}</li>
                <li>{t('privacyPolicy.dataCollection.items.gaming')}</li>
                <li>{t('privacyPolicy.dataCollection.items.technical')}</li>
              </ul>
            </section>

            {/* Data Usage */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.dataUsage.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacyPolicy.dataUsage.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacyPolicy.dataUsage.items.tournaments')}</li>
                <li>{t('privacyPolicy.dataUsage.items.communication')}</li>
                <li>{t('privacyPolicy.dataUsage.items.improvement')}</li>
                <li>{t('privacyPolicy.dataUsage.items.security')}</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.dataProtection.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.dataProtection.content')}
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.userRights.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacyPolicy.userRights.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacyPolicy.userRights.items.access')}</li>
                <li>{t('privacyPolicy.userRights.items.correction')}</li>
                <li>{t('privacyPolicy.userRights.items.deletion')}</li>
                <li>{t('privacyPolicy.userRights.items.objection')}</li>
                <li>{t('privacyPolicy.userRights.items.portability')}</li>
              </ul>
              <p className="leading-relaxed mt-4">
                {t('privacyPolicy.userRights.contact')}
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.cookies.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.cookies.content')}
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.dataSharing.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.dataSharing.content')}
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-900/50 p-6 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-zentry text-primary uppercase mb-4">
                {t('privacyPolicy.contact.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacyPolicy.contact.content')}
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:contact@gamiusgroup.ma" className="text-primary hover:underline">contact@gamiusgroup.ma</a></p>
                <p><strong>CNDP:</strong> {t('privacyPolicy.contact.cndp')}</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
