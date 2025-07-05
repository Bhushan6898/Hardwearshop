import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useAdmin from '../hooks/useUser';

const TopMenu = () => {
  const { Notification,verification,getUsers,Bills } = useAdmin();
  const { t, i18n } = useTranslation();
  const role = useSelector((state) => state.auth.role)
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    Notification();
    verification();
    getUsers();
    Bills();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0 " >
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ fontWeight: "bold", color: "orange" }} to="/">
          {t('appTitle')}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="btn nav-link dropdown-toggle fw-bold"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                {t('allPages')}
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/signin">
                    {t('signIn')}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/account/signup">
                    {t('signUp')}
                  </Link>
                </li>
                {/* <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/checkout">
                  {t('checkout')}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/contact-us">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/blog">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/blog/detail">
                  {t('blogDetail')}
                </Link>
              </li> */}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
              Products
              </Link>
            </li>

            {/* <li className="nav-item">
            <Link className="nav-link" to="/electric">
              {t('electronics')}
            </Link>
          </li> */}
            {role === "admin" &&
              <li className="nav-item">
                <Link className="nav-link" to="/addproduct">
                  {t('addProduct')}
                </Link>
              </li>
            }
            {role === "admin" &&
              <li className="nav-item">
                <Link className="nav-link" to="/documentation">
                  {t('Data Management')}
                </Link>
              </li>
            } {role === "admin" &&
              <li className="nav-item">
                <Link className="nav-link" to="/billing">
                  {t('billing')}
                </Link>
              </li>
            } {role === "admin" &&
              <li className="nav-item">
                <Link className="nav-link" to="/billingdata">
                  {t('billingdata')}
                </Link>
              </li>
            } {role === "admin" &&
              <li className="nav-item">
                <Link className="nav-link" to="/dashbord">
                  Dashbord
                </Link>
              </li>
            }
            
            {/* Move language selector to the last item
          <li className="nav-item ml-auto" style={{ marginLeft: '100px' }}>
        <select
          className="form-select"
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
      </li> */}
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default TopMenu;
