import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, output, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from '../pages/shared/notes.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
  // animations: [
  //   trigger('fadeAndScale', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),  // Initial state: transparent
  //       animate('500ms ease-in', style({ opacity: 1 }))  // Fade in when entering
  //     ]),
  //     transition(':leave', [
  //       // Scale up, then scale down and fade out
  //       animate('200ms ease-in', style({ transform: 'scale(1.2)' })),
  //       animate('200ms ease-in', style({ transform: 'scale(1)' })),
  //       animate('200ms ease-out', style({ transform: 'scale(0.9)', opacity: 0 }))
  //     ])
  //   ])
  // ]
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() body: string;
  @Input() link: number;
  // @Input() index: number;

  @Output() deleteEvent : EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2, private _noteService: NotesService, private router: Router){}

  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, "display", "block");
    }else {
      this.renderer.setStyle(this.truncator.nativeElement, "display", "none");
    }
  }
  ngOnInit(): void {

  }
  deleteNote() {
    this.deleteEvent.emit()
  }


// this is when i use input value
  // deleteNote(index: number) {
  //   this._noteService.delete(index);
  // }

}
