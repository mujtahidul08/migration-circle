import { Box, Input } from "@chakra-ui/react";
import { BsPersonAdd } from "react-icons/bs";

export default function CompSeacrh(){
    return(
        <>
        <Box position="relative" width="100%" p="3">
            {/* Input Field */}
            <Input placeholder="Search your friends" paddingLeft="50px" color="white" borderRadius="20px" borderWidth="1px" borderColor="#04A51E" bgColor="#3F3F3F"/>
            {/* Ikon */}
            <Box position="absolute" top="50%" left="20px" transform="translateY(-50%)">
                <BsPersonAdd style={{ color: "gray", fontSize: "20px" }} />
            </Box>
        </Box>
        </>
    )

}