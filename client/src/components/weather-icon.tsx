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
  Umbrella
} from "lucide-react";
import { WeatherCondition } from "@/lib/weather-data";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
  size?: number;
  animate?: boolean;
}

export function WeatherIcon({ condition, className, size = 24, animate = true }: WeatherIconProps) {
  const iconProps = {
    size: size,
    className: cn("stroke-[1.5px]", className), // Thinner stroke for elegance
  };

  const animationProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  } : {};

  const getIcon = () => {
    switch (condition) {
      case "clear":
        return <Sun {...iconProps} className={cn(iconProps.className, "text-amber-400 fill-amber-400/20")} />;
      case "partly-cloudy":
        return <Cloud {...iconProps} className={cn(iconProps.className, "text-sky-400 fill-sky-100")} />;
      case "cloudy":
        return <Cloud {...iconProps} className={cn(iconProps.className, "text-slate-400 fill-slate-100")} />;
      case "rain":
        return <Umbrella {...iconProps} className={cn(iconProps.className, "text-blue-500 fill-blue-100")} />;
      case "wind":
        return <Wind {...iconProps} className={cn(iconProps.className, "text-teal-400")} />;
      case "storm":
        return <CloudLightning {...iconProps} className={cn(iconProps.className, "text-purple-500 fill-purple-100")} />;
      case "snow":
        return <CloudSnow {...iconProps} className={cn(iconProps.className, "text-cyan-300 fill-cyan-50")} />;
      case "hail":
        return <CloudHail {...iconProps} className={cn(iconProps.className, "text-indigo-400 fill-indigo-50")} />;
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
