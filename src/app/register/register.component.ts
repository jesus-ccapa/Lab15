import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //receiving data from parent component
  @Input() recievingdataToRegister: string | undefined;
  

  student = new Student();
  displayMsg:string='';
  isAccountCreated: boolean=false;
  data: any;
  activeindex=-1;
  
   constructor(private userservice:UserService,private toastr:ToastrService){
    this.getData();
    
   }

   public registerForm =new FormGroup({
    Name:new FormControl(''),
    Phone:new FormControl(),
    pass:new FormControl('')
  });
    
  ngOnInit() : void{
    this.getData();
    console.log(this.recievingdataToRegister);
    }

  registerSubmitted(){
      
              this.userservice.registerUser([
                this.registerForm.value.Name,
                this.registerForm.value.Phone,
                this.registerForm.value.pass
            ]).subscribe((res: any)=>{
              if(res==''){
                this.displayMsg='Something wrong';
                this.toastr.error(res.Errors[0]);
                console.log(res);
                this.isAccountCreated=true;
                this.getData();
              }
              else {
              
                this.displayMsg='Account created successfully';
              //  this.toastr.success('Hello world!', 'Toastr fun!');
                this.toastr.success('User registered successfully');
                console.log(res);
                this.isAccountCreated=false;
                this.getData();
              }
      });
   }

  getData()
  {
    this.userservice.getAllStudents().subscribe((data: any)=>
    {
      this.data=data;
      // console.log(this.data);
    })
  }
   
  DeleteStudentinfo(id:any){
    this.userservice.DeleteStudent(id).subscribe((data:any)=>
    {
      // console.log(data);
  //  alert("Student details Deleted");
    this.toastr.error('User deleted successfully');
    this.getData(); 
    })
  }

  edit(obj: { id:any; name: any; phone:any ; password:any ; },index: number)
  {
    this.student.id=obj.id;
    this.student.name=obj.name;
    this.student.phone=obj.phone;
    this.student.password=obj.password;
    this.activeindex=index;
    console.log("Edit over");
  }

  UpdateStudentinfo(obj: { id:any; name: any; phone:any ; password:any ; }){

    console.log(this.student);
    this.userservice.UpdateStudent(this.student).subscribe((res:any)=>
      {
        this.toastr.info('User Updated successfully');
      //  this.displayMsg='Account updated successfully';
        this.getData();
      });
  }

  save(){
    if(this.activeindex==-1){
      console.log("resgister");
      this.registerSubmitted();
    }
    else{
      console.log("Update");
      this.UpdateStudentinfo(this.student);
    }
  }
 
  
}
