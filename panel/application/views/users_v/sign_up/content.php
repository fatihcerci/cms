<?php $settings = get_settings(); ?>

<style>
    .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
    }
    .second-column {
        margin-top: 50px;
    }
    
    .form {
        width:740px;
    }
    
    
    @media (max-width: 993px) {
       .form {
            width:380px;
        }
        .second-column {
            margin-top: 0px;
        }
    }
    
      
    @media (max-width: 1165px) {
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
            margin-top:80px;
        }
    }
    @media (min-width: 1386px) {
        .creative {
            margin-top:80px;
        }
    }
     @media (min-width: 1460px) {
        .creative {
            margin-top:20px;
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
	
	<div class="col-md-8">
		<div class="simple-page-wrap form">
            <div class="simple-page-logo animated swing">
            </div><!-- logo -->
            <div class="simple-page-form animated flipInY" style="margin-top:-50px;" id="login-form">
            	<div class="col-md-12">
            		<div class="col-md-6 col-md-center">
                    	<a href="<?php echo base_url() ?> " class="">
                             <?php if($settings->logo != "default"){ ?>
                                    <img
                                        src="<?php echo get_logo($settings->logoFolder, $settings->logo); ?>"
                                		alt="<?php echo $settings->company_name; ?>"
                                        class="img-responsive"
                                        style="margin-left:10px">
                             <?php } ?>
                        </a>
                     </div>
                </div>
                
                <form action="<?php echo base_url("userop/do_sign_up"); ?>" method="post">
                
                	<div class="col-md-6">
                		
                		<div class="form-group" style="margin-top:50px">
                            <input id="tckn" maxlength="11" type="text" class="form-control" placeholder="T.C Kimlik Numarası" name="tckn" value="<?php if(!empty($tckn) && isset($form_error) && empty(form_error("tckn"))) { echo $tckn; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("tckn"); ?></small>
                            <?php } ?>
                        </div>
                		
                    	<div class="form-group">
                            <input id="full_name" type="text" class="form-control" placeholder="Ad Soyad" name="full_name" value="<?php if(!empty($full_name) && isset($form_error) && empty(form_error("full_name"))) { echo $full_name; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("full_name"); ?></small>
                            <?php } ?>
                        </div>
                        
                        <div class="form-group" style="position: relative;">
    						<input type="text" id="datetimepicker5" placeholder="Doğum Tarihi GG/AA/YYYY"  class="form-control" name = "birthDate" value="<?php if(!empty($birthDate) && isset($form_error) && empty(form_error("birthDate"))) { echo $birthDate; } ?>">
    						<?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("birthDate"); ?></small>
                            <?php } ?>
    					</div>
    					
    					<div class="form-group">
                            <input id="birthPlace" type="text" class="form-control" placeholder="Doğum Yeri (İl / İlçe)" name="birthPlace" value="<?php if(!empty($birthPlace) && isset($form_error) && empty(form_error("birthPlace"))) { echo $birthPlace; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("birthPlace"); ?></small>
                            <?php } ?>
                        </div>
                        
    			 	</div>
    			 	<div class="col-md-6">
    			 	
    			 		<div class="form-group second-column">
                            <input id="phone" type="text" class="form-control" placeholder="Telefon Numarası" name="phone" value="<?php if(!empty($phone) && isset($form_error) && empty(form_error("phone"))) { echo $phone; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("phone"); ?></small>
                            <?php } ?>
                        </div>
    			 	
    			 		<div class="form-group">
                            <input id="email" type="email" class="form-control" placeholder="E-posta" name="email" value="<?php if(!empty($email) && isset($form_error) && empty(form_error("email"))) { echo $email; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("email"); ?></small>
                            <?php } ?>
                        </div>
                        
                        <div class="form-group">
                            <input id="sign-up-password" type="password" class="form-control" placeholder="Şifre" name="password" value="<?php if(!empty($password) && isset($form_error) && empty(form_error("password")) && empty(form_error("re_password"))) { echo $password; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("password"); ?></small>
                            <?php } ?>
                        </div>
                        
                        <div class="form-group">
                            <input id="sign-up-re-password" type="password" class="form-control" placeholder="Şifre Tekrar" name="re_password" value="<?php if(!empty($password) && isset($form_error) && empty(form_error("re_password")) && empty(form_error("password"))) { echo $password; } ?>">
                            <?php if(isset($form_error)){ ?>
                                <small class="pull-right input-form-error"> <?php echo form_error("re_password"); ?></small>
                            <?php } ?>
                        </div>
                    </div>
        
                    <button type="submit" class="btn btn-primary">Kayıt Ol</button>
                </form>
            </div><!-- #login-form -->
        
            <div class="simple-page-footer">
                <p><a href="<?php echo base_url("login"); ?>">Giriş Yap   -     </a><a href="<?php echo base_url("sifremi-unuttum"); ?>">Şifremi Unuttum ?</a></p>
            </div><!-- .simple-page-footer -->
        </div><!-- .simple-page-wrap -->
	</div>
	
	
	<div class="col-md-4">
        <img
        src="<?php echo base_url("assets/assets/images/fill_form.svg") ?>"
        alt="<?php echo $settings->company_name; ?>"
        class="img-responsive creative"
        style="margin-left:0px">
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

