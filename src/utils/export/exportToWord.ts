/* eslint-disable */
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';

const exportToWord = (orderHistory, docName = 'seller_orders') => {
  const orders = orderHistory.order;

  // Define equal width for each column
  const columnWidth = 100 / 7; // 7 columns, so each gets 1/7 of the total width

  // Create table rows
  const rows = orders.map(order => 
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(order.id)], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(new Date(order.orderDate).toLocaleString())], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(new Date(order.expectedDeliveryDate).toLocaleString())], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(order.status)], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(order.paymentMethodId)], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(Array.isArray(order.products) ? order.products.map(p => `${p.productId}(${p.status})`).join(', ') : '')], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(order.shippingProcess)], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
      ],
    })
  );

  // Create the document
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph("Order History"),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Order ID")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph("Order Date")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph("Expected Delivery Date")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph("Order Status")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph("Payment Method")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph("Products")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph("Shipping Status")], width: { size: columnWidth, type: WidthType.PERCENTAGE } }),
              ],
            }),
            ...rows,
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      ],
    }],
  });

  // Generate and save the document
  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `${docName}.docx`);
  });
};

export default exportToWord;