<?php $user = get_active_user(); ?>

<aside id="menubar" class="menubar light">
    <div class="app-user">
        <div class="media">
            <div class="media-left">
                <div class="avatar avatar-md avatar-circle">
                    <a href="javascript:void(0)">
                        <img class="img-responsive"
                             src="<?php echo base_url("assets"); ?>/assets/images/221.jpg"
                             alt="<?php echo convertToSEO($user->full_name); ?>"/>
                    </a>
                </div><!-- .avatar -->
            </div>
            <div class="media-body">
                <div class="foldable">
                    <h5><a href="javascript:void(0)" class="username"><?php echo $user->full_name; ?></a></h5>
                    <ul>
                        <li class="dropdown">
                            <a href="javascript:void(0)" class="dropdown-toggle usertitle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <small>İşlemler</small>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu animated flipInY">
                                <li>
                                    <a class="text-color" href="<?php echo base_url(); ?>">
                                        <span class="m-r-xs"><i class="fa fa-home"></i></span>
                                        <span>Anasayfa</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="text-color" href="<?php echo base_url("users/view_profile/$user->id"); ?>">
                                        <span class="m-r-xs"><i class="fa fa-user"></i></span>
                                        <span>Profilim</span>
                                    </a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a class="text-color" href="<?php echo base_url("logout"); ?>">
                                        <span class="m-r-xs"><i class="fa fa-power-off"></i></span>
                                        <span>Çıkış</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div><!-- .media-body -->
        </div><!-- .media -->
    </div><!-- .app-user -->

    <div class="menubar-scroll">
        <div class="menubar-scroll-inner">
            <ul class="app-menu">


                <?php if(isAllowedViewModule("dashboard")) { ?>
                    <li>
                        <a href="<?php echo base_url("dashboard"); ?>">
                            <i class="menu-icon zmdi zmdi-view-dashboard zmdi-hc-lg"></i>
                            <span class="menu-text">Dashboard</span>
                        </a>
                    </li>
                <?php } ?>

                <?php if(isAllowedViewModule("settings")) { ?>

                    <li class="has-submenu">
                        <a href="javascript:void(0)" class="submenu-toggle">
                            <i class="menu-icon zmdi zmdi-settings zmdi-hc-lg"></i>
                            <span class="menu-text">Ayarlar</span>
                            <i class="menu-caret zmdi zmdi-hc-sm zmdi-chevron-right"></i>
                        </a>
                        <ul class="submenu">
                        	<?php if(isAllowedViewModule("settings")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("settings"); ?>">
                                        <span class="menu-text">Genel Ayarlar</span>
                                    </a>
                                </li>
                            <?php } ?>
                            <?php if(isAllowedViewModule("emailsettings")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("emailsettings"); ?>">
                                        <span class="menu-text">E-Posta Ayarları</span>
                                    </a>
                                </li>
                         <?php } ?>
                        </ul>
                    </li>

                <?php } ?>
                
                
                <?php if(isAllowedViewModule("users") || isAllowedViewModule("user_roles") || isAllowedViewModule("titles") || isAllowedViewModule("projects")) { ?>
                    <li class="has-submenu">
                        <a href="javascript:void(0)" class="submenu-toggle">
                            <i class="menu-icon fa fa-users"></i>
                            <span class="menu-text">Organizasyon İşlemleri</span>
                            <i class="menu-caret zmdi zmdi-hc-sm zmdi-chevron-right"></i>
                        </a>
                        <ul class="submenu">
                        	<?php if(isAllowedViewModule("user_roles")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("user_roles"); ?>">
                                        <span class="menu-text">Rol ve Yetkilendirme</span>
                                    </a>
                                </li>
                         	<?php } ?>
                         	
                         	<?php if(isAllowedViewModule("titles")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("titles"); ?>">
                                        <span class="menu-text">Unvan Tanımları</span>
                                    </a>
                                </li>
                            <?php } ?>
                            
                            <?php if(isAllowedViewModule("projects")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("projects"); ?>">
                                        <span class="menu-text">Proje Tanımları</span>
                                    </a>
                                </li>
                            <?php } ?>
                            
                        	<?php if(isAllowedViewModule("users")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("users"); ?>">
                                        <span class="menu-text">Kullanıcı Tanımları</span>
                                    </a>
                                </li>
                            <?php } ?>
                            
                            <?php if(isAllowedViewModule("user_roles")) {  ?>
                                <li>
                                    <a href="<?php echo base_url("users/pending"); ?>">
                                        <span class="menu-text">Bekleyen Kullanıcılar</span>
                                    </a>
                                </li>
                         	<?php } ?>
                        </ul>
                    </li>
                <?php } ?> 
                
             	<?php if(isAllowedViewModule("blogs")) { ?>
                    <li>
                        <a href="<?php echo base_url("blogs"); ?>">
                            <i class="menu-icon fa fa-file-text-o"></i>
                            <span class="menu-text">Bloglar</span>
                        </a>
                    </li>

                <?php } ?>
                
                <?php if(isAllowedViewModule("announcements")) { ?>
                    <li>
                        <a href="<?php echo base_url("announcements"); ?>">
                            <i class="menu-icon fa fa-bullhorn"></i>
                            <span class="menu-text">Duyurular</span>
                        </a>
                    </li>

                <?php } ?>
                

                <?php if(isAllowedViewModule("testimonials")) { ?>

                    <li>
                        <a href="<?php echo base_url("testimonials"); ?>">
                            <i class="menu-icon fa fa-comments"></i>
                            <span class="menu-text">Ziyaretçi Notları</span>
                        </a>
                    </li>

                <?php } ?>
                

                <li>
                    <a href="<?php echo base_url("appointments"); ?>">
                        <i class="menu-icon fa fa-calendar"></i>
                        <span class="menu-text">Randevu</span>
                    </a>
                </li>



                <li>
<!--                     <a href="documentation.html"> -->
						<a href="#">
                        <i class="menu-icon zmdi zmdi-view-web zmdi-hc-lg"></i>
                        <span class="menu-text">Ana Sayfa</span>
                    </a>
                </li>



            </ul><!-- .app-menu -->
        </div><!-- .menubar-scroll-inner -->
    </div><!-- .menubar-scroll -->
</aside>