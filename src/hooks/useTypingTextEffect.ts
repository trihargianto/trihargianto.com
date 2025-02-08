import { useEffect, useState } from "react";

export const useTypingTextEffect = (text: string, speed: number) => {
  const [displayedText, setDisplayedText] = useState(text[0] || "");

  useEffect(() => {
    setDisplayedText(text[0] || "");

    let index = 1;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(() => text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};
