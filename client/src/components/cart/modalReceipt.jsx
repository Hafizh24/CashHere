import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  Stack,
  Text,
  HStack,
  VStack
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import ReactToPrint from 'react-to-print'
import { clearCart } from '../../redux/cartSlice'

const ModalReceipt = ({ products, carts, change, total, onReceiptModalClose, isReceiptModalOpen, setAmount }) => {
  const dispatch = useDispatch()
  const ref = useRef()

  const handleClose = () => {
    onReceiptModalClose()
    dispatch(clearCart())
    setAmount('')
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}
      <Modal onClose={onReceiptModalClose} isOpen={isReceiptModalOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Stack ref={ref}>
            <ModalHeader>Invoice Cash Here</ModalHeader>
            <ModalBody borderTopWidth={'1px'}>
              <Stack mt={4} mb={4}>
                {carts.map((item) => {
                  const product = products.find((product) => product.id === item.id)
                  return (
                    <HStack key={item.id} justifyContent={'space-between'} spacing={1}>
                      <Text>{product?.name}</Text>
                      <Text>{item.quantity}x</Text>
                      <Text>
                        {product?.price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        })}
                      </Text>
                    </HStack>
                  )
                })}
              </Stack>
              <Stack spacing={1} borderTopWidth={'1px'}>
                <HStack justifyContent={'space-between'} mt={8}>
                  <Text>Total Price</Text>
                  <Text>
                    {total.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    })}
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Change </Text>
                  <Text>
                    {change.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    })}
                  </Text>
                </HStack>
              </Stack>
              <Stack borderTopWidth={'1px'} mt={4} textAlign={'center'}>
                <Text tex mt={8}>
                  Thank You For Shopping With Us
                </Text>
              </Stack>
            </ModalBody>
          </Stack>
          <ModalFooter>
            <HStack direction={'row'} spacing={8} mt={4} mb={2} justifyContent={'center'} w={'full'}>
              <ReactToPrint
                bodyClass="print-agreement"
                content={() => ref.current}
                trigger={() => (
                  <Button bgColor={'#3C6255'} color={'white'} ml={'8px'} _hover={{ bg: '#61876E' }} size={['sm', 'md']}>
                    Print
                  </Button>
                )}
              />
              <Button bgcolor="slategrey" color="" ml={'8px'} onClick={handleClose} size={['sm', 'md']}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalReceipt
