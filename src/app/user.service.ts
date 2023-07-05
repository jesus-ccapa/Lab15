import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl ="https://localhost:7068/api/Students";
  constructor(private http:HttpClient) { }

  
 getAllStudents() : Observable<Student[]>  {
  return this.http.get<Student[]>(this.baseUrl);
 }

 DeleteStudent(id:any) : Observable<Student[]>  {
  return this.http.delete<Student[]>(this.baseUrl+'/'+id);
 }

 getDetailsById(id:any): Observable<Student[]>  {
  return this.http.get<Student[]>(this.baseUrl+'/'+id);
 }
 
 UpdateStudent(student: Student) : Observable<Student[]>  {
  console.log("service update entered");
  console.log(student);
  return this.http.put<Student[]>(this.baseUrl+'/'+student.id,student);
 }

 registerUser(user:Array<String>)
 {
   return this.http.post(this.baseUrl ,{
     Name:user[0],
     Phone:user[1],
     Password:user[2]
   },
   {
     responseType:'text',
   });
 }

 loginUser(data:any){
  
   return this.http.post<any>(this.baseUrl + '/authenticate',data);
 }

 
}
