import { Button, HStack, Image, Input } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";


export default function postThread(){
    return(
        <form>
            <HStack gap="2" padding="3" display="flex" align="center" borderBottomWidth="1px" borderColor="#3F3F3F" >
                <Image  src="https://bit.ly/naruto-sage" boxSize="40px" borderRadius="full" fit="cover"/>
                <Input
                    padding="1"
                    placeholder="What is happening?!"
                    color="white" />

                <BiImageAdd style={{ color: "#005E0E", fontSize: "35px" }} />
                <Button
                fontSize="13px"
                padding="-3"
                type="submit"
                height="35px"
                width="13%"
                rounded="20px"
                bgColor="#005E0E"
                color="white"
                >
                    Post
                </Button>
            </HStack>
        </form>
    )
}