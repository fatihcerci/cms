<?php

class Dashboard_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function get_employee_count()
    {
        $this->db->select('*'); 
        $this->db->from('users');
        $this->db->where(array(
            "isActive"    => 1,
        ));
        
        $query = $this->db->get();
        return $query->num_rows();
    }
    
    public function get_employees()
    {
        $sql = "select full_name as full_name, CONCAT(DATEDIFF(CURDATE(), createdAt), ' gün önce') as gecenGun from users";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    public function get_published_blog_count()
    {
        $this->db->select('*');
        $this->db->from('blogs');
        $this->db->where(array(
            "isActive"    => 1,
            "publishDate !=" => NULL
        ));
        
        $query = $this->db->get();
        return $query->num_rows();
    }
    
    public function get_published_blogs()
    {
        $sql = "select 
                    u.full_name as full_name, 
                    CONCAT(DATEDIFF(CURDATE(), b.publishDate), ' gün önce') as gecenGun,
                    b.title 
                from blogs b, users u 
                where b.user_id = u.id and b.isActive = 1 and b.publishDate is not null
                order by b.publishDate DESC
                LIMIT 5";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    public function get_pending_approval_blogs()
    {
        $sql = "select
                    u.full_name as full_name,
                    CONCAT(DATEDIFF(CURDATE(), b.createdAt), ' gün önce') as gecenGun,
                    b.title
                from blogs b, users u
                where b.user_id = u.id and b.isActive = 0 and b.publishDate is null
                order by b.createdAt ASC
                LIMIT 5";
        $query = $this->db->query($sql);
        return $query->result_array();
    }

}
