import { Component, inject } from '@angular/core';
import { ConnectService } from '../connect.service';
import { beyond, profile } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';
import { GlassDirective } from '../glass.directive';

@Component({
  selector: 'app-beyond',
  imports: [RevealDirective, GlassDirective],
  template: `
    <section class="beyond">
      <div class="container">
        <div class="head" appReveal>
          <span class="eyebrow">{{ beyond.eyebrow }}</span>
          <h2>{{ beyond.heading }}</h2>
        </div>

        <div class="tiles">
          <button class="tile soft" appReveal (click)="connect.open()">
            <div>
              <h3>{{ beyond.connect.title }}</h3>
              <p>{{ beyond.connect.text }}</p>
            </div>
            <div class="foot">
              @if (profile.photo) {
                <span class="avatar"><img [src]="profile.photo" [alt]="profile.fullName" /></span>
              } @else {
                <span class="avatar initial">{{ profile.initial }}</span>
              }
              <span class="go" appGlass><svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
            </div>
          </button>

          <a class="tile soft" href="#projects" appReveal [revealDelay]="120">
            <div>
              <span class="icon">
                <svg viewBox="0 0 24 24"><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></svg>
              </span>
              <h3>{{ beyond.fullstack.title }}</h3>
              <p>{{ beyond.fullstack.text }}</p>
            </div>
            <div class="foot end">
              <span class="go" appGlass><svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
            </div>
          </a>

          <a class="tile accent" href="#experience" appReveal [revealDelay]="240">
            <span class="go corner" appGlass><svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
            <div class="middle">
              <h3>{{ beyond.highlight.title }}</h3>
              <p>{{ beyond.highlight.text }}</p>
            </div>
            <div class="foot">
              <span class="tag" appGlass>
                <span class="tag-icon"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg></span>
                {{ beyond.highlight.tag }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .beyond { padding-bottom: 72px; border-bottom: 1px solid var(--border); }
    .head { margin-bottom: 40px; }
    .eyebrow { letter-spacing: 0.2em; font-size: 0.875rem; }
    h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; }

    .tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
    .tile {
      position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 20px;
      min-height: 256px; padding: 24px; border-radius: 28px; text-align: left; color: var(--text);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .tile:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .tile:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
    .soft { background: var(--tile-1); }
    .accent { background: #7c3aed; color: #fff; }

    h3 { font-size: 1.25rem; font-weight: 700; line-height: 1.4; }
    p { margin-top: 8px; font-size: 0.95rem; line-height: 1.6; color: var(--text-3); }
    .accent p { color: rgba(255, 255, 255, 0.88); }

    .icon {
      display: grid; place-items: center; width: 40px; height: 40px; margin-bottom: 16px;
      border-radius: 12px; background: var(--accent); color: #fff;
    }
    svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

    .foot { display: flex; align-items: center; justify-content: space-between; }
    .foot.end { justify-content: flex-end; }
    .avatar {
      position: relative; display: block; width: 48px; height: 48px; flex-shrink: 0;
      border-radius: 50%; overflow: hidden; background: #000;
      border: 2px solid var(--surface); box-shadow: 0 4px 12px -4px rgba(15, 23, 42, 0.3);
    }
    /*
     * Crop me.jpg to the face. In the photo the head spans about 27% of the height, centred at
     * 48.8% across and 15.9% down. Scaling the image to 210% and offsetting it by those amounts puts
     * the head just below the middle of the circle at ~57% of its height, with room above the hair
     * and below the chin; the photo's black backdrop fills the space around it.
     */
    .avatar img {
      position: absolute; width: 210%; height: 210%; max-width: none;
      left: calc(50% - 48.8% * 2.1); top: calc(52% - 15.9% * 2.1);
    }
    .avatar.initial { display: grid; place-items: center; background: var(--accent); color: #fff; font-weight: 700; }
    .go {
      display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%;
      color: var(--text);
      transition: transform 0.25s ease;
    }
    .go svg { width: 16px; height: 16px; }
    .tile:hover .go { transform: rotate(45deg); }
    /* On the purple tile, the glass is tinted white in both themes. */
    .accent .go, .accent .tag { background: rgba(255, 255, 255, 0.18); border-color: rgba(255, 255, 255, 0.3); color: #fff; }
    .corner { position: absolute; top: 20px; right: 20px; }
    .middle { margin-top: auto; padding-right: 32px; }
    .tag {
      display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 999px;
      font-size: 0.8rem; font-weight: 500;
    }
    .tag-icon { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(255, 255, 255, 0.25); }
    .tag-icon svg { width: 13px; height: 13px; }

    @media (max-width: 960px) {
      .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .tiles > :last-child { grid-column: 1 / -1; min-height: 220px; }
    }
    @media (max-width: 640px) {
      .tiles { grid-template-columns: 1fr; gap: 16px; }
      .tile, .tiles > :last-child { min-height: 210px; }
      .head { margin-bottom: 28px; }
    }
  `,
})
export class Beyond {
  protected readonly connect = inject(ConnectService);
  protected readonly beyond = beyond;
  protected readonly profile = profile;
}
