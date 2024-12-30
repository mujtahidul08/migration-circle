import Post from "@/components/thread";
import ProfileUser from "@/components/profileUser";
import { UserContext } from '@/hooks/contexts/userContexts';
import { useContext } from 'react';

export default function Profile(){
    const { user } = useContext(UserContext);
    return(
        <>
            <h3 className="text-3xl text-white p-3 font-medium">{user.name}</h3>
            <ProfileUser/>
            <Post/>
        </>
    )
}