import { CharacterClassDefinition } from '@/types';

export const CLASSES_DOCE_NEGOCIO: CharacterClassDefinition[] = [
  {
    id: 'estrategista',
    nome: 'A Estrategista',
    contribuicao: 'Gestão, contas e planejamento',
    atributoChave: 'int',
    habilidadeNome: 'Visão Estratégica',
    habilidadeDescricao: '+3 em uma perícia de um aliado por rodada (ex: ajuda na precificação, negociação ou adaptação).',
    icone: 'Brain'
  },
  {
    id: 'artesao',
    nome: 'O Artesão dos Doces',
    contribuicao: 'Produção, técnica e acabamento',
    atributoChave: 'des',
    habilidadeNome: 'Mãos de Ouro',
    habilidadeDescricao: 'Recupera uma produção perdida (1 vez por sessão, salva um lote que desandou ou queimou).',
    icone: 'ChefHat'
  },
  {
    id: 'bardo',
    nome: 'O Bardo dos Sabores',
    contribuicao: 'Divulgação, atendimento e negociação',
    atributoChave: 'car',
    habilidadeNome: 'Encanto da Cacauicultura',
    habilidadeDescricao: '+4 REP (Reputação) se passar no teste de Publicidade / Diplomacia (CD 15).',
    icone: 'Sparkles'
  },
  {
    id: 'arquiteto',
    nome: 'O Arquiteto dos Caminhos do Cacau',
    contribuicao: 'Estoque, fornecedores e entregas',
    atributoChave: 'con',
    habilidadeNome: 'Rotas Certeiras',
    habilidadeDescricao: '+2 em Logística por rodada (facilita compras emergenciais, prazos apertados e transporte).',
    icone: 'Truck'
  },
  {
    id: 'guardia',
    nome: 'A Guardiã',
    contribuicao: 'Avaliação de riscos e decisões de custo',
    atributoChave: 'sab',
    habilidadeNome: 'Escudo Financeiro',
    habilidadeDescricao: 'Reduz qualquer perda financeira em 15% (calculado sobre prejuízos ou custos imprevistos).',
    icone: 'ShieldCheck'
  }
];
