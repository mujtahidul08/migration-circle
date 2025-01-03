import {
  Box,
  Button,
  DialogRoot,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { updateProfile } from "@/features/dashboard/services/profile.services";
import Swal from "sweetalert2";

export default function DialogEditProfile({ user }: { user: any }) {
  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [bio, setBio] = useState<string>(user?.profile?.bio || "");

  // States for file uploads
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  // States for image previews
  const [previewAvatar, setPreviewAvatar] = useState<string>(
    user?.profile?.avatarImage || ""
  );
  const [previewBackground, setPreviewBackground] = useState<string>(
    user?.profile?.backgroundImage || ""
  );

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "avatar"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === "background") {
      setPreviewBackground(previewUrl);
      setBackgroundFile(file);
    } else if (type === "avatar") {
      setPreviewAvatar(previewUrl);
      setAvatarFile(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      // Kirim data dengan file dan teks
      const response = await updateProfile(token, {
        username,
        email,
        bio,
        avatarImage: avatarFile, // Kirim file avatar
        backgroundImage: backgroundFile, // Kirim file background
      });

      Swal.fire({
        icon: "success",
        title: "Profile Saved!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      Swal.fire({
        icon: "error",
        title: "Failed to Save Profile",
        text: errorMessage,
      });
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          type="submit"
          borderRadius="30px"
          padding="8px"
          borderWidth="1px"
          height="30px"
          color="white"
          textStyle="xs"
          style={{ position: "absolute", bottom: "-35px", right: "0", zIndex: 2 }}
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent bgColor="#1D1D1D">
        <DialogHeader>
          <DialogTitle color="white" fontSize="medium">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box position="relative" w="full" mb="9">
            <Image
              src={previewBackground}
              height="70px"
              width="100%"
              borderRadius="10px"
              style={{ position: "relative", zIndex: 1, cursor: "pointer" }}
              onClick={() => backgroundInputRef.current?.click()}
            />
            <input
              type="file"
              ref={backgroundInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleFileChange(e, "background")}
            />
            <Image
              src={previewAvatar}
              boxSize="48px"
              borderRadius="full"
              fit="cover"
              style={{
                position: "absolute",
                top: "47px",
                left: "10px",
                zIndex: 2,
                cursor: "pointer",
              }}
              onClick={() => avatarInputRef.current?.click()}
            />
            <input
              type="file"
              ref={avatarInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleFileChange(e, "avatar")}
            />
          </Box>
          <VStack gap="4">
            <Input
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="#545454"
              placeholder="Username"
              color="white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="#545454"
              placeholder="Email"
              color="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              resize="none"
              width="100%"
              padding="4"
              rounded="md"
              borderWidth="1px"
              borderColor="#545454"
              placeholder="Bio"
              color="white"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button
            type="submit"
            width="100px"
            height="35px"
            rounded="50px"
            bgColor="#04A51E"
            color="white"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

// export default function DialogEditProfile({ user }: { user: any }) {
//   const [username, setUsername] = useState<string>(user?.username || "");
//   const [email, setEmail] = useState<string>(user?.email || "");
//   const [bio, setBio] = useState<string>(user?.profile?.bio || "");
//   const [backgroundImage, setBackgroundImage] = useState<string>(
//     user?.profile?.backgroundImage ||
//     "https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?fm=jpg&q=60&w=3000"
//   );
//   const [avatarImage, setAvatarImage] = useState<string>(
//     user?.profile?.avatarImage || "https://bit.ly/naruto-sage"
//   );

//   const backgroundInputRef = useRef<HTMLInputElement>(null);
//   const avatarInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: "background" | "avatar") => {
//     const file = e.target.files?.[0];
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", type);
  
//     const token = localStorage.getItem("token");
  
//     // Validasi token sebelum digunakan
//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Unauthorized",
//         text: "User is not authenticated.",
//       });
//       return;
//     }
  
//     try {
//       const response = await updateProfile(token, {
//         username,
//         email,
//         bio,
//       });
//       if (type === "background") setBackgroundImage(response.backgroundImage);
//       if (type === "avatar") setAvatarImage(response.avatarImage);
  
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Image updated successfully!",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update image.",
//       });
//     }
//   };

//   return (
//     <DialogRoot>
//       <DialogTrigger asChild>
        // <Button
        //   type="submit"
        //   borderRadius="30px"
        //   padding="8px"
        //   borderWidth="1px"
        //   height="30px"
        //   color="white"
        //   textStyle="xs"
        //   style={{ position: "absolute", bottom: "-35px", right: "0", zIndex: 2 }}
        // >
        //   Edit Profile
        // </Button>
//       </DialogTrigger>
//       <DialogContent bgColor="#1D1D1D">
//         <DialogHeader>
//           <DialogTitle color="white" fontSize="medium">
//             Edit Profile
//           </DialogTitle>
//         </DialogHeader>
//         <DialogBody>
//           <Box position="relative" w="full" mb="9">
            // <Image
            //   src={backgroundImage}
            //   height="70px"
            //   width="100%"
            //   borderRadius="10px"
            //   style={{ position: "relative", zIndex: 1, cursor: "pointer" }}
            //   onClick={() => backgroundInputRef.current?.click()}
            // />
            // <input
            //   type="file"
            //   ref={backgroundInputRef}
            //   style={{ display: "none" }}
            //   accept="image/*"
            //   onChange={(e) => handleFileChange(e, "background")}
            // />
            // <Image
            //   src={avatarImage}
            //   boxSize="48px"
            //   borderRadius="full"
            //   fit="cover"
            //   style={{
            //     position: "absolute",
            //     top: "47px",
            //     left: "10px",
            //     zIndex: 2,
            //     cursor: "pointer",
            //   }}
            //   onClick={() => avatarInputRef.current?.click()}
            // />
            // <input
            //   type="file"
            //   ref={avatarInputRef}
            //   style={{ display: "none" }}
            //   accept="image/*"
            //   onChange={(e) => handleFileChange(e, "avatar")}
            // />
//           </Box>
//           <VStack gap="4">
            // <Input
            //   width="100%"
            //   padding="4"
            //   rounded="md"
            //   borderWidth="1px"
            //   borderColor="#545454"
            //   placeholder="Username"
            //   color="white"
            //   value={username}
            //   onChange={(e) => setUsername(e.target.value)}
            // />
            // <Input
            //   width="100%"
            //   padding="4"
            //   rounded="md"
            //   borderWidth="1px"
            //   borderColor="#545454"
            //   placeholder="Email"
            //   color="white"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
            // />
            // <Textarea
            //   resize="none"
            //   width="100%"
            //   padding="4"
            //   rounded="md"
            //   borderWidth="1px"
            //   borderColor="#545454"
            //   placeholder="Bio"
            //   color="white"
            //   value={bio}
            //   onChange={(e) => setBio(e.target.value)}
            // />
//           </VStack>
//         </DialogBody>
//         <DialogFooter>
          // <Button
          //   type="submit"
          //   width="100px"
          //   height="35px"
          //   rounded="50px"
          //   bgColor="#04A51E"
          //   color="white"
          //   onClick={() => console.log("Save logic")}
          // >
          //   Save
          // </Button>
//         </DialogFooter>
//         <DialogCloseTrigger />
//       </DialogContent>
//     </DialogRoot>
//   );
// }

// export default function DialogEditProfile({ user }: { user: any }) {
//   const [username, setUsername] = useState<string>(user?.username || "");
//   const [email, setEmail] = useState<string>(user?.email || "");
//   const [bio, setBio] = useState<string>(user?.profile?.bio || "");
//   const [backgroundImage, setBackgroundImage] = useState<string>(
//     user?.profile?.backgroundImage || "https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
//   );

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Unauthorized",
//         text: "User not authenticated",
//       });
//       return;
//     }

//     try {
//       const updatedUser = await updateProfile(token, { username, email, bio });

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Profile updated successfully!",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       console.log("Updated User:", updatedUser); // Optionally handle updated user
//     } catch (error: any) {
//       console.error("Error updating profile:", error.message);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Failed to update profile. Please try again.",
//       });
//     }
//   };

//   return (
//     <>
//       <DialogRoot>
//         <DialogTrigger asChild>
//           <Button
//             type="submit"
//             borderRadius="30px"
//             padding="8px"
//             borderWidth="1px"
//             height="30px"
//             color="white"
//             textStyle="xs"
//             style={{
//               position: "absolute",
//               bottom: "-35px",
//               right: "0",
//               zIndex: 2,
//             }}
//           >
//             Edit Profile
//           </Button>
//         </DialogTrigger>
//         <DialogContent bgColor="#1D1D1D">
//           <DialogHeader>
//             <DialogTitle color="white" fontSize="medium">
//               Edit Profile
//             </DialogTitle>
//           </DialogHeader>
//           <DialogBody>
//             <Box position="relative" w="full" mb="9">
//               <Image
//                 src={backgroundImage}
//                 height="70px"
//                 width="100%"
//                 borderRadius="10px"
//                 style={{ position: 'relative', zIndex: 1 }}
//               />
//               <Image
//                 src={user?.profile?.avatarImage || ""}
//                 boxSize="48px"
//                 borderRadius="full"
//                 fit="cover"
//                 style={{
//                   position: 'absolute',
//                   top: '47px',
//                   left: '10px',
//                   zIndex: 2,
//                 }}
//               />
//             </Box>
//             <VStack gap="4">
//               <Input
//                 width="100%"
//                 padding="4"
//                 rounded="md"
//                 borderWidth="1px"
//                 borderColor="#545454"
//                 placeholder="Username"
//                 color="white"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <Input
//                 width="100%"
//                 padding="4"
//                 rounded="md"
//                 borderWidth="1px"
//                 borderColor="#545454"
//                 placeholder="Email"
//                 color="white"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Textarea
//                 resize="none"
//                 width="100%"
//                 padding="4"
//                 rounded="md"
//                 borderWidth="1px"
//                 borderColor="#545454"
//                 placeholder="Bio"
//                 color="white"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//               />
//             </VStack>
//           </DialogBody>
//           <DialogFooter>
//             <Button
//               type="submit"
//               width="100px"
//               height="35px"
//               rounded="50px"
//               bgColor="#04A51E"
//               color="white"
//               onClick={handleSave}
//             >
//               Save
//             </Button>
//           </DialogFooter>
//           <DialogCloseTrigger />
//         </DialogContent>
//       </DialogRoot>
//     </>
//   );
// }
// import { Box, Button, Image, Input, Textarea, VStack } from '@chakra-ui/react';
// import {
//   DialogBody,
//   DialogCloseTrigger,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogRoot,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { UserContext } from '@/hooks/contexts/userContexts';
// import { useContext, useState } from 'react';
// import { updateProfile } from '@/features/dashboard/services/profile.services';
// import Swal from 'sweetalert2';

// export default function DialogEditProfile() {
//   const { user, setUser } = useContext(UserContext);
//   const [username, setUsername] = useState<string>(user.username);
//   const [email, setEmail] = useState<string>(user.email);
//   const [bio, setBio] = useState<string>(user.profile?.bio || "");

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Unauthorized",
//         text: "User not authenticated",
//       });
//       return;
//     }

//     try {
//       const updatedUser = await updateProfile(token, { username, email, bio });
      
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Profile updated successfully!",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       setUser(updatedUser); // Update state user di konteks
//     } catch (error: any) {
//       console.error("Error updating profile:", error.message);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Failed to update profile. Please try again.",
//       });
//     }
//   };

//   return (
//     <>
//       <DialogRoot>
//         <DialogTrigger asChild>
//           <Button
//             type="submit"
//             borderRadius="30px"
//             padding="8px"
//             borderWidth="1px"
//             height="30px"
//             color="white"
//             textStyle="xs"
//             style={{
//               position: 'absolute',
//               bottom: '-35px',
//               right: '0',
//               zIndex: 2,
//             }}
//           >
//             Edit Profile
//           </Button>
//         </DialogTrigger>
//         <DialogContent bgColor="#1D1D1D">
//           <DialogHeader>
//             <DialogTitle color="white" fontSize="medium">
//               Edit Profile
//             </DialogTitle>
//           </DialogHeader>
//           <DialogBody>
//             <Box position="relative" w="full" mb="9">
//               <Image
//                 src="https://bit.ly/naruto-sage"
//                 height="70px"
//                 width="100%"
//                 borderRadius="10px"
//                 style={{ position: 'relative', zIndex: 1 }}
//               />
//               <Image
//                 src="https://bit.ly/naruto-sage"
//                 boxSize="48px"
//                 borderRadius="full"
//                 fit="cover"
//                 style={{
//                   position: 'absolute',
//                   top: '47px',
//                   left: '10px',
//                   zIndex: 2,
//                 }}
//               />
//             </Box>
//             <VStack gap="4">
//               <Input
//                 width="100%"
//                 padding="4"
//                 rounded="md"
//                 borderWidth="1px"
//                 borderColor="#545454"
//                 placeholder="Username"
//                 color="white"
//                 gap="4"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <Input
//                 width="100%"
//                 padding="4"
//                 rounded="md"
//                 borderWidth="1px"
//                 borderColor="#545454"
//                 placeholder="Email"
//                 color="white"
//                 gap="4"
//                 value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               />
//               <Textarea
//                 resize="none"
//                 width="100%"
//                 padding="4"
//                 rounded="md"
//                 borderWidth="1px"
//                 borderColor="#545454"
//                 placeholder="Bio"
//                 color="white"
//                 gap="4"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//               />
//             </VStack>
//           </DialogBody>
//           <DialogFooter>
//             <Button
//               type="submit"
//               width="100px"
//               height="35px"
//               rounded="50px"
//               bgColor="#04A51E"
//               color="white"
//               onClick={handleSave}
//             >
//               Save
//             </Button>
//           </DialogFooter>
//           <DialogCloseTrigger />
//         </DialogContent>
//       </DialogRoot>
//     </>
//   );
// }