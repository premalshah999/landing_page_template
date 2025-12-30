"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Typewriter } from "@/components/ui/typewriter";
import { USAMapBackground } from "@/components/visualizations/USMap";
import { siteConfig } from "@/config/content";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6">
            {/* Map Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
                <div className="w-full max-w-[1200px] h-full">
                    <USAMapBackground strokeColor="#3B82F6" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-6 md:gap-8">
                {/* Company Name with Hover Effect */}
                <div className="relative h-[120px] md:h-[200px] w-full">
                    <TextHoverEffect text={siteConfig.name} />
                </div>

                {/* Hero Title */}
                <ScrollReveal delay={0.1}>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide leading-tight text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
                        {siteConfig.hero.title}
                    </h1>
                </ScrollReveal>

                {/* Subtitle with Typewriter */}
                <ScrollReveal delay={0.2}>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-foreground/70 tracking-wide max-w-3xl font-[family-name:var(--font-space-grotesk)]">
                        <Typewriter text={siteConfig.hero.subtitle} delay={50} />
                    </h2>
                </ScrollReveal>

                {/* Social Links - Sleek Minimalistic */}
                <ScrollReveal delay={0.3}>
                    <div className="flex items-center gap-8 mt-6">
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                            aria-label="X"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span className="text-xs tracking-widest uppercase font-[family-name:var(--font-space-grotesk)] hidden sm:inline">X</span>
                        </a>

                        <span className="w-px h-4 bg-border" />

                        <a
                            href="https://medium.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                            aria-label="Medium"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                            </svg>
                            <span className="text-xs tracking-widest uppercase font-[family-name:var(--font-space-grotesk)] hidden sm:inline">Medium</span>
                        </a>

                        <span className="w-px h-4 bg-border" />

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="text-xs tracking-widest uppercase font-[family-name:var(--font-space-grotesk)] hidden sm:inline">LinkedIn</span>
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
                <div className="w-px h-16 bg-gradient-to-b from-foreground/30 to-transparent" />
            </div>
        </section>
    );
}
