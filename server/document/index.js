const document = ({ name, receiptId, price1, price2 }) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const totalPrice = parseInt(price1) + parseInt(price2);

  return `
    <!DOCTYPE html>

    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>PDF Document</title>

        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

          .Container {
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            color: #555;
            font-family: "Poppins", sans-serif;
            font-size: 15px;
            margin: auto;
            max-width: 800px;
            padding: 30px;
          }

          table {
            border-collapse: collapse;
            margin-top: 20px;
            width: 100%;
          }

          th, td {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }

          .Container-image {
            max-width: 156px;
            width: 100%;
          }

          .Container-heading {
            padding-top: 20px;
          }

          .Container-align-center {
            text-align: center;
          }

          .Container-align-right {
            text-align: right;
          }

          .Container-total-price {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
          }

          @media only screen and (max-width: 992px) {
            .Container {
              max-width: 500px;
            }
          }
        </style>
      </head>

      <body>
        <div class="Container">
          <table>
            <tr>
              <td>
                <img
                  class="Container-image"
                  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
                  alt="Receipt"
                />
              </td>

              <td class="Container-align-right">Date: ${`${day}.${month}.${year}`}</td>
            </tr>

            <tr>
              <td colspan="2">Customer name: ${name}</td>
            </tr>

            <tr>
              <td colspan="2">Receipt ID: ${receiptId}</td>
            </tr>
          </table>

          <h2 class="Container-heading Container-align-center">Bought items</h2>

          <table>
            <tr>
              <th>Item</th>
              <th class="Container-align-right">Price</th>
            </tr>

            <tr>
              <td>First item:</td>
              <td class="Container-align-right">$${price1}</td>
            </tr>

            <tr>
              <td>Second item:</td>
              <td class="Container-align-right">$${price2}</td>
            </tr>

            <tr class="Container-total-price">
              <td>Total price:</td>
              <td class="Container-align-right">$${totalPrice}</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
};

module.exports = document;
