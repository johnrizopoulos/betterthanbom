import { motion } from "framer-motion";
import { WeatherCondition } from "@/lib/weather-data";
import { cn } from "@/lib/utils";
import weatherIcons from "@assets/image_1764585934042.png";

interface WeatherIconProps {
  condition: WeatherCondition;
  temp?: number;
  className?: string;
  size?: number | "auto";
  animate?: boolean;
}

type IconType = "umbrella" | "jumper" | "tshirt" | "hat" | "coat";

const iconPositions: Record<IconType, { x: number; y: number }> = {
  umbrella: { x: 0, y: 0 },
  jumper: { x: 50, y: 0 },
  tshirt: { x: 100, y: 0 },
  hat: { x: 25, y: 100 },
  coat: { x: 75, y: 100 },
};

function PixelIcon({ type, size }: { type: IconType; size: number | "auto" }) {
  const pos = iconPositions[type];
  const isAuto = size === "auto";
  
  return (
    <div
      style={{
        width: isAuto ? "100%" : size,
        height: isAuto ? "100%" : size,
        backgroundImage: `url(${weatherIcons})`,
        backgroundSize: "300% 200%",
        backgroundPosition: `${pos.x}% ${pos.y}%`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
      }}
    />
  );
}

export function WeatherIcon({ condition, temp, className, size = 24, animate = true }: WeatherIconProps) {
  const animationProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  } : {};

  const getIconType = (): IconType => {
    // Rule 1: Raining -> Umbrella
    if (["rain", "storm", "hail", "drizzle"].includes(condition)) {
      return "umbrella";
    }

    // Check temperature rules if provided
    if (temp !== undefined) {
      // Rule 2: > 28c -> Sun hat
      if (temp > 28) {
        return "hat";
      }
      
      // Rule 3: 20-27c -> T-shirt
      if (temp >= 20 && temp <= 27) {
        return "tshirt";
      }

      // Rule 4: 10-19c -> Jumper
      if (temp >= 10 && temp <= 19) {
        return "jumper";
      }

      // Rule 5: < 10c -> Stay inside (Coat)
      if (temp < 10) {
        return "coat";
      }
    }

    // Fallback based on condition
    switch (condition) {
      case "clear":
        return "hat";
      case "partly-cloudy":
      case "cloudy":
        return "tshirt";
      case "wind":
        return "jumper";
      case "snow":
      case "fog":
        return "coat";
      default:
        return "tshirt";
    }
  };

  const isAuto = size === "auto";

  return (
    <motion.div {...animationProps} className={cn("flex items-center justify-center", isAuto && "w-full h-full", className)}>
      <PixelIcon type={getIconType()} size={size} />
    </motion.div>
  );
}
