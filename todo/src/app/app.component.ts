import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditDialogComponent } from "./edit-dialog/edit-dialog.component";

// import { Observable } from 'rxjs';

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

  openDialog() {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      height: '400px',
      width: '600px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
    
    dialogRef.close('Pizza!');
  }

 



  async loadTodos(){
    this.todoList = await this.httpClient.get<ITodoItem[]>('http://localhost:8080/api/todos').toPromise();
  }

}
