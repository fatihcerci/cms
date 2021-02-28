<style>
    a.notif {
        position: relative;
        display: block;
        height: 50px;
        width: 50px;
        text-decoration: none;
    }
    .num {
        position: absolute;
        top: 14px;
        border-radius: 100px;
        min-width: 10px;
        padding: 2px 3px;
        font-size: 10px;
        font-weight: bold;
        color: #fff;
        line-height: 1;
        vertical-align: middle;
        white-space: nowrap;
        text-align: center;
        background-color: #ff5b5b;
    }
    
    @media (max-width: 767px) {
      .num {
        right: -20px;
        top: -6px;
      }
      a.notif {
        width: 5px;
        color: #fff;
      } 
      
    }
      
    .navbar-toolbar > li > .dropdown-menu {
        width: 500px !important;
    }
    
    .media-group-item {
        padding: 2px 10px;
    }
    .navbar-toolbar > li > .dropdown-menu {
        padding-top:5px;
    }
</style>


<?php if(!$notifications) { ?>
	<a href="#" class="media-group-item">
    	<div class="media">
       		<div class="media-left">
          		
        	</div>
        	<div class="media-body" style="padding:8px; color:red; ">
          		<i class="fa fa-warning"></i> <small class="media-meta"><b>Yeni bildiriminiz bulunmamaktadır</b></small>
          		
        	</div>
      	</div>
    </a><!-- .media-group-item -->
<?php } ?>
    
    
<?php foreach($notifications as $key => $item) { ?>
	<a href="#" type="button" role="button" class="media-group-item" onclick=notifDetay("<?php echo $item['about']?>","<?php echo $item['about_id']?>") id="media<?php echo $key ?>" <?php if($item['goruldu']==1) { ?> style="opacity:0.5" <?php } ?> >
    	<div class="media">
       		<div class="media-left">
          		<div class="avatar avatar-md avatar-circle" style="margin-top: 6px;">
            		<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
          		</div>
        	</div>
        	<div class="media-body">
          		<h5 class="media-heading"><?php echo $item['full_name'] ?></h5>
          		<small class="media-meta"><?php echo $item['description'] ?></small>
          		<small class="text-muted fz-sm pull-right" style="font-size:11px !important"><?php echo $item['gecenSure'] ?></small>
        	</div>
        	
      	</div>
    </a><!-- .media-group-item -->
<?php } ?>

<?php if($notifications) { ?>
	<a href="#" type="button" role="button" style="padding:10px" onclick="notiftumu()" class="media-group-item text-center notiftumu">Daha Fazla Gör</a>
<?php } ?>	
	
<script>
	function notiftumu() {
		$('#notificationsPopup').modal('show');
	}
</script>	