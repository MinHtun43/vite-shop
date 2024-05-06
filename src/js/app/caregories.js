import { products } from "../core/data";
import { categoryGroup, categoryTemplate } from "../core/selectors";
import { renderProduct } from "./products";

export const createCategories = (categoryName) => {
      const template = categoryTemplate.content.cloneNode(true);
      template.querySelector(".cat-btn").innerText = categoryName;
      return template;
}

export const renderCategories = (categories) => {
  categories.forEach(cat => categoryGroup.append(createCategories(cat)));
  
}


export const handlerCategory  = (event) => {
   if(event.target.classList.contains("cat-btn")){
      const currentCategoryBtn = event.target;
      document.querySelector(".cat-btn.active")?.classList.remove("active");
      currentCategoryBtn.classList.add("active")
      const currentCategory = event.target.innerText;
      renderProduct(products.filter(el => el.category === currentCategory || currentCategory === "All"))
   }
}