'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { CLASSES_DOCE_NEGOCIO } from '@/data/classes';
import { ATRIBUTOS_REGRAS } from '@/data/regras-base';
import { CharacterClass, AttributeKey } from '@/types';
import { Users, Plus, Trash2, Sparkles, Brain, ChefHat, Truck, Shield } from 'lucide-react';

export const FichasPersonagens: React.FC = () => {
  const { getActiveSession, addPersonagem, updatePersonagem, removePersonagem } = useSessionStore();
  const { abrirModal } = useDiceStore();
  const session = getActiveSession();

  const personagens = session?.personagens || [];

  const [modoCriacao, setModoCriacao] = useState<boolean>(false);
  const [nomeJogador, setNomeJogador] = useState<string>('');
  const [nomePersonagem, setNomePersonagem] = useState<string>('');
  const [classeSelecionada, setClasseSelecionada] = useState<CharacterClass>('estrategista');
  const [atributos, setAtributos] = useState<{ [key in AttributeKey]: number }>({
    int: 4,
    sab: 4,
    des: 4,
    car: 4,
    con: 4
  });

  const classeDef = CLASSES_DOCE_NEGOCIO.find((c) => c.id === classeSelecionada)!;

  const totalPontosUsados = Object.values(atributos).reduce((a, b) => a + b, 0);
  const pontosRestantes = 20 - totalPontosUsados;
  const temAtributoAcimaTeto = Object.values(atributos).some((val) => val > 10);
  const distribuicaoValida = totalPontosUsados === 20 && !temAtributoAcimaTeto;

  const handleAtributoChange = (attr: AttributeKey, delta: number) => {
    const atual = atributos[attr];
    const novo = Math.max(0, Math.min(10, atual + delta));
    setAtributos((prev) => ({ ...prev, [attr]: novo }));
  };

  const handleSalvarPersonagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomePersonagem.trim()) return;
    if (!distribuicaoValida) return;

    addPersonagem({
      playerName: nomeJogador.trim() || 'Jogador',
      characterName: nomePersonagem.trim(),
      className: classeSelecionada,
      attributes: { ...atributos },
      habilidadeUsada: false,
      notas: ''
    });

    setNomeJogador('');
    setNomePersonagem('');
    setClasseSelecionada('estrategista');
    setAtributos({ int: 4, sab: 4, des: 4, car: 4, con: 4 });
    setModoCriacao(false);
  };

  const getClasseIcone = (classe: CharacterClass) => {
    switch (classe) {
      case 'estrategista': return <Brain className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />;
      case 'artesao': return <ChefHat className="h-5 w-5 text-amber-700 dark:text-amber-400" />;
      case 'bardo': return <Sparkles className="h-5 w-5 text-pink-700 dark:text-pink-400" />;
      case 'arquiteto': return <Truck className="h-5 w-5 text-cyan-700 dark:text-cyan-400" />;
      case 'guardia': return <Shield className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner com Alto Contraste */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A]">
        <div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-white flex items-center gap-2.5">
            <Users className="h-6 w-6 text-amber-700 dark:text-amber-400" />
            Fichas dos Personagens ({personagens.length})
          </h2>
          <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-1">
            Cada jogador distribui exatamente 20 pontos entre INT, SAB, DES, CAR e CON (com teto máximo de 10 por atributo).
          </p>
        </div>

        <button
          onClick={() => setModoCriacao(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Personagem</span>
        </button>
      </div>

      {/* Formulário de Criação */}
      {modoCriacao && (
        <form
          onSubmit={handleSalvarPersonagem}
          className="rounded-2xl border-2 border-amber-500 bg-amber-50/80 p-6 shadow-lg dark:border-amber-700 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
        >
          <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-4 dark:border-stone-800">
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Criar Nova Ficha de Personagem
            </h3>
            <button
              type="button"
              onClick={() => setModoCriacao(false)}
              className="text-xs font-black uppercase text-stone-500 hover:text-stone-900 dark:hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Nome do Personagem:
              </label>
              <input
                type="text"
                required
                value={nomePersonagem}
                onChange={(e) => setNomePersonagem(e.target.value)}
                placeholder="Ex: Clara Cacau, Mário Mel, Gabriela..."
                className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Nome do Jogador:
              </label>
              <input
                type="text"
                value={nomeJogador}
                onChange={(e) => setNomeJogador(e.target.value)}
                placeholder="Quem está interpretando"
                className="w-full rounded-xl border-2 border-amber-300 bg-white p-2.5 text-sm font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
                Escolha a Classe:
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
                {CLASSES_DOCE_NEGOCIO.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setClasseSelecionada(c.id)}
                    className={`rounded-2xl border-2 p-3 text-left transition-all ${
                      classeSelecionada === c.id
                        ? 'border-amber-600 bg-amber-100 shadow-md dark:bg-amber-950/80 ring-2 ring-amber-500/30'
                        : 'border-stone-300 bg-white hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {getClasseIcone(c.id)}
                      <span className="font-black text-xs text-stone-900 dark:text-white">{c.nome}</span>
                    </div>
                    <span className="block text-[11px] text-stone-600 dark:text-stone-400 font-bold">
                      Atributo: {c.atributoChave.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-3 rounded-xl border-2 border-amber-300 bg-amber-100/90 p-3 text-xs text-amber-950 dark:bg-stone-800 dark:border-stone-700 dark:text-amber-200">
                <span className="font-black uppercase tracking-wider">Habilidade da Carta ({classeDef.habilidadeNome}):</span>{' '}
                <span className="font-medium">{classeDef.habilidadeDescricao}</span>
              </div>
            </div>

            {/* Distribuição dos 20 pontos */}
            <div className="md:col-span-2 rounded-2xl border-2 border-amber-400 bg-white p-5 dark:border-stone-700 dark:bg-stone-800">
              <div className="flex items-center justify-between mb-3 border-b-2 border-amber-200 pb-2.5 dark:border-stone-700">
                <span className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Distribuição de Atributos (Total: 20 Pontos · Teto: 10 por atributo)
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                    pontosRestantes === 0 && !temAtributoAcimaTeto
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 dark:bg-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-100 text-rose-900 border border-rose-400 dark:bg-rose-950 dark:text-rose-200'
                  }`}
                >
                  {pontosRestantes === 0
                    ? 'Total 20/20 ✓'
                    : pontosRestantes > 0
                    ? `Faltam: ${pontosRestantes} pts`
                    : `Excedeu: ${Math.abs(pontosRestantes)} pts`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {ATRIBUTOS_REGRAS.map((attr) => {
                  const val = atributos[attr.key];
                  const isChave = classeDef.atributoChave === attr.key;

                  return (
                    <div
                      key={attr.key}
                      className={`flex flex-col items-center rounded-2xl border-2 p-3 text-center ${
                        isChave
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                          : 'border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-black text-xs text-stone-900 dark:text-white mb-1">
                        <span>{attr.key.toUpperCase()}</span>
                        {isChave && (
                          <span className="text-xs text-amber-600 font-black" title="Atributo-chave da classe">
                            ★
                          </span>
                        )}
                      </div>

                      <span className="text-3xl font-black text-stone-900 dark:text-white my-1">
                        {val}
                      </span>

                      <div className="flex items-center gap-2 my-1">
                        <button
                          type="button"
                          onClick={() => handleAtributoChange(attr.key, -1)}
                          className="h-7 w-7 rounded-lg bg-stone-200 text-stone-900 font-black hover:bg-stone-300 dark:bg-stone-700 dark:text-white transition"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAtributoChange(attr.key, +1)}
                          className="h-7 w-7 rounded-lg bg-amber-700 text-white font-black hover:bg-amber-600 transition shadow"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-[11px] text-stone-600 dark:text-stone-400 font-bold line-clamp-1 mt-1">
                        {attr.pericias.join(', ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
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
              disabled={!distribuicaoValida || !nomePersonagem.trim()}
              className="rounded-xl bg-amber-700 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 disabled:opacity-50 transition"
            >
              Salvar Personagem
            </button>
          </div>
        </form>
      )}

      {/* Lista de Fichas dos Personagens com Cards Nítidos */}
      {personagens.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/40 p-12 text-center dark:border-stone-800">
          <Users className="mx-auto h-12 w-12 text-amber-700 dark:text-amber-400 mb-2 opacity-80" />
          <h3 className="font-black text-lg text-stone-900 dark:text-white">Nenhum personagem cadastrado</h3>
          <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-1 max-w-sm mx-auto">
            Cadastre os membros da equipe de confeiteiros para acompanhar os atributos, perícias e uso das habilidades especiais em mesa.
          </p>
          <button
            onClick={() => setModoCriacao(true)}
            className="mt-4 rounded-xl bg-amber-700 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-amber-600 transition"
          >
            Cadastrar Primeiro Personagem
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {personagens.map((p) => {
            const def = CLASSES_DOCE_NEGOCIO.find((c) => c.id === p.className)!;

            return (
              <div
                key={p.id}
                className="flex flex-col justify-between rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-md dark:border-stone-800 dark:bg-[#1B110A]"
              >
                <div>
                  <div className="flex items-start justify-between border-b-2 border-amber-200 pb-3 mb-3 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 border border-amber-300 dark:bg-stone-800 dark:border-stone-700 shadow-sm">
                        {getClasseIcone(p.className)}
                      </div>
                      <div>
                        <h3 className="font-black text-base text-stone-900 dark:text-white">
                          {p.characterName}
                        </h3>
                        <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                          {def.nome} · Jogador: <span className="font-bold text-amber-900 dark:text-amber-300">{p.playerName}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removePersonagem(p.id)}
                      className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                      title="Excluir Personagem"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Tabela de Atributos com Alto Contraste */}
                  <div className="grid grid-cols-5 gap-2 text-center my-3.5">
                    {(['int', 'sab', 'des', 'car', 'con'] as AttributeKey[]).map((attr) => {
                      const valor = p.attributes[attr];
                      const isChave = def.atributoChave === attr;

                      return (
                        <div
                          key={attr}
                          className={`rounded-xl border-2 p-2 ${
                            isChave
                              ? 'border-amber-500 bg-amber-100/80 shadow-sm dark:bg-amber-950/70'
                              : 'border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900'
                          }`}
                        >
                          <span className="block text-[11px] font-black text-stone-600 dark:text-stone-300 uppercase">
                            {attr} {isChave && '★'}
                          </span>
                          <span className="text-xl font-black text-stone-900 dark:text-white">
                            {valor}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Habilidade da Classe */}
                  <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3 text-xs dark:border-stone-800 dark:bg-stone-900 mb-3 font-medium">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-amber-950 dark:text-amber-200 flex items-center gap-1 text-xs">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                        Habilidade: {def.habilidadeNome}
                      </span>
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800 dark:text-stone-200 text-xs">
                        <input
                          type="checkbox"
                          checked={p.habilidadeUsada}
                          onChange={(e) => updatePersonagem(p.id, { habilidadeUsada: e.target.checked })}
                          className="h-4 w-4 rounded accent-amber-600"
                        />
                        <span>Usada</span>
                      </label>
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 text-xs leading-relaxed">
                      {def.habilidadeDescricao}
                    </p>
                  </div>
                </div>

                {/* Perícias Rápidas para Rolar */}
                <div className="pt-2.5 border-t-2 border-stone-200 dark:border-stone-800">
                  <span className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">
                    Rolar Perícia do Personagem:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                    <button
                      onClick={() => abrirModal()}
                      className="rounded-lg border border-stone-300 bg-stone-100 px-2.5 py-1 text-stone-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition"
                    >
                      Admin (+{p.attributes.int})
                    </button>
                    <button
                      onClick={() => abrirModal()}
                      className="rounded-lg border border-stone-300 bg-stone-100 px-2.5 py-1 text-stone-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition"
                    >
                      Fabricar (+{p.attributes.des})
                    </button>
                    <button
                      onClick={() => abrirModal()}
                      className="rounded-lg border border-stone-300 bg-stone-100 px-2.5 py-1 text-stone-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition"
                    >
                      Confeiteiro (+{p.attributes.des})
                    </button>
                    <button
                      onClick={() => abrirModal()}
                      className="rounded-lg border border-stone-300 bg-stone-100 px-2.5 py-1 text-stone-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition"
                    >
                      Diplomacia (+{p.attributes.car})
                    </button>
                    <button
                      onClick={() => abrirModal()}
                      className="rounded-lg border border-stone-300 bg-stone-100 px-2.5 py-1 text-stone-800 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition"
                    >
                      Logística (+{p.attributes.con})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
