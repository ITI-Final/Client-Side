export interface Posts {
    "id"?: number,
    "user_Id"?: any,
    "cat_Id"?: any,
    "title"?: string,
    "description"?: string,
    "price"?: any,
    "date"?:any
    "price_Type"?: number,
    "contact_Method"?: number,
    "post_Location"?: number,
    "post_LocationNavigation"?: {
      "id"?: number,
      "governorate_Id"?: number,
      "city_Name_Ar"?: string,
      "city_Name_En"?: string,
      "governorate"?: {
        "id"?: number,
        "governorate_Name_Ar"?: string,
        "governorate_Name_En"?: string,
      
      },}
      // "post_Images"?:any
      "post_Images": [
        {
          "id"?: number,
          "post_Id"?: number,
          "image"?: string,
          "post"?: any
        }]
  



}