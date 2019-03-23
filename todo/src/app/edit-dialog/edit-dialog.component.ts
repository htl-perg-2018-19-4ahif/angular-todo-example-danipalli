import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepicker, MatDatepickerInputEvent} from '@angular/material';
import { FormGroup } from '@angular/forms';

interface IPerson {
  name: string;
}

interface IInputParams {
  people: IPerson[];
  id: number;
  assignedTo?: string;
  description: string;
  dueTo: number;
  done?: boolean;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  events: string[] = [];

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IInputParams) {}

  

  setDate(event: MatDatepickerInputEvent<Date>) {
    try{
      let date: number = event.value.getTime();
      this.data.dueTo = date;
    }catch(error){
      // Do nothing
    }
  }

  save() {
      this.dialogRef.close(this.data);
  }

  close() {
      this.dialogRef.close();
  }
}
