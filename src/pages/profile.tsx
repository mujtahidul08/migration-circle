import Post from "@/components/thread";
import { UserContext } from '@/hooks/contexts/userContexts';
import { useContext } from 'react';
import ProfileUser from "@/components/profileUser";
import { Box, Tabs } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Profile(){
    const { user } = useContext(UserContext);
    return(
        <>
            <h3 className="text-3xl text-white p-3 font-medium">{user.username}</h3>
            <ProfileUser/>
            <Tabs.Root defaultValue="post">
            
            <Tabs.List>
            
            <Tabs.Trigger value="post" asChild>
                <Box px={"25%"} borderBottomWidth={2} borderRightWidth={2}>
                  <Link
                    style={{ textUnderlineOffset: "2", color: "white" }}
                    to="#post"
                  >
                    Post
                  </Link>
                </Box>
              </Tabs.Trigger>
              <Tabs.Trigger value="photo" asChild>
                <Box px={"25%"}>
                  <Link
                    style={{ textUnderlineOffset: "2", color: "white" }}
                    to="#photo"
                  >
                    Photo
                  </Link>
                </Box>
              </Tabs.Trigger>
          
              
            </Tabs.List>
            <Tabs.Content value="post">
            
            </Tabs.Content>
            <Tabs.Content value="photo">

            </Tabs.Content>
          </Tabs.Root>
            <Post/>
        </>
    )
}