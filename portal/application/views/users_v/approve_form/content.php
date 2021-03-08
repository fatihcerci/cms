<div class="row">
    <div class="col-md-12">
        <h4 class="m-b-lg">
            <?php echo "<b>$item->full_name</b> Kullanıcı Onay Formu"; ?>
        </h4>
    </div><!-- END column -->
    <div class="col-md-12">
        <div class="widget">
            <div class="widget-body">
                <form action="<?php echo base_url("users/approve/$item->id"); ?>" method="post">
                
                	<div class="form-group">
                        <label>TCKN</label>
                        <input class="form-control" placeholder="T.C Kimlik Numarası" name="tckn" value="<?php if(!empty($tckn) && isset($form_error) && empty(form_error("tckn"))) { echo $tckn; } else { echo $item->tckn; } ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("tckn"); ?></small>
                        <?php } ?>
                    </div>
                    
                	<div class="form-group">
                        <label>Ad Soyad</label>
                        <input class="form-control" placeholder="Ad Soyad" name="full_name" value="<?php if(!empty($full_name) && isset($form_error) && empty(form_error("full_name"))) { echo $full_name; } else { echo $item->full_name; } ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("full_name"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">	
    					<label>Cinsiyet</label> <br>
						<input type="radio" name="gender" id="E" value="E" <?php if(!empty($gender) && $gender=="E" && isset($form_error) && empty(form_error("gender"))) { ?> checked <?php } else if($item->gender == "E") { ?> checked <?php } ?>> Erkek
						<input type="radio" name="gender" id="K" value="K" <?php if(!empty($gender) && $gender=="K" && isset($form_error) && empty(form_error("gender"))) { ?> checked <?php } else if($item->gender == "K") { ?> checked <?php } ?> style="margin-left:8px;"> Kadın
						<?php if(isset($form_error)){ ?>
                             <br><small class="pull-right input-form-error"> <?php echo form_error("gender"); ?></small>
                        <?php } ?>
    				</div>
    				
    				<div class="form-group" style="position: relative;">
						<label for="datetimepicker5">Doğum Tarihi</label>
						<input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "birthDate" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}" value="<?php if(!empty($birthDate) && isset($form_error) && empty(form_error("birthDate"))) { echo $birthDate; } else { echo $item->birthDate; } ?>">
						<?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("birthDate"); ?></small>
                        <?php } ?>
					</div>
					
										
					<div class="form-group">
                        <label>Doğum Yeri (İl / İlçe)</label>
                        <input class="form-control" placeholder="Doğum Yeri (İl / İlçe)" name="birthPlace" value="<?php if(!empty($birthPlace) && isset($form_error) && empty(form_error("birthPlace"))) { echo $birthPlace; } else { echo $item->birthPlace; } ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("birthPlace"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">
                        <label>Telefon</label>
                        <input class="form-control" type="text" placeholder="Telefon Numarası" name="phone" value="<?php if(!empty($phone) && isset($form_error) && empty(form_error("phone"))) { echo $phone; } else { echo $item->phone; } ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("phone"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">
                        <label>E-posta Adresi</label>
                        <input class="form-control" type="email" placeholder="E-posta Adresi" name="email" value="<?php if(!empty($email) && isset($form_error) && empty(form_error("email"))) { echo $email; } else { echo $item->email; } ?>">
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("email"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group" style="position: relative;">
						<label for="datetimepicker5">İşe Giriş Tarihi</label>
						<input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "recruitmentDate" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}" value="<?php if(!empty($recruitmentDate) && isset($form_error) && empty(form_error("recruitmentDate"))) { echo $recruitmentDate; } else { echo $item->recruitmentDate; } ?>">
						<?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("recruitmentDate"); ?></small>
                        <?php } ?>
					</div>

                    <div class="form-group">
                        <label>Proje</label>
                        <select name="user_project_id" class="form-control" style="border-color:#ddd;" <?php if(!$isYetkili) {?> disabled <?php }?>>
                        	<option value="null">---</option>
                            <?php foreach($projects as $project) { ?>
                                <option value="<?php echo $project->id; ?>" <?php if(!empty($user_project_id) && $user_project_id == $project->id && isset($form_error) && empty(form_error("user_project_id"))) { ?> selected="selected" <?php } else if($item->user_project_id == $project->id) { ?> selected="selected" <?php } ?> ><?php echo $project->title; ?> </option>
                            <?php } ?>
                        </select>
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_project_id"); ?></small>
                        <?php } ?>
                    </div>
                    
                    <div class="form-group">
                        <label>Unvanı</label>
                        <select name="user_title_id" class="form-control" style="border-color:#ddd;" <?php if(!$isYetkili) {?> disabled <?php }?>>
                        	<option value="null">---</option>
                            <?php foreach($titles as $title) { ?>
                                <option value="<?php echo $title->id; ?>" <?php if(!empty($user_title_id) && $user_title_id == $title->id && isset($form_error) && empty(form_error("user_title_id"))) { ?> selected="selected" <?php } else if($item->user_title_id == $title->id) { ?> selected="selected" <?php } ?> ><?php echo $title->title; ?> </option>
                            <?php } ?>
                        </select>
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_title_id"); ?></small>
                        <?php } ?>
                    </div>
					
                    <div class="form-group">
                        <label>Kullanıcı Rolü</label>
                        <select name="user_role_id" class="form-control" style="border-color:#ddd;" <?php if(!$isYetkili) {?> disabled <?php }?>>
                            <?php foreach($user_roles as $user_role) { ?>
                                <option value="<?php echo $user_role->id; ?>" <?php if(!empty($user_role_id) && $user_role_id == $user_role->id && isset($form_error) && empty(form_error("user_role_id"))) { ?> selected="selected" <?php } else if($item->user_role_id == $user_role->id) { ?> selected="selected" <?php } ?> ><?php echo $user_role->title; ?></option>
                            <?php } ?>
                        </select>
                        <?php if(isset($form_error)){ ?>
                            <small class="pull-right input-form-error"> <?php echo form_error("user_role_id"); ?></small>
                        <?php } ?>
                    </div>

                    <button type="submit" class="btn btn-primary btn-md btn-outline">Onayla</button>
                    <a href="<?php echo base_url("users/pending"); ?>" class="btn btn-md btn-danger btn-outline">İptal</a>
                </form>
            </div><!-- .widget-body -->
        </div><!-- .widget -->
    </div><!-- END column -->
</div>