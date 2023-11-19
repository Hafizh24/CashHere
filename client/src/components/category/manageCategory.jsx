import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
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
      // console.log(response.data);
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
      <Flex
        minH={"100vh"}
        minW={"50vw"}
        align={"center"}
        justify={"center"}
        bgColor={'#f0f0ec'}
        direction={'column'}>
          <AddCategory getData={fetchAPI} />
          <UpdateCategory data={data} getData={fetchAPI} />
      </Flex>
    </>
  );
};

export default ManageCategory;
