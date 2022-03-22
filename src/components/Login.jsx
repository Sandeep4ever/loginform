import React, { useContext, useState, useEffect } from "react";
import { AuthProvider } from "../App";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const gettingLocalStorageData = () => {
    let list = JSON.parse(localStorage.getItem("contacts"));
    if (list && list.length > 0) {
      return list;
    } else {
      return [];
    }
  };

  const [auth, handleAuth] = useContext(AuthProvider);
  const [loginData, setLoginData] = useState({
    email: "",
    psw: "",
  });

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    setAllData(gettingLocalStorageData());
    localStorage.setItem("isLogin", false);
  }, []);

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (validator.isEmail(loginData.email)) {
      setEmailError("Valid Email :)");
      if (validator.isStrongPassword(loginData.psw)) {
        setPassword("Valid Password :)");
      } else {
        setPassword("Enter valid Password!");
      }
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const matchFoundArr = [];
    const onlyUserNameMatchedData = [];
    const noDataMatch = [];
    if (allData.length === 0) {
      alert("No data found please Register");
      setLoginData({
        email: "",
        psw: "",
      });
    }
    if (allData && allData.length > 0) {
      allData.forEach((el, index) => {
        if (el.email === loginData.email && el.psw === loginData.psw) {
          matchFoundArr.push(el);
        }
        if (el.email === loginData.email && el.psw !== loginData.psw) {
          onlyUserNameMatchedData.push(el);
        } else {
          noDataMatch.push("No Match found! please Register");
        }
      });
      if (matchFoundArr && matchFoundArr.length > 0) {
        handleAuth();
        localStorage.setItem("isLogin", true);
        localStorage.setItem("userData", JSON.stringify(matchFoundArr));
        setTimeout(() => {
          navigate("home");
        }, 500);
      }
      if (
        onlyUserNameMatchedData &&
        onlyUserNameMatchedData.length > 0 &&
        matchFoundArr.length === 0
      ) {
        alert("password is wrong");
      }
      if (
        noDataMatch &&
        noDataMatch.length > 0 &&
        onlyUserNameMatchedData.length === 0 &&
        matchFoundArr.length === 0
      ) {
        alert("No combination found !");
      }
    }
  };

  return (
    <>
      <div className="Container-fluid">
        <div className="row pt-5 main">
          <div className="col-md-6 mt-md-5 mt-2 text-section">
            <h1 className="Heading">Sandeep 😊</h1>
            <p className="Paragraf">
              Welcome to My websites be happy always and keep doing good
            </p>
          </div>
          <div className="col-md-6 mt-md-5 mt-2 loginboxmain">
            <form onSubmit={handleLogin}>
              <div className="LogInBox">
                <input
                  type="text"
                  className="input"
                  placeholder="Email address"
                  value={loginData.email}
                  name="email"
                  onChange={handleLoginInput}
                  autoComplete="off"
                  required
                />
                <span
                  style={{
                    marginTop: "-.4rem",
                    fontSize: ".6rem",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {emailError}
                </span>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="psw"
                  value={loginData.psw}
                  onChange={handleLoginInput}
                  autoComplete="off"
                  required
                />
                <span
                  style={{
                    marginTop: "-.4rem",
                    fontSize: ".6rem",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {password}
                </span>
                <button className="button">Log In</button>
                <hr />
                <Link to="/register" className="newAccount">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
