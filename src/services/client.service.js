import axios from "axios";

export class ClientService {
  static async getClients(token) {
    try {
      console.log("Getting clients from API...");

      const { data } = await axios.get(`${process.env.API_URL}/clients`, {
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (error) {
      return null;
    }
  }
}
