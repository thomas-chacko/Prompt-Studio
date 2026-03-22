"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles, Menu, X, Wand2, ImageIcon,
  LayoutGrid, Compass, User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/toast";

const NAV_LINKS = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/generate-prompt", label: "AI Generator", icon: Wand2 },
  { href: "/generate-image", label: "Image Prompts", icon: ImageIcon },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  // Detect scroll for blur intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ─── Top Bar ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "top-3 px-4 sm:px-6" : "top-0 px-0"
          }`}
      >
        <nav
          className={`mx-auto h-14 flex items-center justify-between transition-all duration-500 ${scrolled
            ? "max-w-5xl px-5 rounded-2xl bg-[#07040f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 rounded-none bg-transparent border-b border-transparent"
            }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="font-extrabold text-lg tracking-tight text-white">
              Prompt<span className="text-brand-cyan">Studio</span>
            </span>
          </Link>

          {/* Desktop links — centre */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${active
                    ? "text-white bg-white/8"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white/8 -z-10"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan hover:from-brand-purple/80 hover:to-brand-cyan/80 transition-all shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:shadow-[0_0_30px_rgba(112,0,255,0.6)]"
                title={user?.username}
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/8 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {/* ─── Mobile Sidebar ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", mass: 0.5, damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 z-50 h-full w-[min(80vw,340px)] bg-[#0c0917] border-l border-white/10 flex flex-col shadow-2xl lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-extrabold text-base text-white">
                    Prompt<span className="text-brand-cyan">Studio</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${active
                          ? "bg-brand-purple/20 text-white border border-brand-purple/25"
                          : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                          }`}
                      >
                        <link.icon
                          className={`w-4.5 h-4.5 ${active ? "text-brand-cyan" : "text-gray-500"}`}
                        />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-4 pb-8 pt-4 border-t border-white/8 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/submit"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-purple to-brand-cyan text-white btn-shine shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all"
                    >
                      <PlusCircle className="w-4.5 h-4.5" />
                      Submit Your Prompt
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-medium text-sm bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
                    >
                      <User className="w-4.5 h-4.5" />
                      Profile
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white btn-shine transition-all"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
