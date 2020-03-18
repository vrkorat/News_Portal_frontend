import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import axios from 'axios'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profile:object
  display:boolean;
  constructor(private routes:Router) { }

  ngOnInit() {
    
  }

}
