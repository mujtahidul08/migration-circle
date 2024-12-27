import { apiURL } from "@/utils/baseurl";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

    type ReplyType = {
        id: number;
        content: string;
        createdAt: string;
        isLike: boolean;
        likes: number;
        image: string|null;
        author: {
          username: string;
          email:string;
          profile: { avatarImage: string | null };
        };
      };
      
      type RepliesProps = {
        threadId: string; // Thread ID untuk mengambil replies
      };

    const Replies: React.FC<RepliesProps> = ({ threadId }) => {
        const [replies, setReplies] = useState<ReplyType[]>([]);
      
        useEffect(() => {
          const fetchReplies = async () => {
            try {
              const response = await axios.get(apiURL + `/api/thread/replies/${threadId}`);
              setReplies(response.data);
            } catch (error) {
              console.error("Failed to fetch replies:", error);
            }
          };
      
          fetchReplies();
        }, [threadId]);    
    
    return (  
        <Box w="full">  
            {replies.map((reply) => (
                <HStack key={reply.id} className="p-3" borderTopWidth="1px" borderColor="#3F3F3F" gap="4" display="flex" justifyContent="start" alignItems="flex-start" >  
                    <Image src={reply.author.profile?.avatarImage || "https://via.placeholder.com/40"}boxSize="40px" borderRadius="full" fit="cover" align="start"  alignSelf="flex-start" />  
                    <VStack align="start" gap="1">  
                        <HStack>  
                            <Text fontWeight="medium" textStyle="sm" color="white"> {reply.author.username}</Text>  
                            <Text color="#909090" textStyle="xs"> {reply.author.email}</Text>  
                            <Text color="#909090" textStyle="xs">•{new Date(reply.createdAt).toLocaleTimeString()}</Text>  
                        </HStack>  
                        <Text fontWeight="350" style={{fontSize:"13px", textAlign:"justify"}} color="white">{reply.content}</Text>  
                        {reply.image && (  
                            <Image src={reply.image} borderRadius="10px" w="full" />  
                        )}  
                        <HStack gap="7" display="flex" alignItems="center">  
                            <HStack display="flex" alignItems="center">  
                                {reply.isLike ? (  
                                    <FcLike style={{ color: "white", fontSize: "17px" }} />  
                                    ) : (  
                                    <FaRegHeart style={{ color: "white", fontSize: "17px" }} />  
                                    )}
                                <Text fontWeight="medium" color="#909090" style={{fontSize:"11px"}}>{reply.likes} Likes</Text>  
                            </HStack>  
                        </HStack>  
                    </VStack>  
                </HStack>  
            ))}  
        </Box>  
    );  
}  

export default Replies;