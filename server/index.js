import * as url from "url";
import { document } from "./document/document.js";
import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PDF Generator Server");
});

app.post("/create-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setContent(document(req.body));
    await page.pdf({ path: "receipt.pdf", format: "A4" });
    await browser.close();

    res.status(200).send("PDF Generated");
  } catch (error) {
    res.status(500).send(`Failed to create the PDF: ${error.message}`);
  }
});

app.get("/get-pdf", (req, res) => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  res.sendFile(`${__dirname}/receipt.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
