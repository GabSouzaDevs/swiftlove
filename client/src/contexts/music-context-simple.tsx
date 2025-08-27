import { createContext, useContext, ReactNode, useState } from "react";

interface Song {
  title: string;
  url: string;
  loop?: boolean;
}

interface MusicContextType {
  currentSong: Song | null;
  playSong: (song: Song) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic deve ser usado dentro de um MusicProvider");
  }
  return context;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const playSong = (song: Song) => {
    console.log('🎵 Música selecionada:', song.title, song.loop ? '(em loop)' : '');
    setCurrentSong(song);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        playSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}