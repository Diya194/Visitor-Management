import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [filterByEmail, setFilterByEmail] = useState("");
  const [filterByPhone, setFilterByPhone] = useState("");

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/visitor");
        console.log("Response Data:", response.data); // Log the response data
        if (response.data && Array.isArray(response.data.rows)) {
          setVisitors(response.data.rows);
          setFilteredVisitors(response.data.rows);
        } else {
          console.error("Invalid data received from the server");
        }
      } catch (error) {
        console.error("Error fetching visitors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = visitors.filter((visitor) =>
      Object.values(visitor).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setFilteredVisitors(filtered);
  };

  const handleFilterByEmailChange = (event) => {
    setFilterByEmail(event.target.value);
  };

  const handleFilterByPhoneChange = (event) => {
    setFilterByPhone(event.target.value);
  };

  const sortedVisitors = stableSort(filteredVisitors, getComparator(order, orderBy));
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedVisitors.length - page * rowsPerPage);

  return (
    <div>
      <h3 className="text-center mb-4" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Visitors List</h3>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 10 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <FormControl style={{ minWidth: 200, marginBottom: 10, marginRight: 10 }}>
        <InputLabel>Filter By Email</InputLabel>
        <Select
          value={filterByEmail}
          onChange={handleFilterByEmailChange}
        >
          <MenuItem value="">None</MenuItem>
          {visitors.map(visitor => (
            <MenuItem key={visitor.email} value={visitor.email}>{visitor.email}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ minWidth: 200, marginBottom: 10 }}>
        <InputLabel>Filter By Phone</InputLabel>
        <Select
          value={filterByPhone}
          onChange={handleFilterByPhoneChange}
        >
          <MenuItem value="">None</MenuItem>
          {visitors.map(visitor => (
            <MenuItem key={visitor.phone} value={visitor.phone}>{visitor.phone}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : "asc"}
                  onClick={handleSort("phone")}
                >
                  Phone
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "purpose"}
                  direction={orderBy === "purpose" ? order : "asc"}
                  onClick={handleSort("purpose")}
                >
                  Purpose
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVisitors
              .filter(visitor => (filterByEmail ? visitor.email === filterByEmail : true) && (filterByPhone ? visitor.phone === filterByPhone : true))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell>{visitor.name}</TableCell>
                  <TableCell>{visitor.email}</TableCell>
                  <TableCell>{visitor.phone}</TableCell>
                  <TableCell>{visitor.purpose}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredVisitors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Visitors;

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
