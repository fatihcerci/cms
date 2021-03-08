<div class="row">
    <div class="profile-header">
	<div class="profile-cover">
		<div class="text-center">
			<div>
				<div class="avatar avatar-xl avatar-circle" style="width:130px;height:130px;margin-right:0px !important;">
					<a href="javascript:void(0)">
						<img class="img-responsive" src="<?php echo base_url("assets"); ?>/assets/images/221.jpg" alt="avatar"/>
					</a>
				</div><!-- .avatar -->
			</div>
		</div>
		<div class="text-center">
			<h4 class="profile-info-name m-b-lg"><a href="javascript:void(0)" class="title-color"><?php echo $item->full_name; ?></a></h4>
			<div>
				<a href="javascript:void(0)" class="m-r-xl theme-color"><i class="fa fa-bolt m-r-xs"></i><?php echo $item->title; ?></a>
				<a href="javascript:void(0)" class="theme-color"><i class="fa fa-map-marker m-r-xs"></i><?php echo $item->birthPlace; ?></a>
			</div>
		</div>
		<div class="text-center" style="margin-top:10px">
			<div>
				<a href="javascript:void(0)" class="theme-color"><i class="fa fa-birthday-cake m-r-xs"></i><?php echo get_readable_date($item->birthDate); ?></a>
			</div>
		</div>
	</div><!-- .profile-cover -->

	<div class="promo-footer">
		<div class="row no-gutter">
			<div class="col-sm-2 col-sm-offset-3 col-xs-6 promo-tab">
<!-- 				<div class="text-center"> -->
<!-- 					<small>Experience</small> -->
<!-- 					<h4 class="m-0 m-t-xs">+2 years</h4> -->
<!-- 				</div> -->
			</div>
			<div class="col-sm-2 col-xs-6 promo-tab">
<!-- 				<div class="text-center"> -->
<!-- 					<small>Hourly Rate</small> -->
<!-- 					<h4 class="m-0 m-t-xs">12$ - 25$</h4> -->
<!-- 				</div> -->
			</div>
			<div class="col-sm-2 col-xs-12 promo-tab">
<!-- 				<div class="text-center"> -->
<!-- 					<small>Reviews</small> -->
<!-- 					<div class="m-t-xs"> -->
<!-- 						<i class="text-primary fa fa-star"></i> -->
<!-- 						<i class="text-primary fa fa-star"></i> -->
<!-- 						<i class="text-primary fa fa-star"></i> -->
<!-- 						<i class="text-primary fa fa-star"></i> -->
<!-- 						<i class="text-primary fa fa-star-o"></i> -->
<!-- 					</div> -->
<!-- 				</div> -->
			</div>
		</div>
	</div><!-- .promo-footer -->
</div>