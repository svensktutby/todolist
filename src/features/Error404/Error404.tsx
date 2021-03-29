import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    '@global': {
      body: {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: `calc(100vh - 56px)`,
      '@media (min-width:600px)': {
        height: `calc(100vh - 64px)`,
      },
    },
    title: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.grey['50'],
    },
    text: {
      textAlign: 'center',
      color: theme.palette.grey['50'],
    },
    footer: {
      marginTop: 'auto',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    footerText: {
      fontSize: '1.2rem',
      color: theme.palette.grey['500'],
    },
    link: {
      position: 'relative',
      color: theme.palette.grey['50'],
      textDecoration: 'none',
      '&:after': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        backgroundColor: theme.palette.grey['50'],
        opacity: 0,
        transitionDuration: theme.transitions.duration.standard,
        transitionProperty: 'opacity, bottom',
      },
      '&:focus': {
        outline: 'none',
      },
      '&:hover:after,&:focus:after': {
        bottom: '-2px',
        opacity: 1,
      },
    },
  };
});

export const Error404: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h2" component="h1" className={classes.title}>
          404 - Page not&nbsp;found
        </Typography>
        <Typography variant="h2" component="p" className={classes.text}>
          —<span>Uh oh.</span> <span>¯\_(ツ)_/¯</span>—
        </Typography>
      </div>
      <footer className={classes.footer}>
        <Typography variant="body1" className={classes.footerText}>
          Take me back to:&nbsp;
          <Link className={classes.link} to="/">
            home page
          </Link>
        </Typography>
      </footer>
    </div>
  );
};
