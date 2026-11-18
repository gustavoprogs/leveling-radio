import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AudioLines, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  ChevronLeft, ChevronRight, CircleHelp, Crown, Disc3, Flame, Gamepad2, Headphones,
  LogIn, Menu, MessageCircle, Mic2, Play, Radio, Search, Shield,
  Sparkles, Swords, Trophy, Users, Volume2, VolumeX, X, Zap
} from 'lucide-react';
import './styles.css';

const streamUrl = import.meta.env.VITE_RADIO_STREAM_URL || '';

const featureSlides = [
  {
    id: 'novidades', tab: 'NOVIDADES', eyebrow: 'NOVIDADES DA COMUNIDADE',
    title: 'O que há de novo', highlight: 'por aqui.',
    description: 'Fique por dentro das atualizações, notícias e histórias do universo Leveling Idle 2D.',
    cta: 'ACOMPANHAR NOVIDADES', target: null
  },
  {
    id: 'eventos', tab: 'EVENTOS', eyebrow: 'AGENDA DOS CAÇADORES',
    title: 'A próxima aventura', highlight: 'já tem data.',
    description: 'Confira os próximos encontros, desafios e atividades preparados para a comunidade.',
    cta: 'VER EVENTOS', target: 'eventos'
  },
  {
    id: 'ranking', tab: 'RANKING', eyebrow: 'DESTAQUES DO RANKING',
    title: 'Quem lidera entre', highlight: 'os caçadores?',
    description: 'Veja quem está se destacando e acompanhe a evolução dos melhores caçadores.',
    cta: 'VER RANKING', target: 'ranking'
  }
];

const stories = [
  { tag: 'RÁDIO', title: 'Trilha sonora para evoluir', text: 'Entre no clima da sua próxima jornada.', icon: AudioLines, tone: 'violet' },
  { tag: 'CLÃS', title: 'Encontre seu grupo', text: 'Conheça outros caçadores da comunidade.', icon: Users, tone: 'blue' },
  { tag: 'EVENTOS', title: 'O calendário da guilda', text: 'Desafios e encontros em preparação.', icon: CalendarDays, tone: 'rose' }
];

const forums = [
  { name: 'Estratégias & builds', desc: 'Compartilhe suas melhores combinações', icon: Swords, tone: 'violet', tag: 'GUIAS' },
  { name: 'Dúvidas de evolução', desc: 'Peça ajuda para sua próxima etapa', icon: Sparkles, tone: 'blue', tag: 'AJUDA' },
  { name: 'Clãs e recrutamento', desc: 'Encontre aliados para sua jornada', icon: Shield, tone: 'rose', tag: 'GUILDA' },
  { name: 'Drops & equipamentos', desc: 'Mostre suas descobertas e itens', icon: Crown, tone: 'gold', tag: 'ITENS' },
  { name: 'Bate-papo dos caçadores', desc: 'Converse sobre o jogo e a comunidade', icon: MessageCircle, tone: 'cyan', tag: 'GERAL' },
  { name: 'Sugestões para a rádio', desc: 'Peça músicas e envie ideias', icon: Disc3, tone: 'violet', tag: 'RÁDIO' }
];

const clans = [
  { name: 'Ordem Violeta', desc: 'Exploradores · recrutamento', mark: 'OV', tone: 'violet' },
  { name: 'Vigias do Eclipse', desc: 'Caçadores · comunidade', mark: 'VE', tone: 'blue' },
  { name: 'Legião do Portal', desc: 'Aventureiros · comunidade', mark: 'LP', tone: 'rose' }
];

const events = [
  { date: 'EM BREVE', title: 'Caçada comunitária', desc: 'Desafios entre caçadores' },
  { date: 'EM BREVE', title: 'Encontro da guilda', desc: 'Conheça outros jogadores' },
  { date: 'EM BREVE', title: 'Noite da rádio', desc: 'Música e pedidos ao vivo' }
];

