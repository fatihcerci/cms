<?php

class Notification_model extends CI_Model
{

    public $tableName = "notifications";

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
    
    public function get_notifications($user_id) 
    {
        $sql = "SELECT 
                    x.id,
                    x.description,
                    x.url,
                    x.full_name,
                    CASE
                        WHEN x.gun > 0 THEN CONCAT(x.gun, ' gün önce')
                        WHEN x.saat > 0 THEN  CONCAT(x.saat, ' saat önce')
                        WHEN x.gun = 0 AND x.saat = 0 AND x.dakika != 0 THEN CONCAT(x.dakika, ' dakika önce')
                    ELSE '1 dakika önce' END as gecenSure,
                    x.goruldu
                FROM
                (SELECT
                    n.id,
                    n.description,
                    n.url,
                    u.full_name,
                    TIMESTAMPDIFF(day,n.createdAt, CURRENT_TIMESTAMP()) as gun,
                    MOD( TIMESTAMPDIFF(hour,n.createdAt, CURRENT_TIMESTAMP()), 24) as saat,
                    MOD( TIMESTAMPDIFF(minute,n.createdAt, CURRENT_TIMESTAMP()), 60) as dakika,
                    n.createdAt,
                    CASE
                        WHEN (select notification_id from user_seen_notifications where notification_id = n.id) IS NOT NULL THEN 1
                        ELSE 0 END AS goruldu
                FROM
                    notifications n,
                    users u
                WHERE n.user_id = u.id and n.user_id != ?
                ORDER BY n.createdAt DESC
                LIMIT 5
                ) x";
        $query = $this->db->query($sql, array($user_id));
        return $query->result_array();
    }
    
    public function get_notifications_count($user_id)
    {
        $sql = "SELECT
                    n.id,
                    n.description,
                    n.url,
                    u.full_name,
                    TIMESTAMPDIFF(day,n.createdAt, CURRENT_TIMESTAMP()) as gun,
                    MOD( TIMESTAMPDIFF(hour,n.createdAt, CURRENT_TIMESTAMP()), 24) as saat,
                    MOD( TIMESTAMPDIFF(minute,n.createdAt, CURRENT_TIMESTAMP()), 60) as dakika,
                    n.createdAt
                FROM
                    notifications n,
                    users u
                WHERE n.user_id = u.id and n.user_id != ? and n.id not in (select notification_id from user_seen_notifications where user_id = ?)";
        $query = $this->db->query($sql, array($user_id, $user_id));
        return $query->num_rows();
    }
    
    public function insert_user_seen_notifications($user_id)
    {
        $timeToSee = date("Y-m-d H:i:s");
        $sql = "insert into user_seen_notifications (notification_id,user_id,timeToSee)
                select id, ?, ? from notifications where user_id != ? and id not in (select notification_id from user_seen_notifications where user_id = ?)";
        
        return $this->db->query($sql, array($user_id, $timeToSee, $user_id, $user_id));
    }

}
