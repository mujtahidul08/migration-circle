import DialogThread from '@/components/dialogThread';
import Post from '@/components/post';
import { Box } from '@chakra-ui/react';
import { UserContext } from '@/hooks/contexts/userContexts';
import { useContext } from 'react';

export default function Home() {
  const { user } = useContext(UserContext);

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
          Home, {user.name}
        </h3>
        <DialogThread />
        <Post />
      </Box>
    </Box>
  );
}