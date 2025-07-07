import { Component, inject, input } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-square',
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  turnService = inject(TurnService);
  boardService = inject(BoardService);

  value = input<string>('');
  row = input<number>(0);
  col = input<number>(0);

  pickSquare(): void {
    this.boardService.setSquare(this.row(), this.col(), this.turnService.turn());
    this.turnService.nextTurn();
  }
}
