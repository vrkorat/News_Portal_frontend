import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  axios from 'axios';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  rname:string
  fname:string
  lname:string
  dob:string
  email:string

  reporters:object[]
  loggedin:boolean
  repo:object
  reporternews:object[]
  totalposts:number

  constructor(private router:Router) { }

  deleteReporter(i:number){
    this.reporters.splice(i,1);
    axios({
      method:"post",
      url:"http://localhost:3000/deleteReporter",
      data:{
       name:this.reporters[i]['rname']
      }
    }).then((res)=>{
      
      window.alert("Reported Deleted successfully")
      console.log("reporter is deleted")
      console.log(res.data)
    });
  }

  getProfile(i:number){
    this.repo=this.reporters[i]
    this.fname=this.reporters[i]['fname']
    this.lname=this.reporters[i]['lname']
    this.rname=this.reporters[i]['rname']
    this.dob=this.reporters[i]['dob']
    this.email=this.reporters[i]['email']
    axios({
      method:"post",
      url:"http://localhost:3000/getReporterNews",
      data:{
       name:this.reporters[i]['rname']
      }
    }).then((res)=>{
      
      this.reporternews=res.data
      this.totalposts=this.reporternews.length
      console.log("reporter details fetched")
      console.log(res.data)
    });
  }

  ngOnInit() {
    if(sessionStorage.getItem('isUser')=='admin' && sessionStorage.getItem('uname')){
      this.loggedin=true;
      axios({
        method:"post",
        url:"http://localhost:3000/getReporters",
        data:{
         
        }
      }).then((res)=>{
        
        this.reporters=res.data;
        console.log("reporters are fetched")
        console.log(this.reporters)
      });
    }
    else{
      this.router.navigate(['/home']);
    }
  }

}
