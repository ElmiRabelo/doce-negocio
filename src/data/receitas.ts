export interface IngredienteReceita {
  nome: string;
  quantidade: number;
  unidade: string;
  itemCatalogoId?: string;
}

export interface ReceitaBase {
  id: string;
  nome: string;
  tipo: 'casca' | 'recheio' | 'geleia';
  rendimentoG: number;
  rendimentoDescricao: string;
  ingredientes: IngredienteReceita[];
  modoPreparo: string[];
  dicaMestre: string;
}

export const RECEITAS_BASE: ReceitaBase[] = [
  {
    id: 'tempera-chocolate',
    nome: 'Têmpera & Moldagem de Chocolate Nobre',
    tipo: 'casca',
    rendimentoG: 500,
    rendimentoDescricao: '500 g de chocolate temperado pronto para cascas ou barras',
    ingredientes: [
      { nome: 'Chocolate Nobre em Barra', quantidade: 500, unidade: 'g', itemCatalogoId: 'chocolate-barra' }
    ],
    modoPreparo: [
      'Pique o chocolate finamente e separe 1/3 para a semeadura (indução).',
      'Derreta os outros 2/3 em banho-maria ou micro-ondas em potência média até atingir 45°C a 48°C.',
      'Retire do calor e adicione o 1/3 reservado, mexendo vigorosamente com a espátula para resfriar até 28°C.',
      'Aqueça levemente por poucos segundos até a temperatura de trabalho (31°C para meio amargo, 29°C para branco/ao leite).',
      'Preencha as formas até a marcação, insira o silicone e a parte rígida. Leve à geladeira por 15 a 20 minutos até a forma ficar opaca.'
    ],
    dicaMestre: 'Se o teste de têmpera na ponta da faca endurecer opaco e sem manchas em 3 minutos a 20°C, a cristalização foi perfeita!'
  },
  {
    id: 'brigadeiro-tradicional',
    nome: 'Brigadeiro Gourmet Intenso',
    tipo: 'recheio',
    rendimentoG: 550,
    rendimentoDescricao: 'Aproximadamente 550 g de recheio cremoso',
    ingredientes: [
      { nome: 'Leite Condensado Integral', quantidade: 395, unidade: 'g', itemCatalogoId: 'leite-condensado' },
      { nome: 'Creme de Leite 20%', quantidade: 200, unidade: 'g', itemCatalogoId: 'creme-leite' },
      { nome: 'Chocolate Nobre em Barra', quantidade: 100, unidade: 'g', itemCatalogoId: 'chocolate-barra' },
      { nome: 'Cacau em Pó 100%', quantidade: 15, unidade: 'g', itemCatalogoId: 'cacau-po' },
      { nome: 'Manteiga sem Sal', quantidade: 10, unidade: 'g', itemCatalogoId: 'manteiga-culinaria' }
    ],
    modoPreparo: [
      'Em uma panela média de fundo grosso, dissolva o cacau no leite condensado ainda frio para não empelotar.',
      'Adicione o creme de leite, a manteiga e o chocolate em barra picado.',
      'Leve ao fogo médio para baixo, mexendo sem parar em movimentos em formato de oito com a espátula de silicone.',
      'Cozinhe até começar a ferver em borbulhas densas e desgrudar do fundo (ponto de brigadeiro de colher/recheio mole).',
      'Despeje em recipiente de vidro ou inox, cubra com plástico filme em contato e espere esfriar 100% em temperatura ambiente.'
    ],
    dicaMestre: 'Nunca recheie o chocolate com brigadeiro morno, ou a casca irá derreter e perder a têmpera!'
  },
  {
    id: 'beijinho-coco',
    nome: 'Recheio Cremoso de Coco (Beijinho Baiano)',
    tipo: 'recheio',
    rendimentoG: 580,
    rendimentoDescricao: 'Aproximadamente 580 g de recheio',
    ingredientes: [
      { nome: 'Leite Condensado Integral', quantidade: 395, unidade: 'g', itemCatalogoId: 'leite-condensado' },
      { nome: 'Creme de Leite 20%', quantidade: 200, unidade: 'g', itemCatalogoId: 'creme-leite' },
      { nome: 'Coco Ralado Fino', quantidade: 60, unidade: 'g', itemCatalogoId: 'coco-ralado' }
    ],
    modoPreparo: [
      'Junte todos os ingredientes na panela de alumínio média.',
      'Misture bem antes de ligar o fogo.',
      'Cozinhe em fogo brando até que o creme engrosse e comece a borbulhar vigorosamente.',
      'Transfira e deixe esfriar completamente protegido com filme em contato.'
    ],
    dicaMestre: 'Hidratar o coco ralado no creme de leite 10 minutos antes do cozimento deixa o recheio incrivelmente aveludado.'
  },
  {
    id: 'doce-leite-cremoso',
    nome: 'Doce de Leite Aerado & Suave',
    tipo: 'recheio',
    rendimentoG: 500,
    rendimentoDescricao: 'Aproximadamente 500 g de recheio',
    ingredientes: [
      { nome: 'Doce de Leite de Pote', quantidade: 400, unidade: 'g', itemCatalogoId: 'doce-leite' },
      { nome: 'Creme de Leite 20%', quantidade: 100, unidade: 'g', itemCatalogoId: 'creme-leite' }
    ],
    modoPreparo: [
      'Coloque o doce de leite em uma tigela.',
      'Adicione o creme de leite aos poucos, misturando com batedeira ou fouet até ficar homogêneo e sedoso.',
      'Não precisa ir ao fogo! Já sai pronto para aplicação em bico de confeitar.'
    ],
    dicaMestre: 'Essa receita economiza gás do fogão e não tem risco de queimar!'
  },
  {
    id: 'ninho-trufado',
    nome: 'Creme de Ninho Aveludado',
    tipo: 'recheio',
    rendimentoG: 350,
    rendimentoDescricao: 'Aproximadamente 350 g de recheio',
    ingredientes: [
      { nome: 'Leite Condensado Integral', quantidade: 395, unidade: 'g', itemCatalogoId: 'leite-condensado' },
      { nome: 'Creme de Leite 20%', quantidade: 200, unidade: 'g', itemCatalogoId: 'creme-leite' },
      { nome: 'Manteiga sem Sal', quantidade: 15, unidade: 'g', itemCatalogoId: 'manteiga-culinaria' },
      { nome: 'Leite em Pó tipo Ninho', quantidade: 40, unidade: 'g', itemCatalogoId: 'leite-po' }
    ],
    modoPreparo: [
      'Misture o leite condensado com o leite em pó até sumir qualquer gruminho.',
      'Junte a manteiga e o creme de leite.',
      'Cozinhe em fogo brando mexendo continuamente até o ponto de recheio suave.',
      'Esfrie em temperatura ambiente coberto com plástico em contato.'
    ],
    dicaMestre: 'Excelente para combinar em camadas com a geleia artesanal de morango.'
  },
  {
    id: 'brigadeiro-maracuja',
    nome: 'Brigadeiro Aveludado de Maracujá',
    tipo: 'recheio',
    rendimentoG: 900,
    rendimentoDescricao: 'Aproximadamente 900 g de recheio',
    ingredientes: [
      { nome: 'Leite Condensado Integral', quantidade: 590, unidade: 'g', itemCatalogoId: 'leite-condensado' },
      { nome: 'Creme de Leite 20%', quantidade: 400, unidade: 'g', itemCatalogoId: 'creme-leite' },
      { nome: 'Suco de Maracujá Concentrado', quantidade: 50, unidade: 'ml', itemCatalogoId: 'suco-maracuja-concentrado' },
      { nome: 'Polpa de Maracujá Fresco com Sementes', quantidade: 1, unidade: 'un', itemCatalogoId: 'maracuja-fruta' }
    ],
    modoPreparo: [
      'Cozinhe o leite condensado com o creme de leite em fogo brando até ponto de brigadeiro firme.',
      'Desligue o fogo e espere amornar ligeiramente.',
      'Acrescente o suco concentrado de maracujá e misture energicamente até incorporar (o ácido do suco encorpa o creme).',
      'Finalize com as sementes do fruto fresco para acabamento rústico sofisticado.'
    ],
    dicaMestre: 'Nunca ferva o suco de maracujá com o leite condensado na panela, senão o leite pode talhar!'
  },
  {
    id: 'geleia-morango',
    nome: 'Geleia Artesanal de Morango em Pedaços',
    tipo: 'geleia',
    rendimentoG: 500,
    rendimentoDescricao: 'Aproximadamente 500 g de geleia reduzida',
    ingredientes: [
      { nome: 'Morangos Frescos Picados', quantidade: 700, unidade: 'g', itemCatalogoId: 'morango-fresco' },
      { nome: 'Açúcar Refinado', quantidade: 200, unidade: 'g', itemCatalogoId: 'acucar-refinado' },
      { nome: 'Suco e Raspas de Limão', quantidade: 1, unidade: 'un', itemCatalogoId: 'limao-fresco' }
    ],
    modoPreparo: [
      'Lave e pique os morangos, retirando as folhas verdes.',
      'Coloque em uma panela com o açúcar e o suco de meio limão.',
      'Cozinhe em fogo brando por cerca de 20 a 25 minutos, retirando a espuma da superfície.',
      'Quando atingir ponto de geleia brilhante que cai em gotas pesadas da colher, desligue o fogo.',
      'Deixe esfriar completamente na geladeira antes de usar.'
    ],
    dicaMestre: 'A pectina do limão dá a consistência perfeita sem necessidade de amido ou conservantes artificiais.'
  }
];
