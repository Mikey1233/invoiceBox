import React from "react";
import "./listTab.css";
import { useNavigate } from "react-router-dom";

const ListTab = ({ client, product, amount, status, date, count, formArr }) => {
  const navigate = useNavigate();
  // console.log(formArr)
  return (
    <tr onClick={() => navigate("/pdf", { state: formArr })}>
      <td>{count + 1}</td>
      <td className="client">{client}</td>
      <td>{product}</td>
      <td className="amount">₦ {amount}</td>

      {/* <td>{amount}</td> */}
      <td className="date">{date}</td>
      <td className={status === "paid" ? `paid` : "unPaid"}>
        <p>{status}</p>
      </td>
    </tr>
  );
};

export default ListTab;
