import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';
// Remove NavBar import
// import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!email) {
        setEmailError('Email is required');
        return;
      }
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
      setEmailError('');
    }

    if (currentStep === 2 && !password) {
      setError('Password is required');
      return;
    }

    if (currentStep === 3 && (!pseudo || !firstName || !lastName)) {
      setError('All fields are required');
      return;
    }

    if (currentStep === 4 && !age) {
      setError('Age is required');
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setError('');
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Implement your registration logic here
      console.log('Registration attempt with:', { email, password, pseudo, firstName, lastName, age });
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Redirect or handle successful registration
      }, 1500);
    } catch (err) {
      setError('Failed to register. Please try again.');
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8 mt-6">
        <div className="relative">
          {/* Progress bar background */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            {/* Progress bar fill - width depends on current step */}
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          
          {/* Step indicators */}
          <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1/2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`flex flex-col items-center`}
              >
            
               /
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-4">Email Address</h3>
            <p className="text-gray-400 text-sm mb-6">
              Please enter a valid email address. A verification code will be sent to confirm your account.
            </p>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 border border-2 border-gray-700 placeholder-gray-500 text-white rounded-sm focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-500">{emailError}</p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className=" text-xl font-semibold text-white mb-4">Create Password</h3>
            <p className="text-gray-400 text-sm mb-6">
              Choose a secure password for your account.
            </p>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Password requirements */}
            <div className="bg-gray-900/30 p-3 rounded-md border border-gray-800">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Password requirements:</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li className="flex items-center">
                  <span className={`inline-block w-4 h-4 mr-2 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-4 h-4 mr-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-4 h-4 mr-2 rounded-full ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                  At least one lowercase letter
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-4 h-4 mr-2 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                  At least one number
                </li>
                <li className="flex items-center">
                  <span className={`inline-block w-4 h-4 mr-2 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                  At least one special character
                </li>
              </ul>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
            <p className="text-gray-400 text-sm mb-6">
              Tell us a bit about yourself.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="pseudo" className="sr-only">Username</label>
                <input
                  id="pseudo"
                  name="pseudo"
                  type="text"
                  autoComplete="username"
                  required
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            <div className='flex'>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-4">Age Verification</h3>
            <p className="text-gray-400 text-sm mb-6">
              Please enter your date of birth to verify eligibility.
            </p>
            <div>
              <label htmlFor="dob" className="sr-only">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Date of Birth"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* <video
          autoPlay
          loop
          muted
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/videos/feature-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black  z-10"></div>
      </div>
      
      {/* Content */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 relative z-20">
        <div className="w-2/5 space-y-8 p-8 rounded-xl bg-black ">
          <div className="absolute top-2 text-center">
            <Link to="/">
              <img 
                src="/img/Logo-MGE-2025-white.svg" 
                alt="MGE Logo" 
                className="h-24 mx-auto mb-8"
              />
            </Link>
            <h2 className="text-2xl font-street-fighter text-white tracking-widest mb-4">CREATE YOUR ACCOUNT</h2>
            {/* <p className="text-gray-400 text-sm">
              Join more than 350,000 gamers from all over the world
            </p> */}
          </div>
          
          {/* {renderStepIndicator()} */}
          
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              {renderStepContent()}
            </div>

            <div className="absolute bottom-16 translate-x-1/2 left-1/2 flex items-center justify-center mt-8 font-free-fire">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center mx-8 px-6 py-1 rounded text-gray-400 border border-collapse hover:text-white transition-colors"
                >
                  {/* <ArrowLeftIcon className="h-4 w-4 mr-1" /> */}
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="button"
                onClick={handleNextStep}
                className={`group relative font-free-fire flex justify-center px-6 py-2 border ${currentStep < 4 ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-transparent bg-primary hover:bg-primary-dark text-white'} text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {currentStep < 4 ? 'CONTINUER' : 'CRÉER UN COMPTE'}
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">OR</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-4 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Sign in with Facebook</span>
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Sign in with Discord</span>
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Sign in with Apple</span>
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.146 0c.66 0 1.4.178 2.216.534a6.63 6.63 0 0 1 2.047 1.447c.56.56 1.011 1.247 1.354 2.06.343.814.514 1.544.514 2.192 0 .853-.178 1.689-.534 2.505a6.33 6.33 0 0 1-1.447 2.087c-.62.62-1.327 1.071-2.12 1.354-.793.283-1.58.424-2.364.424-.7 0-1.42-.15-2.16-.45-.74-.3-1.4-.74-1.98-1.32-.66.54-1.34.99-2.04 1.35-.7.36-1.45.54-2.25.54-.4 0-.8-.05-1.2-.15-.4-.1-.77-.24-1.11-.42-.34-.18-.63-.39-.87-.63-.24-.24-.43-.51-.57-.81-.14-.3-.24-.62-.3-.96-.06-.34-.09-.68-.09-1.02 0-.62.11-1.2.33-1.74.22-.54.52-1.01.9-1.41.38-.4.82-.72 1.32-.96.5-.24 1.01-.36 1.53-.36.66 0 1.3.13 1.92.39.62.26 1.17.62 1.65 1.08-.08-.34-.15-.64-.21-.9-.06-.26-.09-.56-.09-.9 0-.62.12-1.21.36-1.77.24-.56.56-1.05.96-1.47.4-.42.86-.75 1.38-.99.52-.24 1.06-.36 1.62-.36zm0 1.53c-.4 0-.78.09-1.14.27-.36.18-.67.42-.93.72-.26.3-.46.64-.6 1.02-.14.38-.21.77-.21 1.17 0 .6.09 1.14.27 1.62.18.48.42.9.72 1.26.3.36.64.66 1.02.9.38.24.77.36 1.17.36.4 0 .78-.09 1.14-.27.36-.18.67-.42.93-.72.26-.3.46-.64.6-1.02.14-.38.21-.77.21-1.17 0-.6-.09-1.14-.27-1.62-.18-.48-.42-.9-.72-1.26-.3-.36-.64-.66-1.02-.9-.38-.24-.77-.36-1.17-.36zm-8.67 8.79c-.34 0-.67.06-.99.18-.32.12-.6.29-.84.51-.24.22-.43.47-.57.75-.14.28-.21.58-.21.9 0 .24.03.48.09.72.06.24.15.46.27.66.12.2.27.36.45.48.18.12.39.18.63.18.38 0 .76-.1 1.14-.3.38-.2.76-.48 1.14-.84-.32-.36-.57-.74-.75-1.14-.18-.4-.27-.8-.27-1.2 0-.08.01-.16.03-.24.02-.08.03-.16.03-.24-.1-.08-.2-.14-.3-.18-.1-.04-.22-.06-.36-.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div> */}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
