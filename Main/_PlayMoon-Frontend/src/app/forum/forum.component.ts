import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) { 
    
  }

  ngOnInit(): void {
    this.router.navigate(['catagories'], {relativeTo: this.route})
    this.titleService.setTitle('PlayMoon - Forum')
  }

}
