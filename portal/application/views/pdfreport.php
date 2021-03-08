<?php
//============================================================+
// File name   : example_001.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 001 for TCPDF class
//               Default Header and Footer
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+







    
// $this->load->model("patient_model");
// $this->load->model("appointment_model");

// $this->load->model("complaint_model");
// $this->load->model("pill_model");

// $viewData = new stdClass();

// $id = 7;

// $item = $this->appointment_model->get(
//     array(
//         "id"    => $id,
//     )
// );

// $patient = $this->patient_model->get(array("id" => $item->patient_id));

// if($patient) {
//     $item->tckn = $patient->tckn;
//     $item->name = $patient->name;
//     $item->surname = $patient->surname;
//     $item->gender = $patient->gender;
//     $item->birthDate = $patient->birthDate;
//     $item->email = $patient->email;
//     $item->phone = $patient->phone;
    
//     $item->province = $patient->province;
//     $item->district = $patient->district;
//     $item->address = $patient->address;
    
//     $item->job = $patient->job;
//     $item->height = $patient->height;
//     $item->weight = $patient->weight;
    
//     $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
//     $appointmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->appointmentDate)->format('Y-m-d H:i');
    
//     $item->birthDate = $birthDate;
//     $item->appointmentDate = $appointmentDate;
    
//     $viewData->info = $item;
// }


// $complaints = $this->complaint_model->get_all(
//     array(
//         "patient_id"    => $item->patient_id,
//     )
// );

// $viewData->complaints = $complaints;

// $pills = $this->pill_model->get_all(
//     array(
//         "patient_id"    => $item->patient_id,
//     )
//     );

// $viewData->pills = $pills;


// /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
// $viewData->viewFolder = $this->viewFolder;
// $viewData->subViewFolder = "info";
// $viewData->appointmentId = $item->id;

// $render_html = $this->load->view("patient/info_regions/summary", $viewData, true);









/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Default Header and Footer
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
// require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Fatih Çerçi');
$pdf->SetTitle('LENORA Bilişim Teknolojileri');
$pdf->SetSubject('Pdf Raporlama');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
// $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
// $pdf->setFooterData(array(0,64,0), array(0,64,128));

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set default font subsetting mode
$pdf->setFontSubsetting(true);

// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
$pdf->SetFont('dejavusans', '', 10, '', true);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();

// set text shadow effect
$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

// Set some content to print

$html = <<<EOD
    $render_html
EOD;

// Print text using writeHTMLCell()
$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

// ---------------------------------------------------------

// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('example_001.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+