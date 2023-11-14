import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/gif", "image/png", "image/jpeg"];

const validationSchema = Yup.object({
  image: Yup.mixed()
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test("fileSize", "File size must be less than 1MB", (file) => {
      if (file) {
        return file.size <= FILE_SIZE;
      } else {
        return true;
      }
    }),
});

const CardProfile = () => {
  const [selectedFile, setSelectedFile] = useState({ file: undefined, previewURI: undefined });
  const user = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const toast = useToast();
  // console.log(user);
  // console.log(user.image);

  const handleSubmit = async (value) => {
    try {
      const data = new FormData();
      data.append("image", value);

      await axios.patch("http://localhost:2000/users/change-img", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: `profile picture has been changed`,
        status: "success",
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values.image);
      setTimeout(() => action.setSubmitting(false), 3000);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setSelectedFile({
          file,
          previewURI: reader.result,
        });
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file);
    }
  };

  useEffect(() => {
    // console.log({ formik });
  });

  return (
    <>
      {formik.errors.image && (
        <Alert status="error" position={"absolute"} top={0}>
          <AlertIcon />
          {formik.errors.image}
        </Alert>
      )}
      <Box display={"flex"} justifyContent={"center"} bgColor={"fourth"} h={"100vh"}>
        <form onSubmit={formik.handleSubmit}>
          <Card w={"96"} h={"96"} mt={14}>
            <CardBody>
              <Flex justifyContent={"center"}>
                <Avatar
                  name={user?.username}
                  size={"xl"}
                  bg={"third"}
                  src={
                    !formik.errors.image && selectedFile.previewURI
                      ? selectedFile.previewURI
                      : `http://localhost:2000/${user.image}`
                  }
                  // src={`http://localhost:2000/${user.image}`}
                >
                  <AvatarBadge boxSize={"0.9em"} bg={"white"} borderRadius={"full"}>
                    <label style={{ cursor: "pointer" }} htmlFor="image">
                      <EditIcon w={4} h={4} />
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        display={"none"}
                        onChange={handleChange}
                      />
                    </label>
                  </AvatarBadge>
                </Avatar>
              </Flex>
              <Stack mt="10" spacing="2">
                <Text textAlign={"center"} fontSize={"2xl"}>
                  {user?.username}
                </Text>
                <Text textAlign={"center"} fontSize={"2xl"}>
                  {user?.email}
                </Text>
              </Stack>
              <Flex justifyContent={"center"} mt={20}>
                <Button
                  type="submit"
                  w={220}
                  bgColor={"second"}
                  color={"white"}
                  size={"md"}
                  borderRadius={"xl"}
                  _hover={{
                    bgColor: "third",
                  }}>
                  {!formik.isSubmitting ? "Save" : "Loading..."}
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </form>
      </Box>
    </>
  );
};

export default CardProfile;
