import { create } from 'zustand';

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DiceRollResult {
  id: string;
  timestamp: string;
  tipoDado: DiceType;
  qtd: number;
  rolagens: number[];
  somaDados: number;
  modificador: number;
  total: number;
  cd?: number;
  sucesso?: boolean;
  motivo?: string;
  descartadoMenor?: number;
}

interface DiceState {
  isOpen: boolean;
  historico: DiceRollResult[];
  ultimoResultado: DiceRollResult | null;
  abrirModal: (motivoDefault?: string, cdDefault?: number, modDefault?: number) => void;
  fecharModal: () => void;
  rolarDado: (
    tipo: DiceType, 
    qtd: number, 
    modificador: number, 
    cd?: number, 
    motivo?: string, 
    descartarMenor?: boolean
  ) => DiceRollResult;
  limparHistorico: () => void;
}

export const useDiceStore = create<DiceState>((set, get) => ({
  isOpen: false,
  historico: [],
  ultimoResultado: null,

  abrirModal: () => {
    set({ isOpen: true });
  },

  fecharModal: () => {
    set({ isOpen: false });
  },

  rolarDado: (tipo, qtd, modificador, cd = 15, motivo, descartarMenor = false) => {
    const lados = parseInt(tipo.replace('d', ''), 10);
    const rolagens: number[] = [];
    for (let i = 0; i < qtd; i++) {
      rolagens.push(Math.floor(Math.random() * lados) + 1);
    }

    let rolagensValidas = [...rolagens];
    let descartadoMenor: number | undefined;

    if (descartarMenor && rolagens.length > 1) {
      const menor = Math.min(...rolagens);
      descartadoMenor = menor;
      const idx = rolagensValidas.indexOf(menor);
      if (idx !== -1) {
        rolagensValidas.splice(idx, 1);
      }
    }

    const somaDados = rolagensValidas.reduce((a, b) => a + b, 0);
    const total = somaDados + modificador;
    const sucesso = cd ? total >= cd : undefined;

    const resultado: DiceRollResult = {
      id: 'roll_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      tipoDado: tipo,
      qtd,
      rolagens,
      somaDados,
      modificador,
      total,
      cd,
      sucesso,
      motivo: motivo || `Rolagem de ${qtd}${tipo}`,
      descartadoMenor
    };

    set((state) => ({
      ultimoResultado: resultado,
      historico: [resultado, ...state.historico.slice(0, 49)]
    }));

    return resultado;
  },

  limparHistorico: () => {
    set({ historico: [], ultimoResultado: null });
  }
}));
