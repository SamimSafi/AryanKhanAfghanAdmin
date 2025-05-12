import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  TablePagination,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import UserTable from './UserTable'; // Create this component
import ConfirmationDialog from '../../components/ConfirmationDialog';
import userService from '../../services/userService';
import useDebounce from '../../hooks/useDebounce';
import useUserStore from '../../context/userStore';

const UserList = () => {
  const { users, loading, deleteUser, bulkDeleteUsers, fetchUsers } = useUserStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchUsers(); // Load users on mount
  }, [fetchUsers]);

  useEffect(() => {
    const processUsers = async () => {
      let result = users;
      if (debouncedSearch.length >= 3 ) {
        result = userService.filterUsers(users, debouncedSearch);
      }
      result = userService.sortUsers(result, sortOrder);
      setFilteredUsers(result);
      setPage(1);
    };
    processUsers();
  }, [users, debouncedSearch, sortOrder]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSort = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  const handleChangePage = (event, newPage) => setPage(newPage + 1);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const currentPageUsers = userService.paginateUsers(filteredUsers, page, rowsPerPage);
      setSelected(currentPageUsers.map((user) => user.id));
    } else {
      setSelected([]);
    }
  };
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };
 
  const confirmDelete = async () => {
    try {
      if (deleteId) {
        await deleteUser(deleteId);
      } else if (selected.length > 0) {
        await bulkDeleteUsers(selected);
        setSelected([]);
      }
    } catch (error) {
      toast.error('Failed to delete users.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  const paginatedUsers = userService.paginateUsers(filteredUsers, page, rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ maxWidth: 400 }}
            placeholder="Enter at least 3 characters"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/users/create')}
          >
            Create New User
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <UserTable
            users={paginatedUsers}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </>
      )}
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message={deleteId ? 'Are you sure you want to delete this user?' : 'Are you sure you want to delete the selected users?'}
      />
    </Box>
  );
};

export default UserList;