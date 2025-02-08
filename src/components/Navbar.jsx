import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { Menu, X, Instagram, MessageSquare, Facebook, Youtube } from "lucide-react";
import gsap from "gsap";

const navItems = [
  { name: "Discover", link: "#Discover" },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  const menuRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("bg-black/95");
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("bg-black/95");
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentScrollY, lastScrollY]);

  // Mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        height: isMenuOpen ? "auto" : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      ref={navContainerRef}
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        transform: `translateY(${isNavVisible ? '0' : '-100%'})`,
        backdropFilter: currentScrollY > 0 ? 'blur(10px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="text-white hover:text-primary transition-colors duration-200 font-valorant text-sm uppercase"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_inwi.svg/2560px-Logo_inwi.svg.png"
              alt="Inwi Logo"
              className="h-8 md:h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Social links and CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors p-2"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <a 
              href="/play"
              className="hidden md:block bg-primary px-4 py-2 text-white font-valorant text-sm uppercase hover:bg-primary/90 transition-colors"
            >
              Jouez Gratuitement
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        ref={menuRef}
        className="md:hidden overflow-hidden h-0 bg-black/95 backdrop-blur-md"
      >
        <div className="px-4 pt-2 pb-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={handleLinkClick}
              className="block text-white hover:text-primary transition-colors py-2 font-valorant text-sm uppercase"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
            {socialLinks.map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors p-2"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <a 
            href="http://62.60.157.218:3001/auth/auth1/login"
            className="block w-full text-center bg-primary py-2 text-white font-valorant text-sm uppercase hover:bg-primary/90 transition-colors"
          >
            Jouez Gratuitement
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;