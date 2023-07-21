import { Component } from '@angular/core';

interface SlideShow {
  image :string;
  url : string;
}

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  slides : SlideShow[] = [
    {image:"https://static.vecteezy.com/system/resources/previews/023/905/134/non_2x/christmas-background-with-fir-branches-and-garland-horizontal-banner-with-festive-elements-great-for-ads-flyers-backgrounds-and-more-winter-background-vector.jpg",url:"#"},
    {image:"https://static.vecteezy.com/system/resources/previews/003/566/555/non_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg",url:"#"},
    {image:"https://static.vecteezy.com/system/resources/previews/024/302/482/non_2x/summer-sale-horizontal-banner-with-orange-fruit-cutaway-vector.jpg",url:"#"},
    {image:"https://static.vecteezy.com/system/resources/previews/003/586/294/non_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg",url:"#"},
    {image:"https://previews.123rf.com/images/avgust01/avgust011903/avgust01190300028/124429726-summer-sale-advertisement-banner-horizontal-banner-with-realistic-glass-bottle-with-message.jpg",url:"#"},
    {image:"https://static.vecteezy.com/system/resources/previews/003/566/561/large_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg",url:"#"},
  ]
}
