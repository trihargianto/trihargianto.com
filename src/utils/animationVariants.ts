/**
 * Animation variants for scroll-triggered reveal animations.
 * Each variant defines the initial hidden state and the visible state.
 */

export type AnimationVariant = "fadeInUp" | "fadeInLeft" | "fadeInRight";

export interface AnimationConfig {
  initial: {
    opacity: number;
    transform: string;
  };
  animate: {
    opacity: number;
    transform: string;
  };
}

/**
 * Get the CSS transform and opacity values for a given animation variant
 */
export const animationVariants: Record<AnimationVariant, AnimationConfig> = {
  fadeInUp: {
    initial: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    animate: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  fadeInLeft: {
    initial: {
      opacity: 0,
      transform: "translateX(-30px)",
    },
    animate: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  fadeInRight: {
    initial: {
      opacity: 0,
      transform: "translateX(30px)",
    },
    animate: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
};

/**
 * Get inline styles for animation based on visibility state
 */
export function getAnimationStyles(
  variant: AnimationVariant,
  isVisible: boolean,
  delay: number = 0,
): React.CSSProperties {
  const config = animationVariants[variant];
  const state = isVisible ? config.animate : config.initial;

  return {
    opacity: state.opacity,
    transform: state.transform,
    transition: `opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  };
}
