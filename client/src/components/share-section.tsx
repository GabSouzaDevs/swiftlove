import { motion } from "framer-motion";
import { Share2, MessageCircle, Instagram, Facebook, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const shareButtons = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "text-green-600",
    action: "shareWhatsApp",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    action: "shareInstagram",
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    action: "shareFacebook",
  },
  {
    name: "Copy Link",
    icon: Link2,
    color: "text-gray-600",
    action: "copyLink",
  },
];

interface ShareSectionProps {
  fromName: string;
  toName: string;
}

export default function ShareSection({ fromName, toName }: ShareSectionProps) {
  const { toast } = useToast();

  const handleShare = (action: string) => {
    // Criar URL com parâmetros de personalização
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const urlParams = new URLSearchParams();
    
    if (fromName) {
      urlParams.set('from', fromName);
    }
    if (toName && toName !== "você") {
      urlParams.set('to', toName);
    }
    
    const url = urlParams.toString() ? 
      `${baseUrl}?${urlParams.toString()}` : 
      baseUrl;
    
    const text = fromName && toName !== "você" ? 
      `${fromName} preparou uma declaração de amor especial para ${toName}! 💕` :
      "Confira esta declaração de amor especial! 💕";
    
    switch (action) {
      case "shareWhatsApp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
        break;
      case "shareInstagram":
        // Instagram doesn't support direct URL sharing, so we copy the link
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "Cole o link em sua story do Instagram",
        });
        break;
      case "shareFacebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copyLink":
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para sua área de transferência",
        });
        break;
    }
  };

  return (
    <section className="relative z-10 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h3 
          className="font-playfair text-2xl text-gray-700 mb-6 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Share2 className="w-6 h-6 mr-2 text-deep-rose" />
          Compartilhe este amor
        </motion.h3>
        
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          {shareButtons.map((button, index) => {
            const IconComponent = button.icon;
            
            return (
              <motion.div
                key={button.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleShare(button.action)}
                  className="love-card p-4 rounded-full hover:bg-soft-pink transition-all duration-300 group"
                  data-testid={`button-${button.action}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className={`w-6 h-6 ${button.color} group-hover:scale-110 transition-transform`} />
                  </motion.div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}