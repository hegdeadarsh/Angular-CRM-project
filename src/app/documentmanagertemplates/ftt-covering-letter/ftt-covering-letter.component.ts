import { Component } from '@angular/core';

@Component({
  selector: 'app-ftt-covering-letter',
  templateUrl: './ftt-covering-letter.component.html',
  styleUrls: ['./ftt-covering-letter.component.css']
})
export class FttCoveringLetterComponent {
  save: any;



  print (printSectionId) {
    var innerContents = document.getElementById(printSectionId).innerHTML;
    var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=yes');
    popupWinindow.document.open();
    popupWinindow.document.write('<html> <head><style> '+ '.sign{text-align:right;margin-left:-25px} '+  '.abcd{margin-top:-1px;} '+ ' .logo{text-align:right;margin-right:-1px;top:0;right:0;}   ' + ' .abc{background-color: rgb(212, 212, 212)} '+ '@page { margin: 1cm 3.17cm 2.1cm 2.1cm; }'+'  </style>  </head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
    //window.print();
  };
}
