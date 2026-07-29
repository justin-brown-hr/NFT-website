import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-bg-black">
      <div className="mx-auto max-w-7xl px-5 py-5 md:px-8 md:py-6 lg:px-10">
        {/* Desktop: 3 columns with vertical dividers */}
        <div className="hidden items-center lg:grid lg:grid-cols-[auto_1fr_auto]">
          <div className="pr-8 xl:pr-10">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo-hummingbird.png"
                alt="Artanova"
                width={320}
                height={80}
                className="h-14 w-auto object-contain object-left xl:h-16"
              />
            </Link>
            <p className="mt-1.5 text-[11px] text-text-muted/70">
              © 2026 Artanova. All rights reserved.
            </p>
          </div>

          <div className="flex items-center justify-center border-x border-white/20 px-8 xl:px-10">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1 xl:gap-x-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium tracking-wide-label text-text-primary transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-xs font-medium tracking-wide-label text-text-primary transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 pl-8 xl:pl-10">
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-text-primary transition-colors hover:text-gold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/discord-white.svg"
                alt=""
                className="h-5 w-5"
              />
            </a>
            <a
              href={LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-text-primary transition-colors hover:text-gold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/x.svg" alt="" className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="flex flex-col gap-5 lg:hidden">
          <div>
            <Link href="/" className="inline-flex self-start">
              <Image
                src="/images/logo-hummingbird.png"
                alt="Artanova"
                width={320}
                height={80}
                className="h-12 w-auto object-contain object-left sm:h-14"
              />
            </Link>
            <p className="mt-1.5 text-[11px] text-text-muted/70">
              © 2026 Artanova. All rights reserved.
            </p>
          </div>

          <div className="border-y border-white/15 py-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium tracking-wide-label text-text-primary transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-xs font-medium tracking-wide-label text-text-primary transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-text-primary transition-colors hover:text-gold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/discord-white.svg"
                alt=""
                className="h-5 w-5"
              />
            </a>
            <a
              href={LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-text-primary transition-colors hover:text-gold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/x.svg" alt="" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
