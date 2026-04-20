"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Switch } from "@/components/ui/switch";

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const locale = useLocale();
  const canonicalPath = pathname.replace(/^\/(en|ar)/, "") || "/";

  const toggleLocale = () => {
    if (locale === "ar") {
      window.location.href = canonicalPath;
    } else {
      window.location.href = `/ar${canonicalPath === "/" ? "" : canonicalPath}`;
    }
  };

  const links = [
    { to: "/" as const, label: t("home") },
    { to: "/portfolio" as const, label: t("work") },
    { to: "/services" as const, label: t("services") },
    { to: "/schools" as const, label: "Schools 🎓" },
    { to: "/blog" as const, label: t("blog") },
    { to: "/about" as const, label: t("about") },
    { to: "/contact" as const, label: t("contact") },
  ] as const;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-full border border-border px-5 py-3">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="inline-block h-3 w-3 rounded-full bg-gradient-berry shadow-glow" />
            <span>berry<span className="text-gradient-berry">design</span></span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active =
                pathname === l.to ||
                (l.to !== "/" && pathname.startsWith(l.to));
              return (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-secondary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Languages className="h-4 w-4" />
              <span className="uppercase">{locale}</span>
            </button>
            <Sun className="h-4 w-4 text-foreground" />
            <Switch
              checked={mounted && theme === "dark"}
              onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <Moon className="h-4 w-4 text-foreground" />
          </div>

          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-berry px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 md:inline-flex"
          >
            {t("startProject")}
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 rounded-3xl border border-border p-4 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      href={l.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
