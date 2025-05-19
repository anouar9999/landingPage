import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import {
  Menu,
  X,
  Instagram,
  MessageSquare,
  Facebook,
  Youtube,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Settings,
  ArrowUpRight,
  Globe,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import globalStorage from "../utils/GlobalStorage";
import GlobalStorage from "../utils/GlobalStorage";
import AuthStorage from "../utils/GlobalStorage";

const socialLinks = [
  { Icon: Facebook, link: "https://www.facebook.com/mgex.ma" },
  { Icon: Instagram, link: "https://www.instagram.com/mgex.ma/" },
  {
    Icon: Youtube,
    link: "https://www.youtube.com/channel/UCN-qYwRN2RABWRTenM1WTSg",
  },
  { Icon: Linkedin, link: "https://www.linkedin.com/company/102805036/" },
];

// Custom X icon component
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
    <path
      d="M 2.9921094 3 L 9.7089844 12.861328 L 2.8867188 21 L 5.3886719 21 L 10.773438 14.488281 L 15.212891 21 L 21.214844 21 L 14.078125 10.511719 L 20.53125 3 L 18.03125 3 L 13.017578 9.015625 L 8.9375 3 L 2.9921094 3 z"
      fill="currentColor"
    ></path>
  </svg>
);

// Add X to social links
socialLinks.push({
  Icon: XIcon,
  link: "https://twitter.com/mgexma",
});

