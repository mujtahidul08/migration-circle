import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function ProfileMini() {
    return (
        <>
        <Box padding="10px" bgColor="#262626" borderRadius="10px" mb="5px">
            <h3 className="text-lg text-white mb-2">My Profile</h3>
            <div className="mb-7" style={{ position: 'relative', width: '100%' }}>
            <Image
                src="https://bit.ly/naruto-sage"
                height="70px"
                width="100%"
                borderRadius="10px"
                style={{ position: 'relative', zIndex: 1 }}
            />
            <Image
                src="https://bit.ly/naruto-sage"
                boxSize="48px"
                borderRadius="full"
                fit="cover"
                style={{
                    position: 'absolute',
                    top: '47px', 
                    left: '10px', 
                    zIndex: 2
                  }}
            />
            <Button
            type="submit"
            borderRadius="30px"
            padding="8px"
            borderWidth="1px"
            height="30px"           
            color="white"
            textStyle="xs"
            style={{
                position: 'absolute',
                bottom: '-35px', 
                right: '0', 
                zIndex: 2
              }}
            >
            Edit Profile
            </Button>                
            </div>

            <Stack gap="0">
                <Text fontWeight="medium" textStyle="sm" color="white">Mujtahidul</Text>
                <Text color="#909090" textStyle="xs">
                @muja_hama08
                </Text>
            </Stack>

            <Text textStyle="sm" color="white" truncate>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            </Text>

            <HStack>
                <HStack>
                    <Text fontWeight="medium" textStyle="xs" color="white">270</Text>
                    <Text color="#909090" textStyle="xs">Following</Text>
                </HStack>

                <HStack>
                    <Text fontWeight="medium" textStyle="xs" color="white">56</Text>
                    <Text color="#909090" textStyle="xs">Followers</Text>
                </HStack>   
            </HStack>
            
        </Box>
        
        </>
    )
}