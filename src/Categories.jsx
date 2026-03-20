import { TiThSmallOutline } from "react-icons/ti";
import elec from "./assets/electronics.png"
import fash from "./assets/fashion.png"
import beauty from "./assets/beauty.jpg"
import hk from "./assets/home.jpg"
import Sports from "./assets/sports.jpg"
// import all from "./assets/emptycart.png"
import products from "./assets/products.jpg"


const Categories=[

    {
        id:1,
        name:"All Products",
        image:products
    },
   
    {
        id:2,
        name:"Electronics",
        image:elec
    },
    {
        id:3,
        name:"Fashion",
        image:fash
    },
    {
        id:4,
        name:"Beauty",
        image:beauty
    },
    {
        id:5,
        name:"Home & Kitchen",
        image:hk
    },
    {
        id:6,
        name:"Sports",
        image:Sports
    }

]
export default Categories;