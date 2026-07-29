"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useSafeReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 md:h-28 md:px-8 lg:px-10">
          <Link href="/" className="group flex items-center" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo-hummingbird.png"
              alt="Artanova"
              width={400}
              height={100}
              priority
              className="h-20 w-auto object-contain object-left md:h-24"
            />
          </Link>

          <ul className="hidden items-center gap-7 xl:gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative pb-1 text-xs font-medium tracking-wide-label text-text-muted transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative pb-1 text-xs font-medium tracking-wide-label transition-colors ${
                      isActive(link.href)
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                        isActive(link.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-text-primary transition-colors hover:text-gold lg:hidden"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={{ type: "tween", duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pt-24">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`font-display text-3xl tracking-wide ${
                  pathname === "/" ? "text-gold" : "text-text-primary"
                }`}
              >
                HOME
              </Link>
              {NAV_LINKS.map((link, i) =>
                link.external ? (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.05 * i + 0.1 }}
                    className="font-display text-3xl tracking-wide text-text-primary"
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-display text-3xl tracking-wide ${
                        isActive(link.href) ? "text-gold" : "text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
