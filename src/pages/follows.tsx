import SuggestAccount from "@/components/suggestAccount";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Box } from "@chakra-ui/react";

export default function Follows(){
    return(
        <>
            <h3 className="text-3xl text-white p-3 font-medium">Follows</h3> 
            <SegmentedControl className="flex justify-center" w="full" defaultValue="Followers" items={["Followers", "Following"]}/>
            <Box padding="10px"mb="5px">
            <SuggestAccount/>
            </Box>
        </>
        
    )
}