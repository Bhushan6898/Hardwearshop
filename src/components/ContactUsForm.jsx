import React from 'react';

const ContactSection = ({ handleSubmit, handleChange, formData }) => {
  return (
    <div className="py-5" id="contact" style={{ position: 'relative' }}>
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20220217/pngtree-businesswoman-using-contact-icon-interface-photo-image_29649620.jpg"
        alt="Contact Us"
        className="img-fluid rounded w-100 mb-4"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '-1',
          height: '100%',
          objectFit: 'cover',
          opacity: '0.7',
        }}
      />
      <div className="container-fluid" style={{ position: 'relative', zIndex: '1' }}>
        <h2
          className="text-center mb-5 display-5"
          style={{
            color: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          }}
        >
          Contact Us
        </h2>

        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 mb-4">
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mb-1 w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-4">
            <div
              className="p-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.29)',
                borderRadius: '8px',
              }}
            >
              <h5>Address:</h5>
              <p>m46 Kunzer Road, Kalmadu 424106, Jalgon</p>
              <h5>Email:</h5>
              <p>patil.bhushan6898@gmail.com</p>
              <h5>Phone:</h5>
              <p>+91 7507546145</p>
              <h5>Working Hours:</h5>
              <p>Monday - Saturday, 8 AM - 9 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
