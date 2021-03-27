import React, { FC } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
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

const initialValues: InitialValuesType = {
  email: '',
  password: '',
  rememberMe: false,
};

const onSubmit = (
  values: InitialValuesType,
  formikHelpers: FormikHelpers<InitialValuesType>,
): void => {
  alert(JSON.stringify(values, null, 2));
  formikHelpers.resetForm();
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password should be of minimum 3 characters length')
    .required('Password is required'),
});

export const Login: FC = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
