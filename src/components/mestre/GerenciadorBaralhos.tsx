'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { CARTAS_DEMANDA_OFICIAIS, CARTAS_MONTE_MISTO_OFICIAIS } from '@/data/cartas-oficiais';
import { CARTAS_EXTRAS_REGIONAL } from '@/data/demandas-extras';
import { GameCard, CardType, AttributeKey } from '@/types';
import { Plus, Trash2, Edit3, Sparkles, AlertTriangle, ShieldCheck, Download, Filter } from 'lucide-react';

export const GerenciadorBaralhos: React.FC = () => {
  const { getActiveSession, salvarCartaCustomizada, removerCartaCustomizada } = useSessionStore();
  const session = getActiveSession();

  const customizadas = session?.baralhosPersonalizados || [];

  const todasCartas: GameCard[] = [
    ...CARTAS_DEMANDA_OFICIAIS,
    ...CARTAS_MONTE_MISTO_OFICIAIS,
    ...CARTAS_EXTRAS_REGIONAL,
    ...customizadas
  ];

  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroFonte, setFiltroFonte] = useState<string>('todos');
  const [busca, setBusca] = useState<string>('');

  const [modoCriacao, setModoCriacao] = useState<boolean>(false);
  const [cartaIdEdicao, setCartaIdEdicao] = useState<string | null>(null);

  const [formTipo, setFormTipo] = useState<CardType>('demanda');
  const [formTitulo, setFormTitulo] = useState<string>('');
  const [formNarrativa, setFormNarrativa] = useState<string>('');
  const [formEfeito, setFormEfeito] = useState<string>('');
  const [formPericia, setFormPericia] = useState<string>('Diplomacia');
  const [formAtributo, setFormAtributo] = useState<AttributeKey>('car');
  const [formCd, setFormCd] = useState<number>(15);

  const cartasFiltradas = todasCartas.filter((c) => {
    if (filtroTipo !== 'todos' && c.tipo !== filtroTipo) return false;
    if (filtroFonte !== 'todos' && c.fonte !== filtroFonte) return false;
    if (busca) {
      const q = busca.toLowerCase();
      return (
        c.titulo.toLowerCase().includes(q) ||
        c.narrativa.toLowerCase().includes(q) ||
        c.efeitoRegra.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const abrirCriacao = () => {
    setCartaIdEdicao(null);
    setFormTipo('demanda');
    setFormTitulo('');
    setFormNarrativa('');
    setFormEfeito('');
    setFormPericia('Diplomacia');
    setFormAtributo('car');
    setFormCd(15);
    setModoCriacao(true);
  };

  const abrirEdicao = (carta: GameCard) => {
    if (carta.fonte !== 'customizado') return;
    setCartaIdEdicao(carta.id);
    setFormTipo(carta.tipo);
    setFormTitulo(carta.titulo);
    setFormNarrativa(carta.narrativa);
    setFormEfeito(carta.efeitoRegra);
    if (carta.testeSugerido) {
      setFormPericia(carta.testeSugerido.pericia);
      setFormAtributo(carta.testeSugerido.atributo);
      setFormCd(carta.testeSugerido.cd);
    }
    setModoCriacao(true);
  };

  const salvarCarta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitulo.trim() || !formNarrativa.trim()) return;

    const novaCarta: GameCard = {
      id: cartaIdEdicao || 'custom_card_' + Date.now().toString(36),
      tipo: formTipo,
      titulo: formTitulo.trim(),
      narrativa: formNarrativa.trim(),
      efeitoRegra: formEfeito.trim() || 'Definido pelo mestre na mesa.',
      testeSugerido: formTipo !== 'vantagem' ? {
        pericia: formPericia,
        atributo: formAtributo,
        cd: formCd
      } : undefined,
      fonte: 'customizado'
    };

    salvarCartaCustomizada(novaCarta);
    setModoCriacao(false);
  };

  const exportarCartasCustomizadas = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customizadas, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `baralho-doce-negocio-custom-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header do Gerenciador com Alto Contraste */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A] text-stone-900 dark:text-stone-100">
        <div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-white flex items-center gap-2.5">
            <Sparkles className="h-6 w-6 text-amber-700 dark:text-amber-400" />
            Gerenciador & Criador de Baralhos
          </h2>
          <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-1">
            Consulte todas as 30+ cartas do jogo (oficiais e regionais) e crie novos clientes, imprevistos e vantagens com narrativas personalizadas.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {customizadas.length > 0 && (
            <button
              onClick={exportarCartasCustomizadas}
              className="flex items-center gap-1.5 rounded-xl border-2 border-amber-400 bg-amber-50 px-3.5 py-2 text-xs font-black uppercase text-amber-950 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200"
            >
              <Download className="h-4 w-4" />
              <span>Exportar Baralho ({customizadas.length})</span>
            </button>
          )}

          <button
            onClick={abrirCriacao}
            className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Criar Nova Carta</span>
          </button>
        </div>
      </div>

      {/* Formulário de Criação */}
      {modoCriacao && (
        <form
          onSubmit={salvarCarta}
          className="rounded-2xl border-2 border-amber-500 bg-amber-50/80 p-6 shadow-lg dark:border-amber-700 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
        >
          <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-4 dark:border-stone-800">
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              {cartaIdEdicao ? 'Editar Carta Customizada' : 'Criar Nova Carta para o Baralho'}
            </h3>
            <button
              type="button"
              onClick={() => setModoCriacao(false)}
              className="text-xs font-black uppercase text-stone-500 hover:text-stone-900 dark:hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Tipo da Carta:
              </label>
              <select
                value={formTipo}
                onChange={(e) => setFormTipo(e.target.value as CardType)}
                className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              >
                <option value="demanda">Demanda (Novo Pedido / Cliente)</option>
                <option value="obstaculo">Obstáculo (Imprevisto / Desafio)</option>
                <option value="vantagem">Vantagem (Oportunidade / Bônus)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Título da Carta:
              </label>
              <input
                type="text"
                required
                value={formTitulo}
                onChange={(e) => setFormTitulo(e.target.value)}
                placeholder="Ex: Encomenda da Noiva Exigente, Queda de Tensão na Cozinha, etc."
                className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Narrativa Completa (Texto para ler para a mesa 🔊):
              </label>
              <textarea
                rows={3}
                required
                value={formNarrativa}
                onChange={(e) => setFormNarrativa(e.target.value)}
                placeholder="Descreva a cena rica em detalhes: quem procurou a equipe, o que aconteceu, qual o clima de Ilhéus, etc."
                className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-serif leading-relaxed text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Efeito de Regra / Consequência:
              </label>
              <input
                type="text"
                value={formEfeito}
                onChange={(e) => setFormEfeito(e.target.value)}
                placeholder="Ex: Paga 20% acima se entregue até as 18h; ou Gasta R$ 30 de reparo."
                className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            {formTipo !== 'vantagem' && (
              <>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                    Perícia Sugerida:
                  </label>
                  <select
                    value={formPericia}
                    onChange={(e) => setFormPericia(e.target.value)}
                    className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  >
                    <option value="Administração">Administração (INT)</option>
                    <option value="Planejamento">Planejamento (INT)</option>
                    <option value="Intuição">Intuição (SAB)</option>
                    <option value="Cálculo">Cálculo (SAB)</option>
                    <option value="Fabricar">Fabricar (DES)</option>
                    <option value="Confeiteiro">Confeiteiro (DES)</option>
                    <option value="Diplomacia">Diplomacia (CAR)</option>
                    <option value="Criatividade">Criatividade (CAR)</option>
                    <option value="Logística">Logística (CON)</option>
                    <option value="Agilidade">Agilidade (CON)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                    Atributo Base:
                  </label>
                  <select
                    value={formAtributo}
                    onChange={(e) => setFormAtributo(e.target.value as AttributeKey)}
                    className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  >
                    <option value="int">Inteligência (INT)</option>
                    <option value="sab">Sabedoria (SAB)</option>
                    <option value="des">Destreza (DES)</option>
                    <option value="car">Carisma (CAR)</option>
                    <option value="con">Constituição (CON)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                    Classe de Dificuldade (CD):
                  </label>
                  <input
                    type="number"
                    value={formCd}
                    onChange={(e) => setFormCd(parseInt(e.target.value) || 15)}
                    className="w-full rounded-xl border-2 border-amber-300 bg-white p-2 text-sm font-black text-center text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-5 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setModoCriacao(false)}
              className="rounded-xl border-2 border-stone-300 bg-white px-4 py-2 text-xs font-black uppercase text-stone-700 hover:bg-stone-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-amber-700 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 transition"
            >
              Salvar Carta no Baralho
            </button>
          </div>
        </form>
      )}

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-amber-300 bg-white p-4 text-xs font-bold dark:border-stone-800 dark:bg-[#1B110A]">
        <div className="flex flex-wrap items-center gap-2.5">
          <Filter className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          <span className="text-stone-800 dark:text-stone-200 uppercase tracking-wide">Filtros:</span>

          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-1.5 font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
          >
            <option value="todos">Todos os Tipos ({todasCartas.length})</option>
            <option value="demanda">Só Demandas</option>
            <option value="obstaculo">Só Obstáculos</option>
            <option value="vantagem">Só Vantagens</option>
          </select>

          <select
            value={filtroFonte}
            onChange={(e) => setFiltroFonte(e.target.value)}
            className="rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-1.5 font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
          >
            <option value="todos">Todas as Fontes</option>
            <option value="oficial">Oficiais do Manual (25)</option>
            <option value="extra">Regionais de Ilhéus / Bahia (10)</option>
            <option value="customizado">Customizadas pelo Mestre ({customizadas.length})</option>
          </select>
        </div>

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar no baralho..."
          className="rounded-xl border-2 border-amber-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white shadow-sm"
        />
      </div>

      {/* Grid de Cartas com Alto Contraste */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cartasFiltradas.map((carta) => {
          const isVantagem = carta.tipo === 'vantagem';
          const isDemanda = carta.tipo === 'demanda';
          const isCustom = carta.fonte === 'customizado';

          return (
            <div
              key={carta.id}
              className={`flex flex-col justify-between rounded-2xl border-2 bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-[#1B110A] ${
                isDemanda
                  ? 'border-amber-400 dark:border-amber-600'
                  : isVantagem
                  ? 'border-emerald-500 dark:border-emerald-600'
                  : 'border-rose-500 dark:border-rose-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b-2 pb-2 mb-2.5 text-xs">
                  <div className="flex items-center gap-1.5 font-black uppercase tracking-wide">
                    {isDemanda ? (
                      <Sparkles className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    ) : isVantagem ? (
                      <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-rose-700 dark:text-rose-400" />
                    )}
                    <span className="text-stone-900 dark:text-white">{carta.tipo}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md border border-stone-300 bg-stone-100 px-2 py-0.5 text-[10px] font-black uppercase text-stone-800 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200">
                      {carta.fonte === 'oficial'
                        ? `#${carta.numero || ''}`
                        : carta.fonte === 'extra'
                        ? 'Bahia'
                        : 'Mestre'}
                    </span>
                    {isCustom && (
                      <div className="flex items-center gap-1 ml-1">
                        <button
                          onClick={() => abrirEdicao(carta)}
                          className="p-1 text-stone-500 hover:text-amber-700"
                          title="Editar"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removerCartaCustomizada(carta.id)}
                          className="p-1 text-stone-500 hover:text-rose-700"
                          title="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="font-black text-base text-stone-900 dark:text-white mb-2">
                  {carta.titulo}
                </h4>

                <p className="font-serif text-xs leading-relaxed text-stone-800 dark:text-stone-200 mb-3.5 italic">
                  &ldquo;{carta.narrativa}&rdquo;
                </p>

                <div className="rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs font-semibold text-stone-800 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-200">
                  <strong className="block mb-0.5 text-[11px] font-black uppercase tracking-wider text-stone-600 dark:text-stone-400">Efeito:</strong>
                  {carta.efeitoRegra}
                </div>
              </div>

              {carta.testeSugerido && (
                <div className="mt-3.5 pt-2.5 border-t-2 border-stone-200 flex items-center justify-between text-xs text-stone-600 dark:border-stone-800 dark:text-stone-300">
                  <span className="font-bold">Teste Sugerido:</span>
                  <span className="font-black text-stone-900 dark:text-white">
                    {carta.testeSugerido.pericia} (CD {carta.testeSugerido.cd})
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
