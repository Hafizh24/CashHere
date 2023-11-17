import { Button, Flex, Input, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import Card from "../../card";
import { useState } from "react";
import Pagination from "../../pagination";

export default function SeeAllProducts({productData, isLoaded, getProducts}){
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productData.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filteredProductsByName = productData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <>
        <Flex align={'center'} justifyContent={'center'} direction={'column'} alignItems={'center'} gap={5}>
        <Stack w={'auto'} justifyContent={'center'} direction={'row'} spacing={4} p={2}>
            <Input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mb={4} border={'1px'}/>
            <Input type="text" placeholder="Search by category"  mb={4} border={'1px'}/>
            <Button>Sort A-Z</Button>
        </Stack>
                <SimpleGrid columns={[1, null, 4]} spacing={8}>
                {searchTerm?<>
                        {filteredProductsByName.map((item) =>(
                            <>
                                <Skeleton isLoaded={isLoaded} fadeDuration={1}>
                                    <Card productData={item} getProducts={getProducts}/>
                                </Skeleton>
                            </>
                        ))}
                    </>
                        :
                    <>
                        {currentPosts.map((item) =>(
                            <>
                            <>
                                <Skeleton isLoaded={isLoaded} fadeDuration={1}>
                                    <Card productData={item} getProducts={getProducts}/>
                                </Skeleton>
                            </>
                            </>
                        ))}
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