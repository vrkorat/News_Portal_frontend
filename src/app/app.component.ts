import { Component , OnInit } from '@angular/core';
import axios  from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'News';
  // axios.get('http://localhost:8000/uploadPost',(req,res)=>{
  //   console.log(res.data);
  // });
  // ngOnInit(){
  //   axios({
  //     method:"post",
  //     url:"http://localhost:3000/uploadPost",
  //     data:{
  //       reporter:"vivek"
  //     }
  //   }).then((res)=>{
  //     console.log(res.data);
  //   });
  // }

  
}