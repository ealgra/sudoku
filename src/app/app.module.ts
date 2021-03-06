import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { BoardComponent } from './BoardComponent';
import { CellComponent } from './CellComponent';
import { FormsModule } from '@angular/forms';
import { Board } from './Board';
import { Cell } from './Cell'
import { MatCardModule } from '@angular/material/card';
import { SudokuComponent } from './sudoku/sudoku.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SudokuExamples } from './SudokuExamples'

@NgModule({
  declarations: [
    AppComponent, BoardComponent, CellComponent, SudokuComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [SudokuExamples],
  bootstrap: [AppComponent]
})
export class AppModule { }
