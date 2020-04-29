//using storeJS that has been imported in index.html script

let user2 = {
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
};

store.set('user_2', user2) 
store.set('userBlk', { name:'DawsonBlank' })


console.log("Storage from store1.js file - looping thru" );


store.each(function(value, key) {
	console.log(key, '==', value)
})

console.log("or directly eg " + store.get('user_2').address.city);