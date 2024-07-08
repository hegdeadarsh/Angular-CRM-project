import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppGlobals } from 'src/app/AppGlobals';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  getTemplatesByDocumentType: any;
  
  constructor(private http: HttpClient, private globalUrl: AppGlobals) {}
  // Role master
  getRole() {
    return this.http.get(this.globalUrl.weburl + 'role/GetAllRoles');
  }
  saveRole(data: any) {
    return this.http.post(this.globalUrl.weburl + 'role/PostSaveRole', data);
  }

  updateRole(data: any) {
    return this.http.post(this.globalUrl.weburl + 'role/PostSaveUpdateRole', data);
  }
  deleteRole(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'role/DeleteRoleData/' + roleid
    );
  }
  // Country master
  getCountry() {
    return this.http.get(this.globalUrl.weburl + 'Country/GetAllCountry');
  }
  saveCountry(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Country/PostSaveCountry',
      data
    );
  }
  deleteCountry(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Country/DeleteCountryData/' + roleid
    );
  }
  // Cluster master
  getCluster() {
    return this.http.get(this.globalUrl.weburl + 'Cluster/GetAllCluster');
  }
  saveCluster(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Cluster/PostSaveCluster',
      data
    );
  }


  saveFollowup(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'FollowUp/PostSaveFollowup',
      data
    );
  }

  updateCluster(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Cluster/PostSaveUpdateCluster',
      data
    );
  }
  deleteCluster(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Cluster/DeleteClusterData/' + roleid
    );
  }
  // Region master
  getRegion() {
    return this.http.get(this.globalUrl.weburl + 'Region/GetAllRegion');
  }
  saveRegion(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Region/PostSaveRegion',
      data
    );
  }
  updateRegion(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Region/PostSaveUpdateRegion',
      data
    );
  }
  deleteRegion(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Region/DeleteRegionData/' + roleid
    );
  }

   // Faults master
   getFaults() {
    return this.http.get(this.globalUrl.weburl + 'Faults/GetAllFaults');
  }
  saveFaults(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Faults/PostSaveFaults',
      data
    );
  }
  updateFaults(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Faults/PostSaveUpdateFaults',
      data
    );
  }
  deleteFaults(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Faults/DeleteFaultsData/' + roleid
    );
  }

  //Template Master

  getTemplates(){
    return this.http.get(this.globalUrl.weburl + 'Template/GetAllTemplate');
  }

  saveTemplates(data: any) {
    return this.http.post(this.globalUrl.weburl + 'Template/PostSaveTemplate', data );
  }

  updateTemplate(data: any) {
    return this.http.post(this.globalUrl.weburl + 'Template/PostSaveUpdateTemplate',data );
  }

  deleteTemplates(roleid: any) {
    return this.http.get( this.globalUrl.weburl + 'Template/DeleteTemplateData/' + roleid );
  }

//Brochure Master

getBrochure(){
  return this.http.get(this.globalUrl.weburl + 'Brochure/GetAllBrouchure');
}
saveBrochure(data: any) {
  return this.http.post(this.globalUrl.weburl + 'Brochure/PostSaveBrouchure', data );
}

updateBrochure(data: any) {
  return this.http.post(this.globalUrl.weburl + 'Brochure/PostSaveUpdateBrouchure',data );
}

 deleteBrochure(roleid: any) {
  return this.http.get( this.globalUrl.weburl + 'Brochure/DeleteBrouchureData/' + roleid );
}


//Mail Template Master

getMail(){
  return this.http.get(this.globalUrl.weburl + 'Mailtemplate/GetAllMail');
}
saveMail(data: any) {
  return this.http.post(this.globalUrl.weburl + 'Mailtemplate/PostSaveMail', data );
}

updateMail(data: any) {
  return this.http.post(this.globalUrl.weburl + 'Mailtemplate/PostSaveUpdateMail',data );
}

