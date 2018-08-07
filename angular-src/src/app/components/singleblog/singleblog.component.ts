import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.css']
})
export class SingleblogComponent implements OnInit {
  blog:any={};
  title: any;
  constructor(private authService: AuthService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
            this.title = params['title'];
            console.log(this.title);
        });

        this.authService.getBlog(this.title).subscribe(
           (success) => {
        console.log(success);
        this.blog=success; 
      },
      (error) => console.log(error)
       );
    }
  }


