import React from 'react';
import { useForm } from 'react-hook-form';

function Registereg() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstname')} /> {/* register an input */}
      <input {...register('lastname', { required: true })} />
      {errors.lastname && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form>
  );
}
export default Registereg;