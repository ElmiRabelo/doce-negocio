export interface ProdutoPascoa {
  id: string;
  nome: string;
  chocolateG: number;
  recheioG: number;
  descricao: string;
  dica: string;
}

export const CATALOGO_PASCOA: ProdutoPascoa[] = [
  {
    id: 'ovo-tradicional',
    nome: 'Ovo Tradicional',
    chocolateG: 190,
    recheioG: 0,
    descricao: 'Casca dupla oca de chocolate nobre temperado. O clássico inconfundível de Páscoa.',
    dica: 'Exige atenção total à têmpera para dar brilho e estalo ao quebrar. Não consome recheio, economizando tempo de fogão.'
  },
  {
    id: 'kit-miniovos',
    nome: 'Kit com Três Miniovos Recheados',
    chocolateG: 90, // 30g por miniovo
    recheioG: 60,   // 20g por miniovo
    descricao: 'Conjunto com 3 mini cascas recheadas com sabores variados (30g de chocolate + 20g de recheio cada).',
    dica: 'Ótima opção para lembrancinha ou presentes acessíveis. Conta como 1 unidade de venda completa.'
  },
  {
    id: 'barrinha',
    nome: 'Barrinha de Chocolate',
    chocolateG: 95,
    recheioG: 0,
    descricao: 'Barra maciça de chocolate nobre com acabamento trabalhado em molde rústico.',
    dica: 'Mais rápida de produzir e desmoldar. Excelente produto de entrada para giro rápido de caixa.'
  },
  {
    id: 'ovo-colher',
    nome: 'Ovo de Colher',
    chocolateG: 95,
    recheioG: 110,
    descricao: 'Metade de ovo generosamente recheada com brigadeiro gourmet cremoso e confeitos decorativos.',
    dica: 'O produto com maior apelo visual e maior valor percebido pelo cliente, permitindo uma margem de lucro superior.'
  }
];
