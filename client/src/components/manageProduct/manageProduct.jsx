import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SidebarWithHeader from "../sidebar";
import SeeAllProducts from "./subcomponents/seeAllProducts";
import AddProduct from "./subcomponents/addProduct";

export default function ManageProduct() {
  const token = localStorage.getItem('token')
  const [productData, setProductData] = useState([]);   
  const [isLoaded, setIsLoaded] = useState(false) 
      
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
    }

    useEffect(() =>{
        getProducts();
    }, [])
  
  return (
    <>
    <SidebarWithHeader></SidebarWithHeader>
    <Flex
    minH={'90vh'}
    align={'center'}
    justify={'center'}
    pl={[null, '12rem']}>
      <Tabs variant='soft-rounded' >
        <TabList justifyContent={'center'}>
          <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>Add product</Tab>
          <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>Manage products</Tab>
        </TabList>
        <TabPanels h={'80vh'}>
          <TabPanel>
            <AddProduct getProducts={getProducts}/>
          </TabPanel>
          <TabPanel>
            <SeeAllProducts productData={productData} getProducts={getProducts} isLoaded={isLoaded}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
    </>
  );
}
