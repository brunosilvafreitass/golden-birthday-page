import { Sparkles, Heart } from "lucide-react";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import PhotoCarousel from "@/components/PhotoCarousel";
import PixQRCode from "@/components/PixQRCode";
import LocationSection from "@/components/LocationSection";
import SparkleEffect from "@/components/SparkleEffect";
import Navbar from "@/components/Navbar";

import carousel1 from "@/assets/carousel-1.jpeg";
import carousel2 from "@/assets/carousel-2.jpeg";
import carousel3 from "@/assets/carousel-3.jpeg";
import carousel4 from "@/assets/carousel-4.jpeg";
import carousel5 from "@/assets/carousel-5.jpeg";

const Index = () => {
  // Set your party date here
  const partyDate = new Date("2026-03-28T21:00:00");

  const carouselImages = [
    carousel1,
    carousel2,
    carousel3,
    carousel4,
    carousel5,
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      <SparkleEffect />
      <MusicPlayer />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(43,74%,49%,0.15)_0%,_transparent_50%)]" />

        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
              Você está convidado
            </span>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold leading-tight">
            Aniversário
          </h1>

          <p className="font-display text-3xl md:text-5xl text-foreground">
            de <span className="text-gradient-gold">Andresa</span>
          </p>

          <p className="text-xl md:text-2xl font-body text-muted-foreground">
            Vamos celebrar juntos!
          </p>

          <div className="section-divider my-12" />

          <div className="pt-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
              Faltam
            </p>
            <Countdown targetDate={partyDate} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="fotos" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-4">
              Momentos Especiais
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Revivendo memórias incríveis
            </p>
          </div>

          <PhotoCarousel images={carouselImages} />
        </div>
      </section>

      {/* PIX Section */}
      <section id="presente" className="py-20 px-4 relative scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(43,74%,49%,0.1)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-4">
            Presente
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-12">
            Se desejar, contribua com um presente especial
          </p>

          <PixQRCode />
        </div>
      </section>

      {/* Location Section */}
      <section id="local" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-4">
              Local da Festa
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Te esperamos neste endereço especial
            </p>
          </div>

          <LocationSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-primary/20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span className="font-display text-xl text-gradient-gold">
              Contamos com sua presença!
            </span>
            <Heart className="w-5 h-5 text-primary fill-primary" />
          </div>
          <p className="text-muted-foreground text-sm font-body">
            Confirme sua presença até 10 de Fevereiro
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
