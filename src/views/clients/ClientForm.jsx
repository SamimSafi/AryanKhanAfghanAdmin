import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import validationSchema from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const ClientForm = () => {
  const defaultValues = {
    name: '',
    logo: '',
    description: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    toast.success('Client saved successfully!');
    reset(); // Clear form after submit
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Client Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Logo URL"
        {...register('logo')}
        error={!!errors.logo}
        helperText={errors.logo?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default ClientForm;
