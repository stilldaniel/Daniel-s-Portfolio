import { Component } from '@angular/core';
import { profile } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';
import { GlassDirective } from '../glass.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, GlassDirective],
  template: `
    <section id="contact">
      <div class="container">
        <div class="panel" appReveal>
          <span class="eyebrow">Let's work together</span>
          <h2>Have a project in mind?</h2>
          <p>Tell me about your idea and I'll get back to you within 24 hours.</p>
          <div class="actions">
            <a [href]="'mailto:' + profile.email" class="btn btn-light">
              <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
              <span>{{ profile.email }}</span>
            </a>
            @if (profile.cvUrl) {
              <a [href]="profile.cvUrl" [attr.download]="profile.cvFileName" class="btn btn-ghost" appGlass>
                <svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                Download Resume
              </a>
            }
          </div>
          <div class="socials">
            @for (s of profile.socials; track s.label) {
              <a [href]="s.url" target="_blank" rel="noopener">{{ s.label }} ↗</a>
            }
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="container foot">
        <span>© {{ year }} {{ profile.fullName }}. All rights reserved.</span>
        <a href="#about">Back to top ↑</a>
      </div>
    </footer>
  `,
  styles: `
    .panel {
      text-align: center; padding: 72px 32px; border-radius: 32px; color: #fff;
      background: var(--panel);
      box-shadow: var(--shadow-lg);
    }
    .eyebrow { color: rgba(255,255,255,0.8); }
    h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
    p { opacity: 0.9; margin: 14px auto 32px; max-width: 480px; font-size: 1.1rem; }
    .actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }
    .actions .btn { justify-content: center; padding: 14px 26px; }
    .actions svg { width: 18px; height: 18px; flex-shrink: 0; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .btn-light { background: #fff; color: #2563eb; }
    .actions .btn { min-width: 0; max-width: 100%; }
    .btn-light span { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    /* Glass button on the blue panel: white-tinted so it reads in both themes. */
    .btn-ghost { background: rgba(255, 255, 255, 0.16); border-color: rgba(255, 255, 255, 0.35); color: #fff; }
    .btn-ghost:hover { background: rgba(255, 255, 255, 0.26); }
    .actions .btn:active { transform: scale(0.96); }
    .socials { display: flex; justify-content: center; flex-wrap: wrap; gap: 24px; margin-top: 32px; }
    .socials a { opacity: 0.85; font-weight: 500; }
    .socials a:hover { opacity: 1; }
    footer { border-top: 1px solid var(--border); padding: 28px 0; }
    .foot { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; color: var(--muted); font-size: 0.9rem; }
    .foot a:hover { color: var(--accent); }

    @media (max-width: 560px) {
      .panel { padding: 56px 20px; border-radius: 28px; }
      p { font-size: 1rem; }
      .actions { flex-direction: column; align-items: stretch; }
      .actions .btn { padding: 14px 16px; font-size: 0.9rem; }
    }
    /* Narrow phones: the full email address needs a little more room to stay on one line. */
    @media (max-width: 380px) {
      .panel { padding: 48px 16px; }
      .actions .btn { padding: 13px 12px; gap: 6px; font-size: 0.8rem; }
      .actions svg { width: 16px; height: 16px; }
    }
  `,
})
export class Contact {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
}
