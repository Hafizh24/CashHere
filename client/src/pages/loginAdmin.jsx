import { Button, Center, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "../redux/userSlice";

function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username can't be empty"),
    password: Yup.string()
      .min(3, "Must be at least 3 characters long")
      .required("Password can't be empty"),
  });

      const handleSubmitLogin = async (data) => {
        try {
            const response = await axios.get(`http://localhost:2000/users/user-login?username=${data.username}&password=${data.password}`, data);
            if (response.data.token) {
              dispatch(setData(response.data.userLogin));
              localStorage.setItem("token", response.data.token);
              navigate('/home');            
            }
        }catch(err) {
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
      handleSubmitLogin(values);
      action.resetForm();
    },
  });
  return (
    <>
      <Center minH={"100vh"}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={7}>
            <FormControl>
              <FormLabel>Username/Email</FormLabel>
              <Input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                focusBorderColor="#3C6255"
                autoComplete="off"
                rounded={"full"}
                _focus={{ backgroundColor: "#3C6255", color: "white" }}
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              {formik.touched.username && formik.errors.username ? (
                <Text mt={2} style={{ color: "red" }}>
                  {formik.errors.username}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                focusBorderColor="#3C6255"
                autoComplete="off"
                rounded={"full"}
                _focus={{ backgroundColor: "#3C6255", color: "white" }}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              {formik.touched.password && formik.errors.password ? (
                <Text mt={2} style={{ color: "red" }}>
                  {formik.errors.password}
                </Text>
              ) : null}
            </FormControl>
            <Stack>
              <Button
                type="submit"
                bg={"#3C6255"}
                color={"white"}
                _hover={{ bg: "#61876E" }}
                rounded={"full"}>
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Center>
    </>
  );
}

export default LoginAdmin;
