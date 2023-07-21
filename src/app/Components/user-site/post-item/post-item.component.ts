import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  
  currenyFormat(money:number) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0
    });

    return USDollar.format(money);
  }

  @Input() post : {title:string,url:string,image:string,price: number,date:string,location:string} = {
    date:"2 days ago",
    image:"https://images.pexels.com/photos/5973856/pexels-photo-5973856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 40000,
    title:`Going on a business trip, traveling for leisure or looking for ancient
    Egyptian treasures? Cairo is the place to be. Explore the region’s
    ancient history alongside a bustling and fast-growing city with its
    dizzying diversity.`,
    url:"#",
    location: "Dyar, New Cairo - El Tagamoa"
  }

}
