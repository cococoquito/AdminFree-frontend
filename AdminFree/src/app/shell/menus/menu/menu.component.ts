import { Component, OnInit } from '@angular/core';
import { ShellService } from '../../../core/services/shell.service';

@Component({
  selector: 'admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public shell: ShellService) { }

  ngOnInit() {
  }

}
