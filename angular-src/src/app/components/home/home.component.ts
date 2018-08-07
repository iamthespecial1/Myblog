import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }
 blog: any[] = [];
 img:String[]=[];
  ngOnInit() {
    this.authService.getThreeData()
      .subscribe(
      (success) => {
        console.log(success);
        this.blog=success;
        
      },
      (error) => console.log(error)
    );
  }
title: string = 'My Adda';
  lat: number = 12.841728;
  lng: number = 77.649852;
  zoom: number = 5;
onNavigateLinkedIn(){
  window.open("https://www.linkedin.com/in/rajat-barman-862606101/", "_blank");
}
onNavigateFacebook(){
  window.open("https://www.facebook.com/007.holmes", "_blank");
}
onNavigateInsta(){
  window.open("https://www.instagram.com/i_m_the_special_1/?hl=en", "_blank");
}
}
