<?php $settings = get_settings(); ?>

<style>
    @media (max-width: 992px) {
        .creative {
            display: none;
        }
    }
    @media (min-width: 993px) {
        .creative {
            margin-top:100px;
        }
    }
    @media (min-width: 1225px) {
        .creative {
            margin-top:50px;
        }
    }
    @media (min-width: 1386px) {
        .creative {
            margin-top:20px;
        }
    }
     @media (min-width: 1460px) {
        .creative {
            margin-top:0px;
        }
    }
    
    .waves {
        position:relative;
        width: 100%;
        height:15vh;
        margin-bottom:-7px; /*Fix for safari gap*/
        min-height:100px;
        max-height:110px;
    }
        
    .parallax > use {
        animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
    }
    .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }
    .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }
    .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }
    @keyframes move-forever {
        0% {
            transform: translate3d(-90px,0,0);
        }
        100% { 
            transform: translate3d(85px,0,0);
        }
    }
    /*Shrinking for mobile*/
    @media (max-width: 768px) {
        .waves {
            height:40px;
            min-height:40px;
        }
        .content {
            height:28vh;
        }
        h1 {
            font-size:24px;
        }
    }
    
    @media (max-height: 767px) {
        .footer {
           display:none;
        }
    }

    .footer {
       position: fixed;
       left: 0;
       bottom: 0;
       width: 100%;
    }

</style>

<div class="row">
	<div class="col-md-6">
        <img
        src="<?php echo base_url("assets/assets/images/creative.svg") ?>"
        alt="<?php echo $settings->company_name; ?>"
        class="img-responsive creative"
        style="margin-left:0px">
	</div>
	<div class="col-md-6">
		<div class="simple-page-wrap">
            <div class="simple-page-logo animated swing">
            </div><!-- logo -->
            <div class="simple-page-form animated flipInY" style="margin-top:100px;" id="login-form">
            	<a href="<?php echo base_url("dashboard") ?> ">
                     <?php if($settings->logo != "default"){ ?>
                            <img
                                src="<?php echo get_logo($settings->logoFolder, $settings->logo); ?>"
                        		alt="<?php echo $settings->company_name; ?>"
                                class="img-responsive"
                                style="margin-left:16px">
                     <?php } ?>
                </a>
                <form action="<?php echo base_url("userop/do_login"); ?>" method="post">
                    <div class="form-group" style="margin-top:50px">
                        <input id="sign-in-email" type="email" class="form-control" placeholder="E-posta" name="user_email">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_email"); ?></small>
                        <?php } ?>
                    </div>
        
                    <div class="form-group">
                        <input id="sign-in-password" type="password" class="form-control" placeholder="Şifre" name="user_password">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_password"); ?></small>
                        <?php } ?>
                    </div>
        
                    <button type="submit" class="btn btn-primary">Giriş Yap</button>
                </form>
            </div><!-- #login-form -->
        
            <div class="simple-page-footer">
                <p><a href="<?php echo base_url("kayit-ol"); ?>">Kayıt Ol   -     </a><a href="<?php echo base_url("sifremi-unuttum"); ?>">Şifremi Unuttum ?</a></p>
            </div><!-- .simple-page-footer -->
        
        
        </div><!-- .simple-page-wrap -->
	</div>
</div>

<!--Waves Container-->
<div class="footer">
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.5" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.4)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.2)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.6)" />
        </g>
    </svg>
</div>

