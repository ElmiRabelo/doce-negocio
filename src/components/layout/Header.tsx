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
    { id: 'baralhos', label: 'Baralhos & Editor', icon: Layers },
    { id: 'regras', label: 'Regras & Receitas', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-amber-800 bg-[#1A0E08] text-white shadow-xl">
      {/* Top Bar: Brand, Info & Actions */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 text-white shadow-lg border border-amber-400/40">
            <span className="text-2xl">🍫</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-base sm:text-lg text-[#FFFDF8] tracking-wide">
                Doce Negócio
              </h1>
              <span className="rounded-md border border-amber-500/80 bg-amber-950/80 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                Escudo do Mestre
              </span>
            </div>
            {session && (
              <p className="text-xs text-amber-200/90 font-medium truncate max-w-[200px] sm:max-w-xs">
                {session.nomeNegocio} · <span className="font-bold uppercase text-amber-400">{session.perfil}</span>
              </p>
            )}
          </div>
        </div>

        {/* Live Indicators Pills (Desktop) */}
        {session && (
          <div className="hidden lg:flex items-center gap-2.5 text-xs font-bold">
            <div className="rounded-xl border border-emerald-500/80 bg-emerald-950/70 px-3 py-1.5 text-emerald-300 shadow-sm flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider opacity-75">Caixa:</span>
              <span className="font-black text-sm text-emerald-200">R$ {session.indicadores.caixa.toFixed(2)}</span>
            </div>
            <div className="rounded-xl border border-amber-500/80 bg-amber-950/70 px-2.5 py-1.5 text-amber-300 shadow-sm flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider opacity-75">REP:</span>
              <span className="font-black text-sm text-amber-100">{session.indicadores.rep}</span>
            </div>
            <div className="rounded-xl border border-blue-500/80 bg-blue-950/70 px-2.5 py-1.5 text-blue-300 shadow-sm flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider opacity-75">ETI:</span>
              <span className="font-black text-sm text-blue-100">{session.indicadores.eti}</span>
            </div>
            <div className="rounded-xl border border-purple-500/80 bg-purple-950/70 px-2.5 py-1.5 text-purple-300 shadow-sm flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider opacity-75">ER:</span>
              <span className="font-black text-sm text-purple-100">{session.indicadores.er}</span>
            </div>
            <div className="rounded-xl border border-amber-600/80 bg-stone-900/80 px-2.5 py-1.5 text-amber-300 shadow-sm flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider opacity-75">EXP:</span>
              <span className="font-black text-sm text-amber-200">{session.indicadores.exp}/100</span>
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:from-amber-500 hover:to-amber-600 transition active:scale-95 border border-amber-400/30"
          >
            <Dices className="h-4 w-4" />
            <span className="hidden sm:inline">Dados (d20)</span>
          </button>

          <button
            onClick={() => setModalSessoesAberto(true)}
            className="flex items-center gap-1.5 rounded-xl border border-amber-700/80 bg-[#28160E] px-3 py-2 text-xs font-bold text-amber-200 hover:bg-[#382014] hover:text-white transition"
          >
            <Building2 className="h-4 w-4 text-amber-400" />
            <span className="hidden md:inline">Sessões</span>
          </button>

          {/* Toggle Mobile Menu */}
          <button
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className="rounded-lg p-2 text-amber-200 hover:bg-amber-950 lg:hidden"
          >
            {menuMobileAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Main Nav Tabs (Desktop) */}
      <nav className="hidden lg:block border-t border-amber-900/60 bg-[#24130A] px-4">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const ativa = abaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAbaAtiva(item.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wide transition-all ${
                  ativa
                    ? 'bg-amber-600 text-white shadow-md border border-amber-400/40'
                    : 'text-amber-200/90 hover:bg-[#341C0F] hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${ativa ? 'text-white' : 'text-amber-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Nav Menu Drawer */}
      {menuMobileAberto && (
        <div className="border-t border-amber-900 bg-[#201008] p-4 lg:hidden">
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
                  className={`flex items-center gap-2 rounded-xl p-3 text-xs font-bold text-left ${
                    ativa
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-[#2E180D] text-amber-200 hover:bg-[#3D2113]'
                  }`}
                >
                  <Icon className="h-4 w-4 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Gerenciador de Sessões / Backup */}
      {modalSessoesAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 border-2 border-amber-600 text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-black text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-amber-600" />
                Gerenciador de Sessões & Backup Local
              </h3>
              <button
                onClick={() => setModalSessoesAberto(false)}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 p-1"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Lista de Sessões Existentes */}
            <div className="mb-4 space-y-2 max-h-44 overflow-y-auto pr-1">
              <span className="text-xs font-black text-stone-600 dark:text-stone-400 block uppercase tracking-wider">
                Sessões Salvas:
              </span>
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center justify-between rounded-xl border-2 p-3 text-xs transition ${
                    s.id === activeSessionId
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/50 shadow-sm'
                      : 'border-stone-200 hover:bg-stone-50 dark:border-stone-800'
                  }`}
                >
                  <div
                    onClick={() => { selectSession(s.id); setModalSessoesAberto(false); }}
                    className="cursor-pointer flex-1"
                  >
                    <span className="font-black text-sm text-stone-900 dark:text-stone-100 block">
                      {s.nomeNegocio}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                      Campanha: {s.nomeCampanha} · Perfil: {s.perfil} · Caixa R$ {s.indicadores.caixa.toFixed(2)}
                    </span>
                  </div>

                  {sessions.length > 1 && (
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg dark:hover:bg-rose-950/30"
                      title="Excluir sessão"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Criar Nova Sessão */}
            <form onSubmit={handleCriarSessao} className="rounded-xl border-2 border-amber-300 bg-amber-50/70 p-3.5 mb-4 text-xs dark:border-stone-800 dark:bg-stone-800/40">
              <span className="font-black text-amber-950 dark:text-amber-200 block mb-2 uppercase tracking-wide">
                Criar Nova Sessão:
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={novoNegocio}
                  onChange={(e) => setNovoNegocio(e.target.value)}
                  placeholder="Nome da Loja (ex: Doce Bahia Confeitaria)"
                  className="w-full rounded-lg border border-amber-300 bg-white p-2 font-bold text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={novaCampanha}
                    onChange={(e) => setNovaCampanha(e.target.value)}
                    placeholder="Nome da Campanha (opcional)"
                    className="rounded-lg border border-amber-300 bg-white p-2 font-medium text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                  />
                  <select
                    value={novoPerfil}
                    onChange={(e) => setNovoPerfil(e.target.value as 'resiliencia' | 'visao')}
                    className="rounded-lg border border-amber-300 bg-white p-2 font-bold text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                  >
                    <option value="resiliencia">🌱 Perfil Resiliência</option>
                    <option value="visao">✨ Perfil Visão</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-600 py-2 font-black text-white hover:bg-amber-700 shadow transition"
                >
                  Criar e Abrir Nova Sessão
                </button>
              </div>
            </form>

            {/* Backup JSON */}
            <div className="flex items-center justify-between border-t pt-3 text-xs">
              <button
                onClick={handleExportar}
                className="flex items-center gap-1.5 rounded-xl border border-amber-400 bg-amber-50 px-3 py-2 font-bold text-amber-950 hover:bg-amber-100 dark:bg-stone-800 dark:text-amber-200"
              >
                <Download className="h-4 w-4 text-amber-700" />
                <span>Exportar Backup (JSON)</span>
              </button>

              <label className="flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3 py-2 font-bold text-stone-800 hover:bg-stone-100 cursor-pointer dark:bg-stone-800 dark:text-stone-200">
                <Upload className="h-4 w-4 text-stone-600" />
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
