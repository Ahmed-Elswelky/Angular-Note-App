import { Injectable } from '@angular/core';
import { Note } from './Note.model';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes : Note[] = new Array<Note>();
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

  constructor(private toaster: ToastrService) {
    this.notesSubject.next(this.notes);
  }

  getAllNotes(){
    return this.notes$;
  }

  get(id: number){
    return this.notes.find(note=>note.id == id);
  }

  getId(note: Note){
    return this.notes.indexOf(note);
  }

  add(note: Note){
    note.id = uuidv4();
    this.notes.push(note);
    this.notesSubject.next(this.notes);
    return note.id;
  }

  delete(id: number) {
    this.notesSubject.subscribe(notes=>{
      this.notes = notes.filter(note => note.id !== id);
    })
    this.notesSubject.next(this.notes);
  }

  update(id: any, title: string, body: string) {
    // Find the note by its unique ID
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.title = title;
      note.body = body;
    }
  }
}

