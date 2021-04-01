import React, { FC } from 'react';
import { Box, createStyles, makeStyles, Hidden } from '@material-ui/core';
import { ListHeader } from './ListHeader';
import { ListBody } from './ListBody';
import { TicketsListMobile } from './TicketsListMobile';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 66px)',
      "@media (min-width: 768px)": {
        padding: theme.spacing(3),
      }
    },
    list: {
      height: '100%',
      background: '#FFFFFF',
      borderRadius: 15,
      padding: theme.spacing(2, 3, 4),
      overflow: "auto",
    },
  })
);

const TicketsList: FC = () => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.list}>
        <Hidden xsDown >
          <ListHeader />
          <ListBody />
        </Hidden>
        <Hidden smUp >
          <TicketsListMobile />
        </Hidden>
      </Box>
    </Box>
  );
};

export { TicketsList };
