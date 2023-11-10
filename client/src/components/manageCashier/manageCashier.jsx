import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react'
  
  export default function ManagerCashier() {
    return (
      <Flex
        minH={'100vh'}
        minW={'100vw'}
        align={'center'}
        justify={'center'}
        bgColor={'#EAE7B1'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={'32vw'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Add cashier</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={7}>
                <FormControl id="password">
                <FormLabel>Username</FormLabel>
                <Input type="text" focusBorderColor='#3C6255' autoComplete='off' rounded={'full'} _focus={{backgroundColor: '#3C6255', color:'white'}}/>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" focusBorderColor='#3C6255' autoComplete='new' rounded={'full'} _focus={{backgroundColor: '#3C6255', color:'white'}}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" focusBorderColor='#3C6255' autoComplete='off' rounded={'full'} _focus={{backgroundColor: '#3C6255', color:'white'}}/>
              </FormControl>
              <Stack>
                <Button
                  bg={'#3C6255'}
                  color={'white'}
                  _hover={{
                    bg: '#61876E',
                  }}
                  rounded={'full'}>
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }