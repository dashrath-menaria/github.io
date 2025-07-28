"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import style from "./page.module.css";
type Row = {
  shares: string;
  price: string;
};

export default function Home() {
  const [rows, setRows] = useState<Row[]>([{ shares: "", price: "" }]);
  const [totalShare, setTotalShare] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
 const [averagePrice,setAveragePrice] = useState("");
  const handleInputChange = (
    index: number,
    field: keyof Row,
    value: string
  ) => {
    const updatedRows = [...rows];
     const numericValue = value.replace(/[^0-9.]/g, ""); 
    updatedRows[index][field] = numericValue;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { shares: "", price: "" }]);
  };

  const deleteRow = (index: number) => {
    console.log(index);

    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const getOrdinalWord = (n: number) => {
    n = n+1;
    const ordinals = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
    ];
    return ordinals[n - 1] || `${n}th`;
  };

  const calculateAverage = () => {
    let totalCost = 0;
    let totalShares = 0;

    rows.forEach((row) => {
      const shares = parseFloat(row.shares);
      const price = parseFloat(row.price);

      if (!isNaN(shares) && !isNaN(price)) {
        totalCost += shares * price;
        totalShares += shares;
      }
    });
    if (totalShares === 0) setAveragePrice("0");
    setAveragePrice((totalCost / totalShares).toFixed(2));
    setTotalShare(totalShares);
    setTotalCost(totalCost);
  };

  return (
    <div className="container mt-4">
      <h1>Stock Average Calculator</h1>
      <p>Calculate your average price across multiple share purchases</p>
      <hr />

      {rows.map((row, index) => (
        <div className="row mb-3 align-items-end" key={index}>
          <h5>{getOrdinalWord(index)} Purchase</h5>
          <div className="col-md-5">
            <label className="form-label"> Shares</label>
            <input
              type="number"
              placeholder="Number of Shares"
              className="form-control"
              value={row.shares}
              onChange={(e) =>
                handleInputChange(index, "shares", e.target.value)
              }
            />
          </div>
          <div className="col-md-5">
            <label className="form-label"> Price</label>
            <input
              type="number"
              placeholder="Buy Price (₹)"
              className="form-control"
              value={row.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              onClick={() => deleteRow(index)}
              disabled={rows.length === 1}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {totalShare && totalCost ? (
        <div className={style.resultDiv}>
          <div className={style.result}>Average Price: {averagePrice}</div>
          <div className={style.result}>Total Shares: {totalShare}</div>
          <div className={style.result}>Total Price: {totalCost}</div>
        </div>
      ) : (
        ""
      )}
      <hr></hr>
      <div style={{ marginTop: "15px" }}>
        <button className={`btn ${style.btncustom}`} onClick={calculateAverage}>
          Calculate
        </button>
        <button className="btn btn-primary" onClick={addRow}>
          Add Row
        </button>
      </div>
    </div>
  );
}
