/* eslint-disable react/prop-types */
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
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../api/baseURL';

const PartnershipTable = ({
  Partnership,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
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
                link 
              </TableSortLabel>
            </TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Partnership.map((Partnership) => (
            <TableRow
              key={Partnership.id}
              selected={selected.includes(Partnership.id)}
            >
              <TableCell>{Partnership.link}</TableCell>
              <TableCell> {Partnership.logoPath ? (
                      <img
                        src={baseURL+`${Partnership.logoPath.replace(/\\/g, '/')}`}
                        alt={Partnership.fullName}
                        style={{
                          maxWidth: '50px',
                          maxHeight: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                        onError={(e) => {
                          console.error('Image load error:', Partnership.logoPath);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Typography variant="caption">No image</Typography>
                    )}
                    </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/partnership/edit/${Partnership.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Partnership.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PartnershipTable;