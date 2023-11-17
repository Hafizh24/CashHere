import { Flex, Input, SimpleGrid, Skeleton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";
import Card from "../components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import FilterProductByName from "../components/filtering/filterProductByName";
import PaginatedProduct from "../components/filtering/paginatedProduct";

import SimpleSidebar from "../components/sidebar";
import Cart from "../components/Cart";

function Home() {
    const token = localStorage.getItem('token')
    const [productData, setProductData] = useState([]);   
    const [isLoaded, setIsLoaded] = useState(false) 
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
      
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
  const token = localStorage.getItem("token");
  const [productData, setProductData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/products/get-product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductData(response.data.dataProduct);
    } catch (err) {
      console.log(err);
    }
  };

    useEffect(() =>{
        getProducts();
    }, [])

    return(
        <>
            <SidebarWithHeader></SidebarWithHeader>
            <Flex pl={[null, '15rem']} align={'center'} justifyContent={'center'} direction={'column'} gap={5}>
                <Stack w={'30vw'}>
                    <Input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mb={4} border={'1px'}/>
                </Stack>
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
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SidebarWithHeader onOpening={onOpen} />
      <Flex
        mt={7}
        minH={"80vh"}
        pl={[null, "15rem"]}
        align={"center"}
        justifyContent={"center"}
        direction={"column"}
        gap={5}>
        <SimpleGrid columns={[1, null, 4]} spacing={8}>
          {productData.map((item, index) => (
            <Card productData={item} />
          ))}
        </SimpleGrid>
        <Cart data={productData} onClose={onClose} isOpen={isOpen} />
      </Flex>
    </>
  );
}

export default Home;
