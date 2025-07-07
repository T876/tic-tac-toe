import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from './services/board.service';
import { SquareComponent } from './components/square/square.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SquareComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  boardService = inject(BoardService);

  ngOnInit(): void {
    console.log(this.boardService.board());
  }
}
