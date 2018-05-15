import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'
import { AppComponent } from './app.component';
import { BoardComponent } from './BoardComponent';
import { CellComponent } from './CellComponent';
import { FormsModule } from '@angular/forms';
import { Board } from './Board';
import { Cell } from './Cell'
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent, BoardComponent, CellComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    FormsModule
  ],
  providers: [Board],
  bootstrap: [AppComponent]
})
export class AppModule { }
