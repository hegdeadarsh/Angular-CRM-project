import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';
import { WorkFrontComponent } from './Components/work-front/work-front.component';
import { RoleMasterComponent } from './Components/Masters/role-master/role-master.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { CustomerRegistrationComponent } from './Components/customer-registration/customer-registration.component';
import { MachineRegistrationComponent } from './Components/machine-registration/machine-registration.component';
import { CityComponent } from './Components/Masters/city/city.component';
import { ClusterComponent } from './Components/Masters/cluster/cluster.component';
import { CountryComponent } from './Components/Masters/country/country.component';
import { RegionComponent } from './Components/Masters/region/region.component';
import { RouteNumberComponent } from './Components/Masters/route-number/route-number.component';
import { StateComponent } from './Components/Masters/state/state.component';
import { ZoneComponent } from './Components/Masters/zone/zone.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { CustomerListsComponent } from './Components/customer-lists/customer-lists.component';
import { ModelMasterComponent } from './Components/Masters/model-master/model-master.component';
import { FeaturesMasterComponent } from './Components/Masters/features-master/features-master.component';
import { InvoicePerticularComponent } from './Components/Masters/invoice-perticular/invoice-perticular.component';
import { TestComponent } from './test/test.component';
import { MachineListComponent } from './Components/machine-list/machine-list.component';
import { RequestAndInteractionComponent } from './Components/request-and-interaction/request-and-interaction.component';
import { InvoiceAndFollowupComponent } from './Components/invoice-and-followup/invoice-and-followup.component';
import { RequestsMasterComponent } from './Components/Masters/requests-master/requests-master.component';
import { RequestListComponent } from './Components/request-list/request-list.component';
import { FolloUpListComponent } from './Components/follo-up-list/follo-up-list.component';
import { InteractionListComponent } from './Components/interaction-list/interaction-list.component';
import { InvoiceListComponent } from './Components/invoice-list/invoice-list.component';
import { TypeOfAttendMasterComponent } from './Components/Masters/type-of-attend-master/type-of-attend-master.component';
import { SandsMasterComponent } from './Components/Masters/sands-master/sands-master.component';
import { ZoneMasterComponent } from './Components/Masters/zone-master/zone-master.component';
import { EditCustomerListsComponent } from './Components/edit-customer-lists/edit-customer-lists.component';
import { CallLogScreenComponent } from './Components/call-log-screen/call-log-screen.component';
import { TravelBudgetComponent } from './Components/travel-budget/travel-budget.component';
import { FaultsComponent } from './Components/Masters/faults/faults.component';
import { ConsumablesComponent } from './Components/Masters/consumables/consumables.component';
import { TripSheetComponent } from './Components/trip-sheet/trip-sheet.component';
import { LocationdetailsComponent } from './Components/locationdetails/locationdetails.component';
import { LocationdetailslistComponent } from './Components/locationdetailslist/locationdetailslist.component';
import { DocumentmanagerComponent } from './Components/document manager/documentmanager/documentmanager.component';
import { DocumentTypeMasterComponent } from './Components/Masters/document-type-master/document-type-master.component';
import { ModeofTransportMasterComponent } from './Components/Masters/modeof-transport-master/modeof-transport-master.component';
import { TemplateComponent } from './Components/Masters/DocumentTemplate/template.component';
import { DocumentMailTemplateComponent } from './Components/Masters/document-mail-template/document-mail-template.component';
import { QuotationmanagerComponent } from './quotationmanager/quotationmanager.component';
import { QuotationtemplateComponent } from 'src/quotationtemplate/quotationtemplate.component';
import { BrochureComponent } from 'src/brochure/brochure.component';
import { MailquotationtemplateComponent } from 'src/mailquotationtemplate/mailquotationtemplate.component';
import { TestqmComponent } from 'src/testqm/testqm.component';
//import { Quotation4020Component } from './quotation4020/quotation4020.component';
//import { RapidITableComponent } from './rapid-i-table/rapid-i-table.component';
import { Rapid64Component } from './Components/QM TEMPLATES/rapid64/rapid64.component';
import { Rapidi2015JLXComponent } from './Components/QM TEMPLATES/rapidi2015-jlx/rapidi2015-jlx.component';
import { RapidIsparesComponent } from './Components/QM TEMPLATES/rapid-ispares/rapid-ispares.component';
import { RapiditrainingchargesComponent } from './Components/QM TEMPLATES/rapiditrainingcharges/rapiditrainingcharges.component';
import { V20152axesComponent } from './Components/QM TEMPLATES/v20152axes/v20152axes.component';
import { V4020Component } from './Components/QM TEMPLATES/v4020/v4020.component';
import { Rapidi64CamACSCComponent } from './Components/QM TEMPLATES/rapidi64-cam-acsc/rapidi64-cam-acsc.component';
import { V4030Component } from './Components/QM TEMPLATES/v4030/v4030.component';
import { Q4020Component } from './Components/QM TEMPLATES/q4020/q4020.component';
import { Q4020HTComponent } from './Components/QM TEMPLATES/q4020-ht/q4020-ht.component';
import { RapidtableComponent } from './Components/QM TEMPLATES/rapidtable/rapidtable.component';
import { QMComponent } from './Components/QUOTATIONMANAGER/qm/qm.component';
import { FormsModule } from '@angular/forms';


