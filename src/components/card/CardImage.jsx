import React from "react";
import { Link } from "react-router-dom";

const CardImage = (props) => {
  return (
    <Link >
      <div className={`card shadow-sm `}>
        <div className="card-body p-0">
          <img
           src="../../images/category/paint.jpg"
            className="img-fluid rounded"
            alt="ddf"
          />
        </div>
      </div>
    </Link>
  );
};

export default CardImage;
