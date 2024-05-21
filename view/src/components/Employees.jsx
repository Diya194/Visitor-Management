import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Paper,
  InputLabel,
  TableSortLabel,
} from "@mui/material";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employee");
        console.log("API Response:", response.data.rows);
        if (response.data.rows && Array.isArray(response.data.rows)) {
          setEmployees(response.data.rows);
        } else {
          setError("Invalid data received from the server");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterDesignationChange = (event) => {
    setFilterDesignation(event.target.value);
  };

  const handleFilterEmailChange = (event) => {
    setFilterEmail(event.target.value);
  };

  const handleFilterPhoneChange = (event) => {
    setFilterPhone(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDesignation === "" || employee.designation === filterDesignation) &&
      (filterEmail === "" ||
        employee.email.toLowerCase().includes(filterEmail.toLowerCase())) &&
      (filterPhone === "" ||
        employee.phone.toLowerCase().includes(filterPhone.toLowerCase()))
    );
  });

  const sortedEmployees = stableSort(filteredEmployees, getComparator(order, orderBy));

  const paginatedEmployees = sortedEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching employees: {error}</div>;
  }

  return (
    <div className="container mt-5">
<h3 className="text-center mb-4" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Employee List</h3>
      <div className="row mb-3">
        <div className="col-md-3">
          <TextField
            id="search"
            label="Search by Name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">🔍</InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="col-md-3">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filter-designation-label">Filter by Designation</InputLabel>
            <Select
              labelId="filter-designation-label"
              id="filter-designation"
              value={filterDesignation}
              onChange={handleFilterDesignationChange}
              label="Filter by Designation"
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(employees.map((employee) => employee.designation))).map((designation) => (
                <MenuItem key={designation} value={designation}>
                  {designation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filter-email-label">Filter by Email</InputLabel>
            <Select
              labelId="filter-email-label"
              id="filter-email"
              value={filterEmail}
              onChange={handleFilterEmailChange}
              label="Filter by Email"
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(employees.map((employee) => employee.email))).map((email) => (
                <MenuItem key={email} value={email}>
                  {email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filter-phone-label">Filter by Phone Number</InputLabel>
            <Select
              labelId="filter-phone-label"
              id="filter-phone"
              value={filterPhone}
              onChange={handleFilterPhoneChange}
              label="Filter by Phone Number"
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(employees.map((employee) => employee.phone))).map((phone) => (
                <MenuItem key={phone} value={phone}>
                  {phone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "designation"}
                  direction={orderBy === "designation" ? order : "asc"}
                  onClick={() => handleRequestSort("designation")}
                >
                  Designation
                </TableSortLabel>
              </TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.createdAt}</TableCell>
                <TableCell>{employee.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default Employees;
