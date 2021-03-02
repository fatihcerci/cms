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
      
      .dropdown-menu {
        left: -350px;
        width: 475px;
      }
      
        .navbar-brand .brand-icon {
    		width: 160px;
        	margin-left: -29px;
        	margin-top: -6px;
        }
    }
    .navbar-toolbar > li > .dropdown-menu {
        width: 450px !important;
    }
    
        
</style>


<?php 
    $settings = get_settings();
    $notificationsCount = get_notifications_count();
?>


<nav id="app-navbar" class="navbar navbar-inverse navbar-fixed-top primary">
    <!-- navbar header -->
    <div class="navbar-header">
        <button type="button" id="menubar-toggle-btn" class="navbar-toggle visible-xs-inline-block navbar-toggle-left hamburger hamburger--collapse js-hamburger">
            <span class="sr-only">Toggle navigation</span>
            <span class="hamburger-box"><span class="hamburger-inner"></span></span>
        </button>

<!--         <button type="button" class="navbar-toggle navbar-toggle-right collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false"> -->
<!--             <span class="sr-only">Toggle navigation</span> -->
<!--             <span class="zmdi zmdi-hc-lg zmdi-more"></span> -->
<!--         </button> -->
        
		<li class="navbar-toggle navbar-toggle-right collapsed" style = "list-style-type: none;" aria-expanded="false">
            <a href="<?php echo base_url("logout"); ?>">
                <i class="fa fa-power-off" style="color: #fff;"></i>
            </a>
        </li>
        
        <li class="navbar-toggle navbar-toggle-right collapsed" style = "list-style-type: none;" aria-expanded="false">
            <a href="<?php $user = get_active_user(); echo base_url("users/view_profile/$user->id"); ?>">
                <i class="fa fa-user" style="color: #fff;"></i>
            </a>
        </li>
        
        <li class="dropdown navbar-toggle navbar-toggle-right collapsed" id="notif" style = "list-style-type:none;width:46px;" aria-expanded="false">
            <a href="#" 
				type="button"
				data-url="bildirimler-goruldu" 
				data-csrf-key="<?php echo $this->security->get_csrf_token_name(); ?>" 
        		data-csrf-value="<?php echo $this->security->get_csrf_hash(); ?>" 
        		class="dropdown-toggle notif notifbtn" 
        		id="notifbtn"
        		data-toggle="dropdown" 
        		role="button" 
        		aria-haspopup="true" 
        		aria-expanded="false">
				
				<i class="zmdi zmdi-hc-lg zmdi-notifications "></i>
				
				
				<span class="num" id="num" <?php if($notificationsCount == 0) { ?> style = "opacity:0" <?php }  ?> ><?php echo $notificationsCount ?></span>
					
				<div class="media-group dropdown-menu animated flipInY notification_bar">
					<?php $this->load->view("includes/notification_bar"); ?>
				</div>
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

    <div class="navbar-container container-fluid>
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
            	<li class="dropdown nav-item hidden-float" id="notif" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                		id="notifbtn"
                		data-toggle="dropdown" 
                		role="button" 
                		aria-haspopup="true" 
                		aria-expanded="false">
						
						<i class="zmdi zmdi-hc-lg zmdi-notifications "></i>
						
						
						<span class="num" id="num" <?php if($notificationsCount == 0) { ?> style = "opacity:0" <?php }  ?> ><?php echo $notificationsCount ?></span>
							
					</a>
					
					<div class="media-group dropdown-menu animated flipInY notification_bar">
						<?php $this->load->view("includes/notification_bar"); ?>
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

<div class="modal fade viewBlog" id="viewBlog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<?php $this->load->view("includes/blog_popup"); ?>
</div>

<?php $this->load->view("includes/notifications_popup"); ?>

<script src="<?php echo base_url("assets"); ?>/libs/bower/jquery/dist/jquery.js"></script>
<script src="<?php echo base_url("assets"); ?>/libs/bower/jquery-ui/jquery-ui.min.js"></script>

	
<script>
	function notifDetay($about, $id) {
		var $path = "<?php echo base_url(); ?>"
		$path = $path + $about + "/view/" + $id;
		var $url = $path;
		var $data = {
			url : $url
		};
		
		debugger;
		var csrf_key = "<?php echo $this->security->get_csrf_token_name(); ?>";
		var csrf_value = "<?php echo $this->security->get_csrf_hash(); ?>";
    
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
            	debugger;
            	if(data) {
            		$(".viewBlog").html(data);
            		$('#viewBlog').modal('show');
            	}
            }
        });
	}
	
	$(document).ready(function(){
		
		
		var notifBtnClicked = false;

		$(".notifbtn").on("click",function(){
// 			$('#notif').modal('show');
// 			$('#notificationsPopup').modal('show');

			$("#num").attr("style", "opacity:0");
			
    		var $url = "<?php echo base_url("bildirimler-goruldu"); ?>";
    		
    		var $data = {
    			url : $url
    		};
    		
    		var csrf_key = $(this).data("csrf-key");
    		var csrf_value = $(this).data("csrf-value");
    
    		$data[csrf_key] = csrf_value;

    		jQuery.ajax({
                url: "<?php echo base_url("get-bildirim"); ?>",
                type: 'POST',
                data: $data,
                error:function(data){
                    console.error(data);
                },
                success: function(data) {
                	if(data) {
                		$(".notification_bar").html(data);
                	}

                	$.post($url, $data, function(){
            			
            		});
                }
            });
    	});

    	function setNotificationsCount() {
    		$url = "<?php echo base_url("get-bildirim-count"); ?>";
    		var $data = {
    			url : $url,
    			functionname: "get_bildirim_count",
    			locationView : $(this)[0].location.href
    		};
    		jQuery.ajax({
                url: $url,
                type: 'POST',
                data: $data,
                error:function(data){
                    console.error(data);
                },
                success: function(data) {
                	if(data && data > 0) {
                		$("#num").attr("style", "opacity:1");
                		$("#num").html(data);
                		for(var i=0; i<5; i++) {
                			if(i<data) {
                				$("#media"+i).attr("style", "opacity:1");
                			} else {
                				$("#media"+i).attr("style", "opacity:0.5");
                			}
                			
                		}
                		jQuery.ajax({
                            url: "<?php echo base_url("get-bildirim"); ?>",
                            type: 'POST',
                            data: $data,
                            error:function(data){
                                console.error(data);
                            },
                            success: function(data) {
                            	console.log(data);
                            	if(data) {
                            		$(".notification_bar").html(data);
                            	}
                            }
                        });
                	}
                }
            });
            setTimeout(setNotificationsCount, 5000);
        }
        setNotificationsCount();
	}) 
</script>