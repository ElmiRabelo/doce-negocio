import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Doce Negócio · Guia do Mestre RPG',
    short_name: 'Doce Negócio',
    description: 'Ferramenta de auxílio e escudo do mestre para o RPG de mesa Doce Negócio',
    start_url: '/',
    display: 'standalone',
    background_color: '#25150E',
    theme_color: '#381F14',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
