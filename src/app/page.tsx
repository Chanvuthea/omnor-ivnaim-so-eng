"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import PremiumScreen from "../screens/premiumScreen";
import CreateLinkScreen from "@/screens/createLinkScreen";

//Prod
const URL = "https://authentic-dream-ffddac2f07.strapiapp.com";
const IMAGE_URL = "";
const token =
  "d2be169e601b94e8ddebf51813a30da113e429c06a878a38bf078d5d570351d851da8f71aebe71d1d805f05e22bdc9f3e71a7094b9f30cb2d8a2753e85387155e67d4ea16a1b753dc3720d3f8e4833e1c4427e33211ee9c912d0b8581b602eeca2fbc2751bf472eb6150d019c201365ed4768f3808d18c8435499f44b6ba516e";

//dev
// const URL = "http://localhost:1338";
// const IMAGE_URL = "http://localhost:1338";
// const token =
//   "52b341e50262d91c67841881f3ce32b92f49063102e6b7d15185999d032728887562c2bb72a0dfaf3fa7f5147edcfe44230cc6529e90414e43e39e17a93eea90a931e39685c0aa1fa9b9aa4ab34a071a589b0c34004afbba96a2fc55523e31fee7bde5e7859ca4f2db268238ffc13aa06a9e1899227c144503cc81e44be43802";

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
  const [_, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAgendaData = async () => {
      const baseEndpoint = `${URL}/api/couples?filters[couple_id][$eq]=${coupleID}`;
      const populateFields = [
        "background",
        "floral_button_background",
        "fong_logo",
        "photo_booth",
        "background_sound",
      ];

      let populateQuery = populateFields
        .map((field) => `populate[${field}][fields]=url`)
        .join("&");
      const endpoint = `${baseEndpoint}&${populateQuery}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCoupleData(response?.data?.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    coupleID !== "create" && fetchAgendaData();
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
