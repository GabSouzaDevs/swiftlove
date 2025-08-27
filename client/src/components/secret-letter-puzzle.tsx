import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SecretLetterPuzzleProps {
  fromName: string;
  toName: string;
  onSolved: () => void;
}

const riddles = [
  {
    question: "Complete a frase: 'I was _______ to meet you'",
    answer: "enchanted",
    hint: "Uma palavra mágica que a Taylor canta em uma música sobre encontrar alguém especial",
  },
  {
    question: "Complete: 'You belong with _____'",
    answer: "me",
    hint: "A música mais famosa sobre pertencer a alguém",
  },
  {
    question: "Complete: 'We never go out of _____'",
    answer: "style",
    hint: "Uma música sobre um amor que nunca sai de moda",
  },
  {
    question: "Complete: 'Love is golden like _______'",
    answer: "daylight",
    hint: "A música que fala sobre ver tudo em cores douradas",
  },
  {
    question: "Complete: 'You were my crown, now I'm in _____'",
    answer: "exile",
    hint: "Uma música melancólica sobre estar longe de quem amamos",
  },
];

const personalQuestions = [
  {
    question: "Quando nos vimos pela primeira vez? Pense bem...",
    options: ["Na igreja", "Em um aniversário", "Na porta de casa", "Na rua"],
    correctAnswer: 2, // índice da resposta correta (C)
  },
  {
    question: "Quando é o nosso aniversário?",
    options: ["28 de março", "30 de março", "11 de março", "1 de abril"],
    correctAnswer: 0, // índice da resposta correta (A)
  },
  {
    question: "Qual o meu anime favorito?",
    options: ["Naruto", "Full Metal Alchemist", "One Piece", "Attack on Titan"],
    correctAnswer: 2, // índice da resposta correta (C)
  },
  {
    question: "Para onde fomos no nosso primeiro encontro?",
    options: ["Restaurante", "Cinema", "Balada", "Praia"],
    correctAnswer: 1, // índice da resposta correta (B)
  },
  {
    question: "O quanto eu te amo?",
    options: ["Muito", "Muito muito", "Muito muito muito", "Patodavida!!!"],
    correctAnswer: 3, // índice da resposta correta (D)
  },
];

const heartSequences = [
  [1, 3, 2, 4], // Sequência: coração 1, depois 3, depois 2, depois 4
  [2, 1, 4, 3],
  [3, 4, 1, 2],
  [4, 2, 3, 1],
  [1, 2, 3, 4],
];

