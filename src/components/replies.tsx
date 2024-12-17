import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const replies = [
    {
        name : "Muhammad Fakhri",
        username:"@fakhriozora",
        postedAt:"10 h",
        isLike:true,
        avatar:"https://cdn1-production-images-kly.akamaized.net/wpuyou3Kvn3-plIkWnjIat2eG8w=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1765972/original/080021100_1510286019-Featured-2-696x476.jpg",
        content:"Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.",
        image:"",
        likes: 125,
        replies:27
    },
    {
        name : "Anita Yunita",
        username:"@anityunit",
        postedAt:"17 h",
        isLike:false,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"Pernah nggak dapet dream job terus lama-lama ngerasa lah kok tidak seperti yang diharapkan (atau simply lelah) terus fall out of love dengan job/bidang tsb?",
        image:"https://bit.ly/naruto-sage",
        likes: 302,
        replies:47
    },
    {
        name : "vitra",
        username:"@avither",
        postedAt:"24 s",
        isLike:true,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"lorem ipsum?!",
        image:"",
        likes: 1500,
        replies:22
    },
    {
        name : "Kucing Cat",
        username:"@catcat",
        postedAt:"29 jul",
        isLike:true,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"Dibanding rekan2 media menginterview saya terkait issue yg lg ramai, ada baiknya mending interview instansi yg ngasih izin, BKSDA dll, manfaatkan moment untuk mendorong regulasi nya jadi lebih ketat. Ketua mpr kita pak Bamsut juga pelihara singa, ga mau push berita ini aja?",
        image:"",
        likes: 900,
        replies:12
    }
]

export default function Replies() {  
    return (  
        <Box w="full">  
            {replies.map((reply, index) => ( 
                <HStack key={index} className="p-3" borderTopWidth="1px" borderColor="#3F3F3F" gap="4" display="flex" justifyContent="start" alignItems="flex-start" >  
                    <Image src={reply.avatar} boxSize="40px" borderRadius="full" fit="cover" align="start"  alignSelf="flex-start" />  
                    <VStack align="start" gap="1">  
                        <HStack>  
                            <Text fontWeight="medium" textStyle="sm" color="white">{reply.name}</Text>  
                            <Text color="#909090" textStyle="xs">{reply.username}</Text>  
                            <Text color="#909090" textStyle="xs">• {reply.postedAt}</Text>  
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