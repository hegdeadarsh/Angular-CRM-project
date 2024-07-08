import { Component } from '@angular/core';

@Component({
  selector: 'app-document-manager-template',
  templateUrl: './document-manager-template.component.html',
  styleUrls: ['./document-manager-template.component.css']
})
export class DocumentManagerTemplateComponent {
  print(printSectionId) {
    var innerContents = document.getElementById(printSectionId).innerHTML;
    var popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=yes');
    popupWindow.document.open();
    popupWindow.document.write('<html> <head><style> '+
                               '.sign{text-align:right;margin-left:-25px} '+
                               '.logo{text-align:right;margin-right:-5px;top:0;right:0;} '+
                               '.abc{background-color: rgb(212, 212, 212)} '+
                               '@page { margin: 1cm 3.17cm 2.1cm 2.1cm; }'+
                               '.Lcdclr {font-size: 22px;  color: rgb(138, 237, 255); display: flex; align-items: center; justify-content: flex-end; font-family: "LcdD";}'+

                               '</style></head><body onload="window.print()">' + 
                               innerContents + '</html>');
    popupWindow.document.close();
  }
}