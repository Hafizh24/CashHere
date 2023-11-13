import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import cashier from "../../assets/kasir2.png";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/userSlice";
import ForgotPassword from "./resetPassword";
export default function LoginCashier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username can't be empty"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password can't be empty"),
  });

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.get(
        `http://localhost:2000/user/user-login?username=${data.username}&password=${data.password}`,
        data
      );
      if (response.data.token) {
        dispatch(setData(response.data.userLogin));
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = () => {
    onOpen();
  };

  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex justifyContent={"center"} alignContent={"center"} flex={1}>
          <Image alt={"Login Image"} objectFit={"cover"} src={cashier} />
        </Flex>
        <Flex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          bgColor={'gray.100'}
        >
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"} color={"#3C6255"}>
              {" "}
              Enter your Cash Here account!
            </Heading>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  _hover={{ border: "1px solid #61876E" }}
                  border={"1px solid "}
                  focusBorderColor="#3C6255"
                  type="text"
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                />
                {formik.touched.username && formik.errors.username ? (
                  <Text mt={2} style={{ color: "red" }}>
                    {formik.errors.username}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  border={"1px solid "}
                  focusBorderColor="#3C6255"
                  type="password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <Text mt={2} style={{ color: "red" }}>
                    {formik.errors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox border={"#3C6255"}>Remember me</Checkbox>
                  <Button
                    variant={"unstyled"}
                    color={"#61876E"}
                    _hover={{ color: "#3C6255" }}
                    onClick={() => {
                      handleButtonClick();
                    }}
                  >
                    Forgot password?
                  </Button>
                </Stack>
                <Button
                  type="submit"
                  bgColor={"#3C6255"}
                  variant={"solid"}
                  color={"white"}
                  _hover={{ color: "black", bgColor: "#61876E" }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Stack>
      <ForgotPassword isOpen={isOpen} onClose={onClose} isCentered />
    </>
  );
}
