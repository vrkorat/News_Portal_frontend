import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios  from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor(private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('isUser')=='admin')
    {
      this.router.navigate(['/admin']);
    }
    
  }

}
