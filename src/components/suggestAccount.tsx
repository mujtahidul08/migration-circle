import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";


const suggestAccount = [
    {
        name : "Muhammad Fakhri",
        username:"@fakhriozora",
        image:"https://cdn1-production-images-kly.akamaized.net/wpuyou3Kvn3-plIkWnjIat2eG8w=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1765972/original/080021100_1510286019-Featured-2-696x476.jpg",
        isFollow:true

    },
    {
        name : "Anita Yunita",
        username:"@anityunit",
        image:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        isFollow:false
    },
    {
        name : "Hinata Hana",
        username:"@hinahana",
        image:"https://qph.cf2.quoracdn.net/main-qimg-6bcc167f898716a6ba552b6bd4d8486f-lq",
        isFollow:true
    },
    {
        name : "caca Imut Kyut",
        username:"@xcakut",
        image:"",
        isFollow:false
    }
]
export default function SuggestAccount() {
    return (
        <>
            {suggestAccount.map((account, index) => (
            <HStack align="center" justifyContent="space-between" width="100%" mb="10px" key={index}>
                <HStack spaceX="2" align="center">
                    <Image
                        src={account.image? account.image:"https://bit.ly/naruto-sage"}
                        boxSize="40px"
                        borderRadius="full"
                        fit="cover"
                    />
                    <Stack spaceY="-1.5">            
                        <Text fontWeight="medium" textStyle="sm" color="white">{account.name}</Text>
                        <Text color="#909090" textStyle="xs">{account.username}</Text>
                    </Stack>
                </HStack>
                {account.isFollow?
                <Button
                type="submit"
                borderRadius="30px"
                padding="8px"
                borderWidth="1px"
                height="30px"           
                color="#909090"
                textStyle="xs"
                >
                Following
                </Button>
                :
                <Button
                type="submit"
                borderRadius="30px"
                padding="8px"
                borderWidth="1px"
                height="30px"           
                color="white"
                textStyle="xs"
                >
                Follow
                </Button>
                } 
            </HStack>
            ))}
         </>
    )
}