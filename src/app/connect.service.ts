import { Injectable, signal } from '@angular/core';

/** Controls the "Let's Connect" dialog so any button on the page can open it. */
@Injectable({ providedIn: 'root' })
export class ConnectService {
  readonly isOpen = signal(false);

  open() { this.isOpen.set(true); }
  close() { this.isOpen.set(false); }
}
