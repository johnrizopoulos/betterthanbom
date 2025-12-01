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
} from "lucide-react";
import { WeatherCondition } from "@/lib/weather-data";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  condition: WeatherCondition;
  temp?: number;
  className?: string;
  size?: number;
  animate?: boolean;
}

// Custom SVG Icons to match Lucide style
const SunHat = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 14V10a5 5 0 0 1 10 0v4" />
    <path d="M2 14h20c0 2.5-4.5 4-10 4S2 16.5 2 14Z" />
    <path d="M7 14h10" />
  </svg>
);

// The Classic Hoodie (Default Choice for now)
const Hoodie = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a5 5 0 0 0-5 5v3h10V7a5 5 0 0 0-5-5Z" />
    <path d="M4 10v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9" />
    <path d="M4 10l-2 5" />
    <path d="M20 10l2 5" />
    <path d="M9 16h6c0 2-1.5 3-3 3s-3-1-3-3Z" /> {/* Kangaroo pocket hint */}
    <path d="M10 7v3" /> {/* Drawstring */}
    <path d="M14 7v3" /> {/* Drawstring */}
  </svg>
);

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
        return <SunHat {...iconProps} className={cn(iconProps.className, "text-amber-500 fill-amber-100")} />;
      }
      
      // Rule 3: 20-27c -> T-shirt
      if (temp >= 20 && temp <= 27) {
         return <Shirt {...iconProps} className={cn(iconProps.className, "text-orange-400 fill-orange-50")} />;
      }

      // Rule 4: 10-19c -> Hoodie/Jumper
      if (temp >= 10 && temp <= 19) {
        return <Hoodie {...iconProps} className={cn(iconProps.className, "text-indigo-400 fill-indigo-50")} />;
      }

      // Rule 5: < 10c -> Stay inside (House)
      if (temp < 10) {
        return <Home {...iconProps} className={cn(iconProps.className, "text-stone-600 fill-stone-200")} />;
      }
    }

    // Fallback
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
