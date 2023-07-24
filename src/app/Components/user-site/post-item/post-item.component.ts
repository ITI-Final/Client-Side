import { Component, Input } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Route,
  Router,
} from '@angular/router';
import { CategoryService } from 'src/app/services/UserSite/category.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() post: any;
  @Input() category: any = '';
  Catposts: any = [];
  domain = environment.domain;
  currenyFormat(money: number) {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    });
    return USDollar.format(money);
  }


}
