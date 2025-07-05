
import Repository from "./repository";

class UserRepository {git
    //gell all clients
    async contactdata(payload) {
      const response = await Repository.post('/user/contact-us',payload)
      .then((response) => {
        console.log(response);
        return response;
        
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return response;
  }
  async AddClients(payload) {
    const response = await Repository.post('/user/register',payload)
    .then((response) => {
      console.log(response);
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
}
  async Loginhere(payload) {
    const response = await Repository.post('/user/login',payload)
    .then((response) => {
      console.log(response);
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
}
async Logout() {
  const response = await Repository.post('/user/logout')
  .then((response) => {
    console.log(response);
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}

async getverification() {
  const response = await Repository.post('/verification')
  .then((response) => {
    console.log(response);
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}
async getProfile() {

  const response = await Repository.get('/user/profile')
  .then((response) => {
    console.log(response);
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}

async getProduct() {
  const response = await Repository.get('/product/get-product')
  .then((response) => {
   
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}
async postPRODUCT(payload) {
const response = await Repository.post('/product/add-product',payload)
  .then((response) => {
 
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}
async deleteProduct(payload) {
  const response = await Repository.post('/product/delete-product',payload)
  .then((response) => {
  
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}
async otpgenrate(payload) {
  const response = await Repository.post('/create-otp',payload)
  .then((response) => {
  
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}
async updatedataclient(payload) {
  const response = await Repository.post('/user/update-client',payload)
  .then((response) => {
  
    return response;
    
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
return response;
}
async postBill(payload) {
  const response = await Repository.post('/bill/add-bill',payload)
    .then((response) => {
    
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
  }
  async deleteBill(payload) {
    const response = await Repository.post('/bill/delete-bill',payload)
    .then((response) => {
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
  }

  async getBills() {
    const response = await Repository.get('/bill/bills')
    .then((response) => {
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
  }
  async getUser() {
    const response = await Repository.get('/get-client')
    .then((response) => {
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
  }
  async updatepassword(payload) {
    const response = await Repository.post('/user/update-password',payload)
    .then((response) => {
      console.log(response);
      return response;
      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
  }
    

    async updateprofile(payload) {
      console.log("hello");
      
      const response = await Repository.post('/user/update-profile',payload)
      .then((response) => {
        console.log(response);
        return response;
        
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return response;
    }

    async getNotificayion() {
      const response = await Repository.get('/get-notification')
      .then((response) => {
       
        return response;
        
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return response;
    }
    async getLogs() {
      const response = await Repository.get('/get-logs')
      .then((response) => {
       
        return response;
        
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return response;
    }
      }
    
  

  export default new UserRepository();
  