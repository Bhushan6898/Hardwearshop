import React, { useEffect, useState } from "react";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";
import useAdmin from "../../hooks/useUser";
import { BaseURL } from "../../repository/repository";

const ProfileForm = () => {
  const { ProfileDetails, userData,verification,updateprofile} = useAdmin();
  useEffect(() => {
   
    verification();
  }, []);
  const [userDatas, setUserDatas] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'client',
    city: '',
    state: '',
    country: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    ProfileDetails();
  }, []);
  useEffect(() => {
    if (userData) {
      setUserDatas({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        email: userData?.email || '',
        password: '',
        mobileNumber: userData?.mobileNumber || '',
        role: userData?.role || 'client',
        city: userData?.city || '',
        state: userData?.state || '',
        country: userData?.country || '',
      });
      setImagePreview(userData?.profileImage ?  `${userData.profileImage}?t=${new Date().getTime()}`  : "../../images/NO_IMG.png");
    }
  }, [userData]);
  console.log(userData);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDatas({
      ...userDatas,
      [name]: value,
    });
  };

  const [profileImage, setProfileImage] = useState(null); // Keep a reference to the file

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfileImage(file); // Store the file reference
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Create form data object
    const formData = new FormData();
    formData.append("firstName", userDatas.firstName);
    formData.append("lastName", userDatas.lastName);
    formData.append("email", userDatas.email);
    formData.append("mobileNumber", userDatas.mobileNumber);
    formData.append("role", userDatas.role);
    formData.append("city", userDatas.city);
    formData.append("state", userDatas.state);
    formData.append("country", userDatas.country);
    
    // Append the actual file instead of imagePreview
    if (profileImage) {
      formData.append("image", profileImage);
    }

    // Call your update profile API
    const response = await updateprofile(formData);
    if (response && response.user) {
     
      setImagePreview(`${BaseURL}${response.user.profileImage}`);
    }
  } catch (error) {
    console.error("Error updating profile", error);
  }
};



  return (
    <form  className="container">
      <div className="card border-primary my-4">
        <h6 className="card-header bg-primary text-white">
          <i className="bi bi-person-lines-fill" /> Profile Detail
        </h6>
        <img
          src={imagePreview ? imagePreview : "../../images/NO_IMG.png"}
          alt="Profile Preview"
          className="card-img-top rounded-0 img bg-secondary"
        />
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="formFile" className="form-label">
              Profile Image
            </label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
            <small className="form-text text-muted">
              You don't allow uploading a photo more than 5MB
            </small>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label>First Name</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <IconPerson />
                </span>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={userDatas.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Last Name</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <IconPerson />
                </span>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={userDatas.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Email</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <IconEnvelop />
                </span>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={userDatas.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Mobile Number</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <IconPhone />
                </span>
                <input
                  name="mobileNumber"
                  type="number"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={userDatas.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>City</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <IconGeoAlt />
                </span>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={userDatas.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>State</label>
              <div className="input-group mb-3">
                <input
                  name="state"
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={userDatas.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Country</label>
              <div className="input-group mb-3">
                <input
                  name="country"
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={userDatas.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <button
            type="submit"
            className="btn btn-primary"
           onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
