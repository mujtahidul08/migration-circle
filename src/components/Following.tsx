import { useEffect, useState } from "react";
import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Follower } from "@/types/profile.types";
import { fetchFollowers } from "@/features/dashboard/services/profile.services";


export default function SuggestAccount() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch followers saat komponen dimount
  useEffect(() => {
    const getFollowers = async () => {
      try {
        setLoading(true);
        const fetchedFollowers = await fetchFollowers();
        setFollowers(fetchedFollowers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      } finally {
        setLoading(false);
      }
    };

    getFollowers();
  }, []);

  // Toggle follow/unfollow
  const toggleFollow = (id: number) => {
    const updatedFollowers = followers.map((follower) =>
      follower.id === id ? { ...follower, isFollow: !follower.isFollow } : follower
    );
    setFollowers(updatedFollowers);
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      {followers.map((account, index) => (
        <HStack align="center" justifyContent="space-between" width="100%" mb="10px" key={index}>
          <HStack spaceX="2" align="center">
            <Image
              src={account.image}
              boxSize="40px"
              borderRadius="full"
              fit="cover"
            />
            <Stack spaceX="-1.5">
              <Text fontWeight="medium" textStyle="sm" color="white">
                {account.fullname}
              </Text>
              <Text color="#909090" textStyle="xs">
                {account.username}
              </Text>
            </Stack>
          </HStack>
          {account.isFollow ? (
            <Button
              onClick={() => toggleFollow(account.id)}
              borderRadius="30px"
              padding="8px"
              borderWidth="1px"
              height="30px"
              color="#909090"
              textStyle="xs"
            >
              Following
            </Button>
          ) : (
            <Button
              onClick={() => toggleFollow(account.id)}
              borderRadius="30px"
              padding="8px"
              borderWidth="1px"
              height="30px"
              color="white"
              textStyle="xs"
            >
              Follow
            </Button>
          )}
        </HStack>
      ))}
    </>
  );
}
