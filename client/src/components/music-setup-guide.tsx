import { motion } from "framer-motion";
import { Music, ExternalLink, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MusicSetupGuideProps {
  onClose: () => void;
}

export default function MusicSetupGuide({ onClose }: MusicSetupGuideProps) {
  return (
    <motion.div
      className="modal-overlay flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-2xl love-card border-2 border-romantic-gold shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-deep-rose font-playfair">
              <Music className="w-6 h-6 mr-2" />
              Configuração das Músicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-soft-lavender rounded-lg">
              <Info className="w-5 h-5 text-romantic-gold mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-2">Para ativar a reprodução de música:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Faça upload dos arquivos MP3 das músicas para seu MinIO</li>
                  <li>Copie as URLs públicas de cada arquivo</li>
                  <li>Edite o arquivo <code className="bg-gray-200 px-1 rounded">client/src/config/songs.ts</code></li>
                  <li>Cole as URLs correspondentes para cada música</li>
                </ol>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Músicas que precisam de URL:</p>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {[
                  "Enchanted", "Daylight", "Lover", "The Archer", "Love Story",
                  "All Too Well", "Cruel Summer", "Safe & Sound", "Begin Again", "Sweet Nothing",
                  "Everything Has Changed", "End Game", "Style", "You Belong With Me", "Bad Blood",
                  "Wildest Dreams", "Forever & Always", "Back To December", "Invisible String",
                  "You Are In Love", "Fearless", "Red"
                ].map((song) => (
                  <div key={song} className="text-xs bg-cream p-2 rounded">
                    {song}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-deep-rose to-romantic-gold hover:from-romantic-gold hover:to-deep-rose text-white"
                data-testid="button-close-guide"
              >
                Entendi
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}