import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePDF(studentName: string, studentCode: number,birthDate: string,diploma:string,issueDate:string) {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Titre et en-tête
    doc.setFontSize(12);
    doc.text('Kingdom of Morocco', 105, 20, { align: 'center' });
    doc.text('Norsys MARRAKECH', 105, 27, { align: 'center' });
    doc.text('TechnoMakers School', 105, 34, { align: 'center' });
    doc.text('Student Affairs Department', 105, 41, { align: 'center' });


    // Titre principal
    doc.setFontSize(18);
    doc.text('CERTIFICATE OF ENROLLMENT', 105, 60, { align: 'center' });

    // Corps du texte
    doc.setFontSize(12);
    doc.text(`The Dean certifies that the student: ${studentName}`, 20, 90);
    doc.text(`Student ID number ETUD_${studentCode}`, 20, 100);
    doc.text(`Born on ${birthDate} `, 20, 110);
    doc.text(`Is officially enrolled in TechnoMakers school`, 20, 120);
    doc.text(`Degree: ${diploma}`, 20, 130);

    // Date et signature
    doc.text(`Issued in Marrakech on ${issueDate}`, 150, 180, { align: 'right' });
    doc.text('The Dean', 150, 190, { align: 'right' });

    // Footer
    doc.setFontSize(10);
    doc.setFont('normal');
    doc.text('TechnoMakers school  | Lot Koutoubia, Villa No. 38 and 39, Amerchich District - 40080 Marrakech', 105, 250, { align: 'center' });
    doc.text('Phone:  (+212)5 24 30 04 62 | Website: norsys.fr | www.technomakers.ma', 105, 257, { align: 'center' });
    doc.text('This document is issued in only one original copy.', 105, 264, { align: 'center' });

    // Enregistrer le PDF
    doc.save('certificat.pdf');
  }

}
