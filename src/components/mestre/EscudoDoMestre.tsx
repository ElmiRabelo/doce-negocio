'use client';

import React from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { SorteadorCartas } from './SorteadorCartas';
import { 
  Shield, 
  Users, 
  Package, 
  Dices, 
  Clock
} from 'lucide-react';

export const EscudoDoMestre: React.FC = () => {
  const { getActiveSession, updateIndicadores, ajustarCaixa } = useSessionStore();
  const { abrirModal } = useDiceStore();
  const session = getActiveSession();

  if (!session) {
    return <div className="p-8 text-center text-stone-700 font-bold">Nenhuma sessão ativa.</div>;
  }

  const { indicadores, estoque, personagens, historicoTurnos, perfil, nomeNegocio } = session;

  return (
    <div className="space-y-6">
      {/* Top Banner Escudo com Alto Contraste */}
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-md border border-amber-400/40">
              <Shield className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-[#1F1007] dark:text-white">
                Escudo do Mestre · Painel Ao Vivo
              </h2>
              <p className="text-xs font-semibold text-[#543826] dark:text-amber-200/90 mt-0.5">
                {nomeNegocio} (Perfil {perfil === 'visao' ? 'Visão' : 'Resiliência'}) · Cockpit unificado para mestrar em tempo real.
              </p>
            </div>
          </div>

          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:from-amber-500 hover:to-amber-600 transition"
          >
            <Dices className="h-4 w-4" />
            <span>Rolar Dados (d20)</span>
          </button>
        </div>

        {/* Indicadores Principais em Cards de Alto Contraste */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-5 pt-4 text-xs font-bold">
          {/* Caixa */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 p-3.5 text-center shadow-sm dark:border-emerald-700 dark:bg-emerald-950/60">
            <span className="font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200 block mb-1">
              Caixa R$
            </span>
            <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
              R$ {indicadores.caixa.toFixed(2)}
            </span>
            <div className="flex justify-center gap-1.5 mt-2 text-xs">
              <button
                onClick={() => ajustarCaixa(10, 'Ajuste manual rápido', 'entrada')}
                className="rounded-lg bg-emerald-600 text-white px-2 py-0.5 font-bold hover:bg-emerald-700 transition"
              >
                +10
              </button>
              <button
                onClick={() => ajustarCaixa(10, 'Ajuste manual rápido', 'saida')}
                className="rounded-lg bg-rose-600 text-white px-2 py-0.5 font-bold hover:bg-rose-700 transition"
              >
                -10
              </button>
            </div>
          </div>

          {/* Reputação */}
          <div className="rounded-2xl border-2 border-amber-500 bg-amber-50/80 p-3.5 text-center shadow-sm dark:border-amber-700 dark:bg-amber-950/60">
            <span className="font-black uppercase tracking-wider text-amber-950 dark:text-amber-200 block mb-1">
              Reputação (REP)
            </span>
            <div className="flex items-center justify-center gap-2.5 my-1">
              <button
                onClick={() => updateIndicadores({ rep: Math.max(0, indicadores.rep - 1) })}
                className="h-6 w-6 rounded-md bg-amber-200 text-amber-950 font-black hover:bg-amber-300 dark:bg-amber-900 dark:text-white"
              >
                -
              </button>
              <span className="text-2xl font-black text-amber-900 dark:text-amber-300">
                {indicadores.rep}
              </span>
              <button
                onClick={() => updateIndicadores({ rep: indicadores.rep + 1 })}
                className="h-6 w-6 rounded-md bg-amber-600 text-white font-black hover:bg-amber-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Ética */}
          <div className="rounded-2xl border-2 border-blue-500 bg-blue-50/80 p-3.5 text-center shadow-sm dark:border-blue-700 dark:bg-blue-950/60">
            <span className="font-black uppercase tracking-wider text-blue-950 dark:text-blue-200 block mb-1">
              Ética (ETI)
            </span>
            <div className="flex items-center justify-center gap-2.5 my-1">
              <button
                onClick={() => updateIndicadores({ eti: Math.max(0, indicadores.eti - 1) })}
                className="h-6 w-6 rounded-md bg-blue-200 text-blue-950 font-black hover:bg-blue-300 dark:bg-blue-900 dark:text-white"
              >
                -
              </button>
              <span className="text-2xl font-black text-blue-900 dark:text-blue-300">
                {indicadores.eti}
              </span>
              <button
                onClick={() => updateIndicadores({ eti: indicadores.eti + 1 })}
                className="h-6 w-6 rounded-md bg-blue-600 text-white font-black hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Relacionamento (ER) */}
          <div className="rounded-2xl border-2 border-purple-500 bg-purple-50/80 p-3.5 text-center shadow-sm dark:border-purple-700 dark:bg-purple-950/60">
            <span className="font-black uppercase tracking-wider text-purple-950 dark:text-purple-200 block mb-1">
              Relacionamento (ER)
            </span>
            <div className="flex items-center justify-center gap-2.5 my-1">
              <button
                onClick={() => updateIndicadores({ er: Math.max(0, indicadores.er - 1) })}
                className="h-6 w-6 rounded-md bg-rose-600 text-white font-black hover:bg-rose-700"
                title="Penalidade: deduz 20% do caixa se cair"
              >
                -
              </button>
              <span className="text-2xl font-black text-purple-900 dark:text-purple-300">
                {indicadores.er}
              </span>
              <button
                onClick={() => updateIndicadores({ er: indicadores.er + 1 })}
                className="h-6 w-6 rounded-md bg-purple-600 text-white font-black hover:bg-purple-700"
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-purple-900 dark:text-purple-300 font-bold block mt-1">
              -20% R$ ao cair
            </span>
          </div>

          {/* EXP */}
          <div className="rounded-2xl border-2 border-amber-600 bg-amber-50/80 p-3.5 text-center shadow-sm dark:border-amber-700 dark:bg-stone-900">
            <span className="font-black uppercase tracking-wider text-amber-950 dark:text-amber-200 block mb-1">
              Experiência (EXP)
            </span>
            <span className="text-2xl font-black text-amber-900 dark:text-amber-300">
              {indicadores.exp} / 100
            </span>
            <div className="mt-2 h-2 w-full rounded-full bg-amber-200 dark:bg-stone-700 overflow-hidden border border-amber-400/40">
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
        <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
          <h3 className="font-black text-base text-stone-900 dark:text-white mb-3 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
            <Users className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            Equipe na Mesa ({personagens.length} Confeiteiros)
          </h3>

          {personagens.length === 0 ? (
            <p className="text-xs font-semibold text-stone-500 p-2">Nenhum personagem cadastrado ainda. Use a aba Personagens.</p>
          ) : (
            <div className="space-y-3 text-xs">
              {personagens.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border-2 border-amber-200 bg-amber-50/50 p-3 dark:border-stone-800 dark:bg-stone-900"
                >
                  <div>
                    <span className="font-black text-sm text-stone-900 dark:text-white block">
                      {p.characterName} ({p.className})
                    </span>
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 mt-0.5 block">
                      INT {p.attributes.int} · SAB {p.attributes.sab} · DES {p.attributes.des} · CAR {p.attributes.car} · CON {p.attributes.con}
                    </span>
                  </div>

                  <button
                    onClick={() => abrirModal()}
                    className="rounded-xl bg-amber-700 px-3 py-1.5 font-black uppercase text-white hover:bg-amber-600 transition shadow-sm text-[11px]"
                  >
                    Rolar Teste
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resumo Rápido de Estoque */}
        <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
          <h3 className="font-black text-base text-stone-900 dark:text-white mb-3 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
            <Package className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            Estoque Disponível ({estoque.length} itens)
          </h3>

          {estoque.length === 0 ? (
            <p className="text-xs font-semibold text-stone-500 p-2">Estoque vazio. Compre insumos na Ficha do Negócio.</p>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1 text-xs">
              {estoque.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-2.5 dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="font-black text-stone-900 dark:text-stone-100 truncate max-w-[200px]">
                    {item.nome}
                  </span>
                  <span className={`font-black text-xs px-2 py-0.5 rounded-full ${item.quantidadeAtual <= 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-900'}`}>
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
        <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
          <h3 className="font-black text-base text-stone-900 dark:text-white mb-3 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
            <Clock className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            Histórico de Turnos da Campanha ({historicoTurnos.length})
          </h3>

          <div className="space-y-2.5 text-xs">
            {historicoTurnos.slice(0, 5).map((turno) => (
              <div
                key={turno.id}
                className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-3.5 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="flex items-center justify-between mb-1.5 font-black">
                  <span className="text-amber-950 dark:text-amber-200 text-sm">
                    Turno #{turno.numeroTurno}: {turno.demandaTitulo}
                  </span>
                  <span className={`text-[11px] rounded-lg px-2 py-0.5 font-black uppercase ${turno.acontecimentoTipo === 'vantagem' ? 'bg-emerald-200 text-emerald-950' : 'bg-rose-200 text-rose-950'}`}>
                    {turno.acontecimentoTitulo}
                  </span>
                </div>
                <p className="font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
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
