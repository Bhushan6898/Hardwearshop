import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table, Card, Image } from "react-bootstrap";
import "./form.css";
import mylogo from "../../images/mylogo1.png";
import useAdmin from "../../hooks/useUser";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BaseURL } from "../../repository/repository";
import signatureURL from "../../sign.png";
import { productOptions } from "./productlisdata";

const BillingForm = () => {
  const { CreateBill, verification } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    address: "",
    productName: "",
    quantity: 0,
    price: 0,
    description: "",
    taxrate: "",
    paymentMethod: "",
    billingDate: "",
    shippingCharges: 0,
    total: 0, // Added total field
  });

  useEffect(() => {
    verification();
  }, []);

  const [productList, setProductList] = useState([]);
  const [contactError, setContactError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate contact number
    if (name === "contactNumber") {
      if (value.length < 10) {
        setContactError("Contact number must be exactly 10 digits.");
      } else if (value.length > 10) {
        setContactError("Contact number must not exceed 10 digits.");
      } else {
        setContactError("");
      }
    }
  };

  // Add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    const newProduct = {
      productName: formData.productName,
      quantity: formData.quantity,
      price: formData.price,
      description: formData.description,
      taxrate:formData.taxrate,
      total:( formData.quantity)*(formData.price),
      taxamount:( formData.quantity)*(formData.price)/100*(formData.taxrate),
      totalAmount:(( formData.quantity)*(formData.price))+( formData.quantity)*(formData.price)/100*(formData.taxrate),
       
    };
    
    if (newProduct.productName && newProduct.quantity > 0 && newProduct.price > 0 && newProduct.description) {
      setProductList([...productList, newProduct]);
      setFormData({ ...formData, productName: "", quantity: 0, price: 0, description: "", taxrate: 0,});
    } else {
      alert("Please fill in all product details correctly.");
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    const productTotal = productList.reduce((total, product) => total + product.quantity * product.price, 0);
    const taxAmount =  productList.reduce((total, product) => total + product.
    taxamount, 0);


    const total = productTotal +taxAmount+ parseFloat(formData.shippingCharges || 0);
  
    setFormData((prevData) => ({ ...prevData, total })); // Update total in state
    return total;
  };


  // Send the bill
  const sendBill = () => {
  
    const totalAmount = calculateTotal();
 
    const billData = {
      customerName: formData.customerName,
      contactNumber: formData.contactNumber,
      address: formData.address,
      productList: productList,
      totalAmount: totalAmount,
      shippingCharges:formData.shippingCharges,
      paymentMethod:formData.paymentMethod,
      billingDate:formData.billingDate,
     
    };
    CreateBill(billData);
  };

  // Share the bill via WhatsApp
  



  const handleShareWhatsApp = async () => {
    try {
      const totalAmount = calculateTotal();
      const pdf = new jsPDF();
      // Convert logo URL to Base64
      const logoURL = "https://png.pngtree.com/png-vector/20240613/ourmid/pngtree-god-a-lakshmi-devi-laxmi-pooja-special-beautiful-maa-hindu-png-image_12732274.png";
  
  
      const getBase64ImageFromUrl = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
  
      const logoBase64 = await getBase64ImageFromUrl(logoURL);
      // Add logo to PDF
      pdf.addImage(logoBase64, "PNG", 10, 10, 50, 50);
  
      // Add header
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(255, 140, 0); // Dark orange color for header
      pdf.text("Mahalaxmi Hardware", 105, 20, { align: "center" });
  
      // Add subheader
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Black color for text
      pdf.text("Owner: Bhushan Patil", 105, 30, { align: "center" });
      pdf.text("Contact: 7507546145", 105, 36, { align: "center" });
      pdf.text("Address: Kunzer Road Kalmadu", 105, 42, { align: "center" });
      pdf.text("Pin Code: 424106", 105, 48, { align: "center" });
  
      // Add divider
      pdf.setDrawColor(40, 116, 166);
      pdf.setLineWidth(0.5);
      pdf.line(10, 60, 200, 60);
  
      // Add customer details
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Customer Details", 10, 70);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`Name: ${formData.customerName}`, 10, 80);
      pdf.text(`Contact: ${formData.contactNumber}`, 10, 88);
      pdf.text(`Address: ${formData.address}`, 10, 96);
  
      // Add another divider
      pdf.line(10, 100, 200, 100);
  
      // Add product details header
      pdf.setFont("helvetica", "bold");
      pdf.text("Products", 10, 110);
  
      // Add table headers
      pdf.setFontSize(12);
      pdf.text("S.No", 10, 120);
      pdf.text("Product", 30, 120);
      pdf.text("Description", 80, 120);
      pdf.text("Qty", 110, 120);
      pdf.text("Price", 130, 120);
      pdf.text("Tax", 150, 120);
      pdf.text("Total", 170, 120);
      let y = 130;
      productList.forEach((product, index) => {
        const taxAmount = (product.total * product.taxrate) / 100;
        pdf.setFont("helvetica", "normal");
        pdf.text(`${index + 1}`, 10, y);
        pdf.text(`${product.productName}`, 30, y);
        pdf.text(`${product.description}`, 80, y); // Description column
        pdf.text(`${product.quantity}`, 110, y);
        pdf.text(`${product.price}`, 130, y);
        pdf.text(`${taxAmount.toFixed(2)}`, 150, y);
        pdf.text(`${product.totalAmount.toFixed(2)}`, 170, y);
        y += 10; // Move to the next row
      });
  
      // Add totals section
      pdf.setFont("helvetica", "bold");
      pdf.text(`Shipping Charges: ${formData.shippingCharges}`, 10, y + 10); // Move below the product details section
      pdf.text(`Payment Method: ${formData.paymentMethod}`, 10, y + 20);  // Slightly below the previous line
      pdf.text(`Date: ${formData.billingDate}`, 10, y + 30);              // Further below for better spacing
      pdf.text(`Total Amount: ${totalAmount.toFixed(2)}`, 10, y + 40);
      const getBase64ImageFrom = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
  
      const signatureBase64 = await getBase64ImageFrom(signatureURL); // Fetch signature as Base64

      // Signature dimensions
      const signatureWidth = 40;
      const signatureHeight = 20; 
      const signatureX = 150; 
      const signatureY = y + 50; 
      // Add signature image to the PDF
      pdf.addImage(signatureBase64, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);
      
      // Add "Owner's Signature" label below the image
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Black text
      // Dynamically calculate label's x-coordinate for centering
      const label = "Owner's Signature";
      const labelWidth = pdf.getTextWidth(label);
      const labelX = signatureX + signatureWidth / 2 - labelWidth / 2;
      
      pdf.text(label, labelX, signatureY + signatureHeight + 6); // Positioned 6 units below the signature
      
      y = signatureY + signatureHeight + 20; // Add padding after the signature
      
      pdf.setFontSize(16); // Set larger font size for emphasis
      pdf.setTextColor(40, 116, 166); // Dark orange
      pdf.text("Thank you for your purchase!", 105, y + 50, { align: "center" });
      
      // Save the PDF
      const fileName = `Mahalaxmi_Hardware/${formData.customerName}.pdf`;
      pdf.save(fileName);
      console.log("PDF saved successfully!");
  
      // Notify the user
      alert(
        "The bill has been downloaded as a PDF file. You can share it via WhatsApp by attaching the file manually."
      );
       // Calculate the total amount

      // Constructing the bill details message
      let billDetails = `*Mahalaxmi Hardware*\n`;
      billDetails += `_Owner: Bhushan Patil_\n`;
      billDetails += `_Contact: 7507546145_\n`;
      billDetails += `------------------------------\n\n`;
      
      billDetails += `*Customer Details:*\n`;
      billDetails += `Name: ${formData.customerName}\n`;
      billDetails += `Contact: ${formData.contactNumber}\n`;
      billDetails += `Address: ${formData.address}\n\n`;
      
      billDetails += `*Products Purchased:*\n`;
      
      productList.forEach((product, index) => {
        const taxAmount = (product.total * product.taxrate) / 100; // Calculate tax
        billDetails += `${index + 1}. *${product.productName}*\n`;
        billDetails += `   Description: ${product.description}\n`; // Description field
        billDetails += `   Quantity: ${product.quantity}\n`;
        billDetails += `   Price: ₹${product.price}\n`;
        billDetails += `   TaxRate: ${product.taxrate}%\n`;
        billDetails += `   Tax: ₹${taxAmount.toFixed(2)}\n`;
        billDetails += `   Total: ₹${product.totalAmount.toFixed(2)}\n\n`;
      });
      
      billDetails += `------------------------------\n`;
      billDetails += `Shipping Charges:: ₹${formData.shippingCharges}*\n\n`;
      billDetails += `Payment Method: ₹${formData.paymentMethod}*\n\n`;
      billDetails += `Date: ₹${formData.billingDate}*\n\n`;
      billDetails += `*Total Amount: ₹${totalAmount}*\n\n`;
      billDetails += `_Thank you for shopping with us!_\n`;
      
      // Format the phone number and add the country code
      let phoneNumber = formData.contactNumber.replace(/\D/g, ''); 
      if (!phoneNumber.startsWith('91')) {
        phoneNumber = `91${phoneNumber}`; 
      }
      
      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(billDetails)}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
  
     

    
      window.open(whatsappURL, "_blank");
  
      sendBill(); // Call your sendBill function if applicable
    } catch (error) {
      console.error("Error in WhatsApp share:", error);
    }
  };
  
  
  const filteredOptions = productOptions.filter((product) =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  // const productOptions = [
  //   "Cement",
  //   "Bricks",
  //   "Sand",
  //   "Concrete Blocks",
  //   "Tiles",
  //   "Steel Rods",
  //   "Electrical Wires",
  //   "Seeds",
  //   "Safety Gloves",
  // ];

  const isFormValid = () => {
    return (
      formData.customerName &&
      formData.contactNumber.length === 10 &&
      productList.length > 0 &&
      formData.billingDate &&
      !isNaN(formData.shippingCharges)
    );
  };
console.log(formData);

  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4">
        <div className="d-flex flex-column flex-md-row align-items-center mb-4">
          <Image src={mylogo} alt="Logo" fluid style={{ maxHeight: "100px", marginRight: "20px" }} />
          <div className="text-center flex-grow-1">
            <h3
              className="display-4"
              style={{
                background: "linear-gradient(90deg, #FF5733, #FFC300, #DAF7A6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
              }}
            >
              Mahalaxmi Hardware & Electric
            </h3>
          </div>
        </div>

        <Form>
          {/* Customer Details */}
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="border-primary"
              />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                placeholder="Enter contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className={`border-primary ${contactError ? "is-invalid" : ""}`}
                maxLength={10}
              />
              {contactError && <div className="invalid-feedback">{contactError}</div>}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={2}
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
          </Row>

          {/* Product Details */}
          <h5 className="mt-4">Add Products</h5>
          <Row>
          <Form.Group as={Col} md={6}>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on typing
            className="border-primary mb-3"
          />
          <Form.Control
            as="select"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border-primary"
          >
            <option value="">Select Product</option>
            {filteredOptions.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
            {filteredOptions.length === 0 && (
              <option value="">No matching products</option>
            )}
          </Form.Control>
        </Form.Group>
            <Form.Group as={Col}  md={6}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="border-primary"
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Label>Tax Rate (%)</Form.Label>
              <Form.Control
                type="number"
                name="taxrate"
                placeholder="Enter tax rate"
                value={formData.taxrate}
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Button
                variant="success"
                className="mt-4 w-100"
                onClick={handleAddProduct}
              >
                Add
              </Button>
            </Form.Group>
          </Row>

          {/* Product Table */}
          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Tax rate</th>
                <th>Tax amount</th>
                <th>Tax+total</th>
             
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price}</td>
                  <td>₹{(product.quantity * product.price).toFixed(2)}</td>
                  <td>{product.taxrate}</td>
                  <td>{(product.taxamount).toFixed(2)}</td>
                  <td>{(product.totalAmount)}</td>
               
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total Amount</strong></td>
                <td>
                <strong>₹{productList.reduce((acc, product) => acc + product.totalAmount, 0).toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </Table>

          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Label>Shipping Charges</Form.Label>
              <Form.Control
                type="number"
                name="shippingCharges"
                placeholder="Enter shipping charges"
                value={formData.shippingCharges}
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
          </Row>

          <h5 className="mt-4">Payment Method</h5>
          <Row>
            <Form.Group as={Col}>
              <Form.Check
                type="radio"
                label="Cash"
                name="paymentMethod"
                value="Cash"
                onChange={handleChange}
                className="border-primary"
              />
              <Form.Check
                type="radio"
                label="Credit/Debit Card"
                name="paymentMethod"
                value="Card"
                onChange={handleChange}
                className="border-primary"
              />
              <Form.Check
                type="radio"
                label="UPI"
                name="paymentMethod"
                value="UPI"
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
          </Row>

          <h5 className="mt-4">Billing Date</h5>
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Control
                type="date"
                name="billingDate"
                value={formData.billingDate}
                onChange={handleChange}
                className="border-primary"
              />
            </Form.Group>
          </Row>

          <Button
            variant="primary"
            className="mt-4"
            onClick={handleShareWhatsApp}
            disabled={!isFormValid()}
          >
            Share Bill on WhatsApp
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default BillingForm;
