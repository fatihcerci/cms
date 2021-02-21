<?php $settings = get_settings(); ?>

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