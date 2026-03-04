const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoice(patientName, datetime, amount) {

  const invoicesDir = path.join(__dirname, "Invoices");
  if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);

  const filePath = path.join(
    invoicesDir,
    `Invoice-${Date.now()}.pdf`
  );

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Sri Chaitanya Dental Care", { align: "center" });
  doc.moveDown();
  doc.text(`Patient: ${patientName}`);
  doc.text(`Date: ${new Date(datetime).toLocaleString()}`);
  doc.text(`Amount: ₹${amount}`);
  doc.moveDown();
  doc.text("Doctor Signature: ____________________");

  doc.end();
  return filePath;
}

module.exports = generateInvoice;