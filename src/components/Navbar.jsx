import { useEffect, useRef, useState, useCallback } from "react";
import { useWindowScroll } from "react-use";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  ChevronUp,
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
    />
  </svg>
);

socialLinks.push({
  Icon: XIcon,
  link: "https://twitter.com/mgexma",
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
    { name: t("nav.passGamers"), link: "#PassGamers" },
    { name: t("nav.documentation"), link: "/downloads" },
    { name: t("nav.faq"), link: "#faq" },
  ];

  const discoverSubItems = [
    {
      name: t("nav.discover"),
      link: "#about",
      bgImage: "/img/discover-bg.jpg", // Add your image path
    },
    {
      name: t("nav.tri9lGlory"),
      link: "#Tri9lGlory",
      bgImage: "/img/tri9l-glory-bg.jpg", // Add your image path
    },
    {
      name: t("nav.prizePool"),
      link: "#PrizePool",
      bgImage: "/img/prize-pool-bg.jpg", // Add your image path
    },
    {
      name: t("nav.proPath"),
      link: "#pro-path",
      bgImage: "/img/pro-path-bg.jpg", // Add your image path
    },
  ];

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

  const navContainerRef = useRef(null);
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const discoverBtnRef = useRef(null);
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
      setIsSubMenuOpen(false);
    }
  };

  const handleLinkClick = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      scrollToSection(link);
    } else if (link.includes("user.mgexpo.ma")) {
      window.location.href = link;
      e.preventDefault();
    } else {
      setIsMenuOpen(false);
      setIsSubMenuOpen(false);
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
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`flex items-center justify-between ${isHeaderCompact ? "py-1" : "py-2"} transition-all duration-300`}
          >
            {/* Mobile menu button and Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button - Left side */}
              <button
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
              </button>
              {/* Logo left */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <img
                    src="img/logo-gamius-white.png"
                    alt="GAMIUS Logo"
                    className={`transition-all duration-300 ${isHeaderCompact ? "h-10 md:h-12" : "h-10 md:h-14"}`}
                  />
                </Link>
              </div>
            </div>
            {/* Central navigation - Desktop only */}
            <div className="hidden lg:flex items-center space-x-8 justify-center flex-grow">
              {/* Discover menu with dropdown */}
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

                {/* Dropdown menu */}
                <div
                  ref={subMenuRef}
                  className={`absolute left-0 mt-0.5 min-w-96 overflow-hidden font-zentry 
                    bg-gradient-to-br from-slate-900/95 via-gray-800/90 to-slate-900/95 
                    backdrop-blur-xl border border-white/10 
                    rounded-2xl shadow-2xl shadow-black/50 origin-top-left
                    transition-all duration-500 ease-out
                    ${
                      isSubMenuOpen
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 -translate-y-6 scale-95 pointer-events-none"
                    }`}
                  aria-hidden={!isSubMenuOpen}
                >
                  {/* Menu items */}
                  <div className="py-2">
                    {discoverSubItems.map((item, index) => (
                      <a
                        key={item.name}
                        href={item.link}
                        onClick={(e) => handleLinkClick(e, item.link)}
                        className={`group relative flex items-center px-6 py-4 text-white 
                          transition-all duration-300 text-sm font-medium uppercase tracking-wide
                          overflow-hidden
                          ${getTextClass()}`}
                      >
                        {/* Individual item background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg m-1"></div>

                        {/* Left-to-right overlay on hover */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-transparent 
                          transform -translate-x-full group-hover:translate-x-0 
                          transition-transform duration-500 ease-out"
                        ></div>

                        {/* Left accent bar */}
                        <div
                          className="absolute left-0 top-0 w-1 h-full bg-primary 
                          transform scale-y-0 group-hover:scale-y-100 
                          transition-transform duration-300 origin-top"
                        ></div>

                        <div
                          className="relative flex items-center justify-center w-8 h-8 mr-4 
                          rounded-lg bg-white/5 group-hover:bg-primary/20 
                          transition-all duration-300 group-hover:scale-110"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-primary/70 
                            group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/50
                            transition-all duration-300"
                          ></span>
                        </div>

                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </span>

                        <div
                          className="ml-auto opacity-0 group-hover:opacity-100 
                          transform translate-x-2 group-hover:translate-x-0 
                          transition-all duration-300 relative z-10"
                        >
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
                </div>
              </div>

              {/* Regular nav links */}
              {mainNavItems.map((item) =>
                item.link.startsWith("#") ? (
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
            <div className="flex items-center gap-4">
              {/* Social networks on desktop */}

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

              {/* Language selector (desktop & tablet only) */}
              <div
                ref={languageSelectorRef}
                className="hidden sm:flex relative z-20 items-center transform-gpu"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  <div className="rounded-full p-1 hover:bg-black/50 transition-all duration-200 relative">
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
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 sm:gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost"}${user.avatar}`
                          : "/img/default-avatar.jpg"
                      }
                      alt={user.username || "User"}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover "
                      onError={(e) => {
                        e.target.src = "/img/default-avatar.jpg";
                      }}
                    />
                    <span className="text-sm sm:text-base text-white font-medium">
                      {user.username || "User"}
                    </span>

                    <ChevronDown
                      size={16}
                      className={`text-white transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-96 shadow-lg bg-black/90 backdrop-blur-md z-50 rounded-lg border border-white/10">
                      <div className="p-4 space-y-4">
                        <div className="text-center border-b border-white/10 pb-3">
                          <p className="text-white font-medium">
                            {user.username}
                          </p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          <p className="text-gray-400 text-xs">
                            Points: {user.points || 0}
                          </p>
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
                <>
                  {/* Desktop login button */}
                  <a
                    href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                    className="hidden sm:flex bg-[#e10000] hover:bg-[#c00] text-white text-lg px-5 py-2.5 rounded-md uppercase transition-all duration-300 font-bold"
                  >
                    <div className="flex items-center gap-2 special-font">
                      {t("nav.login")}
                      <ArrowUpRight size={16} />
                    </div>
                  </a>

                  {/* Mobile login button */}
                  <a
                    href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                    className="sm:hidden flex items-center justify-center special-font px-4 py-1.5 bg-[#e10000] hover:bg-[#c00] text-white rounded-md text-sm font-semibold"
                  >
                    {t("nav.login")}
                    <ArrowUpRight size={16} />
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
              {/* Discover section */}
              <div className="mobile-nav-item w-full flex flex-col items-center">
                <button
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                  className="w-full flex  justify-center items-center special-font py-4 text-white hover:bg-white/5 rounded-xl transition-all duration-200 group"
                >
                  {language === "fr" ? (
                    <FrenchTitle
                      textKey="nav.discover"
                      className="text-2xl font-medium !flex !items-center mr-4"
                      as="span"
                    />
                  ) : (
                    <span className="text-2xl font-medium mr-4">
                      {t("nav.discover")}
                    </span>
                  )}
                  <div
                    className={`transition-transform duration-300 ${isSubMenuOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDown size={20} className="text-primary" />
                  </div>
                </button>
                {/* Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isSubMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-6 mt-2 space-y-1">
                    {discoverSubItems.map((item, index) => (
                      <a
                        key={item.name}
                        href={item.link}
                        onClick={(e) => handleLinkClick(e, item.link)}
                        className="block py-3 px-4 text-gray-300 hover:text-white font-robert-medium rounded-lg transition-all duration-200 text-base"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main navigation items */}
              {mainNavItems.map((item, index) => (
                <div
                  key={item.name}
                  className="w-full flex flex-col items-center"
                >
                  {item.link.startsWith("#") ? (
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
