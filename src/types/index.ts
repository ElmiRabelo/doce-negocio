// Tipos fundamentais do RPG Doce Negócio

export type GameProfile = 'resiliencia' | 'visao';

export type CharacterClass = 
  | 'estrategista' 
  | 'artesao' 
  | 'bardo' 
  | 'arquiteto' 
  | 'guardia';

export type AttributeKey = 'int' | 'sab' | 'des' | 'car' | 'con';

export interface AttributeDefinition {
  key: AttributeKey;
  nome: string;
  pericias: string[];
  descricao: string;
}

export interface CharacterClassDefinition {
  id: CharacterClass;
  nome: string;
  descricao: string;
  contribuicao: string;
  atributoChave: AttributeKey;
  habilidadeNome: string;
  habilidadeDescricao: string;
  icone: string;
  fraseResiliencia?: string;
  loreResiliencia?: string;
  fraseVisao?: string;
  loreVisao?: string;
}

export interface BusinessIndicators {
  rep: number;   // Reputação (rolado inicialmente)
  eti: number;   // Ética (inicia em 24)
  er: number;    // Escala de Relacionamento (inicia em 20; penalidade de 20% do caixa se cair)
  exp: number;   // Experiência (meta de 100 pontos para marco)
  caixa: number; // Saldo em R$
}

export interface PanelaItem {
  id: string;
  tamanho: 'pequena' | 'media' | 'grande';
  capacidade: string; // '1,2 L', '2,6 L', '3,2 L'
}

export interface InitialKit {
  geladeira: string;
  fogaoBocas: number;
  batedeira: number;
  panelas: PanelaItem[];
}

export interface CharacterSheet {
  id: string;
  playerName: string;
  characterName: string;
  className: CharacterClass;
  attributes: {
    int: number;
    sab: number;
    des: number;
    car: number;
    con: number;
  };
  habilidadeUsada: boolean;
  notas: string;
}

export interface InventoryItem {
  id: string;
  nome: string;
  tipo: 'insumo' | 'utensilio' | 'embalagem';
  unidade: string; // 'g', 'kg', 'ml', 'un', 'pct'
  quantidadeComprada: number;
  precoPago: number; // Preço pago pelo pacote
  quantidadeAtual: number;
}

export interface InsumoUsado {
  id: string;
  nome: string;
  precoCompra: number;
  qtdCompra: number;
  unidadeCompra: string;
  qtdUsada: number;
  unidadeUsada: string;
  custoCalculado: number; // (precoCompra * qtdUsada) / qtdCompra
}

export interface EmbalagemUsada {
  id: string;
  nome: string;
  precoTotalPacote: number;
  qtdPacote: number;
  qtdUsada: number;
  custoCalculado: number;
}

export interface ProductPricing {
  id: string;
  produtoNome: string;
  rendimentoLote: number; // Unidades produzidas
  ingredientes: InsumoUsado[];
  embalagens: EmbalagemUsada[];
  custoTotalLote: number;
  custoUnitario: number;
  lucroDesejadoUnitario: number;
  precoVendaSugerido: number;
}

export type CardType = 'demanda' | 'obstaculo' | 'vantagem';

export interface GameCard {
  id: string;
  numero?: number;
  tipo: CardType;
  titulo: string;
  narrativa: string;
  efeitoRegra: string;
  testeSugerido?: {
    pericia: string;
    atributo: AttributeKey;
    cd: number;
  };
  fonte: 'oficial' | 'extra' | 'customizado';
}

export interface TurnRecord {
  id: string;
  numeroTurno: number;
  dataHora: string;
  demandaCardId?: string;
  demandaTitulo: string;
  demandaNarrativa: string;
  acontecimentoCardId?: string;
  acontecimentoTitulo: string;
  acontecimentoTipo: 'obstaculo' | 'vantagem';
  acontecimentoEfeito: string;
  decisaoJogadores: string;
  teste?: {
    personagemNome: string;
    pericia: string;
    dadoD20: number;
    modificador: number;
    total: number;
    cd: number;
    sucesso: boolean;
  };
  impactoCaixa: number; // +entrada ou -saida
  impactoRep: number;
  impactoEti: number;
  impactoEr: number;
  impactoExp: number;
  status: 'concluido' | 'em_andamento';
  pendencias: string;
}

export interface CaixaTransaction {
  id: string;
  dataHora: string;
  descricao: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  saldoApos: number;
}

export interface GameSession {
  id: string;
  nomeCampanha: string;
  nomeNegocio: string;
  perfil: GameProfile;
  etapaAtual: number; // 1 a 9
  criadoEm: string;
  atualizadoEm: string;
  indicadores: BusinessIndicators;
  kit: InitialKit;
  personagens: CharacterSheet[];
  estoque: InventoryItem[];
  precificacoes: ProductPricing[];
  historicoTurnos: TurnRecord[];
  transacoesCaixa: CaixaTransaction[];
  produtosEscolhidos: string[]; // ex: ['Ovo tradicional', 'Barrinha']
  baralhosPersonalizados: GameCard[];
}
