import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaDownload, FaEye } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// Resume PDF from src/assets – import so Vite resolves the URL
import resumePdf from '@/assets/Resume.pdf';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    setIsResumeDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card border-b border-border/50 py-2'
            : 'py-3 bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between w-full">
          {/* Logo - Left */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="text-lg sm:text-xl font-bold gradient-text flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {'ℌ𝔞𝔯𝔦 ℜ𝔞𝔪𝔐𝔬𝔥𝔞𝔫 ℜ𝔞𝔧𝔲'}
          </motion.a>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`nav-link text-sm ${
                  activeSection === link.href.substring(1) ? 'active' : ''
                }`}
              >
                {link.name}
              </a>
            ))}
            {/* Resume Link */}
            <button
              onClick={handleResumeClick}
              className="nav-link text-sm"
            >
              Resume
            </button>
          </div>

          {/* Let's Connect Button - Right */}
          <div className="flex items-center gap-2">
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hidden md:block px-4 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 neon-border bg-primary/10 text-primary hover:bg-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-xl font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Resume Link */}
              <motion.button
                onClick={handleResumeClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="text-xl font-medium transition-colors text-muted-foreground hover:text-foreground"
              >
                Resume
              </motion.button>

              {/* Mobile Let's Connect Button */}
              <motion.button
                onClick={() => handleNavClick('#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                className="mt-4 px-8 py-3 rounded-xl font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg"
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Dialog */}
      <Dialog open={isResumeDialogOpen} onOpenChange={setIsResumeDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>My Resume</DialogTitle>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => {
                    window.open(resumePdf, '_blank');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye className="w-4 h-4" />
                  View
                </motion.button>
                <motion.button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-6 bg-muted/20 rounded-lg">
            <iframe
              src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full min-h-[600px] border-0 rounded-lg bg-white"
              style={{ minHeight: '600px', width: '100%' }}
              title="Resume Preview"
              onError={() => {
                console.error('Failed to load PDF in iframe');
              }}
              allow="fullscreen"
            >
              <div className="flex flex-col items-center justify-center h-full min-h-[600px] p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Your browser doesn't support PDF preview. Please use the buttons above to view or download.
                </p>
                <motion.button
                  onClick={() => window.open(resumePdf, '_blank')}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open PDF in New Tab
                </motion.button>
              </div>
            </iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
