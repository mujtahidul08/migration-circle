import { Button, Input, Stack } from "@chakra-ui/react"
import '../styles/login.css'
import { useState } from "react";
import { forgotPassword } from "@/features/dashboard/services/users.services";


export default function Forgot() {
  const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await forgotPassword(email);
        alert(response.message);
        window.location.href = "/reset"; // Redirect ke halaman reset
      } catch (error) {
        console.error("Error:", error);
      }
    };
  return (
    <div className="card flex flex-col justify-center items-center h-screen">
      <div className="descLogin flex flex-col justify-start">
        <h1 className="text-[#04A51E] font-bold text-3xl mb-2">Circle</h1>
        <h3 className="text-xl text-white mb-2">Forgot Password</h3>
      </div>
      <div className="formLogin">
        <form onSubmit={handleSubmit}>
          <Stack gap="4" align="flex-center" width="500px">
            <Input
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="whiteAlpha.950"
              placeholder="Email*"
              value={email}
              color="white"
              onChange={(e) => setEmail(e.target.value)}
              required
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
          <p className="text-white">
            Already have account?
            <a href="/login" className="text-[#04A51E]"> Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
// export default function Forgot(){

//   return (
//     <div className="card flex flex-col justify-center items-center h-screen">
//       <div className="descLogin flex flex-col justify-start">
//         <h1 className="text-[#04A51E] font-bold text-3xl mb-2">Circle</h1>
//         <h3 className="text-xl text-white mb-2">Forgot Password</h3>
//       </div>
//       <div className="formLogin">
//       <form>
//         <Stack gap="4" align="flex-center" width="500px">
//           <Input
//             width="100%"
//             padding="4"
//             rounded="md"
//             borderWidth="1px"
//             borderColor="whiteAlpha.950"
//             placeholder="Email*"
//           />
         
//           <Button
//             type="submit"
//             width="100%"
//             rounded="50px"
//             bgColor="#04A51E"
//             color="white"
//           >
//             Send Instruction
//           </Button>
//         </Stack>
//         <p className="text-white">Already have account?<a href="/login" className="text-[#04A51E]"> Login</a> </p>
//       </form>
//     </div>
//     </div>

//   )
// }