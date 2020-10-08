import axios from "axios";
import {UserRepository} from './userRepository';
export class APIRepository {
  Notes_url = "";
  NotesCollab_url = "";
  Users_url = "";

  /**
   * @param  {string} collectionKey
   */
  constructor(collectionKey) {
    this.collectionKey = collectionKey;
    
    this.base_url = document.getElementById("BaseUrl").value;

    this.Notes_url = this.base_url + `Notes`;
    this.NotesCollab_url = this.base_url + "NotesCollab";
    this.Users_url = this.base_url + "/Employee/GetActiveEmployeeList";

    console.log(this.Notes_url, this.NotesCollab_url, this.Users_url);
  }

  async Refresh() {
    this.populateUserValues();
    return await axios.get(
      this.Notes_url + `?CompanyId=${this.CompanyId}&UserId=${this.UserId}`
    );
  }

  populateUserValues(){
    if(this.UserId != null) return;
    const user  = new UserRepository().currentUser;
  
    if(user != null){
      this.CompanyId = user.CompanyId;
      this.UserId = user.EmpId;

    }
  }

  ClearAll() {}
  async GetAll() {
    this.populateUserValues();
    let { data } = await axios.get(
      this.Notes_url + `?CompanyId=${this.CompanyId}&UserId=${this.UserId}`
    );
    return data;
  }

  delay(time){
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  GetItemsBy(predicate) {}

  SaveAll() {}

  async Add(item) {
    let newItem = Object.assign({}, item, {
      CompanyId: this.CompanyId,
      UserId: this.UserId,
    });
    console.clear();

    await axios.post(this.Notes_url, newItem);

  let notes = await this.GetAll();
  let note = notes.find(note => note.titie === newItem.Title);
    return {
      notes,
      note 
    }
  }

  async Update(item) {
    await axios.put(this.Notes_url + `/${item.Id}`, item);
    return await this.GetAll();
  }

  async Delete(item) {
    await axios.delete(this.Notes_url + `/${item.Id}`);
    return await this.GetAll();
  }

  async FetchUsers() {
    this.populateUserValues();
    let { data } = await axios.get(
      this.Users_url + `?CompanyId=${this.CompanyId}`
    );
    return data;
  }

  /* Notes Collab Code Starts */
  async GetCollbs(noteId) {
    let { data } = await axios.get(this.NotesCollab_url + `/${noteId}`);
    return data;
  }

  async AddCollab(noteCollab) {
    await axios.post(this.NotesCollab_url, noteCollab);
    return true;
  }

  async RemoveCollab(collabId) {
    await axios.delete(this.NotesCollab_url + `/${collabId}`);
    return true;
  }

  /* Notes Collab Code Ends */
}
