import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (foodItem) => {
    setCartItems(prevItems => {
      const exists = prevItems.find(item => item.id === foodItem.id);
      if (exists) {
        return prevItems;
      } else {
        return [...prevItems, { ...foodItem, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
      )
    );
  };

  // ✅ ADD THIS
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount,
        subtotal,
        clearCart   // ✅ NOW WORKS
      }}
    >
      {children}
    </CartContext.Provider>
  );
}