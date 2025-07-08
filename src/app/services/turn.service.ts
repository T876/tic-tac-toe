import { computed, Injectable, signal, WritableSignal, Signal } from '@angular/core';

export interface Player {
  name: string;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  playerOne: Player = {
    name: '',
    symbol: 'X'
  };
  playerTwo: Player = {
    name: '',
    symbol: 'O'
  };

  private turnSignal: WritableSignal<Player> = signal(this.playerOne);
  readonly turn: Signal<Player> = computed(() => this.turnSignal());


  constructor() { }

  nextTurn(): void {
    if (this.turnSignal() === null) {
      this.turnSignal.set(this.playerOne);
    } else {
      this.turnSignal.set(this.turnSignal() === this.playerOne ? this.playerTwo : this.playerOne);
    }
  }
}
