import React, { lazy, useState, useEffect } from "react";
// 

import useAdmin from "../../hooks/useUser"; // Import the custom hook
import { data } from "../../data";
import { useSelector } from "react-redux";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

const ProductListView = () => {
  const { Product, productData } = useAdmin(); // Now you can use `my` from `useAdmin` hook here
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [view, setView] = useState("list");
  const productDatas = useSelector((state) => state.auth.productDatas);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);


  useEffect(() => {
    Product();
    const totalItems = getProducts().length;
    setTotalItems(totalItems);
  }, []);

  const onPageChanged = (page) => {
    let products = getProducts();
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    setCurrentPage(currentPage);
    setCurrentProducts(currentProducts);
    setTotalPages(totalPages);
  };

  const onChangeView = (view) => {
    setView(view);
  };


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
 
  const handlePriceFilterChange = (selectedPriceRange) => {
    setPriceFilter(selectedPriceRange);
  }
  const getProducts = () => {
    let products = data.products; // Use `my` from `useAdmin` if available, otherwise fall back to `data.products`
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    return products;
  };

  const filteredProducts = productDatas
    .filter((product) => (selectedCategory ? product.category === selectedCategory : true))
    .filter((product) => {
      if (!priceFilter) return true;
      switch (priceFilter) {
        case "priceRange1":
          return product.price >= 1 && product.price <= 100;
        case "priceRange2":
          return product.price > 100 && product.price <= 300;
        case "priceRange3":
          return product.price > 300 && product.price <= 600;
        case "priceRange4":
          return product.price > 600 && product.price <= 1500;
        case "priceRange5":
          return product.price > 1500 && product.price <= 3000;
        case "priceRange6":
          return product.price > 3000;
        default:
          return true;
      }
    });


const clearFiltersHandler = () => {
  setSelectedCategory(null);
  setPriceFilter(null);
  
};
  return (
    <React.Fragment>
      <div className="p-5 bg-primary bs-cover">
        <div className="text-center">
          <span className="display-5 px-3 rounded">Mahaluxmi Hardware</span>
        </div>
      </div>
      <Breadcrumb />
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
          <FilterCategory
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            <FilterPrice
              onPriceFilterChange={handlePriceFilterChange}
              selectedPriceRange={priceFilter}
            />
            <FilterClear onClear={clearFiltersHandler}  />
            <FilterTag />
            <CardServices />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-7">
                <span className="align-middle fw-bold">
                  {totalItems} results for{" "}
                  <span className="text-warning">"plumbing material"</span>
                </span>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <select
                  className="form-select mw-180 float-start"
                  aria-label="Default select"
                >
                  <option value={1}>Most Popular</option>
                  <option value={2}>Latest items</option>
                  <option value={3}>Trending</option>
                  <option value={4}>Price low to high</option>
                  <option value={4}>Price high to low</option>
                </select>
                <div className="btn-group ms-3" role="group">
                  <button
                    aria-label="Grid"
                    type="button"
                    onClick={() => onChangeView("grid")}
                    className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <i className="bi bi-grid" />
                  </button>
                  <button
                    aria-label="List"
                    type="button"
                    onClick={() => onChangeView("list")}
                    className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <i className="bi bi-list" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              {view === "grid" && (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <div key={idx} className="col-md-4">
                      <CardProductGrid data={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <h5 className="text-muted">No products available for the selected category.</h5>
                  </div>
                )
              )}
              {view === "list" && (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <div key={idx} className="col-md-12">
                      <CardProductList data={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <h5 className="text-muted">No products available for the selected category.</h5>
                  </div>
                )
              )}
            </div>
            <hr />
            <Paging
              totalRecords={totalItems}
              pageLimit={9}
              pageNeighbours={3}
              onPageChanged={onPageChanged}
              sizing=""
              alignment="justify-content-center"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductListView;
