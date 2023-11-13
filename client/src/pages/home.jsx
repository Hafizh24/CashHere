import { Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
    const user = useSelector((state) => state.user.value);

    const handleLogout = () => {
        localStorage.removeItem("token");
    }
    return(
        <>
            <Text>Hello {user.username}</Text>
            <Link to={'/admin-dashboard'}>
                <Button bgColor={'#3C6255'} _hover={{backgroundColor:'#61876E'}} color={'white'}>Admin Dashboard</Button>
            </Link>
            <Button onClick={() => {handleLogout()}}>Logout</Button>
        </>
    )
}

export default Home;