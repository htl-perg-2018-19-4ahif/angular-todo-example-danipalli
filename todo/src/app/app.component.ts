import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { timeout } from 'q';

interface IPerson {
  name: string;
}

interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  dueTo: number;
  done?: boolean;
}

interface IFilter {
  showUndoneOnly: boolean;
  filterForPerson: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ToDo List';
  host = 'http://localhost:8080/api';
  people: IPerson[] = [{name: ''}];
  todoList: ITodoItem[];
  filter: IFilter = {showUndoneOnly: false, filterForPerson: ''};


  constructor(private httpClient: HttpClient, private dialog: MatDialog) {
    this.loadTodos();
    this.loadPeople();
  }

  openEditDialog(editItem: ITodoItem) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {people: this.people, id: editItem.id, assignedTo: editItem.assignedTo,
        description: editItem.description, dueTo: editItem.dueTo, done: editItem.done}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTodo(result);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {people: this.people, id: null, assignedTo: '', description: '', dueTo: (new Date()).getTime, done: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addTodo(result);
    });
  }

  async loadTodos() {
    this.todoList = await this.httpClient.get<ITodoItem[]>(this.host + '/todos').toPromise();
    if (this.filter.showUndoneOnly) {
      this.todoList = this.todoList.filter(item => item.done !== true);
    }
    if (this.filter.filterForPerson !== '') {
      this.todoList = this.todoList.filter(item => item.assignedTo === this.filter.filterForPerson);
    }
  }

  async loadPeople() {
    this.people = this.people.concat(await this.httpClient.get<IPerson[]>(this.host + '/people').toPromise());
  }

  async addTodo(item: ITodoItem) {
    await this.httpClient.post<ITodoItem[]>(this.host + '/todos',
      {description: item.description, assignedTo: item.assignedTo, dueTo: item.dueTo, done: item.done}).toPromise();
    this.loadTodos();
  }

  async updateTodo(item: ITodoItem) {
    await this.httpClient.patch<ITodoItem[]>(this.host + '/todos/' + item.id,
      {description: item.description, assignedTo: item.assignedTo, dueTo: item.dueTo, done: item.done}).toPromise();
    this.loadTodos();
  }

  async removeItem(id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
    await this.httpClient.delete<ITodoItem[]>(this.host + '/todos/' + id).toPromise();
    this.loadTodos();
  }

  getDate(time: number) {
    const date: Date = new Date(time);
    return date.toDateString();
  }

}
