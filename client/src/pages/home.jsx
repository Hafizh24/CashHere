import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SimpleSidebar, {} from '../components/sidebar'

function Home() {
    return(
        <>
        <SimpleSidebar/>
            <Link to={'/admin-dashboard'}>
                <Button bgColor={'#3C6255'} _hover={{backgroundColor:'#61876E'}} color={'white'}>Admin Dashboard</Button>
            </Link>
        </>
    )
}

export default Home;