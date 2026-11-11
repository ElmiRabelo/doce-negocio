'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { CATALOGO_UTENSILIOS_EMBALAGENS, CATALOGO_INSUMOS_SIMULACAO, ItemCatalogo } from '@/data/catalogo-compras';
import { Building2, DollarSign, Package, ShoppingCart, ArrowUpRight, ArrowDownLeft, Plus, Check } from 'lucide-react';

export const FichaNegocio: React.FC = () => {
  const { 
    getActiveSession, 
    updateIndicadores, 
    ajustarCaixa, 
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
    return <div className="p-8 text-center text-stone-700 font-bold">Nenhuma sessão ativa selecionada.</div>;
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
      {/* Top Banner Negócio com Alto Contraste */}
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-md border border-amber-400/40">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                {nomeNegocio}
              </h2>
              <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-0.5">
                Perfil de Início: <span className="font-black uppercase text-amber-800 dark:text-amber-400">{perfil}</span> · Campanha: {session.nomeCampanha}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setModalCompraAberto(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 transition"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Comprar do Catálogo</span>
            </button>

            <button
              onClick={() => setModalAjusteCaixa(true)}
              className="flex items-center gap-1.5 rounded-xl border-2 border-amber-400 bg-amber-50 px-3.5 py-2.5 text-xs font-black uppercase text-amber-950 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200 transition"
            >
              <DollarSign className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span>Lançar no Caixa</span>
            </button>
          </div>
        </div>

        {/* Indicadores Principais em Cards de Alto Contraste */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-5 pt-4 text-xs font-bold">
          {/* Caixa R$ */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 p-3.5 text-center shadow-sm dark:border-emerald-700 dark:bg-emerald-950/60">
            <span className="block text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200 mb-1">
              Caixa Atual
            </span>
            <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
              R$ {indicadores.caixa.toFixed(2)}
            </span>
          </div>

          {/* Reputação */}
          <div className="rounded-2xl border-2 border-amber-500 bg-amber-50/80 p-3.5 text-center shadow-sm dark:border-amber-700 dark:bg-amber-950/60">
            <span className="block text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200 mb-1">
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
            <span className="block text-xs font-black uppercase tracking-wider text-blue-950 dark:text-blue-200 mb-1">
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

          {/* Relacionamento */}
          <div className="rounded-2xl border-2 border-purple-500 bg-purple-50/80 p-3.5 text-center shadow-sm dark:border-purple-700 dark:bg-purple-950/60">
            <span className="block text-xs font-black uppercase tracking-wider text-purple-950 dark:text-purple-200 mb-1">
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

          {/* Experiência */}
          <div className="rounded-2xl border-2 border-amber-600 bg-amber-50/80 p-3.5 text-center shadow-sm dark:border-amber-700 dark:bg-stone-900">
            <span className="block text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200 mb-1">
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

      {/* Kit Gratuito de Equipamentos */}
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-stone-800 dark:bg-[#1B110A]">
        <h3 className="text-base font-black text-stone-900 dark:text-white mb-3.5 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
          <Package className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          Kit Gratuito Inicial da Equipe (R$ 0,00)
        </h3>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-4 text-xs font-bold">
          <div className="rounded-xl border-2 border-stone-200 bg-stone-50 p-3.5 dark:border-stone-700 dark:bg-stone-800">
            <span className="text-stone-500 block mb-1">Geladeira de 2 Portas:</span>
            <span className="font-black text-sm text-stone-900 dark:text-white">{kit.geladeira}</span>
          </div>

          <div className="rounded-xl border-2 border-stone-200 bg-stone-50 p-3.5 dark:border-stone-700 dark:bg-stone-800">
            <span className="text-stone-500 block mb-1">Fogão:</span>
            <span className="font-black text-sm text-stone-900 dark:text-white">{kit.fogaoBocas} bocas</span>
          </div>

          <div className="rounded-xl border-2 border-stone-200 bg-stone-50 p-3.5 dark:border-stone-700 dark:bg-stone-800">
            <span className="text-stone-500 block mb-1">Batedeira:</span>
            <span className="font-black text-sm text-stone-900 dark:text-white">{kit.batedeira} unidade</span>
          </div>

          <div className="rounded-xl border-2 border-stone-200 bg-stone-50 p-3.5 dark:border-stone-700 dark:bg-stone-800">
            <span className="text-stone-500 block mb-1">Panelas de Alumínio:</span>
            <span className="font-black text-sm text-stone-900 dark:text-white">
              {kit.panelas.map((p) => `${p.tamanho} (${p.capacidade})`).join(', ') || 'Nenhuma'}
            </span>
          </div>
        </div>
      </div>

      {/* Estoque de Insumos e Embalagens */}
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-stone-800 dark:bg-[#1B110A]">
        <div className="flex items-center justify-between mb-4 border-b-2 border-amber-200 pb-3 dark:border-stone-800">
          <div>
            <h3 className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-700 dark:text-amber-400" />
              Estoque Atual ({estoque.length} itens)
            </h3>
            <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-0.5">
              A Ficha do Negócio registra o desembolso pelo pacote comprado e dá baixa nas quantidades usadas nos lotes.
            </p>
          </div>

          <button
            onClick={() => setModalCompraAberto(true)}
            className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-3.5 py-2 text-xs font-black uppercase text-white shadow hover:bg-amber-600 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Compra</span>
          </button>
        </div>

        {estoque.length === 0 ? (
          <div className="p-8 text-center text-xs font-bold text-stone-500">
            Nenhum item comprado no estoque. Use o botão &quot;Comprar do Catálogo&quot; para abastecer a despensa da equipe.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b-2 border-amber-200 bg-amber-100/70 text-amber-950 dark:border-stone-800 dark:bg-stone-800 dark:text-amber-200">
                <tr>
                  <th className="p-3 font-black uppercase tracking-wider">Item</th>
                  <th className="p-3 font-black uppercase tracking-wider">Tipo</th>
                  <th className="p-3 font-black uppercase tracking-wider">Preço Pago</th>
                  <th className="p-3 font-black uppercase tracking-wider">Qtd. Original</th>
                  <th className="p-3 font-black uppercase tracking-wider">Qtd. Disponível</th>
                  <th className="p-3 font-black uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-semibold">
                {estoque.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/50 dark:hover:bg-stone-800/40 transition">
                    <td className="p-3 font-black text-stone-900 dark:text-white">
                      {item.nome}
                    </td>
                    <td className="p-3 capitalize text-stone-600 dark:text-stone-400">{item.tipo}</td>
                    <td className="p-3 font-black text-amber-900 dark:text-amber-300">
                      R$ {item.precoPago.toFixed(2)}
                    </td>
                    <td className="p-3 text-stone-700 dark:text-stone-300">
                      {item.quantidadeComprada} {item.unidade}
                    </td>
                    <td className="p-3">
                      <span className={`font-black text-sm px-2.5 py-0.5 rounded-full ${item.quantidadeAtual <= 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-950'}`}>
                        {item.quantidadeAtual} {item.unidade}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {baixaItemId === item.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="1"
                              value={baixaQtd}
                              onChange={(e) => setBaixaQtd(parseFloat(e.target.value) || 0)}
                              placeholder="Qtd usada"
                              className="w-20 rounded-lg border-2 border-amber-400 p-1 text-xs text-center font-bold"
                            />
                            <button
                              onClick={() => handleConfirmarBaixa(item.id)}
                              className="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"
                              title="Confirmar baixa"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setBaixaItemId(null)}
                              className="text-stone-500 p-1 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setBaixaItemId(item.id); setBaixaQtd(0); }}
                            className="rounded-lg border-2 border-amber-400 bg-amber-50 px-2.5 py-1 text-xs font-black uppercase text-amber-950 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200 transition"
                          >
                            Dar Baixa
                          </button>
                        )}
                        <button
                          onClick={() => removerItemEstoque(item.id)}
                          className="text-stone-400 hover:text-rose-600 text-sm px-1.5 font-bold"
                          title="Remover do estoque"
                        >
                          ✕
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
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-stone-800 dark:bg-[#1B110A]">
        <h3 className="text-base font-black text-stone-900 dark:text-white mb-3.5 flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
          <DollarSign className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
          Extrato de Entradas e Saídas do Caixa
        </h3>

        {transacoesCaixa.length === 0 ? (
          <div className="p-4 text-center text-xs font-bold text-stone-500">Nenhuma movimentação registrada.</div>
        ) : (
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {transacoesCaixa.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-xl font-black ${
                      tx.tipo === 'entrada'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {tx.tipo === 'entrada' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </span>
                  <div>
                    <span className="font-black text-stone-900 dark:text-white block">
                      {tx.descricao}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500">
                      {new Date(tx.dataHora).toLocaleTimeString('pt-BR')} · Saldo após: R$ {tx.saldoApos.toFixed(2)}
                    </span>
                  </div>
                </div>

                <span
                  className={`font-black text-sm ${
                    tx.tipo === 'entrada' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 border-2 border-amber-600 text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="font-black text-lg text-stone-900 dark:text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-amber-700" />
                Catálogo de Compras (Utensílios, Embalagens & Insumos)
              </h3>
              <button
                onClick={() => setModalCompraAberto(false)}
                className="text-stone-500 hover:text-stone-900 font-black text-sm p-1"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              <div>
                <h4 className="font-black text-amber-950 dark:text-amber-200 mb-2 uppercase tracking-wide text-xs">Insumos e Ingredientes:</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CATALOGO_INSUMOS_SIMULACAO.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border-2 border-stone-200 p-2.5 hover:bg-amber-50/50 dark:border-stone-800"
                    >
                      <div>
                        <span className="font-black block text-stone-900 dark:text-white">{item.nome}</span>
                        <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                          {item.quantidadeEmbalagem} {item.unidade} · R$ {item.precoPadrao.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleComprarDoCatalogo(item)}
                        className="rounded-lg bg-amber-700 px-3 py-1 font-black uppercase text-white hover:bg-amber-600 shadow-sm"
                      >
                        Comprar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <h4 className="font-black text-amber-950 dark:text-amber-200 mb-2 uppercase tracking-wide text-xs">Utensílios & Embalagens:</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CATALOGO_UTENSILIOS_EMBALAGENS.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border-2 border-stone-200 p-2.5 hover:bg-amber-50/50 dark:border-stone-800"
                    >
                      <div>
                        <span className="font-black block text-stone-900 dark:text-white">{item.nome}</span>
                        <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                          {item.quantidadeEmbalagem} {item.unidade} · R$ {item.precoPadrao.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleComprarDoCatalogo(item)}
                        className="rounded-lg bg-amber-700 px-3 py-1 font-black uppercase text-white hover:bg-amber-600 shadow-sm"
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
                className="rounded-xl bg-stone-200 px-5 py-2 font-black uppercase text-stone-800 hover:bg-stone-300 text-xs"
              >
                Concluir Compras
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajuste Manual de Caixa */}
      {modalAjusteCaixa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleConfirmarAjusteCaixa}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 border-2 border-amber-600"
          >
            <h3 className="font-black text-base text-stone-900 dark:text-white mb-3">
              Lançamento Direto no Caixa
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-black uppercase tracking-wide text-stone-700 dark:text-stone-300 mb-1">Tipo:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTipoAjuste('entrada')}
                    className={`p-2.5 rounded-xl font-black uppercase border-2 ${tipoAjuste === 'entrada' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-100 text-stone-800 border-stone-300'}`}
                  >
                    Entrada (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoAjuste('saida')}
                    className={`p-2.5 rounded-xl font-black uppercase border-2 ${tipoAjuste === 'saida' ? 'bg-rose-600 text-white border-rose-600' : 'bg-stone-100 text-stone-800 border-stone-300'}`}
                  >
                    Saída (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase tracking-wide text-stone-700 dark:text-stone-300 mb-1">Valor (R$):</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  min="0.01"
                  value={valorAjuste}
                  onChange={(e) => setValorAjuste(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border-2 border-amber-300 p-2 font-black text-base text-stone-900 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-black uppercase tracking-wide text-stone-700 dark:text-stone-300 mb-1">Motivo / Descrição:</label>
                <input
                  type="text"
                  required
                  value={motivoAjuste}
                  onChange={(e) => setMotivoAjuste(e.target.value)}
                  placeholder="Ex: Venda avulsa, taxa de transporte, etc."
                  className="w-full rounded-xl border-2 border-amber-300 p-2 font-medium text-stone-900 dark:bg-stone-800 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setModalAjusteCaixa(false)}
                className="rounded-xl border-2 border-stone-300 px-4 py-2 font-black uppercase text-stone-700 hover:bg-stone-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-700 px-5 py-2 font-black uppercase text-white hover:bg-amber-600 shadow"
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
