import { Link } from "react-router-dom";
import { BaseURL } from "../../repository/repository";

const CardProductGrid = (props) => {
  const product = props.data;
  console.log(product);
 
  return (
    <div className="card">
  <img
   src={`${BaseURL}${product.imageUrl}`}
    
    className="card-img-top"
    alt={product.name}
  />
  {product.isNew && (
    <span className="badge bg-success position-absolute mt-2 ms-2">New</span>
  )}
  {product.isHot && (
    <span className="badge bg-danger position-absolute r-0 mt-2 me-2">Hot</span>
  )}
  {(product.discountPercentage > 0 || product.discountPrice > 0) && (
    <span
      className={`rounded position-absolute p-2 bg-warning ms-2 small ${
        product.isNew ? "mt-5" : "mt-2"
      }`}
    >
      -{product.discountPercentage > 0
        ? product.discountPercentage + "%"
        : "$" + product.discountPrice}
    </span>
  )}

  <div className="card-body">
    {/* Product Name */}
    <h6 className="card-subtitle mb-2">
      <Link to={product.link} className="text-decoration-none">
        {product.name}
      </Link>
    </h6>

    {/* Product Category */}
    <p className="small">
      <strong>Category: </strong> {product.category}
    </p>

    {/* Product Brand */}
    <p className="small">
      <strong>Brand: </strong> {product.brand}
    </p>

    {/* Product Description */}
    {product.description && (
      <p className="small">
        <strong>Description: </strong> {product.description}
      </p>
    )}

    {/* Created At */}
    <p className="small">
      <strong>Added on: </strong>{" "}
      {new Date(product.createdAt).toLocaleDateString()}
    </p>

    {/* Price and Star Rating */}
    <div className="my-2">
      <span className="fw-bold h5">${product.price}</span>
      {product.originPrice > 0 && (
        <del className="small text-muted ms-2">${product.originPrice}</del>
      )}
      <span className="ms-2">
        {Array.from({ length: product.star }, (_, key) => (
          <i className="bi bi-star-fill text-warning me-1" key={key} />
        ))}
      </span>
    </div>

    {/* Action Buttons */}
    <div className="btn-group d-flex" role="group">
      <button type="button" className="btn btn-sm btn-primary" title="Add to cart">
        <i className="bi bi-cart-plus" />
      </button>
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary"
        title="Add to wishlist"
      >
        <i className="bi bi-heart-fill" />
      </button>
    </div>
  </div>
</div>

  );
};

export default CardProductGrid;
