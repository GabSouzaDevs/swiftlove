import { motion } from "framer-motion";
import { Heart, Music, Sparkles } from "lucide-react";

const floatingElements = [
  { type: "heart", top: "15%", left: "8%", size: "text-3xl", color: "text-soft-pink", delay: 0, animation: "heartBreath" },
  { type: "heart", top: "35%", right: "15%", size: "text-xl", color: "text-rose-gold", delay: -1, animation: "softFloat" },
  { type: "heart", top: "75%", left: "20%", size: "text-lg", color: "text-deep-rose", delay: -2, animation: "heartBreath" },
  { type: "heart", bottom: "25%", right: "8%", size: "text-2xl", color: "text-soft-pink", delay: -0.5, animation: "softFloat" },
  { type: "heart", bottom: "55%", left: "12%", size: "text-xl", color: "text-rose-gold", delay: -1.5, animation: "heartBreath" },
  { type: "music", top: "55%", right: "22%", size: "text-lg", color: "text-romantic-gold", delay: -2.5, animation: "softFloat" },
  { type: "music", bottom: "75%", left: "28%", size: "text-xl", color: "text-deep-rose", delay: -3, animation: "heartBreath" },
  { type: "sparkles", top: "25%", left: "30%", size: "text-sm", color: "text-romantic-gold", delay: -1.8, animation: "softFloat" },
  { type: "sparkles", top: "65%", right: "35%", size: "text-sm", color: "text-soft-pink", delay: -2.2, animation: "heartBreath" },
  { type: "heart", top: "10%", right: "40%", size: "text-sm", color: "text-soft-pink", delay: -0.8, animation: "softFloat" },
  { type: "heart", bottom: "10%", left: "45%", size: "text-sm", color: "text-rose-gold", delay: -2.8, animation: "heartBreath" },
];

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {floatingElements.map((element, index) => {
        let Icon;
        switch (element.type) {
          case "heart":
            Icon = Heart;
            break;
          case "music":
            Icon = Music;
            break;
          case "sparkles":
            Icon = Sparkles;
            break;
          default:
            Icon = Heart;
        }
        
        return (
          <motion.div
            key={index}
            className={`absolute ${element.size} ${element.color}`}
            style={{
              top: element.top,
              bottom: element.bottom,
              left: element.left,
              right: element.right,
              filter: 'drop-shadow(0 0 8px rgba(224, 116, 132, 0.3))',
            }}
            animate={
              element.animation === "heartBreath"
                ? {
                    scale: [1, 1.15, 1],
                    y: [0, -8, 0],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 5, 0],
                  }
                : {
                    y: [0, -20, -5, -25, 0],
                    x: [0, 5, -3, 8, 0],
                    opacity: [0.15, 0.4, 0.35, 0.45, 0.15],
                    rotate: [0, 10, -5, 15, 0],
                  }
            }
            transition={{
              duration: element.animation === "heartBreath" ? 4 : 6,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            <Icon className={element.type === "heart" ? "fill-current" : ""} />
          </motion.div>
        );
      })}
    </div>
  );
}