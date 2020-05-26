console.log("Welcome into indexing");

function randomer(){
    return  Math.random().toString(36).substring(2, 15);
     // + Math.random().toString(36).substring(2, 15);
   }
   

var patients = {
        patientsList:[]
    }


var medicines = {
        medsList:[]
    }

var index = [];

var ptIndexes = {
    by_id: [],
    by_email : [],
    by_name : []
}

let pt4 = 
{
"name": "Johnny Johnson" ,
"email" : "jj@mac.com",
"age": 46,
"sex": "male",
"city": "Durham",
"country": "UK"
}


let pt5 = 
{
"name": "Jill Brown" ,
"email" : "jb@BB.com",
"age": 26,
"sex": "female",
"city": "LoughtonDurham",
"country": "UK"
}


let pt6 = 
{
"name": "Bill Bornum" ,
"email" : "bb@gmail.com",
"age": 86,
"sex": "male",
"city": "ChesterLeDurham",
"country": "UK"
}


function setUpPatient(id){
    let pt =  {};
    pt.id = id;
    pt.name = "patientN"+ id;
    pt.age = 40 + id;
    pt.city = "Dublin" + id;
    pt.ListOfMeds = [];

    indexHash= randomer() ;
    index.push(indexHash);
    patients.patientsList.push(pt);

    

    return pt;
}


function setUpPatient2(id, ptObj){
    let pt =  {};
    pt.id = id;
    pt.name = ptObj.name;
    pt.email= ptObj.email;
    pt.age = ptObj.age;
    pt.city = ptObj.city;
    pt.ListOfMeds = [];

    indexHash= randomer() ;
    index.push(indexHash);
    patients.patientsList.push(pt);

    let emailIndex = {
        "email": pt.email,
        "id": pt.id
    }

    let nameIndex = {
        "name": pt.name,
        "id": pt.id
    }

   let idIndex = {
       "id": pt.id,
       "pt": pt
   }

    ptIndexes.by_email.push(emailIndex);
    ptIndexes.by_name.push(nameIndex);
    ptIndexes.by_id.push(idIndex);

    return pt;
}


function setUpMed(ptID){

    let med = {};
    med.id = randomer();
    med.name = "Pencillin#"
    med.dose = 500;
    med.batch = "Batch #ABC" ;
    med.ptID = ptID;
    med.linkage = "Link:" + "Med#:" + med.id + "Pt#:" + ptID;
    patients.patientsList[ptID].ListOfMeds.push(med.id);
    medicines.medsList.push(med);

    return med;
}

function getMedication(medId) {
console.log("need to get this med:" + medId)
medicines.medsList.forEach(function(med) {
if (med.id === medId){
    console.log("which is this medication");
    console.log(med);
}
})
}


function listMed(ptID){
    patients.patientsList.forEach(function(patient) {
if (patient.id === ptID)  {
    console.log("For this patient: " + patient.id + " aka " + patient.name)
    patient.ListOfMeds.forEach(function(medID)
    {getMedication(medID);}
    )
}
  })
};

//if (patientIndex = 0){
//    setUpPatient(id);
//}
//forEach
console.log("Here we set stuff up");
setUpPatient(1);
setUpPatient(2);
setUpPatient(3);
//console.log(setUpPatient(1));
//console.log(setUpPatient(2));
//console.log(setUpPatient(3));

setUpMed(0);
setUpMed(1);
setUpMed(1);
setUpMed(2);
//setUpMed(2);
//setUpMed(3);
//console.log(setUpMed(1));
//console.log(setUpMed(2));

//console.log(patients);
console.log("Here we list that stuff");
console.log(patients);
console.log(medicines);
//console.log(index);

console.log("Here we explain some interlink");
patients.patientsList.forEach(function(patient){
    console.log("Pt Listing ==========");
    console.log("Pt id is " + patient.id);
    console.log("Pt name is " + patient.name);
    if (patient.ListOfMeds) {
        patient.ListOfMeds.forEach(function(link){
            console.log("medsID is:" + link);
        } 
            )
    }

});

//setUpPath(2, "Hypertension");

listMed(2);


function randomer(){
 return  Math.random().toString(36).substring(2, 15);
  // + Math.random().toString(36).substring(2, 15);
}

console.log(randomer());

console.log(setUpPatient2(4,pt4));
console.log(setUpPatient2(5,pt5));
console.log(setUpPatient2(6,pt6));
setUpMed(3);
setUpMed(4);
setUpMed(4);
setUpMed(5);

console.log(patients);
console.log(ptIndexes);


function listMedViaIndex(ptID){
    ptIndexes.by_id.forEach(function(patient) {
if (patient.id === ptID)  {
    console.log("For this patient: " + patient.id + " aka " + patient.pt.name)
    console.log(patient.pt);
    //now list their meds
    patient.pt.ListOfMeds.forEach(function(medID)
    {getMedication(medID);}
    )
}
  })
};

listMedViaIndex(5);