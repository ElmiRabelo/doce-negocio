'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { CATALOGO_PASCOA, ProdutoPascoa } from '@/data/catalogo-pascoa';
import { CATALOGO_INSUMOS_SIMULACAO } from '@/data/catalogo-compras';
import { ProductPricing, InsumoUsado, EmbalagemUsada } from '@/types';
import { Calculator, Plus, Trash2, CheckCircle2, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

export const CalculadoraPrecificacao: React.FC = () => {
  const { getActiveSession, salvarPrecificacao, removerPrecificacao } = useSessionStore();
  const session = getActiveSession();

  const precificacoes = session?.precificacoes || [];

  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoPascoa>(CATALOGO_PASCOA[0]);
  const [rendimentoLote, setRendimentoLote] = useState<number>(5);
  const [lucroDesejado, setLucroDesejado] = useState<number>(15.0);

  // Lista de ingredientes do lote
  const [ingredientes, setIngredientes] = useState<InsumoUsado[]>([
    {
      id: 'ing_1',
      nome: 'Chocolate Nobre em Barra',
      precoCompra: 10.0,
      qtdCompra: 100,
      unidadeCompra: 'g',
      qtdUsada: 950,
      unidadeUsada: 'g',
      custoCalculado: (10.0 * 950) / 100
    }
  ]);

  // Lista de embalagens do lote
  const [embalagens, setEmbalagens] = useState<EmbalagemUsada[]>([
    {
      id: 'emb_1',
      nome: 'Sacos Celofane Decorados (25 un.)',
      precoTotalPacote: 21.99,
      qtdPacote: 25,
      qtdUsada: 5,
      custoCalculado: Math.round(((21.99 * 5) / 25) * 100) / 100
    },
    {
      id: 'emb_2',
      nome: 'Fita de Cetim (10 m)',
      precoTotalPacote: 23.00,
      qtdPacote: 10,
      qtdUsada: 2,
      custoCalculado: Math.round(((23.00 * 2) / 10) * 100) / 100
    }
  ]);

  const custoTotalIngredientes = ingredientes.reduce((acc, curr) => acc + curr.custoCalculado, 0);
  const custoTotalEmbalagens = embalagens.reduce((acc, curr) => acc + curr.custoCalculado, 0);
  const custoTotalLote = Math.round((custoTotalIngredientes + custoTotalEmbalagens) * 100) / 100;
  const custoUnitario = rendimentoLote > 0 ? Math.round((custoTotalLote / rendimentoLote) * 100) / 100 : 0;
  const precoVendaFinal = Math.round((custoUnitario + lucroDesejado) * 100) / 100;
  const margemLucro = precoVendaFinal > 0 ? Math.round((lucroDesejado / precoVendaFinal) * 100) : 0;

  const handleMudarProduto = (prod: ProdutoPascoa) => {
    setProdutoSelecionado(prod);
    const qtdChocTotal = prod.chocolateG * rendimentoLote;
    setIngredientes([
      {
        id: 'ing_choc',
        nome: 'Chocolate Nobre em Barra',
        precoCompra: 10.0,
        qtdCompra: 100,
        unidadeCompra: 'g',
        qtdUsada: qtdChocTotal,
        unidadeUsada: 'g',
        custoCalculado: (10.0 * qtdChocTotal) / 100
      }
    ]);
  };

  const handleAddIngrediente = () => {
    const item = CATALOGO_INSUMOS_SIMULACAO[3];
    const novo: InsumoUsado = {
      id: 'ing_' + Date.now(),
      nome: item.nome,
      precoCompra: item.precoPadrao,
      qtdCompra: item.quantidadeEmbalagem,
      unidadeCompra: item.unidade,
      qtdUsada: 200,
      unidadeUsada: item.unidade,
      custoCalculado: Math.round(((item.precoPadrao * 200) / item.quantidadeEmbalagem) * 100) / 100
    };
    setIngredientes([...ingredientes, novo]);
  };

  const handleUpdateIngrediente = (id: string, qtdUsada: number) => {
    setIngredientes((prev) =>
      prev.map((ing) => {
        if (ing.id === id) {
          const custo = Math.round(((ing.precoCompra * qtdUsada) / ing.qtdCompra) * 100) / 100;
          return { ...ing, qtdUsada, custoCalculado: custo };
        }
        return ing;
      })
    );
  };

  const handleRemoveIngrediente = (id: string) => {
    setIngredientes(ingredientes.filter((i) => i.id !== id));
  };

  const handleSalvarFichaPrecificacao = () => {
    const novaFicha: ProductPricing = {
      id: 'prec_' + produtoSelecionado.id + '_' + Date.now(),
      produtoNome: produtoSelecionado.nome,
      rendimentoLote,
      ingredientes: [...ingredientes],
      embalagens: [...embalagens],
      custoTotalLote,
      custoUnitario,
      lucroDesejadoUnitario: lucroDesejado,
      precoVendaSugerido: precoVendaFinal
    };

    salvarPrecificacao(novaFicha);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner com Alto Contraste */}
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A] text-stone-900 dark:text-stone-100">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-md border border-amber-400/40">
              <Calculator className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                Ficha de Precificação Interativa
              </h2>
              <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-0.5">
                Regra oficial do manual: calcule o custo proporcional da parte usada, divida pelo rendimento e defina a margem de lucro.
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-950 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200">
            Fórmula: Custo = (Preço Pacote × Qtd Usada) ÷ Qtd Comprada
          </div>
        </div>

        {/* Escolha do Produto do Catálogo de Páscoa */}
        <div className="pt-4">
          <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-2.5">
            1. Selecione o Produto do Catálogo de Páscoa:
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            {CATALOGO_PASCOA.map((prod) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => handleMudarProduto(prod)}
                className={`rounded-2xl border-2 p-3.5 text-left transition-all ${
                  produtoSelecionado.id === prod.id
                    ? 'border-amber-600 bg-amber-100/90 shadow-md ring-2 ring-amber-500/30 dark:bg-amber-950/80'
                    : 'border-stone-300 bg-white hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800'
                }`}
              >
                <span className="block font-black text-sm text-stone-900 dark:text-white">
                  {prod.nome}
                </span>
                <span className="block text-xs font-bold text-amber-900 dark:text-amber-300 mt-1">
                  {prod.chocolateG}g chocolate {prod.recheioG > 0 && `+ ${prod.recheioG}g recheio`}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-2.5 text-xs font-semibold text-stone-600 dark:text-stone-400">
            {produtoSelecionado.descricao} · {produtoSelecionado.dica}
          </p>
        </div>
      </div>

      {/* Tabela de Ingredientes e Embalagens Usados */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {/* Ingredientes Usados */}
          <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
            <div className="flex items-center justify-between mb-3.5 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
              <h3 className="font-black text-sm text-stone-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                2. Ingredientes Usados no Lote ({rendimentoLote} unidades)
              </h3>
              <button
                onClick={handleAddIngrediente}
                className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-amber-800 hover:text-amber-600 dark:text-amber-300"
              >
                <Plus className="h-4 w-4" /> Adicionar Ingrediente
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {ingredientes.map((ing) => (
                <div
                  key={ing.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-amber-200 bg-amber-50/50 p-3 dark:border-stone-800 dark:bg-stone-900 font-semibold"
                >
                  <div className="min-w-[150px]">
                    <span className="font-black text-stone-900 dark:text-white block text-sm">{ing.nome}</span>
                    <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                      Pacote: R$ {ing.precoCompra.toFixed(2)} por {ing.qtdCompra} {ing.unidadeCompra}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-stone-700 dark:text-stone-300 font-bold">Qtd usada:</span>
                    <input
                      type="number"
                      min="1"
                      value={ing.qtdUsada}
                      onChange={(e) => handleUpdateIngrediente(ing.id, parseFloat(e.target.value) || 0)}
                      className="w-20 rounded-lg border-2 border-amber-300 bg-white p-1 text-center font-black text-stone-900 dark:bg-stone-800 dark:text-white"
                    />
                    <span className="text-stone-700 dark:text-stone-300 font-bold">{ing.unidadeUsada}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-sm text-amber-950 dark:text-amber-300">
                      R$ {ing.custoCalculado.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveIngrediente(ing.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 font-bold text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right font-black text-sm text-stone-900 dark:text-white">
                Subtotal Ingredientes: <span className="text-amber-900 dark:text-amber-300">R$ {custoTotalIngredientes.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Embalagens Usadas */}
          <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
            <h3 className="font-black text-sm text-stone-900 dark:text-white mb-3.5 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
              3. Embalagens e Materiais do Lote
            </h3>

            <div className="space-y-2.5 text-xs font-semibold">
              {embalagens.map((emb) => (
                <div
                  key={emb.id}
                  className="flex items-center justify-between rounded-xl border-2 border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900"
                >
                  <div>
                    <span className="font-black text-sm text-stone-900 dark:text-white block">{emb.nome}</span>
                    <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400">
                      R$ {emb.precoTotalPacote.toFixed(2)} ({emb.qtdPacote} un.) · Usadas no lote: {emb.qtdUsada} un.
                    </span>
                  </div>
                  <span className="font-black text-sm text-amber-950 dark:text-amber-300">
                    R$ {emb.custoCalculado.toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="pt-2 text-right font-black text-sm text-stone-900 dark:text-white">
                Subtotal Embalagens: <span className="text-amber-900 dark:text-amber-300">R$ {custoTotalEmbalagens.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Painel de Fechamento do Preço com Alto Contraste */}
        <div className="rounded-2xl border-2 border-amber-500 bg-amber-50/80 p-5 shadow-lg dark:border-amber-700 dark:bg-[#1B110A] flex flex-col justify-between">
          <div>
            <h3 className="font-black text-base text-stone-900 dark:text-white mb-3 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
              <TrendingUp className="h-5 w-5 text-amber-700 dark:text-amber-400" />
              Resultado da Precificação
            </h3>

            <div className="space-y-3.5 text-xs font-semibold">
              <div>
                <label className="block font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                  Rendimento do Lote (Unidades de Venda):
                </label>
                <input
                  type="number"
                  min="1"
                  value={rendimentoLote}
                  onChange={(e) => setRendimentoLote(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 font-black text-center text-base text-stone-900 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div className="rounded-2xl bg-white p-4 dark:bg-stone-900 space-y-2 border-2 border-amber-300 shadow-sm">
                <div className="flex justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-bold">Custo Total do Lote:</span>
                  <span className="font-black text-stone-900 dark:text-white text-sm">R$ {custoTotalLote.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-bold">Custo Unitário de Produção:</span>
                  <span className="font-black text-stone-900 dark:text-white text-sm">R$ {custoUnitario.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                  Lucro Desejado por Unidade (R$):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={lucroDesejado}
                  onChange={(e) => setLucroDesejado(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 font-black text-center text-base text-stone-900 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div className="rounded-2xl bg-emerald-100 p-4 text-center border-2 border-emerald-500 text-emerald-950 dark:bg-emerald-950/80 dark:text-emerald-100 shadow-sm">
                <span className="text-xs font-black block uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                  Preço de Venda Sugerido
                </span>
                <span className="text-4xl font-black block my-1 text-emerald-800 dark:text-emerald-200">
                  R$ {precoVendaFinal.toFixed(2)}
                </span>
                <span className="text-xs font-black block text-emerald-800 dark:text-emerald-300">
                  Margem de Lucro: {margemLucro}% sobre o preço
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t-2 border-amber-200 dark:border-stone-800">
            <button
              onClick={handleSalvarFichaPrecificacao}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-700 py-3 font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 transition text-xs"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Salvar Ficha do {produtoSelecionado.nome}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fichas Salvas nesta Sessão */}
      {precificacoes.length > 0 && (
        <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-stone-800 dark:bg-[#1B110A]">
          <h3 className="text-base font-black text-stone-900 dark:text-white mb-3.5 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
            <Sparkles className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            Fichas de Precificação Salvas na Sessão ({precificacoes.length})
          </h3>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {precificacoes.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl border-2 border-amber-200 bg-amber-50/50 p-4 dark:border-stone-800 dark:bg-stone-900"
              >
                <div>
                  <h4 className="font-black text-sm text-stone-900 dark:text-white">{p.produtoNome}</h4>
                  <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-0.5">
                    Lote de {p.rendimentoLote} un. · Custo un.: R$ {p.custoUnitario.toFixed(2)} · Lucro: R$ {p.lucroDesejadoUnitario.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-emerald-800 dark:text-emerald-300">
                    R$ {p.precoVendaSugerido.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removerPrecificacao(p.id)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
