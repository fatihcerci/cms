<?php 

$user_all_notifications = get_all_notifications();

if($user_all_notifications) { ?>
    
    <div class="modal fade" id="notificationsPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Header-->
<!--           <div class="modal-header"> -->
          	<div class="panel panel-danger">
    			<div class="panel-heading" style="padding: 12px; !important">
            	<h4 class="modal-title w-100 text-center" id="myModalLabel">Bildirimler</h4>
            	</div>
            </div>
<!--           </div> -->
          <!--Body-->
          <div class="modal-body">
            <?php foreach($user_all_notifications as $key => $item) { ?>
            	<a href="<?php echo base_url('notifications/view_all_notifications') ?>" class="media-group-item" id="media<?php echo $key ?>">
                	<div class="media">
                   		<div class="media-left">
                      		<div class="avatar avatar-md avatar-circle" style="margin-top: 6px;">
                        		<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
                      		</div>
                    	</div>
                    	<div class="media-body">
                      		<h5 class="media-heading"><?php echo $item['full_name'] ?></h5>
                      		<small class="media-meta"><?php echo $item['description'] ?></small>
                    	</div>
                    	<small class="text-muted fz-sm pull-right" style="font-size:11px !important"><?php echo $item['gecenSure'] ?></small>
                  	</div>
                </a><!-- .media-group-item -->
            <?php } ?>
          </div>
          <!--Footer-->
          <div class="modal-footer text-center">
          
          	
          </div>
        </div>
        <!--/.Content-->
        </div>
    </div>
<?php } ?>

