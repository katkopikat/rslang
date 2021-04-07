import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

interface IBadge {
  correct: number;
  error: number;
}

const StatusBadge: React.FC<IBadge> = ({ correct, error }: IBadge) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={correct} color="primary">
        <CheckIcon />
      </Badge>
      <Badge badgeContent={error} color="secondary">
        <CloseIcon />
      </Badge>
    </div>
  );
};

export default StatusBadge;
