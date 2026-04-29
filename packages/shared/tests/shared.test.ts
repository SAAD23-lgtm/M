import { describe, expect, it } from 'vitest';
import {
  buildContactWhatsAppLink,
  formatSarPrice,
  localizeText,
  products,
} from '../src';

describe('shared helpers', () => {
  it('localizes Arabic and English text', () => {
    expect(localizeText({ ar: 'مياه', en: 'Water' }, true)).toBe('مياه');
    expect(localizeText({ ar: 'مياه', en: 'Water' }, false)).toBe('Water');
  });

  it('formats SAR values for both locales', () => {
    expect(formatSarPrice(15, true)).toContain('ر.س');
    expect(formatSarPrice(15, false)).toBe('SAR 15.00');
  });

  it('creates a whatsapp link containing the customer name', () => {
    const link = buildContactWhatsAppLink(
      {
        name: 'Sara',
        email: 'sara@example.com',
        phone: '0500000000',
        subject: 'Order',
        message: 'Need a delivery today',
      },
      false
    );

    expect(link).toContain('wa.me');
    expect(decodeURIComponent(link)).toContain('Sara');
  });

  it('exposes the shared catalog', () => {
    expect(products.length).toBeGreaterThan(10);
  });
});
