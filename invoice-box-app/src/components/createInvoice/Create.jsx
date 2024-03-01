import React from "react";
import { useState, useRef } from "react";
import "./create.css";
import InvoiceItem from "./InvoiceItem";
import { add, hasEmptyInputs } from "../submitData";
import Modal from "../modal/Modal";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [base64, setBase64] = useState("");

  const months = [
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

  // const fullDate = 'hey'
  const fullDate = [
    new Date().getDate(),
    months[new Date().getMonth()],
    new Date().getFullYear(),
  ];
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    // Initial values for each field
    user: "",
    billTo: "",
    address: "",
    discount: "",
    method: "cash",
    status: "paid",
    shippedTo: "",
    clientNum: "",
    bankAccNum: "",
    bankAccName: "",
    bankName: "",
  });

  // ...

  /////////handle change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  ////////error messages
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);

  const [items, setItems] = useState([
    { description: "", amount: "", quantity: "", productName: "" },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);

    // File type validation
    if (!file.type.match(/^image\/(jpeg|png|svg)$/)) {
      alert("Please select an image file (jpg, jpeg, png, svg)");
      return;
    }
    // Minimum size validation
    if (fileSizeInMB > 5) {
      alert(
        "Invalid file type or size. Please select an image (jpg, jpeg, png, svg) under 5mb."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Data = reader.result;
      // Use the base64 data as needed (e.g., display in an image tag)
      console.log(base64Data);
      setBase64(base64Data);
    };
  };
  const handleCancel = () => {
    setSelectedImage(null);
    fileInputRef.current.value = "";
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (hasEmptyInputs(formData)) {
      setError(true);
      setToggle(true);
    } else {
      setItems([
        { description: "", amount: "", quantity: "", productName: "" },
      ]);
      setFormData({
        user: "",
        billTo: "",
        address: "",
        discount: "",
        method: "cash",
        status: "paid",
        shippedTo: "",
        clientNum: "",
        bankAccNum: "",
        bankAccName: "",
        bankName: "",
      });

      add(
        {
          ...formData,
          items: items,
          date: fullDate,
          userId: auth?.currentUser?.uid,
          img64: base64,
        },
        "invoice",
        setId,
        navigate
      );
    }
  };
  return (
    <form>
      {error && (
        <Modal
          color={"rgba(249, 222, 220)"}
          textcolor={"red"}
          type={"error"}
          message={`fill in all fields before submission`}
          setToggle={setToggle}
          toggle={toggle}
        />
      )}

      <div className="create">
        <div className="create_header">
          <div className="file">
            <div className="image-upload-box" onClick={handleClick}>
              <p>
                <i className="bi bi-plus-lg"></i> Add your logo
              </p>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/svg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            {selectedImage && (
              <div className="img">
                <div style={{ position: "relative" }}>
                  <i
                    className="bi bi-x-square-fill"
                    onClick={handleCancel}
                    style={{
                      position: "absolute",
                      right: "5px",
                      cursor: "pointer",
                      top: "5px",
                    }}
                  ></i>

                  <img
                    src={selectedImage}
                    alt="Chosen Image"
                    style={{ height: "100px", width: "100%",objectFit:'cover' }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="logo">
            <h2>
              Create your Invoice <i className="bi bi-file-earmark-plus"></i>
            </h2>
          </div>
        </div>

        {/* invoice body */}
        <div className="create_body">
          {/* <Inputs type={'textarea'} /> */}
          <textarea
            cols={"30"}
            className="textarea"
            required
            rows={"7"}
            name="user"
            placeholder={"who is this invoice from (required)"}
            onChange={handleInputChange}
            value={formData.user}
          ></textarea>
          <div className="bill_form">
            <div className="bill">
              <div className="bill_to">
                <label>Bill to</label>
                <div>
                  <input
                    type="text"
                    name="billTo"
                    required
                    placeholder="who is this invoice to?"
                    onChange={handleInputChange}
                    value={formData.billTo}
                  />
                </div>
              </div>
              <div className="bill_to">
                <label>Client address</label>
                <div>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="client address"
                    onChange={handleInputChange}
                    value={formData.address}
                  />
                </div>
              </div>
            </div>
            <div className="dates">
              <div className="title">Delivery form</div>

              <div>
                <label htmlFor="payment_method">Payment Method:</label>
                <select
                  id="payment_method"
                  name="method"
                  onChange={handleInputChange}
                  value={formData.method}
                >
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                </select>
              </div>
              <div>
                <label htmlFor="payment_status">Payment status:</label>
                <select
                  id="payment_status"
                  name="status"
                  onChange={handleInputChange}
                  value={formData.status}
                >
                  <option value="paid">paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div>
                <label>shipped to:</label>
                <input
                  type="text"
                  name="shippedTo"
                  placeholder="(optional)"
                  value={formData.shippedTo}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>discount:</label>
                <input
                  type="number"
                  name="discount"
                  required
                  onChange={handleInputChange}
                  value={formData.discount}
                />
              </div>
              <div>
                <label>client moblie number:</label>
                <input
                  type="number"
                  required
                  name="clientNum"
                  onChange={handleInputChange}
                  value={formData.clientNum}
                />
              </div>
            </div>
          </div>
        </div>

        {/* descriptiomn table */}
        <div className="des_table">
          <div className="des_tr">
            <div>Description</div>
            <div>product name</div>
            <div>Quantity</div>
            <div>rate</div>
          </div>
          <InvoiceItem items={items} setItems={setItems} />
        </div>

        {/* description footer,Bank Info */}
        <div className="des_footer">
          <div className="des_bank">
            <p>invoice issuer Bank Info</p>

            <div>
              <input
                required
                type="text"
                placeholder="bank name"
                name="bankName"
                onChange={handleInputChange}
                value={formData.bankName}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="bank account name"
                name="bankAccName"
                required
                onChange={handleInputChange}
                value={formData.bankAccName}
              />
            </div>
            <div>
              <input
                required
                type="number"
                name="bankAccNum"
                placeholder="bank account number"
                onChange={handleInputChange}
                value={formData.bankAccNum}
              />
            </div>
          </div>
        </div>
        <div>
          <button className="submit" onClick={submitForm} type="submit">
            <i class="bi bi-send-check"></i> Submit form
          </button>
        </div>
      </div>
    </form>
  );
}

export default Create;
