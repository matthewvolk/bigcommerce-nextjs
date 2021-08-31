import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const existingCartId = JSON.parse(req.body).cartId;

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN as string,
      },
      body: existingCartId
        ? JSON.stringify({
            line_items: [{quantity: 1, product_id: JSON.parse(req.body).product_id}],
          })
        : JSON.stringify({
            channel_id: process.env.BIGCOMMERCE_NEXTJS_CHANNEL_ID,
            line_items: [
              {
                quantity: 1,
                product_id: JSON.parse(req.body).product_id,
              },
            ],
          }),
    };
    let requestUrl = existingCartId
      ? `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/carts/${existingCartId}/items?include=redirect_urls`
      : `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/carts?include=redirect_urls`;

    const response = await fetch(requestUrl, config);
    const {
      data: {id: cartId},
      data: {
        redirect_urls: {checkout_url: url},
      },
    } = await response.json();
    res.status(200).json({url, cartId});
  } else {
    res.status(404).json({error: {code: 404, msg: 'Not Found'}});
  }
}
