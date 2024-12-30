import CompSeacrh from "@/components/compSeacrh";
import { Box, Text } from "@chakra-ui/react";


export default function Search(){
    return(
        <>
        <Box height="100vh" display="flex" flexDirection="column"> 
            <Box display="flex" justifyContent="start">
                <CompSeacrh/>
            </Box>
            {/* <Box display="flex" flexDirection="column" justifyContent="center">
                <Text style={{color:"white", fontSize:"15px", textAlign:"center"}}>Write and search something</Text>
                <Text style={{color:"#909090", fontSize:"12px", textAlign:"center"}}>Try searching for something else or check the spelling of what you typed.</Text>
            </Box> */}
            {/* for result "NONE" 
            <Box >
                <Text style={{color:"white", fontSize:"15px", textAlign:"center"}}>No results for “asmorncd”</Text>
                <Text style={{color:"#909090", fontSize:"12px", textAlign:"center"}}>Try searching for something else or check the spelling of what you typed.</Text>
            </Box> */}
        </Box>
        </>
    )
}