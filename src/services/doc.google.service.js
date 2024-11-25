import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export class DocGoogleService {
  serviceAccountAuth;
  doc;

  constructor(sheetId) {
    this.serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.doc = new GoogleSpreadsheet(sheetId, this.serviceAccountAuth);
  }

  async saveDataToNewSheet(headerValues, data) {
    try {
      console.log("Data is saving...");

      const sheet = await this.doc.addSheet({ headerValues });
      const res = await sheet.addRows(data);

      return res;
    } catch (error) {
      return null;
    }
  }
}
