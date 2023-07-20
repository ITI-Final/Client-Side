import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/UserSite/auth.service';


interface MainMenu{
  title:string;
  url:string;
  icon?:string;
  items : {label:string,url:string}[]
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isUserLogged:boolean|undefined;
  areaExpanded:boolean = false;
  activeMenu : number = 0;


  menus : MainMenu[] = [
    {icon:"https://www.dubizzle.com.eg/assets/vehicles_noinline.f0509d15f4ed1cd4cb243005f067d354.svg",title:"Vehicles",url:"",items: 
      [
        {label:"Car For Sell",url:""},
        {label:"Car For Rent",url:""},
        {label:"Car Spare Types",url:""},
        {label:"Boats - Watercraft",url:""},
        {label:"Motorcycles & Accessories",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/property-for-rent_noinline.afd1b8bf81720cc538aba324a684f145.svg",title:"Properties",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/mobiles_noinline.09d825b23596fb63149b624156d2b3a9.svg",title:"Mobile & Tablets",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/jobs_noinline.6dd8e91ce71156d44df7794f802bab46.svg",title:"Jobs",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/electronics_noinline.c7ce1083110c746b61c464da1aee2cac.svg",title:"Electronics & Appliances",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/furniture_noinline.4b36f5f518ccf6cdd3a14a4eeb4da403.svg",title:"Furniture & Decor",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/kids_noinline.d100f6ef5e92135a30de2205076c0387.svg",title:"Kids & Babies",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/fashion_noinline.aa9c471af6b5ad17c4dad441c5d84e08.svg",title:"Fashion & Beauty",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    {icon:"https://www.dubizzle.com.eg/assets/animals_noinline.ea36bd3329bb1702bd147f401aedfa47.svg",title:"Pets",url:"",items: 
      [
        {label:"Apartment & Duplex for Sale",url:""},
        {label:"Apartment & Duplex for Rent",url:""},
        {label:"Villas for Sale",url:""},
        {label:"Villas for Rent",url:""},
        {label:"Vacations Homes for Sale",url:""},
        {label:"Vacations Homes for Rent",url:""},
      ]
    },
    // ,"Properties","Mobile&Tablets"
  ]

  constructor(private AuthServices:AuthService) {
    // this.isUserLogged=AuthServices.isUserLogged
  }
  ngOnInit(): void {
     this.isUserLogged=this.AuthServices.isUserLogged
    this.AuthServices.getUserloggedStatus().
    subscribe(status=>{this.isUserLogged=status
      console.log(`"user"${this.isUserLogged}`)
 })
  }
  logout(){
    this.AuthServices.logout()
    this.isUserLogged=this.AuthServices.isUserLogged
  }

  toggleMenu(menuNumber : number) {
    this.activeMenu = menuNumber
    this.areaExpanded = !this.areaExpanded;
  }
}
