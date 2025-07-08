import { computed, Injectable, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Player } from './turn.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardSignal: WritableSignal<string[][]> = signal([]);
  readonly board: Signal<string[][]> = computed(() => this.boardSignal());

  readonly height: Signal<number> = signal(3);

  readonly width: Signal<number> = signal(3);

  readonly winner: WritableSignal<string> = signal('');

  /**
   * Check if a cell is on a diagonal.
   * 
   * @param row - The row of the cell
   * @param col - The column of the cell
   * @param height - The height of the board
   * @returns True if the cell is on a diagonal, false otherwise
   */
  static isDiagonal(row: number, col: number, height: number): boolean {
    return row === col || row + col === height - 1;
  }

  static checkWinRow(board: string[][], row: number, player: string): boolean {
    const win = board[row].every(cell => cell === player);
    if (win) {
      console.log('win row', row);
      return true;
    }
    return false;
  }
  
  static checkWinColumn(board: string[][], col: number, player: string): boolean {
    const win = board.every(row => row[col] === player);
    if (win) {
      console.log('win column', col);
      return true;
    }
    return false;
  }

  static checkWinDiagonal(board: string[][], player: string): boolean {
    const height = board.length;
    const width = board[0].length;
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < height; i++) {
      diagonal1.push(board[i][i]);
      diagonal2.push(board[i][width - 1 - i]);
    }
    const win = diagonal1.every(cell => cell === player) || diagonal2.every(cell => cell === player);
    if (win) {
      console.log('win diagonal');
      return true;
    }
    return false;
  }

  constructor() {
    const height = this.height();
    const width = this.width();
    const board = Array.from({ length: height }, () => Array(width).fill('#'));
    this.boardSignal.set(board);
  }

  setSquare(row: number, col: number, value: string): void {
    if (this.winner() !== '') {
      return;
    }

    const board = this.board();
    board[row][col] = value;
    this.boardSignal.set(board);
  }

  checkWin(row: number, col: number, player: Player) {
    const board = this.board();
    let win = BoardService.checkWinRow(board, row, player.symbol) || BoardService.checkWinColumn(board, col, player.symbol);

    if (BoardService.isDiagonal(row, col, this.height()) && !win) {
      win = win || BoardService.checkWinDiagonal(board, player.symbol);
    }

    if (win) {
      this.winner.set(player.name);
    }
  }
}
