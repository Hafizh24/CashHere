import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarBadge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditIcon } from "@chakra-ui/icons";

const FILE_SIZE = 1024 * 1024;

const validationSchema = Yup.object({
  image: Yup.mixed().test(
    "fileSize",
    "File size must be less than 1MB",
    (value) => value && value.size <= FILE_SIZE
  ),
});

const CardProfile = () => {
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
    formik.setFieldValue("image", e.target.files[0]);
  };

  return (
    <>
      {formik.errors.image && (
        <Alert status="error" position={"absolute"} top={-14}>
          <AlertIcon />
          {formik.errors.image}
        </Alert>
      )}
      <Box display={"flex"} justifyContent={"center"} mt={"4rem"}>
        <Card w={"80"} h={"80"}>
          <CardBody>
            <Flex justifyContent={"center"}>
              <Avatar name="John Kei" size={"xl"} bg={"gray.300"}>
                <AvatarBadge boxSize={"0.9em"} bg={"white"} borderRadius={"full"}>
                  <label style={{ cursor: "pointer" }} htmlFor="image">
                    <EditIcon w={4} h={4} />
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept=".jpg,.png,.svg"
                      display={"none"}
                      onChange={handleChange}
                    />
                  </label>
                </AvatarBadge>
              </Avatar>
            </Flex>

            <Stack mt="6" spacing="3">
              <Text fontSize={"lg"}>username</Text>
            </Stack>
          </CardBody>
          <Divider />
        </Card>
      </Box>
    </>
  );
};

export default CardProfile;
