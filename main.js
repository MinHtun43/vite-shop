import Shop from './src/js/Shop'
import { createProduct } from './src/js/app/products';
// import { products } from './src/js/core/data';
// import { createCategories } from './src/js/app/caregories';
import './style.css'
import 'flowbite'

const shop = new Shop;
shop.init();

// console.log(createCategories("hello"));
// console.log(createProduct(products[1]));