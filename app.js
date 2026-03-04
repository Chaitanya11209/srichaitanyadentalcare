let patients=[]
let appointments=[]
let dental={}

function login(){

if(username.value=="admin" && password.value=="1234"){

loginPage.classList.add("hidden")
mainApp.classList.remove("hidden")

buildTeeth()

}else{

loginError.innerText="Invalid Login"

}

}

function logout(){
location.reload()
}

function showPage(p){

document.querySelectorAll(".content > div").forEach(d=>d.classList.add("hidden"))
document.getElementById(p+"Page").classList.remove("hidden")

}

function addPatient(){

patients.push({
name:patientName.value,
phone:patientPhone.value,
age:patientAge.value
})

renderPatients()
updateDropdowns()

}

function renderPatients(){

patientTable.innerHTML=""

patients.forEach((p,i)=>{

patientTable.innerHTML+=`

<tr>
<td>${p.name}</td>
<td>${p.phone}</td>
<td>${p.age}</td>

<td>
<button onclick="deletePatient(${i})">❌</button>
</td>

</tr>

`

})

totalPatients.innerText=patients.length

}

function deletePatient(i){

patients.splice(i,1)
renderPatients()

}

function updateDropdowns(){

appointmentPatient.innerHTML=""
dentalPatient.innerHTML=""

patients.forEach((p,i)=>{

appointmentPatient.innerHTML+=`<option value="${i}">${p.name}</option>`
dentalPatient.innerHTML+=`<option value="${i}">${p.name}</option>`

})

}

function addAppointment(){

let p=patients[appointmentPatient.value]

appointments.push({

patient:p.name,
phone:p.phone,
time:appointmentTime.value,
treatment:treatmentName.value,
amount:treatmentAmount.value

})

renderAppointments()
updateDashboard()

}

function renderAppointments(){

appointmentTable.innerHTML=""

appointments.forEach((a,i)=>{

appointmentTable.innerHTML+=`

<tr>

<td>${a.patient}</td>
<td>${new Date(a.time).toLocaleString()}</td>
<td>${a.treatment}</td>
<td>₹${a.amount}</td>

<td>
<button onclick="invoice(${i})">🧾</button>
</td>

<td>
<button onclick="wa('${a.phone}','${a.treatment}','${a.amount}')">📱</button>
</td>

</tr>

`

})

}

function invoice(i){

let a=appointments[i]

let w=window.open()

w.document.write(`

<h2>Sri Chaitanya Dental Care</h2>

<p>Patient: ${a.patient}</p>
<p>Treatment: ${a.treatment}</p>
<p>Amount: ₹${a.amount}</p>

<button onclick="window.print()">Print</button>

`)

}

function wa(phone,treat,amt){

let msg=`Dental Treatment: ${treat} Amount ₹${amt}`

window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`)

}

function updateDashboard(){

let today=new Date().toDateString()

let todays=appointments.filter(a=>new Date(a.time).toDateString()==today)

todayAppointments.innerText=todays.length

let revenue=0

todays.forEach(a=>revenue+=Number(a.amount))

todayRevenue.innerText="₹"+revenue

}

function buildTeeth(){

let teeth=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]

teeth.forEach(t=>{

teethGrid.innerHTML+=`
<button onclick="treat(${t})">${t}</button>
`

})

}

function treat(t){

let p=dentalPatient.value

if(!dental[p])dental[p]={}

dental[p][t]=toothType.value

}