/* eslint-disable */
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToPDF = (orderHistory, docName = 'seller_orders') => {
  const doc = new jsPDF();
  const orders = orderHistory.order;

  // Add title
  doc.text('Order History', 14, 15);

  // Prepare data for the table
  const tableRows = orders.map(order => [
    order.id,
    new Date(order.orderDate).toLocaleString(),
    new Date(order.expectedDeliveryDate).toLocaleString(),
    order.status,
    order.paymentMethodId,
    Array.isArray(order.products) ? order.products.map(p => `${p.productId}(${p.status})`).join(', ') : '',
    order.shippingProcess
  ]);

  const columnCount = 7; // Number of columns
  const pageWidth = doc.internal.pageSize.width;
  const tableWidth = pageWidth - 20; // 10mm margin on each side
  const columnWidth = tableWidth / columnCount;

  // Add table to the PDF
  // @ts-ignore
  doc.autoTable({
    head: [['Order ID', 'Order Date', 'Expected Delivery Date', 'Order Status', 'Payment Method', 'Products', 'Shipping Status']],
    body: tableRows,
    startY: 20,
    margin: { left: 10, right: 10 },
    columnStyles: {
      0: { cellWidth: columnWidth },
      1: { cellWidth: columnWidth },
      2: { cellWidth: columnWidth },
      3: { cellWidth: columnWidth },
      4: { cellWidth: columnWidth },
      5: { cellWidth: columnWidth },
      6: { cellWidth: columnWidth },
    },
    styles: { overflow: 'linebreak', cellPadding: 2 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  // Save the PDF
  doc.save(`${docName}.pdf`);
};

export default exportToPDF;