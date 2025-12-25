import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function PaymentCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'success' | 'error'>('error');

    useEffect(() => {
        // Backend đã xử lý payment khi VNPay redirect về /payment_return
        // Frontend chỉ cần đọc response code để hiển thị kết quả
        const responseCode = searchParams.get('vnp_ResponseCode');
        const transactionStatus = searchParams.get('vnp_TransactionStatus');

        // VNPay response code "00" = success
        if (responseCode === '00' && transactionStatus === '00') {
            setStatus('success');
            // Auto redirect sau 3 giây
            setTimeout(() => {
                navigate('/order-history');
            }, 3000);
        } else {
            setStatus('error');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 max-w-4xl mx-auto py-12">
            {status === 'success' && (
                <div className="space-y-6 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">Thanh toán thành công!</h2>
                    <p className="text-lg text-muted-foreground">Cảm ơn bạn đã đặt hàng. Bạn sẽ được chuyển đến trang lịch sử đơn hàng.</p>
                    <button
                        onClick={() => navigate('/order-history')}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Xem đơn hàng ngay
                    </button>
                </div>
            )}

            {status === 'error' && (
                <div className="space-y-6 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <XCircle className="w-12 h-12 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-red-600">Thanh toán thất bại</h2>
                    <p className="text-lg text-muted-foreground">Giao dịch không thành công hoặc đã bị hủy. Vui lòng thử lại.</p>
                    <div className="flex gap-4 justify-center mt-8">
                        <button
                            onClick={() => navigate('/checkout')}
                            className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
                        >
                            Thử lại
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
                        >
                            Liên hệ hỗ trợ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
