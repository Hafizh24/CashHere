import { Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button } from '@chakra-ui/react'
import React from 'react'

const ModalConfirmPayment = ({ isPaymentModalOpen, onPaymentModalClose, handleSubmit }) => {
  return (
    <>
      <Modal isOpen={isPaymentModalOpen} onClose={onPaymentModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure to proceed the order</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onPaymentModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                handleSubmit()
                onPaymentModalClose()
              }}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalConfirmPayment
