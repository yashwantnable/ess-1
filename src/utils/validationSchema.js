import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('email is required'),
  password: Yup.string().required('Password is required'),
});
