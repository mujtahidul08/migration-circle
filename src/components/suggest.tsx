import { Box } from "@chakra-ui/react";
import SuggestAccount from "./suggestAccount";



export default function Suggest() {
    return (
        <>
        <Box padding="10px" bgColor="#262626" borderRadius="10px" mb="5px">
            <h3 className="text-lg text-white mb-2">Suggested for you</h3>
            <SuggestAccount/>
        </Box>
        </>
    )
}