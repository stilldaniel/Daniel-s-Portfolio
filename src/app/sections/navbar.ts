import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { ConnectService } from '../connect.service';
import { ThemeService } from '../theme.service';
import { GlassDirective } from '../glass.directive';
import { profile, testimonials } from '../portfolio.data';

@Component({
  selector: 'app-navbar',
  imports: [GlassDirective],
  template: `
    <header [class.scrolled]="scrolled()">
      <div class="container">
      <div class="bar">
        <!-- The glass lives on its own layer: an element with backdrop-filter stops its children
             (like the phone menu) from blurring the page behind it. -->
        <span class="bar-glass" appGlass aria-hidden="true"></span>
        <a href="#about" class="brand" (click)="menuOpen.set(false)">
          <!-- Same "<O/D>" monogram as public/favicon.svg. -->
          <svg class="logo" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#0b1120" />
            <g fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="#3b82f6" d="M11 27 7.5 32 11 37M34.3 24 31 40M52.5 27 56 32 52.5 37" />
              <circle stroke="#fff" cx="21.5" cy="32" r="6.2" />
              <path stroke="#fff" d="M38 25.8H41.8A6.2 6.2 0 0 1 41.8 38.2H38Z" />
            </g>
          </svg>
          <span>
            <strong>{{ profile.name.toUpperCase() }}</strong>
            <small>{{ profile.shortRole }}</small>
          </span>
        </a>

        <nav [class.open]="menuOpen()">
          @for (link of links; track link.id) {
            <a [href]="'#' + link.id" [class.active]="active() === link.id" (click)="menuOpen.set(false)">
              {{ link.label }}
            </a>
          }
          <button class="btn btn-primary mobile-cta" (click)="menuOpen.set(false); connect.open()">Get in Touch →</button>
        </nav>

        <!-- Moon switches to dark mode; sun switches back to light. -->
        <button
          class="theme-toggle"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          [attr.title]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          @if (theme.theme() === 'dark') {
            <svg viewBox="0 0 24 24" class="ico sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          } @else {
            <svg viewBox="0 0 24 24" class="ico moon"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>
          }
        </button>

        <button class="btn btn-primary desktop-cta" (click)="connect.open()"><svg viewBox="0 0 24 24" class="ico"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg> Get in Touch <svg viewBox="0 0 24 24" class="ico"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>

        <button class="burger" [class.open]="menuOpen()" (click)="menuOpen.set(!menuOpen())" aria-label="Toggle menu">
          <span></span><span></span>
        </button>
      </div>
      </div>
    </header>
  `,
  styles: `
    /* A floating glass capsule; the page scrolls underneath it. */
    header { position: fixed; inset: 0 0 auto; z-index: 50; padding: 12px 0; pointer-events: none; }
    .bar {
      position: relative; isolation: isolate; pointer-events: auto;
      display: flex; align-items: center; gap: 24px; padding: 8px 8px 8px 12px; border-radius: 28px;
    }
    .bar-glass { position: absolute; inset: 0; z-index: -1; border-radius: inherit; transition: background 0.3s; }
    header.scrolled .bar-glass { background: var(--lg-tint-strong); }
    .brand { margin-right: auto; }
    .brand { display: flex; align-items: center; gap: 10px; line-height: 1.2; }
    .brand strong { display: block; font-size: 0.95rem; white-space: nowrap; }
    .brand small { color: var(--muted); font-size: 0.75rem; }
    .logo { display: block; width: 40px; height: 40px; flex-shrink: 0; border-radius: 10px; }
    /* In dark mode the navy tile would melt into the navbar, so give it a hairline edge. */
    :host-context([data-theme='dark']) .logo { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12); }
    nav { display: flex; gap: 2px; }
    nav a { padding: 8px 16px; border-radius: 999px; font-size: 0.875rem; color: var(--text-2); transition: color 0.2s, background 0.2s; }
    nav a:hover { color: var(--accent); }
    /* The active link is a small glass "lens" inside the capsule. */
    nav a.active {
      background: var(--lg-tint-strong); color: var(--accent);
      box-shadow: inset 0 1px 0.5px var(--lg-edge), inset 0 0 0 1px var(--lg-edge-low), 0 2px 8px -3px rgba(15, 23, 42, 0.2);
    }
    nav a.active::before { content: '•'; margin-right: 6px; }
    .desktop-cta { padding: 12px 22px; gap: 8px; }
    .ico { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .theme-toggle {
      display: grid; place-items: center; width: 44px; height: 44px; margin-right: -12px; flex-shrink: 0;
      border-radius: 50%; border: none; background: var(--lg-tint-strong); color: var(--text-2);
      box-shadow: inset 0 1px 0.5px var(--lg-edge), inset 0 0 0 1px var(--lg-edge-low), 0 2px 8px -3px rgba(15, 23, 42, 0.2);
      transition: color 0.2s, transform 0.2s;
    }
    .theme-toggle:hover { color: var(--accent); transform: rotate(-12deg); }
    .theme-toggle:active, .desktop-cta:active { transform: scale(0.94); }
    .theme-toggle:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
    .theme-toggle .ico { width: 20px; height: 20px; animation: swap 0.35s ease; }
    .theme-toggle .sun { color: #fbbf24; }
    @keyframes swap { from { opacity: 0; transform: rotate(-90deg) scale(0.6); } }
    .mobile-cta, .burger { display: none; }

    @media (max-width: 860px) {
      .bar { gap: 8px; padding: 6px 6px 6px 8px; border-radius: 24px; }
      .brand strong { font-size: 0.85rem; letter-spacing: -0.01em; }
      .theme-toggle { margin-right: 0; width: 40px; height: 40px; }
      .desktop-cta { display: none; }
      .burger { display: flex; flex-direction: column; gap: 6px; padding: 10px; }
      .burger span { width: 22px; height: 2px; background: var(--text); transition: transform 0.3s; }
      .burger.open span:first-child { transform: translateY(4px) rotate(45deg); }
      .burger.open span:last-child { transform: translateY(-4px) rotate(-45deg); }
      /* Phone menu: a separate glass panel under the capsule. */
      nav {
        position: absolute; top: calc(100% + 10px); left: 0; right: 0;
        flex-direction: column; gap: 2px; border-radius: 24px; padding: 10px;
        /* A little more opaque than other glass so the links stay readable over the photo. */
        background: color-mix(in srgb, var(--surface) 82%, transparent);
        -webkit-backdrop-filter: blur(24px) saturate(180%); backdrop-filter: blur(24px) saturate(180%);
        border: 1px solid var(--lg-edge-low);
        box-shadow: inset 0 1px 0.5px var(--lg-edge), var(--lg-shadow);
        opacity: 0; pointer-events: none; transform: translateY(-8px) scale(0.98); transform-origin: top;
        transition: opacity 0.25s, transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
      }
      nav.open { opacity: 1; pointer-events: auto; transform: none; }
      nav a { padding: 12px 16px; }
      .mobile-cta { display: inline-flex; justify-content: center; margin-top: 8px; color: #fff !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      .theme-toggle .ico { animation: none; }
      .theme-toggle:hover { transform: none; }
    }
  `,
})
export class Navbar implements AfterViewInit, OnDestroy {
  protected readonly connect = inject(ConnectService);
  protected readonly theme = inject(ThemeService);
  protected readonly profile = profile;
  protected readonly links = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
  ].filter(l => l.id !== 'testimonials' || testimonials.length > 0);
  protected readonly active = signal('about');
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  private observer?: IntersectionObserver;
  private readonly onScroll = () => this.scrolled.set(window.scrollY > 10);

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    // Highlight the section that crosses the middle of the viewport.
    this.observer = new IntersectionObserver(
      entries => entries.filter(e => e.isIntersecting).forEach(e => this.active.set(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    this.links.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    this.observer?.disconnect();
  }
}
