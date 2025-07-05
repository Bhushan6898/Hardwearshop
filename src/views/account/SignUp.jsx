import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import backgroundImg from '../../images/register.jpg';
const SingUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
    console.log(values);
  };
  const { t } = useTranslation();
  return (
    <div className="container my-3"  style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
    
      backgroundRepeat: "no-repeat",
    }}>
      <div className="row ">
        <div className="col-md-6 p-3  d-md-block">
         
          <Link to="/">
            <img
             src="../../images/signup/regist2.png"
              alt="..."
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center"  style={{
              color: 'white', // Sets the text color to white
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            }}> {t("signUp")}</h4>
          <SingUpForm onSubmit={onSubmit}  />
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
