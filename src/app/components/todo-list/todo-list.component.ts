import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {TodoInteractionService} from '../../services/todo-interaction.service';
import {trigger, transition, style, animate} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  providers: [TodoInteractionService],
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(200, style({opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({opacity: 0, transform: 'translateY(30px)'}))
      ]),

    ])
  ]
})

export class TodoListComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollList', {static: false}) private myScrollContainer: ElementRef;

  constructor(private todoService: TodoInteractionService, private router: Router) {
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  openAdd(): void {
    this.router.navigate(['/tasks/new']);
  }

  openEdit(todoID: number): void {
    this.router.navigate(['/tasks', todoID]);
  }
}
