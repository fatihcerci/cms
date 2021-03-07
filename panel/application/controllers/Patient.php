<?php

class Patient extends CI_Controller
{
    public $viewFolder = "";

    public function __construct()
    {

        parent::__construct();

        $this->viewFolder = "patient_v";

        $this->load->model("patient_model");
        $this->load->model("appointment_model");
        
        $this->load->model("complaint_model");
        $this->load->model("pill_model");
        
        $this->load->library("pdf_report");

        if(!get_active_user()){
            redirect(base_url("login"));
        }

    }

    public function info_form($params){
        
        $viewData = new stdClass();
        
        $param = explode("_", $params);
        $id = $param[0];
        $tab = "#".$param[1];
        
        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->appointment_model->get(
            array(
                "id"    => $id,
            )
        );
        
        if($tab == "#tab-1") { //Genel Bilgiler
            $patient = $this->patient_model->get(array("id" => $item->patient_id));
            
            if($patient) {
                $item->tckn = $patient->tckn;
                $item->name = $patient->name;
                $item->surname = $patient->surname;
                $item->gender = $patient->gender;
                $item->birthDate = $patient->birthDate;
                $item->email = $patient->email;
                $item->phone = $patient->phone;
                
                $item->province = $patient->province;
                $item->district = $patient->district;
                $item->address = $patient->address;
                
                $item->job = $patient->job;
                $item->height = $patient->height;
                $item->weight = $patient->weight;
                
                $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
                $appointmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->appointmentDate)->format('Y-m-d H:i');
                
                $item->birthDate = $birthDate;
                $item->appointmentDate = $appointmentDate;
                
                $viewData->info = $item;
            }
        } else if($tab == "#tab-2") { //Şikayetler
            $complaints = $this->complaint_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
            );
            