import { CallTicketScreenComponent } from './Components/call-ticket-screen/call-ticket-screen.component';
import { Quatation4020HTComponent } from './Components/quatation templates/quatation4020-ht/quatation4020-ht.component';
import { Quotation2015Iv2015JLXComponent } from './Components/quatation templates/quotation2015-iv2015-jlx/quotation2015-iv2015-jlx.component';
import { Quotation2015HTComponent } from './Components/quatation templates/quotation2015-ht/quotation2015-ht.component';
import { Quotation2015Component } from './Components/quatation templates/quotation2015/quotation2015.component';
import { Quotation2015z25Component } from './Components/quatation templates/quotation2015z25/quotation2015z25.component';
import { Quotation4020Component } from './Components/quatation templates/quotation4020/quotation4020.component';
import { Quotation4020indollorComponent } from './Components/quatation templates/quotation4020indollor/quotation4020indollor.component';
import { Quotation4020z25Component } from './Components/quatation templates/quotation4020z25/quotation4020z25.component';
import { Quotation4030z25Component } from './Components/quatation templates/quotation4030z25/quotation4030z25.component';
import { Quotation4030Component } from './Components/quatation templates/quotation4030/quotation4030.component';
import { Quotation4030indollorComponent } from './Components/quatation templates/quotation4030indollor/quotation4030indollor.component';
import { Quotation5030Component } from './Components/quatation templates/quotation5030/quotation5030.component';
import { Quotation5030z25jlxComponent } from './Components/quatation templates/quotation5030z25jlx/quotation5030z25jlx.component';
import { RapidIAMCComponent } from './Components/quatation templates/rapid-iamc/rapid-iamc.component';
import { RapidI5april2021Component } from './Components/quatation templates/rapid-i5april2021/rapid-i5april2021.component';
import { TravelSheetComponent } from './Components/travel-sheet/travel-sheet.component';
import { Quotation2015indollorComponent } from './Components/QM TEMPLATES/quotation2015indollor/quotation2015indollor.component';
import { RapidIVMCComponent } from './Components/QM TEMPLATES/rapid-i-vmc/rapid-i-vmc.component';
import { PurposeJobTimeMasterComponent } from './Components/Masters/purpose-job-time-master/purpose-job-time-master.component';
import { CallEntryTicketComponent } from './Components/call-entry-ticket/call-entry-ticket.component';
import { DeclarationFEMAComponent } from './documentmanagertemplates/declaration-fema/declaration-fema.component';
import { DocumentManagerTemplateComponent } from './document-manager-template/document-manager-template.component';
import { FttCoveringLetterComponent } from './documentmanagertemplates/ftt-covering-letter/ftt-covering-letter.component';

