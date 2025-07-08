import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from './services/board.service';
import { SquareComponent } from './components/square/square.component';
import { TurnService } from './services/turn.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SquareComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  boardService = inject(BoardService);
  turnService = inject(TurnService);

  playerNameForm: FormGroup = new FormGroup({
    name1: new FormControl('', [Validators.required]),
    name2: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
    console.log(this.boardService.board());
  }

  submitNames() {
    this.turnService.playerOne.name = this.playerNameForm.value.name1;
    this.turnService.playerTwo.name = this.playerNameForm.value.name2;
  }
}
