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
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { createReply } from '@/features/dashboard/services/replies.services';

export default function DialogCreateReply({ threadId }: { threadId: string }) {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      await createReply(content, token || "", selectedFile, threadId);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Reply created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      setContent("");
      setSelectedFile(null);
      navigate(`/thread/${threadId}`);
    } catch (error: any) {
      console.error("Error creating reply:", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create reply. Please try again.",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <HStack gap="2" padding="3" display="flex" align="center" borderBottomWidth="1px" borderColor="#3F3F3F">
          <Image src="https://bit.ly/naruto-sage" boxSize="40px" borderRadius="full" fit="cover" />
          <Input
            padding="1"
            placeholder="What is happening?!"
            color="white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <BiImageAdd style={{ color: '#005E0E', fontSize: '35px' }} onClick={() => fileInputRef.current?.click()} />
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
            Post Reply
          </Button>
        </HStack>
      </DialogTrigger>
      <DialogContent bgColor="#1D1D1D">
        <form onSubmit={handleSubmit}>
          <DialogHeader color="white"></DialogHeader>
          <DialogBody>
            <HStack>
              <Image src="https://bit.ly/naruto-sage" boxSize="40px" borderRadius="full" fit="cover" />
              <Input
                padding="1"
                placeholder="What is happening?!"
                color="white"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </HStack>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </DialogBody>
          <DialogFooter>
            <HStack>
              <BiImageAdd style={{ color: '#005E0E', fontSize: '35px' }} onClick={() => fileInputRef.current?.click()} />
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
                Post Reply
              </Button>
            </HStack>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
