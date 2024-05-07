import { products } from "../core/data";
import {
  cardItemGroup,
  openDrawer,
  productGroup,
  productTemplate,
} from "../core/selectors";
import {
  countCardItem,
  createCard,
  updateCardCount,
  updateCardTotal,
} from "./card";

export const createStar = (rate) => {
  let star = "";
  for (let i = 1; i <= 5; i++) {
    star += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-4 h-4 ${
            i <= Math.round(rate) ? "fill-gray-700" : "fill-gray-400"
          }">
          <path fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clip-rule="evenodd" />
        </svg>`;
  }
  return star;
};

export const createProduct = (product) => {
  const template = productTemplate.content.cloneNode(true);
  template
    .querySelector(".product-card")
    .setAttribute("product-id", product.id);
  template.querySelector(".product-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".product-description").innerText =
    product.description;
  template.querySelector(
    ".product-rating"
  ).innerText = `(${product.rating.rate} / ${product.rating.count} )`;
  template.querySelector(".product-price").innerText = product.price;

  template.querySelector(".product-star").innerHTML = createStar(
    product.rating.rate
  );

  const isExitedInCard = cardItemGroup.querySelector(
    `[card-product-id='${product.id}']`
  );
  if (isExitedInCard) {
    template.querySelector(".add-card-btn").setAttribute("disabled", "true");
    template.querySelector(".add-card-btn").innerText = "Added...";
  }

  return template;
};

export const renderProduct = (products) => {
  productGroup.innerHTML = null;
  products.forEach((pro) => productGroup.append(createProduct(pro)));
};

export const handlerProduct = (event) => {
  if (event.target.classList.contains("add-card-btn")) {
    const currentBtn = event.target;
    currentBtn.setAttribute("disabled", "true");
    currentBtn.innerText = "Added...";
    const currentProductCard = event.target.closest(".product-card");
    const currentProductId = parseInt(
      currentProductCard.getAttribute("product-id")
    );
    const currentProduct = products.find(
      (product) => product.id === currentProductId
    );

    console.log(openDrawer.getBoundingClientRect());

    const currentProductImg = currentProductCard.querySelector(".product-img");
    const animateImg = new Image();
    animateImg.classList.add("z-20");
    animateImg.src = currentProductImg.src;
    animateImg.style.position = "fixed";
    animateImg.style.top = currentProductImg.getBoundingClientRect().top + "px";
    animateImg.style.left =
      currentProductImg.getBoundingClientRect().left + "px";
    animateImg.style.width =
      currentProductImg.getBoundingClientRect().width + "px";
    animateImg.style.height =
      currentProductImg.getBoundingClientRect().height + "px";
    // animateImg.style.border = "5px solid black"
    console.log(animateImg);
    document.body.append(animateImg);

    const keyframe = [
      {
        top: currentProductImg.getBoundingClientRect().top + "px",
        left: currentProductImg.getBoundingClientRect().left + "px",
      },
      {
        top: openDrawer.querySelector("svg").getBoundingClientRect().top + "px",
        left:
          openDrawer.querySelector("svg").getBoundingClientRect().left + "px",
        width: "0px",
        height: "0px",
        transform: "rotate(2turn)",
      },
    ];
    const duration = 500;
    const addToCardAnimation = animateImg.animate(keyframe, duration);

    const addToCardAnimationHandler = () => {
      animateImg.remove();
      openDrawer.classList.add("animate__tada");
      openDrawer.addEventListener("animationend", () => {
        openDrawer.classList.remove("animate__tada");
      });
      cardItemGroup.append(createCard(currentProduct , 1))
          updateCardCount();
          updateCardTotal();
          // console.log(currentProductCard);
          // countCardItem();
    };
    addToCardAnimation.addEventListener("finish", addToCardAnimationHandler);
  }
};
