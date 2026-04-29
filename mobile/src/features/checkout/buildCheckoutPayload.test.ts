import { buildCheckoutPayload } from './buildCheckoutPayload';

describe('buildCheckoutPayload', () => {
  it('calculates totals and serializes cart lines', () => {
    const firstProduct = {
      id: 'nova-330-40',
      name: { ar: 'نوفا 330 مل', en: 'Nova 330ml' },
      price: 12,
      image: '/images/products_refined/nova-330-40.jpg',
    } as any;

    const payload = buildCheckoutPayload({
      locale: 'en',
      customerName: 'Maha',
      phone: '0500000000',
      address: 'Riyadh',
      items: [{ product: firstProduct, quantity: 2 }],
    });

    expect(payload.customerName).toBe('Maha');
    expect(payload.items).toHaveLength(1);
    expect(payload.items[0]?.lineTotal).toBe(firstProduct.price * 2);
    expect(payload.finalTotal).toBe(payload.subtotal + payload.deliveryFee);
  });
});
