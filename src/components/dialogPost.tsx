import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HStack, Image, Input } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';

export default function DialogPost() {
  return (
    <>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            type="submit"
            width="100%"
            height="35px"
            rounded="50px"
            bgColor="#04A51E"
            color="white"
          >
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="#1D1D1D">
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
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
