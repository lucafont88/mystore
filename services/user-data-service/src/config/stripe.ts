import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) throw new Error('STRIPE_API_KEY is not configured');
    _stripe = new Stripe(apiKey);
  }
  return _stripe;
}
