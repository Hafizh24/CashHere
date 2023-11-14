import { Box, Button, Flex, FormControl, FormLabel, Input, SimpleGrid, Text, useToast} from "@chakra-ui/react";
import SidebarWithHeader from "../sidebar";
import { useFormik } from "formik";
import * as Yup from "yup"
import CurrencyInput from 'react-currency-input-field';
import axios from "axios";

function AddProduct() {
    const token = localStorage.getItem('token')
    const toast = useToast();
    const AddProductSchema = Yup.object().shape({
        name: Yup.string().required("Username can't be empty"),
        // category: Yup.string().required("Category can't be empty"),
        price: Yup.string().required("Price can't be empty"),
        quantity: Yup.string().required("Quantity can't be empty"),
        description: Yup.string().required("Description can't be empty"),
      });

    const handleSubmit = async (data) => {
        try{
            console.log(data);
            await axios.post("http://localhost:2000/products/add-product", data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            }); //sending data to database
            toast({
                title: "Success", description: `${data.name} has been created`, status: "success", duration: 3000, position: "top",
            });
        }catch(err){
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues:{
          name: "",
          category: "",
          price: 0,
          quantity: "",
          image: "",
          description: ""
        },
        validationSchema: AddProductSchema,
        onSubmit:(values, action) => {
            handleSubmit(values)
            action.resetForm();
        }
      })
    return(
        <>
            <SidebarWithHeader></SidebarWithHeader>
            <form onSubmit={formik.handleSubmit}>
                <Flex minH={'80vh'} pl={[null, '15rem']} align={'center'} justifyContent={'center'} direction={'column'} gap={5}>
                    <SimpleGrid columns={[1, null, 2]} spacing={10}>
                        <Box height='auto' p={3} border={'1px'}>
                            <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input name='name' value={formik.values.name} onChange={formik.handleChange} type="text" focusBorderColor='#3C6255' autoComplete='off' border={'1px'}
                                error={formik.touched.name && Boolean(formik.errors.name)}/>
                                {formik.touched.name && formik.errors.name ? (
                                    <Text mt={2} style={{color: 'red'}}>{formik.errors.name}</Text>
                                ) : null}
                            </FormControl>
                        </Box>
                        <Box height='auto' p={3} border={'1px'}>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Input border={'1px'}></Input>
                            </FormControl>
                        </Box>
                        <Box height='auto' p={3} border={'1px'}>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input name="price" as={CurrencyInput} 
                                defaultValue={formik.values.price} 
                                intlConfig={{ locale: 'id-ID', currency: 'IDR' }} 
                                border={'1px'}
                                onValueChange={(value, name) => {
                                    formik.setFieldValue('price', parseInt(value));
                                  }
                                } />
                            </FormControl>
                        </Box>
                        <Box height='auto' p={3} border={'1px'}>
                            <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input name="quantity" value={formik.values.quantity} onChange={formik.handleChange} border={'1px'} type="number"></Input>
                            </FormControl>
                        </Box>
                        <Box height='auto' p={3} border={'1px'}>
                            <FormControl>
                                <FormLabel>Image</FormLabel>
                                <Input type="file" border={'1px'}></Input>
                            </FormControl>
                        </Box>
                        <Box height='auto' p={3} border={'1px'}>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input name="description" value={formik.values.description} onChange={formik.handleChange} border={'1px'} type="text"></Input>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <Button type="submit">
                        Create
                    </Button>
                </Flex>
            </form>
        </>
    )
}

export default AddProduct;