import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  Avatar,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ClientTable = ({
  clients,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
  handleSelect,
  handleSelectAll,
}) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="client table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" width="5%">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < clients.length}
                checked={clients.length > 0 && selected.length === clients.length}
                onChange={handleSelectAll}
                aria-label="Select all clients"
              />
            </TableCell>
            <TableCell width="15%">ID</TableCell>
            <TableCell width="20%">
              <TableSortLabel
                active
                direction={sortOrder}
                onClick={handleSort}
                aria-label="Sort by client name"
              >
                Client Name
              </TableSortLabel>
            </TableCell>
            <TableCell width="10%">Logo</TableCell>
            <TableCell width="40%">Description</TableCell>
            <TableCell width="10%">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow
                key={client.id}
                hover
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(client.id)}
                    onChange={() => handleSelect(client.id)}
                    aria-label={`Select client ${client.name}`}
                  />
                </TableCell>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>
                  <Avatar
                    src={client.logo || '/fallback.png'}
                    alt={client.name}
                    sx={{ width: 50, height: 50 }}
                    onError={(e) => (e.target.src = '/fallback.png')}
                  />
                </TableCell>
                <TableCell>{client.description || '-'}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Client">
                    <IconButton
                      onClick={() => navigate(`/clients/edit/${client.id}`)}
                      aria-label={`Edit client ${client.name}`}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Client">
                    <IconButton
                      onClick={() => handleDelete(client.id)}
                      aria-label={`Delete client ${client.name}`}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;