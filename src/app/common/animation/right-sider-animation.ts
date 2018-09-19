import {animate, state, style, transition, trigger} from '@angular/animations';

export const animation = trigger('slide', [
  state('off', style({
    transform: 'translateX(0)'
  })),
  state('open', style({
    transform: 'translateX(-480px)'
  })),
  transition('off <=> open', animate('500ms ease-in-out'))
]);