const routes: Routes = [
{path : '', component: HomeComponent},
{path : 'home', component: HomeComponent},
{path : 'login', component: LoginComponent},
{path : 'userRegistration', component:UserRegistrationComponent},
{path : 'workFront', component:WorkFrontComponent},
{path : 'roleMaster', component:RoleMasterComponent},
{path : 'dashboard', component:DashBoardComponent},
{path : 'newcustomerregistration', component:CustomerRegistrationComponent},
{path : 'newmachineregistaration', component:MachineRegistrationComponent},
{path : 'cityMaster', component: CityComponent},
{path : 'clusterMaster', component: ClusterComponent},
{path : 'countryMaster', component: CountryComponent},
{path : 'regionMaster', component: RegionComponent},
{path : 'routeNumberMaster', component: RouteNumberComponent},
{path : 'statemaster', component: StateComponent},
{path : 'zoneMaster', component: ZoneMasterComponent},
{path : 'faultsMaster', component: FaultsComponent},
{path : 'consumablesMaster', component: ConsumablesComponent},
{path : 'userList', component: UserListComponent},
{path : 'customerLists', component: CustomerListsComponent},
{path : 'modelMaster', component: ModelMasterComponent},
{path : 'featuresMaster', component: FeaturesMasterComponent},
{path : 'purposeMaster', component: PurposeJobTimeMasterComponent},
{path : 'invoiceParticulars', component: InvoicePerticularComponent},
{path : 'machineLists', component: MachineListComponent},
{path : 'request&interaction', component: RequestAndInteractionComponent},
{path : 'invoice&followup', component: InvoiceAndFollowupComponent},
{path : 'requestsMasters', component: RequestsMasterComponent},
{path : 'requestList', component: RequestListComponent},
{path : 'follow-upList', component: FolloUpListComponent},
{path : 'interactionList', component: InteractionListComponent},
{path : 'invoiceList', component: InvoiceListComponent},
{path : 'attendTypeMaster', component: TypeOfAttendMasterComponent},
{path : 's&s', component: SandsMasterComponent},
{path : 'callLogScreen', component: CallLogScreenComponent},
{path : 'travelBudget/:id', component: TravelBudgetComponent}, 
{path : 'travelBudget', component: TravelBudgetComponent},
{path : 'TravelSheet', component: TravelSheetComponent},
{path : 'TravelSheet/:id', component: TravelSheetComponent},
{path : 'tripsheet', component: TripSheetComponent},
{path : 'locationDetails', component: LocationdetailsComponent},
{path : 'locationDetailslist', component: LocationdetailslistComponent},
{path:'quotationmanager',component:QuotationmanagerComponent},
{path:'quotationtemplate',component:QuotationtemplateComponent},
{path:'brochure',component:BrochureComponent},
{path:'mailquotationtemplate',component:MailquotationtemplateComponent},
{path:'documentmanager',component:DocumentmanagerComponent},
{path:'DocumentType',component:DocumentTypeMasterComponent},
{path:'ModeofTransport',component:ModeofTransportMasterComponent},
{path:'Template',component:TemplateComponent},
{path:'DocumentMailTemplate',component:DocumentMailTemplateComponent},

{path:'CallTicketScreen',component:CallTicketScreenComponent},
{path:'CallEntryTicket',component:CallEntryTicketComponent},

{path : 'test', component: TestComponent},

{path:'quotaiontemplate',component:QuotationtemplateComponent},



//QM TEMPLATES


{path:'quotation2015HT/:id',component:Quotation2015HTComponent},

{path:'quotation2015indollor/:id',component:Quotation2015indollorComponent},

{path:'quotation2015/:id',component:Quotation2015Component},

{path:'quotation2015z25/:id',component:Quotation2015z25Component},

{path:'quotation4020/:id',component:Q4020Component},

{path:'quotation4020HT/:id',component:Q4020HTComponent},

{path:'quotation4020indollor/:id',component:Quotation4020indollorComponent},

{path:'quotation4020z25/:id',component:Quotation4020z25Component},

{path:'quotation4030/:id',component:Quotation4030Component},

{path:'quotation4030indollor/:id',component:Quotation4030indollorComponent},

{path:'quotation4030z25/:id',component:Quotation4030z25Component},

{path:'quotation5030/:id',component:Quotation5030Component},

{path:'quotation5030z25jlx/:id',component:Quotation5030z25jlxComponent},

{path:'rapiditable/:id',component:RapidtableComponent},

{path:'rapid64-cam-acsc/:id',component:Rapidi64CamACSCComponent},

{path:'rapid64/:id',component:Rapid64Component},

{path:'rapidi2015Iv2015JLX/:id',component:Rapidi2015JLXComponent},

{path:'rapidI5april2021/:id',component:RapidI5april2021Component},

{path:'RapidIAMC/:id',component:RapidIAMCComponent},

{path:'rapidispares/:id',component:RapidIsparesComponent},

{path:'rapiditrainings/:id',component:RapiditrainingchargesComponent},


{path:'v4020',component:V4020Component},
{path:'v4020/:id',component:V4020Component},

{path:'v4030/:id',component:V4030Component},

{path:'v2015-jlx/:id',component:V20152axesComponent},


{path:'rapidIVMC',component:RapidIVMCComponent},
{path:'rapidIVMC/:id',component:RapidIVMCComponent},

//document manager template
{path:'DocumentManagerTemplate',component:DocumentManagerTemplateComponent},

//QUOTATION MANAGER 
{path:'qm',component:QMComponent},
{path: 'editcustomer/:id',component: EditCustomerListsComponent },

//Document Manager templates

{path:'declarationFEMA',component:DeclarationFEMAComponent},
{path:'FttCoveringLetter',component:FttCoveringLetterComponent},






];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
