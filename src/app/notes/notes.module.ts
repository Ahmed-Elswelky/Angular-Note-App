import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from '../pages/note-list/note-list.component';
import { NoteDetailsComponent } from '../pages/note-details/note-details.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: "", component: NoteListComponent},
  {path: "new", component: NoteDetailsComponent},
  {path: ":id", component: NoteDetailsComponent},
]

@NgModule({
  declarations: [NoteListComponent, NoteDetailsComponent, NoteCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class NotesModule { }
