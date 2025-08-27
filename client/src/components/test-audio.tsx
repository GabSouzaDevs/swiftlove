import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TestAudioProps {
  url: string;
}

export default function TestAudio({ url }: TestAudioProps) {
  const [status, setStatus] = useState<string>("pronto");

  const testDirectAudio = () => {
    setStatus("testando...");
    const audio = new Audio(url);
    
    audio.addEventListener("loadstart", () => setStatus("iniciando carregamento..."));
    audio.addEventListener("loadedmetadata", () => setStatus("metadata carregada"));
    audio.addEventListener("canplay", () => setStatus("pronto para tocar"));
    audio.addEventListener("playing", () => setStatus("tocando"));
    audio.addEventListener("error", (e) => {
      const target = e.target as HTMLAudioElement;
      let errorMsg = "erro desconhecido";
      
      if (target?.error) {
        switch (target.error.code) {
          case 1: errorMsg = "MEDIA_ERR_ABORTED"; break;
          case 2: errorMsg = "MEDIA_ERR_NETWORK"; break;
          case 3: errorMsg = "MEDIA_ERR_DECODE"; break;
          case 4: errorMsg = "MEDIA_ERR_SRC_NOT_SUPPORTED"; break;
        }
      }
      
      setStatus(`erro: ${errorMsg}`);
      console.error("Detalhes do erro:", { 
        error: target?.error, 
        src: target?.src,
        networkState: target?.networkState,
        readyState: target?.readyState
      });
    });
    
    audio.play().catch(err => {
      setStatus(`erro na reprodução: ${err.message}`);
      console.error("Erro de play:", err);
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Teste Direto de Áudio</h3>
      <p className="text-sm mb-2">Status: <span className="font-mono">{status}</span></p>
      <Button onClick={testDirectAudio} size="sm" data-testid="button-test-audio">
        Testar URL
      </Button>
      
      {/* Alternativa: tag HTML audio direta */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Teste com tag HTML:</h4>
        <audio controls preload="metadata" className="w-full">
          <source src={url} type="audio/mpeg" />
          Seu navegador não suporta o elemento audio.
        </audio>
      </div>
    </div>
  );
}