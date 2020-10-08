import { generate as id } from 'shortid'
export class LocalStorageRepository{
    /**
     * @param  {string} collectionKey
     */
    constructor(collectionKey) {
       this.collectionKey = collectionKey;
       this.items = localStorage.getItem(this.collectionKey) ? JSON.parse(localStorage.getItem(this.collectionKey)) : [];
    }

    Refresh(){
        this.items = localStorage.getItem(this.collectionKey) ? JSON.parse(localStorage.getItem(this.collectionKey)) : [];
        return this.items;
    }

    ClearAll(){
        localStorage.removeItem(this.collectionKey);
        this.items =[];
        return this.items;
    }

    GetAll(){
        return this.items;
    }

    GetItemsBy(predicate){
        return this.items.filter(predicate);
    }
    
    SaveAll(){
        localStorage.setItem(this.collectionKey , JSON.stringify(this.items)) ;
        return this.items;
    }

    Add(item){
        item.Id = id();
        this.items.push(item);
        return this.SaveAll();
    }

    Update(item){
        var itemToUpdate = this.items.filter((x) => x.Id === item.Id);
        itemToUpdate = item;
        return this.SaveAll();
    }

    Delete(item){
        let index = this.items.indexOf(item);
        this.items.splice(index , 1);
        return this.SaveAll();
    }
}