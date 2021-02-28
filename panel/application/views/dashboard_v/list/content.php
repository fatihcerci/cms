<?php 
    $settings = get_settings(); 
    $isYetkili = isYetkili();
?>

<style>

    .media-group-item {
        padding: 2px 10px;
    }

</style>

<!-- 
<div class="row">
	<div class="col-md-6 col-sm-6">
		<div class="widget p-md clearfix">
			<div class="pull-left">
				<h3 class="widget-title"><?php echo $settings->company_name; ?></h3>
				<small class="text-color">Bugünkü görüntüleme sayısı</small>
			</div>
			<span class="pull-right fz-lg fw-500 counter" data-plugin="counterUp">102</span>
		</div>
	</div>

	<div class="col-md-6 col-sm-6">
		<div class="widget p-md clearfix">
			<div class="pull-left">
				<h3 class="widget-title">Active</h3>
				<small class="text-color">Loads / contact</small>
			</div>
			<span class="pull-right fz-lg fw-500 counter" data-plugin="counterUp">325</span>
		</div>
	</div>
</div>
-->

<div class="row">
	<div class="col-md-4 col-sm-6">
		<div class="widget stats-widget">
			<div class="widget-body clearfix">
				<div class="pull-left">
					<h3 class="widget-title text-primary"><span class="counter" data-plugin="counterUp"><?php echo $employeeCount ?></span></h3>
					<small class="text-color">Toplam Çalışan Sayısı</small>
				</div>
				<span class="pull-right big-icon watermark"><a href="<?php echo base_url("users/view_all_active_users"); ?>"><i class="fa fa-users"></i></a></span>
			</div>
			<footer class="widget-footer bg-primary">
			</footer>
		</div><!-- .widget -->
	</div>

	<div class="col-md-4 col-sm-6">
		<div class="widget stats-widget">
			<div class="widget-body clearfix">
				<div class="pull-left">
					<h3 class="widget-title text-danger"><span class="counter" data-plugin="counterUp"><?php echo $publishedBlogCount ?></span></h3>
					<small class="text-color">Toplam Yayınlanan Blog Sayısı</small>
				</div>
				<span class="pull-right big-icon watermark"><i class="fa fa-file-text-o"></i></span>
			</div>
			<footer class="widget-footer bg-success">
			</footer>
		</div><!-- .widget -->
	</div>

	<div class="col-md-4 col-sm-6">
		<div class="widget stats-widget">
			<div class="widget-body clearfix">
				<div class="pull-left">
					<h3 class="widget-title text-success"><span class="counter" data-plugin="counterUp"><?php echo $testimonialsCount ?></span></h3>
					<small class="text-color">Toplam Ziyaretçi Notu Sayısı</small>
				</div>
				<span class="pull-right big-icon watermark"><i class="fa fa-envelope"></i></span>
			</div>
			<footer class="widget-footer bg-danger">
			</footer>
		</div><!-- .widget -->
	</div>

<!--
	<div class="col-md-3 col-sm-6">
		<div class="widget stats-widget">
			<div class="widget-body clearfix">
				<div class="pull-left">
					<h3 class="widget-title text-warning"><span class="counter" data-plugin="counterUp">3.490</span>k</h3>
					<small class="text-color">Total Pending</small>
				</div>
				<span class="pull-right big-icon watermark"><i class="fa fa-file-text-o"></i></span>
			</div>
			<footer class="widget-footer bg-warning">
			</footer>
		</div>
	</div>
-->
</div><!-- .row -->


<div class="row">
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:421px;">
			<div class="panel panel-success" style="min-height:421px;">
				<div class="panel-heading" style="padding:12px !important;">
					<span class="pull-left big-icon"><i class="fa fa-check"></i></span>
					<h4 class="panel-title" style="padding-left:25px;text-transform:none !important">En Son Yayınlanan Bloglar</h4>
				</div>

