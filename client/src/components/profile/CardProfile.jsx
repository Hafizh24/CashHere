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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

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

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      alert(JSON.stringify(values, null, 2));
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

  return (
    <>
      {formik.errors.image && (
        <Alert status="error" position={"absolute"} top={0}>
          <AlertIcon />
          {formik.errors.image}
        </Alert>
      )}
      <Box display={"flex"} justifyContent={"center"} bgColor={"fourth"} h={"100vh"}>
        <Card w={"96"} h={"96"} mt={14}>
          <CardBody>
            <Flex justifyContent={"center"}>
              <Avatar
                name="John Kei"
                size={"xl"}
                bg={"third"}
                src={!formik.errors.image && selectedFile.previewURI}>
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
                username
              </Text>
              <Text textAlign={"center"} fontSize={"2xl"}>
                email
              </Text>
            </Stack>
            <Flex justifyContent={"center"} mt={20}>
              <Button
                w={220}
                bgColor={"second"}
                color={"white"}
                size={"md"}
                borderRadius={"xl"}>
                Save
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default CardProfile;
