import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { Menu, X, Instagram, MessageSquare, Facebook, Youtube } from "lucide-react";
import gsap from "gsap";

const navItems = [
  { name: "Discover", link: "#Discover" },
  { name: "Pass Gamers", link: "#pass-gamers" },
  { name: "Tri9 l glory", link: "#Tri9Lglory" },
  { name: "Prize Pool", link: "#PrizePool" },
  { name: "Join Us", link: "#welliMchhorm" }
];

const socialLinks = [
  { Icon: Instagram, link: "https://instagram.com/inwi" },
  { Icon: MessageSquare, link: "https://m.me/inwi" },
  { Icon: Facebook, link: "https://facebook.com/inwi" },
  { Icon: Youtube, link: "https://youtube.com/inwi" }
];

const NavBar = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  
  // Refs
  const navContainerRef = useRef(null);
  const menuRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Screen size detection with detailed breakpoints
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024
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
      // At the top - always show transparent
      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("bg-black/95");
        navContainerRef.current?.classList.remove("shadow-md");
      } 
      // Scrolling down - hide on mobile and tablet only
      else if (currentScrollY > lastScrollY && !screenSize.isDesktop) {
        setIsNavVisible(false);
      } 
      // Scrolling up - always show with background
      else {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("bg-black/95");
        navContainerRef.current?.classList.add("shadow-md");
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentScrollY, lastScrollY, screenSize.isDesktop]);

  // Improved mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      const contentHeight = isMenuOpen ? menuRef.current.scrollHeight : 0;
      
      gsap.to(menuRef.current, {
        maxHeight: isMenuOpen ? contentHeight : 0,
        opacity: isMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isMenuOpen]);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // We don't need to lock body scroll for a dropdown menu
  // Removed the body scroll lock effect

  return (
    <nav 
      ref={navContainerRef}
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        transform: `translateY(${isNavVisible ? '0' : '-100%'})`,
        backdropFilter: currentScrollY > 0 ? 'blur(10px)' : 'none'
      }}
    >
      {/* Main navbar container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 h-14 sm:h-16 md:h-20">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile menu button - visually hidden on desktop */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 mr-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={screenSize.isMobile ? 20 : 24} />
              ) : (
                <Menu size={screenSize.isMobile ? 20 : 24} />
              )}
            </button>
            
            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-white hover:text-primary transition-colors duration-200 font-valorant text-sm uppercase whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Logo - centered for mobile and tablet, left-aligned for desktop */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none`}>
            <img
              src="https://moroccogamingexpo.ma/wp-content/uploads/2024/02/Logo-MGE-2025-white.svg"
              alt="Inwi Logo"
              className="h-10 sm:h-12 md:h-16 w-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          {/* Right section - social + CTA */}
          <div className="flex items-center">
            {/* Social icons - conditionally show based on space */}
            <div className="hidden sm:flex items-center">
              {socialLinks.slice(0, screenSize.isTablet ? 2 : 4).map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2"
                  aria-label={`Visit our ${Icon.name}`}
                >
                  <Icon size={screenSize.isMobile ? 18 : screenSize.isTablet ? 20 : 20} />
                </a>
              ))}
            </div>
            
            {/* CTA Button - hidden on tablet, visible on mobile and desktop */}
            {screenSize.isDesktop && (
              <a 
                href="http://109.120.179.6:3001/auth/auth1/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary px-3 py-1.5 ml-2 sm:ml-3 text-white font-valorant text-xs sm:text-sm uppercase hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                {screenSize.isMobile ? "Jouez" : "Jouez Gratuitement"}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet dropdown menu */}
      <div 
        ref={menuRef}
        className="lg:hidden overflow-hidden max-h-0 bg-black/95 backdrop-blur-md"
        style={{ opacity: 0 }}
      >
        <div className="px-4 py-3 sm:py-4">
          {/* Navigation links */}
          <div className="space-y-2 sm:space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={handleLinkClick}
                className="block text-white hover:text-primary transition-colors py-2 font-valorant text-sm sm:text-base uppercase"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Social links */}
          <div className="flex items-center space-x-3 sm:space-x-4 pt-4 mt-2 sm:mt-3 border-t border-white/10">
            {socialLinks.map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors p-2"
                aria-label={`Visit our ${Icon.name}`}
              >
                <Icon size={screenSize.isMobile ? 20 : 22} />
              </a>
            ))}
          </div>
          
          {/* CTA button */}
          <a 
            href="http://109.120.179.6:3001/auth/auth1/login"
            onClick={handleLinkClick}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-primary py-2 sm:py-2.5 text-white font-valorant text-sm sm:text-base uppercase hover:bg-primary/90 transition-colors mt-4"
          >
            Jouez Gratuitement
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;