import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  strings: string[]; // Array of strings to type
  typeSpeed?: number; // Typing speed
  backSpeed?: number; // Backspace speed
  loop?: boolean; // Whether to loop the animation
}

const TypedText: React.FC<TypedTextProps> = ({ strings, typeSpeed = 50, backSpeed = 50, loop = true }) => {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed,
      backSpeed,
      loop,
    };

    const typed = new Typed(typedRef.current!, options);

    // Cleanup Typed.js instance on unmount
    return () => {
      typed.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={typedRef} />;
};

export default TypedText;
