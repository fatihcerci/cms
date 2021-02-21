<?php

class Users extends CI_Controller
{
    public $viewFolder = "";

    public function __construct()
    {

        parent::__construct();

        $this->viewFolder = "users_v";

        $this->load->model("user_model");
        $this->load->model("user_role_model");
        $this->load->model("title_model");

        if(!get_active_user()){
            redirect(base_url("login"));
        }

    }

    public function index(){

        $viewData = new stdClass();

        $user = get_active_user();

        if(isAdmin()){
            $where = array();
        } else {
            $where = array(
                "id"    => $user->id
            );
        }

        /** Tablodan Verilerin Getirilmesi.. */
        $items = $this->user_model->get_all(
            $where
        );
        
        foreach($items as $item) {
            $title = $this->title_model->get(array("id" => $item->user_title_id));
            if($title) {
                $item->title = $title->title;
            } else {
                $item->title = "";
            }
        }

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "list";
        $viewData->items = $items;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    public function new_form(){

        $viewData = new stdClass();

        $viewData->user_roles = $this->user_role_model->get_all(
            array(
                "isActive"  => 1
            )
        );

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "add";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

    }

    public function save(){

        $this->load->library("form_validation");

        // Kurallar yazilir..
        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email|is_unique[users.email]");
        $this->form_validation->set_rules("recruitmentDate", "İşe Giriş Tarihi", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("birthPlace", "Doğum Yeri", "required|trim");
        $this->form_validation->set_rules("user_role_id", "Kullanıcı Rolü", "required|trim");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
                "matches"     => "Şifreler birbirlerini tutmuyor"
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){
            
            $this->load->helper("string");
            $temp_password = random_string();
            
            $recruitmentDate = DateTime::createFromFormat('d/m/Y', $this->input->post("recruitmentDate"));
            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            
            $insert = $this->user_model->add(
                array(
                    "full_name"         => $this->input->post("full_name"),
                    "email"             => $this->input->post("email"),
                    "password"          => md5($temp_password),
                    "recruitmentDate"   => $recruitmentDate->format('Y-m-d'),
                    "birthDate"         => $birthDate->format('Y-m-d'),
                    "birthPlace"        => $this->input->post("birthPlace"),
                    "user_role_id"      => $this->input->post("user_role_id"),
                    "isActive"          => 1,
                    "createdAt"         => date("Y-m-d H:i:s")
                )
            );

            if($insert){
                $sendpasswordhtml = file_get_contents(base_url("sendpassword.html"));
                $message = str_replace("APP_TEMP_PASSWORD", $temp_password, $sendpasswordhtml);
                
                $send = send_email(
                    $this->input->post("email"),
                    "Kullanıcınız Oluşturuldu",
                    $message
                );
                
                if($send){
                    $alert = array(
                        "title" => "İşlem Başarılı",
                        "text" => "Kayıt başarılı bir şekilde eklendi, kullanıcı şifresi e-posta gönderildi.",
                        "type"  => "success"
                    );
                } else {
                    $alert = array(
                        "title" => "İşlem Başarısız",
                        "text" => "E-posta gönderimi sırasında bir problem oluştu",
                        "type"  => "error"
                    );
                }
            } else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Kayıt Ekleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }


            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("users"));

            die();

        } else {

            $viewData = new stdClass();
            
            $viewData->user_roles = $this->user_role_model->get_all(
                array(
                    "isActive"  => 1
                )
            );

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "add";
            $viewData->form_error = true;

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function update_form($id){

        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
            )
        );
        
