import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  SlideInRight,
  Layout,
} from "react-native-reanimated";
import { ANIMATIONS } from "~/lib/constants";

interface AnimatedProps {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  animation?: "fadeIn" | "fadeInDown" | "fadeInUp" | "slideInRight";
  className?: string;
}

export function AnimatedView({
  children,
  delay = 0,
  index = 0,
  animation = "fadeIn",
  className,
}: AnimatedProps) {
  const enteringAnimation = {
    fadeIn: FadeIn,
    fadeInDown: FadeInDown,
    fadeInUp: FadeInUp,
    slideInRight: SlideInRight,
  }[animation];

  return (
    <Animated.View
      entering={enteringAnimation
        .delay(delay + index * ANIMATIONS.staggerDelay)
        .springify()
        .damping(ANIMATIONS.springConfig.damping)
        .stiffness(ANIMATIONS.springConfig.stiffness)}
      layout={Layout.springify()}
      className={className}
    >
      {children}
    </Animated.View>
  );
}
