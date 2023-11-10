"use client"

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react"
import logo  from "../assets/cash here.png"

export default function Login() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} spacing={'16'}>
      <Flex p={8} flex={1} align={"center"} justify={"center"} bgColor={"#EAE7B1"}>
        <Stack spacing={4} w={"full"} maxW={"md"} >
          <Heading fontSize={"2xl"} color={"#3C6255"}> Enter your Cash Here account!</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input _hover={{border: "1px solid #61876E"}} border={'1px solid '} focusBorderColor="#3C6255" type="text" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input border={'1px solid '} focusBorderColor="#3C6255" type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"#61876E"} _hover={{color: "#3C6255"}}>Forgot password?</Text>
            </Stack>
            <Button bgColor={"#3C6255"} variant={"solid"} color={'white'} _hover={{ color:"black", bgColor: "#61876E"}}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex justifyContent={'center'} alignContent={'center'} flex={1}>
        <Image

          alt={"Login Image"}
          objectFit={"cover"}
          src={
            logo
          }
          w={'100px'} h={'100px'}
        />
      </Flex>
    </Stack>
  )
}
