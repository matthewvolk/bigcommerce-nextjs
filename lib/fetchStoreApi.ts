const fetchStoreAPI = async (path: string, config: {method: string; headers: {}; body: string}) => {
  const url = `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH!}${path}`;
  return await fetch(url, {
    method: config.method,
    headers: {
      'X-Auth-Token': process.env.BIGCOMMERCE_ACCESS_TOKEN!,
      'X-Auth-Client': process.env.BIGCOMMERCE_CLIENT_ID!,
      ...config.headers,
    },
    body: config.body,
  });
};

export default fetchStoreAPI;
