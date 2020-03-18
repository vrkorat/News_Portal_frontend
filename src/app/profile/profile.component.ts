import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username:string;
  fname:string;
  lname:string;
  dob:string;
  email:string

  user:boolean=true;
  reporter:boolean=true;
  uprofile:object;
  rprofile:object;
  constructor(private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("uname") && sessionStorage.getItem("isUser") == "true")
    {
      console.log("user")
      this.user=true;
      this.reporter=false;
      axios({
          method:"post",
          url:"http://localhost:3000/userprofile",
          data:{
            name:sessionStorage.getItem("uname")
          }
      }).then((res)=>{
        this.uprofile=res.data;
        console.log(this.uprofile)
       
      });
    }
    else if(sessionStorage.getItem("uname") && sessionStorage.getItem("isUser") == "false"){
      console.log("repo");
      this.user=false;
      this.reporter=true;
      axios({
        method:"post",
        url:"http://localhost:3000/reporterprofile",
        data:{
          name:sessionStorage.getItem("uname")
        }
      }).then((res)=>{
        this.rprofile=res.data;
        this.username=this.rprofile['rname']
        this.fname=this.rprofile['fname']
        this.lname=this.rprofile['lname']
        this.email=this.rprofile['email']
        this.dob=this.rprofile['dob']
        console.log(this.rprofile)
     
      });
    }
    else
    {
      this.router.navigate["/home"];
    }
  }

}
