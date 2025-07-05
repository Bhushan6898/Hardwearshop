import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAdmin from '../../hooks/useUser';

const AddProductPage = () => {
  const { AddProduct } = useAdmin();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    sku: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    formData.append('image', image);

    // Call AddProduct and reset form state after completion
    await AddProduct(formData);
    setProductData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      brand: '',
      sku: '',
    });
    setImage(null);
  };


  return (
    <div className='container-fluide  bg-secondary'>
    <div className=" min-vh-100 d-flex justify-content-center align-items-center">
    <div className="col-md-6 col-lg-5 shadow-lg p-4 rounded bg-light">
      <Form onSubmit={handleSubmit} className="p-4">
        <h3 className="text-center mb-4">Add New Product</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>
              <i className="bi bi-tag-fill"></i> Product Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleChange}
              className="border border-primary"
              required
            />
            <Form.Text className="text-muted">Name of the product.</Form.Text>
          </Form.Group>
        </Row>
  
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>
              <i className="bi bi-grid-fill"></i> Category
            </Form.Label>
            <Form.Select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="border border-primary"
              required
            >
              <option value="">Select a category</option>
              <option value="Nuts & Bolts">Nuts & Bolts</option>
              <option value="Cement">Cement</option>
              <option value="Agricultural Tools">Agricultural Tools</option>
              <option value="Pipes & Fittings">Pipes & Fittings</option>
              <option value="Paint & Adhesives">Paint & Adhesives</option>
              <option value="Electrical Fittings">Electrical Fittings</option>
              <option value="Power Tools">Power Tools</option>
              <option value="Hand Tools">Hand Tools</option>
              <option value="Safety Equipment">Safety Equipment</option>
              <option value="Fasteners">Fasteners</option>
              <option value="Plumbing Materials">Plumbing Materials</option>
            </Form.Select>
            <Form.Text className="text-muted">Choose the correct category for the product.</Form.Text>
          </Form.Group>
        </Row>
  
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>
              <i className="bi bi-currency-dollar"></i> Price
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              value={productData.price}
              onChange={handleChange}
              className="border border-success"
              required
            />
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridStock">
            <Form.Label>
              <i className="bi bi-box-seam"></i> Stock Quantity
            </Form.Label>
            <Form.Control
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={productData.stock}
              onChange={handleChange}
              className="border border-success"
            />
            <Form.Text className="text-muted">Available units in stock.</Form.Text>
          </Form.Group>
        </Row>
  
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBrand">
            <Form.Label>
              <i className="bi bi-patch-check-fill"></i> Brand
            </Form.Label>
            <Form.Control
              type="text"
              name="brand"
              placeholder="Enter brand"
              value={productData.brand}
              onChange={handleChange}
              className="border border-info"
            />
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridSKU">
            <Form.Label>
              <i className="bi bi-upc-scan"></i> SKU
            </Form.Label>
            <Form.Control
              type="text"
              name="sku"
              placeholder="Enter SKU"
              value={productData.sku}
              onChange={handleChange}
              className="border border-info"
              required
            />
            <Form.Text className="text-muted">Unique identifier for the product.</Form.Text>
          </Form.Group>
        </Row>
  
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            <i className="bi bi-image-fill"></i> Upload Product Image
          </Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="border border-warning"
            required
          />
          <Form.Text className="text-muted">Accepted formats: .jpg, .png, etc.</Form.Text>
        </Form.Group>
  
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Add Product
        </Button>
      </Form>
    </div>
  </div>
  </div>
  );
};

export default AddProductPage;
