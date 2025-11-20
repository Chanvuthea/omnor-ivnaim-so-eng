"use client";
import React, { useEffect, useState } from "react";
import PremiumScreen from "../screens/premiumScreen";
import CreateLinkScreen from "@/screens/createLinkScreen";
import { dataCouple } from "@/assets/data";

//Prod

const IMAGE_URL = "";

const App: React.FC = () => {
  const [coupleID, setCoupleID] = useState("");
  const [splitURL, setSplitURL] = useState<string[]>([]);
  useEffect(() => {
    const splitURL = window.location.href.split("?");
    const coupleID = splitURL[splitURL.length - 1];
    setCoupleID(coupleID);
    setSplitURL(splitURL);
    // Your logic here
  }, []);

  const [coupleData, setCoupleData] = useState<any>();

  useEffect(() => {
    coupleID !== "create" && setCoupleData(dataCouple);
  }, [coupleID]);
  const checkType = () => {
    switch (coupleData?.list_family_name?.type) {
      case "premium":
        return <PremiumScreen coupleData={coupleData} IMAGE_URL={IMAGE_URL} />;

      default:
        return (
          <div>
            <p>Loding....</p>
          </div>
        );
    }
  };
  return coupleID === "create" ? (
    <CreateLinkScreen URL={splitURL[0]} />
  ) : (
    checkType()
  );
};

export default App;
