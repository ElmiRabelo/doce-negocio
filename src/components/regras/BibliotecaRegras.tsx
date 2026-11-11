'use client';

import React, { useState } from 'react';
import { ATRIBUTOS_REGRAS } from '@/data/regras-base';
import { CLASSES_DOCE_NEGOCIO } from '@/data/classes';
import { CATALOGO_PASCOA } from '@/data/catalogo-pascoa';
import { CATALOGO_UTENSILIOS_EMBALAGENS, CATALOGO_INSUMOS_SIMULACAO } from '@/data/catalogo-compras';
import { RECEITAS_BASE } from '@/data/receitas';
import { BookOpen, Sparkles, ChefHat, Award } from 'lucide-react';

export const BibliotecaRegras: React.FC = () => {
  const [secaoAtiva, setSecaoAtiva] = useState<'regras' | 'classes' | 'receitas' | 'catalogo'>('regras');

  return (
    <div className="space-y-6">
      {/* Top Banner com Alto Contraste */}
      <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-6 shadow-md dark:border-amber-700 dark:bg-[#1B110A] text-stone-900 dark:text-stone-100">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-md border border-amber-400/40">
              <BookOpen className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                Biblioteca & Guia de Consulta do Mestre
              </h2>
              <p className="text-xs font-semibold text-stone-600 dark:text-amber-200/90 mt-0.5">
                Consulte regras, atributos, perícias, tabela de classes, catálogos e o caderno de receitas da vovó.
              </p>
            </div>
          </div>

          {/* Sub-abas de navegação com Alto Contraste */}
          <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wider">
            <button
              onClick={() => setSecaoAtiva('regras')}
              className={`rounded-xl px-4 py-2 transition-all ${
                secaoAtiva === 'regras'
                  ? 'bg-amber-700 text-white shadow-md border border-amber-500'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700'
              }`}
            >
              Regras & Mecânica
            </button>
            <button
              onClick={() => setSecaoAtiva('classes')}
              className={`rounded-xl px-4 py-2 transition-all ${
                secaoAtiva === 'classes'
                  ? 'bg-amber-700 text-white shadow-md border border-amber-500'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700'
              }`}
            >
              Classes & Habilidades
            </button>
            <button
              onClick={() => setSecaoAtiva('receitas')}
              className={`rounded-xl px-4 py-2 transition-all ${
                secaoAtiva === 'receitas'
                  ? 'bg-amber-700 text-white shadow-md border border-amber-500'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700'
              }`}
            >
              Caderno de Receitas
            </button>
            <button
              onClick={() => setSecaoAtiva('catalogo')}
              className={`rounded-xl px-4 py-2 transition-all ${
                secaoAtiva === 'catalogo'
                  ? 'bg-amber-700 text-white shadow-md border border-amber-500'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700'
              }`}
            >
              Catálogos de Preços
            </button>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: REGRAS & MECÂNICA */}
      {secaoAtiva === 'regras' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Como e Quando Testar */}
            <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A] text-xs space-y-3 font-semibold text-stone-800 dark:text-stone-200">
              <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
                <Sparkles className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                Mecânica de Testes & Rolar Dados
              </h3>
              <p>
                <strong>Quando rolar:</strong> Apenas quando uma ação dos jogadores tiver incerteza, pressão de tempo ou risco de perda de material/dinheiro.
              </p>
              <div className="rounded-xl bg-amber-50 p-3.5 border-2 border-amber-300 dark:bg-stone-800 dark:border-stone-700">
                <span className="font-black block text-amber-950 dark:text-amber-200 mb-1 text-sm uppercase tracking-wide">
                  Teste Padrão: 1d20 + Modificador ≥ 15
                </span>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  O modificador da perícia é igual à pontuação do atributo na ficha (ex: CAR 5 → Diplomacia +5). Um resultado total de 15 ou mais é Sucesso! Abaixo de 15 é Falha.
                </p>
              </div>
              <p>
                <strong>Uso da Calculadora:</strong> O manual pede que frações e porcentagens de precificação sejam resolvidas preferencialmente à mão ou no papel mentalmente para reforçar a matemática financeira aplicada.
              </p>
            </div>

            {/* Os Indicadores do Negócio */}
            <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A] text-xs space-y-3 font-medium text-stone-800 dark:text-stone-200">
              <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
                <Award className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                Os 5 Indicadores do Negócio
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <strong className="text-amber-900 dark:text-amber-300 font-black">REP (Reputação):</strong> Imagem pública e atração de novos clientes. Varia com elogios (+5) ou erros em entregas (-2).
                </li>
                <li>
                  <strong className="text-blue-900 dark:text-blue-300 font-black">ETI (Ética - 24):</strong> Honestidade, padrão sanitário e respeito às normas de produção e validade.
                </li>
                <li>
                  <strong className="text-purple-900 dark:text-purple-300 font-black">ER (Relacionamento - 20):</strong> Confiança entre os sócios. <span className="text-rose-700 font-black">Atenção:</span> Se a equipe perder pontos em ER por brigas ou acusações, perde 20% (1/5) do saldo atual de caixa!
                </li>
                <li>
                  <strong className="text-amber-900 dark:text-amber-300 font-black">EXP (Experiência):</strong> Evolução do negócio (+10 EXP por pedido concluído). Ao atingir 100 pontos, ocorre um marco de celebração.
                </li>
                <li>
                  <strong className="text-emerald-900 dark:text-emerald-300 font-black">Caixa (R$):</strong> Capital líquido para compra de embalagens e insumos.
                </li>
              </ul>
            </div>
          </div>

          {/* Tabela de Atributos e Perícias */}
          <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
            <h3 className="font-black text-base text-stone-900 dark:text-white mb-3.5 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
              Atributos e Perícias Associadas
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 text-xs">
              {ATRIBUTOS_REGRAS.map((attr) => (
                <div
                  key={attr.key}
                  className="rounded-xl border-2 border-stone-200 bg-stone-50 p-3.5 dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="font-black text-stone-900 dark:text-white block mb-1.5 text-sm">
                    {attr.nome}
                  </span>
                  <div className="space-y-1 mb-2.5">
                    {attr.pericias.map((p) => (
                      <span key={p} className="inline-block rounded-md border border-amber-300 bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-950 mr-1 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700">
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 leading-relaxed">
                    {attr.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 2: CLASSES */}
      {secaoAtiva === 'classes' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES_DOCE_NEGOCIO.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A] text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-amber-200 pb-2.5 mb-2.5 dark:border-stone-800">
                  <h3 className="font-black text-base text-stone-900 dark:text-white">{c.nome}</h3>
                  <span className="rounded-md border border-amber-300 bg-amber-100 px-2 py-0.5 font-black text-amber-950 text-[11px] uppercase dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700">
                    Atributo: {c.atributoChave.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-2 leading-relaxed">
                  {c.descricao}
                </p>

                <p className="text-stone-700 dark:text-stone-300 font-semibold mb-2.5 text-xs">
                  <strong className="text-stone-900 dark:text-white">Papel no Negócio:</strong> {c.contribuicao}
                </p>

                <div className="mb-2.5 space-y-1.5 rounded-xl bg-amber-50/70 p-2.5 border border-amber-200 dark:bg-stone-900 dark:border-stone-800 text-[11px]">
                  <div>
                    <span className="font-bold text-amber-900 dark:text-amber-300">🌱 Resiliência: </span>
                    <span className="italic font-serif">&ldquo;{c.fraseResiliencia}&rdquo;</span>
                  </div>
                  <div>
                    <span className="font-bold text-amber-900 dark:text-amber-300">✨ Visão: </span>
                    <span className="italic font-serif">&ldquo;{c.fraseVisao}&rdquo;</span>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-100/80 p-3 border-2 border-amber-300 text-stone-900 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100">
                  <span className="font-black text-amber-950 dark:text-amber-200 block mb-1 uppercase tracking-wide">
                    Habilidade da Carta: {c.habilidadeNome}
                  </span>
                  <span className="font-medium text-xs leading-relaxed">{c.habilidadeDescricao}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEÇÃO 3: RECEITAS */}
      {secaoAtiva === 'receitas' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {RECEITAS_BASE.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A] text-xs"
            >
              <div className="flex items-center justify-between border-b-2 border-amber-200 pb-2.5 mb-3.5 dark:border-stone-800">
                <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                  {rec.nome}
                </h3>
                <span className="rounded-md border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-950 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700">
                  {rec.rendimentoDescricao}
                </span>
              </div>

              <div className="mb-3.5">
                <span className="font-black text-stone-900 dark:text-white block mb-1.5 uppercase tracking-wider text-[11px]">Ingredientes:</span>
                <ul className="list-disc list-inside space-y-1 font-semibold text-stone-800 dark:text-stone-200">
                  {rec.ingredientes.map((ing, idx) => (
                    <li key={idx}>
                      {ing.quantidade} {ing.unidade} de {ing.nome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3.5">
                <span className="font-black text-stone-900 dark:text-white block mb-1.5 uppercase tracking-wider text-[11px]">Modo de Preparo:</span>
                <ol className="list-decimal list-inside space-y-1.5 font-medium text-stone-800 dark:text-stone-200">
                  {rec.modoPreparo.map((passo, idx) => (
                    <li key={idx} className="leading-relaxed">{passo}</li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 border-2 border-amber-300 text-amber-950 dark:bg-stone-800 dark:border-stone-700 dark:text-amber-200 font-medium">
                💡 <strong className="font-black text-amber-900 dark:text-amber-300">Dica do Mestre:</strong> {rec.dicaMestre}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEÇÃO 4: CATÁLOGOS */}
      {secaoAtiva === 'catalogo' && (
        <div className="space-y-6">
          {/* Catálogo de Páscoa */}
          <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
            <h3 className="font-black text-base text-stone-900 dark:text-white mb-3.5 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
              Catálogo de Páscoa da Vovó (pp. 67 do Manual)
            </h3>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-4 text-xs">
              {CATALOGO_PASCOA.map((prod) => (
                <div key={prod.id} className="rounded-xl border-2 border-stone-200 p-3.5 bg-stone-50 dark:border-stone-700 dark:bg-stone-900">
                  <span className="font-black text-sm text-stone-900 dark:text-white block mb-1">{prod.nome}</span>
                  <span className="text-amber-800 dark:text-amber-300 font-bold block mb-1 text-xs">
                    {prod.chocolateG}g chocolate {prod.recheioG > 0 && `+ ${prod.recheioG}g recheio`}
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 font-medium text-xs leading-relaxed">{prod.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preços de Insumos & Utensílios */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-xs">
            <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
              <h3 className="font-black text-base text-stone-900 dark:text-white mb-3.5 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
                Preços de Insumos (Simulação Oficial)
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 font-semibold">
                {CATALOGO_INSUMOS_SIMULACAO.map((item) => (
                  <div key={item.id} className="flex justify-between p-2 rounded-lg border border-stone-100 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800/50">
                    <span className="text-stone-900 dark:text-white">{item.nome}</span>
                    <span className="font-black text-amber-900 dark:text-amber-300">
                      R$ {item.precoPadrao.toFixed(2)} por {item.quantidadeEmbalagem} {item.unidade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#C2824D] bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-[#1B110A]">
              <h3 className="font-black text-base text-stone-900 dark:text-white mb-3.5 border-b-2 border-amber-200 pb-2.5 dark:border-stone-800">
                Utensílios & Embalagens do Manual (p. 67)
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 font-semibold">
                {CATALOGO_UTENSILIOS_EMBALAGENS.map((item) => (
                  <div key={item.id} className="flex justify-between p-2 rounded-lg border border-stone-100 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800/50">
                    <span className="text-stone-900 dark:text-white">{item.nome}</span>
                    <span className="font-black text-amber-900 dark:text-amber-300">
                      R$ {item.precoPadrao.toFixed(2)} ({item.quantidadeEmbalagem} {item.unidade})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
