import { useFormik } from "formik";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

function ModalUpdate({ isOpen, onClose, clickedData, getCashierData }) {
  const toast = useToast();
  const token = localStorage.getItem("token");

  const handleSubmit = async (data) => {
    try {
      data.id = clickedData.id;
      if (clickedData.isVerified === false) {
        data.isVerified = true;
      } else {
        data.isVerified = false;
      }

      await axios.patch("http://localhost:2000/users/update-user", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); //sending data to database
      getCashierData();
      toast({
        title: "Success",
        description: `${clickedData.username} has been ${
          data.isVerified === true ? "enabled" : "disabled"
        }`,
        status: "success",
        duration: 4000,
        position: "top",
      });
      onClose();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      isVerified: false,
    },
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {clickedData.isVerified === false ? <>Enable</> : <>Disable</>}{" "}
            <span style={{ color: "blue" }}>{clickedData.username}</span>?
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={8}>
              <FormControl>
                <FormLabel>
                  {clickedData.username} will be{" "}
                  {clickedData.isVerified === false ? (
                    <>enabled, and he/she can log in to the website.</>
                  ) : (
                    <>disabled and, he/she can't log in to the website.</>
                  )}{" "}
                </FormLabel>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                bg={"#3C6255"}
                color={"white"}
                colorScheme="blue"
                mr={3}
                _hover={{ bg: "#61876E" }}
                rounded={"full"}>
                {clickedData.isVerified === false ? <>Enable</> : <>Disable</>}
              </Button>
              <Button onClick={onClose} rounded={"full"}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUpdate;
