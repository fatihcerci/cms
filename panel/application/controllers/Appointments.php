<?php

class Appointments extends CI_Controller
{
    public $viewFolder = "";

    public function __construct()
    {

        parent::__construct();

        $this->viewFolder = "appointments_v";

        $this->load->model("appointment_model");
        $this->load->model("patient_model");

        if(!get_active_user()){
            redirect(base_url("login"));
        }

    }

    public function index(){

        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $items = $this->appointment_model->get_all(
            array("isActive" => "1")
        );
        
        foreach($items as $item) {
            $patient = $this->patient_model->get(array("id" => $item->patient_id));
            
            if($patient) {
                $item->name = $patient->name;
                $item->surname = $patient->surname;
                $item->gender = $patient->gender;
                $item->email = $patient->email;
                $item->phone = $patient->phone;
            } 
            
            $item->tab = "tab-1";
        }

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "list";
        $viewData->items = $items;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    public function new_form(){

        $viewData = new stdClass();

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "add";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

    }

    public function save(){

        $this->load->library("form_validation");

        // Kurallar yazilir..

        $this->form_validation->set_rules("tckn", "TCKN", "required|trim");
        $this->form_validation->set_rules("name", "Ad", "required|trim");
        $this->form_validation->set_rules("surname", "Soyad", "required|trim");
        $this->form_validation->set_rules("gender", "Cinsiyet", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("email", "E-posta", "required|trim");
        $this->form_validation->set_rules("phone", "Telefon", "required|trim");
        $this->form_validation->set_rules("appointmentDate", "Randevu Tarihi", "required|trim");

        $this->form_validation->set_message(
            array(
                "required"  => "<b>{field}</b> alanı doldurulmalıdır"
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){

            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            $appointmentDate = DateTime::createFromFormat('Y-m-d H:i', $this->input->post("appointmentDate"));
            
            $patientId = $this->patient_model->add(
                array(
                    "tckn"              => $this->input->post("tckn"),
                    "name"              => $this->input->post("name"),
                    "surname"           => $this->input->post("surname"),
                    "gender"            => $this->input->post("gender"),
                    "birthDate"         => $birthDate->format('Y-m-d'),
                    "email"             => $this->input->post("email"),
                    "phone"             => $this->input->post("phone"),
                    "isActive"          => 1,
                    "createdAt"         => date("Y-m-d H:i:s")
                )
            );

            
            
            // TODO Alert sistemi eklenecek...
            $success = 0;
            if($patientId){
                
                $appointment = $this->appointment_model->add(
                    array(
                        "patient_id"        => $patientId,
                        "appointmentDate"   => $appointmentDate->format('Y-m-d H:i'),
                        "isActive"          => 1,
                        "createdAt"         => date("Y-m-d H:i:s")
                    )
                );
                
                if($appointment){
                    $success = 1;
                } 

            } 
            
            if($success == 1) {
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Randevu başarılı bir şekilde oluşturuldu",
                    "type"  => "success"
                );
            }
            else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Randevu oluşturma sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }

            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("appointments"));

        } else {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "add";
            $viewData->form_error = true;
            
            $viewData->tckn = $this->input->post("tckn");
            $viewData->name = $this->input->post("name");
            $viewData->surname = $this->input->post("surname");
            $viewData->gender = $this->input->post("gender");
            $viewData->birthDate = $this->input->post("birthDate");
            $viewData->email = $this->input->post("email");
            $viewData->phone = $this->input->post("phone");
            $viewData->birthDate = $this->input->post("birthDate");
            $viewData->appointmentDate = $this->input->post("appointmentDate");

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function update_form($id){

        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
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
        } 
        
        $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
        $appointmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->appointmentDate)->format('Y-m-d H:i');
        
        $item->birthDate = $birthDate;
        $item->appointmentDate = $appointmentDate;
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "update";
        $viewData->item = $item;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);


    }

    public function update($id){
        
        $item = $this->appointment_model->get(
            array(
                "id"    => $id,
            )
        );

        $this->load->library("form_validation");

        // Kurallar yazilir..

        $this->form_validation->set_rules("tckn", "TCKN", "required|trim");
        $this->form_validation->set_rules("name", "Ad", "required|trim");
        $this->form_validation->set_rules("surname", "Soyad", "required|trim");
        $this->form_validation->set_rules("gender", "Cinsiyet", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("email", "E-posta", "required|trim");
        $this->form_validation->set_rules("phone", "Telefon", "required|trim");
        $this->form_validation->set_rules("appointmentDate", "Randevu Tarihi", "required|trim");

        $this->form_validation->set_message(
            array(
                "required"  => "<b>{field}</b> alanı doldurulmalıdır"
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){

            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            $appointmentDate = DateTime::createFromFormat('Y-m-d H:i', $this->input->post("appointmentDate"));
            
            
            $patientData = array(
                "tckn"              => $this->input->post("tckn"),
                "name"              => $this->input->post("name"),
                "surname"           => $this->input->post("surname"),
                "gender"            => $this->input->post("gender"),
                "birthDate"         => $birthDate->format('Y-m-d'),
                "email"             => $this->input->post("email"),
                "phone"             => $this->input->post("phone"),
            );

            $patientUpdate = $this->patient_model->update(array("id" => $item->patient_id), $patientData);

            // TODO Alert sistemi eklenecek...
            $success = 1;
            if($patientUpdate){
                
                $appointmentData = array(
                    "appointmentDate"   => $appointmentDate->format('Y-m-d H:i'),
                );
                
                $appointmentUpdate = $this->appointment_model->update(array("id" => $id), $appointmentData);
                
                $success = 1;
            } 
            
            if($success == 1) {
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text"  => "Randevu başarılı bir şekilde güncellendi",
                    "type"  => "success"
                );
            }
            else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text"  => "Randevu güncelleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }

            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("appointments"));

        } else {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "update";
            $viewData->form_error = true;

            /** Tablodan Verilerin Getirilmesi.. */
            $viewData->item = $this->appointment_model->get(
                array(
                    "id"    => $id,
                )
            );

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function delete($id){

        $delete = $this->appointment_model->delete(
            array(
                "id"    => $id
            )
        );

        // TODO Alert Sistemi Eklenecek...
        if($delete){

            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "Kayıt başarılı bir şekilde silindi",
                "type"  => "success"
            );

        } else {

            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "Kayıt silme sırasında bir problem oluştu",
                "type"  => "error"
            );


        }

        $this->session->set_flashdata("alert", $alert);
        redirect(base_url("appointments"));


    }

    public function isActiveSetter($id){

        if($id){

            $isActive = ($this->input->post("data") === "true") ? 1 : 0;

            $this->appointment_model->update(
                array(
                    "id"    => $id
                ),
                array(
                    "isActive"  => $isActive
                )
            );
        }
    }
    
}
