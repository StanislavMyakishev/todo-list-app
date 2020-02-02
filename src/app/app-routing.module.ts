import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {NewTodoComponent} from './components/new-todo/new-todo.component';
import {EditTodoComponent} from './components/edit-todo/edit-todo.component';


const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {
    path: 'tasks',
    component: TodoListComponent,
    data: {animation: 'isTask'},
    children: [
      {path: 'new', component: NewTodoComponent},
      {path: ':id', component: EditTodoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
