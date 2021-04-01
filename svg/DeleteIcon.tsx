import React, { FC } from 'react';
import { Box,createStyles,makeStyles } from '@material-ui/core';
import {Props} from '../components/TicketsList/ListItem'


const useStyles = makeStyles((theme) =>
  createStyles({
    delete: {
      cursor: 'pointer',
      display: "flex"
    },
  })
);

const DeleteIcon: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box onClick={props.handleDelete} className={classes.delete}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 22C9 23.1 9.9 24 11 24H19C20.1 24 21 23.1 21 22V10H9V22ZM11 12H19V22H11V12ZM18.5 7.00003L17.5 6.00003H12.5L11.5 7.00003H8V9.00003H22V7.00003H18.5Z"
          fill="black"
          fillOpacity="0.54"
        />
        <rect x="0.5" y="0.500031" width="29" height="29" rx="1.5" stroke="#CFCFCF" />
      </svg>
    </Box>
  );
};

export { DeleteIcon };
