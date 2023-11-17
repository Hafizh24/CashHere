import { Flex, Input, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import Card from "../components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import FilterProductByName from "../components/filtering/filterProductByName";
import PaginatedProduct from "../components/filtering/paginatedProduct";
import SidebarWithHeader from "../components/sidebar";

function Home() {
  const token = localStorage.getItem("token");
  const [productData, setProductData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getProducts = async () => {
    try {
      setIsLoaded(false);
      const response = await axios.get("http://localhost:2000/products/get-product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductData(response.data.dataProduct);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SidebarWithHeader></SidebarWithHeader>
      <Flex
        pl={[null, "15rem"]}
        align={"center"}
        justifyContent={"center"}
        direction={"column"}
        gap={5}>
        <Stack w={"30vw"}>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
            border={"1px"}
          />
        </Stack>
        <SimpleGrid columns={[1, null, 4]} spacing={8}>
          {searchTerm ? (
            <>
              <FilterProductByName
                productData={productData}
                getProducts={getProducts}
                searchTerm={searchTerm}
                isLoaded={isLoaded}
              />
            </>
          ) : (
            <>
              <PaginatedProduct
                productData={productData}
                getProducts={getProducts}
                isLoaded={isLoaded}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
              />
            </>
          )}
        </SimpleGrid>
        {!searchTerm && (
          <>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={productData.length}
              paginate={paginate}
            />
          </>
        )}
      </Flex>
    </>
  );
}

export default Home;
