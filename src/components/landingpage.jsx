import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Head from "./head.jsx";
import { dark } from "@mui/material/styles/createPalette.js";
import useAdmin from "../hooks/useUser.js";
import ContactSection from "./ContactUsForm.jsx";
import Servies from "./servies.jsx";
import Aboutus from "./aboutus.jsx";
import LodingPage from "../lodingPage.js";
import { loadLanguages } from "i18next";
import { BlinkBlur, OrbitProgress } from "react-loading-indicators";

const LandingPage = () => {
    const { verification, ContactUs } = useAdmin();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    useEffect(() => {
        verification();

    }, []);
     const apiKey = process.env.REACT_APP_API_KEY;
console.log("API Key:", apiKey);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       setLoading(true);
       
        const formData = new FormData(e.target);

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };
        const response =await ContactUs(payload);
      
        if (response.status == 200) {
            setLoading(false);
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        }
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    }


    const images = [
        "https://img.freepik.com/free-vector/tools-shop-showcase-assortment-painting-building-home-repair-renovation-carpentry-work-constructor-hardware-store-stand-with-housekeeping-equipment_575670-1298.jpg",
        "https://cdn.pixabay.com/photo/2019/06/25/13/13/wires-and-cables-4298187_1280.jpg",
        "https://cdn.zeebiz.com/hindi/sites/default/files/styles/zeebiz_850x478/public/2023/02/17/125623-cements.jpg",
        "https://skipperpipes.in/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-29-at-17.20.01-922x1024.jpeg",
        "https://media.licdn.com/dms/image/v2/D4D12AQFEh4iOzHYmuw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1657261519224?e=2147483647&v=beta&t=vo4KoXWSk-xTFMWZTNZ4rKUUZ0k42grZqtGHFbFLjjE",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Change image every 1 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Set dynamic minHeight and background-image size based on window size
    let minHeight = "700px"; // Default height
    let backgroundSize = "cover"; // Default background size

    if (windowWidth <= 480) {
        minHeight = "250px";  // Adjusted minHeight for mobile
        backgroundSize = "contain"; // Image will fit entirely within the container on small screens
    } else if (windowWidth <= 768) {
        minHeight = "450px";  // Slightly smaller minHeight for tablets
        backgroundSize = "contain"; // Image fits, but may leave some empty space
    } else if (windowWidth <= 1200) {
        minHeight = "450px"; // Higher minHeight for larger screens
        backgroundSize = "cover"; // Full cover for larger screens
    }


    return (<>
        {
            loading &&
          <LodingPage/>

        }
        <div>
            
            <Head />
            <div
                className="container-fluid d-flex flex-column justify-content-center"
                style={{
                    minHeight: minHeight,
                    backgroundImage:
                        "url('https://img.freepik.com/free-photo/top-view-steel-hammer-with-other-construction-elements-tools_23-2150576394.jpg?ga=GA1.1.1066422692.1737459805&semt=ais_hybrid')",
                    backgroundSize: backgroundSize,
                    backgroundPosition: "center",
                    padding: "0",
                    color: "#fff",
                    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
                    position: "relative",
                    backgroundRepeat: "no-repeat",
                    marginTop: "-20px",
                }}
            >
                <div
                    className="d-flex flex-column align-items-start text-left"
                    style={{
                        padding: "0px", // Add padding for spacing from the left
                        maxWidth: "600px", // Limit text width for better layout
                    }}
                >
                    <h1
                        className="display-4 font-weight-bold "
                        style={{
                            color: 'black', // Set text color to black
                            fontWeight: 'bold', // Make text bold
                            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Optional text shadow for effect
                            fontSize: windowWidth <= 480 ? '2rem' : '4rem', // Adjust font size for smaller screens
                        }}
                    >
                        Welcome to Mahalaxmi Hardware Shop
                    </h1>

                    <p
                        className="text-white   d-md-block" // Hide on small screens, show on medium and larger
                        style={{
                            fontSize: windowWidth <= 480 ? '1rem' : '1.5rem',
                            maxWidth: "300px",
                            margin: "0",
                        }}
                    >
                        Your one-stop destination for premium tools, building materials, and expert advice.
                    </p>

                    {/* Hide this button on mobile */}
                    <a
                        href="/signin"
                        className="btn btn-primary btn-lg px-4 py-2 shadow-lg text-uppercase font-weight-bold  d-md-block" // Hide on small screens, show on medium and larger
                        style={{
                            // Slightly smaller border-radius
                            fontSize: "1rem", // Reduce font size
                            transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        Explore Now
                    </a>
                </div>
            </div>



            <div
                className="text-light text-center py-5"
                style={{
                    backgroundImage: `url('${images[currentImageIndex]}')`,
                    backgroundSize: backgroundSize, // Make sure the image covers the entire container
                    backgroundPosition: "center", // Keep the center of the image focused
                    minHeight: minHeight, // Ensure the container takes full viewport height
                    color: "#fff",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                    transition: "background-image 0.5s ease-in-out",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Content here */}
            </div>


            {/* Features Section */}
            <div className="container-fluid py-5">
                <h2 className="text-center mb-5 display-5" style={{
                    color: 'linear-gradient(to right, #ff7e5f, #feb47b)', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                }}>Why Choose Us?</h2>
                <div className="row text-center">
                    {/* Card 1 */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="card border-0 shadow-lg h-100">
                            <div className="card-body">
                                <div className="mb-3">
                                    <i className="bi bi-award-fill text-primary" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="card-title">Quality Products</h5>
                                <p className="card-text">
                                    We provide top-quality tools and materials for all your projects.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="card border-0 shadow-lg h-100">
                            <div className="card-body">
                                <div className="mb-3">
                                    <i className="bi bi-tags-fill text-success" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="card-title">Affordable Prices</h5>
                                <p className="card-text">
                                    Get the best deals for all your hardware requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="card border-0 shadow-lg h-100">
                            <div className="card-body">
                                <div className="mb-3">
                                    <i className="bi bi-lightbulb-fill text-warning" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="card-title">Expert Advice</h5>
                                <p className="card-text">
                                    Our experts are here to guide you to make the best choices.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="card border-0 shadow-lg h-100">
                            <div className="card-body">
                                <div className="mb-3">
                                    <i className="bi bi-shop text-info" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="card-title">Wide Selection</h5>
                                <p className="card-text">
                                    Choose from a diverse range of products for every need.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="card border-0 shadow-lg h-100">
                            <div className="card-body">
                                <div className="mb-3">
                                    <i className="bi bi-headset text-secondary" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="card-title">Customer Support</h5>
                                <p className="card-text">
                                    Dedicated support team to assist you with your purchases.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 6 */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="card border-0 shadow-lg h-100">
                            <div className="card-body">
                                <div className="mb-3">
                                    <i className="bi bi-truck text-danger" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="card-title">Fast Delivery</h5>
                                <p className="card-text">
                                    Get your products delivered quickly and reliably.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <Aboutus />

            {/* Services Section */}
            <Servies />

            {/* Contact Us Section */}
            <ContactSection
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
            />


            <footer className=" py-5 mt-1 bg-secondary" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                <div className="container-fliud " >
                    <div className="row">
                        {/* About Section */}
                        <div className="col-md-4 mb-4">
                            <h5 className="text-uppercase mb-3 "
                                style={{
                                    color: 'linear-gradient(to right, #ff7e5f, #feb47b)', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                }}>Mahalaxmi Hardware</h5>
                            <p className="text-light">
                                Trusted for over two decades, we offer top-quality hardware products and tools with your satisfaction at heart.
                            </p>
                        </div>

                        {/* Links Section */}
                        <div className="col-md-4 mb-4">
                            <h5 className="text-uppercase mb-3" style={{
                                color: 'linear-gradient(to right, #ff7e5f, #feb47b)', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                            }}>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                                <li><a href="#about" className="text-light text-decoration-none">About Us</a></li>
                                <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
                                <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div className="col-md-4 mb-4">
                            <h5 className="text-uppercase mb-3" style={{
                                color: 'linear-gradient(to right, #ff7e5f, #feb47b)', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                            }}>Follow Us</h5>
                            <div>
                                <a href="#" className="btn btn-outline-light btn-sm rounded-circle me-2">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light btn-sm rounded-circle me-2">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light btn-sm rounded-circle me-2">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light btn-sm rounded-circle">
                                    <i className="bi bi-envelope-fill"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col text-center">
                            <p className="mb-0">© 2024 Mahaluxmi Hardware Shop. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>



        </div>
        </>
    );
};

export default LandingPage;
