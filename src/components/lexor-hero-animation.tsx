"use client";

export function LexorHeroAnimation() {
  return (
    <section className="lexor-hero" id="hero" aria-label="Lexor hero">
      <div className="lexor-hero-video-wrapper" aria-hidden="true">
        <video 
          className="lexor-hero-video" 
          src="/assets/lexor-bg-video.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
      </div>
      <div className="lexor-hero-grid" aria-hidden="true" />
      <div className="lexor-hero-noise" aria-hidden="true" />
      <div className="lexor-hero-beam" aria-hidden="true" />

      <div className="lexor-hero-hud" aria-hidden="true">
        <div className="lexor-hero-hud-card lexor-hero-hud-card-left">
          <span>GROWTH</span>
          <strong>+28%</strong>
          <em>DEMANDA CAPTURADA</em>
        </div>
        <div className="lexor-hero-hud-card lexor-hero-hud-card-right">
          <span>SYSTEM</span>
          <strong>IA / OPS</strong>
          <em>FOLLOW-UP ATIVO</em>
        </div>
        <div className="lexor-hero-radar lexor-hero-radar-left" />
        <div className="lexor-hero-radar lexor-hero-radar-right" />
      </div>

      <div className="lexor-hero-copy">
        <div className="lexor-hero-kicker">LEXOR / SISTEMAS DE CRESCIMENTO</div>
        <h1>
          <span className="reveal-mask">
            <span className="reveal-mask-inner">Vendemos</span>
          </span>
          <span className="reveal-mask">
            <span className="reveal-mask-inner">tempo.</span>
          </span>
        </h1>
        <p className="hero-lead">
          Conectamos sua empresa com o futuro.<br />
          Marketing, IA, sistemas, apps e Google trabalhando como um só sistema de crescimento.
        </p>
        <p className="hero-support-premium">
          Para empresas que já vendem, mas precisam escalar sem depender de esforço manual, ferramentas soltas e operação improvisada.
        </p>
        <a href="https://wa.me/5511975895183?text=Ol%C3%A1%2C%20quero%20solicitar%20meu%20Mapa%20de%20Crescimento" className="btn-primary ripple-target" data-cursor="Diagnóstico" target="_blank" rel="noopener noreferrer">
          Solicitar Mapa de Crescimento →
        </a>
      </div>

      <div className="lexor-hero-scroll" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}
