import React, { FC } from 'react';
import { Chip, createStyles, Grid, makeStyles, Typography,Theme } from '@material-ui/core';
import { Ticket } from '../../shared/types';
import { format } from 'date-fns';
import { DeleteIcon } from "../../svg/DeleteIcon"



const useStyles = makeStyles<Theme,Ticket>((theme) =>
  createStyles({
    root: {
      borderBottom: '1px solid #F1F1F1',
      padding: theme.spacing(3, 1.5, 2.25),
    },
    text: {
      fontWeight: theme.typography.fontWeightLight,
    },
    status: {
      width: '101px',
      height: '19px',
      borderRadius: 4,
      fontSize: 11,
      lineHeight: '15px',
      fontWeight: theme.typography.fontWeightBold,
      color: '#FFFFFF',
      backgroundColor: props => props.status == "OPEN" ? '#5B994C' : "#616161",
    },
  })
);

export type Props = {
  handleDelete: (e:any) => void;
}

type TicketProps = Ticket | Props

export const formatToDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

const ListItem: FC<TicketProps> = (props:any) => {
  const classes = useStyles(props);

  const createdAtFormatted = formatToDate(props.createdAt);
  const dueDateFormatted = formatToDate(props.dueDate);

  const handleDelete = () => {
    props.handleDelete(props.id)
  }


  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Typography className={classes.text}>{props.id}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>{`${props.user.firstName} ${props.user.lastName}`}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.text}>{createdAtFormatted}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.text}>{dueDateFormatted}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Chip label={props.status} className={classes.status} />
      </Grid>
      <Grid item xs={1}>
        <DeleteIcon handleDelete={handleDelete}/>
      </Grid>
    </Grid>
  );
};

export { ListItem };
