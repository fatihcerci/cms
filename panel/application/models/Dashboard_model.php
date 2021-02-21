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
                    CASE WHEN DATEDIFF(CURDATE(), b.publishDate) = 0 THEN 'Bugün' 
                    ELSE CONCAT(DATEDIFF(CURDATE(), b.publishDate), ' gün önce') END as gecenGun,
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
                    case when DATEDIFF(CURDATE(), b.createdAt) = 0 then 'Bugün'
                    else CONCAT(DATEDIFF(CURDATE(), b.createdAt), ' gün önce') end as gecenGun,
                    b.title
                from blogs b, users u
                where b.user_id = u.id and b.isActive = 0 and b.publishDate is null
                order by b.createdAt ASC
                LIMIT 5";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    public function get_dogum_gunu_yaklasan_calisanlar()
    {
        $sql = "SELECT 
                    a.full_name, 
                    a.birthDate,
                    a.kalanGun,
                    CASE 
                        WHEN a.kalanGun = 0 THEN 'Bugün doğum günü!'
                        ELSE CONCAT(a.kalanGun, ' gün kaldı') 
                    END AS kalan
                FROM (
                    SELECT 
                        full_name, 
                        birthDate, 
                        CASE WHEN MONTH(birthDate) < MONTH(CURDATE()) OR (MONTH(birthDate) = MONTH(CURDATE()) AND DAY(birthDate) < DAY(CURDATE()))
                            THEN DATEDIFF(CAST(CONCAT(YEAR(CURDATE()) + 1, '-', MONTH(birthDate), '-', DAY(birthDate)) AS DATE), CURDATE()) 
                            ELSE DATEDIFF(CAST(CONCAT(YEAR(CURDATE()), '-', MONTH(birthDate), '-', DAY(birthDate)) AS DATE), CURDATE()) 
                        END AS kalanGun
                    from users 
                    where birthDate is not null and isActive = 1
                    LIMIT 5
                ) a
                ORDER BY a.kalanGun ASC";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    public function get_announcements()
    {
        $sql = "SELECT 
                    x.full_name,
                    x.title,
                    x.createdAt,
                    CASE
                        WHEN x.gun != 0 AND x.saat != 0 AND x.dakika != 0 THEN CONCAT(x.gun, ' gün ', x.saat, ' saat', x.dakika, ' dakika önce')
                        WHEN x.gun = 0 AND x.saat != 0 AND x.dakika != 0 THEN CONCAT(x.saat, ' saat ', x.dakika, ' dakika önce')
                        WHEN x.gun = 0 AND x.saat = 0 AND x.dakika != 0 THEN CONCAT(x.dakika, ' dakika önce')
                    ELSE '1 dakika önce' END as gecenSure
                FROM
                (SELECT
                    u.full_name,
                    a.title,
                    TIMESTAMPDIFF(day,a.createdAt, CURRENT_TIMESTAMP()) as gun,
                    MOD( TIMESTAMPDIFF(hour,a.createdAt, CURRENT_TIMESTAMP()), 24) as saat,
                    MOD( TIMESTAMPDIFF(minute,a.createdAt, CURRENT_TIMESTAMP()), 60) as dakika,
                    a.createdAt
                FROM
                    announcements a,
                    users u
                WHERE a.user_id = u.id AND a.isActive = 1
                ORDER BY a.createdAt DESC
                LIMIT 5
                ) x";
        
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    public function get_testimonials_count()
    {
        $this->db->select('*');
        $this->db->from('testimonials');
        $this->db->where(array(
            "isActive"    => 1,
        ));
        
        $query = $this->db->get();
        return $query->num_rows();
    }
}
