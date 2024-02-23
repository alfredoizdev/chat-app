
import { TextField, Button, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form"
import { styled } from '@mui/system';
import useAuthContext from '@/hooks/useAuthContext';
import AlertSnackbars from '@/components/shared/Snackbar';
import { useNavigate } from "react-router-dom";


const FormContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  & form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    width: 100%;
  }
`;

type FormValues = {
  name: string;
  email: string;
  password: string;
}

const Register = () => {

  const { sendRegisterInfo, error, isLoading } = useAuthContext();
  const navigation = useNavigate();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { name, email, password } = errors;


  const onSubmit = (data: FormValues) => {
    sendRegisterInfo(data);
    navigation('/');
    reset();
  }

  return (
    <FormContainer>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">Register</Typography>
        <div>
          <Controller
            control={control}
            name='name'
            rules={{
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters long' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!name}
                fullWidth
                label="Name"
                variant="outlined"
                onChange={onChange}
                value={value}
                helperText={name && name.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name='email'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email is not valid'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                error={!!email}
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                onChange={onChange}
                value={value}
                helperText={email && email.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name='password'
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!password}
                fullWidth
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                onChange={onChange}
                value={value}
                helperText={password && password.message}
              />
            )}
          />
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </form>
      <AlertSnackbars typeOfErroor="error" error={error} />
    </FormContainer>
  );
};

export default Register;