<?php $settings = get_settings(); ?>

<div class="simple-page-wrap">
    <div class="simple-page-logo animated swing">
        <a href="<?php base_url() ?> ">
            
        </a>
    </div><!-- logo -->
    <div class="simple-page-form animated flipInY" id="login-form">
    	<a href="<?php base_url() ?> ">
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
        <p><a href="<?php echo base_url("sifremi-unuttum"); ?>">Şifremi Unuttum ?</a></p>
    </div><!-- .simple-page-footer -->


</div><!-- .simple-page-wrap -->