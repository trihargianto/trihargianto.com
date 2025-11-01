import { useEffect, useRef, useState } from "react";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const numberFormatter = new Intl.NumberFormat("en-US");

type CountUpProps = {
  endValue: number;
  duration?: number;
  className?: string;
  suffix?: string;
  decimalPlaces?: number;
  showPlus?: boolean;
  plusClassName?: string;
  onComplete?: () => void;
};

const CountUp = ({
  endValue,
  duration = 2000,
  className,
  suffix = "",
  decimalPlaces = 0,
  showPlus = false,
  plusClassName,
  onComplete,
}: CountUpProps) => {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [showPlusSymbol, setShowPlusSymbol] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotionRef.current) {
      setCurrentValue(endValue);
      if (showPlus) {
        setShowPlusSymbol(true);
      }
      setHasAnimated(true);
      onComplete?.();
    }
  }, [endValue, onComplete, showPlus]);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotionRef.current) {
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    let observer: IntersectionObserver | undefined;

    const startAnimation = () => {
      if (hasAnimated) {
        return;
      }

      setHasAnimated(true);

      const step = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const value = endValue * easedProgress;

        setCurrentValue(value);

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(step);
        } else {
          setCurrentValue(endValue);
          if (showPlus) {
            setShowPlusSymbol(true);
          }
          onComplete?.();
        }
      };

      frameRef.current = window.requestAnimationFrame(step);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          }
        });
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(node);

    return () => {
      observer?.disconnect();
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, endValue, hasAnimated, onComplete, showPlus]);

  const formattedValue =
    decimalPlaces > 0
      ? numberFormatter.format(Number(currentValue.toFixed(decimalPlaces)))
      : numberFormatter.format(Math.round(currentValue));

  return (
    <span
      ref={elementRef}
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{formattedValue}</span>
      {suffix ? <span>{suffix}</span> : null}
      {showPlus ? (
        <span
          aria-hidden="true"
          className={[
            "inline-block pl-1",
            prefersReducedMotionRef.current
              ? "opacity-100"
              : "transition-opacity duration-300 ease-out",
            showPlusSymbol || prefersReducedMotionRef.current
              ? "opacity-100"
              : "opacity-0",
            plusClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          +
        </span>
      ) : null}
    </span>
  );
};

export default CountUp;
