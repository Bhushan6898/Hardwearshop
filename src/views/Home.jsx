import React, { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
// Make sure to import useAdmin hook

import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import { ReactComponent as IconHammer } from "bootstrap-icons/icons/hammer.svg";
import { ReactComponent as IconPlug } from "bootstrap-icons/icons/plug.svg";
import { ReactComponent as IconBuilding } from "bootstrap-icons/icons/building.svg";
import { ReactComponent as IconWrench } from "bootstrap-icons/icons/wrench.svg";
import useAdmin from "../hooks/useUser";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);

const HomeView = () => {
  // Use useAdmin hook
  const {  Bills,Product,verification } = useAdmin();

useEffect(()=>{
  Bills();
  Product();
  verification();
},[])
  const components = {
    IconLaptop: IconPlug,
    IconHeadset: IconWrench,
    IconPhone: IconHammer,
    IconTv: IconBuilding,
    IconDisplay: IconDisplay,
    IconHdd: IconPlug,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };

  const iconProducts = data.iconProducts;
  const rows = [...Array(Math.ceil(iconProducts.length / 6))];
  // chunk the products into the array of rows
  const productRows = rows.map((row, idx) =>
    iconProducts.slice(idx * 6, idx * 4 + 4)
  );
  // map the rows as div.row
  const carouselContent = productRows.map((row, idx) => (
    <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
      <div className="row g-3">
        {row.map((product, idx) => {
          const ProductImage = components[product.img];
          return (
            <div key={idx} className="col-md-3">
              <CardIcon
                title={product.title}
                text={product.text}
                tips={product.tips}
                to={product.to}
              >
                <ProductImage
                  className={product.cssclassName}
                  width="80"
                  height="80"
                />
              </CardIcon>
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
      <div className="container-fluid bg-light mb-3">
        <div className="row g-3">
          <div className="col-md-9">
            <Carousel id="elect-product-category" className="mb-3">
              {carouselContent}
            </Carousel>
            <Support />
          </div>
          <div className="col-md-3">
            <CardLogin className="mb-3" />
            <CardImage src="../../images/category/pana.jpg" to="promo" />
          </div>
        </div>
      </div>
      <div className="container-fluid bg-light mb-3">
        <div className="row">
          <div className="col-md-12">
            <CardDealsOfTheDay
              endDate={Date.now() + 1000 * 60 * 60 * 14}
              title="Deals of the Day"
              to="/"
            >
              <Carousel id="elect-product-category1">{carouselContent}</Carousel>
            </CardDealsOfTheDay>
          </div>
        </div>
      </div>

      <div className="bg-info bg-gradient p-3 text-center mb-3">
        <h4 className="m-0">Quality Hardware for Professionals.</h4>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/pieps.jpg"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Pieps</div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/bolts.jpg"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Nuts and bolts</div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/pana.jpg"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Spanners</div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/hamer.jpg"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Hammers</div>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/cement.jfif"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Cement</div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/pums..jfif"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Charging pump</div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/pumpmoter.jfif"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Pump_moter</div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/" className="text-decoration-none">
              <img
                src="../../images/category/submersible-pump.jfif"
                className="img-fluid rounded-circle"
                alt="..."
              />
              <div className="text-center h6">Submersible_Moetr</div>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeView;
