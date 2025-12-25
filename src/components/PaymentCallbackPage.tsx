import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { api } from '../lib/api';

export default function PaymentCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra response code từ VNPay
        const responseCode = searchParams.get('vnp_ResponseCode');
        const transactionStatus = searchParams.get('vnp_TransactionStatus');

        console.log('Payment callback - Response code:', responseCode, 'Transaction status:', transactionStatus);

        // Gọi backend để xử lý (fire-and-forget, không đợi response)
        const queryString = searchParams.toString();
        api.get(`/order/payment_return?${queryString}`)
            .then(() => console.log('Backend notified successfully'))
            .catch(err => console.warn('Backend notification failed (but continuing):', err));

        // Redirect ngay lập tức không đợi backend
        if (responseCode === '00' && transactionStatus === '00') {
            console.log('Payment successful, redirecting to order history...');
            navigate('/order-history', { replace: true });
        } else {
            console.log('Payment failed, redirecting to checkout...');
            navigate('/checkout', { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Đang chuyển hướng...</p>
        </div>
    );
}
