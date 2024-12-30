import { useSuggestedUsers } from "@/hooks/contexts/suggestedUserContext";
import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function Suggest() {
  const { suggestedUsers, handleFollowToggle } = useSuggestedUsers();
         
  if (!suggestedUsers || suggestedUsers.length === 0) {
    return <Text color="white">No suggested users available</Text>;
  }

  return (
    <Box padding="10px" bgColor="#262626" borderRadius="10px" mb="5px">
      <h3 className="text-lg text-white mb-2">Suggested for you</h3>
      {suggestedUsers.map((account, index) => (
        <HStack align="center" justifyContent="space-between" width="100%" mb="10px" key={index}>
          <HStack spaceX="2" align="center">
            <Image
              src={account.avatar || "https://bit.ly/naruto-sage"}
              boxSize="40px"
              borderRadius="full"
              fit="cover"
            />
            <Stack spaceY="-1.5">
              <Text fontWeight="medium" textStyle="sm" color="white">
                {account.username}
              </Text>
              <Text color="#909090" textStyle="xs">{account.username}</Text>
            </Stack>
          </HStack>
          {account.isFollow ? (
            <Button
              borderRadius="30px"
              padding="8px"
              borderWidth="1px"
              height="30px"
              color="#909090"
              textStyle="xs"
              onClick={() => handleFollowToggle(account.id)}
            >
              Following
            </Button>
          ) : (
            <Button
              borderRadius="30px"
              padding="8px"
              borderWidth="1px"
              height="30px"
              color="white"
              textStyle="xs"
              onClick={() => handleFollowToggle(account.id)}
            >
              Follow
            </Button>
          )}
        </HStack>
      ))}
    </Box>
  );
}
