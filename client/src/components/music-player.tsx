import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/contexts/music-context";

export default function MusicPlayer() {
  const { currentSong, isPlaying, togglePlay, currentTime, duration, seek, isLoading } = useMusic();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      seek(newTime);
    }
  };

  return (
    <motion.div 
      className="love-card rounded-full p-3 flex items-center space-x-3 min-w-[200px]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          console.log('🎵 Botão play/pause clicado, isPlaying:', isPlaying);
          togglePlay();
        }}
        disabled={!currentSong || isLoading}
        className="text-deep-rose hover:text-romantic-gold transition-colors duration-300 p-2 disabled:opacity-50"
        data-testid="button-toggle-music"
      >
        {isLoading ? (
          <div className="w-5 h-5 animate-spin rounded-full border-2 border-deep-rose border-t-transparent" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </Button>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="text-sm text-gray-600 font-medium truncate">
          {currentSong ? currentSong.title : "Love Song"}
        </div>
        
        {currentSong && (
          <div className="text-xs text-gray-400 flex items-center space-x-2">
            <span>{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-deep-rose to-romantic-gold"
                style={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        )}
      </div>
      
      {!currentSong && (
        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-deep-rose to-romantic-gold"
            animate={{
              width: ["33%", "66%", "33%"],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}