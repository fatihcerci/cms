<?php 
    $isYetkili = isYetkili();
?>
<div class="row">
    <div class="col-md-12">
        <h4 class="m-b-lg">
            Yeni Kullanıcı Ekle
        </h4>
    </div><!-- END column -->
    <div class="col-md-12">
        <div class="widget">
            <div class="widget-body">
                <form action="<?php echo base_url("users/save"); ?>" method="post">
                
                    <div class="form-group">
                        <label>Ad Soyad</label>
                        <input class="form-control" placeholder="Ad Soyad" name="full_name" value="<?php echo isset($form_error) ? set_value("full_name") : ""; ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("full_name"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">
                        <label>E-posta Adresi</label>
                        <input class="form-control" type="email" placeholder="E-posta Adresi" name="email" value="<?php echo isset($form_error) ? set_value("email") : ""; ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("email"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group" style="position: relative;">
						<label for="datetimepicker5">İşe Giriş Tarihi</label>
						<input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "recruitmentDate" value="<?php echo isset($form_error) ? set_value("recruitmentDate") : ""; ?>" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}">
						<?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("recruitmentDate"); ?></small>
                        <?php } ?>
					</div>
                    
                    <div class="form-group" style="position: relative;">
						<label for="datetimepicker5">Doğum Tarihi</label>
						<input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "birthDate" value="<?php echo isset($form_error) ? set_value("birthDate") : ""; ?>" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}">
						<?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("birthDate"); ?></small>
                        <?php } ?>
					</div>
					
					<div class="form-group">
                        <label>Doğum Yeri (İl / İlçe)</label>
                        <input class="form-control" placeholder="Doğum Yeri (İl / İlçe)" name="birthPlace" value="<?php echo isset($form_error) ? set_value("birthPlace") : ""; ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("birthPlace"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">
                        <label>Proje</label>
                        <select name="user_project_id" class="form-control" <?php if(!$isYetkili) {?> disabled <?php }?>>
                            <?php foreach($projects as $project) { ?>
                                <option value="<?php echo $project->id; ?>"><?php echo $project->title; ?></option>
                            <?php } ?>
                        </select>
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_project_id"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">
                        <label>Unvanı</label>
                        <select name="user_title_id" class="form-control" <?php if(!$isYetkili) {?> disabled <?php }?>>
                            <?php foreach($titles as $title) { ?>
                                <option value="<?php echo $title->id; ?>"><?php echo $title->title; ?></option>
                            <?php } ?>
                        </select>
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_title_id"); ?></small>
                        <?php } ?>
                    </div>
					
                    <div class="form-group">
                        <label>Kullanıcı Rolü</label>
                        <select name="user_role_id" class="form-control" <?php if(!$isYetkili) {?> disabled <?php }?>>
                            <?php foreach($user_roles as $user_role) { ?>
                                <option value="<?php echo $user_role->id; ?>"><?php echo $user_role->title; ?></option>
                            <?php } ?>
                        </select>
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_role_id"); ?></small>
                        <?php } ?>
                    </div>

                    <button type="submit" class="btn btn-primary btn-md btn-outline">Kaydet</button>
                    <a href="<?php echo base_url("users"); ?>" class="btn btn-md btn-danger btn-outline">İptal</a>
                </form>
            </div><!-- .widget-body -->
        </div><!-- .widget -->
    </div><!-- END column -->
</div>