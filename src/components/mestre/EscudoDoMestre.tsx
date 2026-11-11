'use client';

import React from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { SorteadorCartas } from './SorteadorCartas';
import { 
  Shield, 
  DollarSign, 
  Sparkles, 
  Users, 
  Package, 
  Dices, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Check
} from 'lucide-react';

export const EscudoDoMestre: React.FC = () => {
  const { getActiveSession, updateIndicadores, ajustarCaixa } = useSessionStore();
  const { abrirModal } = useDiceStore();
  const session = getActiveSession();

  if (!session) {
    return <div className="p-8 text-center text-stone-500">Nenhuma sessão ativa.</div>;
  }

  const { indicadores, kit, estoque, personagens, historicoTurnos, perfil, nomeNegocio } = session;

  return (
    <div className="space-y-6">
      {/* Top Banner Escudo */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow">
              <Shield className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                Escudo do Mestre · Painel Ao Vivo
              </h2>
              <p className="text-xs text-stone-500">
                {nomeNegocio} (Perfil {perfil === 'visao' ? 'Visão' : 'Resiliência'}) · Cockpit unificado para mestrar em tempo real.
              </p>
            </div>
          </div>

          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 transition"
          >
            <Dices className="h-4 w-4" />
            <span>Rolar Dados (d20)</span>
          </button>
        </div>

        {/* Indicadores Principais */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 pt-4 text-xs">
          {/* Caixa */}
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-3 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
            <span className="font-bold uppercase text-emerald-800 dark:text-emerald-300 block mb-1">
              Caixa R$
            </span>
            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
              R$ {indicadores.caixa.toFixed(2)}
            </span>
            <div className="flex justify-center gap-1 mt-1 text-[11px]">
              <button
                onClick={() => ajustarCaixa(10, 'Ajuste manual rápido', 'entrada')}
                className="rounded bg-emerald-200/60 px-1.5 font-bold hover:bg-emerald-300 dark:bg-emerald-900"
              >
                +10
              </button>
              <button
                onClick={() => ajustarCaixa(10, 'Ajuste manual rápido', 'saida')}
                className="rounded bg-rose-200/60 px-1.5 font-bold text-rose-700 hover:bg-rose-300 dark:bg-rose-950 dark:text-rose-300"
              >
                -10
              </button>
            </div>
          </div>

          {/* Reputação */}
          <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-3 text-center dark:border-amber-800 dark:bg-amber-950/30">
            <span className="font-bold uppercase text-amber-800 dark:text-amber-300 block mb-1">
              Reputação (REP)
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateIndicadores({ rep: Math.max(0, indicadores.rep - 1) })}
                className="font-bold text-stone-400 hover:text-stone-700"
              >
                -
              </button>
              <span className="text-2xl font-black text-amber-700 dark:text-amber-400">
                {indicadores.rep}
              </span>
              <button
                onClick={() => updateIndicadores({ rep: indicadores.rep + 1 })}
                className="font-bold text-stone-400 hover:text-stone-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Ética */}
          <div className="rounded-xl border border-blue-300 bg-blue-50/70 p-3 text-center dark:border-blue-800 dark:bg-blue-950/30">
            <span className="font-bold uppercase text-blue-800 dark:text-blue-300 block mb-1">
              Ética (ETI)
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateIndicadores({ eti: Math.max(0, indicadores.eti - 1) })}
                className="font-bold text-stone-400 hover:text-stone-700"
              >
                -
              </button>
              <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
                {indicadores.eti}
              </span>
              <button
                onClick={() => updateIndicadores({ eti: indicadores.eti + 1 })}
                className="font-bold text-stone-400 hover:text-stone-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Relacionamento (ER) */}
          <div className="rounded-xl border border-purple-300 bg-purple-50/70 p-3 text-center dark:border-purple-800 dark:bg-purple-950/30">
            <span className="font-bold uppercase text-purple-800 dark:text-purple-300 block mb-1">
              Relacionamento (ER)
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateIndicadores({ er: Math.max(0, indicadores.er - 1) })}
                className="font-bold text-rose-500 hover:text-rose-700"
                title="Penalidade: deduz 20% do caixa se cair"
              >
                -
              </button>
              <span className="text-2xl font-black text-purple-700 dark:text-purple-400">
                {indicadores.er}
              </span>
              <button
                onClick={() => updateIndicadores({ er: indicadores.er + 1 })}
                className="font-bold text-stone-400 hover:text-stone-700"
              >
                +
              </button>
            </div>
            <span className="text-[9px] text-purple-600 block">-20% R$ ao cair</span>
          </div>

          {/* EXP */}
          <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-3 text-center dark:border-amber-800 dark:bg-amber-950/30">
            <span className="font-bold uppercase text-amber-800 dark:text-amber-300 block mb-1">
              Experiência (EXP)
            </span>
            <span className="text-2xl font-black text-amber-800 dark:text-amber-300">
              {indicadores.exp} / 100
            </span>
            <div className="mt-1 h-1.5 w-full rounded-full bg-amber-200 dark:bg-stone-700 overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all"
                style={{ width: `${Math.min(100, indicadores.exp)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sorteador de Cartas Rápido */}
      <SorteadorCartas />

      {/* Equipe e Habilidades na Mesa */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2 border-b pb-2">
            <Users className="h-4 w-4 text-amber-600" />
            Equipe na Mesa ({personagens.length} Confeiteiros)
          </h3>

          {personagens.length === 0 ? (
            <p className="text-xs text-stone-500">Nenhum personagem cadastrado ainda.</p>
          ) : (
            <div className="space-y-2.5 text-xs">
              {personagens.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/60 p-2.5 dark:border-stone-800 dark:bg-stone-800/40"
                >
                  <div>
                    <span className="font-bold text-stone-800 dark:text-stone-200 block">
                      {p.characterName} ({p.className})
                    </span>
                    <span className="text-[10px] text-stone-500">
                      INT {p.attributes.int} · SAB {p.attributes.sab} · DES {p.attributes.des} · CAR {p.attributes.car} · CON {p.attributes.con}
                    </span>
                  </div>

                  <button
                    onClick={() => abrirModal()}
                    className="rounded bg-amber-100 px-2 py-1 font-bold text-amber-900 hover:bg-amber-200 dark:bg-stone-800 dark:text-amber-300"
                  >
                    Rolar Teste
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resumo Rápido de Estoque */}
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2 border-b pb-2">
            <Package className="h-4 w-4 text-amber-600" />
            Estoque Disponível ({estoque.length} itens)
          </h3>

          {estoque.length === 0 ? (
            <p className="text-xs text-stone-500">Estoque vazio. Compre insumos na Ficha do Negócio.</p>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
              {estoque.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-stone-50 px-2.5 py-1 dark:bg-stone-800/50"
                >
                  <span className="font-medium text-stone-800 dark:text-stone-200 truncate max-w-[200px]">
                    {item.nome}
                  </span>
                  <span className={`font-bold ${item.quantidadeAtual <= 0 ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    {item.quantidadeAtual} {item.unidade}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Histórico Recente de Turnos */}
      {historicoTurnos.length > 0 && (
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2 border-b pb-2">
            <Clock className="h-4 w-4 text-amber-600" />
            Histórico de Turnos da Campanha ({historicoTurnos.length})
          </h3>

          <div className="space-y-2 text-xs">
            {historicoTurnos.slice(0, 5).map((turno) => (
              <div
                key={turno.id}
                className="rounded-xl border border-stone-200 bg-stone-50/50 p-3 dark:border-stone-800 dark:bg-stone-800/40"
              >
                <div className="flex items-center justify-between mb-1 font-bold">
                  <span className="text-amber-800 dark:text-amber-300">
                    Turno #{turno.numeroTurno}: {turno.demandaTitulo}
                  </span>
                  <span className={`text-[10px] rounded px-1.5 py-0.5 ${turno.acontecimentoTipo === 'vantagem' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {turno.acontecimentoTitulo}
                  </span>
                </div>
                <p className="font-serif italic text-stone-600 dark:text-stone-300 line-clamp-2">
                  &ldquo;{turno.demandaNarrativa}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
