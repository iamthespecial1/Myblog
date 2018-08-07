import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  public editorContent: string = 'My Document\'s Title'
  constructor(private authService: AuthService) { }
  blog: any[] = [];
  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
  title: string = "";
  author: string = "";
  user: Object;
  img:String[]=[];
  Category: string[] = ["India","World", "Business","Technology","Entertainment","Sports","Miscellaneous"];
  CategorySelected:string="India";
  len:Number=0;
  totlen:Number=0;
  userCount:Number=0;
  currentdate = new Date(); 
datetime =this.currentdate.getDate() + "-"
                + (this.currentdate.getMonth()+1)  + "-" 
                + this.currentdate.getFullYear() 
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.author=profile.user.username;
      console.log(this.user);
    },
      err => {
        console.log(err);
        return false;
      });
    this.authService.getData()
      .subscribe(
      (success) => {
        this.totlen=success.length
        this.blog=success.filter(word => word.author==this.author);
        console.log(this.blog);
        this.len=this.blog.length;
      },
      (error) => console.log(error)
    );
    this.authService.getCount()
      .subscribe(
      (success) => {
        console.log(success);
        this.userCount=success;
      },
      (error) => console.log(error)
    );
    
  }
  selectedFile: File = null;
  url:any;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
  }

  submit() {
    const res = {
      title: this.title,
      author: this.author,
      editor: this.text1,
      img: this.selectedFile,
      cat:this.CategorySelected
    }
    console.log(res)
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('author', this.author);
    fd.append('editor', this.text1);
    fd.append('img', this.selectedFile);
    fd.append('cat',this.CategorySelected);
    this.authService.sendData(fd).subscribe(
      (success) => {
        console.log(success);
        document.getElementById('clear').click();
        this.selectedFile=null;
        this.authService.getData()
      .subscribe(
      (success) => {
        
        this.blog=success.filter(word => word.author==this.author);
        console.log(this.blog);
        
      },
      (error) => console.log(error)
    );
      },
      (error) => console.log(error)
    );


  }
  file(){
    document.getElementById('img_btn').click();
  }


onSubmit(formValue: any) {
    let updatedUser = {
      name: formValue.name,
      email: formValue.email,
      username: this.author,
      phone: formValue.phone
    };
    this.authService.updateUser(updatedUser).subscribe(
      (success) => this.authService.getAllUser().subscribe(
      res => {
        this.user = res[0],
          console.log(this.user);
      },
      (error) => { console.log(error) }
    ),
      (error) => console.log(error)
    );
    //let dis:string="modal";
    //document.getElementById("sub").setAttribute("data-dismiss","modal");
    //this.router.navigate(['profile']);
    //this.router.navigate(['dashboard'])
    this.url="";
    document.getElementById('closeEdit').click();
  }

}


