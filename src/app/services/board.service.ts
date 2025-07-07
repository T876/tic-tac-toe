import { computed, Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  readonly board: Signal<string[][]> = signal([[]]);

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

  constructor() { }
}
