import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import InputField from 'components/FormField/InputField';

StudentForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

StudentForm.defaultProps = {
  initialValues: null,
};

function StudentForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter your name.')
      .test('At least 2 words of 3 characters', 'Name is too short.', (value) => {
        return value.split(' ').filter((x) => x.length >= 3).length >= 2;
      }),

    age: yup
      .number()
      .required('Please enter your age.')
      .min(18, 'Should be greater than or equal to 18.')
      .when(['level', 'city'], {
        is: (level, city) => city === 'hcm' && level === 'middle',
        then: yup.number().min(25),
      })
      .when(['level', 'city'], {
        is: (level, city) => city === 'hcm' && level === 'senior',
        then: yup.number().min(30),
      }),

    gender: yup.string(),
    city: yup.string(),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      age: '',
      gender: 'male',
      city: '',
      level: 'junior',
      avatar: '',
    },
    resolver: yupResolver(schema),
  });

  const avatarUrl = form.watch('avatar');
  console.log(avatarUrl);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  // async await

  const { isSubmitting } = form.formState;
  // No se chuyen thanh true khi form hoan` thanh cap nhat du lieu.
  // lenh nay duoc thuc hien de form o che do khong click submit duoc trong khi dang loading, tranh' bi click qua nhieu` lan` tu user

  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Typography component="h2" variant="h5">
        Student Form
      </Typography>

      <InputField name="name" label="Full Name" form={form} />
      <InputField name="age" label="Age" type="number" form={form} />

      <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default StudentForm;
