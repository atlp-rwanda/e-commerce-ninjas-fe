/* eslint-disable */
import * as XLSX from 'xlsx';

const exportToExcel = (orderHistory) => {
  const orderData = orderHistory.order.map(order => {
    // Parse the products string to JSON
    const products = JSON.parse(order.products);
    
    return products.map(product => ({
      orderId: order.id,
      cartId: order.cartId,
      shopId: order.shopId,
      orderDate: order.orderDate,
      paymentMethodId: order.paymentMethodId,
      status: order.status,
      shippingProcess: order.shippingProcess,
      expectedDeliveryDate: order.expectedDeliveryDate,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productDiscount: product.discount,
      productQuantity: product.quantity,
      productTotalPrice: product.totalPrice,
      productDescription: product.description,
      productImage: product.image,
    }));
  }).flat(); // Flatten the array of arrays

  // Convert the JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(orderData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'OrderHistory');

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, 'OrderHistory.xlsx');
};

export default exportToExcel;