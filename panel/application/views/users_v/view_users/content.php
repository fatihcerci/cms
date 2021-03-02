<div class="row">
    <div class="col-md-12">
        <h4 class="m-b-lg">
            Çalışan Listesi
        </h4>
    </div><!-- END column -->
    
    
    <div class="container-fluid">
        <div class="row justify-content-center">
        	<?php if(!empty($users)) { 
        	       foreach($users as $user) { ?>
            			<div class="col-md-3">
                    		<div class="widget">
                    			<div class="widget-body text-center">
                    				<div class="avatar avatar-xl avatar-circle" style="width:130px;height:130px;margin-right:0px !important;">
                    					<a href="javascript:void(0)">
                    						<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/avatar-user.png" alt="avatar"/>
                    					</a>
                    				</div><!-- .avatar -->
                    				
                    				<h4 class="m-b-md"><?php echo $user->full_name ?></h4>
                    				<p class="text-muted m-b-lg">
                    					<?php echo $user->project ?> <br>
                    					<?php echo $user->title ?> <br>
                    					<?php echo $user->email ?>
                    				</p>
                        			<hr class="widget-separator">
                    				<a href="<?php echo base_url("users/view_profile/$user->id"); ?>" class="btn btn-md btn-outline btn-primary" style="margin-top:15px;"><i class="fa fa-search" style="width:50px;"></i></a>
                    			</div><!-- .widget-body -->
                    		</div><!-- .widget -->
                		</div><!-- END column -->
            	<?php }
            }
            ?>
    	</div>
    </div>
</div>