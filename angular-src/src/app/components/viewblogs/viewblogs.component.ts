import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-viewblogs',
  templateUrl: './viewblogs.component.html',
  styleUrls: ['./viewblogs.component.scss']
})
export class ViewblogsComponent implements OnInit {
 //heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
 blog: any[] = [];
 img:String[]=[];
 
  constructor(private authService: AuthService,public ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.authService.getData()
      .subscribe(
      (success) => {
        console.log(success);
        this.blog=success
        
        
      },
      (error) => console.log(error)
    );
    this.ngProgress.done();
  }
  log:String="";
   logradio(element: HTMLInputElement): void {
     this.log="";
     if(element.checked)
    this.log=element.value;
    else 
    this.log="";
    console.log(this.log)
    
  }
 clearIt(){
   this.log="";
 }
}
