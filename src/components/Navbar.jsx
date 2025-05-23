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
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import { TbDoorEnter } from "react-icons/tb";


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
  const { t, getTextClass,  } =
    useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Add state for login modal and auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);



 

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

 

  // Get query parameters
  useEffect(() => {
    // Access query parameters
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const data = JSON.parse(localStorage.getItem("userData"));

    console.log(data);
    
    // If token exists in URL, handle authentication
    if (data === null ) {
      // You can use these parameters to authenticate the user
      handleTokenAuth(token, userId);
    }else{
      setUserData(data.user);
      setIsAuthenticated(true);
    }
  }, [searchParams]);
  console.log(userData);
  // Function to handle authentication with token
  const handleTokenAuth = async (token, userId) => {
    try {
      // Option 1: Pass token as query parameter (if your API supports it)
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_URL}/api/users.php?user_id=${userId}&token=${encodeURIComponent(token)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
     
    
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        // Set authentication state
        setIsAuthenticated(true);

        setIsLoggedIn(true);
        setUserData(data.data); // Note: changed from data.userData to data.data based on your API response structure
        
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(data.data));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        
        // Remove query parameters from URL to avoid sharing tokens
        navigate(location.pathname, { replace: true });
      } else {
        console.error("Authentication failed:", data.message);
        // Handle authentication failure
        setIsAuthenticated(false);
        setUserData(null);
        
        // Clear any existing auth data from localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
      }
    } catch (error) {
      console.error("Token validation error:", error);
      // Handle error state
      setIsAuthenticated(false);
      setUserData(null);
      
      // Clear any existing auth data from localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    }
  };

  // Add function to handle login button click
  // Update the handleLogout function:
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');

    setDropdownOpen(false);
  };

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
   
    // setIsLoginModalOpen(true);
    route.push("http://localhost:3000/login");
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
            {isAuthenticated && userData ? (
    // User is logged in - show avatar and name
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 sm:gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors"
      >
        <img
          src={userData.avatar ? `https://api.mgexpo.ma${userData.avatar}` : "/img/default-avatar.jpg"}
          alt={userData.username}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200"
        />
        <span className="text-sm sm:text-base font-ea-football text-white">
          {userData.username}
        </span>
        <ChevronDown
          size={16}
          className={`text-white transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
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
              role="menuitem"
            >
              <TbDoorEnter className="h-4 w-4 text-red-400" />
              <span>Access to dashboard</span>
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
    <a
      href="http://localhost:3000/login"
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
    </a>
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


