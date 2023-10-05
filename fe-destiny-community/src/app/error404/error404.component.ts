import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: [
    `../css/vendor/bootstrap.min.css`,
    `../css/styles.min.css`,
    './error404.component.css',
  ],
})
export class Error404Component {
  constructor(private location: Location) {}
  
  back(){
    this.location.back();
  }
}
