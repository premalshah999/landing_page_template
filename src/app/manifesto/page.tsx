"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TextRevealOptimized } from "@/components/ui/text-reveal-optimized";
import { InteractiveUSMap } from "@/components/visualizations/InteractiveUSMap";
import { siteConfig } from "@/config/content";
import { ArrowLeft } from "lucide-react";

export default function ManifestoPage() {
    const fullText = siteConfig.manifesto.paragraphs.join(" ");

    return (
        <main className="min-h-screen">
            {/* Back Navigation */}
            <div className="fixed top-6 left-6 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-space-grotesk)]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            <section className="relative py-24 md:py-32">
                {/* Header */}
                <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto w-full">
                        <ScrollReveal>
                            <div className="flex flex-col items-center text-center space-y-6">
                                <span className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase font-[family-name:var(--font-space-grotesk)]">
                                    {siteConfig.manifesto.date}
                                </span>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide font-[family-name:var(--font-space-grotesk)]">
                                    {siteConfig.manifesto.title}
                                </h1>
                                <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Full Manifesto Text */}
                <div className="px-4 md:px-6 lg:px-12 py-12 md:py-16">
                    <div className="max-w-4xl mx-auto">
                        <TextRevealOptimized
                            text={fullText}
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground/90 font-[family-name:var(--font-space-grotesk)]"
                        />
                    </div>
                </div>

                {/* Interactive USA Map */}
                <div className="px-4 md:px-6 lg:px-12 py-12 md:py-16">
                    <div className="max-w-5xl mx-auto">
                        <ScrollReveal delay={0.2}>
                            <InteractiveUSMap />
                        </ScrollReveal>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
                    <ScrollReveal delay={0.3}>
                        <div className="h-px w-48 bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
                    </ScrollReveal>
                    <ScrollReveal delay={0.4}>
                        <Link
                            href="/"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-space-grotesk)]"
                        >
                            Return to Home
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
