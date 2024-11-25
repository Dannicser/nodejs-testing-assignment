import dotenv from "dotenv";

import { AuthService } from "./services/auth.service.js";
import { ClientService } from "./services/client.service.js";
import { DocGoogleService } from "./services/doc.google.service.js";

async function init() {
  try {
    dotenv.config();

    const token = await AuthService.getToken(process.env.USER_NAME);

    if (!token) {
      throw Error("auth failed");
    }

    const clients = await ClientService.getClients(token);
    const doc = new DocGoogleService(process.env.GOODLE_SHEET_ID);
    await doc.saveDataToNewSheet(["id", "firstName", "lastName", "gender", "address", "city", "phone", "email", "status"], clients);

    console.log("Data has been saved successfully!");
  } catch (error) {
    console.log(error);
  }
}

init();
