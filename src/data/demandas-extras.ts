import { GameCard } from '@/types';

export const CARTAS_EXTRAS_REGIONAL: GameCard[] = [
  // Demandas regionais
  {
    id: 'extra-demanda-pousada-itacare',
    tipo: 'demanda',
    titulo: 'Café da Manhã na Pousada de Charme',
    narrativa: 'Uma pousada boutique no litoral sul quer oferecer pequenos bombons de cacau cabruca 70% com recheio de maracujá nas almofadas dos hóspedes como mimo de boas-vindas. Querem 40 unidades semanais!',
    efeitoRegra: 'Contrato recorrente. Se o padrão de qualidade for aprovado, garante entrada contínua de caixa.',
    testeSugerido: { pericia: 'Administração', atributo: 'int', cd: 15 },
    fonte: 'extra'
  },
  {
    id: 'extra-demanda-casamento-fazenda',
    tipo: 'demanda',
    titulo: 'Mesa de Doces em Casamento Histórico',
    narrativa: 'Os noivos alugaram uma antiga fazenda colonial de cacau e querem uma mesa temática só com chocolates e trufas artesanais locais. Encomenda de 120 unidades de sabores finos.',
    efeitoRegra: 'Volume grande com alta exigência estética. Pagam 50% de adiantamento no caixa na confirmação.',
    testeSugerido: { pericia: 'Confeiteiro', atributo: 'des', cd: 16 },
    fonte: 'extra'
  },
  {
    id: 'extra-demanda-visita-cruzeiro',
    tipo: 'demanda',
    titulo: 'Parada do Navio Transatlântico',
    narrativa: 'Um navio de cruzeiro com centenas de turistas acaba de atracar no Porto de Ilhéus. Uma guia turística amiga propõe levar um grupo de 30 turistas para conhecer a produção e degustar os doces da equipe.',
    efeitoRegra: 'Venda imediata em dinheiro vivo e em moeda forte. Exige recepção calorosa e história sobre o cacau.',
    testeSugerido: { pericia: 'Diplomacia', atributo: 'car', cd: 14 },
    fonte: 'extra'
  },
  {
    id: 'extra-demanda-escola-pascoa',
    tipo: 'demanda',
    titulo: 'Comemoração dos Professores da Escola',
    narrativa: 'A diretoria de uma escola particular encomendou 25 kits de miniovos de Páscoa para homenagear o corpo docente antes do recesso escolar.',
    efeitoRegra: 'Cliente confiável que paga à vista na entrega. Prazo de 48 horas.',
    testeSugerido: { pericia: 'Planejamento', atributo: 'int', cd: 15 },
    fonte: 'extra'
  },
  {
    id: 'extra-demanda-confraria-cacau',
    tipo: 'demanda',
    titulo: 'Degustação na Confraria do Cacau Fino',
    narrativa: 'Produtores rurais premiados de cacau cabruca organizaram um encontro técnico e querem uma sobremesa inovadora que una chocolate meio amargo com geleia de frutas nativas da Mata Atlântica.',
    efeitoRegra: 'Se for bem-sucedido, gera +4 REP e abre portas para comprar sementes e amêndoas direto da roça.',
    testeSugerido: { pericia: 'Criatividade', atributo: 'car', cd: 16 },
    fonte: 'extra'
  },

  // Obstáculos regionais
  {
    id: 'extra-obstaculo-mormaco-baiano',
    tipo: 'obstaculo',
    titulo: 'Mormaço & Umidade da Costa',
    narrativa: 'Um dia abafado e úmido típico do litoral sul baiano faz com que o chocolate demore muito mais para resfriar, com risco de esbranquiçar (fat bloom) se tirado antes da hora.',
    efeitoRegra: 'Exige deixar o dobro de tempo na geladeira, ocupando espaço e atrasando os próximos lotes.',
    testeSugerido: { pericia: 'Fabricar', atributo: 'des', cd: 15 },
    fonte: 'extra'
  },
  {
    id: 'extra-obstaculo-transito-ponte',
    tipo: 'obstaculo',
    titulo: 'Retenção na Ponte Jorge Amado',
    narrativa: 'O trânsito parou completamente sobre a ponte estaiada no horário de pico justo quando vocês estavam a caminho da entrega do pedido refrigerado!',
    efeitoRegra: 'Risco de atrasar a entrega e o chocolate amolecer no calor. Exige agilidade e comunicação imediata com o cliente.',
    testeSugerido: { pericia: 'Agilidade', atributo: 'con', cd: 15 },
    fonte: 'extra'
  },
  {
    id: 'extra-obstaculo-formigas-acucar',
    tipo: 'obstaculo',
    titulo: 'Invasão das Formigas Doceiras',
    narrativa: 'Uma trilha de formiguinhas encontrou um pote de açúcar e leite em pó destampado na despensa durante a madrugada!',
    efeitoRegra: 'Descarte obrigatório dos insumos contaminados para preservar a Ética (ETI). Custo de reposição de R$ 25.',
    testeSugerido: { pericia: 'Administração', atributo: 'int', cd: 14 },
    fonte: 'extra'
  },

  // Vantagens regionais
  {
    id: 'extra-vantagem-amendoas-premiadas',
    tipo: 'vantagem',
    titulo: 'Presente de Amêndoas Cabruca',
    narrativa: 'Um amigo de infância cuja família tem roça de cacau tradicional na estrada de Uruçuca presenteou a equipe com 2 kg de amêndoas de cacau fermentadas e torradas de altíssima qualidade!',
    efeitoRegra: 'Permite criar trufas e nibs artesanais de graça no próximo lote, aumentando a margem de lucro.',
    fonte: 'extra'
  },
  {
    id: 'extra-vantagem-materia-jornal',
    tipo: 'vantagem',
    titulo: 'Destaque no Caderno Regional',
    narrativa: 'Um jornal da região fez uma reportagem sobre novos empreendedores universitários que valorizam a tradição cacaueira e citou a marca de vocês!',
    efeitoRegra: 'Aumente +6 pontos em REP e reduza a CD do próximo teste de Diplomacia em 2 pontos.',
    fonte: 'extra'
  }
];
