import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: 9,
    paddingBottom: 3,
  },
}));

const BookingDialog = ({ showBookingForm, setShowBookingForm }) => {
  const classes = useStyles();
  const [bookingTypes, setBookingTypes] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [bookingType, setBookingType] = useState(1);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingTime, setBookingTime] = useState(new Date());

  useEffect(() => {
    const getBookingTypes = async () => {
      try {
        const bookingTypeListResponse = await fetch(
          'http://localhost:4000/api/bookingType',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const bookingTypeList = await bookingTypeListResponse.json();

        setBookingTypes(bookingTypeList);
      } catch (err) {
        console.warn('Failed to fetch booking types: ', err);
      }
    };
    getBookingTypes();
  }, []);

  const addBooking = async () => {
    // TODO: Create the customer and get the id returned
    let customerId = null;
    try {
      const addCustomerResponse = await fetch(
        'http://localhost:4000/api/customer',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            created_at: new Date(),
            updated_at: new Date(),
            first_name: name.split(' ').slice(0, -1).join(' '),
            last_name: name.split(' ').pop(),
            address1,
            city,
            state,
            zip,
            email,
          }),
        }
      );

      const customerIdResponse = await addCustomerResponse.json();
      if (!customerIdResponse.error) {
        customerId = customerIdResponse.data;
      } else {
        console.error(
          'Failed to create customer: ',
          customerIdResponse.message
        );
      }
    } catch (err) {
      console.error('Failed to create customer: ', err);
    }

    // TODO: Create the booking
    try {
      const createBookingResponse = await fetch(
        'http://localhost:4000/api/booking',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            created_at: new Date(),
            updated_at: new Date(),
            customer_id: customerId,
            booking_type_id: bookingType,
            booking_date: moment(bookingDate).format('YYYY-MM-DD HH:mm:ss'),
            booking_time: moment(bookingTime).format('YYYY-MM-DD HH:mm:ss'),
          }),
        }
      );

      const createBooking = await createBookingResponse.json();
      if (!createBooking.error) {
      } else {
        console.error('Failed to create booking: ', createBooking.message);
      }
    } catch (err) {
      console.error('Failed to create booking: ', err);
    }
    setShowBookingForm(false);
  };

  return (
    <Dialog
      open={showBookingForm}
      onClose={() => setShowBookingForm(!showBookingForm)}
      aria-labelledby='booking-form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Create Booking</DialogTitle>
      <DialogContent>
        <Grid container direction='row' spacing={3}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              onChange={(event) => setName(event.target.value)}
              label='Name'
              fullWidth
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin='dense'
              id='email'
              onChange={(event) => setEmail(event.target.value)}
              label='Email'
              type='email'
              fullWidth
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin='dense'
              id='address1'
              onChange={(event) => setAddress1(event.target.value)}
              label='Street Address'
              fullWidth
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin='dense'
              id='city'
              onChange={(event) => setCity(event.target.value)}
              label='City'
              fullWidth
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container direction='row' spacing={3}>
              <Grid item xs={6}>
                <TextField
                  margin='dense'
                  id='state'
                  onChange={(event) => setState(event.target.value)}
                  label='State'
                  fullWidth
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin='dense'
                  id='zip'
                  onChange={(event) => setZip(event.target.value)}
                  label='Zip'
                  fullWidth
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='bookingType-label'>Booking type</InputLabel>
              <Select
                labelId='bookingType-label'
                id='bookingType-select'
                margin='dense'
                value={bookingType}
                onChange={(event) => setBookingType(event.target.value)}
                label='Booking type'
                fullWidth
              >
                {bookingTypes.map((type) => (
                  <MenuItem
                    key={type.booking_type_id}
                    value={type.booking_type_id}
                  >
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              clearable
              margin='dense'
              inputVariant='outlined'
              label='Booking date'
              format={moment(bookingDate).format('MM/DD/YYYY')}
              value={bookingDate}
              onChange={(date) => setBookingDate(date)}
              animateYearScrolling
              fullWidth
            />
            <TimePicker
              margin='dense'
              inputVariant='outlined'
              showTodayButton
              todayLabel='now'
              label='Booking time'
              value={bookingTime}
              minutesStep={5}
              onChange={(time) => setBookingTime(time)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => addBooking()}
          variant='contained'
          color='secondary'
        >
          Create booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BookingDialog.propTypes = {
  showBookingForm: PropTypes.bool,
  setShowBookingForm: PropTypes.func,
};

export default BookingDialog;
