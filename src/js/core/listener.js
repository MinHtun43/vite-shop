import { handlerCardItem } from "../app/card";
import { handlerCategory } from "../app/caregories";
import { handlerProduct } from "../app/products";
import { cardItemGroup, categoryGroup, productGroup } from "./selectors";

const listener = () => {
     categoryGroup.addEventListener("click" , handlerCategory)
     productGroup.addEventListener("click" , handlerProduct)
     cardItemGroup.addEventListener("click", handlerCardItem)
}
export default listener;