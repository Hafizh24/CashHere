import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addTotal, clearCart, removeFromCart, subtractQuantity } from '../../redux/cartSlice'
import { useRef, useState } from 'react'
import axios from 'axios'
import ModalConfirmPayment from './modalConfirmPayment'
import ModalReceipt from './modalReceipt'

const Cart = ({ data, onClose, isOpen }) => {
  const dispatch = useDispatch()
  const firstField = useRef()
  const toast = useToast()
  const carts = useSelector((state) => state.cart.data)
  const total = carts.reduce((total, item) => total + item.amount * item.quantity, 0)
  const token = localStorage.getItem('token')
  const [amount, setAmount] = useState('')
  const change = amount - total
  const { isOpen: isPaymentModalOpen, onOpen: onPaymentModalOpen, onClose: onPaymentModalClose } = useDisclosure()
  const { isOpen: isReceiptModalOpen, onOpen: onReceiptModalOpen, onClose: onReceiptModalClose } = useDisclosure()
  dispatch(addTotal(carts.reduce((total, item) => total + item.quantity, 0)))

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:2000/transaction-details',
        { cart: carts, total_price: total, amount, change: change },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      onReceiptModalOpen()

      // toast({
      //   title: 'Success',
      //   description: `payment success`,
      //   status: 'success',
      //   duration: 3000,
      //   position: 'top'
      // })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt={10} borderBottomWidth="1px">
            Current order
          </DrawerHeader>
          <DrawerBody mt={10}>
            {carts.map((item) => {
              const product = data.find((product) => product.id === item.id)
              // console.log(product)
              return (
                <Stack mb={3} key={item.id}>
                  <Card direction={'row'} overflow={'hidden'} variant={'outline'}>
                    <Image
                      src={`http://localhost:2000/${product.image}`}
                      borderRadius="full"
                      w={'6rem'}
                      h={'6rem'}
                      pt={2}
                      pl={2}
                    />
                    <CardBody>
                      <Stack direction={'column'}>
                        <Heading fontSize={'md'} fontWeight={'700'} textTransform={'capitalize'}>
                          {product?.name}
                        </Heading>
                        <Text fontSize={'md'} fontWeight={'900'} color={'first'}>
                          {product?.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                          })}
                        </Text>
                      </Stack>
                      <Stack direction={'row'} mt={8} justifyContent={'end'}>
                        <IconButton
                          onClick={() => {
                            dispatch(removeFromCart({ id: item.id }))
                            toast({
                              title: 'success',
                              description: `${product.name} has been removed from cart`,
                              status: 'success',
                              duration: 1000,
                              position: 'top'
                            })
                          }}
                          variant="filled"
                          size="xs"
                          color={'red'}
                          icon={<DeleteIcon />}
                        />
                        <IconButton
                          onClick={() => {
                            if (item.quantity === 1) {
                              dispatch(subtractQuantity({ id: item.id, quantity: 1 }))
                              toast({
                                title: 'success',
                                description: `${product.name} has been removed from cart`,
                                status: 'success',
                                duration: 1000,
                                position: 'top'
                              })
                            } else {
                              dispatch(subtractQuantity({ id: item.id, quantity: 1 }))
                            }
                          }}
                          variant={'outline'}
                          size="xs"
                          icon={<MinusIcon />}
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                        isDisabled={item.quantity > product.total_stock ? true : false}
                          onClick={() => dispatch(addToCart({ id: item.id, quantity: 1 }))}
                          variant={'outline'}
                          size="xs"
                          icon={<AddIcon />}
                        />
                      </Stack>
                    </CardBody>
                  </Card>
                </Stack>
              )
            })}
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px" display={'flex'} flexDirection={'column'}>
            {carts.length > 0 ? (
              <>
                <Stack mb={'30px'} direction={'row'} alignItems={'center'} columnGap={'100px'}>
                  <Text fontSize={'xl'} fontWeight={600}>
                    Total
                  </Text>
                  <Text fontSize={'xl'} fontWeight={600}>
                    {total.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    })}
                  </Text>
                </Stack>
                <Stack mb={'50px'}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="second" fontSize="1.2em" children="Rp" />
                    <Input
                      isRequired={true}
                      value={amount}
                      placeholder="Enter amount"
                      type="number"
                      onChange={(e) => setAmount(e.currentTarget.value)}
                    />
                  </InputGroup>
                </Stack>
                <Flex direction={'column'}>
                  <Button
                    isDisabled={amount < total || amount === '' ? true : false}
                    onClick={() => onPaymentModalOpen()}
                    bgColor={'first'}
                    color={'white'}
                    _hover={{ bgColor: 'third' }}>
                    Checkout
                  </Button>
                </Flex>
              </>
            ) : (
              <Text fontSize={'xl'} fontWeight={400} position={'fixed'} top={'50%'}>
                There's no order
              </Text>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ModalConfirmPayment
        isPaymentModalOpen={isPaymentModalOpen}
        onPaymentModalClose={onPaymentModalClose}
        handleSubmit={handleSubmit}
      />
      <ModalReceipt
        isReceiptModalOpen={isReceiptModalOpen}
        onReceiptModalClose={onReceiptModalClose}
        products={data}
        carts={carts}
        change={change}
        total={total}
        setAmount={setAmount}
      />
    </>
  )
}

export default Cart