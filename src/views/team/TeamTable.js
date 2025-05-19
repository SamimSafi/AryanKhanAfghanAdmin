/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableSortLabel,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as LogoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from '../../components/ImageDisplay';

const TeamTable = ({
  Team,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeamyId, setSelectedTeamyId] = useState(null);

  // Handle menu open
  const handleMenuOpen = (event, teamyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeamyId(teamyId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTeamyId(null);
  };

  // Handle menu actions
  const handleMenuAction = (action, teamyId) => {
    switch (action) {
      case 'edit':
        navigate(`/team/edit/${teamyId}`);
        break;
      case 'delete':
        handleDelete(teamyId);
        break;
      case 'updateImage':
        navigate(`/team/${teamyId}/image`);
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active
                direction={sortOrder}
                onClick={handleSort}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Name Pashto</TableCell>
            <TableCell>Name Dari</TableCell>
            <TableCell>jobTitle</TableCell>
            <TableCell>jobTitle Pashto</TableCell>
            <TableCell>jobTitle Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>facebook</TableCell>
            <TableCell>twitter</TableCell>
            <TableCell>instagram</TableCell>
            <TableCell>linkedIn</TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Team.map((teamy) => (
            <TableRow
              key={teamy.id}
              selected={selected.includes(teamy.id)}
            >
              <TableCell>{teamy.name}</TableCell>
              <TableCell>{teamy.name_pashto}</TableCell>
              <TableCell>{teamy.name_dari}</TableCell>
              <TableCell>{teamy.jobTitle}</TableCell>
              <TableCell>{teamy.jobTitle_pashto}</TableCell>
              <TableCell>{teamy.jobTitle_dari}</TableCell>
              <TableCell>{teamy.description}</TableCell>
              <TableCell>{teamy.description_pashto}</TableCell>
              <TableCell>{teamy.description_dari}</TableCell>
              <TableCell>{teamy.facebook}</TableCell>
              <TableCell>{teamy.twitter}</TableCell>
              <TableCell>{teamy.linkedIn}</TableCell>
              <TableCell>{teamy.description_dari}</TableCell>
              <TableCell>
                <ImageDisplay
                              path={teamy.image}
                              alt={teamy.name}
                              fallbackText="No Logo"
                            />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={(event) => handleMenuOpen(event, teamy.id)}
                  color="primary"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedTeamyId === teamy.id}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleMenuAction('edit', teamy.id)}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('delete', teamy.id)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('updateImage', teamy.id)}>
                    <ListItemIcon>
                      <LogoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Update Image</ListItemText>
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;