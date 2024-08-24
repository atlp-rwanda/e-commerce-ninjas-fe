/* eslint-disable */
import * as XLSX from 'xlsx';

const exportToExcel = (orderHistory, docName = 'seller_orders') => {
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

  // Create a worksheet from the rows
  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'OrderHistory');

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, `${docName}.xlsx`);
};

export default exportToExcel;