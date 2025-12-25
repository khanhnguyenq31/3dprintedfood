export interface UserOut {
    id: number;
    fullname: string;
    email: string;
    phone?: string | null;
    is_active: boolean;
    created_at: string;
    addresses: AddressOut[];
}

export interface AddressOut {
    id: number;
    user_id: number;
    phone: string;
    address_line1: string;
    address_line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
    label?: string | null;
}

export interface TagOut {
    id: number;
    name: string;
}

export interface CategoryOut {
    id: number;
    name: string;
    description?: string | null;
    parent_id?: number | null;
}

export interface ProductOut {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    model_file?: string | null;
    image_url?: string | null;
    is_active: boolean;
    category_id: number;
    category?: CategoryOut | null;
    tags?: number[] | null; // Note: API spec says tags is array of integer IDs, or null
    ingredients?: ProductIngredientOut[];
    variants?: ProductVariantOut[];
    nutritions?: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
    }; // Added based on user request, though not in openapi.json explicitly
}

export interface ProductIngredientOut {
    id: number;
    product_id: number;
    ingredient_id: number;
    min_percentage?: number | null;
    max_percentage?: number | null;
    ingredient?: IngredientOut | null;
}

export interface IngredientOut {
    id: number;
    name: string;
    unit: string;
    price_per_unit: number;
    calories_per_unit: number;
    stock_quantity: number;
}

export interface ProductVariantOut {
    id: number;
    product_id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
}

export interface WishlistOut {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
}

export interface WishlistProduct extends WishlistOut {
    product?: ProductOut;
}

export interface FeedbackOut {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment?: string | null;
    created_at: string;
}

export interface NotificationOut {
    id: number;
    user_id: number;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'error' | 'promotion';
    is_read: boolean;
    created_at: string;
}

export interface OrderOut {
    id: number;
    user_id: number;
    address_id: number;
    status: string;
    payment_status: string;
    subtotal: number;
    total_amount: number;
    created_at: string;
    items: OrderItemOut[];
}

export interface OrderItemOut {
    id: number;
    product_id: number;
    quantity: number;
    custom_configuration?: any | null;
}

export interface Discount {
    id: number;
    code: string;
    value: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
    discount_type: 'fixed' | 'percent';
}

export interface CartItemOut {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    custom_configuration?: any | null;
    product?: ProductOut | null;
}

export interface CartOut {
    id: number;
    user_id: number;
    items: CartItemOut[];
}

export interface CartItemCreate {
    product_id: number;
    quantity: number;
    custom_configuration?: any | null;
}

export interface CartItemUpdate {
    quantity: number;
}

export interface PaymentURLRequest {
    vnp_Version?: string;
    vnp_Command?: string;
    vnp_Amount: string; // String as per schema
    vnp_BankCode?: string | null;
    vnp_CreateDate?: string;
    vnp_CurrCode?: string;
    vnp_IpAddr?: string;
    vnp_Locale?: string;
    vnp_OrderInfo: string;
    vnp_OrderType?: string;
    vnp_ReturnUrl?: string;
    vnp_TxnRef: string;
}

export interface PaymentUrlOut {
    payment_url: string;
}

