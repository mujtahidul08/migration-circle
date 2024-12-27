import { Box, Button, Image, Input, Textarea, VStack } from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserContext } from '@/hooks/contexts/userContexts';
import { useContext, useState } from 'react';
import { updateProfile } from '@/features/dashboard/services/profile.services';
import Swal from 'sweetalert2';

export default function DialogEditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [bio, setBio] = useState<string>(user.profile?.bio || "");

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "User not authenticated",
      });
      return;
    }

    try {
      const updatedUser = await updateProfile(token, { username, email, bio });
      
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      setUser(updatedUser); // Update state user di konteks
    } catch (error: any) {
      console.error("Error updating profile:", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <>
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
            style={{
              position: 'absolute',
              bottom: '-35px',
              right: '0',
              zIndex: 2,
            }}
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
                src="https://bit.ly/naruto-sage"
                height="70px"
                width="100%"
                borderRadius="10px"
                style={{ position: 'relative', zIndex: 1 }}
              />
              <Image
                src="https://bit.ly/naruto-sage"
                boxSize="48px"
                borderRadius="full"
                fit="cover"
                style={{
                  position: 'absolute',
                  top: '47px',
                  left: '10px',
                  zIndex: 2,
                }}
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
                gap="4"
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
                gap="4"
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
                gap="4"
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
    </>
  );
}
