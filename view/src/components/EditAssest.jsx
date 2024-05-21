import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';

function EditAssest({ }) {
  const {id} = useParams();
  const [assests, setassests] = useState({
    name: "",
    department: "",
    status: "",
    remark: "",
    aId: "",
  });

  useEffect(() => {
    fetchassests();
  }, [id]);

  async function fetchassests() {
    try {
      const response = await axios.get(`http://localhost:3000/assests/${id}`);
      setassests(response.data);
    } catch (error) {
      console.error("Error fetching assests:", error);
    }
  }

  function handleInputChange(e) {
    setassests({ ...assests, [e.target.name]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/assests/${id}`, assests);
      alert("assests updated successfully!");
      window.location.reload();
    } catch (error) {
      alert("An error occurred!");
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit assests</h1>
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
            value={assests.name}
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
            value={assests.department}
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
            value={assests.status}
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
            value={assests.remark}
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
            value={assests.aId}
            onChange={handleInputChange}
            disabled
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

export default EditAssest;
