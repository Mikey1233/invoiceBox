import React from "react";
import "./listTab.css";

const ListTab = ({ client, product, amount, status, date,count }) => {
  return (
    <tr>
      <td>{count +1}</td>
      <td className="client">{client}</td>
      <td>{product}</td>
      <td className="amount">₦ {amount}</td>

      {/* <td>{amount}</td> */}
      <td className="date">{date}</td>
      <td className={status === 'paid'?`paid`:'unPaid'}><p>{status}</p></td>
    </tr>
  );
};

export default ListTab;
