import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  GameSession, 
  GameProfile, 
  CharacterSheet, 
  BusinessIndicators, 
  InitialKit, 
  InventoryItem, 
  ProductPricing, 
  TurnRecord, 
  GameCard,
  CaixaTransaction
} from '@/types';
import { CARTAS_DEMANDA_OFICIAIS, CARTAS_MONTE_MISTO_OFICIAIS } from '@/data/cartas-oficiais';
import { CARTAS_EXTRAS_REGIONAL } from '@/data/demandas-extras';

interface SessionState {
  sessions: GameSession[];
  activeSessionId: string | null;

  // Actions
  createSession: (nomeCampanha: string, nomeNegocio: string, perfil: GameProfile) => GameSession;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  updateSession: (partial: Partial<GameSession>) => void;

  // Indicadores
  updateIndicadores: (partial: Partial<BusinessIndicators>, motivo?: string) => void;
  ajustarCaixa: (valorDelta: number, motivo: string, tipo: 'entrada' | 'saida') => void;

  // Etapa do Guia
  setEtapa: (etapa: number) => void;
  proximaEtapa: () => void;
  etapaAnterior: () => void;

  // Personagens
  addPersonagem: (personagem: Omit<CharacterSheet, 'id'>) => void;
  updatePersonagem: (id: string, partial: Partial<CharacterSheet>) => void;
  removePersonagem: (id: string) => void;

  // Kit e Equipamentos
  updateKit: (partial: Partial<InitialKit>) => void;

  // Produtos Escolhidos
  setProdutosEscolhidos: (produtos: string[]) => void;

  // Estoque & Compras
  comprarItem: (item: Omit<InventoryItem, 'id'>) => void;
  darBaixaEstoque: (itemId: string, quantidadeUsada: number) => void;
  removerItemEstoque: (itemId: string) => void;

  // Precificação
  salvarPrecificacao: (precificacao: ProductPricing) => void;
  removerPrecificacao: (id: string) => void;

  // Turnos
  registrarTurno: (turno: Omit<TurnRecord, 'id' | 'dataHora'>) => void;

  // Baralho Customizado
  salvarCartaCustomizada: (carta: GameCard) => void;
  removerCartaCustomizada: (id: string) => void;

  // Backup & Restore
  exportarSessaoJson: (sessionId?: string) => string;
  importarSessaoJson: (jsonStr: string) => boolean;

  // Helper
  getActiveSession: () => GameSession | null;
}

const DEFAULT_INDICADORES_RESILIENCIA: BusinessIndicators = {
  rep: 3,
  eti: 24,
  er: 20,
  exp: 0,
  caixa: 1400 // Valor de exemplo: 14 x 100
};

