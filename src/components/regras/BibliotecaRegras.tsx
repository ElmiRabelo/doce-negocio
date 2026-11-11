'use client';

import React, { useState } from 'react';
import { ATRIBUTOS_REGRAS, REGRAS_TESTE, REGRAS_INDICADORES } from '@/data/regras-base';
import { CLASSES_DOCE_NEGOCIO } from '@/data/classes';
import { CATALOGO_PASCOA } from '@/data/catalogo-pascoa';
import { CATALOGO_UTENSILIOS_EMBALAGENS, CATALOGO_INSUMOS_SIMULACAO } from '@/data/catalogo-compras';
import { RECEITAS_BASE } from '@/data/receitas';
import { BookOpen, Sparkles, ChefHat, Package, Award, HelpCircle } from 'lucide-react';

export const BibliotecaRegras: React.FC = () => {
  const [secaoAtiva, setSecaoAtiva] = useState<'regras' | 'classes' | 'receitas' | 'catalogo'>('regras');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow">
              <BookOpen className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Biblioteca & Guia de Consulta do Mestre
              </h2>
              <p className="text-xs text-stone-500">
                Consulte regras, atributos, perícias, tabela de classes, catálogos e o caderno de receitas da vovó.
              </p>
            </div>
          </div>

          {/* Sub-abas de navegação */}
          <div className="flex flex-wrap gap-1.5 text-xs font-bold">
            <button
              onClick={() => setSecaoAtiva('regras')}
              className={`rounded-xl px-3 py-1.5 transition ${
                secaoAtiva === 'regras'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              Regras & Mecânica
            </button>
            <button
              onClick={() => setSecaoAtiva('classes')}
              className={`rounded-xl px-3 py-1.5 transition ${
                secaoAtiva === 'classes'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              Classes & Habilidades
            </button>
            <button
              onClick={() => setSecaoAtiva('receitas')}
              className={`rounded-xl px-3 py-1.5 transition ${
                secaoAtiva === 'receitas'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              Caderno de Receitas
            </button>
            <button
              onClick={() => setSecaoAtiva('catalogo')}
              className={`rounded-xl px-3 py-1.5 transition ${
                secaoAtiva === 'catalogo'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
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
            <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 text-xs space-y-3">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b pb-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                Mecânica de Testes & Rolar Dados
              </h3>
              <p>
                <strong>Quando rolar:</strong> Apenas quando uma ação dos jogadores tiver incerteza, pressão de tempo ou risco de perda de material/dinheiro.
              </p>
              <div className="rounded-xl bg-amber-50 p-3 border border-amber-200 dark:bg-stone-800 dark:border-stone-700">
                <span className="font-bold block text-amber-900 dark:text-amber-200 mb-1">
                  Teste Padrão: 1d20 + Modificador ≥ 15
                </span>
                <p className="text-stone-700 dark:text-stone-300">
                  O modificador da perícia é igual à pontuação do atributo na ficha (ex: CAR 5 → Diplomacia +5). Um resultado total de 15 ou mais é Sucesso! Abaixo de 15 é Falha.
                </p>
              </div>
              <p>
                <strong>Uso da Calculadora:</strong> O manual pede que frações e porcentagens de precificação sejam resolvidas preferencialmente à mão ou no papel mentalmente para reforçar a matemática financeira aplicada.
              </p>
            </div>

            {/* Os Indicadores do Negócio */}
            <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 text-xs space-y-3">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b pb-2">
                <Award className="h-4 w-4 text-amber-600" />
                Os 5 Indicadores do Negócio
              </h3>
              <ul className="space-y-2">
                <li>
                  <strong className="text-amber-800 dark:text-amber-300">REP (Reputação):</strong> Imagem pública e atração de novos clientes. Varia com elogios (+5) ou erros em entregas (-2).
                </li>
                <li>
                  <strong className="text-blue-800 dark:text-blue-300">ETI (Ética - 24):</strong> Honestidade, padrão sanitário e respeito às normas de produção e validade.
                </li>
                <li>
                  <strong className="text-purple-800 dark:text-purple-300">ER (Relacionamento - 20):</strong> Confiança entre os sócios. <span className="text-rose-600 font-bold">Atenção:</span> Se a equipe perder pontos em ER por brigas ou acusações, perde 20% (1/5) do saldo atual de caixa!
                </li>
                <li>
                  <strong className="text-amber-800 dark:text-amber-300">EXP (Experiência):</strong> Evolução do negócio (+10 EXP por pedido concluído). Ao atingir 100 pontos, ocorre um marco de celebração.
                </li>
                <li>
                  <strong className="text-emerald-800 dark:text-emerald-300">Caixa (R$):</strong> Capital líquido para compra de embalagens e insumos.
                </li>
              </ul>
            </div>
          </div>

          {/* Tabela de Atributos e Perícias */}
          <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-3 border-b pb-2">
              Atributos e Perícias Associadas
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 text-xs">
              {ATRIBUTOS_REGRAS.map((attr) => (
                <div
                  key={attr.key}
                  className="rounded-xl border border-stone-200 bg-stone-50/50 p-3 dark:border-stone-800 dark:bg-stone-800/40"
                >
                  <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                    {attr.nome}
                  </span>
                  <div className="space-y-1 mb-2">
                    {attr.pericias.map((p) => (
                      <span key={p} className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-900 mr-1 dark:bg-amber-950 dark:text-amber-300">
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES_DOCE_NEGOCIO.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">{c.nome}</h3>
                  <span className="rounded bg-amber-100 px-2 py-0.5 font-bold text-amber-800 text-[10px] uppercase dark:bg-amber-950 dark:text-amber-300">
                    Atributo: {c.atributoChave}
                  </span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 font-medium mb-3">
                  <strong>Papel no Negócio:</strong> {c.contribuicao}
                </p>
                <div className="rounded-xl bg-amber-50 p-3 border border-amber-200 text-stone-800 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">
                    Habilidade da Carta: {c.habilidadeNome}
                  </span>
                  {c.habilidadeDescricao}
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
              className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 text-xs"
            >
              <div className="flex items-center justify-between border-b pb-2 mb-3">
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-amber-600" />
                  {rec.nome}
                </h3>
                <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {rec.rendimentoDescricao}
                </span>
              </div>

              <div className="mb-3">
                <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Ingredientes:</span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600 dark:text-stone-400">
                  {rec.ingredientes.map((ing, idx) => (
                    <li key={idx}>
                      {ing.quantidade} {ing.unidade} de {ing.nome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Modo de Preparo:</span>
                <ol className="list-decimal list-inside space-y-1 text-stone-600 dark:text-stone-400">
                  {rec.modoPreparo.map((passo, idx) => (
                    <li key={idx} className="leading-relaxed">{passo}</li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200 text-amber-950 dark:bg-stone-800 dark:border-stone-700 dark:text-amber-200">
                💡 <strong>Dica do Mestre:</strong> {rec.dicaMestre}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEÇÃO 4: CATÁLOGOS */}
      {secaoAtiva === 'catalogo' && (
        <div className="space-y-6">
          {/* Catálogo de Páscoa */}
          <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-3 border-b pb-2">
              Catálogo de Páscoa da Vovó (pp. 67 do Manual)
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 text-xs">
              {CATALOGO_PASCOA.map((prod) => (
                <div key={prod.id} className="rounded-xl border p-3 bg-stone-50/50 dark:bg-stone-800/40">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">{prod.nome}</span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold block mb-1">
                    {prod.chocolateG}g chocolate {prod.recheioG > 0 && `+ ${prod.recheioG}g recheio`}
                  </span>
                  <p className="text-stone-500 text-[11px] leading-relaxed">{prod.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preços de Insumos & Utensílios */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-xs">
            <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-3 border-b pb-2">
                Preços de Insumos (Simulação Oficial)
              </h3>
              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {CATALOGO_INSUMOS_SIMULACAO.map((item) => (
                  <div key={item.id} className="flex justify-between p-1.5 rounded hover:bg-stone-50 dark:hover:bg-stone-800">
                    <span className="font-medium">{item.nome}</span>
                    <span className="font-bold text-amber-800 dark:text-amber-300">
                      R$ {item.precoPadrao.toFixed(2)} por {item.quantidadeEmbalagem} {item.unidade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-3 border-b pb-2">
                Utensílios & Embalagens do Manual (p. 67)
              </h3>
              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {CATALOGO_UTENSILIOS_EMBALAGENS.map((item) => (
                  <div key={item.id} className="flex justify-between p-1.5 rounded hover:bg-stone-50 dark:hover:bg-stone-800">
                    <span className="font-medium">{item.nome}</span>
                    <span className="font-bold text-amber-800 dark:text-amber-300">
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
