import React, { useEffect } from "react";
import "./starred.css";
import ListTab from "../listTab/ListTab";
import { useState } from "react";
import starPic from "../../assets/star2.svg";
import { PieComp } from "../Piechart";
import { getDocs, query, collection, where } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import noData from "../../assets/no-data.svg";
function Starred({ star, setStar }) {
  const user = auth?.currentUser?.uid;
  console.log(star)
  useEffect(() => {
    async function getData() {
      const single = await query(
        collection(db, "starredInvoice"),
        where("userId", "==", user)
      );
      if(star.length === 0){
        const singleSnapshot = await getDocs(single);
        const fetchedSingleData = await singleSnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setStar(fetchedSingleData);
        console.log(fetchedSingleData)
      }
     
    }
    getData();
  }, []);

  const paymentData = [
    { name: "paid", value: star.filter((a) => a.status === "paid").length },
    { name: "unpaid", value: star.filter((a) => a.status === "unpaid").length },
  ];

  return (
    <div className="starred">
      <div className="img2">
        <img src={starPic} alt="star_pic" />
      </div>
      <div className="invoice_list-amount-2" style={{ height: "50vh" }}>
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
      <div className="invoice_list-dashboard" style={{position:'relative'}}>
        {
           star.length === 0 ? (
            <div className="new">
              <img src={noData} alt="no-data" />
              <p>sorry ,you haven't added any invoice</p>
            </div>
          ): ( <table className="left-aligned-table">
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
           
            {star.map((arr, i) => (
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
        </table>)
        }
       
      </div>
    </div>
  );
}

export default Starred;
