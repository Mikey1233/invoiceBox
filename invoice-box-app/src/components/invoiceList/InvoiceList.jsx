import React, { useEffect } from "react";
import "./invoice.css";
import ListTab from "../listTab/ListTab";
///////////fetch data form firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleProvider } from "../../config/firebaseConfig";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PieChart, { LineChart } from "../Piechart";

function InvoiceList() {
  let num = 0;
  const [data, setData] = useState([]);
  const userIdToFetch = auth?.currentUser?.uid;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  ////////////////////
  const invoiceMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const invoicesPerMonth = {};

  // Initialize the snacksPerMonth object with 0 frequency for each month
  invoiceMonths.forEach((a) => {
    invoicesPerMonth[a] = 0;
  });

  // Assuming you have an array containing the months you had snacks
 const invoice = data.map((arr)=>arr.date[1])

  // Count the frequency of snacks for each month
  invoice.forEach((month) => {
    if (invoicesPerMonth.hasOwnProperty(month)) {
      invoicesPerMonth[month]++;
    }
  });

  // console.log(snacksPerMonth);

  ///////////////////
  const fetchdata = async () => {
    try {
      const q = await query(
        collection(db, "invoice"),
        where("userId", "==", auth?.currentUser?.uid)
      );

      const querySnapshot = await getDocs(q);

      const fetchedData = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(fetchedData);
      
    } catch (err) {
      console.log(err);
    }
  };

  ////////////////////////////////////////////////////

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          fetchdata(); // Call your fetchdata function
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
  //////pie data

  return (
    <div className="invoice_list">
      {/* <div className="invoice_list-amount"> */}
      <div className="invoice_list-amount-1">
        
        <LineChart amounts={Object.values(invoicesPerMonth)} />
      </div>
      <div className="invoice_list-amount-2">
       
        <PieChart
          paid={data.filter((a) => a.status === "paid").length}
          unpaid={data.filter((a) => a.status === "unpaid").length}
        />

       
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
                key={arr.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceList;
