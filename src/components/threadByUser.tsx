import { getAllThreadsByUser } from "@/features/dashboard/services/profile.services";
import useLikeStore from "@/hooks/type/likeStore";
import useUserStore from "@/hooks/userStore";
import { ThreadsType } from "@/types/thread.types";
import { Box, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

export default function ThreadByUser() {
  const toggleLike = useLikeStore((state) => state.toggleLike);
  const [threads, setThreads] = useState<ThreadsType[]>();
  const { token } = useUserStore();

  useEffect(() => {
    if (token) {
      retrieveUserThreads(token);
    }
  }, [token]);

  const retrieveUserThreads = async (token: string) => {
    try {
      const userThreads = await getAllThreadsByUser(token); // Fetch threads by user
      console.log("User threads:", userThreads);
      setThreads(userThreads);
    } catch (error) {
      console.error("Error fetching threads by user:", error);
    }
  };

  return (
    <Box w="full" h="fit">
      {threads?.length > 0 ? (
        threads?.map((thread: ThreadsType, index: number) => (
          <HStack
            key={index}
            p="3"
            borderBottomWidth="1px"
            borderColor="#3F3F3F"
            gap="4"
            display="flex"
            justifyContent="start"
            alignItems="flex-start"
            w="full"
            h="full"
          >
            <Image
              src={thread.image || "https://via.placeholder.com/40"}
              boxSize="40px"
              borderRadius="full"
              fit="cover"
              alignSelf="flex-start"
            />
            <VStack align="start" gap="1">
              <HStack>
                <Text fontWeight="medium" textStyle="sm" color="white">
                  {thread.author.username}
                </Text>
                <Text color="#909090" textStyle="xs">
                  {thread.author.email}
                </Text>
                <Text color="#909090" textStyle="xs">
                  • {new Date(thread.createdAt).toLocaleDateString()}
                </Text>
              </HStack>
              <Link href={`/DetailPost/${thread.id}`}>
                <VStack>
                  <Text
                    fontWeight="350"
                    style={{ fontSize: "13px", textAlign: "justify" }}
                    color="white"
                  >
                    {thread.content}
                  </Text>
                  {thread.image && (
                    <Image
                      src={thread.image}
                      borderRadius="10px"
                      w="full"
                      alt="Thread content"
                    />
                  )}
                </VStack>
              </Link>
              <HStack gap="7" display="flex" alignItems="center">
                <HStack
                  display="flex"
                  alignItems="center"
                  onClick={() => toggleLike(index)}
                  cursor="pointer"
                >
                  {thread.isLike ? (
                    <FcLike style={{ color: "white", fontSize: "17px" }} />
                  ) : (
                    <FaRegHeart style={{ color: "white", fontSize: "17px" }} />
                  )}
                  <Text
                    fontWeight="medium"
                    color="#909090"
                    style={{ fontSize: "11px" }}
                  >
                    {thread.likes.length} Likes
                  </Text>
                </HStack>
                <HStack display="flex" alignItems="center">
                  <BiCommentDetail
                    style={{ color: "white", fontSize: "17px" }}
                  />
                  <Text
                    fontWeight="medium"
                    color="#909090"
                    style={{ fontSize: "11px" }}
                  >
                    {thread.replies.length} Comments
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </HStack>
        ))
      ) : (
        <Text color="white" textAlign="center" mt="4">
          No threads found for this user.
        </Text>
      )}
    </Box>
  );
}
