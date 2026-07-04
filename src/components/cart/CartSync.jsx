import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { saveUserCart } from '../../api';

export default function CartSync() {
  const cart = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.user);
  const prevCartRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const currentCart = JSON.stringify(cart);
    if (prevCartRef.current === currentCart) return; // no change

    prevCartRef.current = currentCart;

    // Convert cart items to backend format
    const items = cart.items.map(item => ({
      product: item._id,   // MongoDB product ID
      quantity: item.quantity,
    }));

    saveUserCart(items).catch(err => console.error('Cart sync failed:', err));
  }, [cart, isAuthenticated]);

  return null;
}