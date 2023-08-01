import { Component } from '@angular/core';

interface SlideShow {
  image :string;
  title:string;
  description:string;
  url : string;
}

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  slides : SlideShow[] = [
    {image:"../assets/images/slider-2.svg",title:"Welcome to Our Marketplace",description:"Discover amazing deals and unbeatable offers that await you. Shop the best selection at your one-stop shopping destination.",url:"#"},
    {image:"../assets/images/slider-1.svg",title:"Selling Made Simple",description:"List your items with ease and reach a wide audience of buyers. Experience fast and secure transactions to turn your stuff into cash.",url:"#"},
    {image:"../assets/images/slider-3.svg",title:"Find Your Perfect Purchase",description:"Explore exclusive products at unbeatable prices and shop with confidence. Discover a world of options as your dream purchase awaits.",url:"#"},
    {image:"../assets/images/slider-4.svg",title:"Customer Satisfaction Guaranteed",description:"Enjoy personalized customer support and hassle-free returns. Shop with peace of mind, knowing your satisfaction is our priority.",url:"#"}

  ]
}
