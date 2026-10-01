import { Component } from '@angular/core';
import { Navbar } from './sections/navbar';
import { Hero } from './sections/hero';
import { Strengths } from './sections/strengths';
import { Beyond } from './sections/beyond';
import { Projects } from './sections/projects';
import { Experience } from './sections/experience';
import { Testimonials } from './sections/testimonials';
import { Faq } from './sections/faq';
import { Contact } from './sections/contact';
import { ConnectDialog } from './sections/connect-dialog';
import { testimonials } from './portfolio.data';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Strengths, Beyond, Projects, Experience, Testimonials, Faq, Contact, ConnectDialog],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-strengths />
      <app-beyond />
      <app-projects />
      <app-experience />
      @if (hasTestimonials) {
        <app-testimonials />
      }
      <app-faq />
      <app-contact />
    </main>
    <app-connect-dialog />
  `,
})
export class App {
  protected readonly hasTestimonials = testimonials.length > 0;
}
