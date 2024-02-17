import { useState } from "react";
import { Form } from "./components/Form/Form.jsx";
import { saveAs } from "file-saver";
import axios from "axios";
import "./App.css";

export const App = () => {
  const [name, setName] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "receiptId":
        setReceiptId(value);
        break;
      case "price1":
        setPrice1(value);
        break;
      case "price2":
        setPrice2(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    await axios.post("/create-pdf", { name, receiptId, price1, price2 });

    const { data } = await axios.get("/get-pdf", { responseType: "blob" });
    const blob = new Blob([data], { type: "application/pdf" });

    saveAs(blob, "receipt.pdf");
  };

  return <Form handleChange={handleChange} handleClick={handleClick} />;
};
