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
	    $testimonials_count = $this->dashboard_model->get_testimonials_count();
	    
	    $latestPublishedBlogs = $this->dashboard_model->get_published_blogs();
	    
	    $pendingApprovalBlogsCount = $this->dashboard_model->get_pending_approval_blogs_count();
	    $pendingApprovalBlogs = $this->dashboard_model->get_pending_approval_blogs();
	    
	    $duyurular = $this->dashboard_model->get_announcements();
	    
	    $dogumGunuYaklasanCalisanlar = $this->dashboard_model->get_dogum_gunu_yaklasan_calisanlar();
	    
	    
	    
	    $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "list";
        
        $viewData->employeeCount = $employee_count;
        $viewData->publishedBlogCount = $published_blog_count;
        $viewData->testimonialsCount = $testimonials_count;
        
        $viewData->latestPublishedBlogs = $latestPublishedBlogs;
        $viewData->pendingApprovalBlogsCount = $pendingApprovalBlogsCount;
        $viewData->pendingApprovalBlogs = $pendingApprovalBlogs;
        
        $viewData->duyurular = $duyurular;
        $viewData->dogumGunuYaklasanCalisanlar = $dogumGunuYaklasanCalisanlar;

		$this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
	}
	
	public function duyuru_bir_daha_gosterme() 
	{
	    $popup_id = $this->input->post("popup_id");
	    set_cookie($popup_id, "true", 60 * 60 * 24 * 365);
	}
}

