import {gsap} from "gsap";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FONT_WEIGHTS = {
    subtitle : {min:100, max:400, default:100},
    title : {min:400, max:900, default:400},
};

const renderText = (text,className,baseWeight = 400) => {
    return [...text].map((char,i) => (
        <span
        key={i}
        className={className}
        // Aplica peso de fuente variable usando CSS font-variation-settings
        style={{fontVariationSettings: `'wght' ${baseWeight}`}}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));
};

const setupTextHover = (container, type)=> {
    if(!container) return () => {}; // Return no-op cleanup

    const letters = container.querySelectorAll('span');
    const {min, max, default: base} = FONT_WEIGHTS[type];

    const animatedLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`
        });
    }

    const handleMouseMove = (e) => {
      const {left } = container.getBoundingClientRect();
      const mouseX = e.clientX - left;

      letters.forEach((letter) => {
          const {left:l, width : w} = letter.getBoundingClientRect();
          const distance = Math.abs(mouseX - (l - left + w / 2));
          const intensity = Math.exp(-(distance ** 2) / 20000); // Ajusta el denominador para cambiar la sensibilidad

          animatedLetter(letter, min + (max - min) * intensity);
      })
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => { animatedLetter(letter, base, 0.3); } );
    }
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);


    return ()=>{
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };


};

export const Welcome = () => {
    const titleRef =  useRef(null);
    const subtitleRef =  useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current,'title');
        const subTitleCleanup = setupTextHover(subtitleRef.current, 'subtitle');

        return () => {
            titleCleanup();
            subTitleCleanup();
        }
    },[])


    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hola, Soy Jorge! Bienvenido a mi",
                "text-3xl font-georama",
                100
                )}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText("portafolio","text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>Este portafolio está diseñado solo para pantallas desktop/tablets </p>
            </div>


        </section>
    );
};


