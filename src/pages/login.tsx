import { Button, Input, Stack } from "@chakra-ui/react"
import '../styles/login.css'
import { PasswordInput } from "@/components/ui/password-input"
import { useNavigate } from "react-router-dom"

interface FormValues {
  username: string
  password: string
}

export default function Login(){
  const navigate = useNavigate()

  const onLogin = ()=>{
    localStorage.setItem("isAuthenticated","true")
    navigate("/")
  }

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
          />
          <PasswordInput
            width="100%"
            padding="4"
            rounded="md"
            borderWidth="1px"
            borderColor="whiteAlpha.950"
            placeholder="Password*"
            color="white"
          />
          <div className="forgot">
            <a className="text-[#04A51E]" href="/reset">Forgot Password?</a>
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
        <p className="text-white">Don't have an account yet?<a href="/register" className="text-[#04A51E]"> Create Account</a> </p>

      </form>
    </div>
    </div>
    

  )
}