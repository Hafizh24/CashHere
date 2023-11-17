import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  HStack,
  StackDivider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
  ModalCloseButton,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ModalUpdateProduct from "./manageProduct/subcomponents/modalUpdateProduct";
import { DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";

export default function Card({ productData, getProducts }) {
  const user = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const toast = useToast();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenWarning,
    onOpen: onOpenWarning,
    onClose: onCloseWarning,
  } = useDisclosure();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/products/delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Selected cashier has been deleted",
        status: "success",
        duration: 3000,
        position: "top",
      });
      getProducts();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Selected cashier can't be deleted",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        maxW={{ base: "300px", md: "370px" }}
        maxH={{ base: "350px", md: "470px" }}
        w={["20rem", "20rem"]}
        bg={useColorModeValue("white", "gray.900")}
        shadow={"lg"}
        rounded={"md"}
        p={6}
        flex="0 0 auto" // Allow flex item to shrink if needed
        mx={"13px"}>
        <Box
          overflow={"hidden"}
          h={{ base: "130px", md: "130px", lg: "180px" }}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}>
          <Image
            src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=3160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            fill
            alt="Example"
          />
        </Box>
        <Stack>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={"rgb(16, 69, 181)"}
            fontSize={["xs", "lg"]}
            fontFamily={"body"}>
            {productData?.name}
          </Heading>
          <Text color={"black"} fontWeight={800} fontSize={["xs", "sm"]} letterSpacing={1.1}>
            Rp.{productData?.price}
          </Text>
          <Text color={"black"} fontSize={["xs", "sm"]} letterSpacing={1.1}>
            {user.isAdmin === true && <>{productData?.description}</>}
          </Text>
          <Text color={"black"} fontSize={["xs", "sm"]} letterSpacing={1.1}>
            {user.isAdmin === true && <>Stock : {productData?.total_stock}</>}
          </Text>
          <Text color={"black"} fontSize={["xs", "sm"]} letterSpacing={1.1}>
            {user.isAdmin === true && (
              <>Status : {productData?.isActive === true ? <>Active</> : <>Inactive</>}</>
            )}
          </Text>
          <HStack
            justifyContent={"flex-end"}
            divider={<StackDivider borderColor="gray.400" />}>
            {user?.isAdmin === true ? (
              <>
                <Button
                  onClick={() => {
                    onOpenUpdate();
                  }}
                  size={["sm", "md"]}
                  bgColor={"#3C6255"}
                  _hover={{ bg: "#61876E" }}
                  mr={2}
                  color={"white"}>
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => {
                    onOpenWarning();
                  }}
                  size={["sm", "md"]}
                  colorScheme="red">
                  <DeleteIcon />
                </Button>
              </>
            ) : (
              <></>
            )}
          </HStack>
        </Stack>
      </Box>

      <ModalUpdateProduct
        isOpenUpdate={isOpenUpdate}
        onCloseUpdate={onCloseUpdate}
        productData={productData}
        getProducts={getProducts}
      />

      <Modal isOpen={isOpenWarning} onClose={onCloseWarning} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure? <WarningIcon color={"red"} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              All data related to <span style={{ color: "red" }}>{productData.name}</span> will
              be deleted.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseWarning}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => {
                handleDelete(productData?.id);
                onCloseWarning();
              }}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
