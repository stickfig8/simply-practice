import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useCarouselTutorial() {
  const controls = useAnimation();
  const [userSwiped, setUserSwiped] = useState(false);
  const userSwipedRef = useRef(false);

  useEffect(() => {
    userSwipedRef.current = userSwiped;
  }, [userSwiped]);

  useEffect(() => {
    const loop = async () => {
      while (!userSwipedRef.current) {
        await controls.start({ x: -8, transition: { duration: 0.5 } });
        await controls.start({ x: 0, transition: { duration: 0.5 } });
        await new Promise((r) => setTimeout(r, 2500));
      }
    };
    loop();
  }, []);

  return { controls, setUserSwiped };
}
