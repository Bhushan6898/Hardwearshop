import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useAdmin from '../../hooks/useUser';
import Paging from '../../components/Paging';
import { classNames } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
//import { BaseURL } from '../../repository/repository';
const BaseURL="https://m-server-5449.onrender.com"

// Sample data


const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
];

const inventoryData = [
  { product: 'Hammer', stock: 50 },
  { product: 'Nails', stock: 200 },
  { product: 'Screwdriver', stock: 150 },
  { product: 'Drill', stock: 30 },
  { product: 'Wrench', stock: 75 },
];

const salesByCategoryData = [
  { category: 'Nuts & Bolts', sales: 12000 },
  { category: 'Cement', sales: 18000 },
  { category: 'Agricultural Tools', sales: 15000 },
  { category: 'Pipes & Fittings', sales: 9000 },
  { category: 'Paint & Adhesives', sales: 7000 },
  { category: 'Electrical Fittings', sales: 11000 },
  { category: 'Power Tools', sales: 13000 },
  { category: 'Hand Tools', sales: 9500 },
  { category: 'Safety Equipment', sales: 8000 },
  { category: 'Fasteners', sales: 5000 },
  { category: 'Plumbing Materials', sales: 6000 },
];



const recentActivitiesData = [
  "User John Doe registered.",
  "User Jane Smith updated profile.",
  "Bill created for Alice Johnson.",
];

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { Bills, verification, getUsers, Logs, logsData, updateclient } = useAdmin();
  const billdata = useSelector((state) => state.auth.billdata);
  const usersData = useSelector((state) => state.auth.userdata);
  const productData = useSelector((state) => state.auth.productDatas);
  console.log(usersData);


  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBills, setFilteredBills] = useState(billdata);
  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(5);
  const [currentBills, setCurrentBills] = useState([]);
  const [currentlogs, setCurrentlogs] = useState([]);
  const [currentPagelogs, setCurrentPagelogs] = useState(1);
  const [logsPerPage] = useState(5);
  const [filteredLogs, setFilteredLogs] = useState(logsData);

  const [chartData, setChartData] = useState([]);

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Prepare available years from billdata
    const allYears = [...new Set(billdata.map((sale) => new Date(sale.createdAt).getFullYear()))];
    allYears.sort((a, b) => a - b); // Sort years in ascending order
    setYears(allYears);

    // Default to the current year
    setSelectedYear(new Date().getFullYear());
  }, [billdata]);

  useEffect(() => {
    if (!billdata || !selectedYear) return;

    const monthlySales = {};

    // Step 1: Group sales by month and year
    billdata.forEach((sale) => {
      const date = new Date(sale.createdAt);
      const year = date.getFullYear();
      if (year === selectedYear) {
        const month = date.toLocaleString('default', { month: 'short' });
        if (!monthlySales[month]) {
          monthlySales[month] = 0;
        }
        monthlySales[month] += sale.totalAmount;
      }
    });

    // Step 2: Generate data for all months of the selected year
    const processedData = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(selectedYear, index, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      return {
        month,
        sales: monthlySales[month] || 0,
      };
    });

    setChartData(processedData);
  }, [billdata, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };



  useEffect(() => {
    Bills();
    verification();
    getUsers();
    Logs();
  }, []);

  // Effect to filter bills based on search term
  useEffect(() => {
    if (!searchTerm) {

      setFilteredBills(billdata);
    } else {
      // Otherwise, filter based on searchTerm
      const result = billdata.filter((bill) =>
        bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.contactNumber.includes(searchTerm)
      );
      setFilteredBills(result);
    }
  }, [searchTerm, billdata]);


  const [expandedIndex, setExpandedIndex] = useState(null); // Tracks which row index is expanded

  const toggleView = (index) => {
    // Toggle visibility for the clicked index only
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  // Calculate current bills for pagination
  useEffect(() => {
    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    setCurrentBills(filteredBills.slice(indexOfFirstBill, indexOfLastBill));
  }, [filteredBills, currentPage]);
  useEffect(() => {
    const indexOfLastLogs = currentlogs * logsPerPage;
    const indexOfFirstlogs = indexOfLastLogs - logsPerPage;
    setCurrentlogs(filteredLogs?.slice(indexOfFirstlogs, indexOfLastLogs));
  }, [filteredLogs, currentlogs]);

  const onPageChanged = (data) => {
    const { currentPage } = data;
    setCurrentPage(currentPage);
  };
  const onPageChangedd = (data) => {
    const { currentPagelogs } = data;
    setCurrentPagelogs(currentPagelogs);
  };
  const handleAddUserClick = () => {
    navigate('/account/signup'); // Redirect to the Add User page
  };

  const getCardBgColor = (action) => {
    switch (action) {
      case 'PASSWORD_UPDATE':
        return '#FFDDC1'; // Light red color
      case 'OTP_GENERATED':
        return '#C1F0C1'; // Light green color
      case 'USER_REGISTERED':
        return '#C1D7FF'; // Light blue color
      default:
        return '#FFFFFF'; // Default white color
    }
  };

  const [editRowId, setEditRowId] = useState(null);
  const [editedRowData, setEditedRowData] = useState({});

  const handleEditClick = (user) => {
    setEditRowId(user._id);
    setEditedRowData({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRowData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSaveClick = async () => {

    try {
      await updateclient(editedRowData);
      await getUsers();
      setEditRowId(null);
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  return (

    <div classNames="container-fluide" style={{ padding: '20px' }}>
      <Container>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#1E90FF', textAlign: "center" }}>
          Dashboard Overview
        </Typography>

        {/* Action Buttons */}
        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={handleAddUserClick} >
              Add User
            </Button>
          </Grid>

        </Grid>

        {/* Filter Section */}
        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Search by Name or Contact"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Metrics Section */}
        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#FFD700', borderRadius: '8px' }}>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>  {filteredBills.reduce((sum, bill) => sum + bill.totalAmount, 0).toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#FF4500', borderRadius: '8px', color: '#fff' }}>
              <Typography variant="h6">New product</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>{productData.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#32CD32', borderRadius: '8px', color: '#fff' }}>
              <Typography variant="h6">Bills</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>{billdata.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#4682B4', borderRadius: '8px', color: '#fff' }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: "white" }}>{usersData.length}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Sales Trends Graph */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: '#1E90FF' }}>
          Sales Trends
        </Typography>

        {/* Year Selection Dropdown */}
        <FormControl style={{ marginBottom: '20px', minWidth: 150 }}>
          <InputLabel>Select Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              marginBottom: '20px',
            }}
          >
            <div style={{ width: '1200px', height: '400px' }}>
              <LineChart
                width={1200} // Fixed width for the chart
                height={400}
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#FF4500" activeDot={{ r: 8 }} />
              </LineChart>
            </div>
          </div>
        </Paper>
        {/* Inventory Levels Graph */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '30px', color: '#1E90FF' }}>
          Product Inventory Levels
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#32CD32" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Sales Performance by Category */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '30px', color: '#1E90FF' }}>
          Sales Performance by Category
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4682B4" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* User List Section */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '30px', color: '#1E90FF' }}>
          Client List
        </Typography>
        <TableContainer component={Paper} style={{ marginBottom: '20px', borderRadius: '8px' }}>
          <Typography variant="h5" gutterBottom style={{ marginTop: '30px', color: '#1E90FF' }}>
            Client List
          </Typography>
          <Table>
            <TableHead style={{ backgroundColor: '#4682B4' }}>
              <TableRow>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Profile</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Mobile Number</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Country</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>City</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>State</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Permissions</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <img
                      src={`${BaseURL}/${user.profileImage}`} // Construct the full URL for the image
                      alt="Profile"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Styling for the image
                    />
                  </TableCell>

                  <TableCell>
                    {editRowId === user._id ? (
                      <TextField
                        name="firstName"
                        value={editedRowData.firstName}
                        onChange={handleChange}
                        size="small"
                      />
                    ) : (
                      user.firstName
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === user._id ? (
                      <TextField
                        name="lastName"
                        value={editedRowData.lastName}
                        onChange={handleChange}
                        size="small"
                      />
                    ) : (
                      user.lastName
                    )}
                  </TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: user.status === 'inactive' ? 'red' : 'green',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      {user.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {editRowId === user._id ? (
                      <Select
                        name="permissions"
                        value={editedRowData.permissions}
                        onChange={handleChange}
                        size="small"
                        style={{ width: '150px' }}
                      >
                        <MenuItem value="Granted">Granted</MenuItem>
                        <MenuItem value="notGranted">notGranted</MenuItem>
                      </Select>
                    ) : (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: user.permissions === 'Granted' ? 'green' : 'red',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {user.permissions}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === user._id ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveClick}
                          style={{ marginRight: '10px' }}
                        >
                          Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(user)}
                      >
                        Update
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        {/* Bills List Section */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '30px', color: '#1E90FF' }}>
          Bill List
        </Typography>
        <TableContainer component={Paper} style={{ borderRadius: '8px' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#32CD32', color: '#fff' }}>
              <TableRow>
                <TableCell style={{ color: '#fff' }}>Customer Name</TableCell>
                <TableCell style={{ color: '#fff' }}>Contact Number</TableCell>
                <TableCell style={{ color: '#fff' }}>Address</TableCell>
                <TableCell style={{ color: '#fff' }}>Created At</TableCell>
                <TableCell style={{ color: '#fff' }}>Action</TableCell>
                <TableCell style={{ color: '#fff' }}>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBills.map((bill, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <TableRow>
                    <TableCell>{bill.customerName}</TableCell>
                    <TableCell>{bill.contactNumber}</TableCell>
                    <TableCell>{bill.address}</TableCell>
                    <TableCell>{new Date(bill.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => toggleView(index)}
                      >
                        {expandedIndex === index ? 'Hide' : 'View'}
                      </Button>
                    </TableCell>
                    <TableCell className="font-weight-bold">
                      ₹{bill.totalAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>

                  {/* Product List Row */}
                  {expandedIndex === index && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Table size="small">
                          <TableHead style={{ backgroundColor: '#32CD32', color: '#fff' }}>
                            <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {bill.productList.map((product, productIndex) => (
                              <TableRow key={productIndex}>
                                <TableCell>{productIndex + 1}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>₹{product.price}</TableCell>
                                <TableCell>
                                  ₹{product.quantity * product.price}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination for Bills */}
        <Paging
          totalRecords={filteredBills.length}
          pageLimit={billsPerPage}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />

        <Container fluid style={{ marginTop: '30px' }}>
          <h5 className="text-primary font-weight-bold mb-4">Recent Activity</h5>

          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <Card.Body>
              <ListGroup variant="flush">
                {logsData && logsData.length > 0 ? (
                  logsData.map((activity, index) => (
                    <ListGroupItem
                      key={index}
                      className="d-flex justify-content-between align-items-start flex-column flex-sm-row"
                      style={{
                        backgroundColor: getCardBgColor(activity.action), // Conditional background color based on action
                        borderBottom: '1px solid #ddd',
                        borderRadius: '8px',
                        marginTop: "10px"
                      }}
                    >
                      <div className="w-100">
                        <p
                          className="mb-1"
                          style={{
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#333',
                          }}
                        >
                          {activity.actionMessage}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            {activity.timestamp}
                          </small>
                          {/* Displaying the createdAt field */}
                          <small className="text-muted">
                            {activity.createdAt && new Date(activity.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>

                      <Button
                        variant="success"
                        size="sm"
                        className="mt-2 mt-sm-0 w-sm-auto"
                        style={{
                          backgroundColor: '#4CAF50',
                          borderColor: '#4CAF50',
                          color: 'white',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                      >
                        View Details
                      </Button>
                    </ListGroupItem>
                  ))
                ) : (
                  <ListGroupItem>
                    <p className="text-muted text-center" style={{ fontSize: '1.1rem' }}>
                      No recent activities available at the moment.
                    </p>
                  </ListGroupItem>
                )}

              </ListGroup>
            </Card.Body>
          </Card>

        </Container>

      </Container>
    </div>
  );
};

export default Dashboard;
