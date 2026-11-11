'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { FalaDeApoio } from './FalaDeApoio';
import { CalculadoraTia } from './CalculadoraTia';
import { SorteadorCartas } from './SorteadorCartas';
import { NARRATIVAS_JOGO } from '@/data/narrativas';
import { CATALOGO_PASCOA } from '@/data/catalogo-pascoa';
import { CLASSES_DOCE_NEGOCIO } from '@/data/classes';
import { ATRIBUTOS_REGRAS, REGRAS_TESTE } from '@/data/regras-base';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Dices, 
  Sparkles, 
  BookOpen, 
  Package, 
  Users, 
  ShoppingCart, 
  Calculator, 
  Layers, 
  Flame, 
  CheckSquare,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ETAPAS_TITULOS = [
  '1. Antes de Chamar os Jogadores',
  '2. Abertura & Perfil da Equipe',
  '3. Montar a Equipe & Fichas',
  '4. Kit Inicial & Herança da Avó',
  '5. Comprar Insumos & Precificar',
  '6. Cena da Tia (1º Pedido)',
  '7. Próximos Turnos (Demanda + Misto)',
  '8. Cola de Regras do Mestre',
  '9. Encerramento da Sessão'
];

export const GuiaPassoAPasso: React.FC = () => {
  const { getActiveSession, setEtapa, updateSession, updateIndicadores, updateKit } = useSessionStore();
  const { abrirModal } = useDiceStore();

  const session = getActiveSession();
  const etapaAtual = session?.etapaAtual || 1;

  // Estados locais para checklists da etapa 1
  const [checklist1, setChecklist1] = useState<{ [k: string]: boolean }>({
    fichas: false,
    dados: false,
    catalogo: false,
    compras: false,
    cartas: false
  });

  if (!session) {
    return (
      <div className="p-12 text-center text-stone-500">
        Nenhuma sessão ativa. Crie ou selecione uma sessão no topo da página.
      </div>
    );
  }

  const { perfil, kit, indicadores, produtosEscolhidos } = session;

  const toggleChecklist = (key: string) => {
    setChecklist1((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMudarPerfil = (novoPerfil: 'resiliencia' | 'visao') => {
    updateSession({ perfil: novoPerfil });
  };

  const handleRolarReputacaoInicial = () => {
    const dados = perfil === 'visao' ? 2 : 1;
    let soma = 0;
    for (let i = 0; i < dados; i++) {
      soma += Math.floor(Math.random() * 6) + 1;
    }
    updateIndicadores({ rep: soma });
    try { confetti({ particleCount: 30, spread: 35 }); } catch {}
  };

  const handleRolarCaixaInicial = () => {
    if (perfil === 'visao') {
      // 7d6 descarta o menor, soma os 6 e multiplica por R$100
      const rolagens = Array.from({ length: 7 }, () => Math.floor(Math.random() * 6) + 1);
      const menor = Math.min(...rolagens);
      const soma = rolagens.reduce((a, b) => a + b, 0) - menor;
      const totalCaixa = soma * 100;
      updateIndicadores({ caixa: totalCaixa });
    } else {
      // 6d4 descarta o menor, soma os 5 e multiplica por R$100
      const rolagens = Array.from({ length: 6 }, () => Math.floor(Math.random() * 4) + 1);
      const menor = Math.min(...rolagens);
      const soma = rolagens.reduce((a, b) => a + b, 0) - menor;
      const totalCaixa = soma * 100;
      updateIndicadores({ caixa: totalCaixa });
    }
    try { confetti({ particleCount: 40, spread: 50 }); } catch {}
  };

  const handleRolarKitInicial = () => {
    // Geladeira 1d6
    const dGeladeira = Math.floor(Math.random() * 6) + 1;
    let estadoGeladeira = '';
    if (perfil === 'visao') {
      if (dGeladeira === 1) estadoGeladeira = 'Antiga, funciona';
      else if (dGeladeira <= 3) estadoGeladeira = 'Usada em bom estado';
      else if (dGeladeira <= 5) estadoGeladeira = 'Bom estado';
      else estadoGeladeira = 'Ótimo estado';
    } else {
      if (dGeladeira === 1) estadoGeladeira = 'Antiga, pode precisar de reparo';
      else if (dGeladeira <= 3) estadoGeladeira = 'Antiga, funciona';
      else if (dGeladeira <= 5) estadoGeladeira = 'Usada em bom estado';
      else estadoGeladeira = 'Bom estado';
    }

    // Fogão 1d6
    const dFogao = Math.floor(Math.random() * 6) + 1;
    let bocas = 4;
    if (perfil === 'visao') {
      bocas = dFogao <= 3 ? 5 : 6;
    } else {
      bocas = dFogao <= 2 ? 4 : dFogao <= 4 ? 5 : 6;
    }

    // Panelas
    let qtdPanelas = 1;
    if (perfil === 'visao') {
      const d1 = Math.floor(Math.random() * 4) + 1;
      const d2 = Math.floor(Math.random() * 4) + 1;
      qtdPanelas = Math.max(d1, d2);
    } else {
      qtdPanelas = Math.floor(Math.random() * 4) + 1;
    }

    const panelasNovas = [];
    for (let i = 0; i < qtdPanelas; i++) {
      const dTam = Math.floor(Math.random() * 6) + 1;
      if (dTam <= 2) {
        panelasNovas.push({ id: `panela_${i}`, tamanho: 'pequena' as const, capacidade: '1,2 L' });
      } else if (dTam <= 4) {
        panelasNovas.push({ id: `panela_${i}`, tamanho: 'media' as const, capacidade: '2,6 L' });
      } else {
        panelasNovas.push({ id: `panela_${i}`, tamanho: 'grande' as const, capacidade: '3,2 L' });
      }
    }

    updateKit({
      geladeira: estadoGeladeira,
      fogaoBocas: bocas,
      batedeira: 1,
      panelas: panelasNovas
    });

    try { confetti({ particleCount: 30, spread: 40 }); } catch {}
  };

  const toggleProdutoEscolhido = (prodNome: string) => {
    let novaLista = [...produtosEscolhidos];
    if (novaLista.includes(prodNome)) {
      novaLista = novaLista.filter((p) => p !== prodNome);
    } else {
      if (novaLista.length >= 2) {
        novaLista.shift(); // remove o primeiro se já tiver 2
      }
      novaLista.push(prodNome);
    }
    updateSession({ produtosEscolhidos: novaLista });
  };

  return (
    <div className="space-y-6">
      {/* Stepper Horizontal */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-4 shadow-sm dark:border-amber-700/60 dark:bg-stone-900">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-stone-500">
          <span>Passo a Passo Guiado do Mestre</span>
          <span>Etapa {etapaAtual} de 9</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {ETAPAS_TITULOS.map((titulo, idx) => {
            const numero = idx + 1;
            const isAtiva = etapaAtual === numero;
            const isPassada = etapaAtual > numero;

            return (
              <button
                key={numero}
                onClick={() => setEtapa(numero)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isAtiva
                    ? 'bg-amber-600 text-white shadow-md'
                    : isPassada
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800'
                }`}
              >
                <span>{numero}.</span>
                <span className="hidden sm:inline">{titulo.split('.')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTEÚDO DE CADA ETAPA */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-md dark:border-amber-700/60 dark:bg-stone-900">
        {/* ===================== ETAPA 1 ===================== */}
        {etapaAtual === 1 && (
          <div className="space-y-4">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 1 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Antes de Chamar os Jogadores
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Prepare a mesa e confira os materiais necessários para a imersão na chocolateria.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'fichas', texto: 'Copie ou abra as Fichas de Personagem por jogador, a Ficha do Negócio e duas Fichas de Precificação.' },
                { id: 'dados', texto: 'Separe os dados d4, d6 e d20 (também d10 e d12 se desejar) ou use o rolador de dados integrado no app.' },
                { id: 'catalogo', texto: 'Deixe à mão o Catálogo de Páscoa com os 4 produtos e as receitas-base que a equipe vai consultar.' },
                { id: 'compras', texto: 'Confira a tabela de Catálogo de Compras com os utensílios, embalagens e preços de insumos.' },
                { id: 'cartas', texto: 'Abra o Baralho Virtual com as cartas de Demanda e o Monte Misto (Obstáculos e Vantagens).' }
              ].map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition ${
                    checklist1[item.id]
                      ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist1[item.id] || false}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-emerald-600 cursor-pointer mt-0.5"
                  />
                  <span className={`text-xs ${checklist1[item.id] ? 'line-through text-stone-500' : 'text-stone-800 dark:text-stone-200'}`}>
                    {item.texto}
                  </span>
                </label>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-950 dark:border-stone-800 dark:bg-stone-800 dark:text-amber-200">
              💡 <strong>Regra de Bolso para o Mestre:</strong> Descreva a situação → Pergunte o que fazem e como → Peça teste de 1d20 + modificador se houver incerteza (CD padrão 15) → Aplique a consequência → Atualize o caixa e a ficha.
            </div>
          </div>
        )}

        {/* ===================== ETAPA 2 ===================== */}
        {etapaAtual === 2 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 2 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Apresente o Jogo, Escolha o Perfil e Leia a Abertura
              </h2>
            </div>

            <FalaDeApoio titulo="Apresente o Jogo" origem="Manual, p. 37">
              {NARRATIVAS_JOGO.aberturaComum.slice(0, 310)}... Vocês são um grupo de amigos que se conheceram na Universidade e decidiram iniciar um pequeno negócio de chocolates artesanais em Ilhéus. Cada um vai interpretar uma pessoa desse grupo. Eu descrevo o que acontece e vocês decidem como querem agir!
            </FalaDeApoio>

            <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-4 dark:border-stone-800 dark:bg-stone-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-200 mb-2">
                Defina o Perfil da Equipe:
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleMudarPerfil('resiliencia')}
                  className={`rounded-xl border p-3 text-left transition ${
                    perfil === 'resiliencia'
                      ? 'border-amber-600 bg-amber-100 shadow-sm dark:bg-amber-950'
                      : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900'
                  }`}
                >
                  <span className="font-bold block text-sm text-stone-900 dark:text-stone-100">
                    🌱 Perfil Resiliência
                  </span>
                  <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                    O negócio nasce da necessidade. Orçamento apertado (Caixa 6d4 descartando menor x R$100), 1d6 de Reputação inicial e equipamentos mais rústicos.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMudarPerfil('visao')}
                  className={`rounded-xl border p-3 text-left transition ${
                    perfil === 'visao'
                      ? 'border-amber-600 bg-amber-100 shadow-sm dark:bg-amber-950'
                      : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900'
                  }`}
                >
                  <span className="font-bold block text-sm text-stone-900 dark:text-stone-100">
                    ✨ Perfil Visão
                  </span>
                  <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                    Apoio da família e foco em nicho nobre. Mais recursos iniciais (Caixa 7d6 descartando menor x R$100), 2d6 de Reputação e equipamentos em melhor estado.
                  </span>
                </button>
              </div>
            </div>

            <FalaDeApoio titulo="Abertura Histórica Comum" origem="Manual, p. 14">
              {NARRATIVAS_JOGO.aberturaComum}
            </FalaDeApoio>

            <FalaDeApoio titulo={`Desfecho do Perfil Escolhido (${perfil === 'visao' ? 'Visão' : 'Resiliência'})`} origem="Manual, p. 14">
              {perfil === 'visao' ? NARRATIVAS_JOGO.desfechoVisao : NARRATIVAS_JOGO.desfechoResiliencia}
            </FalaDeApoio>
          </div>
        )}

        {/* ===================== ETAPA 3 ===================== */}
        {etapaAtual === 3 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 3 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Monte a Equipe e Preencha as Fichas
              </h2>
            </div>

            <FalaDeApoio titulo="Entregue as Fichas e Dê o Nome à Loja" origem="Fala de Apoio">
              Agora vamos montar a equipe! Escolham a classe de vocês na tabela e deem um nome ao seu personagem. Duas pessoas podem escolher a mesma classe. Depois, contem em uma frase como vocês querem ajudar no negócio. E o mais importante: qual vai ser o nome da nossa confeitaria de chocolates?
            </FalaDeApoio>

            <div className="rounded-xl border border-amber-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <h4 className="font-bold text-xs uppercase text-stone-600 mb-2">Nome do Estabelecimento:</h4>
              <input
                type="text"
                value={session.nomeNegocio}
                onChange={(e) => updateSession({ nomeNegocio: e.target.value })}
                placeholder="Ex: Cacau da Bahia, Doce Cabruca..."
                className="w-full rounded-xl border border-amber-300 p-2 text-base font-bold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            {/* Rolagens Iniciais de REP e Caixa */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-stone-800 dark:bg-stone-800/40">
                <span className="font-bold text-xs uppercase text-amber-800 dark:text-amber-300 block mb-1">
                  1. Rolagem de Reputação Inicial:
                </span>
                <p className="text-xs text-stone-500 mb-3">
                  {perfil === 'visao' ? '2d6 somados' : '1d6 simples'}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-amber-700 dark:text-amber-400">
                    REP: {indicadores.rep}
                  </span>
                  <button
                    onClick={handleRolarReputacaoInicial}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-amber-700"
                  >
                    <Dices className="h-4 w-4" />
                    <span>Rolar no Dado</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-stone-800 dark:bg-stone-800/40">
                <span className="font-bold text-xs uppercase text-emerald-800 dark:text-emerald-300 block mb-1">
                  2. Rolagem de Caixa Inicial:
                </span>
                <p className="text-xs text-stone-500 mb-3">
                  {perfil === 'visao'
                    ? 'Role 7d6, descarte o menor e multiplique por R$100'
                    : 'Role 6d4, descarte o menor e multiplique por R$100'}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">
                    R$ {indicadores.caixa.toFixed(2)}
                  </span>
                  <button
                    onClick={handleRolarCaixaInicial}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-700"
                  >
                    <Dices className="h-4 w-4" />
                    <span>Rolar Caixa</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== ETAPA 4 ===================== */}
        {etapaAtual === 4 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 4 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Sorteie o Kit Gratuito e Revele a Herança da Avó
              </h2>
            </div>

            <FalaDeApoio titulo="Apresente o Kit Inicial" origem="Fala de Apoio">
              Vocês vão começar com os equipamentos que já têm à disposição: uma geladeira de duas portas, um fogão, uma batedeira e panelas de alumínio. O kit é de vocês e custa R$ 0! Vamos rolar os dados para descobrir em que estado está a geladeira, quantas bocas tem o fogão e quantas panelas vocês têm com seus tamanhos!
            </FalaDeApoio>

            {/* Painel do Kit Sorteado */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <span className="font-bold text-xs uppercase text-amber-900 dark:text-amber-200">
                  Equipamentos Iniciais da Equipe (Perfil {perfil === 'visao' ? 'Visão' : 'Resiliência'}):
                </span>
                <button
                  onClick={handleRolarKitInicial}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-amber-700"
                >
                  <Dices className="h-4 w-4" />
                  <span>Sortear Kit nos Dados</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <div className="p-2 rounded bg-white dark:bg-stone-900 border">
                  <span className="text-stone-400 block font-bold">Geladeira:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{kit.geladeira}</span>
                </div>
                <div className="p-2 rounded bg-white dark:bg-stone-900 border">
                  <span className="text-stone-400 block font-bold">Fogão:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{kit.fogaoBocas} bocas</span>
                </div>
                <div className="p-2 rounded bg-white dark:bg-stone-900 border">
                  <span className="text-stone-400 block font-bold">Batedeira:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{kit.batedeira} un.</span>
                </div>
                <div className="p-2 rounded bg-white dark:bg-stone-900 border">
                  <span className="text-stone-400 block font-bold">Panelas:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    {kit.panelas.map((p) => `${p.tamanho} (${p.capacidade})`).join(', ') || 'Rolar'}
                  </span>
                </div>
              </div>
            </div>

            <FalaDeApoio titulo="A Herança da Avó · Catálogo de Páscoa" origem="Manual, p. 37">
              {NARRATIVAS_JOGO.herancaAvo(session.personagens[0]?.characterName || 'alguém da equipe')}
            </FalaDeApoio>
          </div>
        )}

        {/* ===================== ETAPA 5 ===================== */}
        {etapaAtual === 5 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 5 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Primeiro Desafio · Escolher 2 Produtos, Comprar e Precificar
              </h2>
            </div>

            <FalaDeApoio titulo="A Páscoa se Aproxima!" origem="Manual, p. 62">
              {NARRATIVAS_JOGO.pascoaChegou}
            </FalaDeApoio>

            <div className="rounded-xl border border-amber-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <h4 className="font-bold text-xs uppercase text-amber-800 dark:text-amber-300 mb-2">
                1. Escolham 2 dos 4 Produtos do Catálogo de Páscoa:
              </h4>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                {CATALOGO_PASCOA.map((prod) => {
                  const selecionado = produtosEscolhidos.includes(prod.nome);
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => toggleProdutoEscolhido(prod.nome)}
                      className={`rounded-xl border p-3 text-left transition ${
                        selecionado
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                          : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100">{prod.nome}</span>
                        {selecionado && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                      </div>
                      <span className="block text-[10px] text-stone-500">
                        {prod.chocolateG}g choc {prod.recheioG > 0 && `+ ${prod.recheioG}g recheio`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 text-xs text-stone-600 dark:text-stone-400 flex items-center justify-between">
                <span>
                  Produtos selecionados: <strong>{produtosEscolhidos.join(' & ') || 'Nenhum ainda'}</strong>
                </span>
                <span className="font-bold text-amber-700 dark:text-amber-300">
                  {produtosEscolhidos.length} / 2 escolhidos
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs dark:border-stone-800 dark:bg-stone-800/40 space-y-2">
              <span className="font-bold text-stone-800 dark:text-stone-200 block">
                Instruções do Mestre para a Mesa:
              </span>
              <p>1. Peçam quantas unidades do lote querem produzir de cada um dos dois produtos.</p>
              <p>2. Usem a aba <strong>&quot;Fichas & Equipe &gt; Ficha de Precificação&quot;</strong> ou a <strong>&quot;Ficha do Negócio&quot;</strong> para lançar os ingredientes comprados e calcular o custo proporcional da parte usada.</p>
              <p>3. Quando a equipe definir os dois preços de venda, avancem para a Etapa 6 para revelar o pedido da Tia!</p>
            </div>
          </div>
        )}

        {/* ===================== ETAPA 6 ===================== */}
        {etapaAtual === 6 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 6 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Cena da Tia · O Primeiro Pedido
              </h2>
            </div>

            <CalculadoraTia />
          </div>
        )}

        {/* ===================== ETAPA 7 ===================== */}
        {etapaAtual === 7 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 7 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Próximos Turnos · Demanda + Acontecimento Inesperado
              </h2>
            </div>

            <FalaDeApoio titulo="Apresente um Novo Turno à Equipe" origem="Fala de Apoio">
              {NARRATIVAS_JOGO.apresentarNovoTurno}
            </FalaDeApoio>

            <SorteadorCartas />
          </div>
        )}

        {/* ===================== ETAPA 8 ===================== */}
        {etapaAtual === 8 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 8 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Cola de Regras Rápidas do Mestre
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs">
              <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-4 dark:border-stone-800 dark:bg-stone-800/40 space-y-2">
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                  Como e Quando Rolar os Dados:
                </h4>
                <p><strong>Quando rolar:</strong> Apenas quando a ação tiver resultado incerto ou depender de habilidade sob pressão.</p>
                <p><strong>Fórmula:</strong> 1d20 + Modificador da Perícia (igual ao valor do atributo).</p>
                <p><strong>Meta:</strong> Total ≥ 15 é Sucesso! Abaixo de 15 é Falha (perde tempo, gasta mais insumos ou perde REP).</p>
                <button
                  onClick={() => abrirModal()}
                  className="mt-2 flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 font-bold text-white shadow hover:bg-amber-700"
                >
                  <Dices className="h-4 w-4" />
                  <span>Abrir Rolador de Dados</span>
                </button>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-800/40 space-y-2">
                <h4 className="font-bold text-sm text-stone-800 dark:text-stone-200">
                  Atributos & Perícias na Ficha:
                </h4>
                <ul className="space-y-1">
                  <li><strong>INT (Inteligência):</strong> Administração e Planejamento</li>
                  <li><strong>SAB (Sabedoria):</strong> Intuição e Cálculo</li>
                  <li><strong>DES (Destreza):</strong> Fabricar e Confeiteiro</li>
                  <li><strong>CAR (Carisma):</strong> Diplomacia e Criatividade</li>
                  <li><strong>CON (Constituição):</strong> Logística e Agilidade</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ===================== ETAPA 9 ===================== */}
        {etapaAtual === 9 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Etapa 9 de 9</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Encerre e Deixe o Próximo Começo Pronto
              </h2>
            </div>

            <FalaDeApoio titulo="Encerre a Sessão com a Mesa" origem="Fala de Apoio">
              {NARRATIVAS_JOGO.encerramentoSessao}
            </FalaDeApoio>

            <div className="rounded-xl border border-amber-300 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 text-xs space-y-2">
              <span className="font-bold text-stone-800 dark:text-stone-200 block">
                Resumo da Sessão Atual para Guardar:
              </span>
              <p>• Saldo em Caixa Final: <strong>R$ {indicadores.caixa.toFixed(2)}</strong></p>
              <p>• Indicadores: REP {indicadores.rep} | ETI {indicadores.eti} | ER {indicadores.er} | EXP {indicadores.exp}</p>
              <p>• Todos os dados estão salvos automaticamente no seu navegador!</p>
            </div>
          </div>
        )}

        {/* Navegação Inferior de Etapas */}
        <div className="mt-8 flex items-center justify-between border-t border-amber-200 pt-4 dark:border-stone-800">
          <button
            onClick={() => setEtapa(Math.max(1, etapaAtual - 1))}
            disabled={etapaAtual === 1}
            className="flex items-center gap-1 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-40 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Etapa Anterior</span>
          </button>

          <span className="text-xs font-semibold text-stone-500">
            {etapaAtual} de 9
          </span>

          <button
            onClick={() => setEtapa(Math.min(9, etapaAtual + 1))}
            disabled={etapaAtual === 9}
            className="flex items-center gap-1 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 disabled:opacity-40"
          >
            <span>Próxima Etapa</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
