import { Button, Input, Stack } from "@chakra-ui/react"
import '../styles/login.css'


export default function Forgot(){

  return (
    <div className="card flex flex-col justify-center items-center h-screen">
      <div className="descLogin flex flex-col justify-start">
        <h1 className="text-[#04A51E] font-bold text-3xl mb-2">Circle</h1>
        <h3 className="text-xl text-white mb-2">Forgot Password</h3>
      </div>
      <div className="formLogin">
      <form>
        <Stack gap="4" align="flex-center" width="500px">
          <Input
            width="100%"
            padding="4"
            rounded="md"
            borderWidth="1px"
            borderColor="whiteAlpha.950"
            placeholder="Email*"
          />
         
          <Button
            type="submit"
            width="100%"
            rounded="50px"
            bgColor="#04A51E"
            color="white"
          >
            Send Instruction
          </Button>
        </Stack>
        <p className="text-white">Already have account?<a href="/login" className="text-[#04A51E]"> Login</a> </p>
      </form>
    </div>
    </div>

  )
}