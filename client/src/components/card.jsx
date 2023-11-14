import { Box, Heading, Text, Stack, useColorModeValue, Button, HStack, StackDivider } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Card({productData}) {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <Box
        maxW={{ base: "300px", md: "370px" }}
        maxH={{ base: "305px", md: "350px", lg: "405px" }}
        w={["20rem", "20rem"]}
        bg={useColorModeValue("white", "gray.900")}
        shadow={"lg"}
        rounded={"md"}
        p={6}
        flex="0 0 auto" // Allow flex item to shrink if needed
        mx={"13px"}
      >
        <Box overflow={"hidden"} h={{ base: "75px", md: "130px", lg: "180px" }} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>          
        </Box>
        <Stack>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={"rgb(16, 69, 181)"}
            fontSize={["xs", "lg"]}
            fontFamily={"body"}
          >
            {productData.name}
          </Heading>
          <Text color={"black"} textTransform={"uppercase"} fontWeight={800} fontSize={["xs", "sm"]} letterSpacing={1.1}>
          {productData.price}
          </Text>
          <Text color={"black"} fontSize={["xs", "sm"]} letterSpacing={1.1}>
          {productData.description}
          </Text>
          <HStack justifyContent={"space-between"} divider={<StackDivider borderColor="gray.400" />}>
            {user?.isAdmin === true ? 
            <>
            <Button size={["sm", "md"]} colorScheme="messenger">
              Edit product
            </Button>
            </> 
            : 
            <>
            </>}
            
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
