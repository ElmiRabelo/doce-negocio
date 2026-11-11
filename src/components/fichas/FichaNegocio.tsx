'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { CATALOGO_UTENSILIOS_EMBALAGENS, CATALOGO_INSUMOS_SIMULACAO, ItemCatalogo } from '@/data/catalogo-compras';
import { Building2, DollarSign, Package, ShoppingCart, AlertTriangle, ArrowUpRight, ArrowDownLeft, Plus, Check } from 'lucide-react';

export const FichaNegocio: React.FC = () => {
  const { 
    getActiveSession, 
    updateIndicadores, 
    ajustarCaixa, 
    updateKit, 
    comprarItem, 
    darBaixaEstoque, 
    removerItemEstoque 
  } = useSessionStore();

  const session = getActiveSession();

  const [modalCompraAberto, setModalCompraAberto] = useState<boolean>(false);
  const [modalAjusteCaixa, setModalAjusteCaixa] = useState<boolean>(false);
  const [valorAjuste, setValorAjuste] = useState<number>(50);
  const [motivoAjuste, setMotivoAjuste] = useState<string>('');
  const [tipoAjuste, setTipoAjuste] = useState<'entrada' | 'saida'>('entrada');

  const [baixaItemId, setBaixaItemId] = useState<string | null>(null);
  const [baixaQtd, setBaixaQtd] = useState<number>(0);

  if (!session) {
    return <div className="p-8 text-center text-stone-500">Nenhuma sessão ativa selecionada.</div>;
  }

  const { indicadores, kit, estoque, transacoesCaixa, perfil, nomeNegocio } = session;

  const handleComprarDoCatalogo = (item: ItemCatalogo) => {
    comprarItem({
      nome: item.nome,
      tipo: item.tipo,
      quantidadeComprada: item.quantidadeEmbalagem,
      unidade: item.unidade,
      precoPago: item.precoPadrao,
      quantidadeAtual: item.quantidadeEmbalagem
    });
  };

  const handleConfirmarAjusteCaixa = (e: React.FormEvent) => {
    e.preventDefault();
    if (valorAjuste <= 0 || !motivoAjuste.trim()) return;
    ajustarCaixa(valorAjuste, motivoAjuste.trim(), tipoAjuste);
    setModalAjusteCaixa(false);
    setMotivoAjuste('');
  };

  const handleConfirmarBaixa = (itemId: string) => {
    if (baixaQtd <= 0) return;
    darBaixaEstoque(itemId, baixaQtd);
    setBaixaItemId(null);
    setBaixaQtd(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Negócio */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {nomeNegocio}
              </h2>
              <p className="text-xs text-stone-500">
                Perfil de Início: <span className="font-bold uppercase text-amber-700 dark:text-amber-400">{perfil}</span> · Campanha: {session.nomeCampanha}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setModalCompraAberto(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 transition"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Comprar do Catálogo</span>
            </button>

            <button
              onClick={() => setModalAjusteCaixa(true)}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-300"
            >
              <DollarSign className="h-4 w-4" />
              <span>Lançar no Caixa</span>
            </button>
          </div>
        </div>

        {/* Indicadores Principais */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 pt-4">
          {/* Caixa R$ */}
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-3 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Caixa Atual
            </span>
            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
              R$ {indicadores.caixa.toFixed(2)}
            </span>
          </div>

          {/* Reputação */}
          <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-3 text-center dark:border-amber-800 dark:bg-amber-950/30">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Reputação (REP)
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateIndicadores({ rep: Math.max(0, indicadores.rep - 1) })}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                -
              </button>
              <span className="text-2xl font-black text-amber-700 dark:text-amber-400">
                {indicadores.rep}
              </span>
              <button
                onClick={() => updateIndicadores({ rep: indicadores.rep + 1 })}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Ética */}
          <div className="rounded-xl border border-blue-300 bg-blue-50/60 p-3 text-center dark:border-blue-800 dark:bg-blue-950/30">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
              Ética (ETI)
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateIndicadores({ eti: Math.max(0, indicadores.eti - 1) })}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                -
              </button>
              <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
                {indicadores.eti}
              </span>
              <button
                onClick={() => updateIndicadores({ eti: indicadores.eti + 1 })}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Escala de Relacionamento */}
          <div className="rounded-xl border border-purple-300 bg-purple-50/60 p-3 text-center dark:border-purple-800 dark:bg-purple-950/30 relative">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
              Relacionamento (ER)
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateIndicadores({ er: Math.max(0, indicadores.er - 1) })}
                className="text-xs font-bold text-rose-500 hover:text-rose-700"
                title="Atenção: perder ER desconta 20% do caixa!"
              >
                -
              </button>
              <span className="text-2xl font-black text-purple-700 dark:text-purple-400">
                {indicadores.er}
              </span>
              <button
                onClick={() => updateIndicadores({ er: indicadores.er + 1 })}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                +
              </button>
            </div>
            <span className="text-[9px] text-purple-600 dark:text-purple-300 block">
              Inicia em 20 (-20% R$ se cair)
            </span>
          </div>

          {/* Experiência */}
          <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-3 text-center dark:border-amber-800 dark:bg-amber-950/30">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
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

      {/* Kit Gratuito de Equipamentos */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
          <Package className="h-5 w-5 text-amber-600" />
          Kit Gratuito Inicial da Equipe (R$ 0,00)
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="font-bold text-stone-500 block mb-1">Geladeira de 2 Portas:</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{kit.geladeira}</span>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="font-bold text-stone-500 block mb-1">Fogão:</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{kit.fogaoBocas} bocas</span>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="font-bold text-stone-500 block mb-1">Batedeira:</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{kit.batedeira} unidade</span>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="font-bold text-stone-500 block mb-1">Panelas de Alumínio:</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {kit.panelas.map((p) => `${p.tamanho} (${p.capacidade})`).join(', ') || 'Nenhuma'}
            </span>
          </div>
        </div>
      </div>

      {/* Estoque de Insumos e Embalagens */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <div className="flex items-center justify-between mb-4 border-b pb-3">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-600" />
              Estoque Atual ({estoque.length} itens)
            </h3>
            <p className="text-xs text-stone-500">
              A Ficha do Negócio registra o desembolso pelo pacote comprado e dá baixa nas quantidades usadas nos lotes.
            </p>
          </div>

          <button
            onClick={() => setModalCompraAberto(true)}
            className="flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-amber-700"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Compra</span>
          </button>
        </div>

        {estoque.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            Nenhum item comprado no estoque. Use o botão &quot;Comprar do Catálogo&quot; para abastecer a despensa da equipe.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-amber-50/50 text-stone-600 dark:border-stone-800 dark:bg-stone-800/50">
                <tr>
                  <th className="p-2.5 font-bold">Item</th>
                  <th className="p-2.5 font-bold">Tipo</th>
                  <th className="p-2.5 font-bold">Preço Pago</th>
                  <th className="p-2.5 font-bold">Qtd. Original</th>
                  <th className="p-2.5 font-bold">Qtd. Disponível</th>
                  <th className="p-2.5 font-bold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {estoque.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 dark:hover:bg-stone-800/30">
                    <td className="p-2.5 font-semibold text-stone-800 dark:text-stone-200">
                      {item.nome}
                    </td>
                    <td className="p-2.5 capitalize text-stone-500">{item.tipo}</td>
                    <td className="p-2.5 font-bold text-stone-700 dark:text-stone-300">
                      R$ {item.precoPago.toFixed(2)}
                    </td>
                    <td className="p-2.5 text-stone-600">
                      {item.quantidadeComprada} {item.unidade}
                    </td>
                    <td className="p-2.5">
                      <span className={`font-bold ${item.quantidadeAtual <= 0 ? 'text-rose-600' : 'text-emerald-700 dark:text-emerald-400'}`}>
                        {item.quantidadeAtual} {item.unidade}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {baixaItemId === item.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="1"
                              value={baixaQtd}
                              onChange={(e) => setBaixaQtd(parseFloat(e.target.value) || 0)}
                              placeholder="Qtd usada"
                              className="w-16 rounded border p-1 text-xs text-center"
                            />
                            <button
                              onClick={() => handleConfirmarBaixa(item.id)}
                              className="rounded bg-emerald-600 p-1 text-white hover:bg-emerald-700"
                              title="Confirmar baixa"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setBaixaItemId(null)}
                              className="text-stone-400 p-1 text-[10px]"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setBaixaItemId(item.id); setBaixaQtd(0); }}
                            className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-300"
                          >
                            Dar Baixa
                          </button>
                        )}
                        <button
                          onClick={() => removerItemEstoque(item.id)}
                          className="text-stone-400 hover:text-rose-600 text-xs px-1"
                          title="Remover do estoque"
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Histórico Financeiro / Extrato do Caixa */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-600" />
          Extrato de Entradas e Saídas do Caixa
        </h3>

        {transacoesCaixa.length === 0 ? (
          <div className="p-4 text-center text-xs text-stone-500">Nenhuma movimentação registrada.</div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
            {transacoesCaixa.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 p-2.5 dark:border-stone-800 dark:bg-stone-800/40"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      tx.tipo === 'entrada'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {tx.tipo === 'entrada' ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                  </span>
                  <div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                      {tx.descricao}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {new Date(tx.dataHora).toLocaleTimeString('pt-BR')} · Saldo após: R$ {tx.saldoApos.toFixed(2)}
                    </span>
                  </div>
                </div>

                <span
                  className={`font-bold ${
                    tx.tipo === 'entrada' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'
                  }`}
                >
                  {tx.tipo === 'entrada' ? '+' : '-'} R$ {tx.valor.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Compras do Catálogo */}
      {modalCompraAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 border border-amber-300">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-amber-600" />
                Catálogo de Compras (Utensílios, Embalagens & Insumos)
              </h3>
              <button
                onClick={() => setModalCompraAberto(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Insumos e Ingredientes:</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CATALOGO_INSUMOS_SIMULACAO.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-2 hover:bg-amber-50/50 dark:border-stone-800"
                    >
                      <div>
                        <span className="font-bold block text-stone-800 dark:text-stone-200">{item.nome}</span>
                        <span className="text-[10px] text-stone-500">
                          {item.quantidadeEmbalagem} {item.unidade} · R$ {item.precoPadrao.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleComprarDoCatalogo(item)}
                        className="rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
                      >
                        Comprar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Utensílios & Embalagens:</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CATALOGO_UTENSILIOS_EMBALAGENS.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-2 hover:bg-amber-50/50 dark:border-stone-800"
                    >
                      <div>
                        <span className="font-bold block text-stone-800 dark:text-stone-200">{item.nome}</span>
                        <span className="text-[10px] text-stone-500">
                          {item.quantidadeEmbalagem} {item.unidade} · R$ {item.precoPadrao.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleComprarDoCatalogo(item)}
                        className="rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
                      >
                        Comprar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-3 mt-3 text-right">
              <button
                onClick={() => setModalCompraAberto(false)}
                className="rounded-xl bg-stone-200 px-4 py-2 font-bold text-stone-700 hover:bg-stone-300 text-xs"
              >
                Concluir Compras
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajuste Manual de Caixa */}
      {modalAjusteCaixa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={handleConfirmarAjusteCaixa}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 border border-amber-300"
          >
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-3">
              Lançamento Direto no Caixa
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tipo:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTipoAjuste('entrada')}
                    className={`p-2 rounded-lg font-bold border ${tipoAjuste === 'entrada' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-100'}`}
                  >
                    Entrada (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoAjuste('saida')}
                    className={`p-2 rounded-lg font-bold border ${tipoAjuste === 'saida' ? 'bg-rose-600 text-white border-rose-600' : 'bg-stone-100'}`}
                  >
                    Saída (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Valor (R$):</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  min="0.01"
                  value={valorAjuste}
                  onChange={(e) => setValorAjuste(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border p-2 font-bold text-base"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Motivo / Descrição:</label>
                <input
                  type="text"
                  required
                  value={motivoAjuste}
                  onChange={(e) => setMotivoAjuste(e.target.value)}
                  placeholder="Ex: Venda avulsa, taxa de transporte, etc."
                  className="w-full rounded-lg border p-2"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setModalAjusteCaixa(false)}
                className="rounded-lg border px-3 py-1.5 font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-amber-600 px-4 py-1.5 font-bold text-white hover:bg-amber-700"
              >
                Salvar Lançamento
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
