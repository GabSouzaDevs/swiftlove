import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleAudioPlayerProps {
  src?: string;
  title?: string;
  onEnded?: () => void;
  loop?: boolean;
}

export default function SimpleAudioPlayer({ src, title, onEnded, loop }: SimpleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSrcRef = useRef<string>('');

  const resetState = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (loop) {
        // Se está em loop, reinicia a música
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
        onEnded?.();
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };

    const handleCanPlayThrough = () => {
      // Tocar automaticamente quando a música estiver pronta
      if (audio.src && audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('🎵 Reprodução automática iniciada');
            })
            .catch((error) => {
              console.log('🎵 Erro na reprodução automática:', error);
            });
        }
      }
    };

    const handleError = () => {
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
    };
  }, [onEnded]);

  useEffect(() => {
    const audio = audioRef.current;
    
    if (!src) {
      resetState();
      if (audio) {
        audio.pause();
        audio.src = '';
        currentSrcRef.current = '';
      }
      return;
    }

    if (!audio || currentSrcRef.current === src) {
      return;
    }

    setIsLoading(true);
    setIsPlaying(false);
    setCurrentTime(0);
    
    audio.pause();
    audio.src = src;
    currentSrcRef.current = src;
    audio.load();
  }, [src, resetState]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log('🎵 Erro ao reproduzir:', error);
      });
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!src) {
    return (
      <div className="love-card rounded-full p-3 flex items-center space-x-3 min-w-[200px]">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="text-sm text-gray-500">Clique em uma música</div>
      </div>
    );
  }

  return (
    <div className="love-card rounded-full p-3 flex items-center space-x-3 min-w-[250px]">
      <audio ref={audioRef} preload="auto" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        disabled={isLoading}
        className="text-deep-rose hover:text-romantic-gold transition-colors duration-300 p-2"
        data-testid="button-simple-play"
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
          {title || "Música"}
        </div>
        
        <div className="text-xs text-gray-400 flex items-center space-x-2">
          <span>{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-deep-rose to-romantic-gold transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}