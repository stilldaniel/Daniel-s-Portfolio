import { Component, inject } from '@angular/core';
import { ConnectService } from '../connect.service';
import { CountUpDirective } from '../count-up.directive';
import { GlassDirective } from '../glass.directive';
import { clients, profile } from '../portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [CountUpDirective, GlassDirective],
  template: `
    <section id="about" class="hero">
      <div class="container grid">
        <div class="copy">
          <!-- Each part fades up in sequence on load; --d is its delay. -->
          <h1>
            <span class="line enter" style="--d: 0ms">{{ profile.headline.lead }}</span>
            <span class="line accent enter" style="--d: 120ms">{{ profile.headline.accent }}</span>
            <span class="line enter" style="--d: 240ms">{{ profile.headline.tail }}</span>
          </h1>
          <p class="tagline enter" style="--d: 380ms">{{ profile.tagline }}</p>
          <div class="actions enter" style="--d: 500ms">
            <button class="btn btn-primary" (click)="connect.open()">
              Let's Connect
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            @if (profile.cvUrl) {
              <a [href]="profile.cvUrl" [attr.download]="profile.cvFileName" class="btn btn-outline">
                <svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                Download CV
              </a>
            } @else {
              <a href="#projects" class="btn btn-outline">View Work</a>
            }
          </div>
          <div class="skills">
            @for (s of visibleSkills; track s; let i = $index) { <span class="chip enter" [style.--d]="620 + i * 60 + 'ms'">{{ s }}</span> }
            @if (hiddenCount > 0) { <span class="chip more enter" [style.--d]="620 + visibleSkills.length * 60 + 'ms'">+{{ hiddenCount }} more</span> }
          </div>
        </div>

        <div class="visual">
          <!-- Soft colour orbs behind the cards give the glass something to refract. -->
          <span class="orb orb-a" aria-hidden="true"></span>
          <span class="orb orb-b" aria-hidden="true"></span>
          <div class="photo enter" style="--d: 250ms">
            @if (profile.photo) {
              <img [src]="profile.photo" [alt]="profile.fullName" />
            } @else {
              <span class="initial">{{ profile.initial }}</span>
            }
            <div class="badge-bottom" appGlass>
              <span class="mini-logo">{{ profile.initial }}</span>
              <div><strong>{{ profile.badge.title }}</strong><small>{{ profile.badge.sub }}</small></div>
            </div>
          </div>

          <svg class="dashes enter" style="--d: 1100ms" viewBox="0 0 628 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80 C 90 70, 160 90, 230 150" />
            <path d="M180 500 C 250 490, 300 470, 340 430" />
          </svg>

          <div class="side">
            <div class="float projects-card enter" appGlass style="--d: 550ms">
              <small><span class="dot"></span>{{ profile.highlight.label }}</small>
              <strong class="big" [appCountUp]="profile.highlight.value"></strong>
              <b>{{ profile.highlight.title }}</b>
              <small>{{ profile.highlight.sub }}</small>
              <a href="#experience" class="go" aria-label="See experience">
                <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>

            <div class="float stack-card enter" appGlass style="--d: 700ms">
              <b class="title">Core Stack</b>
              <div class="pills">
                @for (t of profile.coreStack; track t) { <span class="chip">{{ t }}</span> }
              </div>
            </div>

            <div class="float metric-card enter" appGlass style="--d: 850ms">
              <strong class="big" [appCountUp]="profile.metric.value"></strong>
              <small>{{ profile.metric.label }}</small>
            </div>
          </div>

          <div class="ring enter" style="--d: 1000ms" aria-hidden="true">
            <svg class="ring-text" viewBox="0 0 100 100">
              <defs><path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#circle" textLength="236" lengthAdjust="spacing">{{ ringText }}</textPath></text>
            </svg>
            <span class="ring-core">
              <svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
            </span>
          </div>
        </div>
      </div>

      <div class="container clients">
        <p>Worked with teams at</p>
        <div class="logos">
          <!-- Two identical groups, each at least as wide as the strip, slide together so the loop never shows a gap. -->
          @for (group of [0, 1]; track group) {
            <div class="group" [attr.aria-hidden]="group === 1">
              @for (c of clients; track c) { <span>{{ c }}</span> }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      overflow-x: clip;
      padding-top: 150px;
      padding-bottom: 0;
      background:
        radial-gradient(520px 420px at 8% 30%, var(--glow-1), transparent 70%),
        radial-gradient(600px 500px at 95% 85%, var(--glow-2), transparent 70%);
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(0, 524px) minmax(0, 628px);
      justify-content: space-between;
      gap: 48px;
      align-items: center;
    }

    /* Copy */
    h1 { font-size: clamp(2.5rem, 5vw, 3.75rem); line-height: 1.15; font-weight: 800; letter-spacing: -0.02em; }
    h1 .line { display: block; }
    .accent { color: var(--accent); }
    .tagline { color: var(--text-3); font-size: 1.125rem; line-height: 1.625; margin: 32px 0 32px; max-width: 512px; }
    .actions { display: flex; flex-wrap: wrap; gap: 16px; }
    .actions .btn { padding: 15px 30px; font-size: 1rem; }
    .actions svg, .go svg, .ring-core svg {
      width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
    }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; max-width: 524px; }
    .skills .chip { padding: 8px 16px; font-size: 0.875rem; font-weight: 500; }
    .more { background: var(--surface-2); color: var(--muted); }

    /* Visual: positions are percentages of a 628×520 canvas so it scales down cleanly. */
    .visual { position: relative; height: 520px; }
    .photo {
      position: absolute; left: 0; top: 26px; width: 58%; height: 416px;
      border-radius: 32px; overflow: hidden; background: #0f172a;
      box-shadow: 0 30px 60px -25px rgba(15, 23, 42, 0.45);
    }
    .photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 15%; }
    .initial { position: absolute; inset: 0; display: grid; place-items: center; font-size: 8rem; font-weight: 800; color: rgba(255,255,255,0.12); }
    .badge-bottom {
      position: absolute; left: 20px; right: 20px; bottom: 20px;
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      border-radius: 18px;
    }
    /* The photo is dark in both themes, so this glass uses a dark tint with white text (as iOS does over dark content). */
    .badge-bottom.glass { background: rgba(15, 23, 42, 0.38); border-color: rgba(255, 255, 255, 0.18); color: #fff; }
    .badge-bottom.glass small { color: rgba(255, 255, 255, 0.75); }
    .badge-bottom > div { min-width: 0; }
    .badge-bottom strong { display: block; font-size: 0.875rem; font-weight: 600; line-height: 1.3; }
    .badge-bottom small { display: block; color: var(--muted); font-size: 0.75rem; }
    .mini-logo { width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; background: var(--accent); color: #fff; display: grid; place-items: center; font-weight: 700; }

    .dashes { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
    .dashes path { fill: none; stroke: var(--faint); stroke-width: 1.5; stroke-dasharray: 4 6; opacity: 0.7; }

    .side { position: absolute; z-index: 2; left: 60%; top: 42px; width: 40%; display: flex; flex-direction: column; gap: 20px; }
    .float { position: relative; z-index: 2; border-radius: 28px; padding: 20px; }
    .float small { display: block; color: var(--muted); font-size: 0.8rem; }
    .float b { display: block; font-size: 0.95rem; font-weight: 600; }
    .big { display: block; font-size: 1.875rem; font-weight: 800; line-height: 1.2; margin: 4px 0 6px; }
    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #34d399; margin-right: 8px; }

    .projects-card { width: 95%; padding-bottom: 40px; background: var(--lg-blue); }
    .go {
      position: absolute; right: 14px; bottom: 12px; display: grid; place-items: center;
      width: 32px; height: 22px; border-radius: 999px; background: var(--lg-tint-strong); color: var(--text);
      box-shadow: inset 0 1px 0.5px var(--lg-edge), inset 0 0 0 1px var(--lg-edge-low);
    }
    .go svg { width: 14px; height: 14px; }

    .stack-card { width: 95%; margin-left: 5%; }
    .stack-card .chip { background: var(--lg-tint-strong); border-color: var(--border); }
    .stack-card .title { font-size: 1.125rem; font-weight: 700; }
    .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .pills .chip { font-size: 0.75rem; padding: 4px 12px; }

    .metric-card {
      /* Sits under the side cards, reaching left over the photo (45% of the side column ≈ 18% of the visual). */
      width: 135%; margin-left: -45%; min-height: 70px;
      display: flex; align-items: center; gap: 14px; padding: 14px 22px;
      border-radius: 18px;
    }
    .metric-card .big { margin: 0; }
    .metric-card small { font-size: 0.875rem; color: var(--text-3); line-height: 1.35; }

    .ring { position: absolute; left: 91%; top: -10px; width: 76px; height: 76px; z-index: 3; }
    .ring-text { position: absolute; inset: 0; animation: spin 18s linear infinite; }
    .ring-text text { font-size: 8.5px; font-weight: 600; fill: var(--accent); }
    .ring-core {
      position: absolute; inset: 20px; border-radius: 50%; display: grid; place-items: center;
      background: var(--accent); color: #fff; box-shadow: 0 6px 16px -4px rgba(59,130,246,0.6);
    }

    /* Clients */
    .clients { margin-top: 64px; padding: 40px 0 72px; border-top: 1px solid var(--border-soft); text-align: center; }
    .clients p { color: var(--muted); font-size: 0.875rem; margin-bottom: 24px; }
    .logos { display: flex; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
    .group {
      display: flex; flex-shrink: 0; min-width: 100%; justify-content: space-around;
      animation: scroll 24s linear infinite;
    }
    .logos span { padding: 0 32px; font-size: 1.125rem; font-weight: 700; color: var(--faint); letter-spacing: 0.02em; transition: color 0.2s; }
    .logos span:hover { color: var(--text); }

    .orb {
      position: absolute; z-index: 0; border-radius: 50%; pointer-events: none;
      filter: blur(28px); opacity: 0.6; animation: drift 14s ease-in-out infinite alternate;
    }
    :host-context([data-theme='dark']) .orb { opacity: 0.4; }
    .orb-a { width: 280px; height: 280px; right: -30px; top: 10px; background: radial-gradient(circle at 35% 35%, #60a5fa, #3b82f6 45%, transparent 70%); }
    .orb-b { width: 240px; height: 240px; left: 28%; bottom: -20px; background: radial-gradient(circle at 60% 40%, #c4b5fd, #8b5cf6 45%, transparent 70%); animation-delay: -7s; }
    @keyframes drift { to { transform: translate(-36px, 28px) scale(1.1); } }
    @keyframes scroll { to { transform: translateX(-100%); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes bob { 50% { transform: translateY(-8px); } }
    /* Load-in sequence. Uses the translate property so it doesn't fight the cards' transform-based bob. */
    @keyframes enter { from { opacity: 0; translate: 0 24px; } }
    .hero .enter { animation: enter 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms) both; }
    .hero .projects-card.enter {
      animation: enter 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d) both, bob 6s ease-in-out calc(var(--d) + 0.8s) infinite;
    }
    .hero .metric-card.enter {
      animation: enter 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d) both, bob 6s ease-in-out calc(var(--d) + 2s) infinite;
    }

    /* Narrow laptops and tablets: the visual is narrower, so give the side column more width,
       put the stack chips two per row, and size the side cards to match the photo's height.
       The metric card then sits just below them. */
    @media (max-width: 1240px) {
      .visual { height: 570px; }
      .photo { width: 54%; }
      .badge-bottom { left: 14px; right: 14px; bottom: 14px; padding: 10px 12px; gap: 10px; }
      .mini-logo { width: 34px; height: 34px; }
      .side { left: 57%; top: 26px; width: 43%; height: 416px; gap: 16px; }
      .projects-card, .stack-card { width: 100%; margin-left: 0; }
      .projects-card { padding: 18px 18px 40px; }
      .stack-card { flex: 1; padding: 18px; }
      .pills { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .pills .chip { text-align: center; padding: 5px 6px; }
      .metric-card { position: absolute; top: calc(100% + 20px); left: -65%; width: 165%; margin: 0; }
    }
    @media (max-width: 960px) {
      .grid { grid-template-columns: 1fr; gap: 56px; }
      .visual { width: 100%; max-width: 628px; margin: 0 auto; }
      .ring { left: auto; right: 0; }
    }
    /* Phones: stack everything. Photo full width, then the two cards side by side, then the metric. */
    @media (max-width: 560px) {
      .hero { padding-top: 110px; }
      .actions .btn { padding: 13px 22px; }
      .visual { height: auto; display: flex; flex-direction: column; gap: 12px; animation: none; }
      .photo { position: relative; top: 0; width: 100%; height: 420px; }
      .badge-bottom { left: 12px; right: 12px; bottom: 12px; padding: 10px 12px; }
      .side { position: static; width: 100%; height: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .float { padding: 16px; border-radius: 20px; }
      /* No floating bob once the cards are stacked on phones. */
      .hero .projects-card.enter, .hero .metric-card.enter { animation: enter 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d) both; }
      .projects-card, .stack-card { width: auto; margin: 0; }
      .projects-card { padding-bottom: 40px; }
      .stack-card .title { font-size: 1rem; }
      .pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
      .pills .chip { padding: 3px 9px; font-size: 0.72rem; }
      .big { font-size: 1.6rem; }
      .metric-card { position: relative; top: auto; left: auto; grid-column: 1 / -1; width: auto; margin: 0; padding: 14px 18px; }
      .ring, .dashes { display: none; }
      .clients { margin-top: 48px; }
      .logos span { font-size: 1rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .ring-text, .group, .orb, .hero .enter, .hero .projects-card.enter, .hero .metric-card.enter { animation: none; }
    }
  `,
})
export class Hero {
  protected readonly connect = inject(ConnectService);
  protected readonly profile = profile;
  protected readonly clients = clients;
  protected readonly visibleSkills = profile.skills.slice(0, 5);
  protected readonly hiddenCount = profile.skills.length - 5;
  protected readonly ringText = `${profile.role.toUpperCase()} • `;
}
