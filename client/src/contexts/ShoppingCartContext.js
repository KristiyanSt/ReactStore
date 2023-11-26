import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext.js"
import useLocalStorage from "../hooks/useLocalStorage.js"

export const ShoppingCartContext = createContext();

export default function ShoppingCartProvider({ children }) {
    const { user} = useContext(AuthContext);
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
    function clearCartFromLocalStorage() {
        setCart([]);
    }

    const cartQuantity = cart.reduce((acc,item) => acc += item.quantity,0);
    
    useEffect(() => {
        if(!user) {
            clearCartFromLocalStorage();
        }
    },[user]);

    const context = {
        cart,
        cartQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeFromCart,
        getQuantityInCart,
        isOpen,
        showCart,
        closeCart,
        clearCartFromLocalStorage
    }

    return <ShoppingCartContext.Provider value={context}>
        {children}
    </ShoppingCartContext.Provider>
}