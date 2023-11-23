import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    useToast,
    Input
  } from '@chakra-ui/react'
  import { useFormik } from 'formik'
  import axios from 'axios'
  import { useState } from 'react'
  
  function ModalUpdateCategory({ isOpenUpdate, onCloseUpdate, productData, getProducts, clickedData }) {
    const toast = useToast()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = async (data) => {
      try {
        setLoading(true)
        await axios.patch(`http://localhost:2000/categories/${clickedData?.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) //sending data to database
        setLoading(false)
        getProducts()
        toast({
          title: 'Success',
          description: `Data updated`,
          status: 'success',
          duration: 4000,
          position: 'top'
        })
        onCloseUpdate()
      } catch (err) {
        console.log(err.response.data.message)
        toast({
          title: 'Error',
          description: `Something's wrong`,
          status: 'error',
          duration: 4000,
          position: 'top'
        })
        setLoading(false)
      }
    }
  
    const handleCancel = () => {
      onCloseUpdate()
    }
  
    const formik = useFormik({
      initialValues: {
        name: ''
      },
      onSubmit: (values, action) => {
        handleSubmit(values)
        action.resetForm()
      }
    })
  
    return (
      <>
        <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{productData?.name}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={formik.handleSubmit}>
              <ModalBody pb={8}>
                <FormControl mt={3}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoComplete="new"
                    border={'1px'}
                    placeholder={productData?.name}></Input>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={loading}
                  loadingText="Updating"
                  bg={'#3C6255'}
                  color={'white'}
                  colorScheme="blue"
                  mr={3}
                  _hover={{ bg: '#61876E' }}
                  rounded={'full'}>
                  Update
                </Button>
                <Button onClick={handleCancel} rounded={'full'}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default ModalUpdateCategory