import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  
  constructor(private httpClient: HttpClient) { 
    this.loadTodos();
  }

  async loadTodos(){
    this.todoList = await this.httpClient.get<ITodoItem[]>('http://localhost:8080/api/todos').toPromise();
  }

}
