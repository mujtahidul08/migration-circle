import { Button, Input, Stack,Text } from "@chakra-ui/react"
import '../styles/login.css'
import { zodResolver } from '@hookform/resolvers/zod';  
import { useForm } from 'react-hook-form';  
import { z } from 'zod';  

const registerSchema = z.object({  
  fullName: z.string().min(1, 'Full name is required'),  
  email: z.string().email('Invalid email address'),  
  password: z.string().min(63, 'Password must be at least 3 characters long'),  
}); 

type RegisterFormInputs = z.infer<typeof registerSchema>;  


export default function Register(){
  const {
    register,
    handleSubmit,
    formState: {errors}, 
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {  
    console.log(data);  
  };  

  return (
    <div className="card flex flex-col justify-center items-center h-screen">
      <div className="descLogin flex flex-col justify-start">
        <h1 className="text-[#04A51E] font-bold text-3xl mb-2">Circle</h1>
        <h3 className="text-xl text-white mb-2">Create Account Circle</h3>
      </div>
      <div className="formLogin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-center" width="500px">
            <Input
            {...register('fullName')}
            width="100%"
            padding="4"
            rounded="md"
            borderWidth="1px"
            borderColor="whiteAlpha.950"
            placeholder="Full Name*"
            color="white"
            />
            {
              errors.fullName && (<Text color="red" fontSize="xs">{errors.fullName.message}</Text>)
            }
          <Input
          {...register('email')}
            width="100%"
            padding="4"
            rounded="md"
            borderWidth="1px"
            borderColor="whiteAlpha.950"
            placeholder="Email*"
            color="white"
          />
          {
              errors.email && (<Text color="red" fontSize="xs">{errors.email.message}</Text>)
            }
          <Input
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
          <Button
            type="submit"
            width="100%"
            rounded="50px"
            bgColor="#04A51E"
            color="white"
          >
            Create
          </Button>
        </Stack>
        <p className="text-white">Already have account?<a href="/login" className="text-[#04A51E]"> Login</a> </p>

      </form>
    </div>
    </div>

  )
}