import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';
import { Note } from '../shared/Note.model';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent implements OnInit {

  note: any;
  noteId: number;
  newNote: boolean


  constructor(private _notesServices: NotesService, private router: Router, private route: ActivatedRoute, private toaster : ToastrService, private translate : TranslateService){
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
      this.translate.get(["ADDED_SUCCESS","ADDITION_TITLE"]).subscribe(translations =>{
        this.toaster.success(translations.ADDED_SUCCESS , translations.ADDITION_TITLE, {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      })
    }else {
      this._notesServices.update(this.noteId, form.value.title , form.value.body);
      this.translate.get(["UPDATED_SUCCESS","UPDATE_TITLE"]).subscribe(translations =>{
        this.toaster.success(translations.UPDATED_SUCCESS , translations.UPDATE_TITLE, {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      })
    }
    this.router.navigateByUrl("/");
  }

  cancelAddition() {

    this.translate.get(["CANCEL_SUCCESS","CANCEL_TITLE"]).subscribe(translations =>{
      this.toaster.error(translations.CANCEL_SUCCESS , translations.CANCEL_TITLE, {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    })
    this.router.navigateByUrl("/")
  }
}
