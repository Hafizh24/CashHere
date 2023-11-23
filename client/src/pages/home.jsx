
import { Button, Flex, Heading, SimpleGrid, Skeleton, Stack, useDisclosure} from "@chakra-ui/react";

import SidebarWithHeader from "../components/sidebar";
import Card from "../components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "../components/filter";
import Pagination from "../components/pagination";
import Cart from "../components/cart/Cart";


function Home() {
    const token = localStorage.getItem('token')
    const [productData, setProductData] = useState([]);  
    const [isLoaded, setIsLoaded] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const {isOpen, onOpen, onClose} = useDisclosure();


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productData.slice(indexOfFirstPost, indexOfLastPost);
      
    const getProducts = async () => {
        try{
            setIsLoaded(false)
            const response = await axios.get("http://localhost:2000/products/get-product", {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            });
          setProductData(response.data.dataProduct)
          setIsLoaded(true)
        }catch(err){            
            console.log(err);
            setIsLoaded(false)
        }
  
  

  

  useEffect(() => {
    getProducts()
  }, [])

    return(
        <>

            <SidebarWithHeader onOpening={onOpen}></SidebarWithHeader>
            <Flex pl={[null, '14rem']} bgColor={'#f0f0ec'} align={'center'} justifyContent={'center'} direction={'column'} pt={5} gap={5}>
            <Filter setProductData={setProductData} setIsLoaded={setIsLoaded}/>
            {productData?.length !== 0? 
                <>
                <SimpleGrid columns={[1, null, 4]} spacing={8}>
                    { searchTerm ?
                    <>
                        <FilterProductByName productData={productData} getProducts={getProducts} searchTerm={searchTerm} isLoaded={isLoaded}/>
                    </>
                        :
                    <>
                        <PaginatedProduct productData={productData} getProducts={getProducts} isLoaded={isLoaded} postsPerPage={postsPerPage} currentPage={currentPage}/>
                    </>}
                </SimpleGrid>
                {!searchTerm && 
                <>
                    <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={productData.length}
                    paginate={paginate}/>
                </>}
            </Flex>
        </>
    )
}

export default Home
