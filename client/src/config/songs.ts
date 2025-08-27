// Configuração das URLs das músicas do MinIO
// Substitua as URLs vazias pelas URLs reais do seu MinIO

export const songUrls: Record<string, string> = {
  "Enchanted": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Enchanted+(Taylor's+Version)+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para Enchanted
  "Daylight": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Daylight+(Official+Audio).mp3", // Cole aqui a URL do MinIO para Daylight
  "Lover": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Lover+(Official+Music+Video).mp3", // Cole aqui a URL do MinIO para Lover
  "The Archer": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+The+Archer+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para The Archer
  "Love Story": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Love+Story.mp3", // Cole aqui a URL do MinIO para Love Story
  "All Too Well": "https://f005.backblazeb2.com/file/Swiftlove/All+Too+Well+(10+Minute+Version)+(Taylor's+Version)+(From+The+Vault)+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para All Too Well
  "Cruel Summer": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Cruel+Summer+(Official+Audio).mp3", // Cole aqui a URL do MinIO para Cruel Summer
  "Safe & Sound": "https://f005.backblazeb2.com/file/Swiftlove/Safe+%26+Sound+feat.+The+Civil+Wars+(The+Hunger+Games%EF%BC%9A+Songs+From+District+12+And+Beyond).mp3", // Cole aqui a URL do MinIO para Safe & Sound
  "Begin Again": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Begin+Again.mp3", // Cole aqui a URL do MinIO para Begin Again
  "Sweet Nothing": "https://f005.backblazeb2.com/file/Swiftlove/taylor+swift+-+sweet+nothing+(tradu%C3%A7%C3%A3o%E2%A7%B8legendado).mp3", // Cole aqui a URL do MinIO para Sweet Nothing
  "Everything Has Changed": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Everything+Has+Changed+ft.+Ed+Sheeran.mp3", // Cole aqui a URL do MinIO para Everything Has Changed
  "End Game": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+End+Game+ft.+Ed+Sheeran%2C+Future.mp3", // Cole aqui a URL do MinIO para End Game
  "Style": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Style.mp3", // Cole aqui a URL do MinIO para Style
  "You Belong With Me": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+You+Belong+With+Me.mp3", // Cole aqui a URL do MinIO para You Belong With Me
  "Bad Blood": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Bad+Blood+ft.+Kendrick+Lamar.mp3", // Cole aqui a URL do MinIO para Bad Blood
  "Wildest Dreams": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Wildest+Dreams.mp3", // Cole aqui a URL do MinIO para Wildest Dreams
  "Forever & Always": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Forever+%26+Always+(Taylor's+Version)+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para Forever & Always
  "Back To December": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Back+To+December.mp3", // Cole aqui a URL do MinIO para Back To December
  "Invisible String": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+%E2%80%93+invisible+string+(Official+Lyric+Video).mp3", // Cole aqui a URL do MinIO para Invisible String
  "You Are In Love": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+You+Are+In+Love+(Taylor's+Version)+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para You Are In Love
  "Fearless": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Fearless+(Taylor's+Version)+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para Fearless
  "Red": "https://f005.backblazeb2.com/file/Swiftlove/Taylor+Swift+-+Red+(Taylor's+Version)+(Lyric+Video).mp3", // Cole aqui a URL do MinIO para Red
  
  // Músicas do gerador de cartas aleatórias que ainda precisam de URL
  "Blank Space": "", // Cole aqui a URL do MinIO para Blank Space
  "Cardigan": "", // Cole aqui a URL do MinIO para Cardigan
  "Willow": "", // Cole aqui a URL do MinIO para Willow
  "Anti-Hero": "", // Cole aqui a URL do MinIO para Anti-Hero
  "Lavender Haze": "", // Cole aqui a URL do MinIO para Lavender Haze
  "Midnight Rain": "", // Cole aqui a URL do MinIO para Midnight Rain
  "Karma": "", // Cole aqui a URL do MinIO para Karma
  "Paper Rings": "", // Cole aqui a URL do MinIO para Paper Rings
  "August": "", // Cole aqui a URL do MinIO para August
  "Folklore": "", // Cole aqui a URL do MinIO para Folklore
  "The 1": "", // Cole aqui a URL do MinIO para The 1
  "Champagne Problems": "", // Cole aqui a URL do MinIO para Champagne Problems
  "Evermore": "", // Cole aqui a URL do MinIO para Evermore
  "Right Where You Left Me": "", // Cole aqui a URL do MinIO para Right Where You Left Me
};

// Função helper para obter URL da música
export function getSongUrl(title: string): string {
  return songUrls[title] || "";
}

// Função helper para verificar se uma música tem URL configurada
export function hasSongUrl(title: string): boolean {
  return !!songUrls[title];
}