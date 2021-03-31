import React, { FC, useState, useEffect } from 'react';
import { Box, Grid, createStyles, makeStyles, Typography, Chip } from '@material-ui/core';
import { DeleteIcon } from '../../../svg/DeleteIcon';
import { formatToDate } from '../ListItem';

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
  })
);

const TicketsListMobile: FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<any[]>([]);

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

  return (
    <Grid className={classes.root}>
      {users.map((user) => (
        <Box className={classes.user}>
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
              <Chip label={user.status} />
            </Grid>
            <Grid item xs={6}>
              <DeleteIcon />
            </Grid>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export { TicketsListMobile };
