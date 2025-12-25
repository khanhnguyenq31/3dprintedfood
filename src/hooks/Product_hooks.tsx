import { useEffect } from 'react';

export type Category = {
  id: number;
  name: string;
  description: string;
  parent_id: number | null;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  model_file: string | null;
  image_url: string | null;
  is_active: boolean;
  category_id: number;
  nutritions: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  } | null;
  category: Category;
  variants: unknown[];
  ingredients: unknown[];
};

export type ProductDisplay = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

export type Variant = {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  product_id: number;
};

export type ProductDetailDisplay = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  highlights: string[];
  nutrition: Nutrition | null;
};

export const categoriesDictionary: Map<number, Category> = new Map();
export const productsDictionary: Map<number, ProductDisplay> = new Map();
export const productDetailsDictionary: Map<number, ProductDetailDisplay> = new Map();
export const productVariantsDictionary: Map<number, Variant[]> = new Map();

const getEnvVar = (key: string): string | undefined => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

const BASE_URL = getEnvVar('VITE_BASE_URL');

export async function fetchCategoryDetail(categoryId: number): Promise<Category | null> {
  if (!BASE_URL) {
    return null;
  }

  try {
    const url = `${BASE_URL}/catalog/categories/${categoryId}`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok && data) {
      return data as Category;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function useFetchCategories() {
  useEffect(() => {
    const fetchCategories = async () => {
      if (!BASE_URL) {
        return;
      }

      try {
        categoriesDictionary.clear();

        const url = `${BASE_URL}/catalog/categories`;
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (Array.isArray(data)) {
          data.forEach((category: Category) => {
            categoriesDictionary.set(category.id, category);
          });
        }
      } catch (error) {
      }
    };

    fetchCategories();
  }, []);
}

export function useFetchProducts() {
  useEffect(() => {
    const fetchProducts = async () => {
      if (!BASE_URL) {
        return;
      }

      try {
        productsDictionary.clear();

        const url = `${BASE_URL}/catalog/products`;
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (Array.isArray(data)) {
          data.forEach((product: Product) => {
            if (product.is_active) {
              const productDisplay: ProductDisplay = {
                id: product.id,
                name: product.name || 'Product',
                category: product.category?.name || 'Uncategorized',
                price: product.price || 0,
                rating: 4.5,
                image: product.image_url || 'https://images.unsplash.com/photo-1553678324-f84674bd7b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZm9vZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MzMwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
              };
              productsDictionary.set(product.id, productDisplay);
            }
          });
        }
        console.log(productsDictionary);
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);
}

export async function fetchProductDetail(productId: number): Promise<ProductDetailDisplay | null> {
  if (!BASE_URL) {
    return null;
  }

  try {
    const url = `${BASE_URL}/catalog/products/${productId}`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok && data) {
      const product = data as Product;
      
      const nutrition: Nutrition | null = product.nutritions ? {
        calories: product.nutritions.calories || 0,
        protein: product.nutritions.protein || 0,
        carbs: product.nutritions.carbs || 0,
        fat: product.nutritions.fat || 0,
        fiber: product.nutritions.fiber || 0,
      } : null;

      const productDetail: ProductDetailDisplay = {
        id: product.id,
        name: product.name || 'Product',
        category: product.category?.name || 'Uncategorized',
        price: product.price || 0,
        rating: 4.5,
        reviews: 234,
        image: product.image_url || 'https://images.unsplash.com/photo-1553678324-f84674bd7b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZm9vZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MzMwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: product.description || 'No description available',
        highlights: [
          'Customizable ingredients',
          'Zero food waste production',
          'Optimized nutrition',
          'Fresh ingredients daily',
        ],
        nutrition,
      };

      productDetailsDictionary.set(product.id, productDetail);
      return productDetail;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function fetchProductVariants(productId: number): Promise<Variant[] | null> {
  if (!BASE_URL) {
    return null;
  }

  try {
    const url = `${BASE_URL}/catalog/products/${productId}/variants`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok && Array.isArray(data)) {
      const variants: Variant[] = data.map((variant: Variant) => ({
        id: variant.id,
        name: variant.name || 'Variant',
        sku: variant.sku || '',
        price: variant.price || 0,
        stock: variant.stock || 0,
        product_id: variant.product_id || productId,
      }));

      productVariantsDictionary.set(productId, variants);
      return variants;
    }
    return null;
  } catch (error) {
    return null;
  }
}

