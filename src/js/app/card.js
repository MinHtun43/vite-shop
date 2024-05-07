import Swal from "sweetalert2";
import {
  cardCount,
  cardItemCount,
  cardItemTemplate,
  cardItemTotal,
  productGroup,
} from "../core/selectors";

export const createCard = (product, qualtity) => {
  const template = cardItemTemplate.content.cloneNode(true);
  template.querySelector(".card-item").setAttribute("card-product-id" , product.id )
  template.querySelector(".product-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".product-item-price").innerText = product.price;
  template.querySelector(".product-item-cost").innerText = product.price * qualtity;
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
     const total = [...document.querySelectorAll(".product-item-cost")].reduce(
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
          const currentProductId = currentItem.getAttribute("card-product-id");
          
          
          
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
                 const currentProduct = productGroup.querySelector(`[product-id = '${currentProductId}']`);
                 if(currentProduct){
                  const currentProductAddCardBtn = currentProduct.querySelector(".add-card-btn");
                 currentProductAddCardBtn.innerText = "Add to Card";
                 currentProductAddCardBtn.removeAttribute("disabled")
                 }
               }
             });
      }else if(event.target.classList.contains("add-q-btn")){
        const currentCard = event.target.closest(".card-item");
        const currentQualtity = currentCard.querySelector(".product-qualtity");
        const currentPrice = currentCard.querySelector(".product-item-price");
        const currentCost = currentCard.querySelector(".product-item-cost");

        currentQualtity.innerText = parseInt(currentQualtity.innerText) + 1;
        currentCost.innerText = (currentPrice.innerText * currentQualtity.innerText).toFixed(2);
        updateCardTotal()
        console.log("add btn");
      }
      else if(event.target.classList.contains("sub-q-btn")){
        const currentCard = event.target.closest(".card-item");
        const currentQualtity = currentCard.querySelector(".product-qualtity");
        const currentPrice = currentCard.querySelector(".product-item-price");
        const currentCost = currentCard.querySelector(".product-item-cost");

        if(currentQualtity.innerText > 1){
          currentQualtity.innerText = parseInt(currentQualtity.innerText) - 1;
        currentCost.innerText = (currentPrice.innerText * currentQualtity.innerText).toFixed(2);
        updateCardTotal()
        }else{
          const currentItem = event.target.closest(".card-item");
          const currentProductId = currentItem.getAttribute("card-product-id");
          const currentProduct = productGroup.querySelector(`[product-id = '${currentProductId}']`);

          const currentProductAddCardBtn = currentProduct.querySelector(".add-card-btn");
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
              currentProductAddCardBtn.innerText = "Add to Card";
                 currentProductAddCardBtn.removeAttribute("disabled")
            }
          });
        }
        console.log("sub btn");
      }
}