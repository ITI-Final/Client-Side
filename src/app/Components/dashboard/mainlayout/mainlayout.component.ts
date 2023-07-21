import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainlayoutComponent implements OnInit {
  isMenu:{ Opened : boolean , Fixed : boolean} = { Opened : true , Fixed : false};

  ngOnInit(): void {
      // Check the window size and update isMenuOpened accordingly
      this.isMenu.Opened = window.innerWidth >= 1200; // Adjust the breakpoint as needed
      this.isMenu.Fixed = window.innerWidth <= 992;
  }


  changeMenuState(state:any){
    this.isMenu  = state
  }

}
