import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MasterGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router){

  }

  canActivate() {
      let User = JSON.parse(localStorage.getItem('user'));
      //console.log(User.position);
     if (User.role=="MasterAdmin") {
      return true;
    }
    else if(User.role=="Admin")
    {
        this.router.navigate(['admin']);
    return false;
}
else{
    this.router.navigate(['']);
    return false;
}
  }
  }

