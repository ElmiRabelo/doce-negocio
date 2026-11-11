import { AttributeDefinition } from '@/types';

export const ATRIBUTOS_REGRAS: AttributeDefinition[] = [
  {
    key: 'int',
    nome: 'Inteligência (INT)',
    pericias: ['Administração', 'Planejamento'],
    descricao: 'Raciocínio lógico, gestão de finanças, organização de prazos e cálculo mental de proporções.'
  },
  {
    key: 'sab',
    nome: 'Sabedoria (SAB)',
    pericias: ['Intuição', 'Cálculo'],
    descricao: 'Percepção de riscos, intuição sobre clientes e fornecedores, e validação rigorosa de custos.'
  },
  {
    key: 'des',
    nome: 'Destreza (DES)',
    pericias: ['Fabricar', 'Confeiteiro'],
    descricao: 'Habilidade manual fina, têmpera correta do chocolate, acabamento estético dos doces e manuseio de formas.'
  },
  {
    key: 'car',
    nome: 'Carisma (CAR)',
    pericias: ['Diplomacia', 'Criatividade'],
    descricao: 'Comunicação empática, negociação de preços, resolução de conflitos e criação de sabores/embalagens originais.'
  },
  {
    key: 'con',
    nome: 'Constituição (CON)',
    pericias: ['Logística', 'Agilidade'],
    descricao: 'Resistência ao cansaço da cozinha, agilidade no transporte de compras e entregas sob o calor de Ilhéus.'
  }
];

export const REGRAS_INDICADORES = {
  rep: {
    nome: 'Reputação (REP)',
    descricao: 'Imagem pública e visibilidade no mercado local de Ilhéus. Gera novas encomendas.',
    inicialResiliencia: '1d6',
    inicialVisao: '2d6 somados'
  },
  eti: {
    nome: 'Ética (ETI)',
    descricao: 'Transparência, qualidade dos ingredientes e honestidade com clientes. Inicia fixo em 24.',
    inicial: 24
  },
  er: {
    nome: 'Escala de Relacionamento (ER)',
    descricao: 'Harmonia, confiança e sinergia entre os sócios. Inicia fixo em 20. Se diminuir, a equipe perde 20% do caixa por desentendimentos e retrabalho.',
    inicial: 20,
    penalidadePorQueda: 'Perda de 1/5 (20%) do saldo atual de caixa.'
  },
  exp: {
    nome: 'Experiência (EXP)',
    descricao: 'Aprendizado prático da equipe com cada venda concluída (+10 EXP por pedido entregue). A cada 100 pontos ocorre um marco/evolução.',
    inicial: 0,
    metaMarco: 100
  },
  caixa: {
    nome: 'Caixa (R$)',
    descricao: 'Capital de giro disponível para compras de insumos, utensílios e reinvestimento.',
    formulaResiliencia: 'Role 6d4, descarte o menor resultado, some os 5 restantes e multiplique por R$100.',
    formulaVisao: 'Role 7d6, descarte o menor resultado, some os 6 restantes e multiplique por R$100.'
  }
};

export const REGRAS_TESTE = {
  formula: '1d20 + Modificador da Perícia',
  cdPadrao: 15,
  modificadorRegra: 'O modificador da perícia corresponde diretamente ao valor do atributo associado na ficha (ex: CAR 5 = Diplomacia +5).',
  sucesso: 'Resultado final ≥ 15 (a ação atinge o objetivo sem perdas).',
  falha: 'Resultado final < 15 (exige improviso, gasta mais tempo ou insumos, ou gera perda de REP/caixa).'
};
