import React, { FC } from 'react';
import { FormikValues, useFormik } from 'formik';
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
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  checkboxLabel: {
    marginBottom: theme.spacing(2),
  },
}));

const validate = (values: FormikValues) => {
  const errors: FormikErrorType = {};
  const { email, password } = values;

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length <= 2) {
    errors.password = 'Password must be more than 2 characters';
  }

  return errors;
};

export const Login: FC = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as InitialValuesType,
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      formik.resetForm();
    },
  });

  console.log(formik.values);

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
              {formik.touched.email && formik.errors.email && (
                <Typography variant="body2" color="error">
                  {formik.errors.email}
                </Typography>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <Typography variant="body2" color="error">
                  {formik.errors.password}
                </Typography>
              )}
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

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
