import { Session } from '@shopify/shopify-api';

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY as string;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET as string;
const SCOPES = ['read_products', 'write_orders'];
const HOST = process.env.HOST as string;

export async function generateAuthUrl(shop: string): Promise<string> {
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES.join(',')}&redirect_uri=${HOST}/auth/callback`;
  return authUrl;
}

export async function handleAuthCallback(shop: string, code: string): Promise<Session> {
  const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to obtain access token');
  }

  const data = await response.json();
  return new Session(shop, data.access_token);
}

export async function getShopifyProducts(session: Session): Promise<any[]> {
  const response = await fetch(`https://${session.shop}/admin/api/2023-04/products.json`, {
    headers: {
      'X-Shopify-Access-Token': session.accessToken,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.products;
}

