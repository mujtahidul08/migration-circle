import { Box, Input, Spinner, VStack, Text, HStack, Image, Stack, Button, Link } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useSuggestedUsers } from "@/hooks/contexts/suggestedUserContext";

export default function CompSeacrh() {
  const [query, setQuery] = useState<string>(""); 
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  // Fetch search results
  const fetchSearchResults = async (searchQuery: string) => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:3000/api/search", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        params: { q: searchQuery }, 
      });

      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      fetchSearchResults(value);
    }
  };

  // Toggle Follow/Following
  const handleFollowToggle = async (userId: number) => {
    try {
      await axios.post(
        `http://localhost:3000/api/profile/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.id === userId ? { ...user, isFollow: !user.isFollow } : user
        )
      );
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };
  // const [query, setQuery] = useState<string>(""); 
  // const [searchResults, setSearchResults] = useState<any[]>([]); 
  // const [isLoading, setIsLoading] = useState<boolean>(false); 
  // const { handleFollowToggle } = useSuggestedUsers();

  // const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);

  //   if (value.trim() === "") {
  //     setSearchResults([]);
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.get("http://localhost:3000/api/search", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`, 
  //       },
  //       params: { q: value }, // Kirim query parameter
  //     });

  //     setSearchResults(response.data.results);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const handleFollowClick = async (userId: number) => {
  //   await handleFollowToggle(userId); // Call toggle function from context
  //   setSearchResults((prevResults) =>
  //     prevResults.map((user) =>
  //       user.id === userId ? { ...user, isFollow: !user.isFollow } : user
  //     )
  //   ); // Update local searchResults state
  // };

  return (
    <Box position="relative" width="100%" p="3">
      {/* Input Field */}
      <Input
        placeholder="Search your friends"
        paddingLeft="50px"
        color="white"
        borderRadius="20px"
        borderWidth="1px"
        borderColor="#04A51E"
        bgColor="#3F3F3F"
        value={query}
        onChange={handleSearch} 
      />
      {/* Ikon */}
      <Box position="absolute" top="50%" left="20px" transform="translateY(-50%)">
       
      </Box>

      {/* Loading Indicator */}
      {isLoading && <Spinner color="white" mt="4" />}

      {/* Hasil Pencarian */}
      {searchResults.length > 0 && (
        <VStack mt="4" align="stretch" spaceX="3">
          {searchResults.map((user) => (
            <HStack align="center" justifyContent="space-between" width="100%" mb="10px" key={user.id}>
                <Link href={`/profile/${user.id}`}>
                <HStack spaceX="2" align="center">
                  <Image
                    src={user.avatarImage || "https://bit.ly/naruto-sage"}
                    boxSize="40px"
                    borderRadius="full"
                    fit="cover"
                  />
                  <Stack spaceY="-1.5">
                    <Text fontWeight="medium" textStyle="sm" color="white">
                      {user.username}
                    </Text>
                    <Text color="#909090" textStyle="xs">{user.email}</Text>
                  </Stack>
                </HStack>
                </Link>

                {/* {user.isFollow ? (
                <Button
                  borderRadius="30px"
                  padding="8px"
                  borderWidth="1px"
                  height="30px"
                  color="#909090"
                  textStyle="xs"
                  onClick={() => handleFollowToggle(user.id)}
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
                  onClick={() => handleFollowToggle(user.id)}
                >
                  Follow
                </Button>
              )} */}
                <Button
                borderRadius="30px"
                padding="8px"
                borderWidth="1px"
                height="30px"
                color={user.isFollow ? "#909090" : "white"}
                textStyle="xs"
                onClick={() => handleFollowToggle(user.id)} // Use handleFollowClick
              >
                {user.isFollow ? "Following" : "Follow"}
              </Button>

              </HStack>
          ))}
        </VStack>
      )}
      {query.trim() !== "" && searchResults.length === 0 && !isLoading && (
        <Text color="white" mt="4" w="full" h="full" display="flex" justifyContent="center" alignItems="center">
          No results found.
        </Text>
      )}
    </Box>
  );
}

// import { Box, Input } from "@chakra-ui/react";
// import { BsPersonAdd } from "react-icons/bs";

// export default function CompSeacrh(){
//     return(
//         <>
//         <Box position="relative" width="100%" p="3">
//             {/* Input Field */}
//             <Input placeholder="Search your friends" paddingLeft="50px" color="white" borderRadius="20px" borderWidth="1px" borderColor="#04A51E" bgColor="#3F3F3F"/>
//             {/* Ikon */}
//             <Box position="absolute" top="50%" left="20px" transform="translateY(-50%)">
//                 <BsPersonAdd style={{ color: "gray", fontSize: "20px" }} />
//             </Box>
//         </Box>
//         </>
//     )

// }