import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Bell, Menu, X, User } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "Memories", "Gallery", "Timeline", "Surprise"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-[0_16px_38px_rgba(255,144,187,0.14)] backdrop-blur-xl"
          : "bg-gradient-to-b from-white/85 via-white/65 to-transparent backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-xl tracking-[0.14em] text-brand sm:text-2xl md:text-3xl md:tracking-[0.2em]">
              BIRTHFLIX
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-ink-soft transition-colors hover:text-brand"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden text-ink-soft transition-colors hover:text-brand md:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden text-ink-soft transition-colors hover:text-brand md:block">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-brand shadow-[0_12px_24px_rgba(255,144,187,0.24)] transition-colors hover:bg-brand-hover md:flex">
              <User className="w-4 h-4 text-brand-foreground" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-border bg-white/80 p-2 text-brand shadow-[0_10px_22px_rgba(255,144,187,0.14)] md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-surface-soft/95 shadow-[0_18px_32px_rgba(255,144,187,0.12)] backdrop-blur-xl md:hidden"
        >
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-ink-soft transition-colors hover:bg-soft-highlight hover:text-brand"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
