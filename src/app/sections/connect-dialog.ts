import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConnectService } from '../connect.service';
import { GlassDirective } from '../glass.directive';
import { contacts, profile } from '../portfolio.data';

@Component({
  selector: 'app-connect-dialog',
  imports: [GlassDirective],
  host: { '(document:keydown.escape)': 'connect.close()' },
  template: `
    @if (connect.isOpen()) {
      <div class="backdrop" (click)="connect.close()">
        <!-- The dimmed, blurred page is a separate layer so the glass panel can blur it too. -->
        <div class="scrim"></div>
        <div class="dialog" appGlass role="dialog" aria-modal="true" aria-labelledby="connect-title" (click)="$event.stopPropagation()">
          <button #closeBtn class="close" (click)="connect.close()" aria-label="Close">✕</button>
          <h2 id="connect-title">Let's Connect</h2>
          <p class="intro">Choose how you'd like to reach me. {{ profile.replyNote }}</p>

          <div class="options">
            @for (c of contacts; track c.label) {
              <a class="option" [href]="c.url" target="_blank" rel="noopener" [style.background]="c.color">
                <span class="icon" [innerHTML]="icons[c.icon]"></span>
                <span class="text">
                  <strong>{{ c.label }}</strong>
                  <small>{{ c.sub }}</small>
                </span>
                <span class="arrow">→</span>
              </a>
            }
          </div>

          @if (profile.phone) {
            <p class="call">Prefer to call? <a [href]="'tel:' + phoneHref">{{ profile.phone }}</a></p>
          }
        </div>
      </div>
    }
  `,
  styles: `
    .backdrop {
      position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 16px;
    }
    .scrim {
      position: absolute; inset: 0; background: rgba(15, 23, 42, 0.3);
      -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); animation: fade 0.2s ease;
    }
    .dialog {
      position: relative; width: 100%; max-width: 380px; padding: 28px 24px 22px;
      background: var(--lg-tint-strong); border-radius: 28px;
      animation: pop 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2);
    }
    .close {
      position: absolute; top: 18px; right: 18px; width: 32px; height: 32px; border-radius: 50%;
      background: var(--lg-tint-strong); font-size: 0.85rem; color: var(--muted);
      box-shadow: inset 0 1px 0.5px var(--lg-edge), inset 0 0 0 1px var(--lg-edge-low), 0 2px 8px -3px rgba(15, 23, 42, 0.2);
    }
    .close:hover { color: var(--text); }
    h2 { font-size: 1.3rem; font-weight: 700; }
    .intro { color: var(--muted); font-size: 0.9rem; margin: 8px 0 20px; padding-right: 24px; }
    .options { display: flex; flex-direction: column; gap: 10px; }
    .option {
      display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 14px; color: #fff;
      transition: transform 0.2s, filter 0.2s;
    }
    .option:hover { transform: translateY(-2px); filter: brightness(1.07); }
    .icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.22); display: grid; place-items: center; flex-shrink: 0; }
    .text { flex: 1; line-height: 1.3; }
    .text strong { display: block; font-size: 0.98rem; }
    .text small { opacity: 0.9; font-size: 0.78rem; }
    .arrow { font-size: 1.1rem; transition: transform 0.2s; }
    .option:hover .arrow { transform: translateX(3px); }
    .call { text-align: center; color: var(--muted); font-size: 0.82rem; margin-top: 18px; }
    .call a { color: var(--accent); text-decoration: underline; }
    @keyframes fade { from { opacity: 0; } }
    @keyframes pop { from { opacity: 0; transform: scale(0.95) translateY(8px); } }
  `,
})
export class ConnectDialog {
  protected readonly connect = inject(ConnectService);
  protected readonly profile = profile;
  protected readonly contacts = contacts;
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  protected readonly phoneHref = profile.phone.replace(/\s/g, '');

  // Static markup written here, so it's safe to bypass Angular's sanitiser (which strips <svg>).
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly icons: Record<string, SafeHtml> = {
    whatsapp: this.svg('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
    linkedin: this.svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
    email: this.svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
  };

  constructor() {
    // Lock page scroll and move focus into the dialog while it is open.
    effect(() => {
      document.body.style.overflow = this.connect.isOpen() ? 'hidden' : '';
      this.closeBtn()?.nativeElement.focus();
    });
  }

  private svg(paths: string) {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`,
    );
  }
}
