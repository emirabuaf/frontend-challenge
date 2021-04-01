import React, { FC, useState, useEffect } from 'react';
import { Box, Grid, createStyles, makeStyles, Typography, Chip } from '@material-ui/core';
import { DeleteIcon } from '../../../svg/DeleteIcon';
import { formatToDate } from '../ListItem';
import { Ticket } from '../../../shared/types';


const useStyles = makeStyles((theme) =>
  createStyles({
    row: {
      display: 'flex',
      marginBottom: '28px',
      alignItems: "flex-end",
    },
    user: {
      borderBottom: '1px solid #F1F1F1',
      marginBottom: '24px',
    },
    header: {
      marginBottom: '4px',
    },
    status: {
        width: '101px',
        height: '19px',
        borderRadius: 4,
        fontSize: 11,
        lineHeight: '15px',
        fontWeight: theme.typography.fontWeightBold,
        color: '#FFFFFF',
    },
    openBackgroundColor: {
        backgroundColor: '#5B994C',
    },
    closedBackgroundColor: {
        backgroundColor:"#616161"
    }
  })
);

const TicketsListMobile: FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<Ticket[]>([]);

  useEffect(() => {
    fetch('api/tickets')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const deleteUser = (id: number) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    fetch(`/api/tickets/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  };


  return (
    <Grid>
      {users.map((user) => (
        <Box key={user.id} className={classes.user}>
          <Box className={classes.row}>
            <Grid item xs={6}>
              <Typography className={classes.header}>ID</Typography>
              <Typography>{user.id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.header}>Requested by</Typography>
              <Typography>{`${user.user.firstName} ${user.user.lastName}`}</Typography>
            </Grid>
          </Box>
          <Box className={classes.row}>
            <Grid item xs={6}>
              <Typography className={classes.header}>Create date</Typography>
              <Typography>{formatToDate(user.createdAt)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.header}>Due date</Typography>
              <Typography>{formatToDate(user.dueDate)}</Typography>
            </Grid>
          </Box>
          <Box className={classes.row}>
            <Grid item xs={6}>
              <Typography className={classes.header}>Status</Typography>
              <Chip label={user.status} className={classes.status + " " + (user.status == "OPEN" ? classes.openBackgroundColor : classes.closedBackgroundColor)} />
            </Grid>
            <Grid item xs={6}>
            <DeleteIcon handleDelete={() => deleteUser(user.id)}/>
            </Grid>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export { TicketsListMobile };