export default function SecretLetterPuzzle({
  fromName,
  toName,
  onSolved,
}: SecretLetterPuzzleProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentRiddle] = useState(
    riddles[Math.floor(Math.random() * riddles.length)],
  );
  const [heartSequence] = useState(
    heartSequences[Math.floor(Math.random() * heartSequences.length)],
  );
  const [clickedHearts, setClickedHearts] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentPersonalQuestion] = useState(
    personalQuestions[Math.floor(Math.random() * personalQuestions.length)],
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const { toast } = useToast();

  const checkAnswer = () => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrect = currentRiddle.answer.toLowerCase().trim();

    if (normalizedAnswer === normalizedCorrect) {
      setCurrentStep(2);
      toast({
        title: "Primeira fase completa! 🎉",
        description: "Agora clique nos corações na sequência certa...",
      });
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 2) {
        setShowHint(true);
      }
      toast({
        title: "Resposta incorreta 💔",
        description:
          attempts >= 1
            ? "Quer uma dica? Clique no botão de dica!"
            : "Tente novamente!",
        variant: "destructive",
      });
    }
  };

  const checkPersonalAnswer = () => {
    if (selectedAnswer === currentPersonalQuestion.correctAnswer) {
      setCurrentStep(4);
      toast({
        title: "Pergunta pessoal correta! 💕",
        description: "Você é realmente você!...",
      });
      setTimeout(() => {
        toast({
          title: "Enigma resolvido! 🎉💕",
          description: "Você desbloqueou o modo secreto!",
        });
        setTimeout(onSolved, 1000);
      }, 1500);
    } else {
      setIsBlocked(true);
      toast({
        title: "Resposta incorreta 💔",
        description: "A carta ficou bloqueada...",
        variant: "destructive",
      });
    }
  };

  const handleHeartClick = (heartNumber: number) => {
    const newClickedHearts = [...clickedHearts, heartNumber];
    setClickedHearts(newClickedHearts);

    // Verificar se a sequência está correta até agora
    const expectedSequence = heartSequence.slice(0, newClickedHearts.length);
    const isCorrectSoFar = newClickedHearts.every(
      (heart, index) => heart === expectedSequence[index],
    );

    if (!isCorrectSoFar) {
      // Sequência incorreta, resetar
      setTimeout(() => {
        setClickedHearts([]);
        toast({
          title: "Sequência incorreta 💔",
          description: "Tente novamente! Clique nos corações na ordem certa.",
          variant: "destructive",
        });
      }, 500);
      return;
    }

    // Verificar se completou a sequência
    if (newClickedHearts.length === heartSequence.length) {
      setTimeout(() => {
        setCurrentStep(3);
        toast({
          title: "Segunda fase completa! 🎉💕",
          description: "Agora uma pergunta mais pessoal...",
        });
      }, 500);
    }
  };

  const resetHearts = () => {
    setClickedHearts([]);
    toast({
      title: "Sequência resetada",
      description: "Tente novamente!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Indicador de progresso */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
              step < currentStep
                ? "bg-green-500 border-green-500 text-white"
                : step === currentStep
                  ? "bg-deep-rose border-deep-rose text-white animate-pulse"
                  : "bg-gray-200 border-gray-300 text-gray-500"
            }`}
          >
            {step < currentStep ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ✓
              </motion.div>
            ) : step === 4 && currentStep === 4 ? (
              <Unlock className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="love-card border-2 border-rose-gold">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-deep-rose font-playfair text-xl">
                  <Lock className="w-5 h-5 mr-2" />
                  Primeira Pista: Música da Taylor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4 font-dancing">
                    {currentRiddle.question}
                  </p>

                  <div className="space-y-4">
                    <Input
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Digite sua resposta..."
                      className="text-center text-lg"
                      onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                      data-testid="puzzle-answer-input"
                    />

                    <div className="flex justify-center space-x-3">
                      <Button
                        onClick={checkAnswer}
                        className="bg-gradient-to-r from-deep-rose to-romantic-gold hover:from-romantic-gold hover:to-deep-rose text-white"
                        data-testid="button-check-answer"
                      >
                        Verificar Resposta
                      </Button>

                      {showHint && (
                        <Button
                          onClick={() =>
                            toast({
                              title: "Dica 💡",
                              description: currentRiddle.hint,
                            })
                          }
                          variant="outline"
                          className="border-romantic-gold text-romantic-gold"
                          data-testid="button-show-hint"
                        >
                          Ver Dica
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="love-card border-2 border-rose-gold">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-deep-rose font-playfair text-xl">
                  <Heart className="w-5 h-5 mr-2" />
                  Segunda Pista: Sequência dos Corações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-6 font-dancing">
                    Clique nos corações na sequência:{" "}
                    {heartSequence.join(" → ")}
                  </p>

                  <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                    {[1, 2, 3, 4].map((heartNumber) => {
                      const isClicked = clickedHearts.includes(heartNumber);
                      const clickOrder = clickedHearts.indexOf(heartNumber) + 1;

                      return (
                        <motion.button
                          key={heartNumber}
                          onClick={() => handleHeartClick(heartNumber)}
                          className={`relative w-20 h-20 rounded-full border-4 transition-all duration-300 ${
                            isClicked
                              ? "bg-deep-rose border-deep-rose text-white shadow-lg scale-110"
                              : "bg-white border-rose-gold text-rose-gold hover:bg-rose-gold/10 hover:scale-105"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-testid={`heart-${heartNumber}`}
                        >
                          <Heart className="w-8 h-8 mx-auto fill-current" />
                          <span className="absolute -top-2 -right-2 w-6 h-6 bg-romantic-gold text-white rounded-full text-sm font-bold flex items-center justify-center">
                            {heartNumber}
                          </span>
                          {isClicked && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white text-deep-rose rounded-full text-sm font-bold flex items-center justify-center"
                            >
                              {clickOrder}
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={resetHearts}
                      variant="outline"
                      className="border-gray-400 text-gray-600"
                      data-testid="button-reset-hearts"
                    >
                      Recomeçar Sequência
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 3 && !isBlocked && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="love-card border-2 border-rose-gold">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-deep-rose font-playfair text-xl">
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Pergunta Pessoal: Só por precaução...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-6 font-dancing">
                    {currentPersonalQuestion.question}
                  </p>

                  <div className="space-y-3 mb-6">
                    {currentPersonalQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedAnswer === index
                            ? "bg-deep-rose border-deep-rose text-white"
                            : "bg-white border-gray-300 text-gray-700 hover:border-rose-gold hover:bg-rose-gold/5"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-testid={`option-${index}`}
                      >
                        <span className="font-medium mr-3">
                          {String.fromCharCode(65 + index)} -
                        </span>
                        {option}
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800 font-medium">
                      ⚠️ Atenção: Você tem apenas UMA chance! Se errar, a carta
                      ficará bloqueada.
                    </p>
                  </div>

                  <Button
                    onClick={checkPersonalAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-deep-rose to-romantic-gold hover:from-romantic-gold hover:to-deep-rose text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-check-personal"
                  >
                    Confirmar Resposta Final
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {isBlocked && (
          <motion.div
            key="blocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="love-card border-2 border-red-500 bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="text-center py-8">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4"
                >
                  <Lock className="w-16 h-16 text-red-600 mx-auto" />
                </motion.div>

                <h3 className="text-2xl font-bold text-red-700 mb-2 font-playfair">
                  Carta Bloqueada! 🔒
                </h3>
                <p className="text-red-600 font-dancing text-lg mb-4">
                  Você não parece ser a Malu!
                </p>
                <p className="text-red-600 font-dancing text-lg mb-4">
                  Essa é uma carta restrita apenas para meu amor! 💖
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="love-card border-2 border-green-500 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="text-center py-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4"
                >
                  <Unlock className="w-16 h-16 text-green-600 mx-auto" />
                </motion.div>

                <h3 className="text-2xl font-bold text-green-700 mb-2 font-playfair">
                  Parabéns! 🎉
                </h3>
                <p className="text-green-600 font-dancing text-lg">
                  Você realmente me conhece! Modo secreto desbloqueado!
                </p>

                <div className="flex justify-center space-x-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
