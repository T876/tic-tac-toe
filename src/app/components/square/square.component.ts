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
    if (this.value() !== '#') {
      return;
    }

    if (this.boardService.winner() !== '' || this.boardService.boardFull) {
      return;
    }

    this.boardService.setSquare(this.row(), this.col(), this.turnService.turn().symbol);
    this.boardService.checkWin(this.row(), this.col(), this.turnService.turn());
    
    this.turnService.nextTurn();
  }
}
