import React from "react";
import FetchAPI from "./components/FetchAPI";
import FetchAPI2 from "./components/FetchAPI2/FetchAPI2";
import Listcompany from "./components/companylist/Listcompany";

export default function App() {
  const hello = "Hello World !";

  return (
    <div>
      <FetchAPI name="SENSEX" check={hello} symbol="BSE" />{" "}
      <FetchAPI2 name="NIFTY" symbol="NSE" />
      <Listcompany />
    </div>
  );
}
