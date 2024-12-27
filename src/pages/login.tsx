import { Button, Input, Stack, Text } from '@chakra-ui/react';
import '../styles/login.css';
import { PasswordInput } from '@/components/ui/password-input';
import { z } from 'zod';
import { fetchLogin } from '@/features/auth/services/auth-service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserStore from '@/hooks/userStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const loginSchema = z.object({    
  username: z.string().min(1,'Invalid username'),  
  password: z.string().min(3, 'Password must be at least 3 characters long'),  
}); 
type LoginFormInputs = z.infer<typeof loginSchema>;  

export default function Login() {
   const {
      register,
      handleSubmit,
      formState: {errors}, 
    } = useForm<LoginFormInputs>({
      resolver: zodResolver(loginSchema),
    });
    const navigate = useNavigate();
    const {setUser} = useUserStore()
    const {setToken} = useUserStore()
    
    const onSubmit = (data: LoginFormInputs) => {
      fetchLogin(data)
        .then((res) => {
          console.log(res);
          if (res.token) {
            // Tampilkan SweetAlert untuk login sukses
            Swal.fire({
              title: 'Login Successful!',
              text: 'Welcome back to Circle!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              setUser(res.user); // Set user ke store
              setToken(res.token); // Set token ke store
              localStorage.setItem('user', JSON.stringify(res.user));
              localStorage.setItem('token', res.token);
              navigate('/'); // Arahkan ke Home
            });
          }
        })
        .catch((err) => {
          console.error('Login failed:', err.message);
          // Tampilkan SweetAlert untuk login gagal
          Swal.fire({
            title: 'Login Failed!',
            text: err.message || 'Please check your credentials and try again.',
            icon: 'error',
            confirmButtonText: 'Retry',
          });
        });
    };
  
  return (
    <div className="card flex flex-col justify-center items-center h-screen">
      <div className="descLogin flex flex-col justify-start">
        <h1 className="text-[#04A51E] font-bold text-3xl mb-2">circle</h1>
        <h3 className="text-xl text-white mb-2">Login to Circle</h3>
      </div>
      <div className="formLogin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack align="center" width="500px">
            <Input
              {...register('username')}
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="whiteAlpha.950"
              placeholder="Email/Username*"
              color="white"
              gap="4"
            />
            {
              errors.username && (<Text color="red" fontSize="xs">{errors.username.message}</Text>)
            }
            <PasswordInput
              {...register('password')}
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="whiteAlpha.950"
              placeholder="Password*"
              color="white"
            />
            {
              errors.password && (<Text color="red" fontSize="xs">{errors.password.message}</Text>)
            }
            <div className="forgot">
              <a className="text-[#04A51E]" href="/reset">
                Forgot Password?
              </a>
            </div>
            <Button
              type="submit"
              width="100%"
              rounded="50px"
              bgColor="#04A51E"
              color="white"
            >
              Login
            </Button>
          </Stack>
          <p className="text-white">
            Don't have an account yet?
            <a href="/register" className="text-[#04A51E]">
              {' '}
              Create Account
            </a>{' '}
          </p>
        </form>
      </div>
    </div>
  );
}
