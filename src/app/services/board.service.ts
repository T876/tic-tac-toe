import { computed, Injectable, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Player } from './turn.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  /**
   * The board
   */
  private boardSignal: WritableSignal<string[][]> = signal([]);
  readonly board: Signal<string[][]> = computed(() => this.boardSignal());
  boardFull: boolean = false;

  /**
   * The height of the board
   */
  readonly height: Signal<number> = signal(3);

  /**
   * The width of the board
   */
  readonly width: Signal<number> = signal(3);

  /**
   * The winner of the game. Once this is set, the game is over and no further moves are allowed.
   */
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

  /**
   * Check if a row meets the win condition
   * 
   * @param board - The board
   * @param row - The row to check
   * @param player - The player to check
   * @returns True if the row meets the win condition, false otherwise
   */
  static checkWinRow(board: string[][], row: number, player: string): boolean {
    const win = board[row].every(cell => cell === player);
    if (win) {
      console.log('win row', row);
      return true;
    }
    return false;
  }
  
  /**
   * Check if a column meets the win condition
   * 
   * @param board - The board
   * @param col - The column to check
   * @param player - The player to check
   * @returns True if the column meets the win condition, false otherwise
   */
  static checkWinColumn(board: string[][], col: number, player: string): boolean {
    const win = board.every(row => row[col] === player);
    if (win) {
      console.log('win column', col);
      return true;
    }
    return false;
  }

  /**
   * Check if a diagonal meets the win condition
   * 
   * @param board - The board
   * @param player - The player to check
   * @returns True if the diagonal meets the win condition, false otherwise
   */
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

  /**
   * Set a square on the board
   * 
   * @param row - The row to set
   * @param col - The column to set
   * @param value - The value to set
   */
  setSquare(row: number, col: number, value: string): void {
    if (this.winner() !== '') {
      return;
    }

    const board = this.board();
    board[row][col] = value;
    this.boardSignal.set(board);
    this.checkBoardFull();
  }

  checkBoardFull(): void {
    const board = this.boardSignal();
    const full = board.every(row => row.every(cell => cell !== '#'));
    this.boardFull = full;
  }

  /**
   * Check if a player has won
   * 
   * @param row - The row to check
   * @param col - The column to check
   * @param player - The player to check
   */
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
