import { useState } from "react";
import { Music, Mail, Link2, Share2, Check, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { RandomFact } from "@/components/shared/random-fact";
import { dogProfile } from "@/data/profile";

const socials = [
  {
    icon: Music,
    label: "Spotify",
    href: "https://open.spotify.com/playlist/2lQcWqwrjttXYvaFvyEyLq?si=633331299d3d4c08",
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${dogProfile.name}'s Home`,
      text: `Meet ${dogProfile.name}, a very good ${dogProfile.breed}.`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled — no action needed */
      }
    } else {
      await handleCopyLink();
    }
  };

  return (
    <section id="contact" className="bg-(--background) py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Say hello"
          title="Get in touch."
          description={`Questions, playdate requests, or just want to tell us ${dogProfile.name} made your day? We'd love to hear it.`}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <ContactForm />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-5">
            <Card>
              <CardContent className="space-y-5 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-forest-700/8 text-forest-700 dark:bg-cream-100/10 dark:text-cream-100">
                    <Mail className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-sm text-(--muted-foreground)">Email</p>
                    <p className="font-medium">jzrllpapa.dev@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {socials.map((s) => {
                    const isExternal = s.href.startsWith("http");

                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="flex size-10 items-center justify-center rounded-full border border-(--border) transition-colors hover:bg-(--secondary)"
                      >
                        <s.icon className="size-4.5" />
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2">
                    {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
                    {copied ? "Copied" : "Copy link"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                    <Share2 className="size-3.5" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <RandomFact />

            <div className="flex items-start gap-2.5 rounded-lg border border-dashed border-(--border) p-4 text-xs text-(--muted-foreground)">
              <Keyboard className="mt-0.5 size-3.5 shrink-0" />
              <p>
                Press{" "}
                <kbd className="rounded border border-(--border) px-1.5 py-0.5 font-mono">⌘</kbd>+
                <kbd className="rounded border border-(--border) px-1.5 py-0.5 font-mono">K</kbd>{" "}
                anytime to jump to a section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
