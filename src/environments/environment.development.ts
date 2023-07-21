export const environment = {
    production: true,
    APIURL: 'http://localhost:3000',
    endPoint: "https://localhost:7094/api/",
    Admin: () => environment.endPoint + "Admins",
    Companies: () => environment.endPoint + "Companies",
    User: () => environment.endPoint + "Users",

    DefaultIMG : "../../../../assets/images/default.jpg",
    Gender: (gender :boolean | null) => gender ? "Male" : "Female",
}
;
