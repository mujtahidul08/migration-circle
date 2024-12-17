import { Button, Input, Stack } from '@chakra-ui/react';
import '../styles/login.css';
import { PasswordInput } from '@/components/ui/password-input';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/hooks/contexts/userContexts';

const users = [
  { name: 'muja', email: 'muja@gmail.com', password: '123' },
  { name: 'admin', email: 'admin@gmail.com', password: '123' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem('user', JSON.stringify({ name: user.name }));
      setUser(user);
      console.log('Navigating to home...');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert('Login Gagal');
    }
  };

  return (
    <div className="card flex flex-col justify-center items-center h-screen">
      <div className="descLogin flex flex-col justify-start">
        <h1 className="text-[#04A51E] font-bold text-3xl mb-2">circle</h1>
        <h3 className="text-xl text-white mb-2">Login to Circle</h3>
      </div>
      <div className="formLogin">
        <form onSubmit={onLogin}>
          <Stack align="center" width="500px">
            <Input
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="whiteAlpha.950"
              placeholder="Email/Username*"
              color="white"
              gap="4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="whiteAlpha.950"
              placeholder="Password*"
              color="white"
              onChange={(e) => setPassword(e.target.value)}
            />
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


// import { Button, Input, Stack, Text } from '@chakra-ui/react';
// import '../styles/login.css';
// import { PasswordInput } from '@/components/ui/password-input';
// import { useNavigate } from 'react-router-dom';
// import React, { useContext, useState } from 'react';
// import { UserContext } from '@/hooks/contexts/userContexts';
// import { zodResolver } from '@hookform/resolvers/zod';  
// import { useForm } from 'react-hook-form';  
// import { z } from 'zod';  

// const users = [
//   { name: 'muja', email: 'muja@gmail.com', password: '123' },
//   { name: 'admin', email: 'admin@gmail.com', password: '123' },
// ];

// const registerSchema = z.object({  
//   email: z.string().email('Invalid email address'),  
//   password: z.string().min(1, 'Password must be at least 6 characters long'),  
// }); 
// type RegisterFormInputs = z.infer<typeof registerSchema>;  

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();
  
//   const {
//     register,
//     handleSubmit,
//     formState: {errors}, 
//   } = useForm<RegisterFormInputs>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onLogin = (data:RegisterFormInputs) => {

//     const user = users.find(
//       (user) => user.email === data.email && user.password === data.password
//     );
//     if (user) {
//       localStorage.setItem('user', JSON.stringify({ name: user.name }));
//       setUser(user);
//       console.log('Navigating to home...');
//       localStorage.setItem('isAuthenticated', 'true');
//       navigate('/');
//     } 
//   };

//   return (
//     <>
//     <div className="card flex flex-col justify-center items-center h-screen">
//       <div className="descLogin flex flex-col justify-start">
//         <h1 className="text-[#04A51E] font-bold text-3xl mb-2">circle</h1>
//         <h3 className="text-xl text-white mb-2">Login to Circle</h3>
//       </div>
//       <div className="formLogin">
//         <form onSubmit={handleSubmit(onLogin)}>
//           <Stack align="center" width="500px">
//             <Input
//               {...register('email')}
//               width="100%"
//               padding="4"
//               rounded="md"
//               borderWidth="1px"
//               borderColor="whiteAlpha.950"
//               placeholder="Email/Username*"
//               color="white"
//               gap="4"
              
//             />
//             {
//               errors.email && (<Text color="red" fontSize="xs">{errors.email.message}</Text>)
//             }
//             <PasswordInput
//               {...register('password')}
//               width="100%"
//               padding="4"
//               rounded="md"
//               borderWidth="1px"
//               borderColor="whiteAlpha.950"
//               placeholder="Password*"
//               color="white"

//             />
//             {
//               errors.password && (<Text color="red" fontSize="xs">{errors.password.message}</Text>)
//             }
//             <div className="forgot">
//               <a className="text-[#04A51E]" href="/reset">
//                 Forgot Password?
//               </a>
//             </div>
//             <Button
//               type="submit"
//               width="100%"
//               rounded="50px"
//               bgColor="#04A51E"
//               color="white"
//             >
//               Login
//             </Button>
//           </Stack>
//           <p className="text-white">
//             Don't have an account yet?
//             <a href="/register" className="text-[#04A51E]">
//               {' '}
//               Create Account
//             </a>{' '}
//           </p>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// }

