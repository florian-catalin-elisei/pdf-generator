import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "receiptId") {
      setReceiptId(value);
    } else if (name === "price1") {
      setPrice1(value);
    } else {
      setPrice2(value);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/create-pdf", { name, receiptId, price1, price2 });

      const response = await axios.get("/get-pdf", {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      saveAs(blob, "receipt.pdf");
    } catch (error) {
      throw new Error(`Error generating the PDF: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <h3 className="App-heading">Generate PDF</h3>

        <div className="App-input-container">
          <input
            className="App-input"
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className="App-input-container">
          <input
            className="App-input"
            type="number"
            name="receiptId"
            placeholder="Receipt ID"
            onChange={handleChange}
            required
          />
        </div>

        <div className="App-input-container">
          <input
            className="App-input"
            type="number"
            name="price1"
            placeholder="Price 1"
            onChange={handleChange}
            required
          />
        </div>

        <div className="App-input-container">
          <input
            className="App-input"
            type="number"
            name="price2"
            placeholder="Price 2"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="App-button" onClick={handleClick}>
          Download PDF
        </button>
      </form>
    </div>
  );
};

export default App;
