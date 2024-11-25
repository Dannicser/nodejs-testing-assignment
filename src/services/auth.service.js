import axios from "axios";

export class AuthService {
  static async getToken(username) {
    try {
      let token;

      token = await AuthService.getLogin(username);

      if (token) {
        return token;
      }

      token = await AuthService.getRegistration(username);

      if (token) {
        return token;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  static async getRegistration(username) {
    try {
      const { data } = await axios.post(`${process.env.API_URL}/auth/registration`, { username });

      return data.token;
    } catch (error) {
      return null;
    }
  }

  static async getLogin(username) {
    try {
      const { data } = await axios.post(`${process.env.API_URL}/auth/login`, { username });

      return data.token;
    } catch (error) {
      return null;
    }
  }
}
