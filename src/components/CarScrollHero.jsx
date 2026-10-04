import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAR_IMAGE =
  'https://raw.githubusercontent.com/ParasChaturvedi/car-scroll-animation/main/McLaren%20720S%202022%20top%20view.png';

const headline = 'WELCOME ITZFIZZ';

const stats = [
  { id: 'stat-1', value: '58%', text: 'Increase in pick up point use', tone: 'lime' },
  { id: 'stat-2', value: '23%', text: 'Decrease in customer phone calls', tone: 'blue' },
  { id: 'stat-3', value: '27%', text: 'Increase in pick up point use', tone: 'dark' },
  { id: 'stat-4', value: '40%', text: 'Decrease in customer phone calls', tone: 'orange' },
];

export default function CarScrollHero() {
  const rootRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const title = headlineRef.current;
      const letters = gsap.utils.toArray('.headline-letter');
      const cards = gsap.utils.toArray('.stat-card');

      if (!section || !road || !car || !trail || !title) return;

      gsap.set(letters, { opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 28, scale: 0.96 });
      gsap.set(car, { x: 0 });
      gsap.set(trail, { scaleX: 0, transformOrigin: 'left center' });

      const getEndX = () => {
        const roadWidth = road.getBoundingClientRect().width;
        const carWidth = car.getBoundingClientRect().width;
        return Math.max(0, roadWidth - carWidth);
      };

      const updateReveal = () => {
        const roadRect = road.getBoundingClientRect();
        const carRect = car.getBoundingClientRect();
        const carCenter = carRect.left - roadRect.left + carRect.width * 0.56;

        letters.forEach((letter) => {
          const letterRect = letter.getBoundingClientRect();
          const letterCenter = letterRect.left - roadRect.left + letterRect.width / 2;
          gsap.set(letter, { opacity: carCenter >= letterCenter ? 1 : 0 });
        });
      };

      const carTween = gsap.to(car, {
        x: getEndX,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(trail, { scaleX: self.progress });
            gsap.set(progressRef.current, { scaleX: self.progress });
            updateReveal();
          },
          onRefresh: updateReveal,
        },
      });

      const reveals = [0.22, 0.4, 0.58, 0.76];
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: `${Math.round(reveals[index] * 100)}% center`,
            end: `${Math.round((reveals[index] + 0.13) * 100)}% center`,
            scrub: true,
          },
        });
      });

      const onResize = () => {
        ScrollTrigger.refresh();
        updateReveal();
      };

      window.addEventListener('resize', onResize);
      requestAnimationFrame(updateReveal);

      return () => {
        window.removeEventListener('resize', onResize);
        carTween.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="car-story-root">
      <div ref={progressRef} className="top-progress" aria-hidden="true" />

      <section ref={sectionRef} className="car-story-section">
        <div ref={trackRef} className="track">
          <div className="hero-kicker">SCROLL TO DRIVE</div>

          <article className="stat-card stat-1 tone-lime" id="stat-1">
            <strong>58%</strong>
            <span>Increase in pick up point use</span>
          </article>

          <article className="stat-card stat-2 tone-blue" id="stat-2">
            <strong>23%</strong>
            <span>Decrease in customer phone calls</span>
          </article>

          <article className="stat-card stat-3 tone-dark" id="stat-3">
            <strong>27%</strong>
            <span>Increase in pick up point use</span>
          </article>

          <article className="stat-card stat-4 tone-orange" id="stat-4">
            <strong>40%</strong>
            <span>Decrease in customer phone calls</span>
          </article>

          <div ref={roadRef} className="road">
            <div ref={trailRef} className="trail" />

            <div ref={headlineRef} className="headline" aria-label={headline}>
              {headline.split('').map((letter, index) => (
                <span className="headline-letter" key={`${letter}-${index}`}>
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>

            <div ref={carRef} className="car-shell" aria-hidden="true">
              <div className="car-fallback">
                <span className="wheel wheel-a" />
                <span className="wheel wheel-b" />
                <span className="wheel wheel-c" />
                <span className="wheel wheel-d" />
                <span className="windshield" />
              </div>
              <img className="car-image" src={CAR_IMAGE} alt="" draggable="false" />
            </div>
          </div>

          <div className="scroll-hint" aria-hidden="true">
            <span>SCROLL</span>
            <i />
          </div>
        </div>
      </section>
    </section>
  );
}
