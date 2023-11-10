import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
  
  export default function WelcomePage() {
    return (
      <>
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Welcome to <br />
              <Text as={'span'} color={'green.400'}>
                Cash Here
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Monetize your content by charging your most loyal readers and reward them
              loyalty points. Give back to your loyal readers by granting them access to
              your pre-releases and sneak-peaks.
            </Text>
            <Stack
              direction={'row'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>
              <Button
                colorScheme={'green'}
                bg={'#3C6255'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: '#61876E',
                }}>
                Login as Cashier
              </Button>
              <Link to="/home">
                <Button
                    colorScheme={'green'}
                    bg={'#3C6255'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                    bg: '#61876E',
                    }}>
                    Login as Admin
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </>
    )
  }