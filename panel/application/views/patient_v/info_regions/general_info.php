<input type="hidden" id="appointmentId" name="appointmentId" value="<?php echo $appointmentId ?>">
<?php if(!empty($info)) { ?>
	<form id="patientGeneralInfoForm" action="<?php echo base_url("patient/update_general_form/$appointmentId"); ?>" method="post" enctype="multipart/form-data">
		<div class="row">
			<div class="col-md-4">
                <div class="form-group">
                    <label>TCKN</label>
                    <input class="form-control" readonly name="tckn" value="<?php echo $info->tckn; ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Ad</label>
                    <input class="form-control" readonly name="name" value="<?php echo $info->name; ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Soyad</label>
                    <input class="form-control" readonly name="surname" value="<?php echo $info->surname; ?>">
                </div>
            </div>
        </div> 
        <div class="row">
        	<div class="col-md-4">
        		<div class="form-group">
                    <label>Doğum Tarihi</label>
                    <input class="form-control" readonly name="birthDate" value="<?php echo $info->birthDate ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Boy</label>
                    <input class="form-control" name="height" value="<?php echo $info->height ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Kilo</label>
                    <input class="form-control" name="weight" value="<?php echo $info->weight ?>">
                </div>
            </div>
        </div> 
        
        <div class="row">
        	<div class="col-md-4">
        		<div class="form-group">
                    <label>İl</label>
                    <input class="form-control" name="province" value="<?php echo $info->province; ?>">
                </div>
            </div>
            <div class="col-md-4">
        		<div class="form-group">
                    <label>İlçe</label>
                    <input class="form-control" name="district" value="<?php echo $info->district; ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Adres</label>
                    <input class="form-control" name="address" value="<?php echo $info->address ?>">
                </div>
            </div>
      	</div>
      	
      	<div class="row">
      		<div class="col-md-4">
                <div class="form-group">
                    <label>Meslek</label>
                    <input class="form-control" name="job" value="<?php echo $info->job ?>">
                </div>
            </div>
      		<div class="col-md-4">
                <div class="form-group">
                    <label>Eposta Adresi</label>
                    <input class="form-control" readonly name="email" value="<?php echo $info->email ?>">
                </div>
            </div>      
            <div class="col-md-4">
                <div class="form-group">
                    <label>Telefon Numarası</label>
                    <input class="form-control" readonly name="phone" value="<?php echo $info->phone ?>">
                </div>
            </div>
       	</div>  
    </form> 
    <hr class="widget-separator">
    <div class="widget-body text-center">
    <button class="btn btn-primary btn-md tab-1-btn-next" style="width:120px;">İleri <i class="fa fa-check"></i></button>
    </div> 
    <hr class="widget-separator">
<?php } ?>  	
<script>
	$(document).ready(function(){
        $(".tab-1-btn-next").on("click",function(){
			$("#patientGeneralInfoForm")[0].submit();
		});
	})
</script>