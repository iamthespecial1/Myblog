import { Component , OnInit,AfterViewInit} from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  constructor(public ngProgress: NgProgress) {
  }
  ngOnInit() {
    this.ngProgress.start();
    
  }
  ngAfterViewInit(){
this.ngProgress.done();
  }
}
