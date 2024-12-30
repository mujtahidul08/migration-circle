import Post from "@/components/thread";
import { UserContext } from '@/hooks/contexts/userContexts';
import { useContext } from 'react';
import ProfileUser from "@/components/profileUser";

export default function Profile(){
    const { user } = useContext(UserContext);
    return(
        <>
            <h3 className="text-3xl text-white p-3 font-medium">{user.username}</h3>
            <ProfileUser/>
            <Post/>
        </>
    )
}