const DEFAULT_KIT: InitialKit = {
  geladeira: 'Antiga, funciona',
  fogaoBocas: 4,
  batedeira: 1,
  panelas: [
    { id: 'panela-1', tamanho: 'media', capacidade: '2,6 L' },
    { id: 'panela-2', tamanho: 'pequena', capacidade: '1,2 L' }
  ]
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,

      createSession: (nomeCampanha, nomeNegocio, perfil) => {
        const id = 'sessao_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
        const agora = new Date().toISOString();

        const novaSessao: GameSession = {
          id,
          nomeCampanha: nomeCampanha || 'Campanha de Páscoa',
          nomeNegocio: nomeNegocio || 'Cacau & Magia',
          perfil,
          etapaAtual: 1,
          criadoEm: agora,
          atualizadoEm: agora,
          indicadores: {
            rep: perfil === 'visao' ? 7 : 3,
            eti: 24,
            er: 20,
            exp: 0,
            caixa: perfil === 'visao' ? 2400 : 1400
          },
          kit: { ...DEFAULT_KIT },
          personagens: [],
          estoque: [],
          precificacoes: [],
          historicoTurnos: [],
          transacoesCaixa: [
            {
              id: 'tx_init',
              dataHora: agora,
              descricao: `Aporte inicial de Caixa (Perfil ${perfil === 'visao' ? 'Visão' : 'Resiliência'})`,
              tipo: 'entrada',
              valor: perfil === 'visao' ? 2400 : 1400,
              saldoApos: perfil === 'visao' ? 2400 : 1400
            }
          ],
          produtosEscolhidos: [],
          baralhosPersonalizados: []
        };

        set((state) => ({
          sessions: [novaSessao, ...state.sessions],
          activeSessionId: id
        }));

        return novaSessao;
      },

      selectSession: (id) => {
        set({ activeSessionId: id });
      },

      deleteSession: (id) => {
        set((state) => {
          const filtered = state.sessions.filter((s) => s.id !== id);
          return {
            sessions: filtered,
            activeSessionId: state.activeSessionId === id 
              ? (filtered.length > 0 ? filtered[0].id : null) 
              : state.activeSessionId
          };
        });
      },

      updateSession: (partial) => {
        const activeId = get().activeSessionId;
        if (!activeId) return;
        set((state) => ({
          sessions: state.sessions.map((s) => 
            s.id === activeId 
              ? { ...s, ...partial, atualizadoEm: new Date().toISOString() } 
              : s
          )
        }));
      },

      updateIndicadores: (partial, motivo) => {
        const session = get().getActiveSession();
        if (!session) return;

        const antigoEr = session.indicadores.er;
        const novoEr = partial.er !== undefined ? partial.er : antigoEr;

        // Se ER caiu, regra oficial: perda de 20% (1/5) do caixa atual
        let caixaAjustado = session.indicadores.caixa;
        const transacoesNovas = [...session.transacoesCaixa];

        if (novoEr < antigoEr) {
          const perdaCaixa = Math.round(caixaAjustado * 0.20 * 100) / 100;
          caixaAjustado = Math.max(0, caixaAjustado - perdaCaixa);
          transacoesNovas.push({
            id: 'tx_' + Date.now(),
            dataHora: new Date().toISOString(),
            descricao: `Penalidade de queda na Escala de Relacionamento (ER de ${antigoEr} para ${novoEr}): perda de 20% do caixa`,
            tipo: 'saida',
            valor: perdaCaixa,
            saldoApos: caixaAjustado
          });
        }

        const novosIndicadores: BusinessIndicators = {
          ...session.indicadores,
          ...partial,
          caixa: partial.caixa !== undefined ? partial.caixa : caixaAjustado
        };

        get().updateSession({
          indicadores: novosIndicadores,
          transacoesCaixa: transacoesNovas
        });
      },

      ajustarCaixa: (valorDelta, motivo, tipo) => {
        const session = get().getActiveSession();
        if (!session) return;

        const saldoAtual = session.indicadores.caixa;
        const novoSaldo = Math.max(0, Math.round((saldoAtual + (tipo === 'entrada' ? valorDelta : -valorDelta)) * 100) / 100);

        const novaTx: CaixaTransaction = {
          id: 'tx_' + Date.now(),
          dataHora: new Date().toISOString(),
          descricao: motivo,
          tipo,
          valor: Math.abs(valorDelta),
          saldoApos: novoSaldo
        };

        get().updateSession({
          indicadores: {
            ...session.indicadores,
            caixa: novoSaldo
          },
          transacoesCaixa: [novaTx, ...session.transacoesCaixa]
        });
      },

      setEtapa: (etapa) => {
        get().updateSession({ etapaAtual: Math.min(9, Math.max(1, etapa)) });
      },

      proximaEtapa: () => {
        const session = get().getActiveSession();
        if (session && session.etapaAtual < 9) {
          get().updateSession({ etapaAtual: session.etapaAtual + 1 });
        }
      },

      etapaAnterior: () => {
        const session = get().getActiveSession();
        if (session && session.etapaAtual > 1) {
          get().updateSession({ etapaAtual: session.etapaAtual - 1 });
        }
      },

      addPersonagem: (personagemData) => {
        const session = get().getActiveSession();
        if (!session) return;
        const novo: CharacterSheet = {
          ...personagemData,
          id: 'char_' + Date.now().toString(36)
        };
        get().updateSession({
          personagens: [...session.personagens, novo]
        });
      },

      updatePersonagem: (id, partial) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          personagens: session.personagens.map((p) => (p.id === id ? { ...p, ...partial } : p))
        });
      },

      removePersonagem: (id) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          personagens: session.personagens.filter((p) => p.id !== id)
        });
      },

      updateKit: (partial) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          kit: { ...session.kit, ...partial }
        });
      },

      setProdutosEscolhidos: (produtos) => {
        get().updateSession({ produtosEscolhidos: produtos });
      },

      comprarItem: (itemData) => {
        const session = get().getActiveSession();
        if (!session) return;

        const novoItem: InventoryItem = {
          ...itemData,
          id: 'item_' + Date.now().toString(36)
        };

        // Deduz do caixa
        get().ajustarCaixa(novoItem.precoPago, `Compra de estoque: ${novoItem.nome} (${novoItem.quantidadeComprada} ${novoItem.unidade})`, 'saida');

        // Adiciona ao estoque
        const sessionAtualizada = get().getActiveSession()!;
        get().updateSession({
          estoque: [...sessionAtualizada.estoque, novoItem]
        });
      },

      darBaixaEstoque: (itemId, quantidadeUsada) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          estoque: session.estoque.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                quantidadeAtual: Math.max(0, item.quantidadeAtual - quantidadeUsada)
              };
            }
            return item;
          })
        });
      },

      removerItemEstoque: (itemId) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          estoque: session.estoque.filter((i) => i.id !== itemId)
        });
      },

      salvarPrecificacao: (precificacao) => {
        const session = get().getActiveSession();
        if (!session) return;
        const existeIndex = session.precificacoes.findIndex((p) => p.id === precificacao.id);
        let novas = [...session.precificacoes];
        if (existeIndex >= 0) {
          novas[existeIndex] = precificacao;
        } else {
          novas.push(precificacao);
        }
        get().updateSession({ precificacoes: novas });
      },

      removerPrecificacao: (id) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          precificacoes: session.precificacoes.filter((p) => p.id !== id)
        });
      },

      registrarTurno: (turnoData) => {
        const session = get().getActiveSession();
        if (!session) return;
        const novoTurno: TurnRecord = {
          ...turnoData,
          id: 'turno_' + Date.now(),
          dataHora: new Date().toISOString()
        };

        // Aplica impactos se houver
        if (novoTurno.impactoCaixa !== 0) {
          get().ajustarCaixa(
            Math.abs(novoTurno.impactoCaixa),
            `Turno ${novoTurno.numeroTurno}: ${novoTurno.demandaTitulo}`,
            novoTurno.impactoCaixa > 0 ? 'entrada' : 'saida'
          );
        }

        // Aplica impactos de indicadores
        if (
          novoTurno.impactoRep !== 0 ||
          novoTurno.impactoEti !== 0 ||
          novoTurno.impactoEr !== 0 ||
          novoTurno.impactoExp !== 0
        ) {
          const s = get().getActiveSession()!;
          get().updateIndicadores({
            rep: Math.max(0, s.indicadores.rep + novoTurno.impactoRep),
            eti: Math.max(0, s.indicadores.eti + novoTurno.impactoEti),
            er: Math.max(0, s.indicadores.er + novoTurno.impactoEr),
            exp: Math.max(0, s.indicadores.exp + novoTurno.impactoExp)
          });
        }

        const sFinal = get().getActiveSession()!;
        get().updateSession({
          historicoTurnos: [novoTurno, ...sFinal.historicoTurnos]
        });
      },

      salvarCartaCustomizada: (carta) => {
        const session = get().getActiveSession();
        if (!session) return;
        const existeIdx = session.baralhosPersonalizados.findIndex((c) => c.id === carta.id);
        let lista = [...session.baralhosPersonalizados];
        if (existeIdx >= 0) {
          lista[existeIdx] = carta;
        } else {
          lista.push(carta);
        }
        get().updateSession({ baralhosPersonalizados: lista });
      },

      removerCartaCustomizada: (id) => {
        const session = get().getActiveSession();
        if (!session) return;
        get().updateSession({
          baralhosPersonalizados: session.baralhosPersonalizados.filter((c) => c.id !== id)
        });
      },

      exportarSessaoJson: (sessionId) => {
        const targetId = sessionId || get().activeSessionId;
        const target = get().sessions.find((s) => s.id === targetId);
        if (!target) return '';
        return JSON.stringify(target, null, 2);
      },

      importarSessaoJson: (jsonStr) => {
        try {
          const parsed = JSON.parse(jsonStr) as GameSession;
          if (!parsed.id || !parsed.nomeCampanha || !parsed.indicadores) {
            return false;
          }
          // Garante novo ID se colidir ou mantém
          const sessions = get().sessions.filter((s) => s.id !== parsed.id);
          set({
            sessions: [parsed, ...sessions],
            activeSessionId: parsed.id
          });
          return true;
        } catch {
          return false;
        }
      },

      getActiveSession: () => {
        const { sessions, activeSessionId } = get();
        if (!activeSessionId) return sessions[0] || null;
        return sessions.find((s) => s.id === activeSessionId) || null;
      }
    }),
    {
      name: 'doce-negocio-sessions-v1'
    }
  )
);
