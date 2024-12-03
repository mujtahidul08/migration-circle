import Post from "@/components/post";
import ProfileMini from "@/components/profileMini";

export default function Profile(){
    return(
        <>
            <h3 className="text-3xl text-white p-3 font-medium">Mujtahidul</h3>
            <ProfileMini/>
            <Post/>
        </>
    )
}