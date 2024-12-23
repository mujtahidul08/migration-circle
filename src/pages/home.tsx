import DialogThread from '@/components/dialogThread';
import Post from '@/components/thread';
import { Box } from '@chakra-ui/react';
import {  useEffect, useState} from 'react';
import useUserStore from '@/hooks/userStore';
import axios from 'axios';


export default function Home() {
  const { user, token } = useUserStore(); // Ambil user dan token dari store
  const [ data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/thread", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [token]);

  return (
    <Box>
          
      {/* Main Content */}
      <Box
        flex="5"
        height="100vh"
        overflowY="auto"
        scrollbar="hidden"
        scrollBehavior="smooth"
      >
        <h3 className="text-3xl text-white p-3 font-medium">
          Home, {user?.username}
        </h3>
        <DialogThread />
        <Post />
      </Box>
    </Box>
  );
}
