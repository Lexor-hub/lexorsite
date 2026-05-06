"use client";

import type { ChangeEvent, CSSProperties, FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { LexorHeroAnimation } from "./lexor-hero-animation";

const WHATSAPP_NUMBER = "5511975895183";

const navItems = [
  { label: "Sistema", href: "#sistema" },
  { label: "Módulos", href: "#modulos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Método", href: "#metodo" },
  { label: "Diagnóstico", href: "#mapa" },
];

const agentRows = [
  { human: "Trabalha 8h por dia", agent: "Trabalha 24h por dia" },
  { human: "Esquece do follow-up", agent: "Nunca esquece nada" },
  { human: "Custa mais à medida que cresce", agent: "Fica mais barato com escala" },
  { human: "Precisa de treinamento constante", agent: "Aprende com cada conversa" },
  { human: "Sai de férias, pede demissão", agent: "Disponível sempre" },
];

const cockpitNodes = [
  { key: "marketing", label: "Marketing", x: 20, y: 22 },
  { key: "ia", label: "IA", x: 50, y: 12 },
  { key: "site", label: "Site", x: 80, y: 22 },
  { key: "app", label: "App", x: 89, y: 50 },
  { key: "crm", label: "CRM", x: 80, y: 78 },
  { key: "google", label: "Google", x: 50, y: 88 },
  { key: "automacao", label: "Automação", x: 20, y: 78 },
  { key: "dados", label: "Dados", x: 11, y: 50 },
];

const cockpitLinks = [
  { key: "marketing", x: 220, y: 180 },
  { key: "ia", x: 550, y: 100 },
  { key: "site", x: 880, y: 180 },
  { key: "app", x: 980, y: 400 },
  { key: "crm", x: 880, y: 620 },
  { key: "google", x: 550, y: 700 },
  { key: "automacao", x: 220, y: 620 },
  { key: "dados", x: 120, y: 400 },
];

const systemChapters = [
  {
    label: "01 / AGENTE DE ATRAÇÃO",
    title: "Sua empresa encontra quem está procurando.",
    desc: "Site, posicionamento e busca capturando intenção real de compra.",
    nodes: ["site", "google", "marketing"],
  },
  {
    label: "02 / AGENTE DE CAPTURA",
    title: "Transforma interesse em conversa comercial.",
    desc: "Campanhas e funis conduzindo o lead qualificado até a decisão.",
    nodes: ["marketing", "dados", "crm"],
  },
  {
    label: "03 / AGENTE DE CONVERSA",
    title: "Responde, qualifica e agenda. 24h, sem falha.",
    desc: "IA treinada no seu negócio respondendo, qualificando e mantendo cadência de follow-up.",
    nodes: ["ia", "crm", "automacao"],
  },
  {
    label: "04 / AGENTE DE OPERAÇÃO",
    title: "Conecta, organiza e executa sem manual.",
    desc: "Apps próprios, CRMs e automações conectando etapas, dados e responsáveis.",
    nodes: ["app", "crm", "automacao"],
  },
  {
    label: "05 / AGENTE DE INTELIGÊNCIA",
    title: "Lê os dados e indica o próximo passo.",
    desc: "Sinais reais viram clareza sobre onde ajustar, priorizar e crescer.",
    nodes: ["dados", "google", "ia"],
  },
];

const projectSignals: Record<string, { primary: string; secondary: string }> = {
  logistics: {
    primary: "ROTA OPERACIONAL ATIVA",
    secondary: "IA organizando comprovantes",
  },
  mobile: {
    primary: "JORNADA MOBILE GUIADA",
    secondary: "Produto digital em fluxo",
  },
  chat: {
    primary: "FOLLOW-UP EM EXECUÇÃO",
    secondary: "Atendimento e agenda conectados",
  },
  funnel: {
    primary: "FUNIL EM MOVIMENTO",
    secondary: "Posicionamento + venda assistida",
  },
  saas: {
    primary: "AGENTES ESPECIALIZADOS",
    secondary: "Tarefas UGC automatizadas",
  },
  delivery: {
    primary: "PEDIDOS EM TEMPO REAL",
    secondary: "WhatsApp + atendimento IA",
  },
};

const modules = [
  {
    eyebrow: "01 / AQUISIÇÃO",
    title: "Agente de Atração",
    desc: "Campanhas, funis e busca para trazer quem tem intenção real de comprar.",
    signal: "Demanda qualificada",
    metric: "Leads com intenção",
    type: "growth",
  },
  {
    eyebrow: "02 / TIMES DE AGENTES IA",
    title: "Time de Agentes de Conversa",
    desc: "Agentes treinados no seu produto para responder, qualificar e agendar no WhatsApp — sem espera, sem falha de follow-up.",
    signal: "Agente ativo 24h",
    metric: "0 leads sem resposta",
    type: "chat",
  },
  {
    eyebrow: "03 / OPERAÇÃO DIGITAL",
    title: "Agente de Operação",
    desc: "Sistemas próprios, CRMs e automações que conectam dados, etapas e responsáveis sem planilha ou manual.",
    signal: "Processos conectados",
    metric: "Menos tarefa manual",
    type: "ops",
  },
  {
    eyebrow: "04 / PRESENÇA PREMIUM",
    title: "Sistema de Presença",
    desc: "Sites e experiências digitais que posicionam, convencem e convertem antes de qualquer conversa.",
    signal: "Autoridade visível",
    metric: "Conversão assistida",
    type: "site",
  },
  {
    eyebrow: "05 / BUSCA & REPUTAÇÃO",
    title: "Agente de Busca",
    desc: "Presença no Google para captar quem já está procurando o que você vende.",
    signal: "Intenção capturada",
    metric: "Busca em movimento",
    type: "search",
  },
];

const projects = [
  {
    num: "01 - ID TRANSPORTES",
    name: "Logística digital com IA",
    desc: "De rotina manual para logística digital com rastreamento e comprovantes organizados por IA.",
    tags: ["Sistema", "Logística", "IA Operacional"],
    result: "Comprovantes organizados por IA — sem digitação manual",
    ownSystem: true,
    type: "logistics",
  },
  {
    num: "02 - FOCUS CLUB",
    name: "App de jornada fitness",
    desc: "De consultoria fitness para produto mobile com jornada guiada.",
    tags: ["App Mobile", "Fitness", "Produto Digital"],
    result: "De consultoria para produto digital com jornada guiada",
    ownSystem: true,
    type: "mobile",
  },
  {
    num: "03 - REDE KUMON",
    name: "IA no WhatsApp",
    desc: "De atendimento reativo para captação, qualificação e agendamento com IA.",
    tags: ["IA WhatsApp", "CRM", "Educação"],
    result: "Atendimento e agendamento com IA — resposta em segundos",
    ownSystem: false,
    type: "chat",
  },
  {
    num: "04 - DUDA DIAS",
    name: "Funil digital para creator",
    desc: "De conhecimento especialista para funil, posicionamento e vendas assistidas.",
    tags: ["Funil", "UGC", "Infoproduto"],
    result: "Funil e posicionamento rodando para creator",
    ownSystem: false,
    type: "funnel",
  },
  {
    num: "05 - LEXY TOOLS",
    name: "SaaS com agentes de IA",
    desc: "De tarefas manuais de UGC para agentes especializados em um app próprio.",
    tags: ["SaaS", "Agentes IA", "UGC"],
    result: "Tarefas de UGC automatizadas por agentes especializados",
    ownSystem: true,
    type: "saas",
  },
  {
    num: "06 - SORVETERIA TATUS",
    name: "Pedidos automatizados",
    desc: "De WhatsApp manual para pedidos, dúvidas e vendas automatizadas.",
    tags: ["WhatsApp", "Delivery", "Atendimento IA"],
    result: "Pedidos e atendimento 24h sem operador humano",
    ownSystem: false,
    type: "delivery",
  },
];

const methodSteps = [
  {
    title: "Diagnosticar",
    num: "01 / DIAGNOSTICAR",
    desc: "Mapeamos gargalos de vendas, atendimento, operação e presença digital.",
    detail: "Antes de propor qualquer agente ou sistema.",
  },
  {
    title: "Desenhar",
    num: "02 / DESENHAR",
    desc: "Definimos a arquitetura: site, app, funil, agente, CRM, automação ou busca.",
    detail: "Cada empresa tem uma combinação diferente. Não existe solução padrão aqui.",
  },
  {
    title: "Construir",
    num: "03 / CONSTRUIR",
    desc: "Criamos os ativos que colocam a operação em movimento.",
    detail: "Você acompanha. Entregamos em sprints, não em promessas.",
  },
  {
    title: "Otimizar",
    num: "04 / OTIMIZAR",
    desc: "Medimos, ajustamos e evoluímos com dados reais.",
    detail: "Com os dados da sua operação — não de benchmarks genéricos do setor.",
  },
];

const forItems = [
  "Já têm clientes e oferta validada.",
  "Dependem demais de atendimento manual.",
  "Perdem oportunidades por falta de follow-up.",
  "Usam ferramentas que não conversam.",
  "Querem crescer sem montar uma equipe interna gigante.",
];

const notForItems = [
  "Um post bonito.",
  "Um site barato.",
  "Uma automação isolada.",
  "Uma promessa mágica de resultado.",
  "Um fornecedor sem envolvimento estratégico.",
];

const deliverables = [
  {
    title: "Mapa de Gargalos",
    desc: "Onde tempo, leads e vendas estão vazando.",
    icon: "box",
  },
  {
    title: "Mapa de Alavancas",
    desc: "Onde IA, automação, marketing ou busca podem gerar avanço.",
    icon: "bolt",
  },
  {
    title: "Prioridade de Execução",
    desc: "O que executar primeiro, depois e em seguida.",
    icon: "lines",
  },
  {
    title: "Arquitetura Recomendada",
    desc: "A combinação ideal de site, funil, agente, app, CRM, automação ou busca.",
    icon: "grid",
  },
  {
    title: "Próximo Movimento",
    desc: "Um caminho claro para sair da análise e entrar em execução.",
    icon: "arrow",
  },
];

const challengeOptions = [
  "Marketing",
  "Vendas",
  "Atendimento",
  "Operação",
  "Google",
  "Automação",
  "Agentes de IA / Automação",
  "Sistema ou app próprio",
  "Ainda não sei",
];

export function LexorExperience() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const [loaderStarted, setLoaderStarted] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [systemProgress, setSystemProgress] = useState(0);
  const [methodProgress, setMethodProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const startTimer = window.setTimeout(() => setLoaderStarted(true), 50);
    const hideTimer = window.setTimeout(() => setLoaderHidden(true), 1750);
    const interval = window.setInterval(() => {
      setLoaderPercent((current) => {
        if (current >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return Math.min(100, current + Math.floor(Math.random() * 14) + 8);
      });
    }, 95);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(hideTimer);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 60);
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);

      const system = document.getElementById("sistema");
      if (system) {
        const rect = system.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const current = Math.max(0, Math.min(scrollable, -rect.top));
        setSystemProgress(current / scrollable);
      }

      const method = document.getElementById("metodo");
      if (method) {
        const rect = method.getBoundingClientRect();
        const total = rect.height + window.innerHeight * 0.2;
        const current = window.innerHeight * 0.6 - rect.top;
        setMethodProgress(Math.max(0, Math.min(1, current / total)));
      }
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

    function scramble(el: Element) {
      if (reduced || el.children.length > 0) return;
      const original = el.textContent ?? "";
      const len = original.length;
      const duration = 600;
      const start = performance.now();
      const tick = () => {
        const t = Math.min((performance.now() - start) / duration, 1);
        const fixed = Math.floor(t * len);
        el.textContent = original
          .split("")
          .map((ch, i) => (ch === " " || i < fixed ? ch : charset[Math.floor(Math.random() * charset.length)]))
          .join("");
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = original;
      };
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (entry.target.matches(".section-eyebrow")) scramble(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
            if (!e.target.classList.contains("section-entered")) {
              e.target.classList.add("section-entered");
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(".ripple-target");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.left = `${e.clientX - rect.left}px`;
      wave.style.top = `${e.clientY - rect.top}px`;
      target.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove(), { once: true });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!loaderHidden) return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      window.cancelAnimationFrame(rafId);
    };
  }, [loaderHidden]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    const buttons = document.querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary, .header-cta");
    const onMove = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transition = "transform 0.08s linear";
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.38;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.38;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transition = "transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)";
      btn.style.transform = "";
      window.setTimeout(() => { btn.style.transition = ""; }, 560);
    };
    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
    });
    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [loaderHidden]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse || !cursorDotRef.current || !cursorRingRef.current || !cursorLabelRef.current) {
      return undefined;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const label = cursorLabelRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let velX = 0;
    let velY = 0;
    let ambX = -600;
    let ambY = -600;
    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      document.querySelectorAll<HTMLElement>(".float-card").forEach((card, index) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        const intensity = (index + 1) * 6;
        card.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
      });
    };

    const loop = () => {
      // Spring physics: stiffness 0.11, damping 0.78 — produces slight overshoot
      velX = (velX + (mouseX - ringX) * 0.11) * 0.78;
      velY = (velY + (mouseY - ringY) * 0.11) * 0.78;
      ringX += velX;
      ringY += velY;
      ambX += (mouseX - ambX) * 0.055;
      ambY += (mouseY - ambY) * 0.055;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${ringX}px, ${ringY + 48}px) translate(-50%, -50%)`;
      if (ambientRef.current) {
        ambientRef.current.style.background = `radial-gradient(700px circle at ${ambX}px ${ambY}px, rgba(198,244,50,0.05), transparent 40%)`;
      }
      frame = window.requestAnimationFrame(loop);
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, input, select, .module-card, .project-card, .cockpit-node, [data-cursor]",
    );
    const addHover = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      ring.classList.add("hover");

      if (target.dataset.cursor) {
        label.textContent = target.dataset.cursor;
        label.classList.add("is-visible");
      }
    };
    const removeHover = () => {
      ring.classList.remove("hover");
      label.classList.remove("is-visible");
      label.textContent = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", addHover);
      element.addEventListener("mouseleave", removeHover);
    });
    loop();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", addHover);
        element.removeEventListener("mouseleave", removeHover);
      });
      window.cancelAnimationFrame(frame);
    };
  }, [loaderHidden]);

  const activeMethodIndex = Math.min(
    methodSteps.length - 1,
    Math.floor(methodProgress * methodSteps.length),
  );
  const activeSystemIndex = Math.min(
    systemChapters.length - 1,
    Math.floor(systemProgress * systemChapters.length),
  );

  function handleCardMove(event: ReactMouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotX = ((y - 50) / 50) * -6;
    const rotY = ((x - 50) / 50) * 6;
    event.currentTarget.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  }

  function handleCardLeave(event: ReactMouseEvent<HTMLElement>) {
    event.currentTarget.style.transform = "";
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nome = String(formData.get("nome") || "").trim();
    const empresa = String(formData.get("empresa") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const desafio = String(formData.get("desafio") || "").trim();

    if (!nome || !empresa || !whatsapp || !desafio) {
      return;
    }

    const message = [
      "Olá, Lexor. Quero solicitar meu Mapa de Crescimento.",
      "",
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      `WhatsApp: ${whatsapp}`,
      `Principal desafio: ${desafio}`,
    ].join("\n");

    setSubmitted(true);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className={`lexor-site ${loaderHidden ? "hero-ready" : ""}`}>
      <div ref={ambientRef} className="cursor-ambient" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorLabelRef} className="cursor-label" aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div
        className={`loader ${loaderStarted ? "is-started" : ""} ${
          loaderHidden ? "is-hidden" : ""
        }`}
        aria-hidden={loaderHidden}
      >
        <div className="loader-lightning" />
        <div className="loader-logo">
          <span>LEXOR</span>
        </div>
        <div className="loader-meta">
          <span>LOADING SISTEMA</span>
          <span>{String(loaderPercent).padStart(3, "0")}</span>
        </div>
        <div className="loader-bar" style={{ width: `${loaderPercent}%` }} />
      </div>

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="header-logo">
          LEXOR
        </a>
        <nav className="header-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? "active" : ""}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#mapa" className="header-cta ripple-target" data-cursor="Mapa">
          <span className="header-cta-full">Solicitar Mapa</span>
          <span className="header-cta-short">Mapa</span>
        </a>
      </header>

      <main>
        <LexorHeroAnimation />
        <div className="content-reveal">
          <ManifestoSection />
          <ProblemSection />
          <SystemSection activeIndex={activeSystemIndex} progress={systemProgress} />
          <AgentsSection />
          <ModulesSection onCardMove={handleCardMove} onCardLeave={handleCardLeave} />
          <ProjectsSection onCardMove={handleCardMove} onCardLeave={handleCardLeave} />
          <StatsSection />
          <MethodSection activeIndex={activeMethodIndex} progress={methodProgress} />
          <QualificationSection />
          <MapSection onSubmit={submitForm} submitted={submitted} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ManifestoSection() {
  return (
    <section id="manifesto">
      <div className="site-container">
        <div className="section-eyebrow reveal">01 · MANIFESTO</div>
        <h2 className="section-title reveal">
          Sua empresa não
          <br />
          devia precisar de
          <br />
          você para funcionar.
        </h2>
        <p className="manifesto-text reveal">
          A Lexor monta o time digital que atrai, responde, qualifica e
          organiza — enquanto você faz o que só você pode fazer.
        </p>
        <p className="manifesto-impact reveal">
          Quando tudo depende de alguém lembrar, cobrar e conferir, o
          crescimento custa esforço. Quando tudo vira sistema, ele custa
          inteligência.
        </p>
        <p className="manifesto-tag reveal">
          Não é automação. É uma equipe. Sem folha de pagamento crescendo.
        </p>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problema" className="section-muted">
      <div className="site-container">
        <div className="section-eyebrow reveal">02 · O PROBLEMA INVISÍVEL</div>
        <div className="problem-grid">
          <div>
            <h2 className="section-title reveal">
              Sua empresa não precisa
              <br />
              de mais ferramentas.
              <br />
              Precisa de conexão.
            </h2>
            <p className="manifesto-text reveal problem-copy">
              Site, Instagram, WhatsApp, planilhas, CRM, anúncios e automações
              até existem. O problema é que quase nada conversa.
            </p>
            <p className="problem-accent reveal">
              A Lexor fecha os buracos. Com agentes que não esquecem, sistemas
              que conectam e dados que mostram onde melhorar.
            </p>
          </div>
          <div className="problem-list reveal">
            <p className="problem-narrative">
              O lead entra. Ninguém responde rápido.
              <br />
              Quando respondem, ele já foi embora.
              <br />
              O follow-up? Ficou no &ldquo;vou mandar amanhã&rdquo;.
              <br />
              A venda vazou sem que ninguém percebesse.
              <br />
              E os dados pra entender onde foi?
              <br />
              Espalhados em cinco ferramentas que não conversam.
            </p>
            <p className="problem-urgency">
              Enquanto você lê isso, empresas no seu mercado já operam com
              agentes de IA no atendimento. A janela de vantagem existe —
              mas fecha.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemSection({ activeIndex, progress }: { activeIndex: number; progress: number }) {
  const activeChapter = systemChapters[activeIndex] ?? systemChapters[0];
  const activeNodes = new Set(activeChapter.nodes);
  const cockpitRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = cockpitRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDrawn(true); obs.disconnect(); } },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="sistema" className="system-scroll">
      <div className="site-container system-intro">
        <div className="section-eyebrow reveal">03 · ARQUITETURA LEXOR</div>
        <h2 className="section-title reveal">
          Sistema de
          <br />
          Crescimento Lexor™
        </h2>
        <p className="section-subtitle reveal">
          Cinco agentes especializados. Uma operação conectada. Zero
          dependência de você estar presente.
        </p>
      </div>

      <div className="site-container system-stage reveal">
        <div
          className="system-sticky"
          style={{ "--system-progress": `${progress * 100}%` } as CSSProperties}
        >
          <div className="system-cockpit-panel">
            <div className="system-readout">
              <span>{activeChapter.label}</span>
              <strong>{activeChapter.title}</strong>
              <p>{activeChapter.desc}</p>
            </div>

            <div className="cockpit" ref={cockpitRef}>
              <svg className="cockpit-svg" viewBox="0 0 1100 800" preserveAspectRatio="xMidYMid meet">
                <circle className="cockpit-line" cx="550" cy="400" r="140" />
                <circle className="cockpit-line" cx="550" cy="400" r="240" />
                <circle className="cockpit-line" cx="550" cy="400" r="340" />
                <circle className="cockpit-center-ring" cx="550" cy="400" r="80" />

                {cockpitLinks.map((link, index) => (
                  <path
                    key={link.key}
                    d={`M 550 400 L ${link.x} ${link.y}`}
                    pathLength="1"
                    className={`cockpit-line ${activeNodes.has(link.key) ? "link-active" : ""}`}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: drawn ? 0 : 1,
                      transition: `stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.09}s, stroke 0.3s ease, opacity 0.3s ease`,
                    } as CSSProperties}
                  />
                ))}

                {cockpitLinks.slice(0, 5).map((link, index) => (
                  <line
                    key={`${link.key}-pulse`}
                    className="cockpit-pulse"
                    x1="550"
                    y1="400"
                    x2={link.x}
                    y2={link.y}
                    style={{ animationDelay: `${index * 0.28}s` }}
                  />
                ))}

                <circle cx="550" cy="400" r="6" fill="#C6F432" />
              </svg>

              <div className="cockpit-core">
                <div className="cockpit-core-label">
                  SISTEMA
                  <br />
                  LEXOR
                </div>
                <div className="cockpit-core-meta">● ATIVO</div>
              </div>

              {cockpitNodes.map((node) => (
                <div
                  key={node.key}
                  className={`cockpit-node ${activeNodes.has(node.key) ? "active" : ""}`}
                  data-cursor="Módulo do sistema"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>

          <div className="system-chapters-wrap">
            <span className="system-chapters-rail" aria-hidden="true">
              <span />
            </span>
            <ol className="system-chapters" aria-label="Fluxo do Sistema Lexor">
              {systemChapters.map((chapter, index) => (
                <li
                  key={chapter.label}
                  className={`system-chapter ${index === activeIndex ? "is-active" : ""} ${
                    index < activeIndex ? "is-past" : ""
                  }`}
                >
                  <span>{chapter.label}</span>
                  <strong>{chapter.title}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="site-container">
        <p className="system-phrase reveal">
          Cinco agentes. Uma operação.{" "}
          <span>Trabalhando enquanto você dorme.</span>
        </p>
      </div>
    </section>
  );
}

function ModulesSection({
  onCardMove,
  onCardLeave,
}: {
  onCardMove: (event: ReactMouseEvent<HTMLElement>) => void;
  onCardLeave: (event: ReactMouseEvent<HTMLElement>) => void;
}) {
  return (
    <section id="modulos" className="section-muted modules-section">
      <div className="modules-ambient" aria-hidden="true" />
      <div className="site-container">
        <div className="modules-head">
          <div>
            <div className="section-eyebrow reveal">04 · MÓDULOS</div>
            <h2 className="section-title reveal">
              Cada módulo é
              <br />
              um agente. Cada
              <br />
              agente, um problema
              <br />
              resolvido.
            </h2>
            <p className="section-subtitle modules-copy reveal">
              Você escolhe os agentes que o seu negócio precisa agora. Depois,
              eles se conectam — e a operação passa a rodar sozinha.
            </p>
          </div>

          <div className="modules-console reveal" aria-hidden="true">
            <div className="modules-console-top">
              <span>SISTEMA LEXOR</span>
              <strong>5 camadas conectadas</strong>
            </div>
            <div className="modules-orbit">
              <span className="modules-orbit-core">LEXOR</span>
              {modules.map((module, index) => (
                <span key={module.type} className={`orbit-node orbit-node-${index + 1}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <div className="modules-console-feed">
              {modules.map((module) => (
                <span key={module.signal}>{module.signal}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modules-grid">
          {modules.map((module, index) => (
            <article
              key={module.eyebrow}
              className="module-card ripple-target reveal"
              data-cursor="Explorar módulo"
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              style={{ transitionDelay: `${index * 90}ms` } as CSSProperties}
            >
              <div className="module-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="module-copy">
                <div className="module-num">{module.eyebrow}</div>
                <h3 className="module-title">{module.title}</h3>
                <p className="module-desc">{module.desc}</p>
                <div className="module-signals" aria-label="Sinais do módulo">
                  <span>{module.signal}</span>
                  <span>{module.metric}</span>
                </div>
              </div>
              <div className="module-visual" aria-hidden="true">
                <div className="module-visual-top">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="module-mockup">
                  <ModuleMockup type={module.type} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({
  onCardMove,
  onCardLeave,
}: {
  onCardMove: (event: ReactMouseEvent<HTMLElement>) => void;
  onCardLeave: (event: ReactMouseEvent<HTMLElement>) => void;
}) {
  const renderProjectCard = (project: (typeof projects)[number], isDuplicate = false) => {
    const signal = projectSignals[project.type];

    return (
      <article
        key={`${isDuplicate ? "loop" : "main"}-${project.num}`}
        className="project-card ripple-target"
        data-cursor="Sistema em movimento"
        aria-hidden={isDuplicate ? true : undefined}
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
      >
        <div className="project-mockup" aria-hidden="true">
          <ProjectMockup type={project.type} />
          <div className="project-hud">
            <span>{signal.primary}</span>
            <strong>{signal.secondary}</strong>
          </div>
          <div className="project-scanline" />
        </div>
        <div className="project-info">
          <div className="project-num">{project.num}</div>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-desc">{project.desc}</p>
          <p className="project-result">↳ {project.result}</p>
          <div className="project-tags">
            {project.ownSystem && (
              <span className="project-tag project-tag-own">Sistema Próprio</span>
            )}
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="projetos">
      <div className="site-container">
        <div className="section-eyebrow reveal">05 · PROJETOS</div>
        <h2 className="section-title reveal">
          Projetos
          <br />
          em movimento
        </h2>
        <p className="section-subtitle reveal">
          Entramos quando a empresa já tem demanda, mas precisa de estrutura
          para crescer melhor.
        </p>
      </div>

      <div className="projects-viewport reveal" aria-label="Projetos Lexor">
        <div className="projects-track">
          <div className="projects-sequence">{projects.map((project) => renderProjectCard(project))}</div>
          <div className="projects-sequence projects-sequence-duplicate" aria-hidden="true">
            {projects.map((project) => renderProjectCard(project, true))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentsSection() {
  return (
    <section id="agentes" className="agents-section section-muted">
      <div className="site-container">
        <div className="section-eyebrow reveal">03.5 · TIMES DE AGENTES</div>
        <h2 className="section-title reveal">
          Você não precisa
          <br />
          contratar mais pessoas.
          <br />
          Precisa dos agentes certos.
        </h2>
        <p className="section-subtitle reveal">
          A Lexor constrói times de agentes de IA especializados no seu
          negócio — configurados para o seu produto, seu cliente e seu processo
          de venda.
        </p>

        <div className="agents-table reveal" role="table" aria-label="Comparativo time humano vs agentes Lexor">
          <div className="agents-table-head" role="row">
            <div role="columnheader" className="agents-col-human">TIME HUMANO</div>
            <div role="columnheader" className="agents-col-agent">TIME DE AGENTES LEXOR</div>
          </div>
          {agentRows.map((row) => (
            <div key={row.human} className="agents-table-row" role="row">
              <div role="cell" className="agents-col-human">{row.human}</div>
              <div role="cell" className="agents-col-agent">
                <span className="agents-check">✓</span> {row.agent}
              </div>
            </div>
          ))}
        </div>

        <div className="agents-cta reveal">
          <a href="#mapa" className="btn-primary ripple-target">
            Ver como funciona um time de agentes →
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const [counts, setCounts] = useState({ a: 0, b: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const dur = 1600;
          const start = performance.now();
          const tick = () => {
            const t = Math.min((performance.now() - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCounts({ a: Math.round(eased * 6), b: Math.round(eased * 5) });
            if (t < 1) window.requestAnimationFrame(tick);
          };
          window.requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="stats-strip" aria-label="Números Lexor">
      <div className="site-container stats-inner">
        <div className="stats-item">
          <span className="stats-num">{counts.a}+</span>
          <span className="stats-label">projetos com sistemas próprios</span>
        </div>
        <span className="stats-sep" aria-hidden="true">·</span>
        <div className="stats-item">
          <span className="stats-num">{counts.b}</span>
          <span className="stats-label">tipos de agentes de IA</span>
        </div>
        <span className="stats-sep" aria-hidden="true">·</span>
        <div className="stats-item">
          <span className="stats-num">24h</span>
          <span className="stats-label">operação sem depender de você</span>
        </div>
      </div>
    </div>
  );
}

function MethodSection({ activeIndex, progress }: { activeIndex: number; progress: number }) {
  return (
    <section id="metodo" className="section-muted">
      <div className="site-container">
        <div className="section-eyebrow reveal">06 · MÉTODO</div>
        <h2 className="section-title reveal">Método Lexor</h2>
        <p className="section-subtitle reveal">Do diagnóstico à operação rodando.</p>

        <div className="method-grid reveal">
          <div className="method-line" />
          <div className="method-line-progress" style={{ width: `${progress * 100}%` }} />

          {methodSteps.map((step, index) => (
            <div
              key={step.num}
              className={`method-step ${index <= activeIndex ? "active" : ""}`}
            >
              <div className="method-dot" />
              <div className="method-num">{step.num}</div>
              <h3 className="method-title">{step.title}</h3>
              <p className="method-desc">{step.desc}</p>
              <p className="method-detail">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualificationSection() {
  return (
    <section id="qualificacao">
      <div className="site-container">
        <div className="section-eyebrow reveal">07 · QUALIFICAÇÃO</div>
        <h2 className="section-title reveal">
          Construído para empresas
          <br />
          que já estão em movimento.
        </h2>

        <div className="qual-grid">
          <QualificationColumn title="A Lexor é para empresas que:" items={forItems} mark="✓" />
          <QualificationColumn
            title="A Lexor não é para quem procura apenas:"
            items={notForItems}
            mark="×"
            muted
          />
        </div>

        <div className="qual-closing reveal">
          Quem quer uma ferramenta solta tem mil opções.
          <br />
          Quem quer um time de agentes de IA operando pela sua empresa —
          esse é o nosso trabalho.
          <br />
          E o momento certo é agora: cada mês de espera é um mês em que o
          concorrente está treinando os agentes que você não tem.
        </div>
      </div>
    </section>
  );
}

function QualificationColumn({
  title,
  items,
  mark,
  muted = false,
}: {
  title: string;
  items: string[];
  mark: string;
  muted?: boolean;
}) {
  return (
    <div className="qual-col reveal">
      <h3>{title}</h3>
      <ul className={`qual-list ${muted ? "no" : ""}`}>
        {items.map((item) => (
          <li key={item}>
            <span className={muted ? "x" : "check"}>{mark}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MapSection({
  onSubmit,
  submitted,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitted: boolean;
}) {
  return (
    <section id="mapa" className="mapa-section">
      <div className="site-container">
        <div className="section-eyebrow reveal">08 · DIAGNÓSTICO</div>
        <h2 className="section-title reveal">
          O próximo crescimento
          <br />
          da sua empresa
          <br />
          começa com um mapa.
          <br />
          <span>Não com achismo.</span>
        </h2>
        <p className="section-subtitle reveal">
          Em uma sessão estratégica, identificamos exatamente onde sua operação
          perde leads e tempo. Depois, desenhamos o time de agentes ideal para
          o seu negócio.
        </p>

        <div className="mapa-grid">
          <div className="reveal">
            <h3 className="deliverables-kicker">O QUE VOCÊ RECEBE</h3>
            {deliverables.map((item) => (
              <div className="deliverable" key={item.title}>
                <div className="deliverable-icon">
                  <DeliverableIcon type={item.icon} />
                </div>
                <div>
                  <div className="deliverable-title">{item.title}</div>
                  <div className="deliverable-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="form-card reveal" onSubmit={onSubmit}>
            {!submitted ? (
              <>
                <FormField label="Nome" id="nome" name="nome" required />
                <FormField label="Empresa" id="empresa" name="empresa" required />
                <FormField label="WhatsApp" id="whatsapp" name="whatsapp" type="tel" required />
                <FormField label="Principal Desafio" id="desafio" name="desafio" options={challengeOptions} required />
                <button type="submit" className="form-submit ripple-target">
                  Quero meu Mapa de Crescimento →
                </button>
                <div className="form-note">
                  Diagnóstico gratuito · Feito para empresas em operação · Sem pitch de produtos
                </div>
              </>
            ) : (
              <div className="form-success">
                <div className="form-success-title">Mapa em construção.</div>
                <div className="form-success-desc">
                  Abrimos o WhatsApp com sua mensagem. Se a nova aba não abrir,
                  libere pop-ups para este site.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required,
  options,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={`form-field-wrap ${focused ? "is-focused" : ""} ${value ? "has-value" : ""}`}>
      <label className="form-label-float" htmlFor={id}>{label}</label>
      {options ? (
        <select
          className="form-select"
          id={id}
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
          value={value}
        >
          <option value="" />
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          className="form-input"
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
      )}
      <span className="field-check" aria-hidden="true">✓</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <h2 className="footer-logo">LEXOR</h2>
        <p className="footer-tagline">
          Devolvemos seu tempo. Montamos o time digital que trabalha por você.
        </p>

        <div className="footer-grid">
          <FooterColumn
            title="SISTEMA"
            links={[
                ["Sistema Lexor™", "#sistema"],
                ["Módulos", "#modulos"],
                ["Método", "#metodo"],
                ["Diagnóstico", "#mapa"],
            ]}
          />
          <FooterColumn
            title="PROJETOS"
            links={[
              ["ID Transportes", "#projetos"],
              ["Focus Club", "#projetos"],
              ["Kumon", "#projetos"],
              ["Lexy Tools", "#projetos"],
            ]}
          />
          <FooterColumn
            title="CONTATO"
            links={[
              ["contato@lexor.com.br", "mailto:contato@lexor.com.br"],
              ["Brasil", "#hero"],
            ]}
          />
          <FooterColumn
            title="SOCIAL"
            links={[
              ["Instagram", "#hero"],
              ["LinkedIn", "#hero"],
              ["YouTube", "#hero"],
            ]}
          />
        </div>

        <a href="#mapa" className="btn-primary footer-whatsapp ripple-target">
          Falar no WhatsApp →
        </a>

        <div className="footer-base">
          <span>© LEXOR 2026 · SISTEMAS DE CRESCIMENTO</span>
          <span>CONSTRUÍDO NO BRASIL</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      <ul>
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ModuleMockup({ type }: { type: string }) {
  if (type === "growth") {
    return (
      <svg viewBox="0 0 360 196" preserveAspectRatio="none">
        <rect width="360" height="196" fill="#0F0F0F" />
        <MiniGrid />
        <path className="route-shadow" d="M28,148 C86,138 104,108 150,104 C206,98 226,58 318,42" />
        <path className="route-line" d="M28,148 C86,138 104,108 150,104 C206,98 226,58 318,42" />
        <path d="M28,148 C86,138 104,108 150,104 C206,98 226,58 318,42 L318,176 L28,176 Z" fill="#C6F432" opacity="0.08" />
        {[46, 98, 150, 204, 258].map((x, index) => (
          <rect key={x} x={x} y={136 - index * 18} width="22" height={40 + index * 18} rx="3" fill={index === 4 ? "#C6F432" : "#1F1F1F"} opacity={index === 4 ? "0.8" : "1"} />
        ))}
        <HudBox x={24} y={24} text="CAC OK" />
        <circle className="pulse-dot" cx="318" cy="42" r="6" fill="#C6F432" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg viewBox="0 0 360 196" preserveAspectRatio="none">
        <rect width="360" height="196" fill="#0F0F0F" />
        <MiniGrid />
        <path d="M230 44 C270 50 294 70 318 96" stroke="#2A2A2A" strokeWidth="1" fill="none" strokeDasharray="4 7" />
        <ChatBubble x={28} y={30} w={180} />
        <ChatBubble x={134} y={84} w={198} accent />
        <ChatBubble x={28} y={138} w={146} />
        <rect x="214" y="142" width="78" height="28" rx="14" fill="#C6F432" opacity="0.16" />
        <circle className="typing-dot" cx="238" cy="156" r="3" fill="#C6F432" />
        <circle className="typing-dot delay-1" cx="254" cy="156" r="3" fill="#C6F432" />
        <circle className="typing-dot delay-2" cx="270" cy="156" r="3" fill="#C6F432" />
        <HudBox x={210} y={28} text="IA ONLINE" />
      </svg>
    );
  }

  if (type === "ops") {
    return (
      <svg viewBox="0 0 360 196" preserveAspectRatio="none">
        <rect width="360" height="196" fill="#0F0F0F" />
        <MiniGrid />
        <path className="route-line" d="M64,70 H154 C184,70 176,126 208,126 H296" />
        {[30, 132, 234].map((x, index) => (
          <rect
            key={x}
            x={x}
            y={index === 1 ? "46" : "102"}
            width="86"
            height="54"
            rx="4"
            fill={index === 2 ? "#C6F432" : "#161616"}
            opacity={index === 2 ? "0.16" : "1"}
            stroke={index === 2 ? "#C6F432" : "#2A2A2A"}
          />
        ))}
        {[52, 154, 256].map((x, index) => (
          <g key={x}>
            <rect x={x} y={index === 1 ? "66" : "122"} width="40" height="5" rx="2.5" fill={index === 2 ? "#C6F432" : "#888"} />
            <rect x={x} y={index === 1 ? "80" : "136"} width="52" height="4" rx="2" fill="#555" />
          </g>
        ))}
        <circle className="pulse-dot" cx="296" cy="126" r="6" fill="#C6F432" />
        <HudBox x={28} y={24} text="CRM SYNC" />
      </svg>
    );
  }

  if (type === "site") {
    return (
      <svg viewBox="0 0 360 196" preserveAspectRatio="none">
        <rect width="360" height="196" fill="#0F0F0F" />
        <MiniGrid />
        <rect x="28" y="26" width="304" height="142" rx="6" fill="#161616" stroke="#2A2A2A" />
        <rect x="28" y="26" width="304" height="24" rx="6" fill="#101010" stroke="#2A2A2A" />
        <circle cx="44" cy="38" r="3" fill="#C6F432" />
        <circle cx="58" cy="38" r="3" fill="#555" />
        <circle cx="72" cy="38" r="3" fill="#555" />
        <rect x="48" y="76" width="144" height="10" rx="5" fill="#C6F432" />
        <rect x="48" y="98" width="116" height="5" rx="2.5" fill="#888" />
        <rect x="48" y="114" width="154" height="5" rx="2.5" fill="#555" />
        <rect x="48" y="138" width="72" height="18" rx="9" fill="#C6F432" opacity="0.28" />
        <rect x="228" y="72" width="78" height="78" rx="39" fill="#C6F432" opacity="0.08" stroke="#C6F432" />
        <path className="route-line" d="M242 124 C256 94 278 92 294 74" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 196" preserveAspectRatio="none">
      <rect width="360" height="196" fill="#0F0F0F" />
      <MiniGrid />
      <circle cx="84" cy="88" r="34" fill="none" stroke="#C6F432" strokeWidth="2" />
      <line x1="108" y1="112" x2="136" y2="140" stroke="#C6F432" strokeWidth="2" />
      <rect x="160" y="54" width="136" height="8" rx="4" fill="#C6F432" />
      <rect x="160" y="78" width="164" height="5" rx="2.5" fill="#888" />
      <rect x="160" y="96" width="126" height="5" rx="2.5" fill="#555" />
      <rect x="160" y="126" width="116" height="28" rx="4" fill="#C6F432" opacity="0.16" stroke="#C6F432" />
      <path className="route-line" d="M84 88 C142 44 218 42 296 62" />
      <circle className="pulse-dot" cx="296" cy="62" r="6" fill="#C6F432" />
      <HudBox x={214} y={138} text="RANKING" muted />
    </svg>
  );
}

function MiniGrid() {
  return (
    <g stroke="#1F1F1F" strokeWidth="1">
      {[49, 98, 147].map((y) => (
        <line key={`module-h-${y}`} x1="0" y1={y} x2="360" y2={y} />
      ))}
      {[90, 180, 270].map((x) => (
        <line key={`module-v-${x}`} x1={x} y1="0" x2={x} y2="196" />
      ))}
    </g>
  );
}

function ProjectMockup({ type }: { type: string }) {
  if (type === "logistics") {
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="none">
        <rect width="480" height="280" fill="#0F0F0F" />
        <MapGrid />
        <path className="route-shadow" d="M40,220 Q120,180 200,160 T380,100" />
        <path className="route-line" d="M40,220 Q120,180 200,160 T380,100" />
        <circle cx="40" cy="220" r="6" fill="#C6F432" />
        <circle cx="200" cy="160" r="4" fill="#C6F432" />
        <circle className="pulse-dot" cx="380" cy="100" r="8" fill="#C6F432" />
        <rect x="300" y="28" width="132" height="62" rx="4" fill="#161616" stroke="#2A2A2A" />
        <rect x="314" y="44" width="80" height="5" rx="2.5" fill="#C6F432" />
        <rect x="314" y="60" width="96" height="4" rx="2" fill="#555" />
        <rect x="314" y="73" width="54" height="4" rx="2" fill="#555" />
        <HudBox x={20} y={20} text="● ROTA ATIVA" />
        <HudBox x={360} y={240} text="ETA 14:32" muted />
      </svg>
    );
  }

  if (type === "mobile") {
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="none">
        <rect width="480" height="280" fill="#0F0F0F" />
        <circle cx="240" cy="140" r="112" fill="none" stroke="#1F1F1F" />
        <circle cx="240" cy="140" r="72" fill="none" stroke="#2A2A2A" strokeDasharray="6 8" />
        <rect x="180" y="20" width="120" height="240" rx="14" fill="#161616" stroke="#2A2A2A" strokeWidth="1.5" />
        <rect x="195" y="40" width="90" height="6" rx="3" fill="#C6F432" />
        <rect x="195" y="56" width="60" height="4" rx="2" fill="#2A2A2A" />
        <path d="M195,180 L210,160 L225,170 L240,140 L255,150 L270,120 L285,100" stroke="#C6F432" strokeWidth="2" fill="none" />
        <circle className="pulse-dot" cx="270" cy="120" r="4" fill="#C6F432" />
        <rect x="195" y="200" width="90" height="40" rx="4" fill="#1A1A1A" />
        <rect x="200" y="208" width="40" height="4" rx="2" fill="#888" />
        <rect x="200" y="220" width="60" height="4" rx="2" fill="#555" />
        <rect x="200" y="230" width="50" height="4" rx="2" fill="#555" />
        <HudBox x={42} y={58} text="TREINO ON" />
        <HudBox x={330} y={196} text="JORNADA" muted />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="none">
        <rect width="480" height="280" fill="#0F0F0F" />
        <path d="M224 68 C292 82 322 90 360 105" stroke="#2A2A2A" strokeWidth="1" fill="none" strokeDasharray="4 6" />
        <path d="M206 176 C286 184 330 194 270 228" stroke="#C6F432" strokeWidth="1.2" fill="none" strokeDasharray="4 7" opacity="0.65" />
        <ChatBubble x={40} y={40} w={200} />
        <ChatBubble x={240} y={100} w={200} accent />
        <ChatBubble x={40} y={160} w={180} />
        <rect x="240" y="220" width="60" height="20" rx="10" fill="#C6F432" opacity="0.18" />
        <circle className="typing-dot" cx="252" cy="230" r="2" fill="#C6F432" />
        <circle className="typing-dot delay-1" cx="262" cy="230" r="2" fill="#C6F432" />
        <circle className="typing-dot delay-2" cx="272" cy="230" r="2" fill="#C6F432" />
        <HudBox x={304} y={38} text="CRM SYNC" />
      </svg>
    );
  }

  if (type === "funnel") {
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="none">
        <rect width="480" height="280" fill="#0F0F0F" />
        <path d="M240 30 L120 190 H360 Z" fill="none" stroke="#1F1F1F" />
        <rect x="60" y="30" width="360" height="40" rx="4" fill="#161616" />
        <rect x="76" y="44" width="200" height="6" rx="3" fill="#C6F432" />
        <rect x="76" y="56" width="120" height="4" rx="2" fill="#555" />
        <rect x="60" y="90" width="170" height="80" rx="4" fill="#161616" />
        <rect x="240" y="90" width="180" height="80" rx="4" fill="#161616" />
        <path className="route-line" d="M145 170 C168 198 194 204 240 215 C286 204 316 198 332 170" />
        <rect x="60" y="190" width="360" height="50" rx="25" fill="#C6F432" opacity="0.2" />
        <rect x="180" y="208" width="120" height="14" rx="7" fill="#C6F432" />
        <circle className="pulse-dot" cx="240" cy="215" r="5" fill="#C6F432" />
      </svg>
    );
  }

  if (type === "saas") {
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="none">
        <rect width="480" height="280" fill="#0F0F0F" />
        <MapGrid />
        <rect x="20" y="20" width="80" height="240" rx="4" fill="#161616" />
        {[50, 80, 110].map((y, index) => (
          <g key={y}>
            <circle cx="40" cy={y} r="6" fill={index === 0 ? "#C6F432" : "#2A2A2A"} />
            <rect x="52" y={y - 4} width="40" height="4" rx="2" fill={index === 0 ? "#888" : "#555"} />
          </g>
        ))}
        <rect x="120" y="20" width="340" height="60" rx="4" fill="#161616" />
        <rect x="136" y="36" width="120" height="6" rx="3" fill="#C6F432" />
        <rect x="136" y="50" width="200" height="4" rx="2" fill="#555" />
        <rect x="120" y="100" width="160" height="160" rx="4" fill="#161616" />
        <rect x="300" y="100" width="160" height="160" rx="4" fill="#C6F432" opacity="0.06" stroke="#C6F432" strokeWidth="1" />
        <rect x="320" y="120" width="60" height="6" rx="3" fill="#C6F432" />
        <rect x="320" y="140" width="120" height="4" rx="2" fill="#888" />
        <path className="route-line" d="M194 182 C244 150 276 150 326 182" />
        <circle className="pulse-dot" cx="326" cy="182" r="5" fill="#C6F432" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 480 280" preserveAspectRatio="none">
      <rect width="480" height="280" fill="#0F0F0F" />
      <path d="M220 78 C268 82 270 118 240 150 C220 174 258 196 310 218" stroke="#2A2A2A" strokeWidth="1" fill="none" strokeDasharray="4 6" />
      <rect x="40" y="30" width="180" height="220" rx="4" fill="#161616" />
      <rect x="56" y="50" width="80" height="6" rx="3" fill="#C6F432" />
      {[80, 130, 180].map((y, index) => (
        <rect
          key={y}
          x="56"
          y={y}
          width="148"
          height="40"
          rx="4"
          fill={index === 2 ? "#C6F432" : "#1A1A1A"}
          opacity={index === 2 ? "0.18" : "1"}
        />
      ))}
      <rect x="240" y="30" width="200" height="160" rx="4" fill="#161616" />
      <rect x="256" y="50" width="60" height="4" rx="2" fill="#888" />
      <rect x="256" y="70" width="160" height="3" rx="1" fill="#2A2A2A" />
      <rect x="256" y="84" width="120" height="3" rx="1" fill="#2A2A2A" />
      <rect x="256" y="98" width="140" height="3" rx="1" fill="#2A2A2A" />
      <line x1="256" y1="120" x2="424" y2="120" stroke="#2A2A2A" />
      <rect x="256" y="134" width="80" height="6" rx="3" fill="#C6F432" />
      <rect x="240" y="210" width="200" height="40" rx="20" fill="#C6F432" opacity="0.2" />
      <rect x="310" y="224" width="60" height="12" rx="6" fill="#C6F432" />
      <circle className="pulse-dot" cx="310" cy="230" r="5" fill="#C6F432" />
    </svg>
  );
}

function MapGrid() {
  return (
    <g stroke="#1F1F1F" strokeWidth="1">
      {[60, 120, 180, 240].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="480" y2={y} />
      ))}
      {[120, 240, 360].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="280" />
      ))}
    </g>
  );
}

function HudBox({ x, y, text, muted = false }: { x: number; y: number; text: string; muted?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width="112" height="24" fill="#161616" stroke="#2A2A2A" />
      <text x={x + 12} y={y + 16} fill={muted ? "#888" : "#C6F432"} fontFamily="monospace" fontSize="10">
        {text}
      </text>
    </g>
  );
}

function ChatBubble({ x, y, w, accent = false }: { x: number; y: number; w: number; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="32" rx="16" fill={accent ? "#C6F432" : "#161616"} opacity={accent ? "0.18" : "1"} />
      <rect x={x + 12} y={y + 10} width={Math.min(140, w - 52)} height="4" rx="2" fill={accent ? "#C6F432" : "#888"} />
      <rect x={x + 12} y={y + 20} width={Math.min(100, w - 72)} height="4" rx="2" fill={accent ? "#C6F432" : "#555"} opacity={accent ? "0.6" : "1"} />
    </g>
  );
}

function DeliverableIcon({ type }: { type: string }) {
  if (type === "box") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" />
        <path d="m4 7 8 5 8-5" />
        <path d="M12 12v10" />
      </svg>
    );
  }

  if (type === "bolt") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="m13 2-10 12h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    );
  }

  if (type === "lines") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M3 6h18" />
        <path d="M3 12h12" />
        <path d="M3 18h6" />
      </svg>
    );
  }

  if (type === "grid") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M3 3h7v7H3z" />
        <path d="M14 3h7v7h-7z" />
        <path d="M14 14h7v7h-7z" />
        <path d="M3 14h7v7H3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
