import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalDetails, selectPersonalDetails } from './slice';
import styles from './styles/form1.module.css';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';


const Form3 = () => {

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min 3 characters'),
  });

  const dispatch = useDispatch();
  const personalDetails = useSelector(selectPersonalDetails);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted:', values);
  };

  return (
    <Formik
      initialValues={personalDetails}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        console.log(formik.values);

        return (

          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant="contained"
                  color="primary"
                  className={styles.nextButton}
                >
                  NEXT
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  );
};

export default Form3;
