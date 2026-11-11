export interface ItemCatalogo {
  id: string;
  nome: string;
  tipo: 'utensilio' | 'embalagem' | 'insumo';
  categoria: string;
  precoPadrao: number;
  quantidadeEmbalagem: number;
  unidade: string;
  descricao: string;
}

export const CATALOGO_UTENSILIOS_EMBALAGENS: ItemCatalogo[] = [
  {
    id: 'espatulas-silicone',
    nome: 'Espátulas de Silicone (Pão-Duro)',
    tipo: 'utensilio',
    categoria: 'Utensílios',
    precoPadrao: 25.00,
    quantidadeEmbalagem: 1,
    unidade: 'un',
    descricao: 'Essencial para raspar e aproveitar 100% do chocolate e recheios sem arranhar panelas.'
  },
  {
    id: 'formas-silicone-chocolate',
    nome: 'Formas de Chocolate (Acetato/Silicone 3 partes)',
    tipo: 'utensilio',
    categoria: 'Utensílios',
    precoPadrao: 18.90,
    quantidadeEmbalagem: 1,
    unidade: 'un',
    descricao: 'Formas com silicone que garantem cascas perfeitamente uniformes de ovos e miniovos.'
  },
  {
    id: 'termometro-culinario',
    nome: 'Termômetro Culinário Digital tipo Espeto',
    tipo: 'utensilio',
    categoria: 'Utensílios',
    precoPadrao: 9.99,
    quantidadeEmbalagem: 1,
    unidade: 'un',
    descricao: 'Indispensável para acertar a curva de temperatura da têmpera (28°C a 32°C).'
  },
  {
    id: 'mixer-mao',
    nome: 'Mixer de Mão Elétrico',
    tipo: 'utensilio',
    categoria: 'Utensílios',
    precoPadrao: 49.99,
    quantidadeEmbalagem: 1,
    unidade: 'un',
    descricao: 'Opcional (batedeira já vem no kit). Agiliza emulsões de ganaches ultra sedosas.'
  },
  {
    id: 'bicos-moldes',
    nome: 'Kit de Bicos de Confeitar em Inox (Moldes)',
    tipo: 'utensilio',
    categoria: 'Utensílios',
    precoPadrao: 21.90,
    quantidadeEmbalagem: 1,
    unidade: 'kit',
    descricao: 'Permite decorações florais e pitangas profissionais nos ovos de colher.'
  },
  {
    id: 'touca-descartavel',
    nome: 'Touca Descartável Culinária (100 un.)',
    tipo: 'utensilio',
    categoria: 'Higiene e Segurança',
    precoPadrao: 19.00,
    quantidadeEmbalagem: 100,
    unidade: 'un',
    descricao: 'Garante padrão sanitário e preserva o indicador de Ética (ETI) da empresa.'
  },
  {
    id: 'luva-descartavel',
    nome: 'Luvas de Vinil / Nitrílica (100 un.)',
    tipo: 'utensilio',
    categoria: 'Higiene e Segurança',
    precoPadrao: 15.99,
    quantidadeEmbalagem: 100,
    unidade: 'un',
    descricao: 'Evita marcas de impressões digitais no chocolate brilhante e mantém a higiene.'
  },
  {
    id: 'caixas-presente',
    nome: 'Caixas de Páscoa Decoradas para Ovo/Kit (10 un.)',
    tipo: 'embalagem',
    categoria: 'Embalagens',
    precoPadrao: 29.99,
    quantidadeEmbalagem: 10,
    unidade: 'un',
    descricao: 'Caixa com visor transparente e berço de apoio para ovos e ovos de colher.'
  },
  {
    id: 'sacos-confeitar',
    nome: 'Sacos de Confeitar Descartáveis (100 un.)',
    tipo: 'embalagem',
    categoria: 'Embalagens',
    precoPadrao: 9.99,
    quantidadeEmbalagem: 100,
    unidade: 'un',
    descricao: 'Sacos plásticos para dosagem precisa de recheios nas cascas e miniovos.'
  },
  {
    id: 'sacos-presente',
    nome: 'Sacos Celofane Decorados de Páscoa (25 un.)',
    tipo: 'embalagem',
    categoria: 'Embalagens',
    precoPadrao: 21.99,
    quantidadeEmbalagem: 25,
    unidade: 'un',
    descricao: 'Embalagem clássica para embrulhar ovos tradicionais com laço.'
  },
  {
    id: 'fitas-tecido',
    nome: 'Fitas de Cetim Artesanais (Rolo de 10 metros)',
    tipo: 'embalagem',
    categoria: 'Embalagens',
    precoPadrao: 23.00,
    quantidadeEmbalagem: 10,
    unidade: 'm',
    descricao: 'Fita decorativa para laços luxuosos que valorizam a apresentação.'
  },
  {
    id: 'fita-metalica',
    nome: 'Fita Metálica para Fechamento / Fecho Fácil (100 un.)',
    tipo: 'embalagem',
    categoria: 'Embalagens',
    precoPadrao: 2.10,
    quantidadeEmbalagem: 100,
    unidade: 'un',
    descricao: 'Arame prático encapado para fechar sacos celofane rapidamente.'
  }
];

