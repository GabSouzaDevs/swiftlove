import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Quote, Lock, Star } from "lucide-react";
import { useMusic } from "@/contexts/music-context-simple";
import { getSongUrl } from "@/config/songs";
import FloatingHearts from "@/components/floating-hearts";
import SimpleAudioPlayer from "@/components/simple-audio-player";
import ShareSection from "@/components/share-section";
import PersonalizationForm from "@/components/personalization-form";
import AudioUnlock from "@/components/audio-unlock";
import RelationshipTimer, { TimeData } from "@/components/relationship-timer";
import RandomLetterGenerator from "@/components/random-letter-generator";
import SecretLetterPuzzle from "@/components/secret-letter-puzzle";
import SecretModeContent from "@/components/secret-mode-content";
import { Button } from "@/components/ui/button";

const songTitles = [
  "Enchanted",
  "Daylight",
  "Lover",
  "The Archer",
  "Love Story",
  "All Too Well",
  "Cruel Summer",
  "Safe & Sound",
  "Begin Again",
  "Sweet Nothing",
  "Everything Has Changed",
  "End Game",
  "Style",
  "You Belong With Me",
  "Bad Blood",
  "Wildest Dreams",
  "Forever & Always",
  "Back To December",
  "Invisible String",
  "You Are In Love",
  "Fearless",
  "Red",
];

const getParagraphs = (toName: string) => [
  {
    text: `Desde que você entrou na minha vida, tudo ficou <song>Enchanted</song>. Você é meu <song>Daylight</song> depois de tantos dias cinzentos, meu <song>Lover</song> em um mundo que às vezes parece <song>The Archer</song>. Quando estamos juntos, é como viver um <song>Love Story</song>, onde cada capítulo é melhor que o anterior.`,
    icon: Quote,
    delay: 0,
  },
  {
    text: `Nos seus olhos, amor, vejo <song>All Too Well</song> cada detalhe que me faz te amar mais. Mesmo quando enfrentamos um <song>Cruel Summer</song>, seu abraço é meu <song>Safe & Sound</song>. Com você, cada dia é um <song>Begin Again</song>, e cada beijo tem gosto de <song>Sweet Nothing</song>.`,
    icon: Music,
    delay: 0.2,
  },
  {
    text: `Amor, você é meu <song>Everything Has Changed</song>, meu <song>End Game</song>, meu <song>Style</song>. E mesmo quando o mundo tenta nos derrubar, eu grito <song>You Belong With Me</song>, porque não existe <song>Bad Blood</song> entre nós—só <song>Wildest Dreams</song> e promessas de <song>Forever & Always</song>.`,
    icon: Heart,
    delay: 0.4,
  },
  {
    text: `Se um dia você se sentir perdida, lembre-se: eu nunca vou te deixar como um <song>Back To December</song>. Você é meu <song>Invisible String</song>, aquele destino que me puxou até você. E mesmo que o tempo passe, meu coração vai sempre cantar <song>You Are In Love</song>.`,
    icon: Quote,
    delay: 0.6,
  },
  {
    text: `Com você, minha princesa, eu sou <song>Fearless</song>. E se o mundo acabar amanhã, quero que saiba que te amei com toda a intensidade de um <song>Red</song>.`,
    icon: Heart,
    delay: 0.8,
    isFinal: true,
  },
];

