import { CategoryService } from './../../../services/UserSite/category.service';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/UserSite/auth.service';

interface MainMenu {
  title: string;
  url: string;
  icon?: string;
  items: { label: string; url: string }[];
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isUserLogged: boolean | undefined;
  areaExpanded: boolean = false;
  activeMenu: number = 0;
  str: any = '';
  menus: MainMenu[] = [
    {
      icon: 'https://www.dubizzle.com.eg/assets/vehicles_noinline.f0509d15f4ed1cd4cb243005f067d354.svg',
      title: 'Vehicles',
      url: '',
      items: [
        { label: 'Car For Sell', url: 'Car-For-Sell'.toLowerCase() },
        { label: 'Car For Rent', url: 'Car-For-Rent'.toLowerCase() },
        { label: 'Car Spare Types', url: 'Car-pare-Types'.toLowerCase() },
        { label: 'Boats - Watercraft', url: 'Boats-Watercraft'.toLowerCase() },
        {
          label: 'Motorcycles & Accessories',
          url: 'Motorcycles-&-Accessories'.toLowerCase(),
        },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/property-for-rent_noinline.afd1b8bf81720cc538aba324a684f145.svg',
      title: 'Properties',
      url: '',
      items: [
        {
          label: 'Apartment & Duplex for Sale',
          url: 'Apartment-&-Duplex-for-Sale'.toLowerCase(),
        },
        {
          label: 'Apartment & Duplex for Rent',
          url: 'Apartment-&-Duplex-for-Rent'.toLowerCase(),
        },
        { label: 'Villas for Sale', url: 'Villas-for-Sale'.toLowerCase() },
        { label: 'Villas for Rent', url: 'Villas-for-Rent'.toLowerCase() },
        {
          label: 'Vacations Homes for Sale',
          url: 'Vacations-Homes-for-Sale'.toLowerCase(),
        },
        {
          label: 'Vacations Homes for Rent',
          url: 'Vacations-Homes-for-Rent'.toLowerCase(),
        },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/mobiles_noinline.09d825b23596fb63149b624156d2b3a9.svg',
      title: 'Mobile & Tablets',
      url: '',
      items: [
        {
          label: 'Mobile Phones',
          url: 'Mobile-Phones'.toLowerCase(),
        },
        {
          label: 'Tablets',
          url: 'Tablets'.toLowerCase(),
        },
        {
          label: 'Mobile & Tablet Accessories',
          url: 'Mobile-&-Tablet-Accessories'.toLowerCase(),
        },
        { label: 'Mobile Numbers ', url: 'Mobile-Numbers'.toLowerCase() },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/jobs_noinline.6dd8e91ce71156d44df7794f802bab46.svg',
      title: 'Jobs',
      url: '',
      items: [
        {
          label: 'Accounting, Finance & Banking',
          url: 'Accounting,-Finance-&-Banking'.toLowerCase(),
        },
        {
          label: 'Engineering ',
          url: 'Engineering'.toLowerCase(),
        },
        { label: 'Designers', url: 'Designers'.toLowerCase() },
        {
          label: 'Customer Service & Call Center',
          url: 'Customer-Service-&-Call-Center'.toLowerCase(),
        },
        {
          label: 'Workers and Technicians ',
          url: 'Workers-and-Technicians '.toLowerCase(),
        },
        {
          label: 'Drivers & Delivery ',
          url: 'Drivers-&-Delivery '.toLowerCase(),
        },
        { label: 'Education', url: 'Education' },
        { label: 'HR', url: 'HR' },
        { label: 'Other Job', url: 'Other-Job'.toLowerCase() },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/electronics_noinline.c7ce1083110c746b61c464da1aee2cac.svg',
      title: 'Electronics & Appliances',
      url: '',
      items: [
        {
          label: 'TV Audio Video',
          url: 'TV-Audio-Video'.toLowerCase(),
        },
        {
          label: 'Computers & Accessories',
          url: 'Computers-&-Accessories'.toLowerCase(),
        },
        { label: 'Video games', url: 'Video-games'.toLowerCase() },
        { label: 'Cameras & Imaging', url: 'Cameras-&-Imaging'.toLowerCase() },
        { label: 'Home Appliances', url: 'Home-Appliances'.toLowerCase() },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/furniture_noinline.4b36f5f518ccf6cdd3a14a4eeb4da403.svg',
      title: 'Furniture & Decor',
      url: '',
      items: [
        {
          label: 'Bathroom',
          url: 'Bathroom'.toLowerCase(),
        },
        {
          label: 'Bedroom',
          url: 'Bedroom'.toLowerCase(),
        },
        { label: 'Dining Room', url: 'Dining-Room'.toLowerCase() },
        {
          label: 'Fabrics & Curtains & Carpets',
          url: 'Fabrics-&-Curtains-&-Carpets'.toLowerCase(),
        },
        { label: 'Garden & Outdoor', url: 'Garden-&-Outdoor'.toLowerCase() },
        { label: 'Home Decoration', url: 'Home-Decoration'.toLowerCase() },
        {
          label: 'Kitchen & Kitchenware',
          url: 'Kitchen-&-Kitchenware'.toLowerCase(),
        },
        { label: 'Lighting Tools', url: 'Lighting-Tools'.toLowerCase() },
        { label: 'Living Room', url: 'Living-Room'.toLowerCase() },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/kids_noinline.d100f6ef5e92135a30de2205076c0387.svg',
      title: 'Kids & Babies',
      url: '',
      items: [
        {
          label: 'Baby & Mom Healthcare',
          url: 'Baby-&-Mom-Healthcare'.toLowerCase(),
        },
        { label: 'Baby Clothing', url: 'Baby-Clothing'.toLowerCase() },
        {
          label: 'Baby Feeding Tools',
          url: 'Baby-Feeding-Tools'.toLowerCase(),
        },
        {
          label: 'Cribs & Strollers & Carriers',
          url: 'Cribs-&-Strollers-&-Carriers'.toLowerCase(),
        },
        { label: 'Toys', url: 'Toys'.toLowerCase() },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/fashion_noinline.aa9c471af6b5ad17c4dad441c5d84e08.svg',
      title: 'Fashion & Beauty',
      url: '',
      items: [
        { label: 'Women’s Clothing', url: 'Women’s-Clothing'.toLowerCase() },
        { label: 'Men’s Clothing', url: 'Men’s-Clothing'.toLowerCase() },
        {
          label:
            'Women’s Accessories & Cosmetics & Personal Care'.toLowerCase(),
          url: 'Women’s-Accessories-&-Cosmetics-&-Personal-Care'.toLowerCase(),
        },
        {
          label: 'Men’s Accessories & Personal Care'.toLowerCase(),
          url: 'Men’s-Accessories-&-Personal-Care'.toLowerCase(),
        },
      ],
    },
    {
      icon: 'https://www.dubizzle.com.eg/assets/animals_noinline.ea36bd3329bb1702bd147f401aedfa47.svg',
      title: 'Pets',
      url: '',
      items: [
        { label: 'birds', url: 'birds'.toLowerCase() },
        { label: 'Cats', url: 'cats'.toLowerCase() },
        { label: 'dogs', url: 'dogs'.toLowerCase() },
      ],
    },
    // ,"Properties","Mobile&Tablets"
  ];

  constructor(
    private AuthServices: AuthService,
    private categoryService: CategoryService
  ) {
    // this.isUserLogged=AuthServices.isUserLogged
  }
  ngOnInit(): void {
    this.isUserLogged = this.AuthServices.isUserLogged;
    this.AuthServices.getUserloggedStatus().subscribe((status) => {
      this.isUserLogged = status;
      console.log(`"user"${this.isUserLogged}`);
    });
  }
  changeslug(e: any) {
    this.str = e.target.innerText;
    console.log(e);
    this.str = this.str.split(' ');
    this.str = this.str.join('-');
    this.str = this.str.toLowerCase();

    this.categoryService.setvalue = this.str;
  }
  logout() {
    this.AuthServices.logout();
    this.isUserLogged = this.AuthServices.isUserLogged;
  }

  toggleMenu(menuNumber: number) {
    this.activeMenu = menuNumber;
    this.areaExpanded = !this.areaExpanded;
  }
}
