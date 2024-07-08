import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppGlobals } from './AppGlobals';
import { FooterComponent } from './Components/footer/footer.component';
import { WorkFrontComponent } from './Components/work-front/work-front.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { RoleMasterComponent } from './Components/Masters/role-master/role-master.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToUpperPipe } from './to-upper.pipe';
import { CustomerRegistrationComponent } from './Components/customer-registration/customer-registration.component';
import { MachineRegistrationComponent } from './Components/machine-registration/machine-registration.component';
import { CountryComponent } from './Components/Masters/country/country.component';
import { StateComponent } from './Components/Masters/state/state.component';
import { CityComponent } from './Components/Masters/city/city.component';
import { ClusterComponent } from './Components/Masters/cluster/cluster.component';
import { RouteNumberComponent } from './Components/Masters/route-number/route-number.component';
import { RegionComponent } from './Components/Masters/region/region.component';
import { ZoneComponent } from './Components/Masters/zone/zone.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { CustomerListsComponent } from './Components/customer-lists/customer-lists.component';
import { ModelMasterComponent } from './Components/Masters/model-master/model-master.component';
import { FeaturesMasterComponent } from './Components/Masters/features-master/features-master.component';
import { InvoicePerticularComponent } from './Components/Masters/invoice-perticular/invoice-perticular.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TestComponent } from './test/test.component';
import { MachineListComponent } from './Components/machine-list/machine-list.component';
import { RequestAndInteractionComponent } from './Components/request-and-interaction/request-and-interaction.component';
import { InvoiceAndFollowupComponent } from './Components/invoice-and-followup/invoice-and-followup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestsMasterComponent } from './Components/Masters/requests-master/requests-master.component';
import { InvoiceListComponent } from './Components/invoice-list/invoice-list.component';
import { RequestListComponent } from './Components/request-list/request-list.component';
import { FolloUpListComponent } from './Components/follo-up-list/follo-up-list.component';
import { InteractionListComponent } from './Components/interaction-list/interaction-list.component';
import { TypeOfAttendMasterComponent } from './Components/Masters/type-of-attend-master/type-of-attend-master.component';
import { SandsMasterComponent } from './Components/Masters/sands-master/sands-master.component';
import { ZoneMasterComponent } from './Components/Masters/zone-master/zone-master.component';
import { EditCustomerListsComponent } from './Components/edit-customer-lists/edit-customer-lists.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CallLogScreenComponent } from './Components/call-log-screen/call-log-screen.component';
import { TravelBudgetComponent } from './Components/travel-budget/travel-budget.component';
import { FaultsComponent } from './Components/Masters/faults/faults.component';
import { ConsumablesComponent } from './Components/Masters/consumables/consumables.component';
import { TripSheetComponent } from './Components/trip-sheet/trip-sheet.component';
import { LocationdetailsComponent } from './Components/locationdetails/locationdetails.component';
import { LocationdetailslistComponent } from './Components/locationdetailslist/locationdetailslist.component';
// import { SearchPipe } from './search.pipe';
import { DocumentmanagerComponent } from './Components/document manager/documentmanager/documentmanager.component';
import { DocumentTypeMasterComponent } from './Components/Masters/document-type-master/document-type-master.component';
import { ModeofTransportMasterComponent } from './Components/Masters/modeof-transport-master/modeof-transport-master.component';
import { TemplateComponent } from './Components/Masters/DocumentTemplate/template.component';
import { DocumentMailTemplateComponent } from './Components/Masters/document-mail-template/document-mail-template.component';
import { QuotationmanagerComponent } from './quotationmanager/quotationmanager.component';
import { MailquotationtemplateComponent } from 'src/mailquotationtemplate/mailquotationtemplate.component';
import { BrochureComponent } from 'src/brochure/brochure.component';
import { QuotationtemplateComponent } from 'src/quotationtemplate/quotationtemplate.component';
import { Quatation4020HTComponent } from './Components/quatation templates/quatation4020-ht/quatation4020-ht.component';
import { Quotation2015Iv2015JLXComponent } from './Components/quatation templates/quotation2015-iv2015-jlx/quotation2015-iv2015-jlx.component';
import { Quotation2015HTComponent } from './Components/quatation templates/quotation2015-ht/quotation2015-ht.component';
import { Quotation2015Component } from './Components/quatation templates/quotation2015/quotation2015.component';
import { Quotation2015z25Component } from './Components/quatation templates/quotation2015z25/quotation2015z25.component';

import { Quotation4020Component } from './Components/quatation templates/quotation4020/quotation4020.component';
import { Quotation4020indollorComponent } from './Components/quatation templates/quotation4020indollor/quotation4020indollor.component';
import { Quotation4020z25Component } from './Components/quatation templates/quotation4020z25/quotation4020z25.component';
import { Quotation4030Component } from './Components/quatation templates/quotation4030/quotation4030.component';
import { Quotation4030z25Component } from './Components/quatation templates/quotation4030z25/quotation4030z25.component';
import { Quotation4030indollorComponent } from './Components/quatation templates/quotation4030indollor/quotation4030indollor.component';
import { Quotation5030Component } from './Components/quatation templates/quotation5030/quotation5030.component';
import { Quotation5030z25jlxComponent } from './Components/quatation templates/quotation5030z25jlx/quotation5030z25jlx.component';
import { QuotationforRapidITableComponent } from './Components/quatation templates/quotationfor-rapid-itable/quotationfor-rapid-itable.component';
import { RapidIAMCComponent } from './Components/quatation templates/rapid-iamc/rapid-iamc.component';
import { RapidI5april2021Component } from './Components/quatation templates/rapid-i5april2021/rapid-i5april2021.component';




