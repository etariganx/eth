"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const handleSearch = () => {
    if (!search) return;
    setSelectedCoin(search.toUpperCase());
  };

  const handleUpdate = () => {
    const now = new Date();

    const formatted = `${selectedCoin}-${now
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-")}-${now
      .toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(":", "-")}`;

    setAnalysis({
      title: formatted,
      technical: "Trend bullish minor. Price above MA10 & MA30.",
      fundamental: "No major macro event. Market relatively stable.",
      conclusion: "Bias long during pullback.",
      entry: "Entry near support zone",
      sl: "SL -2%",
      tp: "TP +4%",
    });
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "40px" }}>
      <h1 style={{ textAlign: "center" }}>
        Daily Update Trading Journal
      </h1>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          placeholder="Search Coin"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Search
        </button>
      </div>

      {selectedCoin && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2>{selectedCoin} Chart (15M)</h2>

          <iframe
            src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE:${selectedCoin}USDT&interval=15`}
            width="100%"
            height="500"
          ></iframe>

          <button
            onClick={handleUpdate}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            Update Info 1 Jam Kedepan
          </button>
        </div>
      )}

      {analysis && (
        <div style={{ marginTop: "30px" }}>
          <h3>{analysis.title}</h3>
          <p><strong>Technical:</strong> {analysis.technical}</p>
          <p><strong>Fundamental:</strong> {analysis.fundamental}</p>
          <p><strong>Conclusion:</strong> {analysis.conclusion}</p>
          <p>{analysis.entry}</p>
          <p>{analysis.sl}</p>
          <p>{analysis.tp}</p>
        </div>
      )}
    </div>
  );
}
