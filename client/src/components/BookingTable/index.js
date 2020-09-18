import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import moment from 'moment';

import BookingTableActions from '../BookingTableActions';

const useStyles = makeStyles((theme) => ({
  table: {
    marginLeft: 9,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: grey[400],
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
}))(TableRow);

const BookingTable = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsResponse = await fetch(
          'http://localhost:4000/api/booking',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const bookings = await bookingsResponse.json();
        setRows(
          bookings.sort(
            (a, b) => new Date(a.booking_date) - new Date(b.booking_date)
          )
        );
      } catch (err) {
        console.error('Failed to fetch bookings: ', err);
      }
    };

    getBookings();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Table className={classes.table} aria-label='bookings table'>
      <TableHead>
        <TableRow>
          <StyledTableCell>Customer</StyledTableCell>
          <StyledTableCell align='right'>Email</StyledTableCell>
          <StyledTableCell align='right'>Address</StyledTableCell>
          <StyledTableCell align='right'>Booking Type</StyledTableCell>
          <StyledTableCell align='right'>Booking Date/Time</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (
          <StyledTableRow key={row.booking_id}>
            <TableCell component='th' scope='row'>
              {row.first_name} {row.last_name}
            </TableCell>
            <TableCell align='right'>{row.email}</TableCell>
            <TableCell align='right'>{row.address1}</TableCell>
            <TableCell align='right'>{row.booking_type}</TableCell>
            <TableCell align='right'>
              {moment(row.booking_date).format('MMMM D, YYYY')} at{' '}
              {moment(row.booking_time).format('h:mm a')}
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
            colSpan={5}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={BookingTableActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default BookingTable;