        $recruitmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->recruitmentDate)->format('d/m/Y');
        $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
        
        $item->recruitmentDate = $recruitmentDate;
        $item->birthDate = $birthDate;

        $viewData->user_roles = $this->user_role_model->get_all(
            array(
                "isActive"  => 1
            )
        );
        
        $viewData->titles = $this->title_model->get_all(
            array(
                "isActive"  => 1
            ), "rank ASC"
        );
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "update";
        $viewData->item = $item;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);


    }

    public function update_password_form($id){
        
        $user = get_active_user();
        
        if($user->id != $id && !isYetkili()) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Bu işlemi yapmaya yetkiniz bulunmamaktadır",
                "type"  => "error"
            );
            
            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("users"));
            die();
        }

        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
            )
        );

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "password";
        $viewData->item = $item;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);


    }

    public function update($id){

        $this->load->library("form_validation");

        $oldUser = $this->user_model->get(
            array(
                "id"    => $id
            )
        );


        if($oldUser->email != $this->input->post("email")){
            $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email|is_unique[users.email]");
        }

        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("recruitmentDate", "İşe Giriş Tarihi", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("birthPlace", "Doğum Yeri", "required|trim");
        $this->form_validation->set_rules("user_role_id", "Kullanıcı Rolü", "required|trim");
        
        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){
            // Upload Süreci...
            
            $recruitmentDate = DateTime::createFromFormat('d/m/Y', $this->input->post("recruitmentDate"));
            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            
            
            $update = $this->user_model->update(
                array("id" => $id),
                array(
                    "full_name"             => $this->input->post("full_name"),
                    "email"                 => $this->input->post("email"),
                    "recruitmentDate"       => $recruitmentDate->format('Y-m-d'),
                    "birthDate"             => $birthDate->format('Y-m-d'),
                    "birthPlace"            => $this->input->post("birthPlace"),
                    "user_role_id"          => $this->input->post("user_role_id"),
                    "user_title_id"         => $this->input->post("user_title_id"),
                )
            );
            // TODO Alert sistemi eklenecek...
            if($update){
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Kayıt başarılı bir şekilde güncellendi",
                    "type"  => "success"
                );
            } else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Kayıt Güncelleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }
            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("users"));
        } else {
            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "update";
            $viewData->form_error = true;

            /** Tablodan Verilerin Getirilmesi.. */
            $viewData->item = $this->user_model->get(
                array(
                    "id"    => $id,
                )
            );

            $viewData->user_roles = $this->user_role_model->get_all(
                array(
                    "isActive"  => 1
                )
            );
            
            $viewData->titles = $this->title_model->get_all(
                array(
                    "isActive"  => 1
                ),
                "rank ASC"
            );

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function update_password($id){

        $this->load->library("form_validation");

        $this->form_validation->set_rules("password", "Şifre", "required|trim|min_length[6]|max_length[8]");
        $this->form_validation->set_rules("re_password", "Şifre Tekrar", "required|trim|min_length[6]|max_length[8]|matches[password]");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "matches"     => "Şifreler birbirlerini tutmuyor"
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){

            // Upload Süreci...
            $update = $this->user_model->update(
                array("id" => $id),
                array(
                    "password"      => md5($this->input->post("password")),
                )
            );

            // TODO Alert sistemi eklenecek...
            if($update){

                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Şifreniz başarılı bir şekilde güncellendi",
                    "type"  => "success"
                );

            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Şifre Güncelleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }

            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("users"));

        } else {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "password";
            $viewData->form_error = true;

            /** Tablodan Verilerin Getirilmesi.. */
            $viewData->item = $this->user_model->get(
                array(
                    "id"    => $id,
                )
            );

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function delete($id){

        $delete = $this->user_model->delete(
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
                "title" => "İşlem Başarısız",
                "text" => "Kayıt silme sırasında bir problem oluştu",
                "type"  => "error"
            );


        }

        $this->session->set_flashdata("alert", $alert);
        redirect(base_url("users"));


    }

    public function isActiveSetter($id){

        if($id){

            $isActive = ($this->input->post("data") === "true") ? 1 : 0;

            $this->user_model->update(
                array(
                    "id"    => $id
                ),
                array(
                    "isActive"  => $isActive
                )
            );
        }
    }
    
    public function view_profile($id){
        
        $user = get_active_user();
        
        if($user && $user->id != $id) {
            
            redirect(base_url("users/view_profile/$user->id"));
            die();
        }
        
        
        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
            )
        );
        
        if($item){
            $title = $this->title_model->get(array("id" => $item->user_title_id));
            if($title) {
                $item->title = $title->title;
            } else {
                $item->title = "";
            }
        }
        
        $viewData = new stdClass();
        
        $viewData->user_roles = $this->user_role_model->get_all(
            array(
                "isActive"  => 1
            )
        );
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "view";
        $viewData->item = $item;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

}
