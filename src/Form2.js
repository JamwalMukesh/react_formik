import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressDetails, selectAddressDetails } from './addressSlice';
import styles from './styles/form2.module.css';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

const Form2 = () => {
  const dispatch = useDispatch();
  const addressDetails = useSelector(selectAddressDetails);
  const navigate = useNavigate();

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error('Error fetching country options:', error);
      });
  }, []);

  const validationSchema = Yup.object({
    address: Yup.string().optional(),
    state: Yup.string().optional(),
    city: Yup.string().optional(),
    country: Yup.string()
      .optional()
      .oneOf(countryOptions.map((c) => c.value), 'Invalid country'),
    pincode: Yup.string()
      .optional()
      .matches(/^\d+$/, 'Invalid pincode. Numeric only'),
  });

  const handleSubmit = (values) => {
    dispatch(updateAddressDetails(values));
    navigate('/success');
  };

  return (
    <Formik
      initialValues={addressDetails}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                id="state"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  label="Country"
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                >
                  <MenuItem value="" disabled>
                    Select a country
                  </MenuItem>
                  {countryOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                id="pincode"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/')}
                className={styles.submitButton}
              >
                Go back
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.submitButton}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Form2;
