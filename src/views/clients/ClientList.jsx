import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  TablePagination,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import useClientStore from './../../context/clientStore';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ClientTable from './ClientTable ';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import clientService from '../../services/clientService';
import useDebounce from '../../hooks/useDebounce';
const ClientList = () => {
  const { clients, loading, deleteClient, bulkDeleteClients, fetchClients } = useClientStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [hasLogo, setHasLogo] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchClients(); // Load clients on mount
  }, [fetchClients]);

  useEffect(() => {
    const processClients = async () => {
      let result = clients;
      if (debouncedSearch.length >= 3 || hasLogo) {
        result = clientService.filterClients(clients, debouncedSearch, hasLogo);
      }
      result = clientService.sortClients(result, sortOrder);
      setFilteredClients(result);
      setPage(1);
    };
    processClients();
  }, [clients, debouncedSearch, hasLogo, sortOrder]);

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
      const currentPageClients = clientService.paginateClients(filteredClients, page, rowsPerPage);
      setSelected(currentPageClients.map((client) => client.id));
    } else {
      setSelected([]);
    }
  };
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };
  const handleBulkDelete = () => {
    if (selected.length === 0) return toast.error('No clients selected.');
    setOpenDialog(true);
  };
  const confirmDelete = async () => {
    try {
      if (deleteId) {
        await deleteClient(deleteId);
      } else if (selected.length > 0) {
        await bulkDeleteClients(selected);
        setSelected([]);
      }
    } catch (error) {
      toast.error('Failed to delete clients.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  const paginatedClients = clientService.paginateClients(filteredClients, page, rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client Management
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
            label="Search Clients"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ maxWidth: 400 }}
            placeholder="Enter at least 3 characters"
          />
          <FormControlLabel
            control={<Checkbox checked={hasLogo} onChange={(e) => setHasLogo(e.target.checked)} />}
            label="Show clients with logo"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkDelete}
            disabled={selected.length === 0}
          >
            Delete Selected
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/clients/create')}
          >
            Create New Client
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ClientTable
            clients={paginatedClients}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={filteredClients.length}
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
        message={deleteId ? 'Are you sure you want to delete this client?' : 'Are you sure you want to delete the selected clients?'}
      />
    </Box>
  );
};

export default ClientList;