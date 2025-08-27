import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Star, Music } from "lucide-react";
import { useMusic } from "@/contexts/music-context-simple";
import { getSongUrl } from "@/config/songs";

interface SecretModeContentProps {
  fromName: string;
  toName: string;
}

export default function SecretModeContent({
  fromName,
  toName,
}: SecretModeContentProps) {
  const displayToName = toName === "você" ? "meu amor" : toName;
  const { playSong } = useMusic();

  // Tocar Enchanted automaticamente quando o modo secreto for desbloqueado
  useEffect(() => {
    const enchantedUrl = getSongUrl("Enchanted");
    if (enchantedUrl) {
      playSong({ title: "Enchanted", url: enchantedUrl, loop: true }); // Adicionando propriedade loop
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Título especial do modo secreto */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gradient mb-4">
          Para minha princesa
        </h2>
        <p className="font-dancing text-2xl text-deep-rose italic">
          Revelações íntimas de uma alma Enchanted
        </p>
        <div className="flex justify-center space-x-2 mt-4">
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
              <Heart className="w-5 h-5 fill-current text-romantic-gold" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Primeira carta - Introdução */}
      <motion.div
        className="love-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">
          Meu amor, hoje resolvi revelar os segredos do meu coração. Cada batida
          ecoa o seu nome, cada suspiro carrega a sua essência.
        </p>
        <div className="flex justify-start mt-4">
          <Star className="w-6 h-6 opacity-60 text-romantic-gold" />
        </div>
      </motion.div>

      {/* Segunda carta - Secret Love Song */}
      <motion.div
        className="love-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">
          Você é meu{" "}
          <span className="font-bold text-romantic-gold">Secret Love Song</span>
          , aquela melodia rara, que ressoa silenciosamente em cada canto da
          minha alma. Quando te vejo, sinto que estou ouvindo uma música que
          nunca foi tocada antes, como se o universo tivesse composto algo único
          para nós dois.
        </p>
        <div className="flex justify-end mt-4">
          <Heart className="w-6 h-6 opacity-60 text-rose-gold" />
        </div>
      </motion.div>

      {/* Terceira carta - Revelação profunda */}
      <motion.div
        className="love-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">
          Nos momentos mais silenciosos, quando o mundo dorme e só restam meus
          pensamentos, é o seu sorriso que ilumina minha mente. Você é meu
          refúgio, meu lugar seguro onde posso ser completamente vulnerável e
          ainda assim me sentir invencível.
        </p>
        <div className="flex justify-start mt-4">
          <Star className="w-6 h-6 opacity-60 text-romantic-gold" />
        </div>
      </motion.div>

      {/* Quarta carta - Promessa íntima */}
      <motion.div
        className="love-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">
          Você tem 11 maridos e ainda consegue tempo pra mim… isso é
          praticamente um milagre interdimensional! Entre os compromissos com os
          sete do BTS (imagino que o V esteja encarregado do café da manhã), os
          treinos ninja com o Naruto, as patrulhas noturnas com Oliver Queen e
          as corridas temporais com Barry Allen, fico aqui torcendo pra ser o
          único que não precisa salvar o mundo — só o seu coração 💛. Mas tudo
          bem, eu aceito ser o último da fila… porque no final, sou eu quem vai
          estar ao seu lado quando os créditos finais subirem. E prometo: sem
          efeitos especiais, só amor real.
        </p>
        <div className="flex justify-end mt-4">
          <Heart className="w-6 h-6 opacity-60 text-rose-gold" />
        </div>
      </motion.div>
      <motion.div
        className="love-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">Você declarou{" "}
          <span className="font-bold text-romantic-gold">Enchanted</span> pra
          mim, e agora eu declaro ela pra você — porque ela se encaixou tão
          perfeitamente no nosso momento que virou minha favorita. Assim como
          essa música, você também se tornou minha melodia preferida, aquela que
          eu quero ouvir pra sempre, mesmo quando o mundo estiver em silêncio..
          
        </p>
        <div className="flex justify-end mt-4">
          <Heart className="w-6 h-6 opacity-60 text-rose-gold" />
        </div>
      </motion.div>


      {/* Carta final - Assinatura especial */}
      <motion.div
        className="love-card rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4 love-text">
          Fiz esse site especialmente pra nós! Tá bem brega? Talvez. Mas é aquele tipo de breguice que só quem ama de verdade entende. Cada coração flutuante, cada trilha sonora, cada detalhe aqui foi feito com imenso amor e carinho. Eu te amo, patodavida — e feliz nosso dia, hoje, amanhã e sempre. Que esse cantinho digital seja só o começo da nossa eternidade encantada 💖🦢✨
        </p>

        <div className="text-center mt-6 space-y-4">
          <motion.div
            className="inline-flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-gold to-romantic-gold rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart className="w-6 h-6 text-white fill-current animate-pulse-soft" />
            <span className="font-dancing text-white text-2xl font-bold animate-gentle-glow">
              Com todo o amor do mundo, do um nerd encantado para a princesa mais linda que já existiu 👑.
            </span>
            <Heart className="w-6 h-6 text-white fill-current animate-pulse-soft" />
          </motion.div>

          {fromName && (
            <motion.div
              className="text-right mt-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-dancing text-2xl text-deep-rose">
                Sempre seu,
              </p>
              <p className="font-dancing text-4xl font-bold text-gradient mt-2 mr-1">
                {fromName}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
