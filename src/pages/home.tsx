import Post from "@/components/post";
import Thread from "@/components/thread";
import { Box} from "@chakra-ui/react";

export default function Home() {
  return (
    <Box >
        {/* Main Content */}
        <Box flex="5" height="100vh" overflowY="auto" scrollbar="hidden" scrollBehavior="smooth">
          <h3 className="text-3xl text-white p-3 font-medium">Home</h3> 
          <Thread/>
          <Post/>
        </Box>
    </Box>
  );
}