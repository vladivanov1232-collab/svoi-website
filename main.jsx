import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Menu, X, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 42, opacity: 0, duration: 1, stagger: 0.14, ease: "power3.out"
      });
      gsap.from(".hero-mark", {
        scale: 0.92, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2
      });

      const video = videoRef.current;
      if (video) {
        const updateVideo = () => {
          if (!video.duration || !Number.isFinite(video.duration)) return;
          const progress = ScrollTrigger.getById("run-sequence")?.progress ?? 0;
          const target = progress * video.duration;
          if (Math.abs(video.currentTime - target) > 0.04) video.currentTime = target;
        };

        ScrollTrigger.create({
          id: "run-sequence",
          trigger: ".run-section",
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            if (video.duration && Number.isFinite(video.duration)) {
              const target = self.progress * video.duration;
              if (Math.abs(video.currentTime - target) > 0.035) {
                video.currentTime = target;
              }
            }
            gsap.to(".run-overlay", {
              opacity: 1 - self.progress * 0.75,
              duration: 0.15,
              overwrite: true
            });
          }
        });
        video.addEventListener("loadedmetadata", () => setVideoReady(true));
        video.addEventListener("loadedmetadata", updateVideo);
      }

      gsap.to(".city-word", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.from(".collection-content", {
        y: 70, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ".collection", start: "top 72%" }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={heroRef}>
      <header className="nav">
        <a className="wordmark" href="#top" aria-label="SVOI home">SVOI<span>®</span></a>
        <nav className="desktop-links">
          <a href="#story">ИСТОРИЯ</a>
          <a href="#collection">КОЛЛЕКЦИЯ</a>
          <a href="#community">КОМЬЮНИТИ</a>
        </nav>
        <a className="nav-shop" href="#collection">SHOP <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">
          {menuOpen ? <X/> : <Menu/>}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#story" onClick={closeMenu}>ИСТОРИЯ</a>
          <a href="#collection" onClick={closeMenu}>КОЛЛЕКЦИЯ</a>
          <a href="#community" onClick={closeMenu}>КОМЬЮНИТИ</a>
          <a href="https://instagram.com/SVOI.action" target="_blank" rel="noreferrer" onClick={closeMenu}>INSTAGRAM ↗</a>
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true">
          <div className="hero-grain"/>
          <div className="hero-light"/>
          <div className="hero-street-lines"/>
        </div>
        <div className="hero-topline"><span>INDEPENDENT ACTIVEWEAR</span><span>EST. SVOI COMMUNITY</span></div>
        <div className="hero-copy">
          <p className="eyebrow">НЕ ЖДИ МОМЕНТА. СОЗДАЙ ЕГО.</p>
          <h1>ДЕЙСТВУЙ.<br/><em>ЖИВИ.</em></h1>
          <p className="hero-sub">Одежда для тех, кто не стоит на месте.<br/>Streetwear. Sportswear. Your movement.</p>
          <a href="#story" className="round-link"><ArrowDown size={19}/><span>SCROLL TO MOVE</span></a>
        </div>
        <div className="hero-mark">S<span>/</span>V</div>
        <div className="hero-bottom"><span>МОСКВА / ВЕЗДЕ</span><span>01 — 04</span></div>
      </section>

      <section className="run-section" id="story">
        <div className="run-fallback">
          <div className="run-grid"/>
          <div className="run-street-glow"/>
          <div className="runner-placeholder" aria-hidden="true">
            <div className="runner-head"/><div className="runner-body"/>
            <div className="runner-arm arm-one"/><div className="runner-arm arm-two"/>
            <div className="runner-leg leg-one"/><div className="runner-leg leg-two"/>
          </div>
          <video
            ref={videoRef}
            className={`run-video ${videoReady ? "is-ready" : ""}`}
            src="/runner-sequence.mp4"
            muted
            playsInline
            preload="auto"
            aria-label="Кинематографичная последовательность бега спортсмена"
          />
        </div>
        <div className="run-overlay">
          <div className="run-caption">
            <span className="eyebrow">02 / KEEP MOVING</span>
            <h2>ТВОЙ ГОРОД.<br/><em>ТВОЙ РИТМ.</em></h2>
            <p>Каждый шаг — выбор двигаться дальше.</p>
          </div>
          <div className="scroll-indicator"><span>ЛИСТАЙ ВНИЗ</span><div/></div>
          <span className="run-note">SCROLL CONTROLLED FILM</span>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <p className="eyebrow">SVOI / OUR MINDSET</p>
        <div className="manifesto-line"><span className="city-word">MOVE WITH PURPOSE — MOVE WITH PURPOSE —</span></div>
        <div className="manifesto-bottom">
          <h2>ЭМОЦИИ ДЕЛАЮТ<br/>НАС <em>ЖИВЫМИ.</em></h2>
          <p>Мы верим в движение — на улице, на площадке, на тренировке и за пределами привычного. SVOI создан для тех, кто выбирает действие.</p>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="collection-bg"/>
        <div className="collection-content">
          <p className="eyebrow">03 / THE FIRST DROP</p>
          <h2>ГОТОВ<br/>ДЕЙСТВОВАТЬ?</h2>
          <p>Одежда, которая движется вместе с тобой.</p>
          <a href="mailto:hello@svoi.example" className="button-link">СМОТРЕТЬ КОЛЛЕКЦИЮ <ArrowUpRight size={18}/></a>
          <span className="collection-index">SVOI — CLOTHING FOR THOSE WHO ACT.</span>
        </div>
      </section>

      <section className="community" id="community">
        <div>
          <p className="eyebrow">04 / BE ONE OF SVOI</p>
          <h2>ОДИН РИТМ.<br/><em>РАЗНЫЕ МАРШРУТЫ.</em></h2>
        </div>
        <div className="community-bottom">
          <p>Тренируйся. Исследуй. Создавай своё движение вместе с нами.</p>
          <a href="https://instagram.com/SVOI.action" target="_blank" rel="noreferrer">SVOI.ACTION <ArrowUpRight size={17}/></a>
        </div>
      </section>

      <footer className="footer">
        <a className="footer-logo" href="#top">SVOI<span>®</span></a>
        <span>CLOTHING FOR THOSE WHO ACT.</span>
        <a href="https://instagram.com/SVOI.action" target="_blank" rel="noreferrer"><Instagram size={17}/> INSTAGRAM</a>
        <span>© SVOI 2026</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
