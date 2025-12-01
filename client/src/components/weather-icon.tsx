
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WeatherIconProps {
  condition: string;
  temp: number;
  size?: number;
  animate?: boolean;
  className?: string;
}

const ICON_MAP: Record<string, { x: number; y: number }> = {
  umbrella: { x: 0, y: 0 },
  jumper: { x: 64, y: 0 },
  tshirt: { x: 128, y: 0 },
  hat: { x: 192, y: 0 },
  coat: { x: 256, y: 0 },
};

function getIconForWeather(condition: string, temp: number): keyof typeof ICON_MAP {
  if (condition === "rain" || condition === "storm") {
    return "umbrella";
  }

  if (temp < 10) {
    return "coat";
  } else if (temp >= 10 && temp < 20) {
    return "jumper";
  } else if (temp >= 20 && temp < 28) {
    return "tshirt";
  } else {
    return "hat";
  }
}

export function WeatherIcon({ condition, temp, size = 64, animate = true, className = "" }: WeatherIconProps) {
  const iconKey = getIconForWeather(condition, temp);
  const position = ICON_MAP[iconKey];

  const iconContent: ReactNode = (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: "url('/weather-icons-sprite.png')",
        backgroundPosition: `-${position.x * (size / 64)}px -${position.y * (size / 64)}px`,
        backgroundSize: `${320 * (size / 64)}px ${64 * (size / 64)}px`,
        imageRendering: "pixelated",
      }}
    />
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
      >
        {iconContent}
      </motion.div>
    );
  }

  return <div className={className}>{iconContent}</div>;
}
