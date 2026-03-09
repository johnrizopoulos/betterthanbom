import { useMemo } from "react";
import { WeatherCondition } from "@/lib/weather-data";

interface WeatherBackgroundProps {
  condition?: WeatherCondition;
  temp?: number;
}

function getGradient(condition?: WeatherCondition, temp?: number): string {
  if (!condition) return "linear-gradient(135deg, #e8f0fe 0%, #f8f9fa 100%)";

  if (condition === "rain") return "linear-gradient(180deg, #4a6274 0%, #7b93a4 40%, #9fb3c2 100%)";
  if (condition === "storm") return "linear-gradient(180deg, #2d2545 0%, #4a3f6b 40%, #6b5f8a 100%)";
  if (condition === "snow") return "linear-gradient(180deg, #d4e5f7 0%, #e8eef4 50%, #f0f4f8 100%)";
  if (condition === "fog") return "linear-gradient(180deg, #b8bfc6 0%, #cdd3d8 50%, #dde1e5 100%)";
  if (condition === "cloudy") return "linear-gradient(135deg, #8e9eab 0%, #b8c6d0 50%, #cbd5de 100%)";
  if (condition === "partly-cloudy") {
    if (temp !== undefined && temp > 28) return "linear-gradient(135deg, #d4a853 0%, #c9b896 50%, #b8c6d0 100%)";
    return "linear-gradient(135deg, #87CEEB 0%, #b8d4e8 50%, #d0dce5 100%)";
  }

  if (condition === "clear") {
    if (temp !== undefined) {
      if (temp > 28) return "linear-gradient(135deg, #f6d365 0%, #fda085 50%, #fbc2a0 100%)";
      if (temp >= 20) return "linear-gradient(135deg, #89CFF0 0%, #a8d8ea 40%, #f9e4b7 100%)";
      if (temp >= 10) return "linear-gradient(135deg, #a8c0d6 0%, #c5d5e4 50%, #dde4eb 100%)";
      return "linear-gradient(135deg, #c8dce8 0%, #dde8f0 50%, #eaf0f5 100%)";
    }
    return "linear-gradient(135deg, #89CFF0 0%, #a8d8ea 50%, #f9e4b7 100%)";
  }

  return "linear-gradient(135deg, #e8f0fe 0%, #f8f9fa 100%)";
}

function getParticleType(condition?: WeatherCondition, temp?: number): string {
  if (!condition) return "none";
  if (condition === "rain") return "rain";
  if (condition === "storm") return "storm";
  if (condition === "snow") return "snow";
  if (condition === "fog") return "fog";
  if (condition === "cloudy" || condition === "partly-cloudy") return "clouds";
  if (condition === "clear") {
    if (temp !== undefined && temp < 10) return "frost";
    return "sunrays";
  }
  return "none";
}

