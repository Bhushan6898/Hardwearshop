import { useState } from "react";
import { toast } from "react-toastify";
import UserRepository from "../repository/userRepository";
import { useNavigate } from "react-router-dom";
import { logOut, login, setBillDatas, setNotificationdata, setProductDatas,setUserdata} from "../store/auth/reduser.slice";
import { useDispatch } from "react-redux";

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [logsData, setLogsData] = useState();

  const ContactUs = async (payload) => {
    try {
      const response = await UserRepository.contactdata(payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.response.status === 401)  {
        toast.warn(response.response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };
  const AddClientDetails = async (payload) => {
    try {
      const response = await UserRepository.AddClients(payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.response.status === 401)  {
        toast.warn(response.response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };
  const genrateotp = async (payload) => {
    try {
      const response = await UserRepository.otpgenrate(payload);
      
      if (response.status === 200) {
        console.log(response);
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.response.status === 401) {
        toast.warn(response.response.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const Login = async (payload) => {
    try {
      const response = await UserRepository.Loginhere(payload);
      console.log(response);
      
      if (response.status === 200) {
        const { role, _id: id } = response.data.user;
        dispatch(login({ role, id })); 
        
        toast.success(response.data?.message);
        setLoading(true); 
        navigate("/"); 
        return response;
      } else if (response.response.status === 401) { 
        toast.warn(response.response.data?.message);
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  const Logout = async () => {
    try {
      const response = await UserRepository.Logout();
      if (response.status === 200) {
       
        dispatch(logOut()); 
        toast.success(response.data?.message);
       
        return response;
      } else if (response.status === 401) { 
        toast.warn(response.data?.message);
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };


  const verification = async () => {
    try {
   
      const response = await UserRepository.getverification();
      if (response.status === 200) {
        const { role,  id } = response.data;
        dispatch(login({ role, id })); 
      } else {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification.");
    }
  };

  const ProfileDetails = async () => {
    try {
      const response = await UserRepository.getProfile();
      if (response.status === 200) {
        setUserData(response.data?.user);
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to fetch profile details.");
      }
      console.log(error);
    }
  };

  const AddProduct = async (payload) => {
    try {
      const response = await UserRepository.postPRODUCT(payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to add product.");
      }
      console.log(error);
    }
  };

  const Product = async () => {
    try {
      const response = await UserRepository.getProduct();
      if (response.status === 200) {
        const productList = response.data?.product;
        setLoading(true);
        dispatch(setProductDatas({ data: productList })); // Correct dispatch format
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to fetch products.");
      }
      console.log(error);
    }
  };

  const deleteProduct = async (payload) => {
    try {
      const response = await UserRepository.deleteProduct(payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CreateBill = async (payload) => {
    try {
      const response = await UserRepository.postBill(payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to create bill.");
      }
      console.log(error);
    }
  };
  const deleteBill = async (payload) => {
    try {
      const response = await UserRepository.deleteBill(payload);
      if (response.status === 200) {
        toast.success(response.data?.message);
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Bills = async () => {
    try {
      const response = await UserRepository.getBills();
      if (response.status === 200) {
        const billList = response?.data?.bills;
        dispatch(setBillDatas({ data: billList }));
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to fetch bills.");
        
      }
      console.log(error);
    }
  };
  const updatepassword = async (payload) => {
    
    try {
      setLoading(true); // Set loading to true at the start of the request
  
      const response = await UserRepository.updatepassword(payload);
  
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setLoading(false);
        return response;
      }
  
      if (response?.response?.status === 400) {
        console.log(response.response.status);
        toast.warn(response?.response?.data?.message);
      }
  
      setLoading(false); // Make sure loading is turned off after handling responses
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the password.");
      setLoading(false); // Ensure loading is stopped in case of an error
    }
  };
  const updateprofile = async (payload) => {
    try {
      setLoading(true); 
  
      const response = await UserRepository.updateprofile(payload);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setLoading(false); // Set loading to false after success
        return response;
      }
      if (response?.response?.status === 401) {
        console.log(response.response.status);
        toast.warn(response?.response?.data?.message);
      }
  
      setLoading(false); 
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the password.");
      setLoading(false); 
    }
  };
  const getUsers = async () => {
    try {
      const response = await UserRepository.getUser();
      if (response.status === 200) {
       const data=response?.data?.users
      dispatch(setUserdata({ data:data}));
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to fetch bills.");
        
      }
      console.log(error);
    }
  };
  const Notification = async () => {
    try {
      const response = await UserRepository.getNotificayion();
     
      if (response.status === 200) {
        console.log(response);
        
        const data=response?.data?.notification
        dispatch(setNotificationdata({ data:data}));
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to fetch bills.");
        
      }
      console.log(error);
    }
  };
  const Logs = async () => {
    try {
      const response = await UserRepository.getLogs();
     console.log(response);
     
      if (response.status === 200) {
        setLogsData(response?.data.logs);
        // const data=response?.data?.logs;
        // dispatch(setLogsData({ data:data}));
        setLoading(true);
        return response;
      } else if (response.status === 401) {
        toast.warn(response.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.warn(error.response.data?.message);
      } else {
        toast.error("Failed to fetch bills.");
        
      }
      console.log(error);
    }
    
  };
  const updateclient = async (payload) => {
    try {
      setLoading(true); 
  
      const response = await UserRepository.updatedataclient(payload);
      if (response?.status === 200) {
        console.log(response);
        
        toast.success(response?.data?.message);
        setLoading(false); // Set loading to false after success
        return response;
      }
      if (response?.response?.status === 401) {
        console.log(response.response.status);
        toast.warn(response?.response?.data?.message);
      }
  
      setLoading(false); 
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the password.");
      setLoading(false); 
    }
  };
  
  return {
    userData,
    loading,
    logsData,
    AddClientDetails,
    Login,
    verification,
    ProfileDetails,
    AddProduct,
    Product,
    CreateBill,
    Bills,
    deleteProduct,
    deleteBill,
    Logout,
    Logs,
    updatepassword,
    updateprofile,
    getUsers,
    genrateotp,
    Notification,
    updateclient,
    ContactUs
  };
};

export default useAdmin;