deleteMail(roleid: any) {
  return this.http.get( this.globalUrl.weburl + 'Mailtemplate/DeleteMailData/' + roleid );
}


  // Consumables Master
  getConsumables() {
    return this.http.get(this.globalUrl.weburl + 'Consumables/GetAllConsumables');
  }
  saveConsumables(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Consumables/PostSaveConsumables',
      data
    );
  }
  updateConsumables(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Consumables/PostSaveUpdateConsumables',
      data
    );
  }
  deleteConsumables(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Consumables/DeleteConsumablesData/' + roleid
    );
  }

   // Zone master
   getZone() {
    return this.http.get(this.globalUrl.weburl + 'Zone/GetAllZone');
  }
  saveZone(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Zone/PostSaveZone',
      data
    );
  }
  updateZone(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Zone/PostSaveUpdateZone',
      data
    );
  }
  deleteZone(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Zone/DeleteZoneData/' + roleid
    );
  }
  // Route master
  getRoute() {
    return this.http.get(this.globalUrl.weburl + 'Route/GetAllRoute');
  }
  saveRoute(data: any) {
    return this.http.post(this.globalUrl.weburl + 'Route/PostSaveRoute', data);
  }
  updateRoute(data: any) {
    return this.http.post(this.globalUrl.weburl + 'Route/PostSaveUpdateRoute', data);
  }
  deleteRoute(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Route/DeleteRouteData/' + roleid
    );
  }
   // Sands master
   getSands() {
    return this.http.get(this.globalUrl.weburl + 'Sands/GetAllSands');
  }
  saveSands(data: any) {
    return this.http.post(this.globalUrl.weburl + 'Sands/PostSaveSands', data);
  }

  updateSands(data: any) {
    return this.http.post(this.globalUrl.weburl + 'Sands/PostSaveSandsUpdate', data);
  }

  deleteSands(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Sands/DeleteSandsData/' + roleid
    );
  }
   // Model master
   getModel() {
    return this.http.get(this.globalUrl.weburl + 'Model/GetAllModel');
  }
  saveModel(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Model/PostSaveModel',
      data
    );
  }
  updateModel(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Model/PostSaveUpdateModel',
      data
    );
  }
  deleteModel(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Model/DeleteModelData/' + roleid
    );
  }
  // Features master
  getFeatures() {
    return this.http.get(this.globalUrl.weburl + 'Features/GetAllFeatures');
  }
  saveFeatures(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Features/PostSaveFeatures',
      data
    );
  }

  updateFeatures(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Features/PostSaveUpdateFeatures',
      data
    );
  }
  deleteFeatures(featuresid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Features/DeleteFeaturesData/' + featuresid
    );
  }
  // InvoicePerticular master
  getInvoicePerticular() {
    return this.http.get(this.globalUrl.weburl + 'InvoicePerticular/GetAllInvoicePerticular');
  }
  saveInvoicePerticular(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'InvoicePerticular/PostSaveInvoicePerticular',
      data
    );
  }

  updateInvoicePerticular(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'InvoicePerticular/PostSaveInvoiceUpdatePerticular',
      data
    );
  }
  deleteInvoicePerticular(invoiceperticularid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'InvoicePerticular/DeleteInvoicePerticularData/' + invoiceperticularid
    );
  }
  // Requests master
  getRequests() {
    return this.http.get(this.globalUrl.weburl + 'Requests/GetAllRequests');
  }
  getPriority(){
    return this.http.get(this.globalUrl.weburl + 'Requests/GetAllPriorities');
  }
  saveRequests(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Requests/PostSaveRequests',
      data
    );
  }


  updateRequests(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'Requests/PostUpdateRequest',
      data
    );
  }
  updatePriority(data: any){
    return this.http.post(this.globalUrl.weburl  + "Requests/PostUpdateRequestPriority" , data);
  }
  deleteRequests(Requestsid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'Requests/DeleteRequests/' + Requestsid
    );
  }

  // Purpose Job Time Master
  savePurposeJobTime(data: any) {
    return this.http.post(this.globalUrl.weburl + 'PurposeEstJobTime/PostSavePurposeEstJobTime', data);
  }
  getAllPurposeJobTime(){
    return this.http.get(this.globalUrl.weburl + 'PurposeEstJobTime/GetAllPurposeJobTime');
  }
  updatePurpose(data:any){
    return this.http.post( this.globalUrl.weburl + 'PurposeEstJobTime/PostUpdatePurpose',data);
  }
  deletePurpose(id: any) {
    return this.http.get(this.globalUrl.weburl + 'PurposeEstJobTime/DeletePurposeJobTime/' + id);
  }
  
  // AttendType master
  getAttendType() {
    return this.http.get(this.globalUrl.weburl + 'AttendType/GetAllAttendType');
  }
  saveAttendType(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'AttendType/PostSaveAttendType',
      data
    );
  }

  updateAttendType(data: any) {
    return this.http.post(
      this.globalUrl.weburl + 'AttendType/PostSaveAttendTypeUpdate',
      data
    );
  }

  deleteAttendType(roleid: any) {
    return this.http.get(
      this.globalUrl.weburl + 'AttendType/DeleteAttendTypeData/' + roleid
    );
  }
//document Type
getDocumentType() {
  return this.http.get(this.globalUrl.weburl + 'DocumentType/GetDocumentType');
}

saveDocumentType(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'DocumentType/PostsaveDocumentType',
    data
  );
}


UpdateDocumentType(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'DocumentType/PostSaveUpdateDocumentType',
    data
  );
}
deleteDocumentType(roleid: number) {
  return this.http.get(
    this.globalUrl.weburl + 'DocumentType/deleteDocumentTypeData/' + roleid
  );
}
// service.ts


getModeofTransport() {
  return this.http.get(this.globalUrl.weburl + 'ModeofTransport/GetModeofTransport');
}

saveModeofTransport(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'ModeofTransport/PostsaveModeofTransport',
    data
  );
}

UpdateModeofTransport(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'ModeofTransport/PostSaveUpdateModeofTransport',
    data
  );
}

deleteModeofTransport(roleid: number) {
  return this.http.get(
    this.globalUrl.weburl + 'ModeofTransport/deleteModeofTransport/' + roleid
  );
}

// service.ts


getTemplate() {
  return this.http.get(this.globalUrl.weburl + 'DocumentTemplate/getTemplate');
}

saveTemplate(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'DocumentTemplate/PostsaveTemplate',
    data
  );
}

UpdateTemplate(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'DocumentTemplate/PostSaveUpdateTemplate',
    data
  );
}
deleteTemplate(roleid: any) {
  return this.http.get(

    this.globalUrl.weburl + 'DocumentTemplate/deleteTemplate/' + roleid
    );
}
//mail template
getMailTemplate() {
  return this.http.get(this.globalUrl.weburl + 'DocumentMailTemplate/getMailTemplate');
}

saveMailtemplate(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'DocumentMailTemplate/PostsaveMailtemplate',
    data
  );
}

UpdateMailTemplate(data: any) {
  return this.http.post(
    this.globalUrl.weburl + 'DocumentMailTemplate/PostUpdateMailTemplate',
    data
  );
}
deleteMailtemplate(roleid: any) {
  return this.http.get(

    this.globalUrl.weburl + 'DocumentMailTemplate/deleteMailtemplate/' + roleid
    );
}

getPerticularDocumentType(id:any) {
  return this.http.get(this.globalUrl.weburl + 'DocumentType/GetPerticularDocumentType/'+ id);
}
}
