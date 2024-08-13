/* eslint-disable */
import Papa from 'papaparse'

const exportToCSV = (orderHistory) => {
    const orders = orderHistory.order;
    const rows = [];
    rows.push([
        'Order ID',
        'Order Date',
        'Expected Delivery Date',
        'Order Status',
        'Payment Method',
        'Products',
        'Total Order Revenue (RWF)',
        'Shipping Status'
    ]);
    orders.forEach(order => {
        const products = JSON.parse(order.products);
        const productSummary = products.map(p => `${p.name} (${p.quantity})`).join(', ');
        const totalRevenue = products.reduce((sum, p) => sum + parseFloat(p.totalPrice), 0).toFixed(2);

        rows.push([
            order.id,
            new Date(order.orderDate).toLocaleString(),
            new Date(order.expectedDeliveryDate).toLocaleString(),
            order.status,
            order.paymentMethodId,
            productSummary,
            totalRevenue,
            order.shippingProcess
        ]);
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'seller_orders.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    }
};

export default exportToCSV;