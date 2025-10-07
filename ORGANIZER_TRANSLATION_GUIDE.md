# Organizer Page Translation Guide

## Instructions
Replace the hardcoded text in Organizer.jsx with the translation keys below.

## Already Added
✅ Import statement: `import { useTranslation } from '../hooks/useTranslation';`
✅ Hook usage: `const { t } = useTranslation();`

## Text Replacements Needed

### Hero Section (around line 547-553)
```jsx
// REPLACE:
Create and Manage
// WITH:
{t('organizer.hero.title1')}

// REPLACE:
Unforgettable
// WITH:
{t('organizer.hero.title2')}

// REPLACE:
Competitions
// WITH:
{t('organizer.hero.title3')}

// REPLACE:
From local events to global circuits, our platform gives you the keys to success. You focus on the show, we'll handle the technology.
// WITH:
{t('organizer.hero.subtitle')}
```

### Community Plan Section (around line 571-605)
```jsx
// REPLACE: Community
{t('organizer.plans.community.name')}

// REPLACE: Perfect for small local tournaments and getting started
{t('organizer.plans.community.description')}

// REPLACE: Free
{t('organizer.plans.community.price')}

// REPLACE: No credit card required
{t('organizer.plans.community.priceDetail')}

// REPLACE: Get Started
{t('organizer.plans.community.cta')}

// Features:
// REPLACE: Up to 64 participants
{t('organizer.plans.community.features.participants')}

// REPLACE: Standard tournament formats
{t('organizer.plans.community.features.formats')}

// REPLACE: Automated bracket generation
{t('organizer.plans.community.features.brackets')}

// REPLACE: Basic participant profiles
{t('organizer.plans.community.features.profiles')}

// REPLACE: Community support
{t('organizer.plans.community.features.support')}
```

### White-label Plan Section (around line 625-667)
```jsx
// REPLACE: White-label
{t('organizer.plans.whiteLabel.name')}

// REPLACE: Custom solutions for large-scale operations
{t('organizer.plans.whiteLabel.description')}

// REPLACE: Custom
{t('organizer.plans.whiteLabel.price')}

// REPLACE: Tailored to your needs
{t('organizer.plans.whiteLabel.priceDetail')}

// REPLACE: Contact Sales
{t('organizer.plans.whiteLabel.cta')}

// REPLACE: Everything in Community, plus:
{t('organizer.plans.whiteLabel.everythingPlus')}

// Features:
// REPLACE: Unlimited participants
{t('organizer.plans.whiteLabel.features.participants')}

// REPLACE: White-label solution
{t('organizer.plans.whiteLabel.features.solution')}

// REPLACE: Custom tournament types
{t('organizer.plans.whiteLabel.features.types')}

// REPLACE: Real-time statistics & analytics
{t('organizer.plans.whiteLabel.features.stats')}

// REPLACE: Dedicated account manager
{t('organizer.plans.whiteLabel.features.manager')}

// REPLACE: 24/7 premium support
{t('organizer.plans.whiteLabel.features.support')}
```

### Comparison Table Section (around line 682-738)
```jsx
// In AnimatedTitle:
title={'Compare Plans'}
// REPLACE WITH:
title={t('organizer.comparison.title')}

// REPLACE: Choose the perfect plan for your esports ambitions
{t('organizer.comparison.subtitle')}

// Table headers:
// REPLACE: Features
{t('organizer.comparison.features')}

// REPLACE: Community
{t('organizer.comparison.community')}

// REPLACE: White-label  
{t('organizer.comparison.whiteLabel')}

// REPLACE: Free
{t('organizer.comparison.free')}

// REPLACE: Custom
{t('organizer.comparison.custom')}

// REPLACE: Contact Us
{t('organizer.comparison.contactUs')}

// Table rows - replace the hardcoded strings:
{ feature: 'Max participants', free: '64', ent: 'Unlimited' }
// WITH:
{ feature: t('organizer.comparison.rows.maxParticipants'), free: '64', ent: t('organizer.comparison.rows.unlimited') }

// Similar for other rows...
```

### Features Section (around line 752-798)
```jsx
// REPLACE: ORGANIZERS
{t('organizer.features.badge')}

// REPLACE: The Power of a Pro Tool, Made Simple
{t('organizer.features.title')}

// REPLACE: Managing an esports event shouldn't be complicated...
{t('organizer.features.subtitle')}

// REPLACE: Total Flexibility
{t('organizer.features.flexibility.title')}

// REPLACE: No matter the game or format...
{t('organizer.features.flexibility.description')}

// REPLACE: Player Engagement
{t('organizer.features.engagement.title')}

// REPLACE: Professional experience with profiles...
{t('organizer.features.engagement.description')}

// REPLACE: Simplified Monetization
{t('organizer.features.monetization.title')}

// REPLACE: Easily integrate your sponsors...
{t('organizer.features.monetization.description')}

// REPLACE: Average Setup Time
{t('organizer.features.setupTime')}
```

### FAQ Section (around line 808-851)
```jsx
// REPLACE: Frequently Asked Questions
{t('organizer.faq.title')}

// REPLACE: Everything you need to know about our platform
{t('organizer.faq.subtitle')}

// Replace the FAQ array:
{[
  {
    q: t("organizer.faq.questions.games.q"),
    a: t("organizer.faq.questions.games.a")
  },
  {
    q: t("organizer.faq.questions.technical.q"),
    a: t("organizer.faq.questions.technical.a")
  },
  {
    q: t("organizer.faq.questions.paid.q"),
    a: t("organizer.faq.questions.paid.a")
  },
  {
    q: t("organizer.faq.questions.payment.q"),
    a: t("organizer.faq.questions.payment.a")
  }
].map((faq, index) => (
  // ... rest of the mapping code
```

### CTA Section (around line 860-866)
```jsx
// REPLACE: Ready to Launch Your Next Big Event?
{t('organizer.cta.title')}

// REPLACE: Join hundreds of organizers who trust us...
{t('organizer.cta.subtitle')}

// REPLACE: Start for Free →
{t('organizer.cta.button')}
```

## All translations are already in i18n.jsx
The translations are available in English, French, and Arabic under the `organizer` key.
