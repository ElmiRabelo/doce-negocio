'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { CARTAS_DEMANDA_OFICIAIS, CARTAS_MONTE_MISTO_OFICIAIS } from '@/data/cartas-oficiais';
import { CARTAS_EXTRAS_REGIONAL } from '@/data/demandas-extras';
import { GameCard } from '@/types';
import { Layers, Dices, Sparkles, AlertTriangle, ShieldCheck, Check, ArrowRight, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SorteadorCartas: React.FC = () => {
  const { getActiveSession, updateIndicadores, ajustarCaixa, registrarTurno } = useSessionStore();
  const { abrirModal } = useDiceStore();
  const session = getActiveSession();

  // Combina cartas oficiais + extras + customizadas do mestre
  const customizadas = session?.baralhosPersonalizados || [];

  const todasDemandas = [
    ...CARTAS_DEMANDA_OFICIAIS,
    ...CARTAS_EXTRAS_REGIONAL.filter((c) => c.tipo === 'demanda'),
    ...customizadas.filter((c) => c.tipo === 'demanda')
  ];

  const todosMistos = [
    ...CARTAS_MONTE_MISTO_OFICIAIS,
    ...CARTAS_EXTRAS_REGIONAL.filter((c) => c.tipo !== 'demanda'),
    ...customizadas.filter((c) => c.tipo !== 'demanda')
  ];

  const [demandaAtual, setDemandaAtual] = useState<GameCard | null>(null);
  const [mistoAtual, setMistoAtual] = useState<GameCard | null>(null);
  const [incluirExtras, setIncluirExtras] = useState<boolean>(true);
  const [animandoDemanda, setAnimandoDemanda] = useState<boolean>(false);
  const [animandoMisto, setAnimandoMisto] = useState<boolean>(false);
  const [turnoSalvo, setTurnoSalvo] = useState<boolean>(false);

  const sortearDemanda = () => {
    setAnimandoDemanda(true);
    setTurnoSalvo(false);
    setTimeout(() => {
      const pool = incluirExtras ? todasDemandas : CARTAS_DEMANDA_OFICIAIS;
      const sorteada = pool[Math.floor(Math.random() * pool.length)];
      setDemandaAtual(sorteada);
      setAnimandoDemanda(false);
    }, 200);
  };

  const sortearMisto = () => {
    setAnimandoMisto(true);
    setTurnoSalvo(false);
    setTimeout(() => {
      const pool = incluirExtras ? todosMistos : CARTAS_MONTE_MISTO_OFICIAIS;
      const sorteada = pool[Math.floor(Math.random() * pool.length)];
      setMistoAtual(sorteada);
      setAnimandoMisto(false);
    }, 200);
  };

  const sortearAmbos = () => {
    sortearDemanda();
    sortearMisto();
  };

  const rolarTesteSugerido = (carta: GameCard) => {
    if (carta.testeSugerido) {
      abrirModal();
    } else {
      abrirModal();
    }
  };

  const aplicarEfeitoVantagem = (carta: GameCard) => {
    if (!session) return;
    if (carta.id === 'vantagem-17') {
      // Elogio +5 REP
      updateIndicadores({ rep: session.indicadores.rep + 5 });
      try { confetti({ particleCount: 50, spread: 45 }); } catch {}
    } else if (carta.id === 'vantagem-13') {
      // Gorjeta 10%
      ajustarCaixa(50, 'Gorjeta generosa de 10% recebida', 'entrada');
    } else if (carta.id === 'vantagem-14') {
      // +2 REP
      updateIndicadores({ rep: session.indicadores.rep + 2 });
    } else {
      // Outro efeito
      updateIndicadores({ exp: session.indicadores.exp + 10 });
    }
  };

  const salvarNoHistoricoTurno = () => {
    if (!session || !demandaAtual || !mistoAtual) return;

    const numTurno = (session.historicoTurnos?.length || 0) + 1;
    registrarTurno({
      numeroTurno: numTurno,
      demandaCardId: demandaAtual.id,
      demandaTitulo: demandaAtual.titulo,
      demandaNarrativa: demandaAtual.narrativa,
      acontecimentoCardId: mistoAtual.id,
      acontecimentoTitulo: mistoAtual.titulo,
      acontecimentoTipo: mistoAtual.tipo as 'obstaculo' | 'vantagem',
      acontecimentoEfeito: mistoAtual.efeitoRegra,
      decisaoJogadores: 'Turno jogado em mesa.',
      impactoCaixa: 0,
      impactoRep: 0,
      impactoEti: 0,
      impactoEr: 0,
      impactoExp: 10,
      status: 'concluido',
      pendencias: 'Nenhuma'
    });

    setTurnoSalvo(true);
  };

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-md dark:border-amber-700/60 dark:bg-stone-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-3 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white shadow">
            <Layers className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Baralho Virtual · Demandas & Monte Misto
            </h3>
            <p className="text-xs text-stone-500">
              Tire a oportunidade da rodada (Demanda) e o acontecimento inesperado (Monte Misto).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={incluirExtras}
              onChange={(e) => setIncluirExtras(e.target.checked)}
              className="h-4 w-4 rounded accent-amber-600 cursor-pointer"
            />
            <span>Incluir cartas regionais & customizadas</span>
          </label>

          <button
            onClick={sortearAmbos}
            className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 transition"
          >
            <RotateCw className="h-4 w-4" />
            <span>Sortear Turno Completo</span>
          </button>
        </div>
      </div>

      {/* Cartas Sorteador Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Lado 1: Demanda */}
        <div className="flex flex-col rounded-xl border border-amber-200 bg-amber-50/40 p-4 dark:border-stone-800 dark:bg-stone-800/40">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              <Sparkles className="h-4 w-4 text-amber-600" />
              Carta de Demanda (Cliente / Pedido)
            </span>
            <button
              onClick={sortearDemanda}
              disabled={animandoDemanda}
              className="rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200"
            >
              {demandaAtual ? 'Sortear Outra' : 'Puxar Demanda'}
            </button>
          </div>

          {demandaAtual ? (
            <div className="flex-1 flex flex-col justify-between rounded-xl border-2 border-amber-400 bg-white p-4 shadow-sm dark:border-amber-600/60 dark:bg-stone-900">
              <div>
                <div className="flex items-center justify-between border-b border-amber-100 pb-2 mb-2">
                  <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">
                    {demandaAtual.titulo}
                  </h4>
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {demandaAtual.fonte === 'oficial' ? `Carta #${demandaAtual.numero}` : 'Regional Bahia'}
                  </span>
                </div>

                <p className="font-serif text-sm leading-relaxed text-stone-800 dark:text-stone-200 mb-3 italic">
                  &ldquo;{demandaAtual.narrativa}&rdquo;
                </p>

                <div className="rounded-lg bg-amber-50 p-2.5 text-xs text-amber-950 dark:bg-stone-800 dark:text-amber-200 mb-3">
                  <span className="font-bold block mb-0.5">Efeito no Jogo:</span>
                  {demandaAtual.efeitoRegra}
                </div>
              </div>

              {demandaAtual.testeSugerido && (
                <div className="flex items-center justify-between pt-2 border-t border-amber-100 text-xs">
                  <span className="font-medium text-stone-600 dark:text-stone-400">
                    Teste: <strong>{demandaAtual.testeSugerido.pericia}</strong> (CD {demandaAtual.testeSugerido.cd})
                  </span>
                  <button
                    onClick={() => rolarTesteSugerido(demandaAtual)}
                    className="flex items-center gap-1 rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
                  >
                    <Dices className="h-3.5 w-3.5" />
                    <span>Rolar no Dado</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={sortearDemanda}
              className="flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 p-8 text-center cursor-pointer hover:bg-amber-100/30 transition dark:border-stone-700"
            >
              <Sparkles className="h-8 w-8 text-amber-500 mb-2 opacity-60" />
              <p className="font-bold text-sm text-stone-700 dark:text-stone-300">Clique para puxar uma Demanda</p>
              <p className="text-xs text-stone-400 mt-1">Descubra qual oportunidade de venda bateu à porta da equipe.</p>
            </div>
          )}
        </div>

        {/* Lado 2: Monte Misto (Obstáculo ou Vantagem) */}
        <div className="flex flex-col rounded-xl border border-amber-200 bg-amber-50/40 p-4 dark:border-stone-800 dark:bg-stone-800/40">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Monte Misto (Acontecimento da Rodada)
            </span>
            <button
              onClick={sortearMisto}
              disabled={animandoMisto}
              className="rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200"
            >
              {mistoAtual ? 'Sortear Outro' : 'Puxar Acontecimento'}
            </button>
          </div>

          {mistoAtual ? (
            <div
              className={`flex-1 flex flex-col justify-between rounded-xl border-2 bg-white p-4 shadow-sm dark:bg-stone-900 ${
                mistoAtual.tipo === 'vantagem'
                  ? 'border-emerald-400 dark:border-emerald-600/60'
                  : 'border-rose-400 dark:border-rose-600/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    {mistoAtual.tipo === 'vantagem' ? (
                      <span className="rounded-full bg-emerald-100 p-1 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="rounded-full bg-rose-100 p-1 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                    )}
                    <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">
                      {mistoAtual.titulo}
                    </h4>
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      mistoAtual.tipo === 'vantagem'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {mistoAtual.tipo === 'vantagem' ? 'Vantagem' : 'Obstáculo'}
                  </span>
                </div>

                <p className="font-serif text-sm leading-relaxed text-stone-800 dark:text-stone-200 mb-3 italic">
                  &ldquo;{mistoAtual.narrativa}&rdquo;
                </p>

                <div
                  className={`rounded-lg p-2.5 text-xs mb-3 ${
                    mistoAtual.tipo === 'vantagem'
                      ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : 'bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
                  }`}
                >
                  <span className="font-bold block mb-0.5">Efeito no Jogo:</span>
                  {mistoAtual.efeitoRegra}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs dark:border-stone-800">
                {mistoAtual.testeSugerido ? (
                  <>
                    <span className="font-medium text-stone-600 dark:text-stone-400">
                      Teste: <strong>{mistoAtual.testeSugerido.pericia}</strong> (CD {mistoAtual.testeSugerido.cd})
                    </span>
                    <button
                      onClick={() => rolarTesteSugerido(mistoAtual)}
                      className="flex items-center gap-1 rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
                    >
                      <Dices className="h-3.5 w-3.5" />
                      <span>Rolar Dado</span>
                    </button>
                  </>
                ) : mistoAtual.tipo === 'vantagem' ? (
                  <button
                    onClick={() => aplicarEfeitoVantagem(mistoAtual)}
                    className="ml-auto flex items-center gap-1 rounded bg-emerald-600 px-3 py-1 font-bold text-white hover:bg-emerald-700"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Aplicar Benefício</span>
                  </button>
                ) : (
                  <span className="text-stone-400 text-[11px]">Decisão livre da equipe</span>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={sortearMisto}
              className="flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 p-8 text-center cursor-pointer hover:bg-amber-100/30 transition dark:border-stone-700"
            >
              <AlertTriangle className="h-8 w-8 text-amber-500 mb-2 opacity-60" />
              <p className="font-bold text-sm text-stone-700 dark:text-stone-300">Clique para puxar um Acontecimento</p>
              <p className="text-xs text-stone-400 mt-1">Pode ser um obstáculo desafiador ou uma vantagem salvadora!</p>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Fechamento do Turno */}
      {demandaAtual && mistoAtual && (
        <div className="mt-6 flex items-center justify-between rounded-xl bg-amber-100/60 p-4 dark:bg-stone-800/80">
          <div>
            <span className="font-bold text-sm text-amber-950 dark:text-amber-200 block">
              Concluir Turno em Mesa
            </span>
            <span className="text-xs text-stone-600 dark:text-stone-400">
              Registra este par de cartas no histórico oficial da campanha e confere +10 EXP de aprendizado.
            </span>
          </div>

          {turnoSalvo ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <Check className="h-4 w-4" />
              <span>Turno arquivado com sucesso!</span>
            </div>
          ) : (
            <button
              onClick={salvarNoHistoricoTurno}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2 text-xs font-bold text-white shadow hover:scale-105 transition"
            >
              <span>Salvar no Registro do Turno</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
