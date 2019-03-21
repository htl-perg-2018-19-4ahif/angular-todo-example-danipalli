import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { EditDialogComponent } from "./edit-dialog/edit-dialog.component";

interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ToDo List';

  public todoList: ITodoItem[];
  
  
  constructor(private httpClient: HttpClient, private dialog: MatDialog) { 
    this.loadTodos();
  }

  openDialog(editItem: ITodoItem) {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {id: editItem.id, assignedTo: editItem.assignedTo, description: editItem.description, done: editItem.done}
    });

    dialogRef.afterClosed().subscribe(result => {
      let res = result as ITodoItem;
      this.todoList[this.todoList.indexOf(this.todoList.find(item => item.id === res.id))] = res;
    });
  }

  removeItem(id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }

  async loadTodos(){
    this.todoList = await this.httpClient.get<ITodoItem[]>('http://localhost:8080/api/todos').toPromise();
  }

}
