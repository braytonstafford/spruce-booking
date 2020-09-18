import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Button,
} from '@material-ui/core';

import SpruceLogo from './components/logo.svg';
import BookingTable from './components/BookingTable';
import BookingDialog from './components/BookingDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: 9,
    marginLeft: 9,
  },
  createButton: {
    margin: theme.spacing(1),
    alignSelf: 'flex-end',
  },
  logo: {
    margin: theme.spacing(1),
    width: '9%',
  },
  appBar: {
    backgroundColor: '#FFF',
    height: 54,
  },
  table: {
    marginLeft: 9,
    paddingRight: 27,
  },
}));

export default function App() {
  const classes = useStyles();
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <img src={SpruceLogo} alt='Spruce Logo' className={classes.logo} />
        </Toolbar>
      </AppBar>
      <Grid container direction='row'>
        <Grid item xs={9}>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            className={classes.title}
          >
            Bookings
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box
            m={1}
            display='flex'
            alignItems='flex-end'
            flexDirection='column'
          >
            <Button
              variant='contained'
              color='secondary'
              className={classes.createButton}
              onClick={() => setShowBookingForm(true)}
            >
              Create booking
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.table}>
          <BookingTable />
        </Grid>
      </Grid>
      <BookingDialog
        showBookingForm={showBookingForm}
        setShowBookingForm={setShowBookingForm}
      />
    </div>
  );
}