const hunters = [
  { name: 'SombraPrimordial', role: 'Assassino', level: '100', initials: 'SP' },
  { name: 'ArcanjoRoxo', role: 'Mago', level: '98', initials: 'AR' },
  { name: 'LoboDoAbismo', role: 'Guerreiro', level: '96', initials: 'LA' }
];

function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(72);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [featurePaused, setFeaturePaused] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function togglePlayback() {
    if (!streamUrl) {
      setToast('A transmissão ainda não foi configurada. Em breve você poderá ouvir a Leveling Radio por aqui.');
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setToast('Não foi possível iniciar a transmissão. Verifique o endereço do stream.');
    }
  }

  useEffect(() => {
    if (featurePaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % featureSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [activeSlide, featurePaused]);

  const comingSoon = (feature) => setToast(feature + ': recurso planejado para uma próxima etapa.');
  const activeFeature = featureSlides[activeSlide];
  const changeFeatureSlide = (direction) => {
    setActiveSlide((current) => (current + direction + featureSlides.length) % featureSlides.length);
  };
  const openActiveFeature = () => {
    if (!activeFeature.target) {
      comingSoon('Página de novidades');
      return;
    }
    document.getElementById(activeFeature.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-shell">
      <header className="topbar-wrap">
        <div className="topbar">
          <a className="brand" href="#inicio" aria-label="Leveling Radio — início">
            <span className="brand-mark"><AudioLines size={22} /></span>
            <span className="brand-copy"><b>LEVELING<span> RADIO</span></b><small>O CHAMADO DOS CAÇADORES</small></span>
          </a>
          <button className="icon-button mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
            <a href="#radio" onClick={() => setMenuOpen(false)}>Rádio</a>
            <a href="#ranking" onClick={() => setMenuOpen(false)}>Ranking</a>
            <a href="#comunidade" onClick={() => setMenuOpen(false)}>Comunidade</a>
            <a href="#noticias" onClick={() => setMenuOpen(false)}>Notícias</a>
          </nav>
          <div className="top-actions">
            <button className="icon-button search-btn" onClick={() => comingSoon('Busca')} aria-label="Buscar"><Search size={18} /></button>
            <button className="icon-button notification-btn" onClick={() => comingSoon('Notificações')} aria-label="Notificações"><Bell size={18} /><i /></button>
            <button className="user-pill" onClick={() => comingSoon('Login e cadastro')}>
              <span className="user-avatar">LR</span><span><b>Caçador</b><small>Visitante</small></span>
            </button>
            <button className="login-btn" onClick={() => comingSoon('Login e cadastro')}><LogIn size={15} /> Entrar</button>
          </div>
        </div>
      </header>

      <main id="inicio" className="dashboard">
        <div className="dashboard-grid">
          <div className="main-column">
            <section className="featured-panel" id="noticias">
              <img className="featured-image" src="/leveling-portal.webp" alt="Arte em pixel art de um caçador diante de uma fortaleza e portal violeta" />
              <div className="featured-scrim" />
              <div className="featured-topline"><span className="feature-label"><i /> DESTAQUE DA COMUNIDADE</span><span className="feature-edition">LEVELING RADIO <b>{String(activeSlide + 1).padStart(2, '0')}</b></span></div>
              <div
                className="featured-copy"
                onMouseEnter={() => setFeaturePaused(true)}
                onMouseLeave={() => setFeaturePaused(false)}
                onFocusCapture={() => setFeaturePaused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setFeaturePaused(false);
                }}
              >
                <div className="feature-slide-meta">
                  <span className="featured-kicker">{activeFeature.eyebrow}</span>
                  <div className="feature-slide-controls">
                    <button type="button" onClick={() => changeFeatureSlide(-1)} aria-label="Destaque anterior"><ChevronLeft size={14} /></button>
                    <span>{String(activeSlide + 1).padStart(2, '0')} / 03</span>
                    <button type="button" onClick={() => changeFeatureSlide(1)} aria-label="Próximo destaque"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="feature-slide-body" key={activeFeature.id} aria-live="polite">
                  <h1>{activeFeature.title}<br /><em>{activeFeature.highlight}</em></h1>
                  <p>{activeFeature.description}</p>
                  <button className="feature-cta" onClick={openActiveFeature}>{activeFeature.cta} <ArrowRight size={16} /></button>
                </div>
                <div className="feature-slide-tabs" role="group" aria-label="Escolher destaque">
                  {featureSlides.map((slide, index) => (
                    <button
                      type="button"
                      key={slide.id}
                      className={activeSlide === index ? 'active' : ''}
                      aria-pressed={activeSlide === index}
                      onClick={() => setActiveSlide(index)}
                    >{slide.tab}</button>
                  ))}
                </div>
              </div>
              <div className="feature-bottom"><span><i className="live-dot" /> PORTAL DA COMUNIDADE</span><span>PIXEL FANTASY · ROXO / AZUL</span></div>
              <div className="story-rail">
                {stories.map((story) => {
                  const Icon = story.icon;
                  return <button className="story-card" key={story.title} onClick={() => comingSoon(story.title)}>
                    <span className={'story-icon ' + story.tone}><Icon size={20} /></span>
                    <span className="story-content"><small>{story.tag}</small><b>{story.title}</b><em>{story.text}</em></span>
                    <ChevronRight size={15} className="story-arrow" />
                  </button>;
                })}
              </div>
            </section>

            <section className="forums-section" id="comunidade">
              <div className="section-heading">
                <div><span className="section-kicker">CONVERSE · COMPARTILHE · EVOLUA</span><h2>FÓRUNS <em>POPULARES</em></h2></div>
                <button className="text-link" onClick={() => comingSoon('Todos os fóruns')}>VER COMUNIDADE <ArrowUpRight size={15} /></button>
              </div>
              <div className="forum-grid">
                {forums.map((forum) => {
                  const Icon = forum.icon;
                  return <button className="forum-card" key={forum.name} onClick={() => comingSoon(forum.name)}>
                    <span className={'forum-icon ' + forum.tone}><Icon size={20} /></span>
                    <span className="forum-copy"><b>{forum.name}</b><small>{forum.desc}</small></span>
                    <span className="forum-tag">{forum.tag}</span>
                    <ArrowUpRight size={15} className="forum-arrow" />
                  </button>;
                })}
              </div>
            </section>

            <section className="ranking-section" id="ranking">
              <div className="section-heading">
                <div><span className="section-kicker">OS NOMES QUE INSPIRAM</span><h2>HALL DOS <em>CAÇADORES</em></h2></div>
                <button className="text-link" onClick={() => comingSoon('Ranking completo')}>RANKING COMPLETO <ArrowUpRight size={15} /></button>
              </div>
              <div className="hunter-list">
                {hunters.map((hunter, index) => <div className="hunter-item" key={hunter.name}>
                  <span className={'hunter-position ' + (!index ? 'first' : '')}>{String(index + 1).padStart(2, '0')}</span>
                  <span className="hunter-avatar">{hunter.initials}</span>
                  <span className="hunter-details"><b>{hunter.name}</b><small>{hunter.role}</small></span>
                  <span className="hunter-level">NV. {hunter.level}</span>
                </div>)}
                <div className="ranking-note">Dados demonstrativos · integração com o jogo ainda não configurada</div>
              </div>
            </section>
          </div>

          <aside className="sidebar-column">
            <section className="widget clans-widget">
              <div className="widget-heading"><div><h2>Clãs</h2><span className="widget-count">COMUNIDADE</span></div><button className="round-arrow" onClick={() => comingSoon('Clãs')} aria-label="Ver clãs"><ArrowUpRight size={16} /></button></div>
              <div className="clan-list">
                {clans.map((clan) => <div className="clan-row" key={clan.name}>
                  <span className={'clan-crest ' + clan.tone}>{clan.mark}</span>
                  <span className="clan-info"><b>{clan.name}</b><small>{clan.desc}</small></span>
                  <button onClick={() => comingSoon('Clãs')}>VER <ChevronRight size={13} /></button>
                </div>)}
              </div>
              <div className="widget-footnote">Grupos ilustrativos · sistema de clãs em planejamento</div>
            </section>

            <section className="widget events-widget" id="eventos">
              <div className="widget-heading"><div><h2>Próximos eventos</h2><span className="widget-count">AGENDA DA GUILDA</span></div><button className="round-arrow" onClick={() => comingSoon('Calendário de eventos')} aria-label="Ver eventos"><ArrowUpRight size={16} /></button></div>
              <div className="event-list">
                {events.map((event) => <button className="event-row" key={event.title} onClick={() => comingSoon(event.title)}>
                  <span className="event-date"><CalendarDays size={16} /><small>BREVE</small></span>
                  <span className="event-info"><b>{event.title}</b><small>{event.desc}</small></span>
                  <ChevronRight size={15} className="event-arrow" />
                </button>)}
              </div>
            </section>

            <section className="widget radio-widget" id="radio">
              <div className="widget-heading"><div><h2>Leveling Radio</h2><span className="widget-count"><i className="offline-dot" /> {playing ? 'TRANSMITINDO' : 'AGUARDANDO STREAM'}</span></div><span className="radio-mark"><AudioLines size={18} /></span></div>
              <div className="radio-now">
                <div className="radio-cover"><img src="/leveling-portal.webp" alt="" /><span><AudioLines size={22} /></span></div>
                <div className="radio-track"><b>{playing ? 'Leveling Radio · Ao vivo' : 'A trilha da sua evolução'}</b><small>{streamUrl ? 'Transmissão online' : 'Servidor de rádio ainda não conectado'}</small><div className="radio-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
              </div>
              <div className="radio-actions"><button className="radio-play" onClick={togglePlayback} aria-label={playing ? 'Pausar rádio' : 'Tocar rádio'}>{playing ? 'Ⅱ' : <Play size={16} fill="currentColor" />}</button><span className="radio-status">{playing ? 'AO VIVO' : 'OFFLINE'}</span><span className="radio-listeners"><Headphones size={14} /> — ouvintes</span></div>
              <audio ref={audioRef} src={streamUrl || undefined} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
              <div className="radio-volume"><button className="icon-button" onClick={() => setMuted(!muted)} aria-label="Alternar áudio">{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button><input aria-label="Volume da rádio" type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} /></div>
            </section>

            <section className="widget guild-callout">
              <span className="callout-icon"><Gamepad2 size={21} /></span>
              <div><b>Seu próximo nível começa com a comunidade.</b><small>Crie seu perfil e participe das conversas.</small></div>
              <button onClick={() => comingSoon('Cadastro de caçador')}>ENTRAR <ArrowRight size={14} /></button>
            </section>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <a className="brand" href="#inicio"><span className="brand-mark"><AudioLines size={20} /></span><span className="brand-copy"><b>LEVELING<span> RADIO</span></b><small>O CHAMADO DOS CAÇADORES</small></span></a>
        <p>Projeto comunitário independente, feito por fãs para fãs. Não afiliado aos criadores ou operadores de Leveling Idle 2D.</p>
        <span className="copyright">© 2026 LEVELING RADIO · TODOS OS DIREITOS RESERVADOS</span>
      </footer>

      <div className="bottom-player">
        <div className="mini-cover"><AudioLines size={19} /></div>
        <div className="mini-track"><b>LEVELING RADIO</b><span>{playing ? 'Transmissão ao vivo' : 'Sua trilha sonora começa aqui'}</span></div>
        <span className="mini-status"><i className={playing ? 'on-air' : ''} /> {playing ? 'ON AIR' : 'OFFLINE'}</span>
        <button className="mini-play" onClick={togglePlayback} aria-label="Tocar rádio">{playing ? 'Ⅱ' : <Play size={16} fill="currentColor" />}</button>
      </div>
      {toast && <div className="toast"><CircleHelp size={17} />{toast}<button onClick={() => setToast('')} aria-label="Fechar aviso"><X size={15} /></button></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
