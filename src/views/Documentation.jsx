import { useEffect, useState } from "react";
import useAdmin from "../hooks/useUser";
import { useSelector } from "react-redux";
import { BaseURL } from "../repository/repository";

const DocumentationView = () => {
  const { Product,  deleteProduct, Bills,deleteBill,verification,Notification,NotificationData} = useAdmin();
  const [pr, setPr] = useState([]);
  const [bills, setBills] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const billdata = useSelector((state) => state.auth.billdata);
  const productData = useSelector((state) => state.auth.productDatas);
  
  useEffect(() => {
    Product();
    verification();
    Notification();
  }, []);
console.log(productData);

  useEffect(() => {
    Bills();
  }, []);

  useEffect(() => {
    if (productData) {
      setPr(productData);
    }
  }, [productData]);

  useEffect(() => {
    if (billdata) {
      setBills(billdata);
    }
  }, [billdata]);
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId); // Deselect
      } else {
        return [...prevSelected, productId]; // Select
      }
    });
  };

  // Toggle bill selection
  const toggleBillSelection = (billId) => {
    setSelectedBills((prevSelected) => {
      if (prevSelected.includes(billId)) {
        return prevSelected.filter((id) => id !== billId); // Deselect
      } else {
        return [...prevSelected, billId]; // Select
      }
    });
  };

  // Delete selected products
  const handleDeleteSelectedProducts = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected products?");
    if (confirmDelete) {
      selectedProducts.forEach((productId) => {
        deleteProduct({ productId })
          .then(() => {
         Product();
          })
          .catch((error) => console.error("Error deleting product:", error));
      });
      setSelectedProducts([]);
    }
  };

  // Delete selected bills
  const handleDeleteSelectedBills = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected bills?");
    if (confirmDelete) {
      selectedBills.forEach((billId) => {
        deleteBill({ billId })
          .then(() => {
            Bills();
          })
          .catch((error) => console.error("Error deleting bill:", error));
      });
      setSelectedBills([]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Products Table */}
        <div className="col-md-6">
          <h4 className="text-center mb-4">Product Collection</h4>
          <hr />

          {selectedProducts.length > 0 && (
            <div className="text-center mb-3">
              <button className="btn btn-danger" onClick={handleDeleteSelectedProducts}>
                Delete Selected Products ({selectedProducts.length})
              </button>
            </div>
          )}

          {/* Scrollable Table Container */}
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-striped table-bordered" style={{ backgroundColor: "#f8f9fa" }}>
              <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <tr>
                  <th>Select</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {pr.length > 0 ? (
                  pr.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => toggleProductSelection(product._id)}
                        />
                      </td>
                      <td>
                        <img
                          src={`${BaseURL}${product.imageUrl}`}
                          alt={product.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.category}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bills Table */}
        <div className="col-md-6">
          <h4 className="text-center mb-4">Bill Collection</h4>
          <hr />

          {selectedBills.length > 0 && (
            <div className="text-center mb-3">
              <button className="btn btn-danger" onClick={handleDeleteSelectedBills}>
                Delete Selected Bills ({selectedBills.length})
              </button>
            </div>
          )}

          {/* Scrollable Table Container */}
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-striped table-bordered" style={{ backgroundColor: "#fff3cd" }}>
              <thead style={{ backgroundColor: "#ffc107", color: "#fff" }}>
                <tr>
                  <th>Select</th>
                  <th>Bill ID</th>
                  <th>Customer Name</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <tr key={bill._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedBills.includes(bill._id)}
                          onChange={() => toggleBillSelection(bill._id)}
                        />
                      </td>
                      <td>{bill._id}</td>
                      <td>{bill.customerName}</td>
                      <td>${bill.totalAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No bills available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationView;
