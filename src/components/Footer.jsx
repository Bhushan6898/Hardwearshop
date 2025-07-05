import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid bg-primary">
        <div className="row ">
          <div className="col-md-9 py-3 text-white">
            Get connected with us on social networks!
          </div>
          <div className="col-md-3 py-3 text-center text-white">
            <Link to="/" title="Facebook">
              <i className="bi bi-facebook text-light me-3"></i>
            </Link>
            <Link to="/" title="Instagram">
              <i className="bi bi-instagram text-light me-3"></i>
            </Link>
            <Link to="/" title="Youtube">
              <i className="bi bi-youtube text-light me-3"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white">
        <div className="row ">
          <div className="col-md-3 py-3">
            <div className="h6">Mahalaxmi Hardwere</div>
            <hr />
            <p>
              Welcome to Mahalaxmi Hardware Shop, your one-stop destination for all your hardware needs. We offer a wide range of high-quality tools, building materials, and home improvement products at competitive prices.
            </p>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Products</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/tools"
                  className="text-decoration-none text-white stretched-link"
                >
                  Tools
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/fasteners"
                  className="text-decoration-none text-white stretched-link"
                >
                  Fasteners
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/paint"
                  className="text-decoration-none text-white stretched-link"
                >
                  Paints & Coatings
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/lumber"
                  className="text-decoration-none text-white stretched-link"
                >
                  Lumber & Building Materials
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/plumbing"
                  className="text-decoration-none text-white stretched-link"
                >
                  Plumbing Supplies
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/electrical"
                  className="text-decoration-none text-white stretched-link"
                >
                  Electrical Supplies
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 py-3">
            <div className="h6">Policy</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Return Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Terms Of Use
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Security
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Privacy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  EPR Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Address</div>
            <hr />
            <address>
              <strong>Instagram.</strong>
              <br />
              Mahalaxmi Hardwere
              <br />
              Kalmadu Pin Code is 424106.
              <br />
              <abbr title="Phone">Phone:</abbr>9730183353
            </address>
            <div className="h6">Customer Care</div>
            <hr />
            <i className="bi bi-telephone"></i> +7507546145
            <br />
            <i className="bi bi-envelope"></i> patil.bhushan6898@email.com
          </div>
        </div>
      </div>
      <div className="container-fluid bg-secondary text-white text-center">
        <div className="row">
          <div className="col-md-2 py-2">
            <Link to="/" className="text-white text-decoration-none">
              <i className="bi bi-briefcase text-warning"></i> Partner with us
            </Link>
          </div>
          <div className="col-md-2 py-2">
            <Link to="/" className="text-white text-decoration-none">
              <i className="bi bi-badge-ad text-info"></i> Advertise
            </Link>
          </div>
          <div className="col-md-2 py-2">
            <Link to="/" className="text-white text-decoration-none">
              <i className="bi bi-gift"></i> Gift
            </Link>
          </div>
          <div className="col-md-3 py-2">
            © 2016-{new Date().getFullYear()} malaluxmi hardwere.com

          </div>
          <div className="col-md-3 py-2 bg-white">
            <img
              src="../../images/payment/american_express.webp"
              width="32"
              alt="American Express"
              className="me-2"
            />
            <img
              src="../../images/payment/maestro.webp"
              width="32"
              alt="Maestro"
              className="me-2"
            />
            <img
              src="../../images/payment/netbanking.webp"
              width="32"
              alt="Net Banking"
              className="me-2"
            />
            <img
              src="../../images/payment/paypal.webp"
              width="32"
              alt="Paypal"
              className="me-2"
            />
            <img
              src="../../images/payment/rupay.webp"
              width="32"
              alt="Rupay"
              className="me-2"
            />
            <img
              src="../../images/payment/upi.webp"
              width="32"
              alt="UPI"
              className="me-2"
            />
            <img
              src="../../images/payment/visa.webp"
              width="32"
              alt="Visa"
              className="me-2"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
