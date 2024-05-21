import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Employees from "./components/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assets from "./components/Assets";
import Visitors from "./components/Visitors";
import Signup from "./components/Signup";
import AddAssest from "./components/AddAssest";
import VisitorForm from "./components/VisitorForm";
import EditAssest from "./components/EditAssest";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        
        <Route path="/visitorform" element={<VisitorForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>

          <Route path="/dashboard/employees" element={<Employees />}></Route>


          <Route path="/dashboard/add_assest" element={<AddAssest />}></Route>
          <Route path="/dashboard/edit-assest/:id" element={<EditAssest />}></Route>
          <Route path="/dashboard/assets" element={<Assets />}></Route>
          <Route path="/dashboard/visitors" element={<Visitors />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
