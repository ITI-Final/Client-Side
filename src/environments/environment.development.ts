export const environment = {
    production: true,
    APIURL: 'http://localhost:3000',
    endPoint: "https://localhost:7094/api/",
    domain: 'https://localhost:7094/',
    Admin: () => environment.endPoint + "Admins",
    Companies: () => environment.endPoint + "Companies",
    User: () => environment.endPoint + "Users",
    categorywithPost: () => environment.endPoint + 'Categories/withPosts',
    AllCategories: () => environment.endPoint + 'Categories',
    getRandomImages: () => environment.endPoint + 'Images',
    DefaultIMG : "../../../../assets/images/default.jpg",
    Gender: (gender :boolean | null) => gender ? "Male" : "Female",
};
