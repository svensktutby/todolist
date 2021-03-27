import React, { FC } from 'react';
import { useFormik } from 'formik';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Button,
  Grid,
  Link,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  checkboxLabel: {
    marginBottom: theme.spacing(2),
  },
}));

export const Login: FC = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as InitialValuesType,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered&nbsp;
                <Link
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  here
                </Link>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              <FormControlLabel
                className={classes.checkboxLabel}
                label="Remember me"
                control={<Checkbox />}
                {...formik.getFieldProps('rememberMe')}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

type InitialValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
