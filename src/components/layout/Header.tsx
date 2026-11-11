'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useDiceStore } from '@/store/diceStore';
import { 
  Building2, 
  Dices, 
  BookOpen, 
  Shield, 
  Users, 
  Layers, 
  Calculator, 
  Plus, 
  Download, 
  Upload, 
  Trash2,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  abaAtiva: string;
  setAbaAtiva: (aba: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ abaAtiva, setAbaAtiva }) => {
  const { 
    sessions, 
    activeSessionId, 
    getActiveSession, 
    selectSession, 
    createSession, 
    deleteSession,
    exportarSessaoJson,
    importarSessaoJson 
  } = useSessionStore();

  const { abrirModal } = useDiceStore();
  const session = getActiveSession();

  const [modalSessoesAberto, setModalSessoesAberto] = useState<boolean>(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState<boolean>(false);

  // Form nova sessão
  const [novaCampanha, setNovaCampanha] = useState<string>('');
  const [novoNegocio, setNovoNegocio] = useState<string>('');
  const [novoPerfil, setNovoPerfil] = useState<'resiliencia' | 'visao'>('resiliencia');

  const handleCriarSessao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNegocio.trim()) return;
    const criada = createSession(novaCampanha.trim(), novoNegocio.trim(), novoPerfil);
    selectSession(criada.id);
    setNovaCampanha('');
    setNovoNegocio('');
    setModalSessoesAberto(false);
  };

  const handleExportar = () => {
    const jsonStr = exportarSessaoJson();
    if (!jsonStr) return;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doce-negocio-sessao-${session?.nomeNegocio || 'backup'}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const ok = importarSessaoJson(content);
        if (ok) {
          alert('Sessão restaurada com sucesso!');
          setModalSessoesAberto(false);
        } else {
          alert('Erro ao importar arquivo de sessão. Verifique o formato JSON.');
        }
      }
    };
    reader.readAsText(file);
  };

  const navItems = [
    { id: 'guia', label: 'Guia Passo a Passo', icon: BookOpen },
    { id: 'escudo', label: 'Escudo do Mestre', icon: Shield },
    { id: 'personagens', label: 'Personagens', icon: Users },
    { id: 'negocio', label: 'Ficha do Negócio', icon: Building2 },
    { id: 'precificacao', label: 'Precificação', icon: Calculator },
    { id: 'baralhos', label: 'Baralhos', icon: Layers },
    { id: 'regras', label: 'Regras & Receitas', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-amber-300/80 bg-amber-50/95 backdrop-blur-md dark:border-amber-800/50 dark:bg-stone-950/95">
      {/* Top Bar: Brand, Info & Actions */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-md">
            <span className="text-xl">🍫</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 tracking-tight">
                Doce Negócio
              </h1>
              <span className="rounded-full bg-amber-200/70 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                Guia do Mestre
              </span>
            </div>
            {session && (
              <p className="text-xs text-stone-500 truncate max-w-[200px] sm:max-w-xs">
                {session.nomeNegocio} · <span className="font-semibold capitalize text-amber-700 dark:text-amber-400">{session.perfil}</span>
              </p>
            )}
          </div>
        </div>

        {/* Live Indicators Pills (Desktop) */}
        {session && (
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold">
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              R$ {session.indicadores.caixa.toFixed(2)}
            </div>
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              REP {session.indicadores.rep}
            </div>
            <div className="rounded-xl border border-blue-300 bg-blue-50 px-2.5 py-1 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              ETI {session.indicadores.eti}
            </div>
            <div className="rounded-xl border border-purple-300 bg-purple-50 px-2.5 py-1 text-purple-900 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300">
              ER {session.indicadores.er}
            </div>
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              EXP {session.indicadores.exp}/100
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-amber-700 transition"
          >
            <Dices className="h-4 w-4" />
            <span className="hidden sm:inline">Dados (d20)</span>
          </button>

          <button
            onClick={() => setModalSessoesAberto(true)}
            className="flex items-center gap-1 rounded-xl border border-amber-300 bg-white px-2.5 py-1.5 text-xs font-bold text-stone-700 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
          >
            <Building2 className="h-3.5 w-3.5 text-amber-600" />
            <span className="hidden md:inline">Sessões</span>
          </button>

          {/* Toggle Mobile Menu */}
          <button
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className="rounded-lg p-1.5 text-stone-600 hover:bg-amber-200/50 lg:hidden dark:text-stone-300"
          >
            {menuMobileAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Main Nav Tabs (Desktop) */}
      <nav className="hidden lg:block border-t border-amber-200/80 bg-amber-100/40 px-4 dark:border-stone-800 dark:bg-stone-900/60">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const ativa = abaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAbaAtiva(item.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  ativa
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-amber-200/60 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Nav Menu Drawer */}
      {menuMobileAberto && (
        <div className="border-t border-amber-200 bg-amber-50 p-4 lg:hidden dark:border-stone-800 dark:bg-stone-950">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const ativa = abaAtiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAbaAtiva(item.id);
                    setMenuMobileAberto(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl p-2.5 text-xs font-bold text-left ${
                    ativa
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-stone-700 hover:bg-amber-100 dark:bg-stone-800 dark:text-stone-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Gerenciador de Sessões / Backup */}
      {modalSessoesAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 border border-amber-300">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-amber-600" />
                Gerenciador de Sessões & Backup Local
              </h3>
              <button
                onClick={() => setModalSessoesAberto(false)}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Lista de Sessões Existentes */}
            <div className="mb-4 space-y-2 max-h-44 overflow-y-auto pr-1">
              <span className="text-xs font-bold text-stone-500 block uppercase">Sessões Salvas:</span>
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center justify-between rounded-xl border p-2.5 text-xs transition ${
                    s.id === activeSessionId
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/50'
                      : 'border-stone-200 hover:bg-stone-50 dark:border-stone-800'
                  }`}
                >
                  <div
                    onClick={() => { selectSession(s.id); setModalSessoesAberto(false); }}
                    className="cursor-pointer flex-1"
                  >
                    <span className="font-bold text-stone-800 dark:text-stone-200 block">
                      {s.nomeNegocio}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Campanha: {s.nomeCampanha} · Perfil: {s.perfil} · Caixa R$ {s.indicadores.caixa.toFixed(2)}
                    </span>
                  </div>

                  {sessions.length > 1 && (
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="p-1 text-stone-400 hover:text-rose-600"
                      title="Excluir sessão"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Criar Nova Sessão */}
            <form onSubmit={handleCriarSessao} className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 mb-4 text-xs dark:border-stone-800 dark:bg-stone-800/40">
              <span className="font-bold text-amber-900 dark:text-amber-200 block mb-2">Criar Nova Sessão:</span>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={novoNegocio}
                  onChange={(e) => setNovoNegocio(e.target.value)}
                  placeholder="Nome da Loja (ex: Doce Bahia)"
                  className="w-full rounded border p-1.5 font-bold"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={novaCampanha}
                    onChange={(e) => setNovaCampanha(e.target.value)}
                    placeholder="Nome da Campanha (opcional)"
                    className="rounded border p-1.5"
                  />
                  <select
                    value={novoPerfil}
                    onChange={(e) => setNovoPerfil(e.target.value as 'resiliencia' | 'visao')}
                    className="rounded border p-1.5 font-bold"
                  >
                    <option value="resiliencia">🌱 Perfil Resiliência</option>
                    <option value="visao">✨ Perfil Visão</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-amber-600 py-1.5 font-bold text-white hover:bg-amber-700"
                >
                  Criar e Abrir Nova Sessão
                </button>
              </div>
            </form>

            {/* Backup JSON */}
            <div className="flex items-center justify-between border-t pt-3 text-xs">
              <button
                onClick={handleExportar}
                className="flex items-center gap-1 rounded border border-amber-300 bg-amber-50 px-3 py-1.5 font-bold text-amber-900 hover:bg-amber-100"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Exportar Backup (JSON)</span>
              </button>

              <label className="flex items-center gap-1 rounded border border-stone-300 bg-white px-3 py-1.5 font-bold text-stone-700 hover:bg-stone-100 cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span>Importar JSON</span>
                <input type="file" accept=".json" onChange={handleImportar} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
