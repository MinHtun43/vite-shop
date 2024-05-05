import { renderCategories } from "../app/caregories";
import { renderProduct } from "../app/products";
import { categories, products } from "./data";

const initialRender = () => {
     renderCategories(categories);
     renderProduct(products);
}
export default initialRender;