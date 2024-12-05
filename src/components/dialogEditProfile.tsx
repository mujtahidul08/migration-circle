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

export default function DialogEditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>('');
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
                placeholder="Name"
                color="white"
                gap="4"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                width="100%"
                padding="4"
                rounded="md"
                borderWidth="1px"
                borderColor="#545454"
                placeholder="Username"
                color="white"
                gap="4"
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
              onClick={() =>
                setUser({
                  name: name,
                  email: user.email,
                  password: user.password,
                })
              }
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
