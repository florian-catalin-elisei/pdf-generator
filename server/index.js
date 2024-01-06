const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const document = require("./document");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/create-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    await page.setContent(document(req.body));

    await page.pdf({
      path: "receipt.pdf",
      format: "A4",
    });

    await browser.close();

    res.status(200).send("PDF Generated");
  } catch (error) {
    throw new Error(`Error generating the PDF: ${error.message}`);
  }
});

app.get("/get-pdf", (req, res) => {
  res.sendFile(`${__dirname}/receipt.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
