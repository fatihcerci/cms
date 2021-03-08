<?php

class Userop extends CI_Controller {

    public $viewFolder = "";

    public function __construct()
    {
        parent::__construct();

        $this->viewFolder = "users_v";

        $this->load->model("user_model");

    }

    public function login()
    {
        if(get_active_user()){
            redirect(base_url());
        }

        $viewData = new stdClass();

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "login";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    public function do_login()
    {
        if(get_active_user()){
            redirect(base_url());
        }

        $this->load->library("form_validation");

        // Kurallar yazilir..
        $this->form_validation->set_rules("user_email", "E-posta", "required|trim|valid_email");
        $this->form_validation->set_rules("user_password", "Şifre", "required|trim|min_length[6]|max_length[15]");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "min_length"  => "<b>{field}</b> en az 6 karakterden oluşmalıdır",
                "max_length"  => "<b>{field}</b> en fazla 15 karakterden oluşmalıdır",
            )
        );

        // Form Validation Calistirilir..
        if($this->form_validation->run() == FALSE){

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "login";
            $viewData->form_error = true;

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

        } else {


            $user = $this->user_model->get(
                array(
                    "email"     => $this->input->post("user_email"),
                    "password"  => md5($this->input->post("user_password")),
                )
            );

            if($user){
                
                if($user->isActive == "1") {
                    $alert = array(
                        "title" => "Giriş Başarılı",
                        "text" => "$user->full_name hoşgeldiniz",
                        "type"  => "success"
                    );
                    
                    /********** Kullanici Yetkilerinin Session'a Aktarilmasi ************/
                    setUserRoles();
                    /*********************************************************************/
                    
                    $this->session->set_userdata("user", $user);
                    $this->session->set_flashdata("alert", $alert);
                    
                    
                    redirect(base_url());
                } else {
                    
                    // Hata Verilecek...
                    
                    $alert = array(
                        "title" => "İşlem Başarısız",
                        "text" => "Kullanıcınız aktif değildir, lütfen daha sonra tekrar deneyiniz",
                        "type"  => "error"
                    );
                    
                    $this->session->set_flashdata("alert", $alert);
                    
                    redirect(base_url("login"));
                }

            } else {

                // Hata Verilecek...

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Lütfen giriş bilgilerinizi kontrol ediniz",
                    "type"  => "error"
                );

                $this->session->set_flashdata("alert", $alert);

                redirect(base_url("login"));

            }
        }
    }

    public function logout(){

        $this->session->unset_userdata("user");
        redirect(base_url("login"));

    }

    public function forget_password(){


        if(get_active_user()){
            redirect(base_url());
        }

        $viewData = new stdClass();

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "forget_password";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

    }

    public function reset_password(){

        $this->load->library("form_validation");

        // Kurallar yazilir..
        $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir <b>e-posta</b> adresi giriniz",
            )
        );

        if($this->form_validation->run() === FALSE){

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "forget_password";
            $viewData->form_error = true;

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

        } else {

            $user = $this->user_model->get(
                array(
                    "isActive"  => 1,
                    "email"     => $this->input->post("email")
                )
            );

            if($user){

                $this->load->helper("string");
                $temp_password = random_string();
                
                $resetpasswordhtml = file_get_contents(base_url("resetpassword.html"));
                $message = str_replace("APP_TEMP_PASSWORD",$temp_password,$resetpasswordhtml);
                
                $send = send_email(
                    $user->email, 
                    "Şifremi Unuttum", 
                    $message);

                if($send){
                    echo "E-posta başarılı bir şekilde gonderilmiştir..";

                    $this->user_model->update(
                        array(
                            "id"    => $user->id
                        ),
                        array(
                            "password"  => md5($temp_password)
                        )
                    );


                    $alert = array(
                        "title" => "İşlem Başarılı",
                        "text" => "Şifreniz başarılı bir şekilde resetlendi. Lütfen E-postanızı kontrol ediniz!",
                        "type"  => "success"
                    );

                    $this->session->set_flashdata("alert", $alert);

                    redirect(base_url("login"));

                    die();


                } else {

//                    echo $this->email->print_debugger();
                    $alert = array(
                        "title" => "İşlem Başarısız",
                        "text" => "E-posta gönderilirken bir problem oluştu!!",
                        "type"  => "error"
                    );

                    $this->session->set_flashdata("alert", $alert);

                    redirect(base_url("sifremi-unuttum"));

                    die();

                }

            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Böyle bir kullanıcı kaydı bulunmamaktadır",
                    "type"  => "error"
                );

                $this->session->set_flashdata("alert", $alert);

                redirect(base_url("sifremi-unuttum"));


            }


        }

    }
    
    public function getResetPasswordMailContent($tempPass) {
        
       
    }

    public function sign_up()
    {
        if(get_active_user()){
            redirect(base_url());
        }
        
        $this->load->model("project_model");
        
        $viewData = new stdClass();
        
        $viewData->projects = $this->project_model->get_all(
            array(
                "isActive"  => 1
            ), "rank ASC"
        );
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "sign_up";
        
        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        
    }
    
    public function do_sign_up(){
        
        $this->load->library("form_validation");
        
        // Kurallar yazilir..
        $this->form_validation->set_rules("tckn", "T.C Kimlik Numarası", "required|trim|is_unique[users.tckn]");
        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("birthDate", "Doğum Tarihi", "required|trim");
        $this->form_validation->set_rules("birthPlace", "Doğum Yeri", "required|trim");
        $this->form_validation->set_rules("phone", "Telefon Numarası", "required|trim");
        $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email|is_unique[users.email]");
        $this->form_validation->set_rules("password", "Şifre", "required|trim|min_length[6]|max_length[15]");
        $this->form_validation->set_rules("re_password", "Şifre Tekrar", "required|trim|matches[password]");
        
        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
                "matches"     => "Şifreler birbirlerini tutmuyor",
                "min_length"  => "<b>{field}</b> en az 6 karakterden oluşmalıdır",
                "max_length"  => "<b>{field}</b> en fazla 15 karakterden oluşmalıdır",
            )
        );
        
        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();
        
        if($validate){
            
            $this->load->helper("string");
            
            $birthDate = DateTime::createFromFormat('d/m/Y', $this->input->post("birthDate"));
            
            $insert = $this->user_model->add(
                array(
                    "tckn"              => $this->input->post("tckn"),
                    "full_name"         => $this->input->post("full_name"),
                    "birthDate"         => $birthDate->format('Y-m-d'),
                    "birthPlace"        => $this->input->post("birthPlace"),
                    "phone"             => $this->input->post("phone"),
                    "email"             => $this->input->post("email"),
                    "password"          => md5($this->input->post("password")),
                    "isActive"          => 0,
                    "createdAt"         => date("Y-m-d H:i:s")
                )
            );
            
            if($insert){
                
                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text"  => "Kullanıcı kaydınız başarılı bir şekilde eklendi, yönetici onayından sonra uygulamaya giriş yapabilirsiniz.",
                    "type"  => "success"
                );
               
            } else {
                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Kayıt Ekleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }
            
            
            $this->session->set_flashdata("alert", $alert);
            
            redirect(base_url("login"));
            
            die();
            
        } else {
            
            $viewData = new stdClass();
            
            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "sign_up";
            $viewData->form_error = true;
            
            $viewData->tckn = $this->input->post("tckn");
            $viewData->full_name = $this->input->post("full_name");
            $viewData->birthDate = $this->input->post("birthDate");
            $viewData->birthPlace = $this->input->post("birthPlace");
            $viewData->phone = $this->input->post("phone");
            $viewData->email = $this->input->post("email");
            $viewData->password = $this->input->post("password");
            
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }
        
    }

}
