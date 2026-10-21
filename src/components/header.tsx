"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";
import { isActive, mainNav } from "@/content/navigation";
import { quoteHref } from "@/lib/quote";
import logo from "../../public/brand/engine-house-logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-steel-300 md:block">
        <div className="container-eh flex h-9 items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
          <p>Maintenance · Reconditionnement · Composants pour engins lourds</p>
          {site.contact.phones.length > 0 && (
            <ul className="flex items-center gap-5">
              {site.contact.phones.map((p) => (
                <li key={p.e164}>
                  <a href={`tel:${p.e164}`} className="flex items-center gap-2 hover:text-signal">
                    <PhoneIcon className="size-3.5 text-signal" />
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Suspense fallback={<HeaderBar pathname={null} />}>
        <HeaderBarWithPath />
      </Suspense>
    </header>
  );
}

function HeaderBarWithPath() {
  return <HeaderBar pathname={usePathname()} />;
}

function HeaderBar({ pathname }: { pathname: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const mobileId = useId();

  // Fermeture du sous-menu : clic extérieur et touche Échap
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Menu mobile : verrouillage du défilement et touche Échap
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <div className="on-light relative border-b border-steel-200 bg-white">
      <div className="container-eh flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" onClick={closeAll} className="shrink-0 py-2" aria-label="Engine House Import Export — accueil">
          <Image src={logo} alt="" priority className="h-11 w-auto lg:h-14" sizes="130px" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const base = `relative flex h-20 items-center gap-1.5 px-3 text-[0.94rem] font-semibold transition-colors hover:text-ink ${
                active ? "text-ink" : "text-steel-700"
              }`;
              const bar = (
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-1 bg-signal transition-transform duration-200 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              );
              if ("children" in item) {
                return (
                  <li key={item.href} ref={servicesRef} className="relative">
                    <button
                      ref={servicesButtonRef}
                      type="button"
                      className={base}
                      aria-expanded={servicesOpen}
                      aria-controls={panelId}
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      {bar}
                    </button>
                    <div
                      id={panelId}
                      hidden={!servicesOpen}
                      className="absolute left-1/2 top-full w-[38rem] -translate-x-1/2 border border-steel-200 bg-white shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)]"
                    >
                      <ul className="grid grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.href} className="border-b border-r border-steel-100 [&:nth-child(2n)]:border-r-0">
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className="group block h-full p-5 hover:bg-paper"
                            >
                              <span className="font-mono text-[10px] tracking-[0.16em] text-steel-600">{child.code}</span>
                              <span className="mt-1 block font-display text-[1.05rem] font-bold leading-snug text-ink">
                                {child.label}
                              </span>
                              <span className="mt-1.5 block text-sm leading-snug text-steel-600">{child.summary}</span>
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/nos-metiers"
                            onClick={closeAll}
                            className="flex h-full items-center justify-between gap-3 bg-ink p-5 font-semibold text-bone hover:text-signal"
                          >
                            Tous nos métiers
                            <ArrowRight />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link href={item.href} className={base} aria-current={active && pathname === item.href ? "page" : undefined}>
                    {item.label}
                    {bar}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={quoteHref()}
            onClick={closeAll}
            className="hidden min-h-11 items-center border-2 border-signal bg-signal px-4 text-[0.92rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-signal sm:inline-flex"
          >
            Demander un devis
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center border-2 border-ink text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id={mobileId}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-steel-200 bg-white lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-eh py-6">
          <ul className="divide-y divide-steel-200 border-y border-steel-200">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-display text-xl font-bold"
                >
                  {item.label}
                  {isActive(pathname, item.href) && <span aria-hidden="true" className="size-2.5 bg-signal" />}
                </Link>
                {"children" in item && (
                  <ul className="mb-4 grid gap-px bg-steel-200">
                    {item.children.map((child) => (
                      <li key={child.href} className="bg-paper">
                        <Link href={child.href} onClick={closeAll} className="flex items-baseline gap-3 px-4 py-3 text-[0.98rem] font-medium">
                          <span className="font-mono text-[10px] tracking-[0.14em] text-steel-600">{child.code}</span>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={quoteHref()}
            onClick={closeAll}
            className="mt-6 flex min-h-12 items-center justify-center gap-3 bg-signal font-semibold text-ink"
          >
            Demander un devis <ArrowRight />
          </Link>
          {site.contact.phones.length > 0 && (
            <ul className="mt-6 space-y-2">
              {site.contact.phones.map((p) => (
                <li key={p.e164}>
                  <a href={`tel:${p.e164}`} className="flex items-center gap-3 py-1 font-medium">
                    <PhoneIcon className="size-4" />
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}
