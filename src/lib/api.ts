export const BASE_URL = "https://tmdt251-be-production.up.railway.app";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean | null | undefined>;
}

async function request<T>(
    endpoint: string,
    method: RequestMethod,
    options: RequestOptions = {}
): Promise<T> {
    const { params, headers, ...customConfig } = options;

    // 1. Build URL with query params
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    // 2. Prepare headers (Auth + JSON)
    const token = localStorage.getItem("access_token");
    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
        ...customConfig,
    };

    // 3. Execute Fetch
    const response = await fetch(url.toString(), config);
    const data = await response.json().catch(() => ({})); // Handle no-content responses gracefully

    if (!response.ok) {
        let errorMessage = data.message || "An error occurred";
        if (data.detail) {
            if (typeof data.detail === "string") {
                errorMessage = data.detail;
            } else if (Array.isArray(data.detail)) {
                // Handle FastAPI validation error array
                errorMessage = data.detail
                    .map((err: any) => `${err.loc[1]}: ${err.msg}`)
                    .join("\n");
            }
        }

        throw {
            status: response.status,
            message: errorMessage,
            data,
        };
    }

    return data as T;
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, "GET", options),
    post: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, "POST", { ...options, body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, "PUT", { ...options, body: JSON.stringify(body) }),
    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, "DELETE", options),
    patch: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, "PATCH", { ...options, body: JSON.stringify(body) }),
};
