import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject} from '@angular/core';
import { FileHandle } from '../_model/file-handle.model';

@Component({
  selector: 'app-show-product-image-dialog',
  templateUrl: './show-product-image-dialog.component.html',
  styleUrls: ['./show-product-image-dialog.component.css']
})
export class ShowProductImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(): void {
    this.recieveImages();
  }
  recieveImages(){
    console.log(this.data);
  }
}
