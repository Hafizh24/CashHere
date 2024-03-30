import React from 'react'
import CardProfile from '../components/profile/CardProfile'
import { Heading, Stack } from '@chakra-ui/react'
import NavbarProfile from '../components/profile/NavbarProfile'

const Profile = () => {
  return (
    <>
      <Stack bgColor={'#f0f0ec'} h={'100vh'}>
        <NavbarProfile />
        <Heading color={'first'} textAlign={'center'} mt={8} letterSpacing={'1px'}>
          My Profile
        </Heading>
        <CardProfile />
      </Stack>
    </>
  )
}

export default Profile
