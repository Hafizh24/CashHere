import ReportSidebar from "../components/reports/sidebar";
import {
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useDisclosure,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import Papa from "papaparse";


export default function ProductSales() {
  const [transactionData, setTransactionData] = useState([]);
  const token = localStorage.getItem("token");

  const getTransactionData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/transaction-details/product-transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactionData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTransactionData();
  }, []);

  const csvData = transactionData.map((item) => ({
    "Transaction Id": item.id,
    "Product Name": item.TransactionProducts[0]?.Product?.name,
  }));

  const handleDownloadCSV = () => {
    saveAs(new Blob([Papa.unparse(csvData)], { type: "text/csv;charset=utf-8" }), "sales_data.csv");
  };

  return (
    <>
      <ReportSidebar />
      <Flex
        pl={[null, "15rem"]}
        justifyContent={"center"}
        direction={"column"}
        gap={5}
      >
        <Stack p={10} spacing={5}>
          <Flex>
            <Box
              borderRadius={"3px"}
              ml={"50px"}
              mt={"10px"}
              align={"left"}
              border={"1px solid black"}
              w={"fit-content"}
            >
            </Box>
          </Flex>
          <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <TableContainer>
                <Table variant="simple" size={["xs", "md"]}>
                  <TableCaption>Product Sales</TableCaption>
                  <Thead>
                    <Tr>
                      <Th fontSize={["xs"]}>Transaction Id</Th>
                      <Th fontSize={["xs"]}> Product Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {transactionData.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.id}</Td>
                      <Td>{item.TransactionProducts[0]?.Product?.name}</Td>
                    </Tr>
                  ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Button bgColor={'#3C6255'} _hover={{bg: '#61876E'}} color={'white'} onClick={handleDownloadCSV}>Download .csv</Button>
        </Stack>
      </Flex>
    </>
  );
}