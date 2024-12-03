import SuggestAccount from "@/components/suggestAccount";
import { Box, Tabs, Text } from "@chakra-ui/react";

// export default function Follows(){
//     return(
//         <Box bgColor="grey" w="100vw">
//             <Text fontSize="3xl" color="white" p="2" fontWeight="medium">Follows</Text>
//                 <Tabs.Root defaultValue="followers"  w="100vw">
//                     <Tabs.List>
//                     <Tabs.Trigger value="followers">
//                         Followers
//                     </Tabs.Trigger>
//                     <Tabs.Trigger color="white" value="following">
//                         Following
//                     </Tabs.Trigger>
//                     </Tabs.List>
//                     <Tabs.Content color="white" value="followers">
//                     <SuggestAccount/>
//                     </Tabs.Content>
//                     <Tabs.Content value="following">
//                     <SuggestAccount/>
//                     </Tabs.Content>
//                 </Tabs.Root>
//             <Box padding="10px"mb="5px">
//             </Box>
//         </Box>
        
//     )
// }

export default function Follows() {
    return (
      <Box w="full" h="full" p="4">
        {/* Header */}
        <Text fontSize="3xl" color="white" fontWeight="medium" mb="4">
          Follows
        </Text>
        {/* Tabs */}
        <Tabs.Root >
            <Tabs.List display="flex" borderBottom="1px solid #3F3F3F">
            <Tabs.Trigger
                value="followers"
                _selected={{
                borderBottom: "3px solid #04A51E",
                color: "white",
                }}
                _hover={{ borderBottom: "3px solid #3F3F3F" }}
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                p="2"
                color="whiteAlpha.800"
            >
                Followers
            </Tabs.Trigger>
            <Tabs.Trigger
                value="following"
                _selected={{
                marginX:"3",
                borderBottom: "3px solid #04A51E",
                color: "white",
                }}
                _hover={{ borderBottom: "3px solid #3F3F3F" }}
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                p="2"
                color="whiteAlpha.800"
                
            >
                Following
            </Tabs.Trigger>
            </Tabs.List>

            {/* Tabs Content */}
            <Tabs.Content value="followers" mt="4">
            <SuggestAccount />
            </Tabs.Content>
            <Tabs.Content value="following" mt="4">
            <SuggestAccount />
            </Tabs.Content>
        </Tabs.Root>
      </Box>
    );
  }