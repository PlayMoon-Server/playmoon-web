import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.scss']
})
export class DiscordComponent implements OnInit {

  constructor(private router: Router) {
    window.location.href = 'http://discord.playmoon.de'
   }

  ngOnInit(): void {
  }

}
