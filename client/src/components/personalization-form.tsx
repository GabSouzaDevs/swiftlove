import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Heart, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalizationFormProps {
  onPersonalize: (fromName: string, toName: string) => void;
  fromName: string;
  toName: string;
}

export default function PersonalizationForm({ onPersonalize, fromName, toName }: PersonalizationFormProps) {
  const [localFromName, setLocalFromName] = useState(fromName);
  const [localToName, setLocalToName] = useState(toName);
  const [isOpen, setIsOpen] = useState(false);

  // Sincronizar os valores locais quando as props mudarem (via URL)
  useEffect(() => {
    setLocalFromName(fromName);
    setLocalToName(toName);
  }, [fromName, toName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPersonalize(localFromName, localToName);
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="lg"
          className="love-card border-2 border-deep-rose text-deep-rose hover:bg-deep-rose hover:text-white transition-all duration-300"
          data-testid="button-personalize"
        >
          <Edit3 className="w-5 h-5 mr-2" />
          Personalizar Carta
        </Button>
      </motion.div>

      {isOpen && (
        <motion.div
          className="modal-overlay flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md love-card border-2 border-rose-gold shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-deep-rose font-playfair">
                  <Heart className="w-6 h-6 mr-2 fill-current" />
                  Personalizar Declaração
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fromName" className="text-gray-700 font-medium flex items-center">
                      <User className="w-4 h-4 mr-2 text-deep-rose" />
                      De (quem escreve):
                    </Label>
                    <Input
                      id="fromName"
                      type="text"
                      value={localFromName}
                      onChange={(e) => setLocalFromName(e.target.value)}
                      placeholder="Seu nome"
                      className="border-rose-gold focus:border-deep-rose"
                      data-testid="input-from-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toName" className="text-gray-700 font-medium flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-romantic-gold fill-current" />
                      Para (destinatário):
                    </Label>
                    <Input
                      id="toName"
                      type="text"
                      value={localToName}
                      onChange={(e) => setLocalToName(e.target.value)}
                      placeholder="Nome da pessoa especial"
                      className="border-rose-gold focus:border-deep-rose"
                      data-testid="input-to-name"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 border-gray-300 text-gray-600"
                      data-testid="button-cancel"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-deep-rose to-romantic-gold hover:from-romantic-gold hover:to-deep-rose text-white border-0"
                      data-testid="button-apply"
                    >
                      Aplicar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}