import { computed, Injectable, signal, WritableSignal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private turnSignal: WritableSignal<string> = signal('X');

  readonly turn: Signal<string> = computed(() => this.turnSignal());

  constructor() { }

  nextTurn(): void {
    this.turnSignal.set(this.turnSignal() === 'X' ? 'O' : 'X');
  }
}
