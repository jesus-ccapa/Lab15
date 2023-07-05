import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  
 
  data1:string | undefined;

MsgparentFromLogin(data: any){
  console.warn(data);
  this.data1=data;
}

}
