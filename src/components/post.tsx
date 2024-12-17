import useLikeStore from "@/hooks/type/likeStore";
import { Box, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

export default function Post() {  
    const posts = useLikeStore((state) => state.posts);
    const toggleLike = useLikeStore((state) => state.toggleLike);

    return (  
        <Box w="full" h="fit"> 
            {posts.map((post, index) => ( 
                
                <HStack key={index} p="3" borderBottomWidth="1px" borderColor="#3F3F3F" gap="4" display="flex"   
                justifyContent="start"  
                alignItems="flex-start"
                w="full" h="full">  
                    <Image className="flex justify-start align-top" src={post.avatar} boxSize="40px" borderRadius="full" fit="cover" alignSelf="flex-start" />  
                    <VStack align="start" gap="1">  
                        <HStack>  
                            <Text fontWeight="medium" textStyle="sm" color="white">{post.name}</Text>  
                            <Text color="#909090" textStyle="xs">{post.username}</Text>  
                            <Text color="#909090" textStyle="xs">• {post.postedAt}</Text>  
                        </HStack>  
                        <Link href="/DetailPost">
                        <VStack>
                        <Text fontWeight="350" style={{fontSize:"13px", textAlign:"justify"}} color="white">{post.content}</Text>  
                        {post.image && (  
                            <Link href="/DetailImage">
                            <Image src={post.image} borderRadius="10px" w="full" />
                            </Link>  
                        )}  
                        </VStack>
                        </Link>
                        <HStack gap="7" display="flex" alignItems="center">  
                            <HStack display="flex" alignItems="center" onClick={() => toggleLike(index)}
                                cursor="pointer">  
                                {post.isLike ? (  
                                    <FcLike style={{ color: "white", fontSize: "17px" }} />  
                                    ) : (  
                                    <FaRegHeart style={{ color: "white", fontSize: "17px" }} />  
                                    )}
                                <Text fontWeight="medium" color="#909090" style={{fontSize:"11px"}}>{post.likes} Likes</Text>  
                            </HStack>  
                            <HStack display="flex" alignItems="center">  
                                <BiCommentDetail style={{ color: "white", fontSize: "17px" }} />  
                                <Text fontWeight="medium" color="#909090" style={{fontSize:"11px"}}>{post.replies} Comments</Text>  
                            </HStack>  
                        </HStack>  
                    </VStack>  
                </HStack>  
                
            ))}  
        </Box>  
    );  
}  