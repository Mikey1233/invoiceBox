import React, { useEffect } from "react";
import "./starred.css";
import ListTab from "../listTab/ListTab";
import { useState } from "react";
import star from "../../assets/star2.svg";
import { PieComp } from "../Piechart";
import { getDocs,query,collection,where} from "firebase/firestore";
import { auth ,db} from "../../config/firebaseConfig";
function Starred() {
  const user = auth?.currentUser?.uid
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const single = await query(
        collection(db, "starredInvoice"),
        where("userId", "==", user)
      );
      const singleSnapshot = await getDocs(single);
      const fetchedSingleData = await singleSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setData(fetchedSingleData)
    }
    getData()
  },[]);
  
  const paymentData = [
    { name: "paid", value: data.filter((a) => a.status === "paid").length },
    { name: "unpaid", value: data.filter((a) => a.status === "unpaid").length },
  ];

  return (
    <div className="starred">
      <div className="img2">
        <img src={star} alt="star_pic" />
      </div>
      <div className="invoice_list-amount-2" style={{height:'50vh'}}>
        <div className="payTag">
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
                key={arr.DocId}
                formArr={arr}
              />
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Starred;
