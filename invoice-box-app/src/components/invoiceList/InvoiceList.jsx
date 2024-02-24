import React, { useEffect } from "react";
import "./invoice.css";
import ListTab from "../listTab/ListTab";
import { auth } from "../../config/firebaseConfig";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LineChartComp from "../Piechart";
import { PieComp } from "../Piechart";
import { fetchdata } from "../submitData";

function InvoiceList() {
  let num = 0;
  const [data, setData] = useState([]);
  const userIdToFetch = auth?.currentUser?.uid;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const invoice = data.map((arr) => arr.date[1]);

  ////////////////////
  let data3 = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
    { name: "Aug", value: 0 },
    { name: "Sept", value: 0 },
    { name: "Oct", value: 0 },
    { name: "Nov", value: 0 },
    { name: "Dec", value: 0 },
  ];
  data3.forEach((arr) => {
    for (let i = 0; i < invoice.length; i++) {
      if (arr.name === invoice[i]) {
        arr.value++;
      }
    }
  });

  const paymentData = [
    { name: "paid", value: data.filter((a) => a.status === "paid").length },
    { name: "unpaid", value: data.filter((a) => a.status === "unpaid").length },
  ];

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          //fetching list of invoice from db
          fetchdata("invoice", "userId", setData);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Handle the case when the user is not logged in
      }
    });

    return unsubscribe; // Unsubscribe from the listener when the component unmounts
  }, []);

  return (
    <div className="invoice_list">
      <div className="invoice_list-amount-1">
        <LineChartComp newData={data3} />
      </div>
      <div className="invoice_list-amount-2">
        <div className="payTag" style={{}}>
          <div>
            paid<span className="green"></span>
          </div>
          <div>
            unPaid<span className="red"></span>
          </div>
        </div>

        <PieComp newData={paymentData} />
      </div>
      <div className="invoice_list-dashboard">
        <table className="left-aligned-table">
          <thead>
            <tr>
              <td>S/n</td>
              <td>Client</td>
              <td>Product QTY</td>
              <td>Amount</td>
              <td>Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {data.map((arr, i) => (
              <ListTab
                count={i}
                client={arr.billTo}
                product={arr.items
                  .map((arr) => +arr.quantity)
                  .reduce((a, b) => a + b)}
                date={arr.date?.join("-")}
                status={arr.status}
                amount={arr.items
                  .map((arr) => +arr.quantity * +arr.amount)
                  .reduce((a, b) => a + b)}
                key={arr?.DocId}
                formArr={arr}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceList;
