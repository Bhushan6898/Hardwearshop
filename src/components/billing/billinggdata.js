import React, { useEffect, useState } from 'react';
import useAdmin from '../../hooks/useUser';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Paging from '../Paging'; // Import the Paging component
import { useSelector } from "react-redux";

const Billinggdata = () => {
  const {  Bills,verification } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [billsPerPage] = useState(5); // Set a limit of bills per page
  const [filteredBills, setFilteredBills] = useState([]); // Store filtered bills
  const [selectedDate, setSelectedDate] = useState(''); // Track the selected date
  const billdata = useSelector((state) => state.auth.billdata);
 
  useEffect(() => {
    Bills();
    verification();
    if (billdata) {
      setLoading(false);
      setFilteredBills(billdata); // Initialize with all bills
    }
  }, []);

  // Function to handle page change
  const onPageChanged = (data) => {
    setCurrentPage(data.currentPage); // Set the current page
  };

  // Handle date change and filter bills by selected date
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    if (selectedDate) {
      const filtered = billdata.filter((bill) => {
        const billDate = new Date(bill.createdAt).toISOString().split('T')[0]; // Get 'YYYY-MM-DD' part
         // Debugging
        return billDate === selectedDate; // Compare the 'YYYY-MM-DD' part of both dates
      });
      setFilteredBills(filtered); // Set filtered bills based on the selected date
      console.log('Filtered Bills:', filtered); // Debugging
    } else {
      setFilteredBills(billdata); // Reset to all bills if no date is selected
    }
  };

  // Calculate current bills to display
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading billing data, please wait...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Billing Data</h1>

      {/* Date Filter */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="filterDate">Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange} // Call handleDateChange on date select
          />
        </div>
      </div>

      {filteredBills.length === 0 ? (
        <p className="text-center">No billing data found for the selected date.</p>
      ) : (
        <>
          {/* Summary: Total bills and total amount */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h5>Total Bills: {filteredBills.length}</h5>
            </div>
            <div className="col-md-6 text-right">
              <h5>
                Total Amount: ₹
                {filteredBills.reduce((sum, bill) => sum + bill.totalAmount, 0).toFixed(2)}
              </h5>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Customer Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Created At</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentBills.map((bill) => (
                  <tr key={bill._id}>
                    <td>{bill.customerName}</td>
                    <td>{bill.contactNumber}</td>
                    <td>{bill.address}</td>
                    <td>{new Date(bill.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                              <th>taxRate</th>
                              <th>taxAmount</th>
                              <th>TotalAmount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bill.productList.map((product, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td> {/* Displaying the index */}
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td>₹{product.price}</td>
                                <td>₹{product.total}</td>
                                <td>{product.taxrate}%</td>
                                <td>₹{product.taxamount}</td>
                                <td>₹{product.taxwithamount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                    <td className="font-weight-bold">₹{bill.totalAmount.toFixed(2)}</td> {/* Bold total amount */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <Paging
            totalRecords={filteredBills.length}
            pageLimit={billsPerPage}
            pageNeighbours={1} // Neighbors are pages displayed beside the current page
            onPageChanged={onPageChanged}
          />
        </>
      )}
    </div>
  );
};

export default Billinggdata; 