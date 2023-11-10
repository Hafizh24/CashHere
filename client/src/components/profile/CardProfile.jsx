import {
  Avatar,
  AvatarBadge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

const CardProfile = () => {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} mt={"4rem"}>
        <Card maxW="sm">
          <CardBody>
            <Flex justifyContent={"center"}>
              <Avatar name="John Kei" size={"xl"} bg={"gray.300"}>
                <AvatarBadge borderColor={"white"} border as={"button"}>
                  <label style={{ cursor: "pointer" }} htmlFor="image">
                    <EditIcon w={4} h={4} />
                    <Input name="image" id="image" type="file" display={"none"} />
                  </label>
                </AvatarBadge>
              </Avatar>
            </Flex>
            <Stack mt="6" spacing="3">
              <Text fontSize={"lg"}>username</Text>
            </Stack>
          </CardBody>
          <Divider />
        </Card>
      </Box>
    </>
  );
};

export default CardProfile;
