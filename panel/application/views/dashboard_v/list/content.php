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
					<h3 class="widget-title text-success"><span class="counter" data-plugin="counterUp">378</span></h3>
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
		<div class="widget" style="min-height:380px">
			<footer class="widget-footer bg-success">
			</footer>
			<header class="widget-header">
				<h4 class="widget-title">En Son Yayınlanan Bloglar</h4>
			</header>
			<hr class="widget-separator"/>
			<div class="widget-body">
				<div class="streamline m-l-lg">
					<?php foreach($latestPublishedBlogs as $item) { ?>
    					<div class="sl-item p-b-md">
    						<div class="sl-avatar avatar avatar-sm avatar-circle">
    							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/221.jpg" alt="avatar"/>
    						</div><!-- .avatar -->
    						<div class="sl-content m-l-xl">
    							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color"><?php echo $item['full_name'] ?></a><small class="text-muted fz-sm"><?php echo $item['gecenGun'] ?></small></h5>
    							<p><?php echo $item['title'] ?></p>
    						</div>
    					</div><!-- .sl-item -->
					<?php } ?>
				</div><!-- .streamline -->
			</div>
		</div><!-- .widget -->
	</div>
	
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:380px">
			<footer class="widget-footer bg-warning">
			</footer>
			<header class="widget-header">
				<h4 class="widget-title">Onay Bekleyen Bloglar</h4>
			</header>
			<hr class="widget-separator"/>
			<div class="widget-body">
				<div class="streamline m-l-lg">
					<?php foreach($pendingApprovalBlogs as $item) { ?>
    					<div class="sl-item p-b-md">
    						<div class="sl-avatar avatar avatar-sm avatar-circle">
    							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/221.jpg" alt="avatar"/>
    						</div><!-- .avatar -->
    						<div class="sl-content m-l-xl">
    							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color"><?php echo $item['full_name'] ?></a><small class="text-muted fz-sm"><?php echo $item['gecenGun'] ?></small></h5>
    							<p><?php echo $item['title'] ?></p>
    						</div>
    					</div><!-- .sl-item -->
					<?php } ?>
				</div><!-- .streamline -->
			</div>
		</div><!-- .widget -->
	</div>
</div><!-- .row -->

<div class="row">
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:380px">
			<header class="widget-header">
				<h4 class="widget-title">Duyurular</h4>
			</header>
			<hr class="widget-separator"/>
			<div class="widget-body">
				<div class="media-group feeds-group">

					<div class="media-group-item">
						<div class="media">
							<div class="media-left">
								<div class="avatar avatar-sm avatar-circle">
									<img src="<?php echo base_url("assets"); ?>/assets/images/217.jpg" alt="">
								</div>
							</div>
							<div class="media-body">
								<h5><a href="javascript:void(0)" class="text-color">Some of the fantastic things people have had to say about Ooooh</a></h5>
								<small class="text-muted">2 days ago</small>
							</div>
						</div>
					</div><!-- .media-group-item -->

					<div class="media-group-item">
						<div class="media">
							<div class="media-left">
								<div class="avatar avatar-sm avatar-circle">
									<img src="<?php echo base_url("assets"); ?>/assets/images/218.jpg" alt="">
								</div>
							</div>
							<div class="media-body">
								<h5><a href="javascript:void(0)" class="text-color">Here are just some of the magazine reviews we have had</a></h5>
								<small class="text-muted">1 day ago</small>
							</div>
						</div>
					</div><!-- .media-group-item -->

					<div class="media-group-item">
						<div class="media">
							<div class="media-left">
								<div class="avatar avatar-sm avatar-circle">
									<img src="<?php echo base_url("assets"); ?>/assets/images/219.jpg" alt="">
								</div>
							</div>
							<div class="media-body">
								<h5><a href="javascript:void(0)" class="text-color">Lorem ipsum dolor amet, consectetur adipisicing elit.</a></h5>
								<small class="text-muted">2 days ago</small>
							</div>
						</div>
					</div><!-- .media-group-item -->

					<div class="media-group-item">
						<div class="media">
							<div class="media-left">
								<div class="avatar avatar-sm avatar-circle">
									<img src="<?php echo base_url("assets"); ?>/assets/images/215.jpg" alt="">
								</div>
							</div>
							<div class="media-body">
								<h5><a href="javascript:void(0)" class="text-color">“It’s just brilliant. I will recommend it to everyone!”</a></h5>
								<small class="text-muted">2 mins ago</small>
							</div>
						</div>
					</div><!-- .media-group-item -->

					<div class="media-group-item">
						<div class="media">
							<div class="media-left">
								<div class="avatar avatar-sm avatar-circle">
									<img src="<?php echo base_url("assets"); ?>/assets/images/221.jpg" alt="">
								</div>
							</div>
							<div class="media-body">
								<h5><a href="javascript:void(0)" class="text-color">John has just started working on the project</a></h5>
								<small class="text-muted">right now</small>
							</div>
						</div>
					</div><!-- .media-group-item -->
				</div>
			</div>
		</div><!-- .widget -->
	</div>
	<div class="col-md-6 col-sm-6">
		<div class="widget" style="min-height:380px">
			<header class="widget-header">
				<h4 class="widget-title">Doğum Günü Yaklaşan Çalışanlar</h4>
			</header>
			<hr class="widget-separator"/>
			<div class="widget-body">
				<div class="streamline m-l-lg">
					<div class="sl-item p-b-md">
						<div class="sl-avatar avatar avatar-sm avatar-circle">
							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/221.jpg" alt="avatar"/>
						</div><!-- .avatar -->
						<div class="sl-content m-l-xl">
							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">John Doe</a><small class="text-muted fz-sm">last month</small></h5>
							<p>John has just started working on the project</p>
						</div>
					</div><!-- .sl-item -->

					<div class="sl-item p-b-md">
						<div class="sl-avatar avatar avatar-sm avatar-circle">
							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/214.jpg" alt="avatar"/>
						</div><!-- .avatar -->
						<div class="sl-content m-l-xl">
							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Jane Doe</a><small class="text-muted fz-sm">last month</small></h5>
							<p>Jane sent you invitation to attend the party</p>
						</div>
					</div><!-- .sl-item -->

					<div class="sl-item p-b-md">
						<div class="sl-avatar avatar avatar-sm avatar-circle">
							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/217.jpg" alt="avatar"/>
						</div><!-- .avatar -->
						<div class="sl-content m-l-xl">
							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Sally Mala</a><small class="text-muted fz-sm">last month</small></h5>
							<p>Sally added you to her circles</p>
						</div>
					</div><!-- .sl-item -->

					<div class="sl-item p-b-md">
						<div class="sl-avatar avatar avatar-sm avatar-circle">
							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/211.jpg" alt="avatar"/>
						</div><!-- .avatar -->
						<div class="sl-content m-l-xl">
							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Sara Adams</a><small class="text-muted fz-sm">last month</small></h5>
							<p>Sara has finished her task</p>
						</div>
					</div><!-- .sl-item -->
					<div class="sl-item p-b-md">
						<div class="sl-avatar avatar avatar-sm avatar-circle">
							<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/214.jpg" alt="avatar"/>
						</div><!-- .avatar -->
						<div class="sl-content m-l-xl">
							<h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Sandy Doe</a><small class="text-muted fz-sm">last month</small></h5>
							<p>Sara has finished her task</p>
						</div>
					</div><!-- .sl-item -->
				</div><!-- .streamline -->
			</div>
		</div><!-- .widget -->
	</div>
</div><!-- .row -->