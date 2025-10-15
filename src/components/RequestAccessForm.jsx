import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const RequestAccessForm = ({ onClose, onSubmit }) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    whatsapp: '',
    consent: false,
    selectedPlatforms: [],
    socialLinks: {}
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const platforms = ['twitch', 'youtube', 'kick', 'tiktok', 'facebook', 'instagram', 'twitter', 'discord', 'linktree'];

  // Normalize URL - add https:// if missing
  const normalizeUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed && !trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return 'https://' + trimmed;
    }
    return trimmed;
  };

  // Validate URL
  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(normalizeUrl(url));
      return true;
    } catch {
      return false;
    }
  };

  // Handle platform checkbox toggle
  const handlePlatformToggle = (platform) => {
    setFormData(prev => {
      const selectedPlatforms = prev.selectedPlatforms.includes(platform)
        ? prev.selectedPlatforms.filter(p => p !== platform)
        : [...prev.selectedPlatforms, platform];
      
      // Remove link if platform is deselected
      const socialLinks = { ...prev.socialLinks };
      if (!selectedPlatforms.includes(platform)) {
        delete socialLinks[platform];
      }
      
      return { ...prev, selectedPlatforms, socialLinks };
    });
    
    // Clear error for this platform if it exists
    if (errors[platform]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
  };

  // Handle social link input
  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
    
    // Clear error for this platform if it exists
    if (errors[platform]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate pseudo
    if (!formData.pseudo.trim()) {
      newErrors.pseudo = t('organizer.requestAccessForm.pseudo.required');
    }

    // Validate contact (email or whatsapp)
    if (!formData.email.trim() && !formData.whatsapp.trim()) {
      newErrors.contact = t('organizer.requestAccessForm.contact.required');
    }

    // Validate email format if provided
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('organizer.requestAccessForm.socialNetworks.invalidUrl');
    }

    // Validate social networks
    if (formData.selectedPlatforms.length === 0) {
      newErrors.socialNetworks = t('organizer.requestAccessForm.socialNetworks.required');
    } else {
      // Validate each selected platform has a valid URL
      let hasValidUrl = false;
      formData.selectedPlatforms.forEach(platform => {
        const url = formData.socialLinks[platform];
        if (!url || !url.trim()) {
          newErrors[platform] = t('organizer.requestAccessForm.socialNetworks.required');
        } else if (!isValidUrl(url)) {
          newErrors[platform] = t('organizer.requestAccessForm.socialNetworks.invalidUrl');
        } else {
          hasValidUrl = true;
        }
      });

      if (!hasValidUrl && formData.selectedPlatforms.length > 0) {
        newErrors.socialNetworks = t('organizer.requestAccessForm.socialNetworks.required');
      }
    }

    // Validate consent
    if (!formData.consent) {
      newErrors.consent = t('organizer.requestAccessForm.consent.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Normalize all URLs before submitting
      const normalizedData = {
        ...formData,
        socialLinks: Object.fromEntries(
          Object.entries(formData.socialLinks).map(([key, value]) => [key, normalizeUrl(value)])
        )
      };

      // Call the onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(normalizedData);
      }

      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      
      // Close form after 2 seconds on success
      setTimeout(() => {
        onClose && onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800/80 shadow-2xl custom-scrollbar">
        {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-zentry text-white mb-2">
            {t('organizer.requestAccessForm.title')}
          </h2>
          <p className="text-sm text-gray-400">
            {t('organizer.requestAccessForm.subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Pseudo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('organizer.requestAccessForm.pseudo.label')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.pseudo}
              onChange={(e) => setFormData(prev => ({ ...prev, pseudo: e.target.value }))}
              placeholder={t('organizer.requestAccessForm.pseudo.placeholder')}
              className={`w-full px-4 py-3 bg-black/50 border ${errors.pseudo ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.pseudo && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.pseudo}
              </p>
            )}
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('organizer.requestAccessForm.contact.label')} <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {t('organizer.requestAccessForm.contact.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {t('organizer.requestAccessForm.contact.email.label')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('organizer.requestAccessForm.contact.email.placeholder')}
                  className={`w-full px-4 py-3 bg-black/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {t('organizer.requestAccessForm.contact.whatsapp.label')}
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder={t('organizer.requestAccessForm.contact.whatsapp.placeholder')}
                  className={`w-full px-4 py-3 bg-black/50 border ${errors.contact && !formData.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
                />
              </div>
            </div>

            {errors.contact && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.contact}
              </p>
            )}
          </div>

          {/* Social Networks */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('organizer.requestAccessForm.socialNetworks.label')} <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {t('organizer.requestAccessForm.socialNetworks.subtitle')}
              </p>
            </div>

            {errors.socialNetworks && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.socialNetworks}
              </p>
            )}

            <div className="space-y-4">
              {platforms.map(platform => (
                <div key={platform} className="space-y-2">
                  {/* Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.selectedPlatforms.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                        formData.selectedPlatforms.includes(platform)
                          ? 'bg-primary border-primary'
                          : 'border-gray-600 group-hover:border-gray-500'
                      }`}>
                        {formData.selectedPlatforms.includes(platform) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {t(`organizer.requestAccessForm.socialNetworks.platforms.${platform}`)}
                    </span>
                  </label>

                  {/* URL Input - Only show if platform is selected */}
                  {formData.selectedPlatforms.includes(platform) && (
                    <div className="ml-8">
                      <input
                        type="url"
                        value={formData.socialLinks[platform] || ''}
                        onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                        placeholder={t(`organizer.requestAccessForm.socialNetworks.placeholders.${platform}`)}
                        className={`w-full px-4 py-2 bg-black/50 border ${errors[platform] ? 'border-red-500' : 'border-gray-600'} rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
                      />
                      {errors[platform] && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors[platform]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                  formData.consent
                    ? 'bg-primary border-primary'
                    : errors.consent
                    ? 'border-red-500'
                    : 'border-gray-600 group-hover:border-gray-500'
                }`}>
                  {formData.consent && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {t('organizer.requestAccessForm.consent.label')} <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="mt-2 ml-8 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.consent}
              </p>
            )}
          </div>

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
              <p className="text-sm text-green-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                {t('organizer.requestAccessForm.success')}
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {t('organizer.requestAccessForm.error')}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t('organizer.requestAccessForm.submit')}</span>
                </>
              ) : (
                <span>{t('organizer.requestAccessForm.submit')}</span>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              {t('organizer.requestAccessForm.submitSubtext')}
            </p>
          </div>
        </form>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 61, 8, 0.5);
          border-radius: 2px;
          transition: background 0.2s;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 61, 8, 0.7);
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 61, 8, 0.5) rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default RequestAccessForm;
