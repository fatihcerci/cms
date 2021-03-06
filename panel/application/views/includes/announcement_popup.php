<?php 
    if(!empty($viewAnnouncement)) { ?>
        <div class="modal-dialog modal-lg" role="document">
            <!--Content-->
            <div class="modal-content">
              <!--Header-->
    <!--           <div class="modal-header"> -->
              	<div class="panel panel-danger">
        			<div class="panel-heading" style="padding: 12px; !important">
                	<h4 class="modal-title w-100 text-center" id="myModalLabel"><?php echo $viewAnnouncement->title ?></h4>
                	</div>
                </div>
    <!--           </div> -->
              <!--Body-->
              <div class="modal-body text-center">
                <?php echo $viewAnnouncement->description ?>
                
                <br>
                <div class="avatar avatar-md avatar-circle" style="margin-left: 15px;">
            		<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
          		</div>
				<a href="<?php echo base_url("users/view_profile/$viewAnnouncement->user_id");?>"><h4><?php echo $viewAnnouncement->userName ?></h4></a>
				<h7><?php echo get_readable_datetime($viewAnnouncement->createdAt) ?></h7>
              </div>
              <div class="modal-footer text-center">
              	<button type="button" class="btn btn-primary" data-dismiss="modal">Kapat</button>
              </div>
              <!--Footer-->
            </div>
            <!--/.Content-->
        </div>
<?php } ?>

