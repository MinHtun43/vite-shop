import Swal from "sweetalert2";
import {
  cardCount,
  cardItemCount,
  cardItemTemplate,
  cardItemTotal,
} from "../core/selectors";

export const createCard = (product, qualtity) => {
  const template = cardItemTemplate.content.cloneNode(true);
  template.querySelector(".product-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".product-item-price").innerText = product.price;
  template.querySelector(".product-qualtity").innerText = qualtity;
  return template;
};

export const countCardItem = () => {
  const totalCardItem = document.querySelectorAll(".card-item");
  return totalCardItem.length;
};

export const updateCardCount = () => {
  const currentCount = countCardItem();
  cardCount.innerText = currentCount;
  cardItemCount.innerText = currentCount;
};

export const countCardCostTotal = () => {
     const total = [...document.querySelectorAll(".product-item-price")].reduce(
          (pv , cv) => pv + parseFloat(cv.innerText) ,0
     )
     return total;
}

export const updateCardTotal = () => {
    const total = countCardCostTotal().toFixed(2);
    cardItemTotal.innerText = total;
} 

export const handlerCardItem = (event) => {
      if(event.target.classList.contains("card-item-remove")){
          const currentItem = event.target.closest(".card-item");
          
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!"
             }).then((result) => {
               if (result.isConfirmed) {
                 currentItem.remove();
                 updateCardCount();
                 updateCardTotal();
               }
             });
      }
}