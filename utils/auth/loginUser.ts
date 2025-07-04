import { request } from '@playwright/test';

export async function loginUser(email: string, password: string) {
  const context = await request.newContext();
  const response = await context.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: {
      userEmail: email,
      userPassword: password
    }
  });

  const body = await response.json();
  return body;
}