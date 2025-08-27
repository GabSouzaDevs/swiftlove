import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface RelationshipTimerProps {
  onTimeUpdate?: (timeData: TimeData) => void;
}

export default function RelationshipTimer({ onTimeUpdate }: RelationshipTimerProps) {
  const [timeData, setTimeData] = useState<TimeData>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Data de início do relacionamento: 28/03/2024
  const startDate = new Date(2024, 2, 28); // Março é mês 2 (0-indexado)

  const calculateTime = () => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    // Calcula inicialmente
    const initialTime = calculateTime();
    setTimeData(initialTime);
    onTimeUpdate?.(initialTime);
    
    // Atualiza a cada segundo (1000ms)
    const interval = setInterval(() => {
      const newTime = calculateTime();
      setTimeData(newTime);
      onTimeUpdate?.(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative z-10 py-8 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-deep-rose fill-current mr-2" />
            </motion.div>
            <h2 className="font-dancing text-2xl text-deep-rose font-semibold">
              Nosso Tempo Juntos
            </h2>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Heart className="w-6 h-6 text-deep-rose fill-current ml-2" />
            </motion.div>
          </div>
          
          <p 
            className="font-playfair text-lg md:text-xl text-gray-700 leading-relaxed"
            data-testid="relationship-timer-text"
          >
            Já são{" "}
            <span className="font-bold text-deep-rose">
              {timeData.days} dias
            </span>
            ,{" "}
            <span className="font-bold text-romantic-gold">
              {timeData.hours} horas
            </span>
            ,{" "}
            <span className="font-bold text-rose-gold">
              {timeData.minutes} minutos
            </span>
            {" "}e{" "}
            <span className="font-bold text-purple-600">
              {timeData.seconds} segundos
            </span>
            {" "}de muito amor 💖
          </p>
          
          <div className="flex justify-center space-x-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.6, 1, 0.6] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              >
                <Heart className="w-3 h-3 text-rose-gold fill-current" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}