export const CATALOGO_INSUMOS_SIMULACAO: ItemCatalogo[] = [
  {
    id: 'manteiga-cacau',
    nome: 'Manteiga de Cacau Pura',
    tipo: 'insumo',
    categoria: 'Chocolateria',
    precoPadrao: 30.00,
    quantidadeEmbalagem: 250,
    unidade: 'g',
    descricao: 'Gordura nobre de cacau essencial para ajuste de fluidez e têmpera.'
  },
  {
    id: 'cacau-po',
    nome: 'Cacau em Pó 100% Puro Baiano',
    tipo: 'insumo',
    categoria: 'Chocolateria',
    precoPadrao: 20.00,
    quantidadeEmbalagem: 200,
    unidade: 'g',
    descricao: 'Sabor marcante e cor profunda para brigadeiros nobres.'
  },
  {
    id: 'chocolate-barra',
    nome: 'Chocolate Nobre em Barra (Gotas ou Barra)',
    tipo: 'insumo',
    categoria: 'Chocolateria',
    precoPadrao: 10.00,
    quantidadeEmbalagem: 100,
    unidade: 'g',
    descricao: 'Base para produção de todas as cascas, barrinhas e ganaches finas.'
  },
  {
    id: 'leite-condensado',
    nome: 'Leite Condensado Integral',
    tipo: 'insumo',
    categoria: 'Laticínios',
    precoPadrao: 8.00,
    quantidadeEmbalagem: 395,
    unidade: 'g',
    descricao: 'A base indispensável para brigadeiros e doces da confeitaria brasileira.'
  },
  {
    id: 'creme-leite',
    nome: 'Creme de Leite UHT 20% Gordura',
    tipo: 'insumo',
    categoria: 'Laticínios',
    precoPadrao: 4.00,
    quantidadeEmbalagem: 200,
    unidade: 'g',
    descricao: 'Confere cremosidade e ponto de colher aos recheios.'
  },
  {
    id: 'manteiga-culinaria',
    nome: 'Manteiga Extra sem Sal',
    tipo: 'insumo',
    categoria: 'Laticínios',
    precoPadrao: 10.00,
    quantidadeEmbalagem: 200,
    unidade: 'g',
    descricao: 'Dá brilho aos brigadeiros e melhora textura.'
  },
  {
    id: 'leite-po',
    nome: 'Leite em Pó Integral (tipo Ninho)',
    tipo: 'insumo',
    categoria: 'Laticínios',
    precoPadrao: 20.00,
    quantidadeEmbalagem: 200,
    unidade: 'g',
    descricao: 'Para o tradicional brigadeiro branco de leite em pó.'
  },
  {
    id: 'doce-leite',
    nome: 'Doce de Leite Cremoso de Pote',
    tipo: 'insumo',
    categoria: 'Recheios',
    precoPadrao: 12.00,
    quantidadeEmbalagem: 400,
    unidade: 'g',
    descricao: 'Pronto para mesclar ou usar como recheio cremoso encorpado.'
  },
  {
    id: 'coco-ralado',
    nome: 'Coco Ralado Desidratado Fino',
    tipo: 'insumo',
    categoria: 'Recheios',
    precoPadrao: 8.00,
    quantidadeEmbalagem: 100,
    unidade: 'g',
    descricao: 'Para recheio de beijinho / coco clássico da Bahia.'
  },
  {
    id: 'morango-fresco',
    nome: 'Morangos Frescos Selecionados',
    tipo: 'insumo',
    categoria: 'Frutas',
    precoPadrao: 10.00,
    quantidadeEmbalagem: 250,
    unidade: 'g',
    descricao: 'Para preparo da geleia artesanal de morango.'
  },
  {
    id: 'maracuja-fruta',
    nome: 'Maracujá Fresco Grande',
    tipo: 'insumo',
    categoria: 'Frutas',
    precoPadrao: 3.00,
    quantidadeEmbalagem: 1,
    unidade: 'un',
    descricao: 'Fruta fresca com sementes para decorar e dar acidez equilibrada.'
  },
  {
    id: 'suco-maracuja-concentrado',
    nome: 'Suco de Maracujá Concentrado',
    tipo: 'insumo',
    categoria: 'Frutas',
    precoPadrao: 10.00,
    quantidadeEmbalagem: 500,
    unidade: 'ml',
    descricao: 'Sabor intenso e redução perfeita para o brigadeiro de maracujá.'
  },
  {
    id: 'limao-fresco',
    nome: 'Limão Tahiti',
    tipo: 'insumo',
    categoria: 'Frutas',
    precoPadrao: 1.00,
    quantidadeEmbalagem: 1,
    unidade: 'un',
    descricao: 'Gotas de acidez e pectina natural para a geleia de morango.'
  },
  {
    id: 'acucar-refinado',
    nome: 'Açúcar Refinado Tradicional',
    tipo: 'insumo',
    categoria: 'Açúcares',
    precoPadrao: 5.00,
    quantidadeEmbalagem: 1000,
    unidade: 'g',
    descricao: 'Para geleias e preparos doces.'
  },
  {
    id: 'acucar-confeiteiro',
    nome: 'Açúcar de Confeiteiro Impalpável',
    tipo: 'insumo',
    categoria: 'Açúcares',
    precoPadrao: 10.00,
    quantidadeEmbalagem: 500,
    unidade: 'g',
    descricao: 'Para acabamento delicado e preparo de caldas finas.'
  }
];
