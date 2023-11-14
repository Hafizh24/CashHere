import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import AddCategory from "./addCategory";
import UpdateCategory from "./updateCategory";

const ManageCategory = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:2000/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Flex
        minH={"100vh"}
        minW={"100vw"}
        align={"center"}
        justify={"center"}
        bgColor={"white"}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList justifyContent={"center"}>
            <Tab textAlign={"center"}>Add a new product category</Tab>
            <Tab textAlign={"center"}>Manage product category</Tab>
          </TabList>
          <TabPanels h={"80vh"}>
            <TabPanel>
              <AddCategory getData={fetchAPI} />
            </TabPanel>
            <TabPanel>
              <UpdateCategory data={data} getData={fetchAPI} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default ManageCategory;
