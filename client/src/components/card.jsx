import { Box, Heading, Text, Stack, useColorModeValue, Button, HStack, StackDivider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useToast, ModalCloseButton, Image, Skeleton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ModalUpdateProduct from "./manageProduct/subcomponents/modalUpdateProduct";
import { DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";

export default function Card({productData, getProducts}) {
  const user = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const toast = useToast()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
  const { isOpen: isOpenWarning, onOpen: onOpenWarning, onClose: onCloseWarning } = useDisclosure();
  
  const handleDelete = async () => {
    try{
        await axios.patch(`http://localhost:2000/products/delete-product`, {id: productData.id}, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        });
        toast({
            title: "Success", description: "Selected product has been deleted", status: "success", duration: 3000, position: "top",
        });
        getProducts();
    }catch(err){
        console.log(err);
        toast({
            title: "Error", description: "Selected product can't be deleted", status: "error", duration: 3000, position: "top",
        });
    }
  }

  return (
    <>
      <Box
        maxW={{ base: "300px", md: "370px" }}
        maxH={{ base: "700px", md: "730px"}}
        w={["20rem", "20rem"]}
        h={['400px','510px']}
        bg={useColorModeValue("white", "gray.900")}
        shadow={"lg"}
        rounded={"md"}
        p={6}
        flex="0 0 auto" // Allow flex item to shrink if needed
        mx={"13px"}
        transition="transform 0.2s ease-in-out"  // Smooth transition over 0.3 seconds
        _hover={{
          transform: "scale(1.05)",  // Scale up to 105% when hovered
        }}
      >
        <Box overflow={"hidden"} h={{ base: "140px", md: "140px", lg: "200px" }} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>          
          <Image src={`http://localhost:2000/${productData.image}`} fill alt={productData?.name} />
        </Box>
        <Stack>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={"#3C6255"}
            fontSize={["xs", "lg"]}
            fontFamily={"body"}
          >
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
          {user.isAdmin === true && <>Status : {productData?.isActive === true ? <>Active</> : <>Inactive</>}</>}
          </Text>
          <HStack justifyContent={'flex-end'} divider={<StackDivider borderColor="gray.400" />}>
            {user?.isAdmin === true ? 
            <>
            <Button onClick={() => {onOpenUpdate()}} size={["sm", "md"]} bgColor={'#3C6255'} _hover={{bg: '#61876E'}} mr={2} color={'white'}>
              <EditIcon/>
            </Button>
            <Button onClick={() => {onOpenWarning()}} size={["sm", "md"]} colorScheme="red">
              <DeleteIcon/>
            </Button>
            </> 
            : 
            <>
            </>}
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
              All data related to <span style={{ color: "red" }}>{productData.name}</span>{" "}
              will be deleted.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button bgColor={'#3C6255'} _hover={{bg: '#61876E'}} color={'white'} mr={3} onClick={onCloseWarning}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => {
                handleDelete();
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
