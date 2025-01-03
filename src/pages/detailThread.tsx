import { Link,Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Replies from "@/components/replies";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThreadsType } from "@/types/thread.types";
import { getThreadById } from "@/features/dashboard/services/thread.services";
import useUserStore from "@/hooks/store/userStore";
import DialogCreateReply from "@/components/dialogCreateReply";
import { getTime } from "@/utils/getTime";
import Swal from "sweetalert2";
import axios from "axios";
import { useThreadStore } from "@/hooks/store/threadStore";

export default function DetailThread (){
  const { currentThread, setCurrentThread } = useThreadStore();
  const { id } = useParams<{ id: string }>();
  const { token } = useUserStore();

  useEffect(() => {
    if (id && token) {
      fetchThreadDetail(id);
    }
  }, [id, token]);

  const fetchThreadDetail = async (threadId: string) => {
    try {
      const threadDetail = await getThreadById(threadId, token || '');
      setCurrentThread(threadDetail); // Simpan thread saat ini ke Zustand
    } catch (error) {
      console.error('Failed to fetch thread detail:', error);
    }
  };

  return(
      <>
       {currentThread && (
      <Box className="p-3" borderBottomWidth="1px" borderColor="#3F3F3F" gap="4">
          <VStack className="p-3" gap="4" align="start">
              <HStack >
                  <Link href={`/profile/${currentThread.authorId}`}>
                 
                  <Image
                      src={currentThread.author.profile?.avatarImage || "https://bit.ly/naruto-sage"}
                      boxSize="40px"
                      borderRadius="full"
                      fit="cover"
                  />
                   </Link>
                  <Link href={`/profile/${currentThread.authorId}`}>
                  <Stack spaceY="-1.5">            
                      <Text fontWeight="medium" textStyle="sm" color="white">{currentThread.author.username} </Text>
                      <Text color="#909090" textStyle="xs">{currentThread.author.email}</Text>
                  </Stack>
                  </Link>
              </HStack>
              <Text fontWeight="350" style={{fontSize:"13px", textAlign:"justify"}} color="white">{currentThread.content}</Text>  
              {currentThread.image && (  
                  <Image src={currentThread.image} borderRadius="10px" w="full" />  
              )}  
              <HStack>  
                  <Text color="#909090" textStyle="xs"> {getTime(currentThread.createdAt)} •</Text>  
                  <Text color="#909090" textStyle="xs"> {new Date(currentThread.createdAt).toLocaleDateString()}</Text>  
              </HStack>
              <HStack gap="7" display="flex" alignItems="center">
                  <HStack display="flex" alignItems="center">  
                      {currentThread.isLike ? (  
                          <FcLike style={{ color: "white", fontSize: "17px" }} />  
                          ) : (  
                          <FaRegHeart style={{ color: "white", fontSize: "17px" }} />  
                          )}
                      <Text
                          fontWeight="medium"
                          color="#909090"
                          style={{ fontSize: "11px" }}
                          >
                          {currentThread._count?.like || 0}
                      </Text>
                  </HStack>  
                  <HStack display="flex" alignItems="center">  
                      <BiCommentDetail style={{ color: "white", fontSize: "17px" }} />  
                      <Text fontWeight="medium" color="#909090" style={{fontSize:"11px"}}>{currentThread._count?.replies || 0}  Comments</Text>  
                  </HStack>
                  {user?.id && currentThread.authorId && Number(user?.id) === currentThread.authorId && (
                  <HStack display="flex" alignItems="center" onClick={handleDeleteThread}>
                      <Text fontWeight="medium" color="#909090" style={{ fontSize: "11px" }}>
                      Delete
                      </Text>
                  </HStack>
                  )}
              </HStack> 
          </VStack>
      </Box>   
      )}
      <DialogCreateReply threadId={id!}/>
      <Replies threadId={id!} />
      </>
  )
}
// export default function DetailThread (){
//     const { id } = useParams<{ id: string }>();
//     const [thread, setThread] = useState<ThreadsType | null>(null);
//     const { token, user } = useUserStore(); 
  