import { CallTicketScreenComponent } from './Components/call-ticket-screen/call-ticket-screen.component';


import { Rapid64Component } from './Components/QM TEMPLATES/rapid64/rapid64.component';
import { Rapidi2015JLXComponent } from './Components/QM TEMPLATES/rapidi2015-jlx/rapidi2015-jlx.component';
import { RapidIsparesComponent } from './Components/QM TEMPLATES/rapid-ispares/rapid-ispares.component';
import { RapiditrainingchargesComponent } from './Components/QM TEMPLATES/rapiditrainingcharges/rapiditrainingcharges.component';
import { V20152axesComponent } from './Components/QM TEMPLATES/v20152axes/v20152axes.component';
import { DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { V4020Component } from './Components/QM TEMPLATES/v4020/v4020.component';
import { V4030Component } from './Components/QM TEMPLATES/v4030/v4030.component';
import { Rapidi64CamACSCComponent } from './Components/QM TEMPLATES/rapidi64-cam-acsc/rapidi64-cam-acsc.component';
import { RapidtableComponent } from './Components/QM TEMPLATES/rapidtable/rapidtable.component';
import { Q4020Component } from './Components/QM TEMPLATES/q4020/q4020.component';
import { Q4020HTComponent } from './Components/QM TEMPLATES/q4020-ht/q4020-ht.component';
import { QMComponent } from './Components/QUOTATIONMANAGER/qm/qm.component';
// import { NumtowordsPipe } from 'src/numtowords.pipe';

import { TravelSheetComponent } from './Components/travel-sheet/travel-sheet.component';
import { Quotation2015indollorComponent } from './Components/QM TEMPLATES/quotation2015indollor/quotation2015indollor.component';
import { RapidIVMCComponent } from './Components/QM TEMPLATES/rapid-i-vmc/rapid-i-vmc.component';
import { PurposeJobTimeMasterComponent } from './Components/Masters/purpose-job-time-master/purpose-job-time-master.component';
import { NumtowordsPipe } from './numtowords.pipe';
import { SearchPipe } from './search.pipe';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DocumentManagerTemplateComponent } from './document-manager-template/document-manager-template.component';
import { FttCoveringLetterComponent } from './documentmanagertemplates/ftt-covering-letter/ftt-covering-letter.component';
import { DeclarationFEMAComponent } from './documentmanagertemplates/declaration-fema/declaration-fema.component';
import { CallEntryTicketComponent } from './Components/call-entry-ticket/call-entry-ticket.component';
//import { NumtowordsPipe } from './numtowords.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    UserRegistrationComponent,
    FooterComponent,
    WorkFrontComponent,
    DashBoardComponent,
    RoleMasterComponent,
    ToUpperPipe,
     CustomerRegistrationComponent,
    MachineRegistrationComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    ClusterComponent,
    RouteNumberComponent,
    RegionComponent,
    ZoneComponent,
    UserListComponent,
SearchPipe,
    
    CustomerListsComponent,
    ModelMasterComponent,
    FeaturesMasterComponent,
    InvoicePerticularComponent,
    TestComponent,
    MachineListComponent,
    RequestAndInteractionComponent,
    InvoiceAndFollowupComponent,
    RequestsMasterComponent,
    InvoiceListComponent,
    RequestListComponent,
    FolloUpListComponent,
    InteractionListComponent,
    TypeOfAttendMasterComponent,
    SandsMasterComponent,
    ZoneMasterComponent,
    EditCustomerListsComponent,
    CallLogScreenComponent,
    TravelBudgetComponent,
    FaultsComponent,
    ConsumablesComponent,
    TripSheetComponent,
    LocationdetailsComponent,
    LocationdetailslistComponent,
    SearchPipe,
    QuotationmanagerComponent,
    MailquotationtemplateComponent,
    BrochureComponent,
    QuotationtemplateComponent,
    DocumentmanagerComponent,
    QuotationtemplateComponent,
    DocumentTypeMasterComponent,
    ModeofTransportMasterComponent,
    TemplateComponent,
    DocumentMailTemplateComponent,

    Rapid64Component,
    Rapidi2015JLXComponent,
    RapidIsparesComponent,
    RapiditrainingchargesComponent,
    V20152axesComponent,
    V4020Component,
    V4030Component,
    Rapidi64CamACSCComponent,
    RapidtableComponent,
    Q4020Component,
    Q4020HTComponent,
    QMComponent,

    Quatation4020HTComponent,
    Quotation2015HTComponent,
    Quotation2015Component,
    Quotation2015z25Component,

    Quotation4020Component,
    Quotation4020indollorComponent,
    Quotation4020z25Component,
    Quotation4030Component,
    Quotation4030z25Component,
    Quotation4030indollorComponent,
    Quotation5030Component,
    Quotation5030z25jlxComponent,
    QuotationforRapidITableComponent,
    RapidIAMCComponent,
    RapidI5april2021Component,
    CallTicketScreenComponent,
    TravelSheetComponent,
RapidIsparesComponent,
Quotation2015indollorComponent,
RapidIVMCComponent,
PurposeJobTimeMasterComponent,
PurposeJobTimeMasterComponent,
NumtowordsPipe,
DocumentManagerTemplateComponent,
FttCoveringLetterComponent,
DeclarationFEMAComponent,
CallEntryTicketComponent,



  ],
  imports: [
    NgHttpLoaderModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    NgxDocViewerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    NgxPaginationModule,
    NgSelectModule,
    FontAwesomeModule,
    DocumentEditorContainerModule,


    
  ],
  providers: [AppGlobals, NgbActiveModal, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