const NavBar = () => {
  // Use translation hook
  const { t, isRtl, isTamazight, getTextClass, applyTifinaghToElements } =
    useTranslation();
  const navigate = useNavigate();

  // Add state for login modal and auth
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  // Login form states
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("User@000");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      // This will check local storage first, then cross-storage if needed
      const userData = await AuthStorage.getUserData();
  
      if (userData && userData.username) {
        setIsLoggedIn(true);
        setUserName(userData.username);
        setUserAvatar(userData.avatarUrl || "/img/default-avatar.jpg");
      } else {
        // If not found locally, force sync with cross-storage
        const syncedData = await AuthStorage.syncWithCrossStorage();
        
        if (syncedData && syncedData.username) {
          setIsLoggedIn(true);
          setUserName(syncedData.username);
          setUserAvatar(syncedData.avatarUrl || "/img/default-avatar.jpg");
        }
      }
    };
  
    checkAuth();
  }, []);

  // Main navigation items with translations
  const mainNavItems = [
    { name: t("nav.passGamers"), link: "#PassGamers" },
    { name: t("nav.documentation"), link: "/downloads" },
    { name: t("nav.faq"), link: "#faq" },
  ];

  // Discover submenu items
  const discoverSubItems = [
    { name: t("nav.discover"), link: "#about" },
    { name: t("nav.tri9lGlory"), link: "#Tri9lGlory" },
    { name: t("nav.prizePool"), link: "#PrizePool" },
    { name: t("nav.proPath"), link: "#pro-path" },
  ];

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  // Refs
  const navContainerRef = useRef(null);
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const discoverBtnRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };



  // Check if user is already logged in on component mount
  useEffect(() => {
    const userData = AuthStorage.getUserData();

    if (userData && userData.username) {
      setIsLoggedIn(true);
      setUserName(userData.username);
      setUserAvatar(userData.avatarUrl || "/img/default-avatar.jpg");
    }
  }, []);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setServerError("");
  
    // Validate fields
    let hasError = false;
  
    // Your existing validation code...
  
    if (hasError) return;
    setIsLoading(true);
  
    try {
      const loginData = {
        email: email,
        password: password,
      };
  
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/api/user_login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const responseText = await response.text();
      let data;
  
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse login response:", e);
        throw new Error("Invalid server response format");
      }
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }
  console.log("Login response:", data);

      // Assuming the response contains the session token and user data
      // Store user session data using our enhanced utility
      const userData = {
        userSessionToken: data.session_token,
        userId: data.user_id        ,
        username: data.username,
        userType: data.user_type,
        avatarUrl: data.avatar || "/img/default-avatar.jpg"
      };
  
      // This now also stores in cross-storage
      await AuthStorage.setUserData(userData);
  
      // Update state
      setIsLoggedIn(true);
      setUserName(data.username);
      setUserAvatar(data.avatar || "/img/default-avatar.jpg");
  
      // Close modal
      setIsLoginModalOpen(false);
  
      // Redirect to tournaments page - using the actual Next.js URL
      setTimeout(() => {
        window.location.href = "http://localhost:3000/tournaments";
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      setServerError(
        error.message || "Une erreur s'est produite. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  // Handle logout
  const handleLogout = async () => {
    // This now also clears cross-storage
    await AuthStorage.clearUserData();
  
    // Reset state
    setIsLoggedIn(false);
    setUserName("");
    setUserAvatar("");
    setDropdownOpen(false);
  
    // Redirect to home
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply Tifinagh translations if necessary
  useEffect(() => {
    if (isTamazight) {
      setTimeout(() => {
        applyTifinaghToElements(
          "nav a, nav button, .discover-trigger, .mobile-menu a, .mobile-menu button"
        );
      }, 100);
    }
  }, [isTamazight, applyTifinaghToElements]);

  // Screen size detection with detailed breakpoints
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });

      // Close mobile menu when resizing to larger screens
      if (width >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Initial check
    updateScreenSize();

    // Add event listener
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isMenuOpen]);

  // Enhanced scroll behavior with screen size consideration
  useEffect(() => {
    const handleScroll = () => {
      // At the top - always show expanded header
      if (currentScrollY === 0) {
        setIsNavVisible(true);
        setIsHeaderCompact(false);
        setShowScrollUpButton(false);
        navContainerRef.current?.classList.remove("bg-black/95");
        navContainerRef.current?.classList.remove("shadow-md");
        navContainerRef.current?.classList.add("bg-black/30");
      }
      // Scrolling down - hide on mobile and tablet, compact on desktop
      else if (currentScrollY > lastScrollY) {
        if (screenSize.isDesktop) {
          setIsHeaderCompact(true);
          setIsNavVisible(true);
        } else {
          setIsNavVisible(false);
        }
        setShowScrollUpButton(currentScrollY > 500);
        navContainerRef.current?.classList.add("bg-black/95");
        navContainerRef.current?.classList.add("shadow-md");
        navContainerRef.current?.classList.remove("bg-black/30");
      }
      // Scrolling up - compact or visible with background
      else {
        setIsNavVisible(true);
        setIsHeaderCompact(screenSize.isDesktop && currentScrollY > 200);
        navContainerRef.current?.classList.add("bg-black/95");
        navContainerRef.current?.classList.add("shadow-md");
        navContainerRef.current?.classList.remove("bg-black/30");
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentScrollY, lastScrollY, screenSize.isDesktop]);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Improved mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: isMenuOpen ? 1 : 0,
        x: isMenuOpen ? 0 : -window.innerWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isMenuOpen]);

  // Submenu animation - Enhanced with smoother effects
  useEffect(() => {
    if (subMenuRef.current && screenSize.isDesktop) {
      gsap.to(subMenuRef.current, {
        maxHeight: isSubMenuOpen ? 300 : 0,
        opacity: isSubMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top center",
        y: isSubMenuOpen ? 0 : -10,
        scale: isSubMenuOpen ? 1 : 0.98,
      });
    }
  }, [isSubMenuOpen, screenSize.isDesktop]);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        subMenuRef.current &&
        !subMenuRef.current.contains(e.target) &&
        !e.target.classList.contains("discover-trigger")
      ) {
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Language selector animation improvements
  useEffect(() => {
    if (languageSelectorRef.current) {
      const element = languageSelectorRef.current;

      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.2,
          ease: "power1.in",
        });
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Helper function for smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.substring(1)); // Remove the #
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close menus after navigating
      setIsMenuOpen(false);
      setIsSubMenuOpen(false);
    } else {
      console.warn(`Section with ID ${sectionId.substring(1)} not found`);
    }
  };

  // Close mobile menu on link click
  const handleLinkClick = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      scrollToSection(link);
    } else if (link.includes("user.mgexpo.ma")) {
      // Redirect to login page in the same tab
      window.location.href = link;
      e.preventDefault();
    } else {
      // For other non-anchor links, just close the menus
      setIsMenuOpen(false);
      setIsSubMenuOpen(false);
    }
  };

  // Add function to handle login button click
  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  // Common class for navigation links
  const navLinkClass =
    "text-white hover:text-primary transition-all duration-200 text-sm uppercase whitespace-nowrap font-medium tracking-wide hover:scale-105 transform";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Background Overlay - Full Width with improved transition */}
      <div
        ref={navContainerRef}
        className={`header-overlay transition-all duration-300 ${isHeaderCompact ? "header-compact py-1" : "header-expanded py-2"} ${currentScrollY > 0
          ? "bg-black/95 shadow-lg backdrop-blur-sm"
          : "bg-black/30 backdrop-blur-[2px]"
          }`}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`flex items-center justify-between ${isHeaderCompact ? "py-1" : "py-2"} transition-all duration-300`}
        >
          {/* Logo left - Center only on mobile */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/img/Logo-MGE-2025-white.svg"
                alt="MGE Logo"
                className={`transition-all duration-300 ${isHeaderCompact ? "h-8 md:h-10" : "h-10 md:h-14"}`}
              />
            </Link>
          </div>

          {/* Central navigation - Desktop only - IMPROVED */}
          <div className="hidden lg:flex items-center space-x-8 justify-center flex-grow">
            {/* Discover menu with dropdown - IMPROVED */}
            <div className="relative">
              <button
                ref={discoverBtnRef}
                className={`${navLinkClass} flex items-center gap-1.5 discover-trigger group p-2 rounded-md hover:bg-white/5 ${getTextClass()}`}
                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                aria-expanded={isSubMenuOpen}
              >
                {t("nav.discover")}
                <span className="transition-transform duration-200 group-hover:translate-y-0.5">
                  {isSubMenuOpen ? (
                    <ChevronUp size={16} className="mt-0.5 text-primary" />
                  ) : (
                    <ChevronDown size={16} className="mt-0.5" />
                  )}
                </span>
              </button>

              {/* Dropdown menu - Completely redesigned */}
              <div
                ref={subMenuRef}
                className={`absolute left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl bg-[#0A0E13]/95 backdrop-blur-md origin-top-left border border-white/10
                  transition-all duration-300 ease-out
                  ${isSubMenuOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
                aria-hidden={!isSubMenuOpen}
              >
                <div className="py-1.5">
                  {discoverSubItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className={`group flex items-center px-4 py-2.5 text-white hover:bg-primary/10 transition-colors text-sm uppercase ${getTextClass()}
                        ${index === 0 ? "border-t-0" : "border-t border-white/5"}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5 group-hover:scale-125 transition-transform"></span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular nav links - IMPROVED */}
            {mainNavItems.map((item) =>
              item.link.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={(e) => handleLinkClick(e, item.link)}
                  className={`${navLinkClass} p-2 rounded-md hover:bg-white/5 ${getTextClass()}`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`${navLinkClass} p-2 rounded-md hover:bg-white/5 flex items-center gap-1 ${getTextClass()}`}
                >
                  {item.name}
                  <ArrowUpRight
                    size={14}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </Link>
              )
            )}
          </div>

          {/* Right side - Auth buttons, Language selector */}
          <div className="flex items-center gap-4">
            {/* Social networks on desktop - IMPROVED */}
            <div className="hidden lg:flex items-center space-x-3 mr-4">
              {socialLinks.map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-all p-1.5 hover:scale-110 hover:bg-white/10 rounded-full"
                  aria-label={`Visit our ${Icon.name || "social media"}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Language selector - Completely redesigned */}
            <div
              ref={languageSelectorRef}
              className="relative z-20 flex items-center transform-gpu"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1 hover:bg-black/50 transition-all duration-200 relative">
                  <LanguageSelector />
                </div>
              </div>
            </div>

            {/* Auth button - Completely improved style */}
            {isLoggedIn ? (
              // User is logged in - show avatar and name
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 sm:gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors"
                >
                  <img
                    src={`https://api.mgexpo.ma/${userAvatar}`}
                    alt={userName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="text-sm sm:text-base font-ea-football text-white">
                    {userName}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-white transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
            //       <div className="absolute right-0 mt-2 w-48 bg-[#16161a] rounded-md shadow-lg py-1 z-50">
            //          <button
            //   className="flex w-full items-center justify-between px-2 py-2
            //            text-sm text-gray-400 hover:text-white
            //            rounded-md
            //            transition-colors duration-200"
        
            //   role="menuitem"
            // >
            //   <span>acces to dashboard</span>
            //   {/* <LogOut className="h-4 w-4 text-red-400" /> */}
            // </button>
            //         <button
            //           onClick={handleLogout}
            //           className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            //         >
            //           Se déconnecter
            //         </button>
            //       </div>
            <div
            className="fixed sm:absolute right-0 bottom-0 sm:bottom-auto sm:mt-2 
                      w-full sm:w-64 shadow-lg bg-gradient-to-t from-black to-transparent backdrop-blur-md
                    z-50 
                      sm:rounded-lg rounded-t-lg
                      transition-all duration-300 ease-out
                      animate-in slide-in-from-bottom sm:slide-in-from-top"
          >
            <div className="p-4 space-y-4" role="menu">
            <a 
               
                href="http://localhost:3000/tournaments"
             
                className="flex w-full items-center justify-between px-2 py-2
                         text-sm text-gray-400 hover:text-white
                         rounded-md
                         transition-colors duration-200"
                // onClick={handleSignOut}
                role="menuitem"
              >              <TbDoorEnter   className="h-4 w-4 text-red-400" />
  
                <span>acces to dashboard</span>
              </a>
              <button
                className="flex w-full items-center justify-between px-2 py-2
                         text-sm text-gray-400 hover:text-white
                         rounded-md
                         transition-colors duration-200"
                         onClick={handleLogout}
                role="menuitem"
              >
                <span>Sign out</span>
                <LogOut className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>
                )}
              </div>
            ) : (
              // User is not logged in - show login button
              <button
                onClick={handleLoginClick}
                className={`relative group overflow-hidden bg-[#e10000] hover:bg-[#c00] text-white text-xs sm:text-sm px-3.5 sm:px-5 py-2.5 rounded-md uppercase transition-all duration-300 hover:shadow-lg hover:shadow-[#e10000]/20 hover:-translate-y-0.5 whitespace-nowrap font-bold ${getTextClass()}`}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/40 to-red-600/0 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <div className="relative flex items-center justify-center gap-2">
                  {t("nav.login")}
                  <ArrowUpRight
                    size={16}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </button>
            )}

            {/* Mobile menu button - visually improved */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 ml-1 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={screenSize.isMobile ? 20 : 24} />
              ) : (
                <Menu size={screenSize.isMobile ? 20 : 24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FACEIT-Style Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95">
          <div className="bg-[#16161a] rounded-lg w-full max-w-md mx-4 shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Logo Section */}
            <div className="pt-8 pb-4 ">
              <img
                src="/img/Logo-MGE-2025-white.svg"
                alt="MGE Logo"
                className={`transition-all mx-auto duration-300 ${isHeaderCompact ? "h-8 md:h-10" : "h-10 md:h-14"}`}
              />
            </div>

            {/* Form Section */}
            <div className="px-8 pb-8">
              <h2 className="text-white text-xl text-center mb-6">
                Se connecter
              </h2>

              {serverError && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label
                    className={`block ${emailError ? "text-red-500" : "text-gray-400"} text-sm mb-2`}
                  >
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-[#2c2c31] border ${emailError ? "border-red-500" : "border-gray-700"} text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary placeholder:text-gray-600`}
                    placeholder="Adresse e-mail"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className={`${passwordError ? "text-red-500" : "text-gray-400"} text-sm`}
                    >
                      Mot de passe
                    </label>
                    <a
                      href="#"
                      className="text-[#ff6b00] text-sm hover:underline"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-[#2c2c31] border ${passwordError ? "border-red-500" : "border-gray-700"} text-white px-4 py-3 pr-10 rounded-sm focus:outline-none focus:border-primary placeholder:text-gray-600`}
                      placeholder="Mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m14.828 14.828L3.59 3.59"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#ff6b00] hover:bg-[#e55a00] text-white font-bold py-3 rounded-sm transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </button>

                {/* OR Divider */}
                <div className="text-center text-gray-500 text-sm my-4">OU</div>

                {/* Steam Login Button */}
                <button
                  type="button"
                  className="w-full bg-[#2c2c31] hover:bg-[#3c3c41] text-white py-3 rounded-sm transition-colors border border-gray-700 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <path d="M127.779 0C60.42 0 5.24 52.173 0 119.014l68.724 28.358A35.641 35.641 0 0 1 89.82 140c.82 0 1.622.04 2.428.106L115.41 98.7l.087.005C115.39 76.965 132.913 58 155.002 58c22.246 0 39.792 18.652 39.792 41.188 0 22.536-17.82 40.911-40.066 40.911l-2.457.009-41.72 29.52a35.862 35.862 0 0 1-20.731 39.325c-8.133 3.447-17.507 3.709-25.983.519L40.83 198.996C56.273 227.49 89.227 256 127.779 256c69.869 0 127.78-57.911 127.78-127.78S197.648 0 127.779 0zM88.374 188.842c-13.803-5.67-20.64-20.62-15.258-33.382l7.938 3.284c9.641 4 14.193 14.766 10.157 24.038-4.037 9.272-15.064 12.944-24.724 8.956l-10.17-4.2c5.416 9.322 17.058 13.204 26.057 8.304zm66.456-90.142c.088-14.033-10.944-25.484-24.687-25.588-13.75-.104-24.92 11.15-24.92 25.2 0 14.042 11.445 25.328 25.478 25.328 14.025 0 24.04-11.016 24.129-25.04z" />
                  </svg>
                  LOGIN WITH STEAM
                </button>

                {/* Don't have account link */}
                <p className="text-center text-gray-500 text-sm">
                  Tu n'as pas de compte ?
                </p>

                {/* Create account link */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white text-sm uppercase"
                  >
                    Créer un compte
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu - Add auth options for mobile */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#16161a] z-40 lg:hidden overflow-y-auto"
        style={{ opacity: 0, transform: "translateX(-100%)" }}
      >
        <div className="p-4">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6">
            <img
              src="/img/Logo-MGE-2025-white.svg"
              alt="MGE Logo"
              className="h-8"
            />
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>

          {/* Mobile navigation items */}
          <nav className="space-y-4">
            <div>
              <button
                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                className="w-full text-left text-white flex items-center justify-between py-2"
              >
                {t("nav.discover")}
                {isSubMenuOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {isSubMenuOpen && (
                <div className="ml-4 space-y-2 mt-2">
                  {discoverSubItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className="block text-gray-300 hover:text-white py-1"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {mainNavItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={(e) => handleLinkClick(e, item.link)}
                className="block text-white py-2"
              >
                {item.name}
              </a>
            ))}

            {/* Auth buttons for mobile */}
            <div className="pt-4 mt-4 border-t border-gray-700">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md"
                >
                  Se déconnecter
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full bg-[#ff6b00] hover:bg-[#e55a00] text-white py-3 rounded-md"
                >
                  Se connecter
                </button>
              )}
            </div>

            {/* Social links for mobile */}
            <div className="flex justify-center space-x-4 mt-6">
              {socialLinks.map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Scroll to top button - Improved with better animation */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-primary hover:bg-primary/80 text-white rounded-full p-3 shadow-lg
          transition-all duration-300 z-50 group ${showScrollUpButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        aria-label={t("nav.backToTop")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-bounce group-hover:animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </header>
  );
};

export default NavBar;

// Add these imports at the top with other imports
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { TbDoorEnter } from "react-icons/tb";

// Add this new component for the improved login modal
const LoginModal = ({ isOpen, onClose, onLogin, isLoading, serverError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate fields
    let hasError = false;

    if (!email) {
      setEmailError(t("login.emailRequired"));
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError(t("login.invalidEmail"));
      hasError = true;
    }

    if (!password) {
      setPasswordError(t("login.passwordRequired"));
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError(t("login.passwordTooShort"));
      hasError = true;
    }

    if (hasError) return;

    // Call the parent's login handler
    onLogin({ email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-white mb-1">{t("login.welcome")}</h2>
          <p className="text-gray-400">{t("login.loginToAccount")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Server error message */}
          {serverError && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 flex items-start">
              <AlertCircle size={18} className="text-red-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-red-200 text-sm">{serverError}</p>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              {t("login.email")}
            </label>
            <div className={`relative rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-700'} focus-within:border-primary bg-gray-900/50`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-transparent rounded-lg text-white placeholder-gray-500 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>
            {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              {t("login.password")}
            </label>
            <div className={`relative rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-700'} focus-within:border-primary bg-gray-900/50`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 bg-transparent rounded-lg text-white placeholder-gray-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-primary hover:text-primary-light transition-colors">
              {t("login.forgotPassword")}
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("login.loggingIn")}
              </>
            ) : (
              t("login.login")
            )}
          </button>

          {/* Register link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              {t("login.noAccount")}{" "}
              <a href="https://user.mgexpo.ma/register" className="text-primary hover:text-primary-light transition-colors">
                {t("login.register")}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

