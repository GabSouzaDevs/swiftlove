import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shuffle, Heart, Music, Share2, Mail, MessageCircle, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSongUrl } from "@/config/songs";
import { useMusic } from "@/contexts/music-context-simple";
import SecretLetterPuzzle from "./secret-letter-puzzle";

interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface RandomLetterGeneratorProps {
  fromName: string;
  toName: string;
  timeData: TimeData;
  isSecretMode?: boolean;
}

// Mensagens contextualizadas com as letras e temas das músicas disponíveis
const songBasedMessages: Record<string, string[]> = {
  "Enchanted": [
    "Como na música 'Enchanted', eu estava encantado no minuto em que nos conhecemos. Você trouxe magia para minha vida.",
    "Assim como Taylor canta em 'Enchanted', eu estava encantado desde o primeiro olhar. Você é meu conto de fadas real.",
    "Como diz 'Enchanted': 'I was enchanted to meet you' - e eu posso dizer o mesmo sobre você, {toName}."
  ],
  "Daylight": [
    "Como em 'Daylight', você trouxe luz para minha escuridão. Agora vejo tudo em cores douradas.",
    "Igual à música 'Daylight', você me ensinou que o amor verdadeiro é como a luz do sol - aquece e ilumina tudo.",
    "Como Taylor canta em 'Daylight', eu quero estar com você em todas as fases da vida, {toName}."
  ],
  "Lover": [
    "Você é meu 'Lover' da Taylor Swift - minha amante, minha melhor amiga, meu lar. Você é tudo em uma pessoa só.",
    "Como na música 'Lover', com você eu encontrei meu 'lover' para toda vida. Você é meu amor para sempre.",
    "Igual em 'Lover', quero envelhecer ao seu lado, {toName}. Você é meu amor eterno."
  ],
  "The Archer": [
    "Como 'The Archer', você me vê por completo - minhas imperfeições e qualidades. E ainda assim me ama.",
    "Assim como em 'The Archer', você acerta sempre no alvo do meu coração. Você me conhece de verdade.",
    "Como Taylor em 'The Archer', eu me pergunto se você me ama com todas as minhas falhas. E a resposta está nos seus olhos."
  ],
  "Love Story": [
    "Nossa história é uma verdadeira 'Love Story' - você é minha Julieta, mas com final feliz.",
    "Como na música 'Love Story', eu só posso dizer: 'Marry me, Juliet!' Você será meu amor para sempre.",
    "Nossa 'Love Story' é ainda mais bonita que a da música - porque é real e é nossa, {toName}."
  ],
  "All Too Well": [
    "Diferente de 'All Too Well', quero que nossa história nunca tenha fim. Quero lembrar de cada momento bom para sempre.",
    "Como em 'All Too Well', eu lembro de todos os detalhes dos nossos momentos juntos - e todos são especiais.",
    "Ao contrário da tristeza de 'All Too Well', nossa história é pura alegria e amor verdadeiro."
  ],
  "Cruel Summer": [
    "Nosso verão não foi 'Cruel Summer' - foi o mais doce da minha vida, porque foi quando te encontrei.",
    "Como em 'Cruel Summer', você é minha obsessão favorita. Cada momento contigo é intenso e perfeito.",
    "Diferente do 'Cruel Summer' da música, nosso verão foi puro amor e descobertas."
  ],
  "Safe & Sound": [
    "Com você me sinto 'Safe & Sound' - protegido e em paz. Você é meu porto seguro.",
    "Como a música 'Safe & Sound', ao seu lado eu encontro tranquilidade e segurança, {toName}.",
    "Você me faz sentir 'Safe & Sound' em um mundo cheio de incertezas. Você é minha certeza."
  ],
  "Begin Again": [
    "Como 'Begin Again', você me ensinou que é possível recomeçar e ser feliz de novo. Você é meu novo começo.",
    "Igual à música 'Begin Again', com você eu aprendo a amar novamente. Cada dia é um novo início.",
    "Como Taylor em 'Begin Again', eu sorrio sem perceber quando estou com você. Você me faz feliz naturalmente."
  ],
  "Sweet Nothing": [
    "Como 'Sweet Nothing', não preciso de grandes gestos - seus pequenos momentos de carinho são tudo para mim.",
    "Igual em 'Sweet Nothing', você encontra beleza nas coisas simples e me ensina a valorizar cada detalhe.",
    "Como a música 'Sweet Nothing', nosso amor é feito de pequenos momentos doces e significativos, {toName}."
  ],
  "Everything Has Changed": [
    "Como 'Everything Has Changed', desde que você chegou, tudo mudou para melhor na minha vida.",
    "Igual à música 'Everything Has Changed', você transformou meu mundo completamente. Tudo faz sentido agora.",
    "Como Taylor canta, 'Everything Has Changed' - e mudou mesmo, porque agora tenho você, {toName}."
  ],
  "End Game": [
    "Você é meu 'End Game' - meu objetivo final, minha pessoa definitiva. Não quero mais ninguém além de você.",
    "Como na música 'End Game', você é tudo que eu quero para minha vida. Você é meu plano principal.",
    "Igual em 'End Game', quero que saiba que você é minha prioridade número um, {toName}."
  ],
  "Style": [
    "Nosso amor tem 'Style' - é atemporal, elegante e nunca sai de moda. Você é meu estilo preferido.",
    "Como 'Style', nosso amor é clássico e eterno. Nunca vai passar de moda o que sentimos um pelo outro.",
    "Igual à música 'Style', nosso amor tem uma vibe única e especial que nunca se perde."
  ],
  "You Belong With Me": [
    "Como 'You Belong With Me', eu sempre soube que éramos feitos um para o outro. Você pertence comigo.",
    "Igual à música, eu quero gritar para o mundo: 'You Belong With Me!' Somos perfeitos juntos.",
    "Como Taylor canta, você pertence comigo, {toName}. Somos a combinação perfeita."
  ],
  "Bad Blood": [
    "Diferente de 'Bad Blood', entre nós só existe amor puro e verdadeiro. Você é minha paz.",
    "Ao contrário da música 'Bad Blood', nosso relacionamento é feito de cumplicidade e carinho.",
    "Como o oposto de 'Bad Blood', você trouxe harmonia e amor para minha vida."
  ],
  "Wildest Dreams": [
    "Você superou meus 'Wildest Dreams' - você é ainda melhor do que eu imaginava nos meus sonhos mais loucos.",
    "Como 'Wildest Dreams', eu quero que se lembre de mim para sempre - mas felizmente você é real, não um sonho.",
    "Igual à música, nos meus sonhos mais selvagens eu não imaginava um amor tão perfeito como o nosso, {toName}."
  ],
  "Forever & Always": [
    "Como 'Forever & Always', meu amor por você é eterno. Para sempre e sempre você será especial para mim.",
    "Igual à música, eu prometo te amar 'Forever & Always'. Você é meu amor patoda vida.",
    "Como Taylor canta, é 'Forever & Always' - e é exatamente assim que quero te amar, {toName}."
  ],
  "Back To December": [
    "Diferente de 'Back To December', não me arrependo de nada do nosso passado. Cada momento foi perfeito.",
    "Ao contrário da música 'Back To December', eu não mudaria nada da nossa história. Tudo foi como deveria ser.",
    "Como o oposto de 'Back To December', eu não quero voltar no tempo - quero seguir em frente com você."
  ],
  "Invisible String": [
    "Como 'Invisible String', sempre houve uma conexão invisível nos ligando. O destino nos uniu.",
    "Igual à música, existe uma 'Invisible String' que nos conecta desde sempre. Éramos feitos um para o outro.",
    "Como Taylor canta sobre a corda invisível, eu acredito que o universo conspirou para nos unir, {toName}."
  ],
  "You Are In Love": [
    "Como 'You Are In Love', eu posso afirmar com certeza: você está apaixonada e eu também.",
    "Igual à música, todos os sinais mostram que 'You Are In Love' - e eu me sinto da mesma forma por você.",
    "Como a música descreve, nós estamos realmente apaixonados. É puro e verdadeiro, {toName}."
  ],
  "Fearless": [
    "Como 'Fearless', com você eu me sinto corajoso(a) para enfrentar qualquer coisa. Você me dá força.",
    "Igual à música, você me faz sentir 'Fearless' - sem medo de amar e de ser feliz.",
    "Como Taylor canta, sou destemido quando estou com você. Você é minha coragem, {toName}."
  ],
  "Red": [
    "Como 'Red', nosso amor é intenso e vibrante. Você trouxe cor para minha vida.",
    "Igual à música, você pinta minha vida de 'Red' - pura paixão e intensidade.",
    "Como em 'Red', nosso amor é forte e marcante. Você é a cor mais bonita da minha vida."
  ]
};

