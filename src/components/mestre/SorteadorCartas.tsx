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
    abrirModal();
  };

  const aplicarEfeitoVantagem = (carta: GameCard) => {
    if (!session) return;
    if (carta.id === 'vantagem-17') {
      updateIndicadores({ rep: session.indicadores.rep + 5 });
      try { confetti({ particleCount: 50, spread: 45 }); } catch {}
    } else if (carta.id === 'vantagem-13') {
      ajustarCaixa(50, 'Gorjeta generosa de 10% recebida', 'entrada');
    } else if (carta.id === 'vantagem-14') {
      updateIndicadores({ rep: session.indicadores.rep + 2 });
    } else {
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
    <div className="rounded-2xl border-2 border-amber-500 bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A] text-stone-900 dark:text-stone-100">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-200 pb-3 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700 text-white shadow-md">
            <Layers className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white">
              Baralho Virtual · Demandas & Monte Misto
            </h3>
            <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-0.5">
              Tire a oportunidade da rodada (Demanda) e o acontecimento inesperado (Monte Misto).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200 cursor-pointer">
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
            className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow hover:bg-amber-600 transition"
          >
            <RotateCw className="h-4 w-4" />
            <span>Sortear Turno Completo</span>
          </button>
        </div>
      </div>

      {/* Cartas Sorteador Grid com Alto Contraste */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Lado 1: Demanda */}
        <div className="flex flex-col rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-4.5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200">
              <Sparkles className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              Carta de Demanda (Cliente / Pedido)
            </span>
            <button
              onClick={sortearDemanda}
              disabled={animandoDemanda}
              className="rounded-xl border-2 border-amber-400 bg-white px-3 py-1 text-xs font-black uppercase text-amber-950 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200 transition"
            >
              {demandaAtual ? 'Sortear Outra' : 'Puxar Demanda'}
            </button>
          </div>

          {demandaAtual ? (
            <div className="flex-1 flex flex-col justify-between rounded-2xl border-2 border-amber-500 bg-white p-5 shadow-sm dark:border-amber-600/70 dark:bg-[#1F140D]">
              <div>
                <div className="flex items-center justify-between border-b-2 border-amber-200 pb-2.5 mb-2.5 dark:border-stone-800">
                  <h4 className="font-black text-base text-stone-900 dark:text-white">
                    {demandaAtual.titulo}
                  </h4>
                  <span className="rounded-md border border-amber-400 bg-amber-100 px-2 py-0.5 text-[11px] font-black text-amber-950 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
                    {demandaAtual.fonte === 'oficial' ? `Carta #${demandaAtual.numero}` : 'Regional Bahia'}
                  </span>
                </div>

                <p className="font-serif text-sm leading-relaxed text-stone-900 dark:text-stone-100 mb-3 italic">
                  &ldquo;{demandaAtual.narrativa}&rdquo;
                </p>

                <div className="rounded-xl bg-amber-50 border-2 border-amber-300 p-3 text-xs text-amber-950 dark:bg-stone-800 dark:border-stone-700 dark:text-amber-200 mb-3 font-medium">
                  <span className="font-black block mb-0.5 text-xs uppercase tracking-wide">Efeito no Jogo:</span>
                  {demandaAtual.efeitoRegra}
                </div>
              </div>

              {demandaAtual.testeSugerido && (
                <div className="flex items-center justify-between pt-3 border-t-2 border-amber-100 text-xs dark:border-stone-800">
                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    Teste: <strong className="text-stone-900 dark:text-white">{demandaAtual.testeSugerido.pericia}</strong> (CD {demandaAtual.testeSugerido.cd})
                  </span>
                  <button
                    onClick={() => rolarTesteSugerido(demandaAtual)}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-3 py-1.5 font-black uppercase text-white hover:bg-amber-600 shadow"
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
              className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-400 p-8 text-center cursor-pointer hover:bg-amber-100/40 transition dark:border-stone-700"
            >
              <Sparkles className="h-8 w-8 text-amber-600 mb-2" />
              <p className="font-black text-sm text-stone-900 dark:text-stone-100">Clique para puxar uma Demanda</p>
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-1">Descubra qual oportunidade de venda bateu à porta da equipe.</p>
            </div>
          )}
        </div>

        {/* Lado 2: Monte Misto */}
        <div className="flex flex-col rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-4.5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              Monte Misto (Acontecimento da Rodada)
            </span>
            <button
              onClick={sortearMisto}
              disabled={animandoMisto}
              className="rounded-xl border-2 border-amber-400 bg-white px-3 py-1 text-xs font-black uppercase text-amber-950 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200 transition"
            >
              {mistoAtual ? 'Sortear Outro' : 'Puxar Acontecimento'}
            </button>
          </div>

          {mistoAtual ? (
            <div
              className={`flex-1 flex flex-col justify-between rounded-2xl border-2 bg-white p-5 shadow-sm dark:bg-[#1F140D] ${
                mistoAtual.tipo === 'vantagem'
                  ? 'border-emerald-500 dark:border-emerald-600'
                  : 'border-rose-500 dark:border-rose-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b-2 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    {mistoAtual.tipo === 'vantagem' ? (
                      <span className="rounded-xl bg-emerald-100 p-1.5 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="rounded-xl bg-rose-100 p-1.5 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                    )}
                    <h4 className="font-black text-base text-stone-900 dark:text-white">
                      {mistoAtual.titulo}
                    </h4>
                  </div>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-black uppercase ${
                      mistoAtual.tipo === 'vantagem'
                        ? 'border-emerald-400 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200'
                        : 'border-rose-400 bg-rose-100 text-rose-950 dark:bg-rose-950 dark:text-rose-200'
                    }`}
                  >
                    {mistoAtual.tipo === 'vantagem' ? 'Vantagem' : 'Obstáculo'}
                  </span>
                </div>

                <p className="font-serif text-sm leading-relaxed text-stone-900 dark:text-stone-100 mb-3 italic">
                  &ldquo;{mistoAtual.narrativa}&rdquo;
                </p>

                <div
                  className={`rounded-xl border-2 p-3 text-xs mb-3 font-medium ${
                    mistoAtual.tipo === 'vantagem'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
                      : 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                  }`}
                >
                  <span className="font-black block mb-0.5 text-xs uppercase tracking-wide">Efeito no Jogo:</span>
                  {mistoAtual.efeitoRegra}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t-2 border-stone-200 text-xs dark:border-stone-800">
                {mistoAtual.testeSugerido ? (
                  <>
                    <span className="font-bold text-stone-700 dark:text-stone-300">
                      Teste: <strong className="text-stone-900 dark:text-white">{mistoAtual.testeSugerido.pericia}</strong> (CD {mistoAtual.testeSugerido.cd})
                    </span>
                    <button
                      onClick={() => rolarTesteSugerido(mistoAtual)}
                      className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-3 py-1.5 font-black uppercase text-white hover:bg-amber-600 shadow"
                    >
                      <Dices className="h-3.5 w-3.5" />
                      <span>Rolar Dado</span>
                    </button>
                  </>
                ) : mistoAtual.tipo === 'vantagem' ? (
                  <button
                    onClick={() => aplicarEfeitoVantagem(mistoAtual)}
                    className="ml-auto flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-1.5 font-black uppercase text-white hover:bg-emerald-600 shadow"
                  >
                    <Check className="h-4 w-4" />
                    <span>Aplicar Benefício</span>
                  </button>
                ) : (
                  <span className="text-stone-600 dark:text-stone-400 font-bold text-xs">Decisão livre da equipe</span>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={sortearMisto}
              className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-400 p-8 text-center cursor-pointer hover:bg-amber-100/40 transition dark:border-stone-700"
            >
              <AlertTriangle className="h-8 w-8 text-amber-600 mb-2" />
              <p className="font-black text-sm text-stone-900 dark:text-stone-100">Clique para puxar um Acontecimento</p>
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-1">Pode ser um obstáculo desafiador ou uma vantagem salvadora!</p>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Fechamento do Turno */}
      {demandaAtual && mistoAtual && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 dark:border-stone-800 dark:bg-stone-900">
          <div>
            <span className="font-black text-sm text-amber-950 dark:text-amber-200 block">
              Concluir Turno em Mesa
            </span>
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
              Registra este par de cartas no histórico oficial da campanha e confere +10 EXP de aprendizado.
            </span>
          </div>

          {turnoSalvo ? (
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400">
              <Check className="h-4 w-4" />
              <span>Turno arquivado com sucesso!</span>
            </div>
          ) : (
            <button
              onClick={salvarNoHistoricoTurno}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:from-amber-500 hover:to-amber-600 transition"
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