            $viewData->complaints = $complaints;
        } else if($tab == "#tab-3") { //Şikayetler
            $pills = $this->pill_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
            );
            
            $viewData->pills = $pills;
        } else if($tab == "#tab-4") { //Özet
            
            $patient = $this->patient_model->get(array("id" => $item->patient_id));
            
            if($patient) {
                $item->tckn = $patient->tckn;
                $item->name = $patient->name;
                $item->surname = $patient->surname;
                $item->gender = $patient->gender;
                $item->birthDate = $patient->birthDate;
                $item->email = $patient->email;
                $item->phone = $patient->phone;
                
                $item->province = $patient->province;
                $item->district = $patient->district;
                $item->address = $patient->address;
                
                $item->job = $patient->job;
                $item->height = $patient->height;
                $item->weight = $patient->weight;
                
                $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
                $appointmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->appointmentDate)->format('Y-m-d H:i');
                
                $item->birthDate = $birthDate;
                $item->appointmentDate = $appointmentDate;
                
                $viewData->info = $item;
            }
            
            
            $complaints = $this->complaint_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
                );
            
            $viewData->complaints = $complaints;
            
            $pills = $this->pill_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
                );
            
            $viewData->pills = $pills;
        }
        
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "info";
        $viewData->tab = $tab;
        $viewData->appointmentId = $item->id;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

  
    
    public function update_general_form($id){
        $viewData = new stdClass();
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $id,
            )
        );
        
        $data = array(
            "height"     => $this->input->post("height"),
            "weight"     => $this->input->post("weight"),
            "province"   => $this->input->post("province"),
            "district"   => $this->input->post("district"),
            "address"    => $this->input->post("address"),
            "job"        => $this->input->post("job")
        );
        
        $update = $this->patient_model->update(array("id" => $item->patient_id), $data);
        
        // TODO Alert sistemi eklenecek...
        if($update){
            ///
        } else {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text"  => "Randevu güncelleme sırasında bir problem oluştu",
                "type"  => "error"
            );
        }
        
        // İşlemin Sonucunu Session'a yazma işlemi...
        if(!empty($alert)) {
            $this->session->set_flashdata("alert", $alert);
        }
        
        $complaints = $this->complaint_model->get_all(
            array(
                "patient_id"    => $item->patient_id,
            )
        );
        
        $tab = "#tab-2";
        
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "info";
        $viewData->tab = $tab;
        $viewData->complaints = $complaints;
        $viewData->appointmentId = $item->id;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }
    
    public function save_complaint($appointmentId){
        $viewData = new stdClass();
        
        $tab = "#tab-2";
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $appointmentId,
            )
        );
        
        $this->load->library("form_validation");
        
        // Kurallar yazilir..
        
        $this->form_validation->set_rules("description", "Rahatsızlık", "required|trim");
        $this->form_validation->set_rules("violence", "Şiddet", "required|trim");
        $this->form_validation->set_rules("treatment_applied", "Uygulanan Tedavi", "required|trim");
        
        $this->form_validation->set_message(
            array(
                "required"  => "<b>{field}</b> alanı doldurulmalıdır"
            )
        );
        
        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();
        
        if($validate){
            
            $insert = $this->complaint_model->add(
                array(
                    "description"         => $this->input->post("description"),
                    "violence"            => $this->input->post("violence"),
                    "treatment_applied"   => $this->input->post("treatment_applied"),
                    "patient_id"          => $item->patient_id,
                    "isActive"            => 1,
                    "createdAt"           => date("Y-m-d H:i:s")
                )
            );
            
            // TODO Alert sistemi eklenecek...
            $success = 0;
            if($insert){
                $success = 1;
            }
            
            if($success == 1) {
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "",
                    "type"  => "success"
                );
            }
            else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Bir problem oluştu",
                    "type"  => "error"
                );
            }
            
            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);
            
            $complaints = $this->complaint_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
            );
            
            $viewData->complaints = $complaints;
            
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "info";
            $viewData->tab = $tab;
            $viewData->complaints = $complaints;
            $viewData->appointmentId = $item->id;
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
            
        } else {
            
            $viewData = new stdClass();
            
            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "info";
            $viewData->form_error = true;
            
            $viewData->description = $this->input->post("description");
            $viewData->violence = $this->input->post("violence");
            $viewData->treatment_applied = $this->input->post("treatment_applied");
            $viewData->appointmentId = $item->id;
            $viewData->tab = $tab;
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }
        
    }
    
    public function delete_complaint($params){
        $viewData = new stdClass();
        
        $param = explode("_", $params);
        $appointmentId = $param[0];
        $complaintId = $param[1];
        
        $delete = $this->complaint_model->delete(
            array(
                "id"    => $complaintId
            )
        );
        
        // TODO Alert Sistemi Eklenecek...
        if($delete){
            
            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "",
                "type"  => "success"
            );
            
        } else {
            
            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "Kayıt silme sırasında bir problem oluştu",
                "type"  => "error"
            );
            
            
        }
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $appointmentId,
            )
        );
        
        $complaints = $this->complaint_model->get_all(
            array(
                "patient_id"    => $item->patient_id,
            )
        );
        
        
        
        $this->session->set_flashdata("alert", $alert);
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "info";
        $viewData->tab = "#tab-2";
        $viewData->appointmentId = $item->id;
        $viewData->complaints = $complaints;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }
    
    
    public function save_pill($appointmentId){
        $viewData = new stdClass();
        
        $tab = "#tab-3";
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $appointmentId,
            )
        );
        
        $this->load->library("form_validation");
        
        // Kurallar yazilir..
        
        $this->form_validation->set_rules("name", "İlaç", "required|trim");
        $this->form_validation->set_rules("reason", "Kullanma Nedeni", "required|trim");
        
        $this->form_validation->set_message(
            array(
                "required"  => "<b>{field}</b> alanı doldurulmalıdır"
            )
        );
        
        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();
        
        if($validate){
            
            $startDate = DateTime::createFromFormat('d/m/Y', $this->input->post("startDate"));
            
            $insert = $this->pill_model->add(
                array(
                    "name"                => $this->input->post("name"),
                    "dose"                => $this->input->post("dose"),
                    "startDate"           => $startDate->format('Y-m-d'),
                    "reason"              => $this->input->post("reason"),
                    "patient_id"          => $item->patient_id,
                    "isActive"            => 1,
                    "createdAt"           => date("Y-m-d H:i:s")
                )
            );
            
            // TODO Alert sistemi eklenecek...
            $success = 0;
            if($insert){
                $success = 1;
            }
            
            if($success == 1) {
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "",
                    "type"  => "success"
                );
            }
            else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Bir problem oluştu",
                    "type"  => "error"
                );
            }
            
            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);
            
            $pills = $this->pill_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
            );
            
            $viewData->pills = $pills;
            
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "info";
            $viewData->tab = $tab;
            $viewData->appointmentId = $item->id;
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
            
        } else {
            
            $viewData = new stdClass();
            
            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "info";
            $viewData->form_error = true;
            
            $viewData->name = $this->input->post("name");
            $viewData->dose = $this->input->post("dose");
            $viewData->startDate = $this->input->post("startDate");
            $viewData->reason = $this->input->post("reason");
            
            $pills = $this->pill_model->get_all(
                array(
                    "patient_id"    => $item->patient_id,
                )
            );
            
            $viewData->pills = $pills;
            
            $viewData->appointmentId = $item->id;
            $viewData->tab = $tab;
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }
        
    }
    
    public function delete_pill($params){
        $viewData = new stdClass();
        
        $param = explode("_", $params);
        $appointmentId = $param[0];
        $pillId = $param[1];
        
        $delete = $this->pill_model->delete(
            array(
                "id"    => $pillId
            )
        );
        
        // TODO Alert Sistemi Eklenecek...
        if($delete){
            
            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "",
                "type"  => "success"
            );
            
        } else {
            
            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "Kayıt silme sırasında bir problem oluştu",
                "type"  => "error"
            );
            
            
        }
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $appointmentId,
            )
        );
        
        $pills = $this->pill_model->get_all(
            array(
                "patient_id"    => $item->patient_id,
            )
        );
        
        
        
        $this->session->set_flashdata("alert", $alert);
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "info";
        $viewData->tab = "#tab-3";
        $viewData->appointmentId = $item->id;
        $viewData->pills = $pills;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }
    
    public function createPdf($id) {
        $viewData = new stdClass();
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $id,
            )
        );
        
        $patient = $this->patient_model->get(array("id" => $item->patient_id));
        
        if($patient) {
            $item->tckn = $patient->tckn;
            $item->name = $patient->name;
            $item->surname = $patient->surname;
            $item->gender = $patient->gender;
            $item->birthDate = $patient->birthDate;
            $item->email = $patient->email;
            $item->phone = $patient->phone;
        
            $item->province = $patient->province;
            $item->district = $patient->district;
            $item->address = $patient->address;
        
            $item->job = $patient->job;
            $item->height = $patient->height;
            $item->weight = $patient->weight;
        
            $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
            $appointmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->appointmentDate)->format('Y-m-d H:i');
        
            $item->birthDate = $birthDate;
            $item->appointmentDate = $appointmentDate;
        
            $viewData->info = $item;
        }
        
        
        $complaints = $this->complaint_model->get_all(
            array(
                "patient_id"    => $item->patient_id,
            )
        );
        
        $viewData->complaints = $complaints;
        
        $pills = $this->pill_model->get_all(
                array(
                        "patient_id"    => $item->patient_id,
                )
            );
        
        $viewData->pills = $pills;
        
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "info";
        $viewData->appointmentId = $item->id;
        
        $render_html = $this->load->view("$this->viewFolder/info_regions/summary_pdf", $viewData, true);

        
        
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        
//         $pdf->setCellPaddings( $left = '3px', $top = '3px', $right = '3px', $bottom = '3px');
        
        // set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('Fatih Çerçi');
        $pdf->SetTitle('LENORA Bilişim Teknolojileri');
        $pdf->SetSubject('Pdf Raporlama');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        
        // set default header data
        $pdf->SetHeaderData(NULL, NULL, "LENORA Bilisim Teknolojileri", "Hasta Özet Formu", array(0,10,10), array(0,10,10));
        $pdf->setFooterData(array(0,10,10), array(0,10,10));
        
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
//         $pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));
        
        // Set some content to print
        
        // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, '', '', $render_html, 0, 1, 0, true, '', true);
        
        // ---------------------------------------------------------
        
        // Close and output PDF document
        // This method has several options, check the source code documentation for more information.
        $pdf->Output(removeTurkishChar($item->name)." ".removeTurkishChar($item->surname)."_HastaOzetFormu.pdf", 'D');
    }
}
