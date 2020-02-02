import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {TodoInteractionService} from '../../services/todo-interaction.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnDestroy {
  todoID: number;
  beforeEditCache: string;

  constructor(private todoService: TodoInteractionService, private ar: ActivatedRoute,
              private router: Router) {
    this.ar.params.subscribe(param => {
      this.todoID = +param.id;
      this.todoService.setTodoTitle(this.todoID);
      this.beforeEditCache = this.todoService.todoTitle;
    });
  }

  ngOnDestroy() {
    this.todoService.todoTitle = this.beforeEditCache;
  }

  doneEdit(): void {
    if (this.todoService.todoTitle.trim().length === 0) {
      this.todoService.todoTitle = this.beforeEditCache;
      this.router.navigate(['/tasks']);
      return;
    }
    this.todoService.updateTodo(this.todoID, this.todoService.todoTitle);
    this.router.navigate(['/tasks']);
  }

  cancelEdit(): void {
    this.todoService.todoTitle = this.beforeEditCache;
    this.router.navigate(['/tasks']);
  }
}
