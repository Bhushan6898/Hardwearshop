import React from 'react'

const aboutus = () => {
  return (
    <div className="bg-light py-5" id="about">
    <div className="container">
        <h2 className="text-center mb-5 display-5" style={{
            color: 'linear-gradient(to right, #ff7e5f, #feb47b)', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}>About Us</h2>
        <div className="row">
            <div className="col-md-6">
                <p className="lead">
                    At Mahaluxmi Hardware Shop, we have been serving our community for over 20 years.
                    Our mission is to provide top-quality tools and materials at affordable prices.
                    We are committed to customer satisfaction and offer expert advice to help you
                    make the right choices for your projects.
                </p>
            </div>
            <div className="col-md-6">
                <img
                    src="https://img.freepik.com/free-photo/about-us-information-service-sharing-join-concept_53876-124056.jpg?t=st=1734604629~exp=1734608229~hmac=819eac86c27c33147d654feb2e536728aec2db1b3906a583bc09bed695055908&w=740"
                    alt="About Us"
                    className="img-fluid rounded w-100"
                />
            </div>
        </div>
    </div>
</div>

  )
}

export default aboutus
