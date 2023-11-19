import React from 'react'
import { Page, Document, StyleSheet } from '@react-pdf/renderer'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import InvoiceTitle from './invoiceTitle'
// import { Text } from '@chakra-ui/react'

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column'
  }
})

const Invoice = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle title="invoice" />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  )
}

export default Invoice
