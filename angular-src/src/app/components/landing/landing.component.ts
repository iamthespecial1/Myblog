import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

user: any[] = [];
name: string;
  username: string;
  email: string;
  role: string;
  userN:String;
  phone:String;
  person: any[] = [];
  Role: string[] = ["Admin","MasterAdmin", "default"];
  count:Number=0;
  NewUsers:Number=0;
  blog:any=[];
  blogCount:Number=0;
  nameList:String[]=[];
  constructor(private router: Router,private authService: AuthService) { }
  chart = new Chart(
    {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Browser market shares. January, 2018'
    },
    subtitle: {
        text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    "series": [
        {
            "name": "BLOGS",
            "data": [
                {
                    "name": "Chrome",
                    "y": 62.74,
                    "drilldown": "Chrome"
                }
            ]
        }
    ]
    });
  ngOnInit() {
      this.authService.getAllUser().subscribe(
      res => {
        this.user = res,
        
          this.count=this.user.length;
          const result = this.user.filter(u => u.role=="default");
          this.nameList=this.user.map(x=>x.name);
          console.log(this.nameList)
          this.NewUsers=result.length;
      },
      (error) => { console.log(error) }
    );
    this.authService.getData()
      .subscribe(
      (success) => {
        
        this.blog=success;
        this.blogCount=this.blog.length;

      },
      (error) => console.log(error)
    );
    
  }

edit(u){
  console.log(u);
  this.userN=u.username;
    this.authService.geteditable(u.username).subscribe(
      res => {
        this.person = res,
          console.log("LOGGG"+this.person);
      },
      (error) => { console.log(error) }
    )
}
onSubmit(formValue: any) {
    console.log("Hiiiiii5"+formValue);
    let updatedUser = {
      username: this.userN,
      role:formValue.role
    };
    this.authService.updateUser(updatedUser).subscribe(
      (success) => this.authService.getAllUser().subscribe(
      res => {
        this.user = res,
          console.log(this.user);
      },
      (error) => { console.log(error) }
    ),
      (error) => console.log(error)
    );
      
    
    console.log(this.userN+"  "+formValue.role);
    //let dis:string="modal";
    //document.getElementById("sub").setAttribute("data-dismiss","modal");
    //this.router.navigate(['profile']);
    //this.router.navigate(['dashboard'])
    document.getElementById('closeEdit').click();
  }
}
