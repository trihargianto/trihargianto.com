import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  type AnimationVariant,
  getAnimationStyles,
} from "../utils/animationVariants";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: boolean;
  staggerDelay?: number;
}

/**
 * ScrollReveal component that wraps content and applies scroll-triggered animations.
 * Uses Intersection Observer API to detect when element enters viewport.
 *
 * @example
 * <ScrollReveal variant="fadeInUp">
 *   <h1>This will fade in from bottom</h1>
 * </ScrollReveal>
 *
 * @example
 * // With stagger effect for children
 * <ScrollReveal variant="fadeInUp" stagger staggerDelay={100}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variant = "fadeInUp",
  delay = 0,
  className = "",
  as: Component = "div",
  stagger = false,
  staggerDelay = 100,
}: ScrollRevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  // If stagger is enabled and children is an array, apply incremental delays
  if (stagger && Array.isArray(children)) {
    return (
      <Component ref={ref} className={className}>
        {children.map((child, index) => {
          const staggeredDelay = delay + index * staggerDelay;
          return (
            <div
              key={index}
              style={getAnimationStyles(variant, isVisible, staggeredDelay)}
            >
              {child}
            </div>
          );
        })}
      </Component>
    );
  }

  // Standard single element animation
  return (
    <Component
      ref={ref}
      className={className}
      style={getAnimationStyles(variant, isVisible, delay)}
    >
      {children}
    </Component>
  );
}
