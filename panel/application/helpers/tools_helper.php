<?php

function convertToSEO($text)
{

    $turkce = array("ç", "Ç", "ğ", "Ğ", "ü", "Ü", "ö", "Ö", "ı", "İ", "ş", "Ş", ".", ",", "!", "'", "\"", " ", "?", "*", "_", "|", "=", "(", ")", "[", "]", "{", "}");
    $convert = array("c", "c", "g", "g", "u", "u", "o", "o", "i", "i", "s", "s", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-");

    return strtolower(str_replace($turkce, $convert, $text));

}

function removeTurkishChar($text)
{
    
    $turkce = array("ç", "Ç", "ğ", "Ğ", "ü", "Ü", "ö", "Ö", "ı", "İ", "ş", "Ş", ".", ",", "!", "'", "\"", " ", "?", "*", "_", "|", "=", "(", ")", "[", "]", "{", "}");
    $convert = array("c", "C", "g", "G", "u", "U", "o", "O", "i", "I", "s", "S", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-");
    
    return str_replace($turkce, $convert, $text);
    
}


function get_readable_date($date)
{
    if(isset($date)) {
        setlocale(LC_ALL, 'tr_TR.UTF-8');
        date_default_timezone_set("Europe/Istanbul");
        
        return strftime('%d/%m/%Y', strtotime($date));
    }
    return "";
}

function get_readable_datetime($date)
{
    if(isset($date)) {
        setlocale(LC_ALL, 'tr_TR.UTF-8');
        date_default_timezone_set("Europe/Istanbul");
        
        return strftime('%d/%m/%Y %H:%M', strtotime($date));
    }
    return "";
}

function get_active_user(){

    $t = &get_instance();

    $user = $t->session->userdata("user");

    if($user)
        return $user;
    else
        return false;

}

function isAdmin(){

    $t = &get_instance();

    $user = $t->session->userdata("user");

    return true;

    if($user->user_role == "admin")
        return true;
    else
        return false;
}

function isAllowedViewModule( $moduleName = ""){

    $t          = &get_instance();
    $moduleName = ($moduleName == "") ? $t->router->fetch_class() : $moduleName;

    $user = get_active_user();
    $user_roles = get_user_roles();

    if (isset($user_roles[$user->user_role_id])){
        $permission = json_decode($user_roles[$user->user_role_id]);
        if(isset($permission->$moduleName) && isset($permission->$moduleName->read)){
            return true;
        }
    }

    return false;
}

function get_user_roles(){

    $t = &get_instance();
    return $t->session->userdata("user_roles");
}

function setUserRoles(){

    $t = &get_instance();

    $t->load->model("user_role_model");

    $user_roles = $t->user_role_model->get_all(
        array(
            "isActive"  => 1
        )
    );

    $roles = [];
    foreach ($user_roles as $role){
        $roles[$role->id] = $role->permissions;
    }
    $t->session->set_userdata("user_roles", $roles);

}

function getControllerList(){

    $t = &get_instance();

    $controllers = array();
    $t->load->helper("file");

    $files = get_dir_file_info(APPPATH. "controllers", FALSE);

    foreach (array_keys($files) as $file){
        if($file !== "index.html"){
            $controllers[] = strtolower(str_replace(".php", '', $file));
        }
    }

    return $controllers;

}


function send_email($toEmail = "", $subject = "", $message = ""){
    
    $t = &get_instance();

    $t->load->model("emailsettings_model");

    $email_settings = $t->emailsettings_model->get(
        array(
            "isActive"  => 1
        )
    );

    $config = array(
        "protocol"   => $email_settings->protocol,
        "smtp_host"  => $email_settings->host,
        "smtp_port"  => $email_settings->port,
        "smtp_user"  => $email_settings->user,
        "smtp_pass"  => $email_settings->password,
        "starttls"   => true,
        "charset"    => "utf-8",
        "mailtype"   => "html",
        "wordwrap"   => true,
        "newline"    => "\r\n"
    );

    $t->load->library("email", $config);

    $t->email->from($email_settings->from, $email_settings->user_name);
    $t->email->to($toEmail);
    $t->email->subject($subject);
    $t->email->message($message);

    return $t->email->send();

}

function get_settings(){

    $t = &get_instance();

    $t->load->model("settings_model");

    if($t->session->userdata("settings")){
        $settings = $t->session->userdata("settings");
    } else {

        $settings = $t->settings_model->get();
        
        if(!$settings) {
            $settings = new stdClass();
            $settings->company_name = "LENORA";
            $settings->logo         = "default";
        }
        $t->session->set_userdata("settings", $settings);

    }
    $settings->logoFolder = "settings_v";

    return $settings;

}


function get_category_title($category_id = 0){

    $t = &get_instance();

    $t->load->model("portfolio_category_model");

    $category = $t->portfolio_category_model->get(
        array(
            "id"    => $category_id
        )
    );

    if($category)
        return $category->title;
    else
        return "<b style='color:red'>Tanımlı Değil</b>";

}

function upload_picture($file, $uploadPath, $width, $height, $name){
    
    $t = &get_instance();
    $t->load->library("simpleimagelib");
    
    
    if(!is_dir("{$uploadPath}/{$width}x{$height}")){
        mkdir("{$uploadPath}/{$width}x{$height}");
    }
    
    $upload_error = false;
    try {
        
        $simpleImage = $t->simpleimagelib->get_simple_image_instance();
        
        $simpleImage
        ->fromFile($file)
        ->thumbnail($width,$height,'center')
        ->toFile("{$uploadPath}/{$width}x{$height}/$name", null, 75);
        
    } catch(Exception $err) {
        $error =  $err->getMessage();
        $upload_error = true;
    }
    
    if($upload_error){
        echo $error;
    } else {
        return true;
    }
    
    
}


function get_picture($path = "", $picture = "", $resolution = "50x50"){

    if($picture != ""){

        if(file_exists(FCPATH . "uploads/$path/$resolution/$picture")){
            $picture = base_url("uploads/$path/$resolution/$picture");
        } else {
            $picture = base_url("assets/assets/images/default_image.png");

        }

    } else {

        $picture = base_url("assets/assets/images/default_image.png");

    }

    return $picture;

}


function get_page_list($page){

    $page_list = array(
        "home_v"                => "Anasayfa",
        "about_v"               => "Hakkımızda Sayfası",
        "news_list_v"           => "Haberler Sayfası",
        "galleries"             => "Galeri Sayfası",
        "portfolio_list_v"      => "Portfolyo Sayfası",
        "reference_list_v"      => "Referanslar Sayfası",
        "service_list_v"        => "Hizmetler Sayfası",
        "course_list_v"         => "Eğitimler Sayfası",
        "brand_list_v"          => "Markalar Sayfası",
        "contact_v"             => "İletişim Sayfası",
    );


    return (empty($page)) ? $page_list : $page_list[$page];
}

function get_version(){
    
    $t = &get_instance();
    
    $t->load->model("settings_model");
    
    $settings = $t->settings_model->get();
        
    if(!$settings) {
        $settings = new stdClass();
        $settings->company_name = "LENORA";
        $settings->logo         = "default";
        $settings->version      = "v0.1";
    } else if ($settings && empty($settings->version)) {
        $settings->version      = "v0.1";
    }
    
    
    return $settings->version;
}

function get_days_left($startDate) {
    $gelecek = new DateTime($startDate);
    $bugun = new DateTime(date('d-m-Y'));
    $zamanFarki = $gelecek->diff($bugun);
    $kalanGun = $zamanFarki->format('%a');
    if (date($gelecekTarih) < date('d-m-Y')){
        $kalanGun = '-'.$kalanGun;
    }
    return $kalanGun;
}


function upload_logo($file, $uploadPath, $name){
    
    $t = &get_instance();
    $t->load->library("simpleimagelib");
    
    unlink("{$uploadPath}/{$name}");
    
    $upload_error = false;
    try {
        
        $simpleImage = $t->simpleimagelib->get_simple_image_instance();
        
        $simpleImage
        ->fromFile($file)
        ->toFile("{$uploadPath}/$name", null, 75);
        
    } catch(Exception $err) {
        $error =  $err->getMessage();
        $upload_error = true;
    }
    
    if($upload_error){
        echo $error;
    } else {
        return true;
    }
}

function get_logo($path = "", $picture = ""){
    
    if($picture != ""){
        if(file_exists(FCPATH . "uploads/$path/$picture")){
            $picture = base_url("uploads/$path/$picture");
        } else {
            $picture = base_url("assets/assets/images/default_image.png");
        }
        
    } else {
        $picture = base_url("assets/assets/images/default_image.png");
    }
    return $picture;
}

function isYetkili(){
    
    $t = &get_instance();
    
    $user = $t->session->userdata("user");
    
    if($user->user_role_id == 1)
        return true;
    else
        return false;
}


function get_last_announcement() {
    $t = &get_instance();
    
    $user = $t->session->userdata("user");
    $t->load->model("announcement_model");
    
    $last_announcement = $t->announcement_model->get_last_announcement($user->id, $user->user_project_id);
    return $last_announcement;
}

function get_notifications_count() {
    $t = &get_instance();
    
    $user = $t->session->userdata("user");
    $t->load->model("notification_model");
    
    $notificationsCount = $t->notification_model->get_notifications_count($user->id);
    return $notificationsCount;
}

function get_more_notifications() {
    $t = &get_instance();
    
    $user = $t->session->userdata("user");
    $t->load->model("notification_model");
    
    $user_all_notifications = $t->notification_model->get_more_notifications($user->id);
    return $user_all_notifications;
}

function get_view_announcement($id) {
    $t = &get_instance();
    $t->load->model("announcement_model");
    
    $viewAnnouncement = $t->announcement_model->get_view_announcement($id);
    return $viewAnnouncement;
}

