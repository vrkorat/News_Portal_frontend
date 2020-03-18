import { Component, OnInit } from '@angular/core';
import axios  from 'axios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  headline:object;
  desc:string;
  date:Date;
  photo:string;

  show:boolean
  loggedin:boolean;
  postnum:number;
  news:object[];
  newsobj:object;
  genre:object[];
  nn:number;
  totallength:number;
  myArray:number[]=[1,2,2,2,2,2,2,2,2,2,2];
  constructor(private router:Router) {}

  setID(i:number){
    this.show=true
    this.postnum=i;
    this.nn=i;
    this.newsobj=this.news[i];
    this.headline=this.newsobj['headline']
    this.desc=this.newsobj['text']
    this.date=this.newsobj['dateadded']
    this.genre=this.newsobj['genre'];
    console.log(this.genre)
  }

  temporaryValue:object
  currentIndex:number

  ngOnInit() {
    this.show=false
    this.photo="http://localhost:3000/uploads/20180607_122113.jpg"
    if(sessionStorage.getItem('uname'))
    {
      this.loggedin=true;
      axios({
        method:"post",
        url:"http://localhost:3000/fetchNews",
        data:{
         user:sessionStorage.getItem('uname')
        }
      }).then((res)=>{
          
        this.news=res.data;  
        console.log(this.news)
      });
    }
    else
    {
      this.loggedin=false;
      axios({
        method:"post",
        url:"http://localhost:3000/fetchTrending",
        data:{
         
        }
      }).then((res)=>{
          
        this.news=res.data;  
        this.totallength=this.news.length;
        this.totallength = this.totallength / 3;
         console.log(this.news);
      });

    }
    

  }

}
