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
      {/* Compact navbar with glassmorphism */}
      <nav
        ref={navContainerRef}
        className={`backdrop-blur-lg bg-black/70 border-b border-white/10 transition-all duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-14">
            {/* Left section: Logo + Mobile menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-primary transition-colors p-1.5 hover:bg-white/10 rounded-md"
                aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Logo - compact size */}
              <Link to="/" className="flex items-center flex-shrink-0">
                <img
                  src="img/logo-gamius-white.png"
                  alt="GAMIUS Logo"
                  className="h-7 sm:h-8 lg:h-9 transition-all duration-300"
                />
              </Link>
            </div>

            {/* Center section: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Discover link */}
              <a
                href={discoverNavItem.link}
                onClick={(e) => handleLinkClick(e, discoverNavItem.link)}
                className={`px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-all ${getTextClass()}`}
              >
                {discoverNavItem.name}
              </a>

              {/* Main nav items */}
              {mainNavItems.map((item) =>
                item.link.startsWith("#") || item.link.includes("/#") ? (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={(e) => handleLinkClick(e, item.link)}
                    className={`px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-all ${getTextClass()}`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-all flex items-center gap-1 ${getTextClass()}`}
                  >
                    {item.name}
                    <ArrowUpRight size={12} className="opacity-60" />
                  </Link>
                )
              )}
            </div>

            {/* Right section: Social + Language + Auth */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Social links - desktop only, compact */}
              <div className="hidden xl:flex items-center gap-1 mr-1">
                {socialLinks.map(({ Icon, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    className="text-white/60 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-md"
                    aria-label={`Visit our ${Icon.name || "social media"}`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              {/* Language selector - compact */}
              <div
                ref={languageSelectorRef}
                className="hidden sm:block"
              >
                <div className="hover:bg-white/5 rounded-md transition-colors">
                  <LanguageSelector />
                </div>
              </div>

              {/* Auth section - compact */}
              {loading ? (
                <div className="flex items-center gap-1.5 px-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-1.5 hover:bg-white/5 px-2 py-1.5 rounded-md transition-all"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {/* Avatar - compact */}
                    <img
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost"}${user.avatar}`
                          : "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username || "User") + "&background=e10000&color=fff&size=128"
                      }
                      alt={user.username || "User"}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-white/20 bg-gray-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(e.target.alt || "User") + "&background=e10000&color=fff&size=128";
                      }}
                    />
                    {/* Username - desktop only */}
                    <span className="hidden md:block text-sm font-medium text-white max-w-[140px] lg:max-w-[180px] truncate" title={user.username}>
                      {user.username}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`hidden md:block text-white/60 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown - compact */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                      {/* User info */}
                      <div className="p-3 border-b border-white/10">
                        <p className="text-white font-semibold text-sm break-words">{user.username}</p>
                        <p className="text-white/60 text-xs truncate">{user.email}</p>
                        {user.points !== undefined && (
                          <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 border border-primary/30 px-2 py-1 rounded">
                            <span className="text-primary text-xs font-bold">{user.points} Points</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="p-2 space-y-1">
                        <a
                          href={`${import.meta.env.VITE_PUBLIC_URL}/tournaments`}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                        >
                          <TbDoorEnter size={16} className="text-green-400" />
                          <span>Dashboard</span>
                        </a>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                        >
                          <LogOut size={16} className="text-red-400" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                  className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <span className="hidden sm:inline">{t("nav.login")}</span>
                  <span className="sm:hidden">Login</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Modern fullscreen overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[999] lg:hidden"
        style={{ display: "none" }}
      >
        <div className="relative h-full flex flex-col">
          {/* Mobile header - compact */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img
                src="img/logo-gamius-white.png"
                alt="GAMIUS Logo"
                className="h-7"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-primary p-2 hover:bg-white/5 rounded-md transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile navigation - scrollable */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-1">
              {/* Discover link */}
              <a
                href={discoverNavItem.link}
                onClick={(e) => handleLinkClick(e, discoverNavItem.link)}
                className="mobile-nav-item block px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {language === "fr" ? (
                  <FrenchTitle
                    textKey="nav.discover"
                    className="!flex !items-center"
                    as="span"
                  />
                ) : (
                  <span>{t("nav.discover")}</span>
                )}
              </a>

              {/* Main nav items */}
              {mainNavItems.map((item) => (
                <div key={item.name} className="mobile-nav-item">
                  {item.link.startsWith("#") || item.link.includes("/#") ? (
                    <a
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className="block px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight size={16} className="text-primary" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom section - Language & Social */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              {/* Language selector */}
              <div className="mobile-nav-item">
                <p className="text-xs text-white/60 mb-2 px-4">Language</p>
                <div className="px-4">
                  <LanguageSelector />
                </div>
              </div>

              {/* Social links */}
              <div className="mobile-nav-item">
                <p className="text-xs text-white/60 mb-2 px-4">Follow Us</p>
                <div className="flex items-center gap-2 px-4">
                  {socialLinks.map(({ Icon, link }, index) => (
                    <a
                      key={index}
                      href={link}
                      className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-md transition-colors"
                      aria-label={`Visit our ${Icon.name || "social media"}`}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile auth section */}
              {!loading && !isAuthenticated && (
                <div className="mobile-nav-item px-4 pt-2">
                  <a
                    href={`${import.meta.env.VITE_PUBLIC_URL}:3000/login`}
                    className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-3 rounded-lg transition-all"
                  >
                    <span>{t("nav.login")}</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
