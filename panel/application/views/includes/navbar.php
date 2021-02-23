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
    width: 450px !important;
}

    
</style>


<?php 
    $settings = get_settings();
    $noticationsCount = get_notifications_count();
    $notifications = get_notifications();
?>

<nav id="app-navbar" class="navbar navbar-inverse navbar-fixed-top primary">
    <!-- navbar header -->
    <div class="navbar-header">
        <button type="button" id="menubar-toggle-btn" class="navbar-toggle visible-xs-inline-block navbar-toggle-left hamburger hamburger--collapse js-hamburger">
            <span class="sr-only">Toggle navigation</span>
            <span class="hamburger-box"><span class="hamburger-inner"></span></span>
        </button>

        <button type="button" class="navbar-toggle navbar-toggle-right collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="zmdi zmdi-hc-lg zmdi-more"></span>
        </button>
        
		<li class="navbar-toggle navbar-toggle-right collapsed" style = "list-style-type: none;" aria-expanded="false">
            <a href="<?php echo base_url("logout"); ?>">
                <i class="fa fa-power-off" style="color: #fff;"></i>
            </a>
        </li>
        
        <a href="<?php echo base_url(); ?>" class="navbar-brand">
            <span class="brand-icon">
                <?php if($settings->logo != "default"){ ?>
                    <img
                        src="<?php echo get_logo($settings->logoFolder, $settings->logo); ?>"
                		alt="<?php echo $settings->company_name; ?>"
                        class="img-responsive">
                <?php } else {?>
                    <img
                        width="50"
                        src="<?php echo base_url("assets/assets/images/default_image.png"); ?>"
                        alt=""
                        class="img-responsive">

                <?php } ?>
            </span>
        </a>
    </div><!-- .navbar-header -->

    <div class="navbar-container container-fluid">
        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <ul class="nav navbar-toolbar navbar-toolbar-left navbar-left">
                <li class="hidden-float hidden-menubar-top">
                    <a href="javascript:void(0)" role="button" id="menubar-fold-btn" class="hamburger hamburger--arrowalt is-active js-hamburger">
                        <span class="hamburger-box"><span class="hamburger-inner"></span></span>
                    </a>
                </li>
                <li>
                    <h5 class="page-title hidden-menubar-top hidden-float">Dashboard</h5>
                </li>
            </ul>

            <ul class="nav navbar-toolbar navbar-toolbar-right navbar-right">
<!--             	Bildirimler -->
            	<li class="dropdown nav-item hidden-float">
<!--                 	<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> -->
<!--                 		<span class="badge">19</span> -->
<!--                 		<i class="zmdi zmdi-hc-lg zmdi-notifications"></i> -->
<!--                 	</a> -->
					<a href="#" 
						type="button"
    					data-url="bildirimler-goruldu" 
    					data-csrf-key="<?php echo $this->security->get_csrf_token_name(); ?>" 
                		data-csrf-value="<?php echo $this->security->get_csrf_hash(); ?>" 
                		class="dropdown-toggle notif notifbtn" 
                		id="#notifbtn"
                		data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						
						<i class="zmdi zmdi-hc-lg zmdi-notifications "></i>
						
						<?php if($noticationsCount > 0) { ?>
						
							<span class="num"><?php echo $noticationsCount ?></span>
							
						<?php } ?>
					</a>
					
					
                	<div class="media-group dropdown-menu animated flipInY">
                	
                    	<?php if(!$notifications) { ?>
                    		<a href="<?php echo base_url("/blogs"); ?>" class="media-group-item">
                            	<div class="media">
                               		<div class="media-left">
                                  		
                                	</div>
                                	<div class="media-body" style="padding:8px; color:red; ">
                                  		<i class="fa fa-warning"></i> <small class="media-meta"><b>Yeni bildiriminiz bulunmamaktadır</b></small>
                                  		
                                	</div>
                              	</div>
                            </a><!-- .media-group-item -->
                        <?php } ?>
                            
                            
                       
                    	<?php foreach($notifications as $item) { ?>
                        	<a href="<?php echo base_url($item['url']) ?>" class="media-group-item" <?php if($item['goruldu']==1) { ?> style="opacity:0.5" <?php } ?> >
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
                </li>
                
                <li class="nav-item hidden-float">
                    <a href="<?php echo base_url("logout"); ?>" aria-expanded="false">
                        <i class="fa fa-power-off"></i>
                    </a>
                </li>
				<li class="nav-item hidden-float">
                    <a href="javascript:void(0)" aria-expanded="false">
                        <?php echo get_version(); ?>
                    </a>
                </li>
            </ul>
        </div>
    </div><!-- navbar-container -->
</nav>

<script src="<?php echo base_url("assets"); ?>/libs/bower/jquery/dist/jquery.js"></script>
<script src="<?php echo base_url("assets"); ?>/libs/bower/jquery-ui/jquery-ui.min.js"></script>


	
<script>
	$(document).ready(function(){
		$(".notifbtn").on("click",function(){
    		
    		var $url = $(this).data("url");
    		
    		var $data = {
    			url : $url
    		};
    		
    		var csrf_key = $(this).data("csrf-key");
    		var csrf_value = $(this).data("csrf-value");
    
    		$data[csrf_key] = csrf_value;
    		
    		$.post($url, $data, function(){
    			
    		});
    
    	});
	}) 
</script>