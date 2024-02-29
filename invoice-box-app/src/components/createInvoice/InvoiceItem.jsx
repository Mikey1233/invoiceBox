import React from "react";

const InvoiceItem = ({items,setItems}) => {
 

  const handleAddNewItem = () => {
    setItems([
      ...items,
      { description: "", amount: 0, quantity: 0, productName: "" },
    ]);
    // console.log(items);/
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
 

  return (
    <div>
      {/* <form> */}
        {items.map((item, index) => (
          <div
            key={index}
            className="des_list"
            style={{ position: "relative" }}
          >
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Description"
            />
            <input
              type="text"
              name="productName"
              value={item.productName}
              onChange={(e) => handleChange(index, e)}
              placeholder="Product Name"
            />
            <input
              type="number"
              name="quantity"
                value={item.quantity}
              onChange={(e) => handleChange(index, e)}
              placeholder="Quantity"
            />
            <input
              type="number"
              name="amount"
                value={item.amount}
              onChange={(e) => handleChange(index, e)}
              placeholder="amount per product"
            />
            <i
              onClick={() => handleRemoveItem(index)}
              style={{ cursor: "pointer", position: "absolute",right:'5px',top:'5px',zIndex:'100'}}
              className="bi bi-x-circle-fill"
            ></i>
          </div>
        ))}
      {/* </form> */}
      <button type="menu" onClick={handleAddNewItem}><i class="bi bi-plus-circle-fill" style={{marginRight:'3px'}}></i>Add New Item</button>
    </div>
  );
};

export default InvoiceItem;
