import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyInfo: {
    textAlign: "right",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  totals: {
    marginTop: 10,
    textAlign: "right",
  },
});

const InvoicePDF = ({ payment }) => {
  const items = [
    {
      description: payment.paymentType,
      quantity: payment.quantity,
      unitPrice: payment.amount,
      total: payment.amount,
    },
  ];

const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.companyInfo}>
            <Text>CivicFix City</Text>
            <Text>City Corporation</Text>
            <Text>Dhaka, Bangladesh</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.section}>
          <Text>Bill To:</Text>
          <Text>{payment.name || "N/A"}</Text>
          <Text>{payment.email || payment.issueBoostedBy}</Text>
          
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Description</Text>
            <Text style={styles.tableColHeader}>Quantity</Text>
            <Text style={styles.tableColHeader}>Unit Price</Text>
            <Text style={styles.tableColHeader}>Total</Text>
          </View>

          {/* Items */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.description}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{item.unitPrice} TK</Text>
              <Text style={styles.tableCol}>{item.total} TK</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          
          <Text style={{ fontWeight: "bold" }}>Total: {total} TK</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
