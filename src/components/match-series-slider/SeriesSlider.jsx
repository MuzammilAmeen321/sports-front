import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import './seriesSlider.css';
const SlideShow = () => {
  const slidesRef = useRef([]);
  const timerRef = useRef(null);
  const slideDelay = 1.5;
  const slideDuration = 0.3;
  const totalSlides = 10;

  useEffect(() => {
    slidesRef.current.forEach((slide, i) => {
      gsap.set(slide, {
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        xPercent: i * 100,
      });
    });
    restartTimer();
    return () => timerRef.current?.kill();
  }, []);

  const wrap = (value, min, max) => {
    const range = max - min;
    return ((range + ((value - min) % range)) % range) + min;
  };

  const animateSlides = (delta) => {
    gsap.to(slidesRef.current, {
      duration: slideDuration,
      xPercent: (i, target) => {
        return (Math.round(gsap.getProperty(target, "xPercent") / 100) * 100) + delta;
      },
      modifiers: {
        xPercent: (value) => wrap(value, -100, (totalSlides - 1) * 100),
      },
      onComplete: restartTimer,
    });
  };

  const autoPlay = () => {
    animateSlides(-100);
  };

  const restartTimer = () => {
    timerRef.current?.kill();
    timerRef.current = gsap.delayedCall(slideDelay, autoPlay);
  };

  return (
    <main className="container relative w-screen h-screen flex flex-col">
      <div className="marquee">
  <div className="marquee-content">
    <div className="marquee-item">Slide 1</div>
    <div className="marquee-item">Slide 2</div>
    <div className="marquee-item">Slide 3</div>
    <div className="marquee-item">Slide 4</div>
    <div className="marquee-item">Slide 5</div>
    <div className="marquee-item">Slide 1</div>
    <div className="marquee-item">Slide 2</div>
    <div className="marquee-item">Slide 3</div>
    <div className="marquee-item">Slide 4</div>
    <div className="marquee-item">Slide 5</div>
  </div>
</div>
    </main>
  );
};

export default SlideShow;
