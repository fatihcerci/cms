<style>
    @media (min-width: 992px) {
      .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
      }
    }
    
</style>

<div class="alert alert-info text-center">
    <p>Bugün devam etmekte olan sağlık sorunlarınızın şiddetini (hafif, orta, ağır) işaretleyiniz ve yapılan tedaviyi kısaca belirtiniz.</p>
</div>
<input type="hidden" id="appointmentId" name="appointmentId" value="<?php echo $appointmentId ?>">
	<form id="patientComplaintForm" action="<?php echo base_url("patient/save_complaint/$appointmentId"); ?>" method="post" enctype="multipart/form-data">
		<div class="row">
			<div class="col-md-3">
                <div class="form-group">
                    <label>Rahatsızlık</label>
                    <input class="form-control" name="description">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Şiddet</label>
                    <div class="col-sm-12" style="margin-top:5px">
                        <input type="radio" checked name="violence" id="H" value="0"> Hafif
    					<input type="radio" name="violence" id="O" value="1" style="margin-left:8px;"> Orta
    					<input type="radio" name="violence" id="A" value="2" style="margin-left:8px;"> Ağır
				 	</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Uygulanan Tedavi</label>
                    <input class="form-control" name="treatment_applied">
                </div>
            </div>
            <div class="col-md-1">
            	<div class="form-group">
                	<label>&nbsp;</label>
                    <button class="btn btn-primary btn-sm tab-2-save-btn form-control" style=""><i class="fa fa-plus"></i> Ekle</button>
                </div> 
        	</div> 
        </div> 
    </form> 
    
<?php if(!empty($complaints)) { ?>    
    <table class="table table-hover table-striped table-bordered content-container">
        <thead>
            <th style="display:none;">#id</th>
            <th>Rahatsızlık</th>
            <th>Şiddet</th>
            <th>Uygulanan Tedavi</th>
            <th></th>
        </thead>
        <tbody>

            <?php foreach($complaints as $complaint) { ?>

                <tr>
                    <td style="display:none;">#<?php echo $complaint->id; ?></td>
                    <td class="w200 text-center"><?php echo $complaint->description; ?></td>
                    <td class="w200 text-center">
                    	<div class="col-sm-12" style="margin-top:5px">
                            <input type="radio" disabled name="<?php echo "violence-".$complaint->id; ?>" id="H" value="0" <?php if($complaint->violence=="0") { ?> checked <?php } ?>> Hafif
        					<input type="radio" disabled name="<?php echo "violence-".$complaint->id; ?>" id="O" value="1" <?php if($complaint->violence=="1") { ?> checked <?php } ?> style="margin-left:8px;"> Orta
        					<input type="radio" disabled name="<?php echo "violence-".$complaint->id; ?>" id="A" value="2" <?php if($complaint->violence=="2") { ?> checked <?php } ?> style="margin-left:8px;"> Ağır
    				 	</div>
                    </td>
                    <td class="w200 text-center"><?php echo $complaint->treatment_applied; ?></td>
                    <td class="w50 text-center">
                        <button
                            data-url="<?php echo base_url("patient/delete_complaint/$appointmentId".'_'."$complaint->id"); ?>"
                            class="btn btn-sm btn-danger btn-outline remove-btn">
                            <i class="fa fa-trash"></i> Sil
                        </button>
                    </td>
                </tr>

            <?php } ?>

        </tbody>

    </table>
<?php } ?>                
                
    <hr class="widget-separator">
    <div class="widget-body text-center">
    <button class="btn btn-danger btn-md tab-2-btn-prev" style="width:120px;"><i class="fa fa-reply"></i> Geri</button>
    <button class="btn btn-primary btn-md tab-2-btn-next" style="width:120px;">İleri <i class="fa fa-check"></i></button>
    </div> 
    <hr class="widget-separator">
    
<script>
	$(document).ready(function(){

		$(".tab-2-save-btn").on("click",function(){
			$("#patientComplaintForm")[0].submit();
		});
		
		$(".tab-2-btn-prev").on("click",function(){
			$('#tabs a[href="#tab-1"]').trigger('click');
		});
		
		$(".tab-2-btn-next").on("click",function(){
			$('#tabs a[href="#tab-3"]').trigger('click');
		});
		
	})
</script>