//     useEffect(() => {
//       if (id && token) {
//         fetchThreadDetail(id);
//       }
//     }, [id, token]);
  
//     const fetchThreadDetail = async (threadId: string) => {
//       try {
//         const threadDetail = await getThreadById(threadId, token || "");
//         setThread(threadDetail);
//       } catch (error) {
//         console.error("Failed to fetch thread detail:", error);
//       }
//     };

//     const handleDeleteThread = async () => {
//         try {
//           await axios.delete(`http://localhost:3000/api/thread/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
    
//           Swal.fire({
//             title: "Success",
//             text: "Thread has been deleted.",
//             icon: "success",
//           }).then(() => {
//             // Redirect atau lakukan tindakan lain setelah penghapusan
//           });
//         } catch (error) {
//           console.error("Failed to delete thread:", error);
//           Swal.fire({
//             title: "Error",
//             text: "There was an issue deleting the thread.",
//             icon: "error",
//           });
//         }
//       };

//     return(
//         <>
//          {thread && (
//         <Box className="p-3" borderBottomWidth="1px" borderColor="#3F3F3F" gap="4">
//             <VStack className="p-3" gap="4" align="start">
//                 <HStack >
//                     <Link href={`/profile/${thread.authorId}`}>
                   
//                     <Image
//                         src={thread.author.profile?.avatarImage || "https://bit.ly/naruto-sage"}
//                         boxSize="40px"
//                         borderRadius="full"
//                         fit="cover"
//                     />
//                      </Link>
//                     <Link href={`/profile/${thread.authorId}`}>
//                     <Stack spaceY="-1.5">            
//                         <Text fontWeight="medium" textStyle="sm" color="white">{thread.author.username} </Text>
//                         <Text color="#909090" textStyle="xs">{thread.author.email}</Text>
//                     </Stack>
//                     </Link>
//                 </HStack>
//                 <Text fontWeight="350" style={{fontSize:"13px", textAlign:"justify"}} color="white">{thread.content}</Text>  
//                 {thread.image && (  
//                     <Image src={thread.image} borderRadius="10px" w="full" />  
//                 )}  
//                 <HStack>  
//                     <Text color="#909090" textStyle="xs"> {getTime(thread.createdAt)} •</Text>  
//                     <Text color="#909090" textStyle="xs"> {new Date(thread.createdAt).toLocaleDateString()}</Text>  
//                 </HStack>
//                 <HStack gap="7" display="flex" alignItems="center">
//                     <HStack display="flex" alignItems="center">  
//                         {thread.isLike ? (  
//                             <FcLike style={{ color: "white", fontSize: "17px" }} />  
//                             ) : (  
//                             <FaRegHeart style={{ color: "white", fontSize: "17px" }} />  
//                             )}
//                         <Text
//                             fontWeight="medium"
//                             color="#909090"
//                             style={{ fontSize: "11px" }}
//                             >
//                             {thread._count?.like || 0}
//                         </Text>
//                     </HStack>  
//                     <HStack display="flex" alignItems="center">  
//                         <BiCommentDetail style={{ color: "white", fontSize: "17px" }} />  
//                         <Text fontWeight="medium" color="#909090" style={{fontSize:"11px"}}>{thread._count?.replies || 0}  Comments</Text>  
//                     </HStack>
//                     {user?.id && thread.authorId && Number(user?.id) === thread.authorId && (
//                     <HStack display="flex" alignItems="center" onClick={handleDeleteThread}>
//                         <Text fontWeight="medium" color="#909090" style={{ fontSize: "11px" }}>
//                         Delete
//                         </Text>
//                     </HStack>
//                     )}
//                 </HStack> 
//             </VStack>
//         </Box>   
//         )}
//         <DialogCreateReply threadId={id!}/>
//         <Replies threadId={id!} />
//         </>
//     )
// }