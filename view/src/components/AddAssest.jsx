import React, { useState } from "react";
import axios from "axios";

function AddAssest() {
  const [assest, setAssest] = useState({
    name: "",
    department: "",
    status: "",
    remark: "",
    aId: "",
  });

  function handleInputChange(e) {
    setAssest({ ...assest, [e.target.name]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/assests/add", assest);
      alert("Asset created sucessfully!");
      window.location.reload();
    } catch (error) {
      alert("An error occurred!");
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Asset</h1>
      <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            name="name"
            value={assest.name}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="department"
          >
            Department
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="department"
            name="department"
            value={assest.department}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="status"
            name="status"
            value={assest.status}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="remark"
          >
            Remark
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="remark"
            name="remark"
            value={assest.remark}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="aId"
          >
            aId
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="aId"
            name="aId"
            value={assest.aId}
            onChange={handleInputChange}
          ></input>
        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddAssest;