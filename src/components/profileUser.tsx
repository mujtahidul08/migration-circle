import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react';
import DialogEditProfile from './dialogEditProfile';
import useUserStore from '@/hooks/userStore';

export default function ProfileUser() {
  const {user} = useUserStore()

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
            src={user?.profile?.avatarImage || "https://bit.ly/naruto-sage"} 
            boxSize="48px"
            borderRadius="full"
            fit="cover"
            style={{
              position: 'absolute',
              top: '47px',
              left: '10px',
              zIndex: 2,
            }}
          />
          <DialogEditProfile />
        </div>

        <Stack gap="0">
          <Text fontWeight="medium" textStyle="sm" color="white">
            {user?.username}
          </Text>      
          <Text color="#909090" textStyle="xs">
            {user?.email}
          </Text>
        </Stack>

        <Text textStyle="sm" color="white" truncate>
          {user?.profile?.bio || "bio is null or undetected"}
        </Text>

        <HStack>
          <HStack>
            <Text fontWeight="medium" textStyle="xs" color="white">
            {user?.following || 0}
            </Text>
            <Text color="#909090" textStyle="xs">
              Following
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="medium" textStyle="xs" color="white">
            {user?.followers || 0}
            </Text>
            <Text color="#909090" textStyle="xs">
              Followers
            </Text>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}
