import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup } from '@angular/forms';

interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ITodoItem) {}

  save() {
      this.dialogRef.close(this.data);
  }

  close() {
      this.dialogRef.close();
  }
}
