import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import axios  from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status:boolean;
  reporter:boolean;
  admin:boolean;
  user:boolean;
  display:boolean;
  uname:string;
  pass:string;
  valid:string="";

  adminLogin(){
    this.admin=true;
    this.user=false;
    this.reporter=false;
    this.display=true;
  }

  uLogin(){
    this.user=true;
    this.admin=false;
    this.reporter=false;
    this.display=true;
  }

  rLogin(){
    this.admin=false;
    this.reporter=true;
    this.user=false;
    this.display=true;
  }
  getUname=(event)=>{
    this.uname=event.target.value;
  }
  getPass=(event)=>{
    this.pass=event.target.value;
  }
  auth(){
    console.log(this.uname,this.pass);

    if(this.user)
    {
        axios({
            method:"post",
            url:"http://localhost:3000/uLogin",
            data:{
              name:this.uname,
              pass:this.pass
            }
          }).then((res)=>{
            console.log(res.data);
            this.status=true;
            if(res.data.uname != undefined){
              sessionStorage.setItem('uname', res.data.uname);
              sessionStorage.setItem('isUser','true');
              this.router.navigate(['/home']);
            }
            else{
              this.valid="Invalid Username or Password";
            }
            
            
            
          });

    }
    else if(this.reporter)
    {
      console.log("reporter")
      axios({
          method:"post",
          url:"http://localhost:3000/rLogin",
          data:{
            name:this.uname,
            pass:this.pass
          }
      }).then((res)=>{
        if(res.data.rname != undefined){
          sessionStorage.setItem('uname', res.data.rname);
          console.log(sessionStorage.getItem('uname'))
          sessionStorage.setItem('isUser','false');
          this.router.navigate(['/home']);
        }
        else{
          this.valid="Invalid Username or Password";
        }
      });

    }
    else if(this.admin)
    {
      console.log("admin")
      axios({
          method:"post",
          url:"http://localhost:3000/adminLogin",
          data:{
            name:this.uname,
            pass:this.pass
          }
      }).then((res)=>{
        if(res.data.adminname != undefined){
          sessionStorage.setItem('uname', res.data.adminname);
          console.log(sessionStorage.getItem('uname'))
          sessionStorage.setItem('isUser','admin');
          this.router.navigate(['/admin']);
        }
        else{
          this.valid="Invalid Username or Password";
        }
      });
    }

  }

  constructor(private router: Router) { }

  ngOnInit() {
    document.body.classList.add('bg-img');
    if(sessionStorage.getItem('uname'))
    {
      this.router.navigate(['/home']);
    }
    this.status=false;
    this.display=false;
  }

}
