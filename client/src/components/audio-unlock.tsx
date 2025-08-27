import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioUnlockProps {
  onUnlock: () => void;
}

export default function AudioUnlock({ onUnlock }: AudioUnlockProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleUnlock = async () => {
    setIsActivating(true);
    
    // Criar um áudio temporário para desbloquear o contexto de áudio
    try {
      const audio = new Audio();
      audio.volume = 0;
      audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="; // silent wav
      await audio.play();
      audio.pause();
      
      setTimeout(() => {
        setIsActivating(false);
        onUnlock();
      }, 500);
    } catch (error) {
      console.log('Erro ao desbloquear áudio:', error);
      setIsActivating(false);
      onUnlock();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-cream to-soft-lavender rounded-2xl p-8 shadow-2xl max-w-md w-full text-center border-2 border-romantic-gold"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 text-deep-rose"
        >
          <Music className="w-full h-full" />
        </motion.div>
        
        <h3 className="text-2xl font-playfair text-deep-rose mb-3">
          Ativar Reprodução de Música
        </h3>
        
        <p className="text-gray-700 mb-6">
          Para reproduzir as músicas automaticamente quando você clicar nos títulos, 
          precisamos ativar o áudio primeiro.
        </p>
        
        <Button
          onClick={handleUnlock}
          disabled={isActivating}
          className="bg-gradient-to-r from-deep-rose to-romantic-gold hover:from-romantic-gold hover:to-deep-rose text-white px-8 py-3 text-lg"
          data-testid="button-unlock-audio"
        >
          <Volume2 className="w-5 h-5 mr-2" />
          {isActivating ? "Ativando..." : "Ativar Músicas"}
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          Isso só precisa ser feito uma vez
        </p>
      </motion.div>
    </motion.div>
  );
}