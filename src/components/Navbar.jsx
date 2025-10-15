import { useEffect, useRef, useState, useCallback } from "react";
import { useWindowScroll } from "react-use";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  Linkedin,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import gsap from "gsap";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import { TbDoorEnter } from "react-icons/tb";
import { useAuth } from "../utils/useAuth.jsx";
import FrenchTitle from "./FrenchTitle.jsx";

const socialLinks = [
  { Icon: Facebook, link: "/#hero" },
  { Icon: Instagram, link: "/#hero" },
  {
    Icon: Youtube,
    link: "/#hero",
  },
  { Icon: Linkedin, link: "/#hero" },
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
    />
  </svg>
);

socialLinks.push({
  Icon: XIcon,
  link: "/#hero",
});

const NavBar = () => {
  const { t, isRtl, language, forceTifinaghFont, getTextClass, isTamazight } =
    useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const { user, loading, error, logout, isAuthenticated, checkAuthStatus } =
    useAuth();

  const debugAuth = useCallback(() => {
    console.log("🔧 =====================================");
    console.log("🔧 NAVBAR AUTH DEBUG");
    console.log("🔧 =====================================");
    console.log("🔧 user:", user);
    console.log("🔧 loading:", loading);
    console.log("🔧 error:", error);
    console.log("🔧 isAuthenticated:", isAuthenticated);
    console.log("🔧 =====================================");
  }, [user, loading, error, isAuthenticated]);

  const handleLogout = async () => {
    console.log("🔧 NavBar - Handling logout...");
    await logout();
    setDropdownOpen(false);
    setIsMenuOpen(false); // Close mobile menu on logout
    console.log("🔧 NavBar - Logout complete");
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (token && userId) {
      handleTokenAuth(token, userId);
    }
  }, [searchParams]);

  const handleTokenAuth = async (token, userId) => {
    try {
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
        await checkAuthStatus();
        navigate(location.pathname, { replace: true });
        console.log("NavBar - Token auth successful");
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Token validation error:", error);
    }
  };

  const mainNavItems = [
    { name: t("nav.passGamers"), link: "/#PassGamers" },
    { name: t("nav.documentation"), link: "/downloads" },
    { name: t("nav.organizer"), link: "/organizer" },
    { name: t("nav.faq"), link: "/#faq" },
  ];

  // Discover is now a simple nav item, not a dropdown
  const discoverNavItem = { name: t("nav.discover"), link: "/#hero" };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navContainerRef = useRef(null);
  const menuRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

      if (width >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isMenuOpen]);

  // Mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        // Show menu
        gsap.set(menuRef.current, { display: "block" });
        gsap.fromTo(
          menuRef.current,
          {
            opacity: 0,
            x: "-100%",
          },
          {
            opacity: 1,
            x: "0%",
            duration: 0.3,
            ease: "power2.out",
          }
        );

        // Animate menu items
        const menuItems = menuRef.current.querySelectorAll(".mobile-nav-item");
        gsap.fromTo(
          menuItems,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          }
        );

        // Prevent body scroll
        document.body.style.overflow = "hidden";
      } else {
        // Hide menu
        gsap.to(menuRef.current, {
          opacity: 0,
          x: "-100%",
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (menuRef.current) {
              gsap.set(menuRef.current, { display: "none" });
            }
          },
        });

        // Restore body scroll
        document.body.style.overflow = "unset";
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.substring(1));
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  const handleLinkClick = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      scrollToSection(link);
    } else if (link.startsWith("/") && link.includes("#")) {
      // Handle links like "/#hero" - navigate to home page then scroll
      e.preventDefault();
      const hash = link.split("#")[1];
      if (location.pathname !== "/") {
        // Navigate to home page first
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMenuOpen(false);
    } else if (link.includes("user.mgexpo.ma")) {
      window.location.href = link;
      e.preventDefault();
    } else {
      setIsMenuOpen(false);
    }
  };

  const navLinkClass =
    "text-white hover:text-primary transition-all duration-200 text-sm uppercase font-medium tracking-wide transform";

  if (loading) {
    console.log("🔧 NavBar - Loading auth state...");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div
        ref={navContainerRef}
        className={`bg-gradient-to-b from-black via-black/80 to-transparent transition-all duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          <div
            className={`flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 ${isHeaderCompact ? "py-1" : "py-2"} transition-all duration-300`}
          >
            {/* Mobile menu button and Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Mobile menu button - Left side */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-md text-white transition-colors lg:hidden flex-shrink-0" // Only show on mobile/tablet
                aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X size={screenSize.isMobile ? 20 : 24} />
                ) : (
                  <Menu size={screenSize.isMobile ? 20 : 24} />
                )}
              </button>
              {/* Logo left */}
              <div className="flex items-center flex-shrink-0">
                <Link to="/" className="flex items-center flex-shrink-0">
                  <img
                    src="img/logo-gamius-white.png"
                    alt="GAMIUS Logo"
                    className={`transition-all duration-300 flex-shrink-0 ${isHeaderCompact ? "h-8 md:h-10 lg:h-12" : "h-9 md:h-11 lg:h-13"}`}
                  />
                </Link>
              </div>
            </div>
            {/* Central navigation - Desktop only */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-6 justify-center flex-grow">
              {/* Discover button - simple link to hero */}
              <a
                href={discoverNavItem.link}
                onClick={(e) => handleLinkClick(e, discoverNavItem.link)}
                className={`${navLinkClass} p-2 rounded-md ${getTextClass()}`}
              >
                {discoverNavItem.name}
              </a>

              {/* Regular nav links */}
              {mainNavItems.map((item) =>
                item.link.startsWith("#") || (item.link.startsWith("/") && item.link.includes("#")) ? (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={(e) => handleLinkClick(e, item.link)}
                    className={`${navLinkClass} p-2 rounded-md ${getTextClass()}`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`${navLinkClass} p-2 rounded-md flex items-center gap-1 ${getTextClass()}`}
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
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              {/* Social networks on desktop */}

              <div className="hidden xl:flex items-center gap-2 mr-2">
                {socialLinks.map(({ Icon, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    className="text-white/80 hover:text-white transition-all p-1.5 hover:scale-110 hover:bg-white/10 rounded-full"
                    aria-label={`Visit our ${Icon.name || "social media"}`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Language selector (desktop & tablet only) */}
              <div
                ref={languageSelectorRef}
                className="hidden sm:flex relative z-20 items-center transform-gpu flex-shrink-0"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  <div className="rounded-full p-0.5 lg:p-1 hover:bg-black/50 transition-all duration-200 relative">
                    <LanguageSelector />
                  </div>
                </div>
              </div>
              {/* {loading ? (
                <div className="flex items-center gap-2 text-white">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 sm:gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost'}${user.avatar}`
                          : "/img/default-avatar.jpg"
                      }
                      alt={user.username || 'User'}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-green-400"
                      onError={(e) => {
                        e.target.src = "/img/default-avatar.jpg";
                      }}
                    />
                    <span className="text-sm sm:text-base text-white font-medium">
                      {user.username || 'User'}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-white transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 shadow-lg bg-black/90 backdrop-blur-md z-50 rounded-lg border border-white/10">
                      <div className="p-4 space-y-4">
                        <div className="text-center border-b border-white/10 pb-3">
                          <p className="text-white font-medium">{user.username}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          <p className="text-gray-400 text-xs">Points: {user.points || 0}</p>
                        </div>
                        
                        <a
                          href={`${import.meta.env.VITE_PUBLIC_URL}:3000/tournaments`}
                          className="flex items-center justify-between px-2 py-2 text-sm text-gray-400 hover:text-white rounded-md transition-colors"
                        >
                          <TbDoorEnter className="h-4 w-4 text-green-400" />
                          <span>Access Dashboard</span>
                        </a>
                        
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center justify-between px-2 py-2 text-sm text-gray-400 hover:text-white rounded-md transition-colors"
                        >
                          <span>Sign Out</span>
                          <LogOut className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                  className="bg-[#e10000] hover:bg-[#c00] text-white text-lg px-5 py-2.5 rounded-md uppercase transition-all duration-300 font-bold"
                >
                  <div className="flex items-center gap-2 special-font">
                    {t("nav.login")}
                    <ArrowUpRight size={16} />
                  </div>
                </a>
              ) */}

              {/* Auth section */}
              {loading ? (
                <div className="flex items-center gap-2 text-white">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated && user ? (
                // keep your dropdown avatar for desktop
                <div className="relative" ref={dropdownRef}>
                 <button
  className="group relative flex items-center transition-all duration-300"
  onClick={() => setDropdownOpen(!dropdownOpen)}
  aria-expanded={dropdownOpen}
  aria-haspopup="true"
>
  {/* Mobile: Just rounded avatar */}
  <div className="md:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 shadow-lg hover:border-primary hover:scale-105 transition-all duration-300">
    <img
      src={
        user.avatar
          ? `${import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost"}${user.avatar}`
          : "/img/default-avatar.jpg"
      }
      alt={user.username || "User"}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.src = "/img/default-avatar.jpg";
      }}
    />
  </div>

  {/* Desktop: Full profile button */}
  <div className="hidden md:flex items-center space-x-2 py-2 px-3 max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]">
    {/* Background with angular styling */}
    <div className="absolute inset-0 group-hover:border-primary/30 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,61,8,0.02)_2px,rgba(255,61,8,0.02)_4px)] opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Content */}
    <div className="relative z-10 flex items-center space-x-2 w-full">
      {/* Avatar with skewed container */}
      <div className="relative w-8 h-8 lg:w-9 lg:h-9 flex-shrink-0 transform -skew-x-6 overflow-hidden bg-black/40">
        <div className="transform skew-x-6 w-full h-full">
          <img
            src={
              user.avatar
                ? `${import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost"}${user.avatar}`
                : "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt={user.username || "User"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/img/default-avatar.jpg";
            }}
          />
        </div>
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0 text-left overflow-hidden">
        <p className="text-xs lg:text-sm font-bold text-white truncate uppercase tracking-wide">
          {user.username || "User"}
        </p>
        {user.user_type && (
          <p className="text-[10px] lg:text-xs font-semibold text-primary truncate capitalize">
            {user.user_type}
          </p>
        )}
      </div>

      {/* Chevron */}
      <div className="flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 bg-primary/20 border border-primary/40 flex items-center justify-center transform -skew-x-6 group-hover:bg-primary/30 transition-all duration-300">
        <ChevronDown
          className={`w-2.5 h-2.5 lg:w-3 lg:h-3 text-primary transition-transform duration-300 transform skew-x-6 ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
    </div>
  </div>
</button>

                  {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-96 z-50">
    {/* Corner accents */}
    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary z-10" />
    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary z-10" />
    
    <div className="relative bg-black/90 backdrop-blur-md border border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,61,8,0.02)_2px,rgba(255,61,8,0.02)_4px)] opacity-50 pointer-events-none" />
      
      <div className="relative z-10 p-4 space-y-4" role="menu">
        {/* User Info Section */}
        <div className="text-center border-b border-white/10 pb-4">
          <p className="text-white font-bold uppercase tracking-wider mb-1">
            {user.username}
          </p>
          <p className="text-gray-400 text-xs mb-2">{user.email}</p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">
              {user.points || 0} Points
            </span>
          </div>
        </div>

        {/* Access Dashboard Link */}
        <a
          href={`${import.meta.env.VITE_PUBLIC_URL}/tournaments`}
          className="group/item relative flex items-center justify-between px-3 py-2 text-sm transition-all duration-300 overflow-hidden"
          role="menuitem"
        >
          <div className="absolute inset-0 bg-white/0 group-hover/item:bg-white/5 border-l-2 border-transparent group-hover/item:border-green-500/50 transition-all duration-300" />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500/20 border border-green-500/40 flex items-center justify-center transform -skew-x-6 group-hover/item:bg-green-500/30 transition-all duration-300">
              <TbDoorEnter className="h-3 w-3 text-green-400 transform skew-x-6" />
            </div>
            <span className="text-gray-300 group-hover/item:text-white font-bold uppercase text-xs tracking-wider">
              Access Dashboard
            </span>
          </div>
        </a>
        
        {/* Sign Out Button */}
        <button
          className="group/item relative flex w-full items-center justify-between px-3 py-2 text-sm transition-all duration-300 overflow-hidden"
          onClick={handleLogout}
          role="menuitem"
        >
          <div className="absolute inset-0 bg-white/0 group-hover/item:bg-red-500/10 border-l-2 border-transparent group-hover/item:border-red-500/50 transition-all duration-300" />
          
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500/20 border border-red-500/40 flex items-center justify-center transform -skew-x-6 group-hover/item:bg-red-500/30 transition-all duration-300">
                <LogOut className="h-3 w-3 text-red-400 transform skew-x-6" />
              </div>
              <span className="text-gray-300 group-hover/item:text-white font-bold uppercase text-xs tracking-wider">
                Sign Out
              </span>
            </div>
          </div>
        </button>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  </div>
)}
                </div>
              ) : (
                <>
                  {/* Desktop login button */}
                  <a
                    href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                    className="hidden sm:flex bg-[#e10000] hover:bg-[#c00] text-white text-sm lg:text-base px-3 lg:px-5 py-2 lg:py-2.5 rounded-md uppercase transition-all duration-300 font-bold whitespace-nowrap flex-shrink-0"
                  >
                    <div className="flex items-center gap-1 lg:gap-2 special-font">
                      {t("nav.login")}
                      <ArrowUpRight size={14} className="lg:w-4 lg:h-4" />
                    </div>
                  </a>

                  {/* Mobile login button */}
                  <a
                    href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                    className="sm:hidden flex items-center justify-center special-font px-3 py-1.5 bg-[#e10000] hover:bg-[#c00] text-white rounded-md text-xs font-semibold whitespace-nowrap flex-shrink-0"
                  >
                    {t("nav.login")}
                    <ArrowUpRight size={14} />
                  </a>
                </>
              )}
              {/* Mobile menu button */}
              {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md text-white transition-colors lg:hidden" // Only show on mobile/tablet
              aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={screenSize.isMobile ? 20 : 24} />
              ) : (
                <Menu size={screenSize.isMobile ? 20 : 24} />
              )}
            </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - FIXED VERSION */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-gradient-to-br from-[#16161a] via-[#1a1a1f] to-[#16161a] z-[999999] lg:hidden"
        style={{ display: "none" }}
      >
        {/* Background overlay with subtle pattern */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 mobile-nav-item">
            <img
              src="img/logo-gamius-white.png"
              alt="GAMIUS Logo"
              className="h-10"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-primary p-2 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile navigation content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6 space-y-2 flex flex-col items-center">
              {/* Discover button - simple link to hero */}
              <div className="mobile-nav-item w-full flex flex-col items-center">
                <a
                  href={discoverNavItem.link}
                  onClick={(e) => handleLinkClick(e, discoverNavItem.link)}
                  className="w-full flex justify-center items-center special-font py-4 text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                >
                  {language === "fr" ? (
                    <FrenchTitle
                      textKey="nav.discover"
                      className="text-2xl font-medium !flex !items-center"
                      as="span"
                    />
                  ) : (
                    <span className="text-2xl font-medium">
                      {t("nav.discover")}
                    </span>
                  )}
                </a>
              </div>

              {/* Main navigation items */}
              {mainNavItems.map((item, index) => (
                <div
                  key={item.name}
                  className="w-full flex flex-col items-center"
                >
                  {item.link.startsWith("#") || (item.link.startsWith("/") && item.link.includes("#")) ? (
                    <a
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className="py-4 text-white special-font flex flex-col justify-center items-center transition-all duration-200 text-2xl font-medium"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-4 text-white special-font flex flex-col justify-center items-center transition-all duration-200 text-2xl font-medium"
                    >
                      <div className="flex items-center justify-between">
                        <div className="mr-4">{item.name}</div>
                        <ArrowUpRight size={18} className="text-primary" />
                      </div>
                    </Link>
                  )}
                </div>
              ))}

              {/* Language selector for mobile */}
              <div className="w-full flex justify-center mt-4 mobile-nav-item">
                <div className="rounded-full p-1 bg-black/50">
                  <LanguageSelector />
                </div>
              </div>
            </nav>

            {/* Auth section for mobile */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
