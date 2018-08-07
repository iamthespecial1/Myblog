import { Component, OnInit,HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
   @HostListener('window:scroll', [])
onWindowScroll(e) {
  var elemt=document.getElementById("navb");
  if(window.pageYOffset<30)
   elemt.style.backgroundColor = "rgba(255,255,255,0)";
   else
   elemt.style.backgroundColor= "rgba(40, 46, 52,1)";//background-image: linear-gradient(to right top, #010827, #000e34, #001142, #00134f, #03135c);

}
  onLogoutClick() {
    this.authService.logout();
    /*this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });*/
    this.router.navigate(['/login']);
    return false;
  }
}
