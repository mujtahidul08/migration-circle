import { Box, HStack } from "@chakra-ui/react";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { LuDot } from "react-icons/lu";

export default function DescDev(){
    return(
        <Box padding="15px" bgColor="#262626" borderRadius="10px">
            <HStack>
                <h1 className="text-white text-xs">Developed by <span className="font-medium">Mujtahidul Haq Mahyunda</span></h1>
                <HStack gap="1">
                    <LuDot style={{ color: "white", fontSize: "10px" }}/>
                    <FaGithubSquare style={{ color: "white", fontSize: "18px" }} />
                    <FaLinkedin style={{ color: "white", fontSize: "18px" }}/>
                    <IoLogoFacebook style={{ color: "white", fontSize: "18px" }}/>
                    <FaInstagramSquare style={{ color: "white", fontSize: "18px" }}/>
                    <FaSquareXTwitter style={{ color: "white", fontSize: "18px" }}/>
                </HStack>
            </HStack>
            
        </Box>
    )
}