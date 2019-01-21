import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    marginTop: 16,
    padding: 16,
    zIndex: 500,
    borderRadius: 3
  }
};

const EmptyTable = ({ classes, bgColor, msg }) => (
  <Card fullWidth className={classes.card} style={{ backgroundColor: bgColor }}>
    <Typography variant="subtitle1">{msg} </Typography>
  </Card>
);

export default withStyles(styles)(EmptyTable);
