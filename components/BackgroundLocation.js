import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function BackgroundLocation() {
  const [errorMsgBkg, setErrorMsgBkg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access foreground location was denied");
        return;
      }
      
      let { status_b } = await Location.requestBackgroundPermissionsAsync();
      if (status_b !== "granted") {
        setErrorMsgBkg(
          "Permission to access background location was denied - .js"
        );
        console.log(`Something went wrong: ${errorMsgBkg}`);
        return;
      }
      console.log("Permission granted to access background location!");
    })();
  }, []);
}
