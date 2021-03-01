<style>
    @media (min-width: 992px) {
      .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
      }
    }
</style>


<div class="col-md-5 col-md-center">
	<div class="widget">
		<header class="widget-header">
			<h4 class="widget-title text-center">Randevu Formu</h4>
		</header><!-- .widget-header -->
		<hr class="widget-separator">
		<div class="widget-body">
			<form action="<?php echo base_url("appointments/save"); ?>" method="post" class="form-horizontal" enctype="multipart/form-data">
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">TCKN</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" class="form-control" placeholder="T.C Kimlik Numaranız" id="tckn" name="tckn">
								<?php if(isset($form_error)){ ?>
                                    <small class="pull-right input-form-error"> <?php echo form_error("tckn"); ?></small>
                                <?php } ?>
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">Ad</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" class="form-control" placeholder="Adınız" id="name" name="name">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">Soyad</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" class="form-control" placeholder="Soyadınız" id="surname" name="surname">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label" style="padding-top:0px; !important">Cinsiyet</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="radio" name="gender" id="E" value="E"> Erkek
								<input type="radio" name="gender" id="K" value="K" style="margin-left:8px;"> Kadın
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-3 col-sm-offset-1 control-label">Doğum Tarihi</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "birthDate" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">E-posta</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="email" class="form-control" placeholder="E-posta adresiniz" id="email" name="email">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">Telefon</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="phone" class="form-control" placeholder="Telefon" id="phone" name="phone">
							</div>
						</div>
					</div>
				</div>
				
				
				<div class="row">
					<div class="col-sm-3 col-md-center" style="margin-top:20px;">
						<button type="submit" class="btn btn-success">Randevu Oluştur</button>
					</div>
				</div>
			</form>
		</div><!-- .widget-body -->
	</div><!-- .widget -->
</div><!-- END column -->
