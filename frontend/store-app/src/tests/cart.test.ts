import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../stores/cartStore';

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should add an item to the cart', () => {
    const product = {
      productId: '1',
      vendorId: 'vendor-1',
      name: 'Test Product',
      price: 10,
      quantity: 1,
      image: 'test.jpg',
    };

    useCartStore.getState().addItem(product);
    const state = useCartStore.getState();

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(product);
    expect(state.getTotalItems()).toBe(1);
    expect(state.getTotalPrice()).toBe(10);
  });

  it('should increment quantity if item already exists', () => {
    const product = {
      productId: '1',
      vendorId: 'vendor-1',
      name: 'Test Product',
      price: 10,
      quantity: 1,
      image: 'test.jpg',
    };

    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.getTotalPrice()).toBe(20);
  });

  it('should remove an item', () => {
    const product = {
      productId: '1',
      vendorId: 'vendor-1',
      name: 'Test Product',
      price: 10,
      quantity: 1,
      image: 'test.jpg',
    };

    useCartStore.getState().addItem(product);
    useCartStore.getState().removeItem('1');
    
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
