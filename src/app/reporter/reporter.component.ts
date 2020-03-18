import { Component, OnInit } from '@angular/core';
import axios  from 'axios';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload'

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.css']
})
export class ReporterComponent implements OnInit {


  news:object[]


  postid:string;
  uname:string;
  show:boolean;
  headline:string;
  desc:string;
  date:Date;
  status:string="";
  display:boolean;
  add:boolean;
  delete:boolean;
  update:boolean;
  genere:string;
  fileToUpload:File=null;

  constructor(private router:Router) { }

  handleFile(files:FileList){
    this.fileToUpload=files.item(0);
  }

  addTrue(){
    this.add=true;
    this.delete=false;
    this.update=false;
    this.display=true;
    this.status="";
  }

  updateTrue(){
    this.add=false;
    this.delete=false;
    this.update=true;
    this.display=true;
    this.status="";
  }

  deleteTrue(){
    axios({
      method:"post",
      url:"http://localhost:3000/getReporterNews",
      data:{
        name:sessionStorage.getItem('uname')
      }
    }).then((res)=>{
        
      this.news=res.data;  
      console.log("post for reporter is fetched")
      console.log(this.news)
    });
    this.add=false;
    this.delete=true;
    this.update=false;
    this.display=true;
    this.status="";
  }

  getHeadline=(event)=>{
    this.headline=event.target.value;
  }
  getDesc=(event)=>{
    this.desc=event.target.value;
  }

  addAction(){
    var bodyFormData=new FormData();
    this.uname=sessionStorage.getItem('uname');
    console.log("user is:",this.uname);
    bodyFormData.append('img',this.fileToUpload)
    bodyFormData.append('headline',this.headline)
    bodyFormData.append('desc',this.desc)
    bodyFormData.append('name',this.uname)
    bodyFormData.append('genre',this.genere)
    bodyFormData.append('date',this.date.toString())
    axios.put('http://localhost:3000/uploadPost',bodyFormData).then(res=>{
      console.log(res.data)
      this.status="Post uploaded successfully!!"
      this.router.navigate(['/home'])
      window.alert(this.status)
    }).catch(e=>{
      console.log(e)
    })

  }

  deleteThis(i:number){
    this.postid= this.news[i]['postid'];
    window.alert("Post deleted successfully")
    this.news.splice(i,1);
    axios({
      method:"post",
      url:"http://localhost:3000/deleteThisPost",
      data:{
        postid:this.postid
      }
    }).then((res)=>{
  
      console.log("post deleted")
      console.log(res.data)
      console.log(this.news)
    });

  }

  ngOnInit() {



    if(sessionStorage.getItem('uname') && sessionStorage.getItem('isUser')=="false"){
      this.uname=sessionStorage.getItem('uname');
      console.log(this.uname);
      this.show=true;
    }
    else
    {
      this.router.navigate(['/home']);
    }
    this.display=false;


  }

}
