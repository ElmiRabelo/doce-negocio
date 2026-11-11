'use client';

import React, { useState, useEffect } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GuiaPassoAPasso } from '@/components/mestre/GuiaPassoAPasso';
import { EscudoDoMestre } from '@/components/mestre/EscudoDoMestre';
import { FichasPersonagens } from '@/components/fichas/FichasPersonagens';
import { FichaNegocio } from '@/components/fichas/FichaNegocio';
import { CalculadoraPrecificacao } from '@/components/fichas/CalculadoraPrecificacao';
import { GerenciadorBaralhos } from '@/components/mestre/GerenciadorBaralhos';
import { BibliotecaRegras } from '@/components/regras/BibliotecaRegras';
import { RoladorDadosModal } from '@/components/dados/RoladorDadosModal';
import { Sparkles, BookOpen, Shield, Dices } from 'lucide-react';

export default function Home() {
  const { sessions, activeSessionId, createSession, selectSession, getActiveSession } = useSessionStore();
  const { abrirModal } = useDiceStore();

  const [abaAtiva, setAbaAtiva] = useState<string>('guia');
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    // Cria sessão inicial se não existir nenhuma
    if (sessions.length === 0) {
      const s = createSession('Campanha de Páscoa', 'Chocolateria Ilhéus', 'resiliencia');
      selectSession(s.id);
    } else if (!activeSessionId) {
      selectSession(sessions[0].id);
    }
  }, [sessions, activeSessionId, createSession, selectSession]);

  // Atalho de teclado 'd' para abrir o rolador de dados
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Se não estiver digitando em um input ou textarea
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        abrirModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [abrirModal]);

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <span className="text-4xl animate-bounce block mb-2">🍫</span>
          <p className="font-bold text-amber-900">Carregando Doce Negócio...</p>
        </div>
      </div>
    );
  }

  const session = getActiveSession();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-[#1A0F0A] dark:bg-[#140B07] dark:text-[#F4ECE1]">
      <Header abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {/* Banner de Boas-Vindas Rápido se for primeira visita */}
        {session && session.etapaAtual === 1 && abaAtiva === 'guia' && (
          <div className="mb-6 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-amber-700/10 p-5 dark:border-amber-700/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                    Bem-vindo, Mestre! Você está no Modo Condução Passo a Passo.
                  </h2>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    Siga a ordem dos 9 passos numerados para guiar os jogadores na abertura da chocolateria. Pressione a tecla <kbd className="rounded border bg-white px-1 py-0.5 font-mono text-[10px] font-bold text-stone-800 dark:bg-stone-800 dark:text-stone-200">D</kbd> a qualquer momento para abrir o rolador de dados.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAbaAtiva('escudo')}
                className="flex items-center gap-1.5 rounded-xl border border-amber-400 bg-white px-3 py-1.5 text-xs font-bold text-amber-900 shadow-sm hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-200"
              >
                <Shield className="h-4 w-4 text-amber-600" />
                <span>Ir para o Escudo Livre</span>
              </button>
            </div>
          </div>
        )}

        {/* Abas Dinâmicas */}
        {abaAtiva === 'guia' && <GuiaPassoAPasso />}
        {abaAtiva === 'escudo' && <EscudoDoMestre />}
        {abaAtiva === 'personagens' && <FichasPersonagens />}
        {abaAtiva === 'negocio' && <FichaNegocio />}
        {abaAtiva === 'precificacao' && <CalculadoraPrecificacao />}
        {abaAtiva === 'baralhos' && <GerenciadorBaralhos />}
        {abaAtiva === 'regras' && <BibliotecaRegras />}
      </main>

      <Footer />

      {/* Rolador de Dados Global */}
      <RoladorDadosModal />
    </div>
  );
}