<!--     			<div class="widget-body"> -->
					<?php foreach($latestPublishedBlogs as $key => $item) { ?>
						<a href="javascript:void(0)" type="button" role="button" class="media-group-item" id="media<?php echo $key ?>">
                        	<div class="media" style="padding: 5px;">
                           		<div class="media-left">
                              		<div class="avatar avatar-md avatar-circle" style="margin-top: 6px;">
                                		<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
                              		</div>
                            	</div>
                            	<div class="media-body">
                              		<h5 class="media-heading m-r-xs theme-color"><?php echo $item['full_name'] ?><small class="text-muted fz-sm" style="color:#777777;margin-left:8px;font-size:12px !important"><?php echo $item['gecenGun'] ?></small>
                                  		<?php if($isYetkili) {?> 
                                      		<button
                                                data-url="<?php echo base_url("blogs/removePublish/".$item['id']); ?>"
                                                class="btn btn-sm btn-danger btn-outline removePublishBtn pull-right"
                                                style="margin-top: 10px; margin-left:5px;">
                                                <i class="fa fa-remove"></i>
                                            </button> 
                                        <?php }?>
                                        <button
                                                data-url="<?php echo base_url("blogs/viewBlog/".$item['id']); ?>"
                                                class="btn btn-sm btn-primary btn-outline viewBlogBtn pull-right"
                                                style="margin-top: 10px;">
                                                <i class="fa fa-search"></i>
                                        </button>
                              		</h5> 
                              		<small class="media-meta"><?php echo $item['title'] ?></small>
                              		
                            	</div>
                          	</div>
                        </a><!-- .media-group-item -->
					<?php } ?>
<!--     			</div> -->
    		</div>
		</div><!-- .widget -->
	</div>
	
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:421px;">			
			<div class="panel panel-warning" style="min-height:421px;">
				<div class="panel-heading" style="padding:12px !important;">
					<span class="pull-left big-icon"><i class="fa fa-hourglass-start"></i></span>
					<h4 class="panel-title" style="padding-left:25px;text-transform:none !important">Onay Bekleyen Bloglar (<?php echo $pendingApprovalBlogsCount ?>)</h4>
				</div>
    			
<!--     			<div class="widget-body"> -->
					<?php foreach($pendingApprovalBlogs as $key => $item) { ?>
						<a href="javascript:void(0)" type="button" role="button" class="media-group-item" id="media<?php echo $key ?>">
                        	<div class="media" style="padding: 5px;">
                           		<div class="media-left">
                              		<div class="avatar avatar-md avatar-circle" style="margin-top: 6px;">
                                		<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
                              		</div>
                            	</div>
                            	<div class="media-body">
                              		<h5 class="media-heading m-r-xs theme-color"><?php echo $item['full_name'] ?><small class="text-muted fz-sm" style="color:#777777;margin-left:8px;font-size:12px !important"><?php echo $item['gecenGun'] ?></small>
                                  		<?php if($isYetkili) {?> 
                                      		<button
                                                data-url="<?php echo base_url("blogs/publish/".$item['id']); ?>"
                                                class="btn btn-sm btn-success btn-outline publishBtn pull-right"
                                                style="margin-top: 10px; margin-left:5px;">
                                                <i class="fa fa-check"></i>
                                            </button>
                                        <?php }?>
                                        <button
                                            data-url="<?php echo base_url("blogs/viewBlog/".$item['id']); ?>"
                                            class="btn btn-sm btn-primary btn-outline viewBlogBtn pull-right"
                                            style="margin-top: 10px;">
                                            <i class="fa fa-search"></i>
                                    	</button>
                                    </h5> 
                                    
                              		<small class="media-meta"><?php echo $item['title'] ?></small>
                              		
                            	</div>
                          	</div>
                        </a><!-- .media-group-item -->
					<?php } ?>
<!--     			</div> -->
    		</div>
		</div><!-- .widget -->
	</div>
</div><!-- .row -->

