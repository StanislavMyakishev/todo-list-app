import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoInteractionService {
  private readonly _todos = new BehaviorSubject<Todo[]>(
    [
      {
        id: 1,
        title: 'Add your Todo',
        completed: false,
      },
      {
        id: 2,
        title: 'Press Enter to confirm',
        completed: false,
      },
      {
        id: 3,
        title: 'Complete your tasks',
        completed: false,
      },
    ]
  );
  private readonly _todoTitle = new BehaviorSubject<string>('');
  private readonly _idForTodo = new BehaviorSubject<number>(4);
  private readonly _filter = new BehaviorSubject<string>('all');
  private readonly _anyRemainingModel = new BehaviorSubject<boolean>(true);
  private readonly _messageSent = new BehaviorSubject<boolean>(true);
  messageSent = this._messageSent.asObservable();


  sendMessage(message: boolean) {
    this._messageSent.next(message);
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  get idForTodo(): number {
    return this._idForTodo.getValue();
  }

  get todoTitle(): string {
    return this._todoTitle.getValue();
  }

  get filter(): string {
    return this._filter.getValue();
  }

  get anyRemainingModel(): boolean {
    return this._anyRemainingModel.getValue();
  }

  set todos(val: Todo[]) {
    this._todos.next(val);
  }

  set idForTodo(val: number) {
    this._idForTodo.next(val);
  }

  set todoTitle(val: string) {
    this._todoTitle.next(val);
  }

  set filter(val: string) {
    this._filter.next(val);
  }

  set anyRemainingModel(val: boolean) {
    this._anyRemainingModel.next(val);
  }

  setTodoTitle(todoID: number): void {
    this.todoTitle = this.todos.find(todo => todo.id === todoID).title;
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos = [
      ...this.todos,
      {
        id: this.idForTodo,
        title: this.todoTitle,
        completed: false,
      }
    ];
    this.todoTitle = '';
    this.idForTodo++;
    this.sendMessage(true);
  }

  updateTodo(todoID: number, todoTitle: string): void {
    const todoIndex = this.todos.findIndex(todo => todo.id === todoID);
    this.todos[todoIndex] = {
      id: todoID,
      title: todoTitle,
      completed: false
    };
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  filteredTodos(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement> event.target).checked);
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  constructor() {
  }
}
