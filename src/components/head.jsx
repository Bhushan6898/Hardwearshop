import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/images/mylogo1.png"; // Replace with your logo path

import TopMenu from "./TopMenu";
import LandingTopMenu from "./landingtop";

const Header = () => {
  return (
    <header
      className=" "
      style={{
        backgroundImage: `url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURExMYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDysZFRkrKysrLTcrKy0tLSstNy0rNy0rKy0tKy0rKy0rLSstKy0rKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIDBv/EABgQAQEBAQEAAAAAAAAAAAAAAAARAQMC/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECBgP/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/APfJByjoUQNBpBAaqzVSkNFQqLDQhSqQKqlChUgagKKUAlGqN0ClWNVM1VKQpk0pChVQKFIFBKNIKiKIIV2CTbCLKAhIEgt1FSFG6imhBKQoVVFKrNW6UhQopVhqrNVSkO6qAlWFBFCWVSjVVZJSGqsmlIaaxThSNVBYqNIJR2oCbrBQVSiQBVNG6t1ndZqwjdCpVNTKShVGhKpq0JKJUIqlUBKFUAVpBFCggKQohOaygaQKhOMpajQFRSO1VZorVZjW6KKCkaVZqqVYdAoSrCkKBQQEIIqQSCQqRUkgWoIUhKoHDWKatIaggJCENNZQNVVlUpCmahY7IJtgihJRVICkVBA6KkKUKqUhAq1KRaghUhUgUEKUABoQRSggaWMlUaqrKoRqplUI1uspBDUADugmmFqQAjUhUlRUCAqBASLCEBShUgUAoaqBUVqjdFCLCqEBQQE4yQKCVCWcIJBAamd1JVjuhRW682gqKilbrNVKQ0ChKsaAWlWNUVlBGqKKkIdFCFjQooKRqgJFKCAoIEQgKwJRoJASyaIgqgZRSK6oVVWDRRqFNCAKoJFSCKpqoQGoIEhqApJBJIEghShqAoJQoFBIERJLFEUgCSBohVUNCQJagggkKkkgkFoEIaKkEKaQhCqEBQqAhACqFopVCQNVCBqqslUJZwgUkIiBQNVQoFBAUEKRurQBGqjdFIWDdAhJBEIUqhCFBKFAVFaGiihGkFQaQxCEggUDiokkAprOKorQQVCghSAkGgAEaAoosao3RVRYc1UKgUECKAFCgDuoJBEICaEoTgOCE4EI0IqqqFKoHLzrQSN6VUhFRupAqKUKzVUkVVVIIlUgVVSBJIEkgQSAVYkK0khlFIEakCqqSoaqkDG9CkzWpj//2Q==)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "none",
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-6 col-md-4 text-center text-md-start mb-3 mb-md-0">
            <Link to="/">
              <img
                alt="Mahaluxmi Hardware Logo"
                src={logo}
                className="img-fluid"
                style={{
                  width: "300px",
                  height: "auto",
                }}
              />
            </Link>
          </div>
         
          <div className="col-12
           col-md-8 d-flex ">
            <LandingTopMenu/>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
