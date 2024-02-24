import React, { useEffect } from "react";
import "./dynamicPdf.css";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import {
  deleteDocFromDb,
  fetchSingleData,
  // fetchSingleData,
} from "../submitData";
import { useState } from "react";
import { addDoc, collection,where,query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
function DynPdf() {
  const location = useLocation();



  
  const [starred, setStarred] = useState(false);
  const [dataFromDb, setDataFromDb] = useState([]);
  let c = 0;
  const formData = location.state;
  const dataBaseRef = collection(db, "starredInvoice");

  const addTostarred = async () => {
    try {
      await addDoc(dataBaseRef, formData);
      setStarred(true);
    } catch (err) {
      console.log(err);
      setStarred(false);
    }
  };
 const removeFromStarred = async () =>{
  try{
    const deleteId = dataFromDb[0]?.DocId
  await  deleteDocFromDb("starredInvoice",deleteId,setStarred)
  }catch(err){
  console.log(err)
  }
 }
  /////////item price
  const total = formData.items
    .map((arr) => +arr.quantity * +arr.amount)
    .reduce((a, b) => a + b)
    .toFixed(2);
  useEffect(() => {
    async function fetchData() {
      try {
    const x = await fetchSingleData(formData?.DocId)
    setDataFromDb(x)
        const collectionRef = collection(db, 'starredInvoice');
        let q = await query(collectionRef, where("DocId", "==", formData?.DocId))
        const a = await getDocs(q)
        // console.log(x)
        
        if(a.size === 0){
             setStarred(false)
        }else{
            setStarred(true)
        }
          //  setStarred(true)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    // Make sure to include any dependencies that affect this effect
  }, [location]);
  
  const TrRol = ({ name, des, rate, qty }) => {
    const amount = +rate * +qty;
    return (
      <tr>
        <td>
          <p className="name">{name}</p>

          <p className="text">{des}</p>
        </td>
        <td>₦{rate}</td>
        <td>{qty}</td>
        <td>₦{amount}</td>
      </tr>
    );
  };
  const exportToPdf = () => {
    const element = document.getElementById("invoice"); // Adjust the selector as needed
    const opt = {
      margin: 0.5,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 1 }, // Adjust quality as needed (0.1 to 1)
      html2canvas: { scale: 2, dpi: 300 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
        compressPDF: true,
      },
    };
    html2pdf().from(element).set(opt).save();
  };
  return (
    <div>
      <div id="invoice">
        {/*Invoice Issuer details  */}
        <div id="issuer" className="issuer">
          <div className="issuer-details">
            <div>name</div>
            <div>business</div>
            <div>phone number</div>
            <div>id : {formData?.doc}</div>
          </div>
          <div className="issuer-img">{/* <img /> */}</div>
        </div>
        <div className="billTo">
          <div>
            <p>BILL TO</p>
            <p>{formData.billTo}</p>
            <p>{formData.address}</p>
            <p>
              <i className="bi bi-telephone-fill"></i> {formData.clientNum}
            </p>
            <p>#INVOICE</p>
          </div>
          <div>
            <p>Date</p>
            <p>{formData.date?.join("-")}</p>
            <p>DUE</p>
            <p>On Receipt</p>
            <p>BALANCE DUE</p>
            <p>NGN ₦{total - total}</p>
          </div>
        </div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th>DESCRIPTION</th>
              <th>RATE</th>
              <th>QTY</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {formData?.items.map((arr) => (
              <TrRol
                des={arr.description}
                name={arr.productName}
                rate={arr.amount}
                qty={arr.quantity}
                key={c++}
              />
            ))}
          </tbody>
        </table>
        {/*issuer bank details and total amounts of items   */}
        <div className="bankDet">
          <div className="paymentInfo">
            <p>Payment Info</p>
            <p>PAYMENT INSTRUCTIONS</p>
            <p>Account details</p>
            <p>{formData.bankAccNum}</p>
            <p>{formData.bankName}</p>
            <p>{formData.bankAccName}</p>
          </div>
          <div className="paymentBal">
            <div className="pay">
              <div>
                <div>TOTAL</div>
                <div>PAID</div>
              </div>
              <div>
                <div>₦{total}</div>
                <div>₦{total}</div>
                <div>{formData?.date?.join("-")}</div>
              </div>
            </div>
            <div className="bal">
              <p>Balance Due</p>
              <p>₦{(total - total).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divBtn">
        <button onClick={exportToPdf} className="pdfBtn">
          download pdf
        </button>
        {starred ? (
          <button
            className="pdfBtn"
            onClick={() =>
              removeFromStarred()
              // deleteDocFromDb("starredInvoice", dataFromDb[0]?.id, setStarred)
            }
          >
            <i class="bi bi-star-fill"></i>
          </button>
        ) : (
          <button className="pdfBtn" onClick={addTostarred}>
            <i class="bi bi-star"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default DynPdf;
