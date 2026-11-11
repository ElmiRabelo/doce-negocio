'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { FalaDeApoio } from './FalaDeApoio';
import { NARRATIVAS_JOGO } from '@/data/narrativas';
import { Calculator, Dices, CheckCircle2, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CalculadoraTia: React.FC = () => {
  const { getActiveSession, ajustarCaixa, updateIndicadores } = useSessionStore();
  const { abrirModal } = useDiceStore();

  const session = getActiveSession();
  const precificacoes = session?.precificacoes || [];

  const prod1 = precificacoes[0] || {
    produtoNome: 'Primeiro Produto',
    precoVendaSugerido: 25.0,
    custoUnitario: 10.0
  };

  const prod2 = precificacoes[1] || {
    produtoNome: 'Segundo Produto',
    precoVendaSugerido: 35.0,
    custoUnitario: 14.0
  };

  const [precoP1, setPrecoP1] = useState<number>(prod1.precoVendaSugerido || 25.0);
  const [precoP2, setPrecoP2] = useState<number>(prod2.precoVendaSugerido || 35.0);
  const [custoP1, setCustoP1] = useState<number>(prod1.custoUnitario || 10.0);
  const [custoP2, setCustoP2] = useState<number>(prod2.custoUnitario || 14.0);

  const [porcentagemDesconto, setPorcentagemDesconto] = useState<number>(10);
  const [vendaConcluida, setVendaConcluida] = useState<boolean>(false);

  const totalCheio = precoP1 + precoP2;
  const valorDesconto = Math.round((totalCheio * (porcentagemDesconto / 100)) * 100) / 100;
  const totalComDesconto = Math.round((totalCheio - valorDesconto) * 100) / 100;
  const custoTotalProdutos = custoP1 + custoP2;
  const lucroReal = Math.round((totalComDesconto - custoTotalProdutos) * 100) / 100;
  const margemPercentual = totalComDesconto > 0 ? Math.round((lucroReal / totalComDesconto) * 100) : 0;

  const confirmarVenda = (valorFinal: number, motivoVenda: string) => {
    ajustarCaixa(valorFinal, motivoVenda, 'entrada');
    if (session) {
      updateIndicadores({
        exp: session.indicadores.exp + 10,
        rep: session.indicadores.rep + 1
      });
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    setVendaConcluida(true);
  };

  return (
    <div className="rounded-2xl border-2 border-amber-500 bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A] text-stone-900 dark:text-stone-100">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-200 pb-3 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700 text-white shadow-md">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white">
              Cena da Tia · Calculadora do Primeiro Pedido
            </h3>
            <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-0.5">
              Simule a proposta da tia, o desconto de 10%, a negociação e a margem real de lucro.
            </p>
          </div>
        </div>

        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-1.5 rounded-xl border-2 border-amber-400 bg-amber-50 px-3.5 py-2 text-xs font-black uppercase text-amber-950 hover:bg-amber-100 dark:border-amber-700 dark:bg-stone-800 dark:text-amber-200 shadow-sm transition"
        >
          <Dices className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          <span>Teste Diplomacia (CD 15)</span>
        </button>
      </div>

      {/* Falas de Apoio do Mestre */}
      <FalaDeApoio titulo="Apresente o Pedido da Tia" origem="Manual, p. 63">
        {NARRATIVAS_JOGO.cenaDaTia.falaTia}
      </FalaDeApoio>

      <FalaDeApoio titulo="Devolva a Decisão à Equipe" origem="Fala de Apoio">
        {NARRATIVAS_JOGO.cenaDaTia.perguntaEquipe}
      </FalaDeApoio>

      {/* Tabela de Preços e Cálculos em Cards com Alto Contraste */}
      <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 dark:border-stone-800 dark:bg-stone-900 shadow-sm">
          <h4 className="mb-3 font-black text-xs uppercase tracking-wider text-amber-950 dark:text-amber-200">
            1. Produtos Escolhidos & Preços de Tabela:
          </h4>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-bold text-stone-800 dark:text-stone-200">
                <span>Produto 1 ({prod1.produtoNome}):</span>
                <span className="text-amber-900 dark:text-amber-300">Custo: R$ {custoP1.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex gap-2">
                <input
                  type="number"
                  step="0.5"
                  value={precoP1}
                  onChange={(e) => setPrecoP1(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border-2 border-amber-300 bg-white p-2 font-black text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  placeholder="Preço de Venda R$"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-stone-800 dark:text-stone-200">
                <span>Produto 2 ({prod2.produtoNome}):</span>
                <span className="text-amber-900 dark:text-amber-300">Custo: R$ {custoP2.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex gap-2">
                <input
                  type="number"
                  step="0.5"
                  value={precoP2}
                  onChange={(e) => setPrecoP2(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border-2 border-amber-300 bg-white p-2 font-black text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  placeholder="Preço de Venda R$"
                />
              </div>
            </div>

            <div className="pt-3 border-t-2 border-amber-200 flex justify-between font-black text-sm">
              <span className="text-stone-900 dark:text-stone-100">Total de Tabela:</span>
              <span className="text-amber-900 dark:text-amber-300 text-base">R$ {totalCheio.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Cenário do Desconto */}
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 dark:border-stone-800 dark:bg-stone-900 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-amber-950 dark:text-amber-200">
              2. Simulação da Proposta:
            </h4>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span>Desconto:</span>
              <select
                value={porcentagemDesconto}
                onChange={(e) => setPorcentagemDesconto(parseInt(e.target.value) || 0)}
                className="rounded-lg border-2 border-amber-400 bg-white px-2 py-1 font-black text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              >
                <option value={10}>10% (Pedido da Tia)</option>
                <option value={5}>5% (Contraproposta Suave)</option>
                <option value={0}>0% (Preço Cheio)</option>
                <option value={15}>15% (Desconto Alto)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2.5 text-xs font-semibold">
            <div className="flex justify-between text-stone-700 dark:text-stone-300">
              <span>Desconto ({porcentagemDesconto}%):</span>
              <span className="text-rose-700 dark:text-rose-400 font-bold">- R$ {valorDesconto.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-stone-700 dark:text-stone-300">
              <span>Custo dos 2 produtos produzidos:</span>
              <span className="font-bold">R$ {custoTotalProdutos.toFixed(2)}</span>
            </div>

            <div className="pt-2 border-t-2 border-amber-200 flex justify-between font-black text-base text-stone-900 dark:text-stone-100">
              <span>Valor que a Tia paga:</span>
              <span className="text-emerald-800 dark:text-emerald-300 text-lg">R$ {totalComDesconto.toFixed(2)}</span>
            </div>

            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-100/90 p-3 text-center text-emerald-950 dark:bg-emerald-950/70 dark:text-emerald-200 shadow-sm">
              <span className="text-xs block font-bold uppercase tracking-wider">Lucro Líquido Real que Sobra no Caixa:</span>
              <span className="text-2xl font-black my-0.5 block">R$ {lucroReal.toFixed(2)}</span>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                (Margem de {margemPercentual}% sobre a venda)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Regra de Ouro da Negociação */}
      <div className="mb-5 rounded-2xl border-2 border-stone-300 bg-stone-50 p-4 text-xs dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-sm text-stone-900 dark:text-stone-100">
              Regra de Negociação com a Tia:
            </span>
            <ul className="mt-1.5 list-disc list-inside space-y-1 font-medium text-stone-700 dark:text-stone-300">
              <li><strong>Se aceitarem os 10%:</strong> Ela paga na hora R$ {totalComDesconto.toFixed(2)}. Não precisa de teste de dado.</li>
              <li><strong>Se contrapropuserem (ex: 5% ou brinde):</strong> Peça teste de <strong>Diplomacia (CAR) CD 15</strong>. Se passar, ela aceita sorrindo; se falhar, ela insiste no desconto original.</li>
              <li><strong>Se recusarem o desconto:</strong> Ela pode aceitar pagar o total cheio de R$ {totalCheio.toFixed(2)} ou desistir se acharem que foram rudes com a família!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ações de Desfecho */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-amber-200 pt-4 dark:border-stone-800">
        {vendaConcluida ? (
          <div className="flex items-center gap-2 font-black text-sm text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>Venda registrada com sucesso! Saldo e EXP atualizados no Caixa.</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => confirmarVenda(totalComDesconto, `Primeiro Pedido da Tia: 1 de cada com ${porcentagemDesconto}% de desconto`)}
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-600 transition text-xs"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Concluir Venda (R$ {totalComDesconto.toFixed(2)}) e Creditar no Caixa</span>
            </button>

            <button
              onClick={() => confirmarVenda(totalCheio, 'Primeiro Pedido da Tia: Preço Cheio sem desconto')}
              className="flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-100 px-5 py-2.5 font-black uppercase tracking-wider text-amber-950 hover:bg-amber-200 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200 transition text-xs"
            >
              <Sparkles className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span>Vender sem Desconto (R$ {totalCheio.toFixed(2)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
