import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AudioLines, CalendarDays, ChevronRight, CircleHelp, Crown,
  Disc3, Flame, Headphones, LogIn, Menu, MessageCircle, Mic2, Play,
  Radio, Search, Shield, Sparkles, Swords, Trophy, Users, Volume2,
  VolumeX, X, Zap
} from 'lucide-react';
import './styles.css';

const streamUrl = import.meta.env.VITE_RADIO_STREAM_URL || '';

const news = [
  { tag: 'COMUNIDADE', title: 'O portal dos caçadores está despertando', text: 'Prepare seu perfil, reúna seu grupo e acompanhe as novidades da comunidade Leveling Idle.', art: 'portal', date: 'EM BREVE' },
  { tag: 'RÁDIO', title: 'Sua trilha sonora para cada dungeon', text: 'Uma programação para acompanhar suas sessões de evolução e exploração.', art: 'sound', date: 'EM BREVE' },
  { tag: 'EVENTOS', title: 'Primeiro chamado dos caçadores', text: 'Eventos, desafios comunitários e encontros especiais serão anunciados por aqui.', art: 'rune', date: 'EM BREVE' }
];

const hunters = [
  { name: 'SombraPrimordial', role: 'Assassino', level: '100', power: '2.840.500', initials: 'SP' },
  { name: 'ArcanjoRoxo', role: 'Mago', level: '98', power: '2.615.200', initials: 'AR' },
  { name: 'LoboDoAbismo', role: 'Guerreiro', level: '96', power: '2.408.900', initials: 'LA' },
  { name: 'FlechaAstral', role: 'Arqueiro', level: '94', power: '2.120.300', initials: 'FA' }
];

const classes = [
  { name: 'Guerreiro', desc: 'Força e resistência na linha de frente.', icon: Shield, tone: 'violet' },
  { name: 'Assassino', desc: 'Velocidade e precisão nas sombras.', icon: Flame, tone: 'blue' },
  { name: 'Mago', desc: 'Poder arcano para dominar o campo.', icon: Sparkles, tone: 'cyan' },
  { name: 'Arqueiro', desc: 'Ataques precisos a longa distância.', icon: Zap, tone: 'pink' },
  { name: 'Sacerdote', desc: 'Suporte e magia para proteger aliados.', icon: Crown, tone: 'gold' }
];

