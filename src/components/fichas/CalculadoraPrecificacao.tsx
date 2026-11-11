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
  const [rendimentoLote, setRendimentoLote] = useState<number>(5); // ex: 5 unidades
  const [lucroDesejado, setLucroDesejado] = useState<number>(15.0); // ex: R$ 15 de lucro por unidade

  // Lista de ingredientes do lote
  const [ingredientes, setIngredientes] = useState<InsumoUsado[]>([
    {
      id: 'ing_1',
      nome: 'Chocolate Nobre em Barra',
      precoCompra: 10.0,
      qtdCompra: 100,
      unidadeCompra: 'g',
      qtdUsada: 950, // 5 ovos de 190g = 950g
      unidadeUsada: 'g',
      custoCalculado: (10.0 * 950) / 100 // R$ 95.00
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
      qtdUsada: 2, // 2 metros
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
    // Ajusta sugestão de gramagem padrão para chocolate
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
    const item = CATALOGO_INSUMOS_SIMULACAO[3]; // Leite condensado default
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
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow">
              <Calculator className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Ficha de Precificação Interativa
              </h2>
              <p className="text-xs text-stone-500">
                Regra oficial do manual: calcule o custo proporcional da parte usada, divida pelo rendimento e defina a margem de lucro.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-300 bg-amber-50 p-2 text-xs font-semibold text-amber-900 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-300">
            Fórmula: Custo = (Preço Pacote × Qtd Usada) ÷ Qtd Comprada
          </div>
        </div>

        {/* Escolha do Produto do Catálogo de Páscoa */}
        <div className="pt-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            1. Selecione o Produto do Catálogo de Páscoa:
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
            {CATALOGO_PASCOA.map((prod) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => handleMudarProduto(prod)}
                className={`rounded-xl border p-3 text-left transition ${
                  produtoSelecionado.id === prod.id
                    ? 'border-amber-600 bg-amber-100/90 shadow-sm dark:bg-amber-950/60'
                    : 'border-amber-200 bg-white hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-800'
                }`}
              >
                <span className="block font-bold text-xs text-stone-900 dark:text-stone-100">
                  {prod.nome}
                </span>
                <span className="block text-[11px] text-stone-500 mt-1">
                  {prod.chocolateG}g chocolate {prod.recheioG > 0 && `+ ${prod.recheioG}g recheio`}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-2 text-xs italic text-stone-500">
            {produtoSelecionado.descricao} · {produtoSelecionado.dica}
          </p>
        </div>
      </div>

      {/* Tabela de Ingredientes e Embalagens Usados */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {/* Ingredientes Usados */}
          <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <h3 className="font-bold text-sm text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-amber-600" />
                2. Ingredientes Usados no Lote ({rendimentoLote} unidades)
              </h3>
              <button
                onClick={handleAddIngrediente}
                className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Ingrediente
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {ingredientes.map((ing) => (
                <div
                  key={ing.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-200 bg-stone-50/60 p-2.5 dark:border-stone-800 dark:bg-stone-800/40"
                >
                  <div className="min-w-[140px]">
                    <span className="font-bold block text-stone-800 dark:text-stone-200">{ing.nome}</span>
                    <span className="text-[10px] text-stone-500">
                      Pacote: R$ {ing.precoCompra.toFixed(2)} por {ing.qtdCompra} {ing.unidadeCompra}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-500">Qtd usada:</span>
                    <input
                      type="number"
                      min="1"
                      value={ing.qtdUsada}
                      onChange={(e) => handleUpdateIngrediente(ing.id, parseFloat(e.target.value) || 0)}
                      className="w-20 rounded border border-amber-300 p-1 text-center font-bold"
                    />
                    <span className="text-stone-500">{ing.unidadeUsada}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-800 dark:text-amber-300">
                      R$ {ing.custoCalculado.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveIngrediente(ing.id)}
                      className="text-stone-400 hover:text-rose-600 p-0.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right font-bold text-stone-700 dark:text-stone-300">
                Subtotal Ingredientes: R$ {custoTotalIngredientes.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Embalagens Usadas */}
          <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h3 className="font-bold text-sm text-stone-800 dark:text-stone-200 mb-3 border-b pb-2">
              3. Embalagens e Materiais do Lote
            </h3>

            <div className="space-y-2 text-xs">
              {embalagens.map((emb) => (
                <div
                  key={emb.id}
                  className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/60 p-2.5 dark:border-stone-800 dark:bg-stone-800/40"
                >
                  <div>
                    <span className="font-bold block text-stone-800 dark:text-stone-200">{emb.nome}</span>
                    <span className="text-[10px] text-stone-500">
                      R$ {emb.precoTotalPacote.toFixed(2)} ({emb.qtdPacote} un.) · Usadas: {emb.qtdUsada} un.
                    </span>
                  </div>
                  <span className="font-bold text-amber-800 dark:text-amber-300">
                    R$ {emb.custoCalculado.toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="pt-2 text-right font-bold text-stone-700 dark:text-stone-300">
                Subtotal Embalagens: R$ {custoTotalEmbalagens.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Painel de Fechamento do Preço */}
        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/80 p-5 shadow-md dark:border-amber-700 dark:bg-stone-900 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2 border-b border-amber-200 pb-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              Resultado da Precificação
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">
                  Rendimento do Lote (Unidades de Venda):
                </label>
                <input
                  type="number"
                  min="1"
                  value={rendimentoLote}
                  onChange={(e) => setRendimentoLote(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-lg border border-amber-300 bg-white p-2 font-bold text-center text-sm"
                />
              </div>

              <div className="rounded-xl bg-white/80 p-3 dark:bg-stone-800/80 space-y-1.5 border border-amber-200">
                <div className="flex justify-between text-stone-600">
                  <span>Custo Total do Lote:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">R$ {custoTotalLote.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Custo Unitário de Produção:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">R$ {custoUnitario.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-stone-700 dark:text-stone-300">
                  Lucro Desejado por Unidade (R$):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={lucroDesejado}
                  onChange={(e) => setLucroDesejado(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border border-amber-300 bg-white p-2 font-bold text-center text-sm"
                />
              </div>

              <div className="rounded-xl bg-emerald-100/70 p-4 text-center border-2 border-emerald-400 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
                <span className="text-xs font-semibold block uppercase tracking-wider">
                  Preço de Venda Sugerido
                </span>
                <span className="text-3xl font-black block my-1">
                  R$ {precoVendaFinal.toFixed(2)}
                </span>
                <span className="text-xs font-medium block">
                  Margem de Lucro: {margemLucro}% sobre o preço
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200">
            <button
              onClick={handleSalvarFichaPrecificacao}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-bold text-white shadow hover:bg-amber-700 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Salvar Ficha do {produtoSelecionado.nome}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fichas Salvas nesta Sessão */}
      {precificacoes.length > 0 && (
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            Fichas de Precificação Salvas na Sessão ({precificacoes.length})
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {precificacoes.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 dark:border-stone-800 dark:bg-stone-800/40"
              >
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{p.produtoNome}</h4>
                  <p className="text-xs text-stone-500">
                    Lote de {p.rendimentoLote} un. · Custo un.: R$ {p.custoUnitario.toFixed(2)} · Lucro: R$ {p.lucroDesejadoUnitario.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                    R$ {p.precoVendaSugerido.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removerPrecificacao(p.id)}
                    className="text-stone-400 hover:text-rose-600 p-1"
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
