import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Student } from '../models/student.model';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //child to parent componnet communication
  @Output() MsgfromparentFromToLogin:EventEmitter<any>=new EventEmitter();

  ngOnInit():void{
    this.MsgfromparentFromToLogin.emit("Msg from child to parent");
  }

  name: any;
  pass: any;
  data:any;
  students: any ;
  displayMsg:string='';
  isUserLogged: boolean=false;
  MsgLoginToParent="Login to parent";

   constructor(private userservice:UserService,private router:Router,private toastr:ToastrService,private authservice:AuthService){
        this.getData();
   }

   public LoginForm =new FormGroup({
    Name:new FormControl(''),
    Pass:new FormControl()
  });

  getData()
  {
    this.userservice.getAllStudents().subscribe((data: any)=>
    {
      this.data=data;
       this.students=this.data;
       console.log(this.students);
    })
  }

  //  loginSubmitted(){
  //            console.log(this.LoginForm.value);
  //            this.userservice.loginUser(this.LoginForm.value).subscribe({
  //             next:(res)=>{
  //               console.log("logged in");
  //               console.log(res);
  //             },
  //             error:(err)=>{
  //               console.log("login failed");
  //             }

  //            });
  //  }

  loginSubmitted(){
    const user = this.students.find( (x: { name: any; password: any; }) => x.name === this.LoginForm.value.Name && x.password === this.LoginForm.value.Pass);
    console.log(user);
    if (!user) {
      console.log("logged failed");
    //  this.displayMsg='User Not Found';
      this.toastr.error('User Not Found');
    } else{
      this.toastr.success('User logged successfully');
      console.log(user);
      console.log("login success");
      this.isUserLogged=true;
      this.authservice.isUserloggedAuthService=true;
      localStorage.setItem('user', JSON.stringify(user));  
      sessionStorage.setItem('user', JSON.stringify(user));  
    this.router.navigate(['/viewdetails/'+user.id]);
    }
  }

  
  
}
