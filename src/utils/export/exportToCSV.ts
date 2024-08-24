/* eslint-disable */
/* eslint-disable */
import Papa from 'papaparse';

const exportToCSV = (orderHistory, docName = 'seller_orders') => {
  const orders = orderHistory.order;
  const rows = [
    [
      'Order ID',
      'Order Date',
      'Expected Delivery Date',
      'Order Status',
      'Payment Method',
      'Products',
      'Shipping Status'
    ]
  ];

  orders.forEach(order => {
    let productsInfo = '';
    
    if (Array.isArray(order.products)) {
      productsInfo = order.products.map(p => `${p.productId}(${p.status})`).join(', ');
    }

    rows.push([
      order.id,
      new Date(order.orderDate).toLocaleString(),
      new Date(order.expectedDeliveryDate).toLocaleString(),
      order.status,
      order.paymentMethodId,
      productsInfo,
      order.shippingProcess
    ]);
  });

  // Convert the data to CSV
  const csv = Papa.unparse(rows);
  
  // Create a Blob with the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger the download
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${docName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default exportToCSV;