<div class="row">
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:421px;">
			<div class="panel panel-danger" style="min-height:421px;">
				<div class="panel-heading" style="padding:12px !important;">
					<span class="pull-left big-icon"><i class="fa fa-bullhorn"></i></span>
					<h4 class="panel-title" style="padding-left:25px;text-transform:none !important;">Duyurular</h4>
				</div>
				<?php foreach($duyurular as $key => $item) { ?>
					<a href="javascript:void(0)" type="button" role="button" class="media-group-item" id="media<?php echo $key ?>">
                    	<div class="media" style="padding: 5px;">
                       		<div class="media-left">
                          		<div class="avatar avatar-md avatar-circle" style="margin-top: 6px;">
                            		<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
                          		</div>
                        	</div>
                        	<div class="media-body">
                          		<h5 class="media-heading m-r-xs theme-color"><?php echo $item['full_name'] ?><small class="text-muted fz-sm" style="color:#777777;margin-left:8px;font-size:12px !important"><?php echo $item['gecenSure'] ?></small>
                              		<button
                                        data-duyuru-id = "<?php echo $item['id'] ?>"
                                        data-url="<?php echo base_url("announcements/get_view_announcement/".$item['id'])?>"  
                                		data-csrf-key="<?php echo $this->security->get_csrf_token_name(); ?>" 
                                		data-csrf-value="<?php echo $this->security->get_csrf_hash(); ?>" 
                                        class="btn btn-sm btn-primary btn-outline viewAnnouncementBtn pull-right"
                                        style="margin-top: 10px;">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </h5> 
                                
                          		<small class="media-meta"><?php echo $item['title'] ?></small>
                          		
                        	</div>
                      	</div>
                    </a><!-- .media-group-item -->
				<?php } ?>
			</div>
		</div><!-- .widget -->
	</div>
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:421px;">
			
			<div class="panel panel-primary" style="min-height:421px;">
    			<div class="panel-heading" style="padding:12px !important;">
				<span class="pull-left big-icon"><i class="fa fa-birthday-cake"></i></span>
    				<h4 class="panel-title" style="padding-left:25px;text-transform:none !important;">Doğum Günü Yaklaşan Çalışanlar</h4>
    			</div>
				
    			<div class="widget-body">
    				<div class="streamline m-l-lg">
    					<?php foreach($dogumGunuYaklasanCalisanlar as $item) { ?>
    					
        					<div class="sl-item p-b-md">
        						<div class="sl-avatar avatar avatar-sm avatar-circle">
        							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="avatar"/>
        						</div><!-- .avatar -->
        						<div class="sl-content m-l-xl">
        							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color"><?php echo $item['full_name'] ?></a><small class="text-muted fz-sm"><?php echo get_readable_date($item['birthDate']) ?></small></h5>
        							<p><?php echo $item['kalan'] ?></p>
        						</div>
        					</div><!-- .sl-item -->
        				<?php } ?>
    
    				</div><!-- .streamline -->
    			</div>
    		</div>
		</div><!-- .widget -->
	</div>
</div><!-- .row -->

<div class="modal fade viewAnnouncementPopup" id="viewAnnouncementPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<?php $this->load->view("includes/announcement_popup"); ?>
</div>

<div class="modal fade viewBlogPopup" id="viewBlogPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<?php $this->load->view("includes/blog_popup"); ?>
</div>
<script>
	$(document).ready(function(){
		$(".removePublishBtn").on("click",function(){
			var $data_url = $(this).data("url");

            swal({
                text: 'Blog yayından kaldırılacak, devam etmek istiyor musunuz?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Evet',
                cancelButtonText : "Hayır"
            }).then(function (result) {
                if (result.value) {
                    window.location.href = $data_url;
                }
            });
    	});
    	
    	$(".publishBtn").on("click",function(){
			var $data_url = $(this).data("url");

            swal({
                text: 'Blog yayınlanacak, devam etmek istiyor musunuz?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Evet',
                cancelButtonText : "Hayır"
            }).then(function (result) {
                if (result.value) {
                    window.location.href = $data_url;
                }
            });
    	});
    	
    	$(".viewAnnouncementBtn").on("click",function(){
    		var $url = $(this).data("url");
    		
    		var $data = {
    			url : $url
    		};
    		
    		var csrf_key = $(this).data("csrf-key");
    		var csrf_value = $(this).data("csrf-value");
    
    		$data[csrf_key] = csrf_value;
    		
    		debugger;

    		jQuery.ajax({
                url: $url,
                type: 'POST',
                data: $data,
                error:function(data){
                    console.error(data);
                },
                success: function(data) {
                	if(data) {
                		$(".viewAnnouncementPopup").html(data);
                		$('#viewAnnouncementPopup').modal('show');
                	}
                }
            });
			
		});
		
		$(".viewBlogBtn").on("click",function(){
    		var $url = $(this).data("url");
    		
    		var $data = {
    			url : $url
    		};
    		
    		var csrf_key = $(this).data("csrf-key");
    		var csrf_value = $(this).data("csrf-value");
    
    		$data[csrf_key] = csrf_value;
    		
    		debugger;

    		jQuery.ajax({
                url: $url,
                type: 'POST',
                data: $data,
                error:function(data){
                    console.error(data);
                },
                success: function(data) {
                	if(data) {
                		$(".viewBlogPopup").html(data);
                		$('#viewBlogPopup').modal('show');
                	}
                }
            });
			
		});
	})
</script>