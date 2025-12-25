import { Discount } from '../types/api';
import { api } from '../lib/api';

export async function fetchDiscounts(): Promise<Discount[]> {
  // CHỈ truyền vào '/discounts', không truyền cả domain
  return api.get<Discount[]>('/discounts'); 
}

export async function createDiscount(discount: Omit<Discount, 'id'>): Promise<Discount> {
  // Tương tự cho hàm POST
  return api.post<Discount>('/discounts', discount);
}