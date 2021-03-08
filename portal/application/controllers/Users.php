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
        $this->load->model("project_model");

        if(!get_active_user()){
            redirect(base_url("login"));
        }

    }

    public function index(){

        $viewData = new stdClass();

        $user = get_active_user();

        if(isYetkili()){
            $where = array("user_account_approve_date !=" => NULL);
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
            $project = $this->project_model->get(array("id" => $item->user_project_id));
            if($project) {
                $item->project = $project->title;
            } else {
                $item->project = "";
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
        
        $viewData->titles = $this->title_model->get_all(
            array(
                "isActive"  => 1
            ), "rank ASC"
        );
        
        $viewData->projects = $this->project_model->get_all(
            array(
                "isActive"  => 1
            ), "rank ASC"
        );

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "add";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

    }

    public function save(){

        $this->load->library("form_validation");

        // Kurallar yazilir..
        $this->form_validation->set_rules("tckn", "T.C Kimlik Numarası", "required|trim|is_unique[users.tckn]|min_length[11]|max_length[11]");
        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("gender", "Cinsiyet", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("birthPlace", "Doğum Yeri", "required|trim");
        $this->form_validation->set_rules("phone", "Telefon Numarası", "required|trim");
        $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email|is_unique[users.email]");
        $this->form_validation->set_rules("recruitmentDate", "İşe Giriş Tarihi", "required|trim");
        $this->form_validation->set_rules("user_role_id", "Kullanıcı Rolü", "required|trim");
        $this->form_validation->set_rules("user_title_id", "Unvan", "required|trim");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
                "min_length"  => "<b>{field}</b> 11 karakterden oluşmalıdır",
                "max_length"  => "<b>{field}</b> 11 karakterden oluşmalıdır",
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){
            
            $this->load->helper("string");
            $temp_password = random_string();
            $title = $this->input->post("user_title_id") == "null" ? null : $this->input->post("user_title_id");
            $project = $this->input->post("user_project_id") == "null" ? null : $this->input->post("user_project_id");
            
            $recruitmentDate = DateTime::createFromFormat('d/m/Y', $this->input->post("recruitmentDate"));
            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            
            $insert = $this->user_model->add(
                array(
                    "tckn"                      => $this->input->post("tckn"),
                    "full_name"                 => $this->input->post("full_name"),
                    "gender"                    => $this->input->post("gender"),
                    "birthDate"                 => $birthDate->format('Y-m-d'),
                    "birthPlace"                => $this->input->post("birthPlace"),
                    "phone"                     => $this->input->post("phone"),
                    "email"                     => $this->input->post("email"),
                    "password"                  => md5($temp_password),
                    "recruitmentDate"           => $recruitmentDate->format('Y-m-d'),
                    "user_role_id"              => $this->input->post("user_role_id"),
                    "user_title_id"             => $title,
                    "user_project_id"           => $project,
                    "isActive"                  => 1,
                    "user_account_approve_date" => date("Y-m-d H:i:s"),
                    "createdAt"                 => date("Y-m-d H:i:s")
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
            $viewData->titles = $this->title_model->get_all(
                array(
                    "isActive"  => 1
                ), "rank ASC"
            );
            
            $viewData->projects = $this->project_model->get_all(
                array(
                    "isActive"  => 1
                ), "rank ASC"
            );

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "add";
            $viewData->form_error = true;
            
            $viewData->tckn = $this->input->post("tckn");
            $viewData->full_name = $this->input->post("full_name");
            $viewData->gender = $this->input->post("gender");
            $viewData->birthDate = $this->input->post("birthDate");
            $viewData->birthPlace = $this->input->post("birthPlace");
            $viewData->phone = $this->input->post("phone");
            $viewData->email = $this->input->post("email");
            $viewData->recruitmentDate = $this->input->post("recruitmentDate");
            $viewData->user_role_id = $this->input->post("user_role_id");
            $viewData->user_title_id = $this->input->post("user_title_id");
            $viewData->user_project_id = $this->input->post("user_project_id");

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
        
        if(!empty($item->recruitmentDate)) {
            $recruitmentDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->recruitmentDate)->format('d/m/Y');
            $item->recruitmentDate = $recruitmentDate;
        }
        if(!empty($item->birthDate)) {
            $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
            $item->birthDate = $birthDate;
        }

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
        
        
        $viewData->projects = $this->project_model->get_all(
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

        // Kurallar yazilir..
        $this->form_validation->set_rules("tckn", "T.C Kimlik Numarası", "required|trim|is_unique[users.tckn]|min_length[11]|max_length[11]");
        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("gender", "Cinsiyet", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("birthPlace", "Doğum Yeri", "required|trim");
        $this->form_validation->set_rules("phone", "Telefon Numarası", "required|trim");
        $this->form_validation->set_rules("recruitmentDate", "İşe Giriş Tarihi", "required|trim");
        $this->form_validation->set_rules("user_role_id", "Kullanıcı Rolü", "required|trim");
        $this->form_validation->set_rules("user_title_id", "Unvan", "required|trim");
        
        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
                "min_length"  => "<b>{field}</b> 11 karakterden oluşmalıdır",
                "max_length"  => "<b>{field}</b> 11 karakterden oluşmalıdır",
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){
            // Upload Süreci...
            
            $recruitmentDate = DateTime::createFromFormat('d/m/Y', $this->input->post("recruitmentDate"));
            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            
            $title = $this->input->post("user_title_id") == "null" ? null : $this->input->post("user_title_id");
            $project = $this->input->post("user_project_id") == "null" ? null : $this->input->post("user_project_id");
            
            $update = $this->user_model->update(
                array("id" => $id),
                array(
                    "tckn"                  => $this->input->post("tckn"),
                    "full_name"             => $this->input->post("full_name"),
                    "gender"                => $this->input->post("gender"),
                    "birthDate"             => $birthDate->format('Y-m-d'),
                    "birthPlace"            => $this->input->post("birthPlace"),
                    "phone"                 => $this->input->post("phone"),
                    "email"                 => $this->input->post("email"),
                    "recruitmentDate"       => $recruitmentDate->format('Y-m-d'),
                    "user_role_id"          => $this->input->post("user_role_id"),
                    "user_title_id"         => $title,
                    "user_project_id"       => $project
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
            
            $viewData->projects = $this->project_model->get_all(
                array(
                    "isActive"  => 1
                ), "rank ASC"
            );

            
            $viewData->tckn = $this->input->post("tckn");
            $viewData->full_name = $this->input->post("full_name");
            $viewData->gender = $this->input->post("gender");
            $viewData->birthDate = $this->input->post("birthDate");
            $viewData->birthPlace = $this->input->post("birthPlace");
            $viewData->phone = $this->input->post("phone");
            $viewData->email = $this->input->post("email");
            $viewData->recruitmentDate = $this->input->post("recruitmentDate");
            $viewData->user_role_id = $this->input->post("user_role_id");
            $viewData->user_title_id = $this->input->post("user_title_id");
            $viewData->user_project_id = $this->input->post("user_project_id");
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function update_password($id){

        $this->load->library("form_validation");

        $this->form_validation->set_rules("password", "Şifre", "required|trim|min_length[6]|max_length[15]");
        $this->form_validation->set_rules("re_password", "Şifre Tekrar", "required|trim|min_length[6]|max_length[15]|matches[password]");

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
                $user = $this->user_model->get(
                    array(
                        "id"    => $id,
                    )
                );

                $updatepasswordhtml = file_get_contents(base_url("updatepassword.html"));
                $message = str_replace("APP_TEMP_PASSWORD", $this->input->post("password"), $updatepasswordhtml);
                
                $send = send_email(
                    $user->email,
                    "Şifreniz Güncellendi",
                    $message
                );
                
                if($send){
                    $alert = array(
                        "title" => "İşlem Başarılı",
                        "text" => "Şifre başarılı bir şekilde güncellendi, kullanıcı şifresi e-posta adresine gönderildi.",
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
            $project = $this->project_model->get(array("id" => $item->user_project_id));
            if($project) {
                $item->project = $project->title;
            } else {
                $item->project = "";
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
    
    public function view_all_active_users(){
        $viewData = new stdClass();
        
        /** Tablodan Verilerin Getirilmesi.. */
        $users = $this->user_model->get_all_users(
            array(
                "isActive"  => 1
            )
        );
        
        foreach($users as $user) {
            $title = $this->title_model->get(array("id" => $user->user_title_id));
            if($title) {
                $user->title = $title->title;
            } else {
                $user->title = "";
            }
            $project = $this->project_model->get(array("id" => $user->user_project_id));
            if($project) {
                $user->project = $project->title;
            } else {
                $user->project = "";
            }
        }
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "view_users";
        $viewData->users = $users;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    
    public function pending(){
        
        $viewData = new stdClass();
        
        $user = get_active_user();
        
        if(isYetkili()){
            $where = array();
        } else {
            $where = array(
                "id"    => $user->id
            );
        }
        
        /** Tablodan Verilerin Getirilmesi.. */
        $items = $this->user_model->get_all(
            $where = array(
                "isActive" => "0",
                "user_account_approve_date =" => NULL
            ),
            $order = "createdAt ASC"
        );
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "pending_list";
        $viewData->items = $items;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }
    
    public function approve_form($id){
        
        $viewData = new stdClass();
        
        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
            )
        );
        
        if(!empty($item->birthDate)) {
            $birthDate = DateTime::createFromFormat('Y-m-d H:i:s', $item->birthDate)->format('d/m/Y');
            $item->birthDate = $birthDate;
        }
        
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
        
        
        $viewData->projects = $this->project_model->get_all(
            array(
                "isActive"  => 1
            ), "rank ASC"
        );
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "approve_form";
        $viewData->item = $item;
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        
    }
    
    public function approve($id){
        
        $this->load->library("form_validation");
        
        $oldUser = $this->user_model->get(
            array(
                "id"    => $id
            )
        );
        
        
        if($oldUser->email != $this->input->post("email")){
            $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email|is_unique[users.email]");
        }
        if($oldUser->tckn != $this->input->post("tckn")){
            $this->form_validation->set_rules("tckn", "T.C Kimlik Numarası", "required|trim|is_unique[users.tckn]|min_length[11]|max_length[11]");
        }
        // Kurallar yazilir..
        
        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("gender", "Cinsiyet", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("birthPlace", "Doğum Yeri", "required|trim");
        $this->form_validation->set_rules("phone", "Telefon Numarası", "required|trim");
        $this->form_validation->set_rules("recruitmentDate", "İşe Giriş Tarihi", "required|trim");
        $this->form_validation->set_rules("user_role_id", "Kullanıcı Rolü", "required|trim");
        $this->form_validation->set_rules("user_title_id", "Unvan", "required|trim");
        
        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
                "min_length"  => "<b>{field}</b> 11 karakterden oluşmalıdır",
                "max_length"  => "<b>{field}</b> 11 karakterden oluşmalıdır",
            )
        );
        
        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();
        
        if($validate){
            
            $recruitmentDate = DateTime::createFromFormat('d/m/Y', $this->input->post("recruitmentDate"));
            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            
            $title = $this->input->post("user_title_id") == "null" ? null : $this->input->post("user_title_id");
            $project = $this->input->post("user_project_id") == "null" ? null : $this->input->post("user_project_id");
            
            $update = $this->user_model->update(
                array("id" => $id),
                array(
                    "tckn"                  => $this->input->post("tckn"),
                    "full_name"             => $this->input->post("full_name"),
                    "gender"                => $this->input->post("gender"),
                    "birthDate"             => $birthDate->format('Y-m-d'),
                    "birthPlace"            => $this->input->post("birthPlace"),
                    "phone"                 => $this->input->post("phone"),
                    "email"                 => $this->input->post("email"),
                    "recruitmentDate"       => $recruitmentDate->format('Y-m-d'),
                    "user_role_id"          => $this->input->post("user_role_id"),
                    "user_title_id"         => $title,
                    "user_project_id"       => $project,
                    "isActive"              => "1",
                    "user_account_approve_date" => date("Y-m-d H:i:s")
                )
            );
            
            // TODO Alert sistemi eklenecek...
            if($update){
                //EPOSTA GONDERILECEK
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Kullanıcı kaydı başarılı bir şekilde onaylandı",
                    "type"  => "success"
                );
            } else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Kullanıcı onaylama işlemi sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }
            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);
            
            redirect(base_url("users/pending"));
        } else {
            $viewData = new stdClass();
            
            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "approve_form";
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
            
            $viewData->projects = $this->project_model->get_all(
                array(
                    "isActive"  => 1
                ), "rank ASC"
            );
            
            
            $viewData->tckn = $this->input->post("tckn");
            $viewData->full_name = $this->input->post("full_name");
            $viewData->gender = $this->input->post("gender");
            $viewData->birthDate = $this->input->post("birthDate");
            $viewData->birthPlace = $this->input->post("birthPlace");
            $viewData->phone = $this->input->post("phone");
            $viewData->email = $this->input->post("email");
            $viewData->recruitmentDate = $this->input->post("recruitmentDate");
            $viewData->user_role_id = $this->input->post("user_role_id");
            $viewData->user_title_id = $this->input->post("user_title_id");
            $viewData->user_project_id = $this->input->post("user_project_id");
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }
        
    }
}
