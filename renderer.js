let patients=JSON.parse(localStorage.getItem("patients"))||[]
let appointments=JSON.parse(localStorage.getItem("appointments"))||[]
let dental=JSON.parse(localStorage.getItem("dental"))||{}

function showPage(p){

document.querySelectorAll(".content > div").forEach(d=>d.classList.add("hidden"))
document.getElementById(p+"Page").classList.remove("hidden")

updateDashboard()

}

function save(){

localStorage.setItem("patients",JSON.stringify(patients))
localStorage.setItem("appointments",JSON.stringify(appointments))
localStorage.setItem("dental",JSON.stringify(dental))

}

function addPatient(){

let name=patientName.value
let phone=patientPhone.value
let age=patientAge.value

if(!name)return

patients.push({name,phone,age})

save()

renderPatients()
updateDropdowns()

patientName.value=""
patientPhone.value=""
patientAge.value=""

}

function renderPatients(){

let t=patientTable
t.innerHTML=""

patients.forEach((p,i)=>{

t.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>${p.phone}</td>
<td>${p.age}</td>
<td><button onclick="deletePatient(${i})">❌</button></td>
</tr>
`

})

totalPatients.innerText=patients.length

}

function deletePatient(i){

patients.splice(i,1)

save()

renderPatients()
updateDropdowns()

}

function searchPatients(){

let q=searchPatient.value.toLowerCase()

document.querySelectorAll("#patientTable tr").forEach(r=>{

r.style.display=r.innerText.toLowerCase().includes(q)?"":"none"

})

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

let i=appointmentPatient.value

let time=appointmentTime.value
let treatment=treatmentName.value
let amount=treatmentAmount.value

appointments.push({

patient:patients[i].name,
phone:patients[i].phone,
time,
treatment,
amount

})

save()

renderAppointments()

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

<td><button onclick="invoice(${i})">🧾</button></td>

<td>
<button onclick="wa('${a.phone}','${a.treatment}','${a.amount}')">📱</button>
</td>

<td>
<button onclick="deleteAppointment(${i})">❌</button>
</td>

</tr>

`

})

}

function deleteAppointment(i){

appointments.splice(i,1)

save()

renderAppointments()

}

function invoice(i){

let a=appointments[i]

let w=window.open()

w.document.write(`
<h2>Sri Chaitanya Dental Care</h2>

<p>Patient: ${a.patient}</p>
<p>Treatment: ${a.treatment}</p>
<p>Amount: ₹${a.amount}</p>
<p>Date: ${new Date(a.time).toLocaleString()}</p>

<button onclick="window.print()">Print</button>
`)

}

function wa(phone,treatment,amount){

let msg=`Dental Treatment: ${treatment} Amount ₹${amount}`

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

function generateReport(){

let today=new Date().toDateString()

let todays=appointments.filter(a=>new Date(a.time).toDateString()==today)

let total=0

todays.forEach(a=>total+=Number(a.amount))

reportBox.innerHTML=`

<h3>Today's Report</h3>

<p>Total Appointments: ${todays.length}</p>
<p>Total Revenue: ₹${total}</p>

`

}

function treat(t){

let p=dentalPatient.value
let type=toothTreatment.value

if(!dental[p])dental[p]={}

dental[p][t]=type

save()

document.getElementById("tooth"+t).className=type

}

function buildTeeth(){

let teeth=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]

teeth.forEach(t=>{

teethGrid.innerHTML+=`
<button id="tooth${t}" onclick="treat(${t})">${t}</button>
`

})

}

buildTeeth()
renderPatients()
updateDropdowns()
renderAppointments()
updateDashboard()