// collisions

class HashMap_sc {
  constructor(initialCapacity = 10) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
  

    if(this._slots[index] === undefined) {
      throw new Error('Key Error');
    }
    const keyExists = this._slots[index].find(item => item.key === key);

    if(keyExists) {
      return keyExists.value;
    } else {
      throw new Error('Key Error');
    }

  }

  set(key, value) {
    const loadRatio = (this.length + this.deleted + 1) / this._capacity;
    if (loadRatio > HashMap_sc.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      this._slots[index] = [{ key, value }];
      this.length++;
    } else {
      const keyExists = this._slots[index].find(item => item.key === key);

      if (keyExists) {
        keyExists.value = value;
      } else {
        this._slots[index].push({ key, value });
        this.length++;
      }
    }
  }

  _findSlot(key) {
    // console.log('FINDSLOT => ' + key);
    const hash = HashMap_sc._hashString(key);
    return hash % this._capacity;
    
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    // console.log('HASHSTRING => ' + string);
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap_sc.MAX_LOAD_RATIO = 0.9;
HashMap_sc.SIZE_RATIO = 3;

module.exports = HashMap_sc;
