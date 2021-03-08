<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Notifications extends CI_Controller {

    public $viewFolder = "";
//    public $user;

    public function __construct()
    {
        parent::__construct();

        $this->viewFolder = "notifications_v";
        $this->load->model("user_model");
        $this->load->model("notification_model");
        $this->this = &get_instance();
//        $this->user = get_active_user();

        if(!get_active_user()){
            redirect(base_url("login"));
        }
    }

    public function index()
	{
	    $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "view_notifications";
        
        $notifications = $this->notification_model->get_notifications($user->id);
        
        
        $user = $this->this->session->userdata("user");
        $viewData->user_all_notifications = $this->notification_model->get_all_notifications($user->id);
        $viewData->notifications = $notifications;

		$this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
	}

	public function view_all_notifications(){
	    $viewData = new stdClass();
	    
	    $user = $this->this->session->userdata("user");
	    /** Tablodan Verilerin Getirilmesi.. */
	    $user_all_notifications = $this->notification_model->get_all_notifications($user->id);
	    $notifications = $this->notification_model->get_notifications($user->id);
	    
	    /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
	    $viewData->viewFolder = $this->viewFolder;
	    $viewData->subViewFolder = "view_notifications";
	    $viewData->user_all_notifications = $user_all_notifications;
	    $viewData->notifications = $notifications;
	    
	    $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
	}

}

