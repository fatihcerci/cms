<style>
    @media (min-width: 992px) {
      .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
      }
    }
    
</style>

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
                    <input class="form-control" readonly name="height" value="<?php echo $info->height ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Kilo</label>
                    <input class="form-control" readonly name="weight" value="<?php echo $info->weight ?>">
                </div>
            </div>
        </div> 
        
        <div class="row">
        	<div class="col-md-4">
        		<div class="form-group">
                    <label>İl</label>
                    <input class="form-control" readonly name="province" value="<?php echo $info->province; ?>">
                </div>
            </div>
            <div class="col-md-4">
        		<div class="form-group">
                    <label>İlçe</label>
                    <input class="form-control" readonly name="district" value="<?php echo $info->district; ?>">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Adres</label>
                    <input class="form-control" readonly name="address" value="<?php echo $info->address ?>">
                </div>
            </div>
      	</div>
      	
      	<div class="row">
      		<div class="col-md-4">
                <div class="form-group">
                    <label>Meslek</label>
                    <input class="form-control" readonly name="job" value="<?php echo $info->job ?>">
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
<?php } ?>  

<hr class="widget-separator" style="padding:5px;">

<div class="row">
	<div class="col-md-12 text-center">
        <div class="form-group">
            <h4>Şikayetler</h4>
        </div>
    </div>
</div>

<hr class="widget-separator" style="padding:20px;">

<?php if(!empty($complaints)) { ?>    
    <table class="table table-hover table-striped table-bordered content-container">
        <thead>
            <th style="display:none;">#id</th>
            <th>Rahatsızlık</th>
            <th>Şiddet</th>
            <th>Uygulanan Tedavi</th>
        </thead>
        <tbody>

            <?php foreach($complaints as $complaint) { ?>

                <tr>
                    <td style="display:none;">#<?php echo $complaint->id; ?></td>
                    <td class="w200 text-center"><?php echo $complaint->description; ?></td>
                    <td class="w200 text-center">
                    	<div class="col-sm-10" style="margin-top:5px">
                            <input type="radio" disabled name="<?php echo "violence-".$complaint->id; ?> id="H" value="0" <?php if($complaint->violence=="0") { ?> checked <?php } ?>> Hafif
        					<input type="radio" disabled name="<?php echo "violence-".$complaint->id; ?> id="O" value="1" <?php if($complaint->violence=="1") { ?> checked <?php } ?> style="margin-left:8px;"> Orta
        					<input type="radio" disabled name="<?php echo "violence-".$complaint->id; ?> id="A" value="2" <?php if($complaint->violence=="2") { ?> checked <?php } ?> style="margin-left:8px;"> Ağır
    				 	</div>
                    </td>
                    <td class="w200 text-center"><?php echo $complaint->treatment_applied; ?></td>
                </tr>

            <?php } ?>

        </tbody>

    </table>
<?php } ?>                

<hr class="widget-separator" style="padding:5px; margin-top:25px;">

<div class="row">
	<div class="col-md-12 text-center">
        <div class="form-group">
            <h4>İlaçlar</h4>
        </div>
    </div>
</div>

<hr class="widget-separator" style="padding:20px;">

<?php if(!empty($pills)) { ?>    
    <table class="table table-hover table-striped table-bordered content-container">
        <thead>
            <th style="display:none;">#id</th>
            <th>İlaç</th>
            <th>Doz</th>
            <th>Başlangıç Tarihi</th>
            <th>Kullanma Nedeni</th>
        </thead>
        <tbody>

            <?php foreach($pills as $pill) { ?>

                <tr>
                    <td style="display:none;">#<?php echo $pill->id; ?></td>
                    <td class="w200 text-center"><?php echo $pill->name; ?></td>
                    <td class="w200 text-center"><?php echo $pill->dose; ?></td>
                    <td class="w200 text-center"><?php echo get_readable_date($pill->startDate); ?></td>
                    <td class="w200 text-center"><?php echo $pill->reason; ?></td>
                </tr>

            <?php } ?>

        </tbody>

    </table>
<?php } ?>      


<hr class="widget-separator">
<div class="widget-body text-center">
<a href="<?php echo base_url("patient/createPdf/$appointmentId"); ?>" class="btn btn-danger btn-md btn-create-pdf" style="width:140px;">PDF Oluştur &nbsp;&nbsp;<i class="fa fa-file-pdf-o"></i></a>
</div> 
<hr class="widget-separator">
	




    
<script>
	$(document).ready(function(){
		
	})
</script>