import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  // type: duoc su dung khi field nay duoc dung chung, vi dung voi name field va age field
  // 4 props mac dinh duoc khai bao trong 1 field: value, form, disabled, label
};

InputField.defaulProps = {
  label: '',
  disabled: false,
  type: 'text',
};

function InputField(props) {
  const { name, label, form, disabled, type } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;
  // Vi material UI ho tro validate cho UI control, neu su dung cac library UI khac se phai tu xay dung validate
  return (
    <Box mt={1} mb={2}>
      <Controller
        name={name}
        control={form.control}
        render={({ value, onChange, onBlur }) => (
          <TextField
            fullWidth
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            disabled={disabled}
            variant="outlined"
            error={hasError}
            helperText={errorMessage}
          />
        )}
      />
    </Box>
  );
}

export default InputField;

