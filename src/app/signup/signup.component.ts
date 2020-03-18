import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { fn } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  validdata:boolean;
  display:boolean;
  user:boolean;
  reporter:boolean;

  username:string;
  fname:string;
  lname:string;
  password:string;
  rpassword:string;
  dob:Date;
  email:string;
  status:string;

  validusername:boolean;
  validpassword:boolean;
  validrpassword:boolean;
  validfname:boolean;
  validlname:boolean;


  constructor(private router:Router) { }
  
  userTrue(){
    this.user=true;
    this.reporter=false;
    this.display=true;
  }

  reporterTrue(){
    this.reporter=true;
    this.user=false;
    this.display=true;
  }

  


  signUp(){
    console.log(this.username+" "+this.password+" "+this.rpassword+" "+this.fname+" "+this.lname+" "+this.dob)
    if(this.username.length <=5)
    {
      this.validdata=false;
      console.log("uname not valid")
    }
    else
    {
      console.log("uname valid")
      this.validusername=true;
    }
  

 
    if(this.password.length <= 5)
    {
      this.validdata=false;
      console.log("pass not valid "+this.password+"  "+this.password.length)
    }
    else{
      this.validpassword=true;
      console.log("pass valid")
    }
    
  

  
    if(this.password.toString() == this.rpassword.toString())
    {
      console.log("rpass valid")
      this.validrpassword=true;
    }
    else
    {
      console.log("rpass not valid")
      this.validrpassword=false;
    }
    if(this.validusername && this.validpassword && this.validrpassword)
    {
      this.validdata=true;
    }
    else
    {
      this.validdata=false;
      if(!this.validpassword)
      {
        this.status="password length should be mare than 5\n"
      }
      if(!this.validrpassword)
      {
        this.status+="confirm password must be same as password\n";
      }
      if(!this.validusername)
      {
        this.status+="username length should be mare than 5\n"
      }
      window.alert(this.status)
    }
    if(this.validdata)
    {
      if(this.user)
      {
        
        axios({
              method:"post",
              url:"http://localhost:3000/uSignup",
              data:{
                username:this.username,
                password:this.password,
                fname:this.fname,
                lname:this.lname,
                date:this.dob.toString(),
                email:this.email
              }
            }).then((res)=>{
              console.log(res.data);
              
              sessionStorage.setItem('uname', this.username);
              sessionStorage.setItem('isUser','true');
              this.router.navigate(['/home']);
              
            });
      }
      else if(this.reporter)
      {
        axios({
          method:"post",
          url:"http://localhost:3000/rSignup",
          data:{
            username:this.username,
            password:this.password,
            fname:this.fname,
            lname:this.lname,
            date:this.dob.toString(),
            email:this.email
          }
        }).then((res)=>{
          console.log(res.data);
          
          sessionStorage.setItem('uname', this.username);
          sessionStorage.setItem('isUser','false');
          this.router.navigate(['/home']);
          
        });
      }

    }
  }
  
  ngOnInit() {
    if(sessionStorage.getItem('uname'))
    {
      this.router.navigate(['/home'])
    }
    this.display=false;
  }

}
