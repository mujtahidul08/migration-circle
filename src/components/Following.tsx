import { useEffect, useState } from "react";
import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Follower } from "@/types/profile.types";
import { fetchFollowers, fetchFollowing } from "@/features/dashboard/services/profile.services";

interface FollowingProps {
  token: string | null;
}

export default function Following({ token }: FollowingProps) {
  const [following, setFollowing] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFollowing = async () => {
      if (!token) {
        console.error("No token found, user is not authenticated");
        return;
      }

      try {
        setLoading(true);
        const fetchedFollowing = await fetchFollowing(token); // Ambil data following
        setFollowing(fetchedFollowing);
      } catch (error) {
        console.error("Error fetching following:", error);
      } finally {
        setLoading(false);
      }
    };

    getFollowing();
  }, [token]);

  const toggleFollow = (id: number) => {
    const updatedFollowing = following.map((user) =>
      user.id === id ? { ...user, isFollow: !user.isFollow } : user
    );
    setFollowing(updatedFollowing);
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      {following.map((account, index) => (
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
                {account.username}
              </Text>
              <Text color="#909090" textStyle="xs">
                {account.email}
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

// export default function Followers() {
//   const [followers, setFollowers] = useState<Follower[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch followers saat komponen dimount
//   useEffect(() => {
//     const getFollowers = async () => {
//       try {
//         setLoading(true);
//         const fetchedFollowers = await fetchFollowers();
//         setFollowers(fetchedFollowers);
//       } catch (error) {
//         console.error("Error fetching followers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getFollowers();
//   }, []);

//   // Toggle follow/unfollow
//   const toggleFollow = (id: number) => {
//     const updatedFollowers = followers.map((follower) =>
//       follower.id === id ? { ...follower, isFollow: !follower.isFollow } : follower
//     );
//     setFollowers(updatedFollowers);
//   };

//   if (loading) return <Text>Loading...</Text>;

//   return (
//     <>
//       {followers.map((account, index) => (
//         <HStack align="center" justifyContent="space-between" width="100%" mb="10px" key={index}>
//           <HStack spaceX="2" align="center">
//             <Image
//               src={account.image}
//               boxSize="40px"
//               borderRadius="full"
//               fit="cover"
//             />
//             <Stack spaceX="-1.5">
//               <Text fontWeight="medium" textStyle="sm" color="white">
//                 {account.fullname}
//               </Text>
//               <Text color="#909090" textStyle="xs">
//                 {account.username}
//               </Text>
//             </Stack>
//           </HStack>
//           {account.isFollow ? (
//             <Button
//               onClick={() => toggleFollow(account.id)}
//               borderRadius="30px"
//               padding="8px"
//               borderWidth="1px"
//               height="30px"
//               color="#909090"
//               textStyle="xs"
//             >
//               Following
//             </Button>
//           ) : (
//             <Button
//               onClick={() => toggleFollow(account.id)}
//               borderRadius="30px"
//               padding="8px"
//               borderWidth="1px"
//               height="30px"
//               color="white"
//               textStyle="xs"
//             >
//               Follow
//             </Button>
//           )}
//         </HStack>
//       ))}
//     </>
//   );
// }