function RainParticles({ dense }: { dense?: boolean }) {
  const count = dense ? 18 : 12;
  const drops = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.6 + Math.random() * 0.8,
      opacity: 0.15 + Math.random() * 0.25,
      height: 15 + Math.random() * 20,
    })), [count]);

  return (
    <>
      <style>{`
        @keyframes rainFall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
      {drops.map((drop) => (
        <div
          key={drop.id}
          style={{
            position: "absolute",
            left: `${drop.left}%`,
            top: 0,
            width: "1.5px",
            height: `${drop.height}px`,
            background: `rgba(180, 210, 240, ${drop.opacity})`,
            borderRadius: "1px",
            animation: `rainFall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function StormFlash() {
  return (
    <>
      <style>{`
        @keyframes stormFlash {
          0%, 92%, 94%, 96%, 100% { opacity: 0; }
          93% { opacity: 0.06; }
          95% { opacity: 0.03; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          animation: "stormFlash 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function CloudParticles() {
  const clouds = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: 5 + Math.random() * 60,
      size: 80 + Math.random() * 120,
      delay: Math.random() * 20,
      duration: 25 + Math.random() * 20,
      opacity: 0.12 + Math.random() * 0.15,
    })), []);

  return (
    <>
      <style>{`
        @keyframes cloudDrift {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
      `}</style>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          style={{
            position: "absolute",
            top: `${cloud.top}%`,
            left: 0,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.5}px`,
            borderRadius: "50%",
            background: `rgba(255, 255, 255, ${cloud.opacity})`,
            filter: "blur(20px)",
            animation: `cloudDrift ${cloud.duration}s linear ${cloud.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function SunRayParticles() {
  const rays = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: -30 + i * 15,
      delay: i * 0.8,
      opacity: 0.04 + Math.random() * 0.04,
    })), []);

  return (
    <>
      <style>{`
        @keyframes sunPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
      `}</style>
      {rays.map((ray) => (
        <div
          key={ray.id}
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "3px",
            height: "120%",
            background: `linear-gradient(180deg, rgba(255, 220, 100, ${ray.opacity}), transparent 70%)`,
            transform: `rotate(${ray.angle}deg)`,
            transformOrigin: "top right",
            animation: `sunPulse 4s ease-in-out ${ray.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function SnowParticles() {
  const flakes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      size: 3 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.4,
      sway: 20 + Math.random() * 30,
    })), []);

  return (
    <>
      <style>{`
        @keyframes snowFall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(50vh) translateX(var(--sway)); }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(0); opacity: 0; }
        }
      `}</style>
      {flakes.map((flake) => (
        <div
          key={flake.id}
          style={{
            position: "absolute",
            left: `${flake.left}%`,
            top: 0,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            borderRadius: "50%",
            background: `rgba(255, 255, 255, ${flake.opacity})`,
            // @ts-ignore
            "--sway": `${flake.sway}px`,
            animation: `snowFall ${flake.duration}s ease-in-out ${flake.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

function FogParticles() {
  const wisps = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: 10 + Math.random() * 70,
      delay: Math.random() * 15,
      duration: 20 + Math.random() * 15,
      size: 150 + Math.random() * 200,
      opacity: 0.08 + Math.random() * 0.08,
    })), []);

  return (
    <>
      <style>{`
        @keyframes fogDrift {
          0% { transform: translateX(-300px) scale(1); }
          50% { transform: translateX(50vw) scale(1.2); }
          100% { transform: translateX(calc(100vw + 300px)) scale(1); }
        }
      `}</style>
      {wisps.map((wisp) => (
        <div
          key={wisp.id}
          style={{
            position: "absolute",
            top: `${wisp.top}%`,
            left: 0,
            width: `${wisp.size}px`,
            height: `${wisp.size * 0.6}px`,
            borderRadius: "50%",
            background: `rgba(200, 210, 220, ${wisp.opacity})`,
            filter: "blur(40px)",
            animation: `fogDrift ${wisp.duration}s linear ${wisp.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function FrostParticles() {
  const sparkles = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      size: 2 + Math.random() * 2,
    })), []);

  return (
    <>
      <style>{`
        @keyframes frostSparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            position: "absolute",
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            borderRadius: "50%",
            background: "rgba(200, 225, 255, 0.8)",
            animation: `frostSparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

export function WeatherBackground({ condition, temp }: WeatherBackgroundProps) {
  const gradient = getGradient(condition, temp);
  const particleType = getParticleType(condition, temp);

  return (
    <div
      data-testid="weather-background"
      style={{
        position: "fixed",
        inset: 0,
        background: gradient,
        transition: "background 1.5s ease-in-out",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particleType === "rain" && <RainParticles />}
      {particleType === "storm" && (
        <>
          <RainParticles dense />
          <StormFlash />
        </>
      )}
      {particleType === "clouds" && <CloudParticles />}
      {particleType === "sunrays" && <SunRayParticles />}
      {particleType === "snow" && <SnowParticles />}
      {particleType === "fog" && <FogParticles />}
      {particleType === "frost" && <FrostParticles />}
    </div>
  );
}
