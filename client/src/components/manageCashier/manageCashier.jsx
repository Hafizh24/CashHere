import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AddCashier from "./subcomponents/addCashier";
import UpdateCashier from "./subcomponents/updateCashier";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../navbar";

export default function ManagerCashier() {
    const [cashierData, setCashierData] = useState([]);
    const token = localStorage.getItem('token')

    const getCashierData = async () => {
      try{
          const response = await axios.get("http://localhost:2000/users/get-user", {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        });
          setCashierData(response.data.dataCashier)
      }catch(err){
          console.log(err);
      }
    }

  useEffect(() => {
    getCashierData();
    }, [])
  
  return (
    <>
    <Navbar></Navbar>
    <Flex
    minH={'100vh'}
    minW={'100vw'}
    align={'center'}
    justify={'center'}
    bgColor={'white'}>
      <Tabs variant='soft-rounded' colorScheme='green' >
        <TabList justifyContent={'center'}>
          <Tab textAlign={'center'}>Register a new cashier</Tab>
          <Tab textAlign={'center'}>Manage cashier</Tab>
        </TabList>
        <TabPanels h={'80vh'}>
          <TabPanel>
            <AddCashier getCashierData={getCashierData}></AddCashier>
          </TabPanel>
          <TabPanel>
            <UpdateCashier cashierData={cashierData} getCashierData={getCashierData}></UpdateCashier>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
    </>
  )
}