const {contextBridge,ipcRenderer}=require("electron");

contextBridge.exposeInMainWorld("api",{

addPatient:(d)=>ipcRenderer.invoke("addPatient",d),
getPatients:()=>ipcRenderer.invoke("getPatients"),
deletePatient:(id)=>ipcRenderer.invoke("deletePatient",id),

addAppointment:(d)=>ipcRenderer.invoke("addAppointment",d),
getAppointments:()=>ipcRenderer.invoke("getAppointments"),
deleteAppointment:(id)=>ipcRenderer.invoke("deleteAppointment",id),

saveTooth:(d)=>ipcRenderer.invoke("saveTooth",d),

generateInvoice:(d)=>ipcRenderer.invoke("generateInvoice",d)

});