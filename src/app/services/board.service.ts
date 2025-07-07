import { Injectable, OnInit, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: WritableSignal<string[][]> = signal([]);

  readonly height: Signal<number> = signal(3);

  readonly width: Signal<number> = signal(3);

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

  static checkWinRow(board: string[][], row: number): boolean {
    return board[row].every(cell => cell === 'X' || cell === 'O');
  }
  
  static checkWinColumn(board: string[][], col: number): boolean {
    return board.every(row => row[col] === 'X' || row[col] === 'O');
  }

  static checkWinDiagonal(board: string[][]): boolean {
    const height = board.length;
    const width = board[0].length;
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < height; i++) {
      diagonal1.push(board[i][i]);
      diagonal2.push(board[i][width - 1 - i]);
    }
    return diagonal1.every(cell => cell === 'X' || cell === 'O') || diagonal2.every(cell => cell === 'X' || cell === 'O');
  }

  constructor() {
    const height = this.height();
    const width = this.width();
    const board = Array.from({ length: height }, () => Array(width).fill('#'));
    this.board.set(board);
  }

  setSquare(row: number, col: number, value: string): void {
    const board = this.board();
    board[row][col] = value;
    this.board.set(board);
  }
}
