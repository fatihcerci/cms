<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

    public $viewFolder = "";
//    public $user;

    public function __construct()
    {
        parent::__construct();

        $this->viewFolder = "dashboard_v";
        $this->load->model("dashboard_model");
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

	    /********** Kullanici Yetkilerinin Session'a Aktarilmasi ************/
	    setUserRoles();
	    /*********************************************************************/
	    
	    $employee_count = $this->dashboard_model->get_employee_count();
	    $published_blog_count = $this->dashboard_model->get_published_blog_count();
	    
	    $latestPublishedBlogs = $this->dashboard_model->get_published_blogs();
	    
	    $pendingApprovalBlogsCount = $this->dashboard_model->get_pending_approval_blogs_count();
	    $pendingApprovalBlogs = $this->dashboard_model->get_pending_approval_blogs();
	    
	    $user = $this->this->session->userdata("user");
	    $duyurular = $this->dashboard_model->get_announcements($user->id, $user->user_project_id);
	    
	    $dogumGunuYaklasanCalisanlar = $this->dashboard_model->get_dogum_gunu_yaklasan_calisanlar();
	    
	    
	    
	    $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "list";
        
        $viewData->employeeCount = $employee_count;
        $viewData->publishedBlogCount = $published_blog_count;
        $viewData->testimonialsCount = 0;
        
        $viewData->latestPublishedBlogs = $latestPublishedBlogs;
        $viewData->pendingApprovalBlogsCount = $pendingApprovalBlogsCount;
        $viewData->pendingApprovalBlogs = $pendingApprovalBlogs;
        
        $viewData->duyurular = $duyurular;
        $viewData->dogumGunuYaklasanCalisanlar = $dogumGunuYaklasanCalisanlar;
        
        $user = $this->this->session->userdata("user");
        $viewData->notifications = $this->notification_model->get_notifications($user->id);

		$this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
	}
	
	public function duyuru_bir_daha_gosterme() 
	{
	    $popup_id = $this->input->post("popup_id");
	    set_cookie($popup_id, "true", 60 * 60 * 24 * 365);
	}
	
	public function bildirimler_goruldu()
	{
	    $user = $this->this->session->userdata("user");
	    $insert = $this->notification_model->insert_user_seen_notifications($user->id);
	}
	
	public function get_bildirim_count()
	{
	    $user = $this->this->session->userdata("user");
	    $bildirimCount = $this->notification_model->get_notifications_count($user->id);
	    echo $bildirimCount;
	}
	
	public function get_notifications()
	{
	    $user = $this->this->session->userdata("user");
	    $notifications = $this->notification_model->get_notifications($user->id);
	    
	    $viewData = new stdClass();
	    $viewData->notifications = $notifications;
	    
	    $render_html = $this->load->view("includes/notification_bar", $viewData, true);
	    
	    echo $render_html;
	}
}

