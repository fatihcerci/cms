<?php

class Announcement_model extends CI_Model
{

    public $tableName = "announcements";

    public function __construct()
    {
        parent::__construct();
    }

    public function get($where = array())
    {
        return $this->db->where($where)->get($this->tableName)->row();
    }

    /** Tüm Kayıtları bana getirecek olan metot.. */
    public function get_all($where = array(), $order = "id ASC")
    {
        return $this->db->where($where)->order_by($order)->get($this->tableName)->result();
    }

    public function add($data = array())
    {
        return $this->db->insert($this->tableName, $data);
    }

    public function update($where = array(), $data = array())
    {
        return $this->db->where($where)->update($this->tableName, $data);
    }

    public function delete($where = array())
    {
        return $this->db->where($where)->delete($this->tableName);
    }
    
    public function get_last_announcement($user_id, $user_project_id) 
    {
        $sql = "select 
                    a.id,
                    a.title,
                    a.description, 
                    a.createdAt,
                    u.full_name,
                    a.project_id
                from announcements a, users u 
                where a.isActive=1 and a.user_id = u.id and a.user_id != ? and (a.project_id = 0 or a.project_id = ?) order by a.createdAt desc LIMIT 1";
        $query = $this->db->query($sql, array($user_id, $user_project_id));
        return $query->row();
    }
    
    public function get_view_announcement($id)
    {
        $sql = "select
                    a.id,
                    a.title,
                    a.description,
                    a.createdAt,
                    u.full_name,
                    a.project_id,
                    a.user_id
                from announcements a, users u
                where a.isActive=1 and a.id = ?";
        $query = $this->db->query($sql, array($id));
        return $query->row();
    }

}
