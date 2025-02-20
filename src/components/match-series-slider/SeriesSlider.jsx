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
          {/* Tournament Images */}
          <div className="marquee-item">
            <img src="https://www.shutterstock.com/image-vector/cricket-tournament-banner-background-vector-260nw-240106933.jpg" alt="cricket" />
          </div>
          <div className="marquee-item">
            <img src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-football-tournament-emblem-template-picture-image_7906955.png" alt="UEFA Champions League" />
          </div>
          <div className="marquee-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQBBP-FnDmNByZWM6jL2ISizkIuJea5yQVA&s" alt="ICC Cricket World Cup" />
          </div>
          <div className="marquee-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFyPa6sCCs5LZs5ziunWBIdu7QDR-kNZiIMhsvHWsujxiX4v53fa4icrNDypdvqeUpQxs&usqp=CAU" alt="NBA" />
          </div>
          <div className="marquee-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn7mQLShuWq6K9SZTshDc1esDaj4dEsbzR_l4MPz6METIUbeCq11mhoqlxgB6tYtk3Bo&usqp=CAU" alt="Wimbledon" />
          </div>

          {/* Duplicate slides for smooth looping */}
          <div className="marquee-item">
            <img src="https://www.shutterstock.com/image-vector/cricket-tournament-banner-background-vector-260nw-240106933.jpg" alt="cricket" />
          </div>
          <div className="marquee-item">
            <img src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-football-tournament-emblem-template-picture-image_7906955.png" alt="UEFA Champions League" />
          </div>
          <div className="marquee-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQBBP-FnDmNByZWM6jL2ISizkIuJea5yQVA&s" alt="ICC Cricket World Cup" />
          </div>
          <div className="marquee-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFyPa6sCCs5LZs5ziunWBIdu7QDR-kNZiIMhsvHWsujxiX4v53fa4icrNDypdvqeUpQxs&usqp=CAU" alt="NBA" />
          </div>
          <div className="marquee-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn7mQLShuWq6K9SZTshDc1esDaj4dEsbzR_l4MPz6METIUbeCq11mhoqlxgB6tYtk3Bo&usqp=CAU" alt="Wimbledon" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SlideShow;
