import axios from "axios";

export  class UserRepository {
  Users_url = "";
  currentUser = null;


  constructor() {
    this.base_url = document.getElementById("BaseUrl").value;
    this.Users_url = this.base_url + "/Employee/";


    //Singleton
    
    if (!!UserRepository.instance) {
      return UserRepository.instance;
    }
    
    UserRepository.instance = this;
    return this;
    
  }

  async login(username, password) {
    var response = await axios.post(this.Users_url + `Login?username=${username}&password=${password}`);
    this.currentUser = response.data;
    return this.currentUser;
  }

  async logout() {
    this.currentUser = null;
  }
}
