import { useEffect, useState } from 'react';
import { Discount } from '../types/api';
import { fetchDiscounts, createDiscount } from '../hooks/discount_hooks';

export function useDiscounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscounts()
      .then(setDiscounts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { discounts, loading, error };
}

export function useCreateDiscount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Discount | null>(null);

  async function create(discount: Omit<Discount, 'id'>) {
    setLoading(true);
    setError(null);
    try {
      const res = await createDiscount(discount);
      setResult(res);
      return res;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, error, result };
}
