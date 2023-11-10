import { Button, Stack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AdminDashboard(){

    return(
        <>
        <Stack justifyContent={'center'} h={'100vh'}>
            <VStack p={5}>
                <Link to={'/manage-cashier'}>
                    <Button size={'lg'} variant={'outline'} bgColor={'#3C6255'} _hover={{backgroundColor:'#61876E'}} color={'white'} rounded={'full'}>Manage Cashier</Button>
                </Link>
                <Link to={'/manage-product'}>
                    <Button size={'lg'} variant={'outline'} bgColor={'#3C6255'} _hover={{backgroundColor:'#61876E'}} color={'white'} rounded={'full'}>Manage Product</Button>
                </Link>
            </VStack>
        </Stack>
        </>
    )
}

export default AdminDashboard;