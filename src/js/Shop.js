import { createCategories } from "./app/caregories";
import initialRender from "./core/initialRender";
import listener from "./core/listener";

class Shop{
    init(){
        console.log("Shop App Running");
        initialRender();
        listener();
    }
}

export default Shop;