<style>
    #notificationsPopup 
        .modal-title {
            margin: 0;
            line-height: 0.7;
        }
    #notificationsPopup    
        .panel {
            margin-bottom: 0px;
        }
    #notificationsPopup 
        .media-group-item {
            padding: 0px 0px;
        }
    }
</style>

<?php 

$user_all_notifications = get_more_notifications();

if($user_all_notifications) { ?>
    
    <div class="modal fade" id="notificationsPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Header-->
<!--           <div class="modal-header"> -->
          	<div class="panel panel-primary">
    			<div class="panel-heading" style="padding: 12px; !important">
            	<h5 class="modal-title w-100 text-center" id="myModalLabel">Bildirimler</h5>
            	</div>
            </div>
<!--           </div> -->
          <!--Body-->
            <div class="modal-body">
                <?php foreach($user_all_notifications as $key => $item) { ?>
                    <a href="#" class="media-group-item" id="media<?php echo $key ?>">
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
                <a href="<?php echo base_url('notifications/view_all_notifications') ?>" type="button" role="button" style="padding:10px" class="media-group-item text-center notiftumu">Tümünü Gör</a>
            </div>
        </div>
        <!--/.Content-->
        </div>
    </div>
<?php } ?>

