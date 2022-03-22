import React, { useEffect, useState } from "react";
import TopSection from "./TopSection";

const Viewrecipe = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(JSON.parse(localStorage.getItem("contacts")));
  }, []);
  const deleteContact = (record, index) => {
    setRecords(records.filter((el) => el !== record));
    records.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(records));
  };

  return (
    <>
      <TopSection />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Recipe Name</th>
            <th scope="col">Description</th>
            <th scope="col">address</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records?.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.recipename}</td>
                  <td>{record.description}</td>
                  <td>{record.address}</td>
                  <td>
                    <button
                      className="deletebtn"
                      onClick={() => deleteContact(record, index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Viewrecipe;
