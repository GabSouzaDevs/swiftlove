import { useState, useRef, useEffect } from "react";

interface UseAudioProps {
  src?: string;
  onEnded?: () => void;
}

export function useAudio({ src, onEnded }: UseAudioProps = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (src) {
      console.log('🎵 Carregando nova música:', src);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      
      const audio = new Audio();
      // Não definir crossOrigin para URLs que podem não ter CORS configurado
      audio.preload = "auto";
      audioRef.current = audio;
      setIsLoading(true);
      setError(null);
      setIsPlaying(false);

      const handleLoadStart = () => {
        console.log('🎵 Início do carregamento');
        setIsLoading(true);
      };

      const handleLoadedMetadata = () => {
        console.log('🎵 Metadata carregada, duração:', audio.duration);
        setDuration(audio.duration || 0);
        setIsLoading(false);
      };

      const handleCanPlay = () => {
        console.log('🎵 Música pronta para tocar');
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        console.log('🎵 Time update:', audio.currentTime);
      };

      const handleEnded = () => {
        console.log('🎵 Música terminou');
        setIsPlaying(false);
        setCurrentTime(0);
        onEnded?.();
      };

      const handleError = (e: Event) => {
        const target = e.target as HTMLAudioElement;
        let errorMessage = "Erro ao carregar a música";
        
        if (target && target.error) {
          switch (target.error.code) {
            case target.error.MEDIA_ERR_ABORTED:
              errorMessage = "Reprodução foi cancelada";
              break;
            case target.error.MEDIA_ERR_NETWORK:
              errorMessage = "Erro de rede - verifique sua conexão";
              break;
            case target.error.MEDIA_ERR_DECODE:
              errorMessage = "Erro ao decodificar o arquivo de áudio";
              break;
            case target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = "Formato de áudio não suportado ou URL inválida";
              break;
            default:
              errorMessage = "Erro desconhecido ao carregar a música";
          }
        }
        
        console.error('🎵 Erro ao carregar música:', {
          event: e,
          errorCode: target?.error?.code,
          errorMessage,
          src: target?.src
        });
        
        setIsLoading(false);
        setError(errorMessage);
        setIsPlaying(false);
      };

      const handlePlay = () => {
        console.log('🎵 Música começou a tocar');
        setIsPlaying(true);
      };

      const handlePause = () => {
        console.log('🎵 Música pausada');
        setIsPlaying(false);
      };

      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      // Definir src por último
      audio.src = src;
      audio.load();

      return () => {
        audio.removeEventListener("loadstart", handleLoadStart);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.pause();
      };
    }
  }, [src, onEnded]);

  const play = async () => {
    if (audioRef.current && !isLoading) {
      try {
        console.log('🎵 Tentando reproduzir música...');
        
        // Garantir que o volume está ok
        audioRef.current.volume = 0.7;
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('🎵 Música reproduzindo com sucesso');
          setIsPlaying(true);
          setError(null);
        }
      } catch (err: any) {
        console.error('🎵 Erro ao reproduzir:', err);
        
        if (err.name === 'NotAllowedError') {
          setError("Clique primeiro para permitir reprodução de áudio");
        } else if (err.name === 'NotSupportedError') {
          setError("Formato de áudio não suportado");
        } else {
          setError("Erro ao reproduzir a música");
        }
        setIsPlaying(false);
      }
    } else if (isLoading) {
      console.log('🎵 Ainda carregando, aguarde...');
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    isPlaying,
    duration,
    currentTime,
    isLoading,
    error,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
  };
}