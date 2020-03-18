import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedin:boolean;
  uname:string;
  admin:boolean;

  constructor(private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('uname'))
    {
      this.loggedin=true;
      this.uname=sessionStorage.getItem('uname');
      if(sessionStorage.getItem('isUser')=='false')
      {
          this.router.navigate(['/reporter']);
      }
      if(sessionStorage.getItem('uname')=='admin')
      {
        this.router.navigate['/admin'];
      }
    
    }
    else
    {
      this.loggedin=false;
    }
  }

}
