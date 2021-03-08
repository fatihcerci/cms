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
	<div class="panel panel-primary" style="min-height:421px;">
		<div class="panel-heading " style="padding:12px !important;">
		<span class="pull-left big-icon"></span>
			<h4 class="panel-title text-center" style="padding-left:20px;text-transform:none !important;">Randevu Formu</h4>
		</div>
		<div class="widget-body">
			<form id="appointmentForm" action="<?php echo base_url("appointments/update/$item->id"); ?>" method="post" class="form-horizontal" enctype="multipart/form-data">
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">TCKN</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" class="form-control" placeholder="T.C Kimlik Numaranız" id="tckn" name="tckn" value="<?php echo $item->tckn; ?>">
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
								<input type="text" class="form-control" placeholder="Adınız" id="name" name="name" value="<?php echo $item->name; ?>">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">Soyad</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" class="form-control" placeholder="Soyadınız" id="surname" name="surname" value="<?php echo $item->surname; ?>">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label" style="padding-top:0px; !important">Cinsiyet</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="radio" name="gender" id="E" value="E" <?php if($item->gender == "E") { ?> checked="checked" <?php } ?>> Erkek
								<input type="radio" name="gender" id="K" value="K" style="margin-left:8px;" <?php if($item->gender == "K") { ?> checked="checked" <?php } ?>> Kadın
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-3 col-sm-offset-1 control-label">Doğum Tarihi</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "birthDate" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}" value="<?php echo $item->birthDate; ?>">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">E-posta</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="email" class="form-control" placeholder="E-posta adresiniz" id="email" name="email" value="<?php echo $item->email; ?>">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-2 col-sm-offset-2 control-label">Telefon</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="phone" class="form-control" placeholder="Telefon" id="phone" name="phone" value="<?php echo $item->phone; ?>">
							</div>
						</div>
					</div>
				</div>
				
				<div class="form-group" style="margin-bottom:7px !important">	
					<label for="#" class="col-sm-3 col-sm-offset-1 control-label">Randevu Tarihi</label>
					<div class="col-sm-5">
						<div class="form-group" style="margin-bottom:7px !important">
							<div class="col-sm-10">
								<input type="hidden" name="appointmentDate" id="datetimepicker1" data-plugin="datetimepicker" data-options="{inline: true, viewMode: 'days', format : 'YYYY-MM-DD HH:mm'}" value="<?php echo $item->appointmentDate; ?>" />
							</div>
						</div>
					</div>
				</div>
			</form>
			<div class="col-md-6 col-md-center">
					<button onclick="goBack()" class="btn btn-default">Geri Dön</button>
					<button type="submit" class="btn btn-success updateAppointment">Randevu Güncelle</button>
			</div>
		</div><!-- .widget-body -->
	</div><!-- .widget -->
</div><!-- END column -->


<script>
	function goBack() {
    	window.history.back();
    }
	$(document).ready(function(){
		$(".updateAppointment").on("click",function(){
    		swal({
                text: 'Randevu kaydı güncellenecektir, devam etmek istiyor musunuz?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Evet',
                cancelButtonText : "Hayır"
            }).then(function (result) {
                if (result.value) {
                    $("#appointmentForm")[0].submit();
                }
            });
		});
	})
</script>