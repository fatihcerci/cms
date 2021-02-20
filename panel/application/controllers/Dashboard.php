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

	    $employee_count = $this->dashboard_model->get_employee_count();
	    $published_blog_count = $this->dashboard_model->get_published_blog_count();
	    
	    $latestPublishedBlogs = $this->dashboard_model->get_published_blogs();
	    
	    $pendingApprovalBlogs = $this->dashboard_model->get_pending_approval_blogs();
	    
	    $employees = $this->dashboard_model->get_employees();
	    
	    
	    
	    $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "list";
        $viewData->employeeCount = $employee_count;
        $viewData->employees = $employees;
        $viewData->publishedBlogCount = $published_blog_count;
        $viewData->latestPublishedBlogs = $latestPublishedBlogs;
        $viewData->pendingApprovalBlogs = $pendingApprovalBlogs;

		$this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
	}
}
