import { createContext, useContext, useState, ReactNode } from "react";
import { useAudio } from "@/hooks/use-audio";

interface Song {
  title: string;
  url: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  duration: number;
  currentTime: number;
  playTime: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playTime, setPlayTime] = useState(0);

  const {
    isPlaying,
    duration,
    currentTime,
    isLoading,
    error,
    play,
    togglePlay: audioTogglePlay,
    seek,
  } = useAudio({
    src: currentSong?.url,
    onEnded: () => setCurrentSong(null),
  });

  const playSong = async (song: Song) => {
    console.log('🎵 PlaySong chamado:', song.title);
    
    if (currentSong?.title === song.title) {
      console.log('🎵 Mesma música, toggle play');
      audioTogglePlay();
    } else {
      console.log('🎵 Nova música, definindo e tocando em 500ms');
      setCurrentSong(song);
      setPlayTime(Date.now());
      
      // Aguardar o áudio carregar e tentar reproduzir
      setTimeout(async () => {
        console.log('🎵 Tentando reproduzir após delay');
        await play();
      }, 500);
    }
  };

  const togglePlay = () => {
    audioTogglePlay();
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        isLoading,
        error,
        duration,
        currentTime,
        playTime,
        playSong,
        togglePlay,
        seek,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}

