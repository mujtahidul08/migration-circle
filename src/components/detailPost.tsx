import { Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Thread from "./thread";
import Post from "./post";
import Replies from "./replies";

const posts = [
    {
        name : "Muhammad Fakhri",
        username:"@fakhriozora",
        DatePostedAt:"Jul 26, 2023",
        TimePostedAt:"10.00 PM",
        isLike:true,
        avatar:"https://cdn1-production-images-kly.akamaized.net/wpuyou3Kvn3-plIkWnjIat2eG8w=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1765972/original/080021100_1510286019-Featured-2-696x476.jpg",
        content:"Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.",
        image:"",
        likes: 125,
        replies:27
    }]

export default function DetailPost (){
    return(
        <>
        {posts.map((post, index) => (
        <Box key={index} className="p-3" borderBottomWidth="1px" borderColor="#3F3F3F" gap="4">
            <VStack className="p-3" gap="4">
                <HStack >
                    <Image
                        src={post.avatar}
                        boxSize="40px"
                        borderRadius="full"
                        fit="cover"
                    />
                    <Stack spaceY="-1.5">            
                        <Text fontWeight="medium" textStyle="sm" color="white">{post.name}</Text>
                        <Text color="#909090" textStyle="xs">{post.username}</Text>
                    </Stack>
                </HStack>
                <Text fontWeight="350" style={{fontSize:"13px", textAlign:"justify"}} color="white">{post.content}</Text>  
                {post.image && (  
                    <Image src={post.image} borderRadius="10px" w="full" />  
                )}  
                <HStack>  
                    <Text color="#909090" textStyle="xs">{post.TimePostedAt}</Text>  
                    <Text color="#909090" textStyle="xs">• {post.DatePostedAt}</Text>  
                </HStack>
                <HStack gap="7" display="flex" alignItems="center">
                    <HStack display="flex" alignItems="center">  
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
        </Box>   
        ))}
            <Thread/>
            <Replies/>
        </>
    )
}