function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(72);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

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
      setToast('A transmissão ainda não foi configurada. O player está pronto para receber o endereço do stream.');
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

  const comingSoon = (feature) => setToast(feature + ': planejado para uma próxima etapa.');

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Leveling Radio — início">
          <span className="brand-mark"><AudioLines size={23} /></span>
          <span className="brand-copy"><b>LEVELING<span> RADIO</span></b><small>O CHAMADO DOS CAÇADORES</small></span>
        </a>
        <button className="icon-button mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['Início', 'Rádio', 'Ranking', 'Comunidade', 'Notícias'].map((label, i) => <a key={label} href={['#inicio', '#radio', '#ranking', '#comunidade', '#noticias'][i]} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button search-btn" onClick={() => comingSoon('Busca')} aria-label="Buscar"><Search size={18} /></button>
          <button className="login-btn" onClick={() => comingSoon('Login e cadastro')}><LogIn size={16} /> Entrar</button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="eyebrow"><i /> CENTRAL DA COMUNIDADE <i /></div>
            <h1>SUA JORNADA.<br /><em>SUA LENDA.</em></h1>
            <p className="hero-sub">A frequência dos caçadores. Música, comunidade e informação para quem nunca para de evoluir.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#radio"><Radio size={17} /> OUVIR A RÁDIO</a>
              <a className="secondary-btn" href="#comunidade"><Users size={17} /> EXPLORAR PORTAL</a>
            </div>
            <div className="hero-proof"><span><i className="live-dot" /> PORTAL EM CONSTRUÇÃO</span><b /> <span>FEITO PARA A COMUNIDADE</span></div>
          </div>
          <div className="hero-art" aria-label="Portal mágico abstrato">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="portal-ring"><div className="portal-core"><span>ᛟ</span></div></div>
            <span className="hero-rune rune-one">✧</span><span className="hero-rune rune-two">◇</span><span className="hero-rune rune-three">ᚷ</span>
            <div className="hero-caption"><span>01 / 05</span><b>O DESPERTAR COMEÇA AQUI</b></div>
          </div>
          <div className="hero-bottom-line"><span>LEVELING RADIO</span><span>EST. 2026</span><span>TRANSMITINDO PARA ALÉM DAS DUNGEONS</span></div>
        </section>

        <section className="ticker"><div className="ticker-label"><Activity size={14} /> TRANSMISSÃO</div><div className="ticker-text">A CENTRAL DOS CAÇADORES ESTÁ SENDO PREPARADA <b>✦</b> SUA PRÓXIMA JORNADA COMEÇA AQUI <b>✦</b> LEVELING RADIO</div></section>

        <section className="content-section" id="radio">
          <div className="section-heading"><div><span className="section-kicker">SINTONIZE SUA JORNADA</span><h2>RÁDIO <em>AO VIVO</em></h2></div><span className="section-index">01 — TRANSMISSÃO</span></div>
          <div className="radio-card">
            <div className="radio-visual"><div className="equalizer">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><div className="disc-wrap"><Disc3 size={92} strokeWidth={1} /><span className="disc-center"><AudioLines size={24} /></span></div><span className="visual-label">LR / FREQUÊNCIA 001</span></div>
            <div className="radio-info">
              <div className="live-label"><i className="live-dot" /> {playing ? 'AO VIVO' : 'PLAYER DA RÁDIO'}</div>
              <h3>{playing ? 'Leveling Radio' : 'A trilha da sua evolução'}</h3>
              <p className="track-name">{streamUrl ? 'Transmissão online' : 'Stream ainda não configurado'}</p>
              <p className="radio-description">{streamUrl ? 'Conecte-se à programação e acompanhe a comunidade.' : 'O player está pronto para receber o endereço do servidor de streaming.'}</p>
              <div className="player-controls">
                <button className="play-btn" onClick={togglePlayback} aria-label={playing ? 'Pausar rádio' : 'Tocar rádio'}>{playing ? 'Ⅱ' : <Play size={21} fill="currentColor" />}</button>
                <div className="player-meta"><b>{playing ? 'TRANSMITINDO AGORA' : 'LEVELING RADIO'}</b><span>{streamUrl ? 'Rádio online' : 'Aguardando configuração técnica'}</span></div>
                <div className="volume-control"><button className="icon-button" onClick={() => setMuted(!muted)} aria-label="Alternar áudio">{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button><input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} /></div>
              </div>
              <audio ref={audioRef} src={streamUrl || undefined} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
            </div>
            <div className="radio-side"><div><Headphones size={18} /><span>OUVINTES</span><b>—</b><small>contador será integrado</small></div><div><Mic2 size={18} /><span>NO COMANDO</span><b>AutoDJ</b><small>programação automática</small></div></div>
          </div>
        </section>

        <section className="content-section" id="noticias">
          <div className="section-heading"><div><span className="section-kicker">SINAIS DO MUNDO</span><h2>ÚLTIMAS <em>NOTÍCIAS</em></h2></div><button className="text-link" onClick={() => comingSoon('Central de notícias')}>VER TODAS <ChevronRight size={15} /></button></div>
          <div className="news-grid">{news.map((item, i) => <article className="news-card" key={item.title}><div className={'news-art ' + item.art}><span className="art-glyph">{['ᛟ', '♫', '✧'][i]}</span><span className="news-number">0{i + 1}</span></div><div className="news-body"><div className="news-meta"><span>{item.tag}</span><time>{item.date}</time></div><h3>{item.title}</h3><p>{item.text}</p><button className="read-more" onClick={() => comingSoon('Notícias')}>LER MAIS <ChevronRight size={14} /></button></div></article>)}</div>
        </section>

        <section className="content-section" id="ranking">
          <div className="section-heading"><div><span className="section-kicker">OS MAIS PODEROSOS</span><h2>HALL DOS <em>CAÇADORES</em></h2></div><button className="text-link" onClick={() => comingSoon('Ranking completo')}>RANKING COMPLETO <ChevronRight size={15} /></button></div>
          <div className="ranking-layout">
            <div className="ranking-intro"><div className="ranking-emblem"><Trophy size={38} /><span>LR</span></div><span className="section-kicker">SEU NOME PODE ESTAR AQUI</span><h3>Conquiste seu<br /><em>lugar na história.</em></h3><p>O ranking da comunidade reunirá os caçadores que mais se destacam em poder, evolução e conquistas.</p><button className="outline-btn" onClick={() => comingSoon('Vinculação de personagem')}>VINCULAR PERSONAGEM <ChevronRight size={15} /></button><small>* Dados demonstrativos — integração com o jogo ainda não configurada.</small></div>
            <div className="ranking-table"><div className="table-head"><span>POS.</span><span>CAÇADOR</span><span>CLASSE</span><span>NÍVEL</span><span>PODER</span></div>{hunters.map((h, i) => <div className="hunter-row" key={h.name}><span className={'position ' + (!i ? 'first' : '')}>{String(i + 1).padStart(2, '0')}</span><span className="hunter-name"><span className="avatar">{h.initials}</span><b>{h.name}</b></span><span className="hunter-class">{h.role}</span><span className="hunter-level">{h.level}</span><span className="hunter-power">{h.power}</span></div>)}</div>
          </div>
        </section>

        <section className="content-section" id="comunidade">
          <div className="section-heading"><div><span className="section-kicker">ESCOLHA SEU CAMINHO</span><h2>FORJE SUA <em>IDENTIDADE</em></h2></div><span className="section-index">CLASSES DO JOGO</span></div>
          <div className="class-grid">{classes.map((item, i) => { const Icon = item.icon; return <button className={'class-card ' + item.tone} key={item.name} onClick={() => comingSoon('Perfil de ' + item.name)}><span className="class-num">0{i + 1}</span><span className="class-icon"><Icon size={27} /></span><b>{item.name}</b><small>{item.desc}</small><span className="class-arrow"><ChevronRight size={16} /></span></button>; })}</div>
        </section>

        <section className="community-cta"><div className="cta-symbol"><Swords size={36} /></div><div><span className="section-kicker">A GUILDA ESTÁ SE FORMANDO</span><h2>NENHUM CAÇADOR <em>LUTA SOZINHO.</em></h2><p>Entre para a comunidade, compartilhe sua jornada e encontre aliados para a próxima dungeon.</p></div><button className="primary-btn" onClick={() => comingSoon('Comunidade e cadastro')}><Users size={17} /> ENTRAR NA COMUNIDADE</button></section>
      </main>

      <footer className="footer"><a className="brand" href="#inicio"><span className="brand-mark"><AudioLines size={22} /></span><span className="brand-copy"><b>LEVELING<span> RADIO</span></b><small>O CHAMADO DOS CAÇADORES</small></span></a><p>Projeto comunitário independente, feito por fãs para fãs. Não afiliado aos criadores ou operadores de Leveling Idle 2D.</p><div className="footer-links"><a href="#radio">Rádio</a><a href="#ranking">Ranking</a><a href="#comunidade">Comunidade</a><button onClick={() => comingSoon('Discord')}>Discord</button></div><span className="copyright">© 2026 LEVELING RADIO · TODOS OS DIREITOS RESERVADOS</span></footer>

      <div className="bottom-player"><div className="mini-cover"><AudioLines size={19} /></div><div className="mini-track"><b>LEVELING RADIO</b><span>{playing ? 'Transmissão ao vivo' : 'Sua trilha sonora começa aqui'}</span></div><span className="mini-status"><i /> {playing ? 'ON AIR' : 'OFFLINE'}</span><button className="mini-play" onClick={togglePlayback} aria-label="Tocar rádio">{playing ? 'Ⅱ' : <Play size={17} fill="currentColor" />}</button></div>
      {toast && <div className="toast"><CircleHelp size={17} />{toast}<button onClick={() => setToast('')} aria-label="Fechar aviso"><X size={15} /></button></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
