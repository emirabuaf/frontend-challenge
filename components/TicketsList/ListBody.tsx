import React, { FC, useState, useEffect } from 'react';
import { useTickets } from '../../hooks/useTickets';
import { CenteredCircularProgress } from '../CenteredCircularProgress';
import { NothingFound } from '../NothingFound';
import { ListItem } from './ListItem';
import { Box, createStyles, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 49px)',
      overflowY: 'scroll',
    },
    listItem: {
      borderBottom: '1px solid #F1F1F1',
      padding: theme.spacing(2, 1.5),
    },
  })
);

type ListBodyProps = {};

const ListBody: FC<ListBodyProps> = () => {
  const classes = useStyles();
  const { isLoading, data: tickets } = useTickets();
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
      .then(() => console.log('deleted'))
      .catch((error) => console.log(error));
  };

  const isEmptyContent = !isLoading && !tickets?.length;

  return (
    <Box className={classes.root}>
      {isLoading && <CenteredCircularProgress />}
      {isEmptyContent ? (
        <NothingFound />
      ) : (
        users?.map((ticket) => <ListItem handleDelete={deleteUser} key={ticket.id} {...ticket} />)
      )}
    </Box>
  );
};

export { ListBody };
