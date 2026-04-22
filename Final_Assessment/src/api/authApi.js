import axios from "axios";
import { encryptRequest, decryptResponse } from "../utils/encryption";

/* Geo helper */
function getBase64Geo() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const geo = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        resolve(btoa(JSON.stringify(geo)));
      },
      () => {
        resolve(btoa(JSON.stringify({ lat: "0", lng: "0" })));
      }
    );
  });
}

export async function loginUser({ username, password }) {
  try {
    const payload = {
      grant_type: "password",
      username,
      password,
    };

    // Encrypt request
    const encryptedData = encryptRequest(payload);

    console.log("Encrypted Request:", encryptedData);

    const geo = await getBase64Geo();

    const response = await axios.post(
      "https://services-encr.iserveu.online/dev/nsdlab-internal/user-authorization/user/login",
      {
        RequestData: encryptedData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic bnNkbGFiLWludGVybmFsLWNsaWVudDpuc2RsYWItaW50ZXJuYWwtcGFzc3dvcmQ=",
          "Geo-Location": geo,
        },
      }
    );

    console.log("Raw API Response:", response.data);

    // Decrypt response
    const decrypted = decryptResponse(response.data?.ResponseData);

    console.log("Decrypted Response:", decrypted);

    return decrypted;

  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    return null;
  }
}