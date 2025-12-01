import { motion } from "framer-motion";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudHail, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Moon, 
  Sun, 
  Wind,
  Umbrella,
  Home,
  Shirt,
  Tent, // Using as closest thing to a "Hat" or maybe just use Emoji
} from "lucide-react";
import { WeatherCondition } from "@/lib/weather-data";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  condition: WeatherCondition;
  temp?: number; // Optional because forecast logic might not always have it, but our data does now
  className?: string;
  size?: number;
  animate?: boolean;
}

export function WeatherIcon({ condition, temp, className, size = 24, animate = true }: WeatherIconProps) {
  const iconProps = {
    size: size,
    className: cn("stroke-[1.5px]", className), 
  };

  const animationProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  } : {};

  const getIcon = () => {
    // Rule 1: Raining -> Umbrella
    if (["rain", "storm", "hail", "drizzle"].includes(condition)) {
      return <Umbrella {...iconProps} className={cn(iconProps.className, "text-blue-500 fill-blue-100")} />;
    }

    // Check temperature rules if provided
    if (temp !== undefined) {
      // Rule 2: > 28c -> Wide brim hat
      if (temp > 28) {
        // Using emoji for specificity as Lucide lacks a good "Sun Hat"
        return <span style={{ fontSize: size }} role="img" aria-label="Sun Hat">👒</span>;
      }
      
      // Rule 3: 20-27c -> T-shirt
      if (temp >= 20 && temp <= 27) {
         // Lucide has a Shirt icon
         return <Shirt {...iconProps} className={cn(iconProps.className, "text-orange-400 fill-orange-50")} />;
      }

      // Rule 4: 10-19c -> Jumper
      if (temp >= 10 && temp <= 19) {
        // Using emoji for "Coat" as closest to Jumper/Jacket visually in emoji set, or maybe a generic "Shirt" with different color?
        // Let's use the Coat emoji for distinctness
        return <span style={{ fontSize: size }} role="img" aria-label="Coat">🧥</span>;
      }

      // Rule 5: < 10c -> Stay inside (House)
      if (temp < 10) {
        return <Home {...iconProps} className={cn(iconProps.className, "text-stone-600 fill-stone-200")} />;
      }
    }

    // Fallback to original condition logic if no temp or conditions not met (though logic above covers all temps if temp is present)
    // This handles cases where we might just display raw condition without temp logic if needed
    switch (condition) {
      case "clear":
        return <Sun {...iconProps} className={cn(iconProps.className, "text-amber-400 fill-amber-400/20")} />;
      case "partly-cloudy":
        return <Cloud {...iconProps} className={cn(iconProps.className, "text-sky-400 fill-sky-100")} />;
      case "cloudy":
        return <Cloud {...iconProps} className={cn(iconProps.className, "text-slate-400 fill-slate-100")} />;
      case "wind":
        return <Wind {...iconProps} className={cn(iconProps.className, "text-teal-400")} />;
      case "snow":
        return <CloudSnow {...iconProps} className={cn(iconProps.className, "text-cyan-300 fill-cyan-50")} />;
      case "fog":
        return <CloudFog {...iconProps} className={cn(iconProps.className, "text-slate-300 fill-slate-50")} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  return (
    <motion.div {...animationProps} className="flex items-center justify-center">
      {getIcon()}
    </motion.div>
  );
}
