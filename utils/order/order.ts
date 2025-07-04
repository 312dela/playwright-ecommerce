import { request } from "@playwright/test";

export async function createOrder(token: string, productId: string = '67a8df56c0d3e6622a297ccd') {
  const context = await request.newContext({
    extraHTTPHeaders: { Authorization: token }
  });

  const response = await context.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: {
      orders: [
        {
          country: 'Indonesia',
          productOrderedId: productId
        }
      ]
    }
  });

  return response.json();
}

export async function getOrderDetails(orderId: string, token: string, failOnStatusCode = true) {
  const context = await request.newContext({
    extraHTTPHeaders: { Authorization: token }
  });

  const response = await context.get(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${orderId}`);
  if (failOnStatusCode && response.status() !== 200) {
    throw new Error(`Unexpected status: ${response.status()}`);
  }
  return response;
}