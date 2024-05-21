import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, Button, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination, TableSortLabel, Select, MenuItem } from "@mui/material";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/assests")
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && response.data.rows && response.data.rows.length > 0) {
          console.log("Assets data:", response.data.rows);
          setAssets(response.data.rows);
          extractFilters(response.data.rows);
        } else {
          console.error("API Error: No data returned");
          alert("Error fetching assets. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        alert("Error fetching assets. Please try again.");
      });
  }, []);

  const extractFilters = (data) => {
    const uniqueDepartments = Array.from(new Set(data.map(asset => asset.department)));
    const uniqueStatuses = Array.from(new Set(data.map(asset => asset.status)));
    setDepartments(uniqueDepartments);
    setStatuses(uniqueStatuses);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/assests/${id}`);
      setAssets(assets.filter(asset => asset.id !== id));
      alert("Asset deleted successfully!");
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === "" || asset.department === departmentFilter) &&
      (statusFilter === "" || asset.status === statusFilter)
  );

  const sortedAssets = stableSort(filteredAssets, getComparator(order, orderBy));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedAssets.length - page * rowsPerPage);

  return (
    <div className="px-5 mt-3">
      <h3 className="text-center mb-4" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Assets List</h3>

      <Link to="/dashboard/add_assest">
          <Button variant="contained" color="primary">Add Assets</Button>
        </Link>
       <div className="d-flex justify-content-end mb-3">
        <TextField
          id="search"
          label="Search Asset"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={departmentFilter}
          onChange={handleDepartmentFilterChange}
          variant="outlined"
          displayEmpty
          inputProps={{ 'aria-label': 'Department' }}
        >
          <MenuItem value="">
            <em>All Departments</em>
          </MenuItem>
          {departments.map((department) => (
            <MenuItem key={department} value={department}>{department}</MenuItem>
          ))}
        </Select>
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          variant="outlined"
          displayEmpty
          inputProps={{ 'aria-label': 'Status' }}
        >
          <MenuItem value="">
            <em>All Status</em>
          </MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Assigned Employee ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAssets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.department}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.remark}</TableCell>
                  <TableCell>{asset.aId}</TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/edit-assest/${asset.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(asset.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAssets.length}
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
  return order === 'desc'
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

export default Assets;
