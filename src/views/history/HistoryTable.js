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
} from '@mui/material';
import { Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useHistorytore from '../../context/HistoryStore';

const HistoryFormTable = ({
  History,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateHistory, deactivateHistory } = useHistorytore();
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
                title
              </TableSortLabel>
            </TableCell>
            <TableCell>Title Pashto</TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>Sub Title</TableCell>
            <TableCell>Sub Title Pashto</TableCell>
            <TableCell>Sub Title Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {History.map((History) => (
            <TableRow
              key={History.id}
              selected={selected.includes(History.id)}
            >
              <TableCell>{History.title}</TableCell>
              <TableCell>{History.title_pashto}</TableCell>
              <TableCell>{History.title_dari}</TableCell>
              <TableCell>{History.subTitle}</TableCell>
              <TableCell>{History.subTitle_pashto}</TableCell>
              <TableCell>{History.subTitle_dari}</TableCell>
              <TableCell>{History.description}</TableCell>
              <TableCell>{History.description_pashto}</TableCell>
              <TableCell>{History.description_dari}</TableCell>
              <TableCell>
                        {History.isActive ? (
                          <span style={{ backgroundColor: 'green', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ backgroundColor: 'red', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                            Deactive
                          </span>
                        )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/history/edit/${History.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(History.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {History.isActive ? (
              <IconButton
                onClick={() => deactivateHistory(History.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateHistory(History.id)}
                color="success"
              >
                <CheckCircle />
              </IconButton>
            )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryFormTable;