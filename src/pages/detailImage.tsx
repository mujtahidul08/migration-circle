import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import DetailPost from "./detailThread";

export default function DetailImage(){
    return(
        <HStack gap="2">
            <Box  w="2/3" display="flex" height="100vh" borderRightWidth="1px" borderColor="#3F3F3F" position="sticky"
          top="0" left="0" overflow="auto" m="3">
                <Image src="https://bit.ly/naruto-sage">

                </Image>
            </Box>
            <VStack  w="1/3" height="100vh" overflowY="auto" scrollbar="hidden" scrollBehavior="smooth">
                <DetailPost/>
            </VStack>
        </HStack>
    )
}