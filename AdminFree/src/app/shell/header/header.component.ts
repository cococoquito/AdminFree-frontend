import { Component, OnInit } from '@angular/core';
import { ShellService } from './../../core/services/shell.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public shell: ShellService) { }

  ngOnInit() {
  }

}
