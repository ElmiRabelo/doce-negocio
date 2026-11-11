'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDiceStore, DiceType } from '@/store/diceStore';
import { Dices, X, RefreshCw, Trophy, AlertTriangle, Trash2 } from 'lucide-react';

export const RoladorDadosModal: React.FC = () => {
  const { isOpen, fecharModal, rolarDado, historico, ultimoResultado, limparHistorico } = useDiceStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [tipoSelecionado, setTipoSelecionado] = useState<DiceType>('d20');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [modificador, setModificador] = useState<number>(0);
  const [cdAlvo, setCdAlvo] = useState<number>(15);
  const [motivo, setMotivo] = useState<string>('Teste de Perícia');
  const [descartarMenor, setDescartarMenor] = useState<boolean>(false);
  const [animando, setAnimando] = useState<boolean>(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    fecharModal();
  };

  const executarRolagem = () => {
    setAnimando(true);
    setTimeout(() => {
      rolarDado(tipoSelecionado, quantidade, modificador, cdAlvo, motivo, descartarMenor);
      setAnimando(false);
    }, 250);
  };

  const presetTesteD20 = (periciaNome: string, modValor: number) => {
    setTipoSelecionado('d20');
    setQuantidade(1);
    setModificador(modValor);
    setCdAlvo(15);
    setMotivo(`Teste de ${periciaNome}`);
    setDescartarMenor(false);
  };

  const presetCaixaResiliencia = () => {
    setTipoSelecionado('d4');
    setQuantidade(6);
    setModificador(0);
    setCdAlvo(0);
    setMotivo('Caixa Inicial - Resiliência (6d4 descarta menor × R$100)');
    setDescartarMenor(true);
  };

  const presetCaixaVisao = () => {
    setTipoSelecionado('d6');
    setQuantidade(7);
    setModificador(0);
    setCdAlvo(0);
    setMotivo('Caixa Inicial - Visão (7d6 descarta menor × R$100)');
    setDescartarMenor(true);
  };

  const presetReputacao = (perfil: 'resiliencia' | 'visao') => {
    setTipoSelecionado('d6');
    setQuantidade(perfil === 'visao' ? 2 : 1);
    setModificador(0);
    setCdAlvo(0);
    setMotivo(`Reputação Inicial (${perfil === 'visao' ? '2d6 somados' : '1d6'})`);
    setDescartarMenor(false);
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-labelledby="dice-modal-title"
      className="fixed inset-0 z-50 m-auto w-full max-w-lg rounded-2xl border border-amber-300/60 bg-amber-50 p-0 text-stone-900 shadow-2xl backdrop:bg-black/60 dark:border-amber-700/50 dark:bg-stone-900 dark:text-stone-100"
    >
      <div className="flex items-center justify-between border-b border-amber-200/80 bg-amber-100/60 px-5 py-4 dark:border-amber-800/40 dark:bg-stone-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white shadow">
            <Dices className="h-5 w-5" />
          </span>
          <h2 id="dice-modal-title" className="text-lg font-bold">
            Rolador de Dados do Mestre
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="rounded-lg p-1 text-stone-500 hover:bg-amber-200/50 hover:text-stone-800 dark:hover:bg-stone-700 dark:hover:text-stone-200"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-[80vh] overflow-y-auto p-5">
        {/* Presets rápidos do jogo */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Atalhos do Doce Negócio:
          </label>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => presetTesteD20('Padrão', 0)}
              className="rounded-md border border-amber-300 bg-white px-2.5 py-1 font-medium hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              1d20 + 0 vs CD 15
            </button>
            <button
              onClick={presetCaixaResiliencia}
              className="rounded-md border border-amber-300 bg-white px-2.5 py-1 font-medium hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              Caixa Resiliência (6d4)
            </button>
            <button
              onClick={presetCaixaVisao}
              className="rounded-md border border-amber-300 bg-white px-2.5 py-1 font-medium hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              Caixa Visão (7d6)
            </button>
            <button
              onClick={() => presetReputacao('resiliencia')}
              className="rounded-md border border-amber-300 bg-white px-2.5 py-1 font-medium hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              REP Resiliência (1d6)
            </button>
            <button
              onClick={() => presetReputacao('visao')}
              className="rounded-md border border-amber-300 bg-white px-2.5 py-1 font-medium hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              REP Visão (2d6)
            </button>
          </div>
        </div>

        {/* Seleção do Dado */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Tipo de Dado:
          </label>
          <div className="grid grid-cols-6 gap-2">
            {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20'] as DiceType[]).map((dado) => (
              <button
                key={dado}
                onClick={() => setTipoSelecionado(dado)}
                className={`rounded-xl border py-2.5 text-center font-bold transition-all ${
                  tipoSelecionado === dado
                    ? 'border-amber-600 bg-amber-600 text-white shadow-md scale-105'
                    : 'border-amber-200 bg-white text-stone-700 hover:border-amber-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {dado.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Quantidade e Modificador */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-stone-600 dark:text-stone-300">
              Quantidade:
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={quantidade}
              onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full rounded-lg border border-amber-300 bg-white p-2 font-bold text-center text-stone-800 focus:outline-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-stone-600 dark:text-stone-300">
              Modificador (+/-):
            </label>
            <input
              type="number"
              value={modificador}
              onChange={(e) => setModificador(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-amber-300 bg-white p-2 font-bold text-center text-stone-800 focus:outline-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-stone-600 dark:text-stone-300">
              CD Alvo (opcional):
            </label>
            <input
              type="number"
              value={cdAlvo || ''}
              placeholder="Ex: 15"
              onChange={(e) => setCdAlvo(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-amber-300 bg-white p-2 font-bold text-center text-stone-800 focus:outline-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Opção descartar menor */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-200/80 bg-amber-100/40 px-3 py-2 text-xs dark:border-stone-800 dark:bg-stone-800/40">
          <label htmlFor="descartarMenor" className="cursor-pointer font-medium text-stone-700 dark:text-stone-300">
            Descartar o menor resultado (Rolagem de Caixa Inicial)
          </label>
          <input
            id="descartarMenor"
            type="checkbox"
            checked={descartarMenor}
            onChange={(e) => setDescartarMenor(e.target.checked)}
            className="h-4 w-4 rounded accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Motivo */}
        <div className="mb-5">
          <label className="mb-1 block text-xs font-medium text-stone-600 dark:text-stone-300">
            Motivo / Descrição da Ação:
          </label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ex: Têmpera do chocolate, Negociar com a Tia, etc."
            className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
          />
        </div>

        {/* Botão Rolar */}
        <button
          onClick={executarRolagem}
          disabled={animando}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 ${animando ? 'animate-spin' : ''}`} />
          <span>Rolar {quantidade}{tipoSelecionado} {modificador !== 0 && (modificador > 0 ? `+ ${modificador}` : `- ${Math.abs(modificador)}`)}</span>
        </button>

        {/* Resultado Principal */}
        {ultimoResultado && (
          <div className="mt-5 rounded-2xl border-2 border-amber-400 bg-white p-4 text-center shadow-md dark:border-amber-600 dark:bg-stone-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              {ultimoResultado.motivo}
            </span>

            <div className="my-2 flex items-center justify-center gap-2">
              <span className="text-5xl font-black text-amber-700 dark:text-amber-400">
                {ultimoResultado.total}
              </span>
            </div>

            {/* Detalhes dos dados rolados */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
              <span>Dados:</span>
              {ultimoResultado.rolagens.map((val, idx) => {
                const isDescartado = val === ultimoResultado.descartadoMenor;
                return (
                  <span
                    key={idx}
                    className={`rounded px-1.5 py-0.5 font-bold ${
                      isDescartado
                        ? 'bg-rose-100 text-rose-700 line-through dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
                    }`}
                  >
                    {val}
                  </span>
                );
              })}
              {ultimoResultado.descartadoMenor !== undefined && (
                <span className="text-rose-600 font-medium">(menor descartado)</span>
              )}
              {ultimoResultado.modificador !== 0 && (
                <span className="font-semibold text-amber-600">
                  {ultimoResultado.modificador > 0 ? `+ ${ultimoResultado.modificador}` : `- ${Math.abs(ultimoResultado.modificador)}`}
                </span>
              )}
            </div>

            {/* Sucesso ou Falha contra CD */}
            {ultimoResultado.cd && ultimoResultado.cd > 0 && (
              <div className="mt-3 flex items-center justify-center gap-1.5 font-bold text-sm">
                {ultimoResultado.sucesso ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Trophy className="h-4 w-4" />
                    SUCESSO! (Total {ultimoResultado.total} ≥ CD {ultimoResultado.cd})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="h-4 w-4" />
                    FALHA! (Total {ultimoResultado.total} &lt; CD {ultimoResultado.cd})
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Histórico Recente */}
        {historico.length > 1 && (
          <div className="mt-6 border-t border-amber-200 pt-4 dark:border-stone-700">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>Histórico de Rolagens</span>
              <button
                onClick={limparHistorico}
                className="flex items-center gap-1 text-rose-600 hover:underline"
              >
                <Trash2 className="h-3 w-3" /> Limpar
              </button>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
              {historico.slice(1, 6).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded bg-white/70 px-2.5 py-1 text-stone-700 dark:bg-stone-800/60 dark:text-stone-300"
                >
                  <span className="truncate max-w-[200px]">{item.motivo}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      Total: {item.total}
                    </span>
                    {item.cd ? (
                      <span className={`text-[10px] font-bold ${item.sucesso ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.sucesso ? 'Sucesso' : 'Falha'}
                      </span>
                    ) : null}
                    <span className="text-[10px] text-stone-400">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-amber-200/80 bg-amber-100/30 px-5 py-3 text-right dark:border-stone-800 dark:bg-stone-800/40">
        <button
          onClick={handleClose}
          className="rounded-lg bg-stone-200 px-4 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-600"
        >
          Fechar
        </button>
      </div>
    </dialog>
  );
};
