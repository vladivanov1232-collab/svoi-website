
import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ShoppingBag,
  Camera,
  Send
} from 'lucide-react';

const products = [
  {
    number: '01',
    category: 'WHITE COLLECTION',
    name: 'SVOI WHITE TEE',
    color: 'WHITE',
    price: '1 990 ₽',
    front: '/images/white-tee-front.jpg',
    back: '/images/white-tee-back.jpg',
    description: 'Белая футболка свободного кроя',
    photos: [
      '/images/white-tee-front.jpg',
      '/images/white-tee-back.jpg'
    ]
  },
  {
    number: '02',
    category: 'BLACK COLLECTION',
    name: 'SVOI BLACK TEE',
    color: 'BLACK',
    price: '1 990 ₽',
    front: '/images/black-tee-front.jpg',
    back: '/images/black-tee-back.jpg',
    description: 'Чёрная футболка свободного кроя',
    photos: [
      '/images/black-tee-front.jpg',
      '/images/black-tee-back.jpg'
    ]
  }
];

export default function App() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

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

  useEffect(() => {
    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
      }

      if (event.key === 'ArrowRight') {
        setActivePhoto((current) =>
          (current + 1) % selectedProduct.photos.length
        );
      }

      if (event.key === 'ArrowLeft') {
        setActivePhoto((current) =>
          (current - 1 + selectedProduct.photos.length) %
          selectedProduct.photos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  const jump = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const openProduct = (product) => {
    setActivePhoto(0);
    setTouchStart(null);
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setActivePhoto(0);
    setTouchStart(null);
  };

  const nextPhoto = () => {
    if (!selectedProduct) return;

    setActivePhoto((current) =>
      (current + 1) % selectedProduct.photos.length
    );
  };

  const previousPhoto = () => {
    if (!selectedProduct) return;

    setActivePhoto((current) =>
      (current - 1 + selectedProduct.photos.length) %
      selectedProduct.photos.length
    );
  };

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const difference =
      touchStart - event.changedTouches[0].clientX;

    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        nextPhoto();
      } else {
        previousPhoto();
      }
    }

    setTouchStart(null);
  };

  // Уменьшено смещение видео при прокрутке
  const heroShift = Math.min(scrollY * 0.05, 45);
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
            aria-label="Каталог"
          >
            <ShoppingBag />
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
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

      {/* HERO */}

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
              preload="auto"
            >
              <source
                src="/SVOI_runner_cinematic_v2.mp4.MP4"
                type="video/mp4"
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
            <span className="scroll-mouse"><i /></span>
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

      {/* STORY */}

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

      {/* CAMPAIGN */}

      <section className="campaign">
        <div className="campaign-heading">
          <p className="eyebrow">SVOI / THE PEOPLE</p>

          <h2>
            ОДНИ <em>ЦЕННОСТИ.</em><br />
            ОДНО ДВИЖЕНИЕ.
          </h2>
        </div>

        <div className="campaign-image">
          <img
            src="/images/svoi-campaign-collage.jpg"
            alt="SVOI streetwear campaign"
            loading="lazy"
          />

          <span className="campaign-caption">
            STREET ACTION COMMUNITY — SVOI
          </span>
        </div>
      </section>

      {/* COLLECTION */}

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
            STREET ACTION<br />
            COMMUNITY
          </span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article
              className="product-card product-card-clickable"
              key={product.number}
            >
              <button
                type="button"
                className="product-card-trigger"
                onClick={() => openProduct(product)}
                aria-label={`Открыть ${product.name}`}
              >
                <div className="product-art">
                  <img
                    src={product.front}
                    alt={`${product.name} front`}
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

                <div className="product-description">
                  {product.description}
                </div>

                <div className="product-specs">
                  <span>ХЛОПОК</span>
                  <span>230 Г/М²</span>
                  <span>OVERSIZE</span>
                </div>

                <div className="product-buy">
                  <strong>{product.price}</strong>
                  <span>{product.color}</span>
                </div>

                <div className="product-view-hint">
                  СМОТРЕТЬ ТОВАР <ArrowUpRight size={15} />
                </div>
              </button>
            </article>
          ))}
        </div>

        <p className="catalog-note">
          ПЕРВАЯ КОЛЛЕКЦИЯ SVOI
        </p>
      </section>

      {/* PRODUCT GALLERY */}

      {selectedProduct && (
        <div
          className="product-detail-overlay"
          onClick={closeProduct}
        >
          <div
            className="product-detail"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="product-detail-close"
              onClick={closeProduct}
              aria-label="Закрыть товар"
            >
              <X />
            </button>

            <div className="product-detail-header">
              <span>SVOI / PRODUCT</span>
              <span>{selectedProduct.number} — 02</span>
            </div>

            <div
              className="product-gallery"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                key={selectedProduct.photos[activePhoto]}
                src={selectedProduct.photos[activePhoto]}
                alt={`${selectedProduct.name}, фото ${activePhoto + 1}`}
              />

              <button
                type="button"
                className="gallery-arrow gallery-prev"
                onClick={previousPhoto}
                aria-label="Предыдущее фото"
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                className="gallery-arrow gallery-next"
                onClick={nextPhoto}
                aria-label="Следующее фото"
              >
                <ChevronRight />
              </button>

              <span className="gallery-counter">
                0{activePhoto + 1} / 0{selectedProduct.photos.length}
              </span>
            </div>

            <div className="gallery-dots">
              {selectedProduct.photos.map((photo, index) => (
                <button
                  type="button"
                  key={photo}
                  className={activePhoto === index ? 'active' : ''}
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Фото ${index + 1}`}
                />
              ))}
            </div>

            <div className="product-detail-info">
              <p>{selectedProduct.category}</p>
              <h2>{selectedProduct.name}</h2>

              <div className="product-detail-price">
                {selectedProduct.price}
              </div>

              <p className="product-detail-description">
                {selectedProduct.description}
              </p>

              <div className="product-detail-specs">
                <span>100% ХЛОПОК</span>
                <span>230 Г/М²</span>
                <span>OVERSIZE FIT</span>
              </div>

              <div className="product-gallery-caption">
                <ArrowLeft size={15} />
                ЛИСТАЙ ФОТОГРАФИИ
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNITY */}

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
          <p className="social-heading">JOIN THE MOVEMENT</p>

          <div className="social-links">
            <a
              className="social-link"
              href="https://www.instagram.com/SVOI.action/"
              target="_blank"
              rel="noopener noreferrer"
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
            >
              <Send size={21} />
              <span>TELEGRAM</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="giant-svoi">SVOI</div>
      </section>

      {/* FOOTER */}

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
