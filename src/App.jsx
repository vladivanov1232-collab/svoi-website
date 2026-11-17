
import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  ShoppingBag,
  Camera,
  Send
} from 'lucide-react';

const products = [
  {
    number: '01',
    category: 'EVERYDAY TEE',
    name: 'ФУТБОЛКИ',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
  },
  {
    number: '02',
    category: 'STREET ESSENTIAL',
    name: 'ХУДИ',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85'
  },
  {
    number: '03',
    category: 'ACTIVE WEAR',
    name: 'СПОРТИВНАЯ ОДЕЖДА',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85'
  }
];

export default function App() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrollY(window.scrollY);
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const timer = window.setTimeout(() => setLoaded(true), 100);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearTimeout(timer);
    };
  }, []);

  const jump = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const heroShift = Math.min(scrollY * 0.18, 180);
  const heroScale = 1 + Math.min(scrollY / 5000, 0.12);
  const heroFade = Math.max(0, 1 - scrollY / 850);

  return (
    <main className={`svoi-site ${loaded ? 'is-loaded' : ''}`}>
      <div
        className="progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="header">
        <a className="logo" href="#top">
          SVOI<span>®</span>
        </a>

        <nav className="desktop-nav">
          <button onClick={() => jump('collection')}>КАТАЛОГ</button>
          <button onClick={() => jump('story')}>О БРЕНДЕ</button>
          <button onClick={() => jump('community')}>КОМЬЮНИТИ</button>
        </nav>

        <div className="header-actions">
          <button
            className="bag-button"
            onClick={() => jump('collection')}
            aria-label="Перейти к коллекции"
          >
            <ShoppingBag />
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="menu">
            <button onClick={() => jump('top')}>ГЛАВНАЯ</button>
            <button onClick={() => jump('story')}>О БРЕНДЕ</button>
            <button onClick={() => jump('collection')}>КОЛЛЕКЦИЯ</button>
            <button onClick={() => jump('community')}>КОМЬЮНИТИ</button>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div
          className="hero-scene"
          style={{
            transform: `translate3d(0, ${heroShift}px, 0) scale(${heroScale})`
          }}
        >
          <div className="hero-image">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            >
              <source
                src="/SVOI_runner_cinematic_v2.mov"
                type="video/quicktime"
              />
            </video>
          </div>

          <div className="hero-depth" />
          <div className="hero-light" />
        </div>

        <div className="hero-shade" />

        <div
          className="hero-content"
          style={{ opacity: heroFade }}
        >
          <p className="eyebrow hero-eyebrow">
            MOSCOW / EVERYWHERE — EST. SVOI
          </p>

          <h1 className="hero-title">
            НЕ ЖДИ.<br />
            <em>ДЕЙСТВУЙ.</em>
          </h1>

          <p className="hero-copy">
            Одежда для тех, кто выбирает движение.
          </p>

          <button
            className="hero-cta"
            onClick={() => jump('collection')}
          >
            <span>ПЕРЕЙТИ В КАТАЛОГ</span>
            <ArrowRight />
          </button>
        </div>

        <div className="hero-side-label">
          <span>STREET</span>
          <i />
          <span>ACTION</span>
        </div>

        <div className="hero-bottom">
          <div className="scroll-indicator">
            <span className="scroll-mouse">
              <i />
            </span>
            <span>СКРОЛЛ ВНИЗ</span>
          </div>

          <span className="hero-index">
            01 <i /> 03
          </span>
        </div>

        <div className="hero-coordinate">
          55°45' N&nbsp; 37°37' E
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-heading">
          <p className="eyebrow">02 / THE MOVEMENT</p>
          <p className="story-hint">
            ПРОСТО ВЫЙДИ.<br />
            НАЧНИ ДВИГАТЬСЯ.
          </p>
        </div>

        <div className="story-visual">
          <div
            className="story-photo"
            style={{
              transform: `translateY(${Math.max(-45, -scrollY * 0.035)}px) scale(1.06)`
            }}
          />

          <div className="story-overlay" />

          <div className="story-message">
            <span>NO SPECTATORS</span>
            <h2>
              KEEP<br />
              <em>MOVING.</em>
            </h2>
            <p>НЕ СТОЙ НА МЕСТЕ.</p>
          </div>

          <div className="story-counter">SVOI / 002</div>
          <div className="story-vertical">MOVE WITH PURPOSE</div>
        </div>

        <div className="statement">
          <p className="eyebrow">THIS IS OUR ATTITUDE</p>

          <h2>
            ЭМОЦИИ ДЕЛАЮТ<br />
            НАС <em>ЖИВЫМИ.</em>
          </h2>

          <p>
            Пробуй. Ошибайся. Побеждай.
            Не жди подходящего момента.
            Создавай его сам.
          </p>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="collection-top">
          <div>
            <p className="eyebrow">03 / SVOI COLLECTION</p>
            <h2>
              ОДЕЖДА<br />
              <em>В ДВИЖЕНИИ.</em>
            </h2>
          </div>

          <span className="collection-label">
            STREET ACTION<br />COMMUNITY
          </span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article
              className="product-card"
              key={product.number}
            >
              <div className="product-art">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                <span className="product-number">
                  {product.number}
                </span>

                <span className="product-arrow">
                  <ArrowUpRight />
                </span>
              </div>

              <p>{product.category}</p>
              <h3>{product.name}</h3>
            </article>
          ))}
        </div>

        <p className="catalog-note">
          ПЕРВАЯ КОЛЛЕКЦИЯ SVOI — СКОРО
        </p>
      </section>

      <section className="community" id="community">
        <p className="eyebrow">FIND YOUR PEOPLE</p>

        <h2>
          МЫ НЕ ПРОСТО<br />
          <em>НОСИМ SVOI.</em>
        </h2>

        <p className="community-copy">
          Мы выходим на улицу, встречаемся,
          тренируемся и создаём свои истории.
          Это больше, чем одежда.
        </p>

        <div className="social-block">
          <p className="social-heading">
            JOIN THE MOVEMENT
          </p>

          <div className="social-links">
            <a
              className="social-link"
              href="https://www.instagram.com/SVOI.action/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram SVOI"
            >
              <Camera size={21} />
              <span>INSTAGRAM</span>
              <ArrowUpRight size={17} />
            </a>

            <a
              className="social-link"
              href="https://t.me/svoiaction"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram SVOI"
            >
              <Send size={21} />
              <span>TELEGRAM</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="giant-svoi">SVOI</div>
      </section>

      <footer>
        <a className="logo" href="#top">
          SVOI<span>®</span>
        </a>

        <span>STREET ACTION COMMUNITY</span>

        <div className="footer-socials">
          <a
            href="https://www.instagram.com/SVOI.action/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Camera size={18} />
          </a>

          <a
            href="https://t.me/svoiaction"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <Send size={18} />
          </a>
        </div>

        <span>© 2026 SVOI</span>
      </footer>
    </main>
  );
}