export default function Home() {
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("você");
  const [audioUnlocked, setAudioUnlocked] = useState(true); // Remover modal temporariamente
  const [timeData, setTimeData] = useState<TimeData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [secretLetterUnlocked, setSecretLetterUnlocked] = useState(false);
  const { playSong, currentSong } = useMusic();

  // Ler parâmetros da URL na inicialização
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFromName = urlParams.get("from");
    const urlToName = urlParams.get("to");

    if (urlFromName) {
      setFromName(urlFromName);
    }
    if (urlToName) {
      setToName(urlToName);
    }
  }, []);

  const handlePersonalize = (newFromName: string, newToName: string) => {
    const finalFromName = newFromName;
    const finalToName = newToName || "você";

    setFromName(finalFromName);
    setToName(finalToName);

    // Atualizar a URL com os novos parâmetros
    const urlParams = new URLSearchParams();
    if (finalFromName) {
      urlParams.set("from", finalFromName);
    }
    if (finalToName && finalToName !== "você") {
      urlParams.set("to", finalToName);
    }

    const newUrl = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  };

  const paragraphs = getParagraphs(toName);

  function SongTitle({ children }: { children: string }) {
    const handleClick = async () => {
      const url = getSongUrl(children);
      if (url) {
        console.log(`🎵 Clique no título: ${children}, URL: ${url}`);
        await playSong({ title: children, url });
      } else {
        console.log(`URL não encontrada para: ${children}`);
      }
    };

    return (
      <span
        className="song-title cursor-pointer hover:underline transition-all duration-200 hover:scale-105"
        onClick={handleClick}
        data-testid={`song-${children.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {children}
      </span>
    );
  }

  function formatTextWithSongs(text: string) {
    return text.split(/<song>(.*?)<\/song>/).map((part, index) => {
      if (index % 2 === 1) {
        return <SongTitle key={index}>{part}</SongTitle>;
      }
      return part;
    });
  }

  const handleSecretPuzzleSolved = () => {
    setSecretLetterUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-soft-lavender to-rose-gold overflow-x-hidden">
      {!audioUnlocked && (
        <AudioUnlock onUnlock={() => setAudioUnlocked(true)} />
      )}
      <FloatingHearts />

      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-dancing text-gradient flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-6 h-6 mr-2 text-deep-rose" />
            Love Letter
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsSecretMode(true)}
                variant="outline"
                className="border-2 border-deep-rose text-deep-rose hover:bg-deep-rose hover:text-white px-4 py-2 font-dancing"
                data-testid="button-secret-mode-header"
              >
                <Lock className="w-4 h-4 mr-2" />
                <Star className="w-3 h-3 mr-1" />
                Modo Secreto
              </Button>
            </motion.div>

            <PersonalizationForm
              onPersonalize={handlePersonalize}
              fromName={fromName}
              toName={toName}
            />
            <SimpleAudioPlayer
              src={currentSong?.url}
              title={currentSong?.title}
              loop={currentSong?.loop}
              onEnded={() => console.log("Música terminou")}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-16 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-gradient mb-6 animate-gentle-glow">
            {isSecretMode && secretLetterUnlocked
              ? "💎 Segredos do Coração"
              : fromName && toName !== "você"
                ? `" Uma Declaração de Amor de ${fromName} para ${toName}`
                : " Uma Declaração de Amor"}
          </h1>

          {/* Botão para voltar da carta secreta */}
          {isSecretMode && secretLetterUnlocked && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={() => {
                  setIsSecretMode(false);
                  setSecretLetterUnlocked(false);
                }}
                variant="outline"
                className="border-2 border-deep-rose text-deep-rose hover:bg-deep-rose hover:text-white px-6 py-3 font-dancing"
                data-testid="button-back-to-public"
              >
                ← Voltar para Modo Normal
              </Button>
            </motion.div>
          )}

          {/* Relationship Timer */}
          <RelationshipTimer onTimeUpdate={setTimeData} />
          <p className="font-dancing text-2xl md:text-3xl text-deep-rose mb-8 love-text">
            {fromName && toName !== "você"
              ? "Uma carta musical do coração de um apaixonado"
              : "Uma carta musical do coração"}
          </p>
          <div className="flex justify-center space-x-2 text-romantic-gold">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Love Declaration ou Modo Carta Secreta */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {isSecretMode && !secretLetterUnlocked ? (
            /* Enigma da carta secreta */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="love-card rounded-2xl p-8 shadow-lg"
            >
              <SecretLetterPuzzle
                fromName={fromName}
                toName={toName}
                onSolved={handleSecretPuzzleSolved}
              />
            </motion.div>
          ) : isSecretMode && secretLetterUnlocked ? (
            /* Modo Secreto com carta fixa */
            <SecretModeContent fromName={fromName} toName={toName} />
          ) : (
            /* Carta pública original */
            paragraphs.map((paragraph, index) => {
              const IconComponent = paragraph.icon;

              return (
                <motion.div
                  key={index}
                  className="love-card rounded-2xl p-8 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: paragraph.delay,
                    ease: "easeOut",
                  }}
                  data-testid={`love-paragraph-${index}`}
                >
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">
                    {formatTextWithSongs(paragraph.text)}
                  </p>

                  {paragraph.isFinal ? (
                    <div className="text-center mt-6 space-y-4">
                      <motion.div
                        className="inline-flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-gold to-romantic-gold rounded-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Heart className="w-6 h-6 text-white fill-current animate-pulse-soft" />
                        <span className="font-dancing text-white text-2xl font-bold animate-gentle-glow">
                          Com todo amor, de seu nerd!
                        </span>
                        <Heart className="w-6 h-6 text-white fill-current animate-pulse-soft" />
                      </motion.div>

                      {fromName && (
                        <motion.div
                          className="text-right mt-6"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        >
                          <p className="font-dancing text-2xl text-deep-rose">
                            Com amor,
                          </p>
                          <p className="font-dancing text-4xl font-bold text-gradient mt-2 mr-1">
                            {fromName}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} mt-4`}
                    >
                      <IconComponent
                        className={`w-6 h-6 opacity-60 ${
                          index % 2 === 0
                            ? "text-rose-gold"
                            : "text-romantic-gold"
                        }`}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </main>

      {/* Random Letter Generator - só mostrar se não estiver no modo secreto */}
      {!isSecretMode && (
        <RandomLetterGenerator
          fromName={fromName}
          toName={toName}
          timeData={timeData}
        />
      )}

      {/*<ShareSection fromName={fromName} toName={toName} />*/}

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-gray-500 mb-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Music className="w-4 h-4 mr-2" />
            Inspirado pelas canções que tocam o coração
          </motion.p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span className="flex items-center">
              Feito com{" "}
              <Heart className="w-4 h-4 text-rose-gold mx-1 fill-current" />{" "}
              especialmente para você Malu!
            </span>
            <span>•</span>
            <span>Taylor Swift References</span>
            <span>•</span>
            <span>GabSouzaDev - {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
