<?php $settings = get_settings(); ?>

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
				<span class="pull-right big-icon watermark"><i class="fa fa-users"></i></span>
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
		<div class="widget" style="min-height:380px;">
			<div class="panel panel-success">
				<div class="panel-heading" style="padding:12px !important;">
					<h4 class="panel-title" style="text-transform:none !important">En Son Yayınlanan Bloglar</h4>
				</div>

    			<div class="widget-body">
    				<div class="streamline m-l-lg">
    					<?php foreach($latestPublishedBlogs as $item) { ?>
        					<div class="sl-item p-b-md">
        						<div class="sl-avatar avatar avatar-sm avatar-circle">
        							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/209.jpg" alt="avatar"/>
        						</div><!-- .avatar -->
        						<div class="sl-content m-l-xl">
        							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color"><?php echo $item['full_name'] ?></a><small class="text-muted fz-sm"><?php echo $item['gecenGun'] ?></small></h5>
        							<p><?php echo $item['title'] ?></p>
        						</div>
        					</div><!-- .sl-item -->
    					<?php } ?>
    				</div><!-- .streamline -->
    			</div>
    		</div>
		</div><!-- .widget -->
	</div>
	
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:380px;">			
			<div class="panel panel-warning" style="min-height:380px;">
				<div class="panel-heading" style="padding:12px !important;">
					<h4 class="panel-title" style="text-transform:none !important">Onay Bekleyen Bloglar (<?php echo $pendingApprovalBlogsCount ?>)</h4>
				</div>
    			
    			<div class="widget-body">
    				<div class="streamline m-l-lg">
    					<?php foreach($pendingApprovalBlogs as $item) { ?>
        					<div class="sl-item p-b-md">
        						<div class="sl-avatar avatar avatar-sm avatar-circle">
        							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/212.jpg" alt="avatar"/>
        						</div><!-- .avatar -->
        						<div class="sl-content m-l-xl">
        							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color"><?php echo $item['full_name'] ?></a><small class="text-muted fz-sm"><?php echo $item['gecenGun'] ?></small></h5>
        							<p><?php echo $item['title'] ?></p>
        						</div>
        					</div><!-- .sl-item -->
    					<?php } ?>
    				</div><!-- .streamline -->
    			</div>
    		</div>
		</div><!-- .widget -->
	</div>
</div><!-- .row -->

<div class="row">
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:380px">

			<div class="panel panel-danger" style="min-height:380px;">
				<div class="panel-heading" style="padding:12px !important;">
					<span class="pull-left big-icon"><i class="fa fa-bullhorn"></i></span>
					<h4 class="panel-title" style="padding-left:25px;text-transform:none !important;">Duyurular</h4>
				</div>


    			<div class="widget-body">
    				<div class="streamline m-l-lg">
    					<?php foreach($duyurular as $item) { ?>
    					
        					<div class="sl-item p-b-md">
        						<div class="sl-avatar avatar avatar-sm avatar-circle">
        							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/221.jpg" alt="avatar"/>
        						</div><!-- .avatar -->
        						<div class="sl-content m-l-xl">
        							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color"><?php echo $item['full_name'] ?></a><small class="text-muted fz-sm"><?php echo $item['gecenSure'] ?></small></h5>
        							<p><?php echo $item['title'] ?></p>
        						</div>
        					</div><!-- .sl-item -->
        				<?php } ?>
    
    				</div><!-- .streamline -->
    			</div>
    		</div>
		</div><!-- .widget -->
	</div>
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:380px">
			
			<div class="panel panel-primary" style="min-height:380px;">
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

