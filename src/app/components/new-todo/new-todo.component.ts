import {Component, OnInit} from '@angular/core';
import {TodoInteractionService} from '../../services/todo-interaction.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  constructor(public todoService: TodoInteractionService) {
  }

  ngOnInit() {
    this.todoService.todoTitle = '';
  }

  addTodo(): void {
    this.todoService.addTodo();
  }
}
