import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
}

interface ExplosionEffectProps {
  trigger: boolean;
}

const ExplosionEffect = ({ trigger }: ExplosionEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles: Particle[] = [];

    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: 50,
        y: 50,
        size: Math.random() * 6 + 4,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 200 + 100,
      });
    }

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold-shine"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: "translate(-50%, -50%)",
              animation: `explode 1.5s ease-out forwards`,
              "--angle": `${p.angle}rad`,
              "--distance": `${p.distance}px`,
            } as React.CSSProperties
          }
        />
      ))}

      <style>{`
        @keyframes explode {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
              );
          }
        }
      `}</style>
    </div>
  );
};

export default ExplosionEffect;
