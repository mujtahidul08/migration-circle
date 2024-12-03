
import DescDev from "@/components/descDev";
import Post from "@/components/post";
import ProfileMini from "@/components/profileMini";
import SideBar from "@/components/sideBar";
import Suggest from "@/components/suggest";
import Thread from "@/components/thread";
import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import Search from "./search";
import Profile from "./profile";
import DetailPost from "@/components/detailPost";
import Follows from "./follows";

export default function Home() {
  return (
    <Box >
      <HStack gap="0" m="0" p="0">
        {/* Sidebar */}
        <Box flex="2"  height="100vh" borderRightWidth="1px" borderColor="#3F3F3F" position="sticky"
          top="0" left="0" overflow="auto">
          <SideBar />
        </Box>

        {/* Main Content */}
        <Box flex="5" height="100vh" overflowY="auto" scrollbar="hidden" scrollBehavior="smooth">
          <h3 className="text-3xl text-white p-3 font-medium">Home</h3> 
         
          <Thread/>
          <Post/>
        </Box>

        {/* Right Profile */}
        <Box flex="3" height="100vh" p="4" borderLeftWidth="1px" borderColor="#3F3F3F" position="sticky"
          top="0">
        <VStack  align="stretch">
          <ProfileMini />
          <Suggest />
          <DescDev />
        </VStack>
        </Box>
      </HStack>
    </Box>
  );
}