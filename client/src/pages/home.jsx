import { Flex, SimpleGrid } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";
import Card from "../components/card";
import axios from "axios";
import { useEffect, useState } from "react";

import SimpleSidebar, {} from '../components/sidebar'

function Home() {
    
    const token = localStorage.getItem('token')
    const [productData, setProductData] = useState([]);    

    const getProducts = async () => {
        try{
            const response = await axios.get("http://localhost:2000/products/get-product", {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            });
          setProductData(response.data.dataProduct)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
        getProducts();
    }, [])

    return(
        <>
            <SidebarWithHeader></SidebarWithHeader>
            <Flex mt={7} minH={'80vh'} pl={[null, '15rem']} align={'center'} justifyContent={'center'} direction={'column'} gap={5}>
                <SimpleGrid columns={[1, null, 4]} spacing={8}>
                        {productData.map((item, index) =>(
                        <Card productData={item}/>
                        ))}
                </SimpleGrid>
            </Flex>
        </>
    )
}

export default Home;