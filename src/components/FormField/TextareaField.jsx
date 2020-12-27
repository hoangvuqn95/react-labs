import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.func.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

TextareaField.defaultProps = {
  label: '',
  disabled: false,
};

function TextareaField(props) {
  const { name, label, disabled, form } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  return (
    <Box mt={1} mb={2}>
      <Controller
        name={name}
        control={form.control}
        render={({ value, onChange, onBlur }) => (
          <TextField
            fullWidth
            disabled={disabled}
            multiline
            rows={3}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            variant="outlined"
            error={hasError}
            helperText={errorMessage}
          />
        )}
      />
    </Box>
  );
}

export default TextareaField;
