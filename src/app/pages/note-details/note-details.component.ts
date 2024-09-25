import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';
import { Note } from '../shared/Note.model';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent implements OnInit {

  note: any;
  noteId: number;
  newNote: boolean


  constructor(private _notesServices: NotesService, private router: Router, private route: ActivatedRoute, private toaster : ToastrService){
    this.note = new Note;
    this.route.params.subscribe((params: Params)=>{
      this.noteId = this.route.snapshot.params['id'];
      if (this.route.snapshot.params['id']) {
        this.note = this._notesServices.get(this.route.snapshot.params['id']);
        this.newNote = false;
      }else {
        this.newNote = true;
      }
    })
  }

  ngOnInit(): void {
  }


  onSubmit(form : NgForm){
    if(this.newNote) {
      this._notesServices.add(form.value);
      this.toaster.success('Note added successfully!', 'Addition', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      // console.log("add");
    }else {
      this._notesServices.update(this.noteId, form.value.title , form.value.body);
      this.toaster.success('Note Updated successfully!', 'Update', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      // console.log(this.noteId, this.note.title, this.note.body);
    }
    this.router.navigateByUrl("/");
  }

  cancelAddition() {
    this.toaster.error('Addition Cancelled', 'Cancel', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });

    this.router.navigateByUrl("/")
  }
}
