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

var patientIndex = 0;


function setUpPath(ptID, pathology){

    ptIndex = ptID-1;
 console.log("ptExampleID is" + patients.patientsList[ptIndex].id);
    patients.patientsList[ptIndex].path = pathology;

    return patients;
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



