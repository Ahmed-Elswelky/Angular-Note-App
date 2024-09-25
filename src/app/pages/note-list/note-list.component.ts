import { Component, OnInit, output } from '@angular/core';
import { NotesService } from '../shared/notes.service';
import { Note } from '../shared/Note.model';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }), // Initial state
          stagger(200, [ // Staggered delay between cards
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Final state
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeAndScale', [
      transition('* => void', [
        // Scale up, then scale down and fade out
        animate('200ms ease-in', style({ transform: 'scale(1.04)' })),
        animate('200ms ease-in', style({ transform: 'scale(1)' })),
        animate('200ms ease-out', style({ transform: 'scale(0.7)', opacity: 0 }))
      ])
    ])
  ]
})
export class NoteListComponent implements OnInit {
  private notesSubscription: Subscription = new Subscription();

  notes: Note[] = new Array<Note>;
  filteredNotes : Note[] = new Array<Note>;

  constructor( private _notesService: NotesService, private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.notesSubscription = this._notesService.notes$.subscribe(notes => {
      this.notes = notes
      this.filteredNotes = this.notes;
    });
  }

  deleteNote(index: number) {
    this._notesService.delete(index);
    this.toaster.success('Note deleted successfully!', 'Delete', {
      timeOut: 3000, // Duration in milliseconds
      positionClass: 'toast-top-right', // Position of the toast
    });
  }

  filter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    value = value.toLowerCase().trim();
    let arrValues = new Array<any>;
    arrValues = value.split(" ");
    arrValues = this.removeDuplicated(arrValues);
    this.search(arrValues);
  }
  search(arr: Array<any>){
    let notesObject: {[key: string] : any}= {};
    arr.forEach(word => {
    this.notes.filter(note=>{
      let noteId = this._notesService.getId(note);
      if(note.title && note.title.includes(word) || note.body && note.body.includes(word)) {
        if (notesObject[noteId]) {
          notesObject[noteId] += 1;
        }else {
          notesObject[noteId] = 1;
        }
      }
      })
    });
    this.filteredNotes = this.notes.filter(note=>{
      let noteId = this._notesService.getId(note);
      return notesObject[noteId] > 0;
    });
    this.sortTheResults(this.filteredNotes, notesObject);
  }

  removeDuplicated(arr : Array<any>) : Array<any> {
    let set = new Set<any>;
    arr.forEach(item => set.add(item));
    let newArr = Array.from(set);
    return newArr;
  }

  sortTheResults(notes: Note[], notesObject: {[key: string] : any}) {
    this.filteredNotes = this.filteredNotes.sort((a: Note , b: Note)=>{
      let aId = this._notesService.getId(a);
      let bId = this._notesService.getId(b);
      let aCount = notesObject[aId];
      let bCount = notesObject[bId];
      return bCount - aCount;

    })

  }


}
