import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopSection from "./TopSection";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("isLogin")) {
      setUserData(JSON.parse(localStorage.getItem("userData"))[0]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("userData");
    navigate("/");
  };
  const getLocalStorage = () => {
    let list = JSON.parse(localStorage.getItem("contacts"));
    if (list) {
      return list;
    } else {
      return [];
    }
  };
  const [records, setRecords] = useState([]);
  const [contact, setContact] = useState({
    recipename: "",
    description: "",
    address: "",
  });

  useEffect(() => {
    setRecords(getLocalStorage());
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...contact, id: new Date().getTime().toString() };
    setRecords([...records, newRecord]);
    let docs = localStorage.getItem("contacts");
    if (docs !== null) {
      let docArray = JSON.parse(docs) || [];
      docArray = [...docArray, newRecord];
      localStorage.setItem("contacts", JSON.stringify(docArray));
    } else {
      let docArray = [newRecord];
      localStorage.setItem("contacts", JSON.stringify(docArray));
    }
    setContact({ recipename: "", description: "", address: "" });
    setTimeout(() => {
      alert("Data is saved");
    }, 500);
  };

  return (
    <>
      <div className="homepage">
        <div className="navbar">
          <div className="logoDiv">
            <div>
              <span className="homename">Dashboard</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btnhome">
            Logout
          </button>
        </div>
        <div className="addRecipe_page">
          <TopSection />
          <form
            className="form_area"
            onSubmit={handleSubmit}
            name="contactform"
          >
            <div>
              <label htmlFor="recipename">Recipe Name</label>
              <br />
              <input
                type="text"
                autoComplete="off"
                value={contact.recipename}
                onChange={handleInput}
                name="recipename"
                required
              />
              <br />
              <label htmlFor="description">Enter Description:</label>
              <br />
              <input
                type="text"
                autoComplete="off"
                value={contact.description}
                onChange={handleInput}
                name="description"
                required
              />
              <br />
              <label htmlFor="address">Enter Address:</label>
              <br />
              <input
                type="text"
                autoComplete="off"
                value={contact.address}
                onChange={handleInput}
                name="address"
                required
              />
              <br /> <br />
              <input type="submit" value="Add" className="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
