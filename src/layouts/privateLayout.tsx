import { Outlet} from "react-router-dom"
import { Box, HStack, VStack } from "@chakra-ui/react";
import SideBar from "@/components/sideBar";
import Suggest from "@/components/suggest";
import ProfileUser from "@/components/profileUser";
import { SuggestedUserProvider } from "@/hooks/contexts/suggestedUserContext";

interface PrivateLayoutProps {
    user: any; 
  }

export default function PrivateLayout({ user }: PrivateLayoutProps){

    
    return(
        <SuggestedUserProvider>
        <div>
            <HStack gap="0" m="0" p="0" w="full" h="full">
                {/* Sidebar */}
                <Box flex="2"  height="100vh" borderRightWidth="1px" borderColor="#3F3F3F" position="sticky"
                top="0" left="0" overflow="auto">
                <SideBar />
                </Box>

                {/* Main Content */}
                <Box flex="5" height="100vh" overflowY="auto" scrollbar="hidden" scrollBehavior="smooth">
                    {/* <h3 className="text-3xl text-white p-3 font-medium">Home</h3>  */}
                    <main>
                        <Outlet/>
                    </main>
                </Box>

                {/* Right Profile */}
                <Box flex="3" height="100vh" p="4" borderLeftWidth="1px" borderColor="#3F3F3F" position="sticky"
                top="0">
                <VStack  align="stretch">
                <ProfileUser user={user} />
                <Suggest />
                {/* <DescDev /> */}
                </VStack>
                </Box>
            </HStack>
        </div>
        </SuggestedUserProvider>
    )
}