// Apenas músicas que têm URL configurada (para funcionar com o player)
const availableSongs = [
  "Enchanted", "Daylight", "Lover", "The Archer", "Love Story", 
  "All Too Well", "Cruel Summer", "Safe & Sound", "Begin Again",
  "Sweet Nothing", "Everything Has Changed", "End Game", "Style",
  "You Belong With Me", "Bad Blood", "Wildest Dreams", "Forever & Always",
  "Back To December", "Invisible String", "You Are In Love", "Fearless", "Red"
];

export default function RandomLetterGenerator({ fromName, toName, timeData, isSecretMode = false }: RandomLetterGeneratorProps) {
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { playSong } = useMusic();

  // Se estiver no modo secreto, gerar automaticamente a carta
  useEffect(() => {
    if (isSecretMode && !generatedLetter) {
      generateSecretLetter();
    }
  }, [isSecretMode]);

  const generateRandomLetter = async () => {
    setIsGenerating(true);
    
    // Pequeno delay para criar suspense
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Escolher música aleatória das disponíveis (que têm URL)
    const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];
    setSelectedSong(randomSong);
    
    // Escolher mensagem específica para a música selecionada
    const songMessages = songBasedMessages[randomSong] || [];
    const randomMessage = songMessages[Math.floor(Math.random() * songMessages.length)];
    
    // Personalizar com os nomes
    const recipient = toName === "você" ? "meu amor" : toName;
    const sender = fromName || "Seu admirador secreto";
    
    const personalizedMessage = randomMessage
      .replace('{toName}', recipient)
      .replace('{fromName}', sender);
    
    // Criar carta completa com contexto mais rico
    const fullLetter = `💕 ${personalizedMessage}

${timeData.days > 0 
  ? `Te amo há exatamente ${timeData.days} dias, ${timeData.hours} horas, ${timeData.minutes} minutos e ${timeData.seconds} segundos. Cada segundo ao seu lado é precioso! 💖` 
  : 'Te amo com toda intensidade do meu coração e quero passar toda minha vida ao seu lado! 💖'
}

Com todo meu amor e carinho,
${sender} 💌`;

    setGeneratedLetter(fullLetter);
    setIsGenerating(false);
    
    // Definir a música selecionada sem tocar automaticamente
    const songUrl = getSongUrl(randomSong);
    if (songUrl) {
      playSong({ title: randomSong, url: songUrl });
    }
    
    toast({
      title: "Carta criada com amor! ✨",
      description: `Uma declaração especial inspirada em ${randomSong}`,
    });
  };

  const generateSecretLetter = async () => {
    setIsGenerating(true);
    
    // Pequeno delay para criar suspense
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Escolher música aleatória das disponíveis
    const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];
    setSelectedSong(randomSong);
    
    // Escolher mensagem específica para a música selecionada (igual às cartas normais)
    const songMessages = songBasedMessages[randomSong] || [];
    const randomMessage = songMessages[Math.floor(Math.random() * songMessages.length)];
    
    // Personalizar com os nomes
    const recipient = toName === "você" ? "meu amor" : toName;
    const sender = fromName || "Seu admirador secreto";
    
    const personalizedMessage = randomMessage
      .replace('{toName}', recipient)
      .replace('{fromName}', sender);
    
    // Criar carta secreta com layout similar à pública, mas com toque especial
    const secretMessage = `💎 ${personalizedMessage}

Parabéns por ter resolvido nosso enigma especial! Isso prova que você realmente me conhece e se importa comigo. Esta carta é só nossa - um segredo bonito entre nós dois.

${timeData.days > 0 
  ? `Te amo há exatamente ${timeData.days} dias, ${timeData.hours} horas, ${timeData.minutes} minutos e ${timeData.seconds} segundos. Cada segundo ao seu lado é um tesouro que guardo no coração! 💖` 
  : 'Te amo com toda intensidade do meu coração e quero passar toda minha vida ao seu lado! 💖'
}

Você é meu segredo mais bonito, meu tesouro mais precioso. Esta música me lembra você sempre, mas agora ela também vai me lembrar deste momento especial que só nós dois compartilhamos.

Cada vez que "${randomSong}" tocar, vou sorrir pensando em como você foi esperto(a) e carinhoso(a) o suficiente para chegar até aqui.

Com todo meu amor secreto e eterno,
${sender} 💕🔐

P.S.: Guarde este momento no coração, porque é só nosso. Você é a pessoa mais especial do mundo para mim. 💎`;

    setGeneratedLetter(secretMessage);
    setIsGenerating(false);
    
    // Definir a música selecionada
    const songUrl = getSongUrl(randomSong);
    if (songUrl) {
      playSong({ title: randomSong, url: songUrl });
    }
    
    toast({
      title: "Carta secreta revelada! 💎✨",
      description: `Uma declaração especial inspirada em ${randomSong}`,
    });
  };

  const shareWhatsApp = () => {
    const message = `🎵 *Carta de Amor Musical* 🎵\n\n${generatedLetter}\n\n🎶 Inspirada na música: ${selectedSong}\n\n💕 Uma declaração especial para ${toName === "você" ? "você" : toName}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareEmail = () => {
    const subject = `💕 Uma Carta de Amor Musical para ${toName === "você" ? "Você" : toName}`;
    const body = `🎵 Carta de Amor Musical 🎵\n\n${generatedLetter}\n\n🎶 Inspirada na música: ${selectedSong}\n\n💕 Uma declaração especial criada com muito carinho!`;
    
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  return (
    <motion.div 
      className="relative z-10 py-12 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="love-card border-2 border-rose-gold shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-deep-rose font-playfair text-2xl">
              {isSecretMode ? (
                <>
                  <Star className="w-6 h-6 mr-2" />
                  💎 Sua Carta Secreta Especial
                </>
              ) : (
                <>
                  <Shuffle className="w-6 h-6 mr-2" />
                  Veja mais cartas de amor feitas por mim para você!
                </>
              )}
            </CardTitle>
            <p className="text-gray-600 font-dancing text-lg">
              {isSecretMode ? "Uma declaração íntima só para nós dois" : ""}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isSecretMode ? (
              // Modo carta secreta - mostra loading ou carta
              !generatedLetter ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center justify-center mb-4"
                  >
                    <Heart className="w-8 h-8 text-romantic-gold" />
                  </motion.div>
                  <p className="text-lg text-gray-600 font-dancing">
                    Revelando sua carta secreta especial...
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Carta Secreta Gerada */}
                  <div className="bg-gradient-to-br from-rose-gold/20 to-romantic-gold/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-romantic-gold/50">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-romantic-gold mr-2" />
                      <span className="text-romantic-gold font-semibold">
                        Carta Secreta Inspirada em: {selectedSong}
                      </span>
                    </div>
                    
                    <div className="font-playfair text-lg text-gray-700 leading-relaxed whitespace-pre-line love-text">
                      {generatedLetter}
                    </div>
                  </div>
                  
                  {/* Botões de Compartilhamento para carta secreta */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-deep-rose mr-2" />
                      <span className="text-deep-rose font-semibold">Compartilhar esta carta secreta:</span>
                    </div>
                    
                    <div className="flex justify-center space-x-4 flex-wrap gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={shareWhatsApp}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                          data-testid="button-share-whatsapp-secret"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          WhatsApp
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={shareEmail}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                          data-testid="button-share-email-secret"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          E-mail
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Botão para gerar nova carta secreta */}
                  <div className="text-center pt-4">
                    <Button
                      onClick={generateSecretLetter}
                      disabled={isGenerating}
                      variant="outline"
                      className="border-romantic-gold text-romantic-gold hover:bg-romantic-gold hover:text-white"
                      data-testid="button-generate-new-secret"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Nova Carta Secreta
                    </Button>
                  </div>
                </motion.div>
              )
            ) : !generatedLetter ? (
              <div className="text-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={generateRandomLetter}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-deep-rose to-romantic-gold hover:from-romantic-gold hover:to-deep-rose text-white px-8 py-4 text-lg font-dancing"
                    data-testid="button-generate-letter"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Heart className="w-5 h-5" />
                        </motion.div>
                        Criando magia...
                      </>
                    ) : (
                      <>
                        <Shuffle className="w-5 h-5 mr-2" />
                        Mostrar Carta Surpresa
                      </>
                    )}
                  </Button>
                </motion.div>

              </div>

            ) : generatedLetter ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Carta Gerada */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-gold/30">
                  <div className="flex items-center mb-4">
                    <Music className="w-5 h-5 text-romantic-gold mr-2" />
                    <span className="text-romantic-gold font-semibold">
                      Inspirada em: {selectedSong}
                    </span>
                  </div>
                  
                  <div className="font-playfair text-lg text-gray-700 leading-relaxed whitespace-pre-line love-text">
                    {generatedLetter}
                  </div>
                </div>
                
                {/* Botões de Compartilhamento */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-deep-rose mr-2" />
                    <span className="text-deep-rose font-semibold">Compartilhar esta carta:</span>
                  </div>
                  
                  <div className="flex justify-center space-x-4 flex-wrap gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={shareWhatsApp}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                        data-testid="button-share-whatsapp"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={shareEmail}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                        data-testid="button-share-email"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        E-mail
                      </Button>
                    </motion.div>
                  </div>
                </div>
                
                {/* Botões para gerar nova carta */}
                <div className="text-center pt-4 space-y-3">
                  <div className="flex justify-center space-x-4 flex-wrap gap-3">
                    <Button
                      onClick={() => setGeneratedLetter("")}
                      disabled={isGenerating}
                      variant="outline"
                      className="border-deep-rose text-deep-rose hover:bg-deep-rose hover:text-white"
                      data-testid="button-generate-new"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Nova Carta
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}