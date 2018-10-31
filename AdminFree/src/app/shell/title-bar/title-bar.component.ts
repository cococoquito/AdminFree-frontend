import { ScreenService } from './../services/screen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(public screenService: ScreenService) { }

  ngOnInit() {
  }

}
