import { Button, HStack, Image, Input } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createThread } from '@/features/dashboard/services/thread.services';
import Swal from 'sweetalert2';

export default function DialogCreateReply() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Content cannot be empty!",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await createThread(content, token || "");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Thread created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      setContent(""); 
      navigate("/"); 
    } catch (error: any) {
      console.error("Error creating thread:", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create thread. Please try again.",
      });
    }
  };
  return (
    <>
    
      <DialogRoot>
        <DialogTrigger asChild>
          <HStack
            gap="2"
            padding="3"
            display="flex"
            align="center"
            borderBottomWidth="1px"
            borderColor="#3F3F3F"
          >
            <Image
              src="https://bit.ly/naruto-sage"
              boxSize="40px"
              borderRadius="full"
              fit="cover"
            />
            <Input
              padding="1"
              placeholder="What is happening?!"
              color="white"
             
            />

            <BiImageAdd style={{ color: '#005E0E', fontSize: '35px' }} />
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
        </DialogTrigger>
        <DialogContent bgColor="#1D1D1D">
        <form onSubmit={handleSubmit}>
          <DialogHeader color="white"></DialogHeader>
          <DialogBody>
            <HStack>
              <Image
                src="https://bit.ly/naruto-sage"
                boxSize="40px"
                borderRadius="full"
                fit="cover"
              />
              <Input
                padding="1"
                placeholder="What is happening?!"
                color="white"
                value={content} 
                onChange={(e) => setContent(e.target.value)}
              />
            </HStack>
          </DialogBody>
          <DialogFooter>
            <HStack>
              <BiImageAdd style={{ color: '#005E0E', fontSize: '35px' }} />
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
          </DialogFooter>
          </form>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      
    </>
  );
}