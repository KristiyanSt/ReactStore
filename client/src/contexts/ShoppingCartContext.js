import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart.js";
import { ProductsContext } from "./ProductsCtx.js";

export const ShoppingCartContext = createContext();

export default function ShoppingCartProvider({ children }) {

    const [cart, setCart] = useLocalStorage('cart', []);
    const [isOpen, setIsOpen] = useState(false);


    function increaseProductQuantity(productId) {

        if (cart.some(x => x.productId == productId)) {
            return setCart(cart.map(x => x.productId == productId
                ? { ...x, quantity: x.quantity + 1 }
                : x
            ));
        }

        return setCart([...cart, { productId, quantity: 1}]);
    }
    function decreaseProductQuantity(productId) {
        if (cart.find(x => x.productId == productId).quantity == 1) {
            return setCart(cart.filter(x => x.productId != productId));
        }

        return setCart(cart.map(x => x.productId == productId
            ? { ...x, quantity: x.quantity - 1 }
            : x
        ));
    }
    function removeFromCart(productId) {
        return setCart(cart.filter(x => x.productId != productId));
    }
    function getQuantityInCart(productId) {
        return cart.find(x => x.productId == productId)?.quantity || 0;
    }
    function closeCart() {
        setIsOpen(false);
    }
    function showCart() {
        setIsOpen(true)
    }

    const cartQuantity = cart.reduce((acc,item) => acc += item.quantity,0);

    const context = {
        cart,
        cartQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeFromCart,
        getQuantityInCart,
        isOpen,
        showCart,
        closeCart
    }

    return <ShoppingCartContext.Provider value={context}>
        {children}
    </ShoppingCartContext.Provider>
}