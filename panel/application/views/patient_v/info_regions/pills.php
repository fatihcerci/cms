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
    <p>Kullandığınız ilaçları ve nedenlerini kısaca belirtiniz.</p>
</div>
<input type="hidden" id="appointmentId" name="appointmentId" value="<?php echo $appointmentId ?>">
	<form id="patientPillForm" action="<?php echo base_url("patient/save_pill/$appointmentId"); ?>" method="post" enctype="multipart/form-data">
		<div class="row">
			<div class="col-md-3">
                <div class="form-group">
                    <label>İlaç</label>
                    <input class="form-control" name="name">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>Doz</label>
                    <input class="form-control" name="dose">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>Başlangıç Tarihi</label>
                    <input type="text" id="datetimepicker5" placeholder="GG/AA/YYYY"  class="form-control" name = "startDate" data-plugin="datetimepicker" data-options="{format : 'DD/MM/YYYY'}">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Kullanma Nedeni</label>
                    <input class="form-control" name="reason">
                </div>
            </div>

            <div class="col-md-1">
            	<div class="form-group">
                	<label>&nbsp;</label>
                    <button class="btn btn-primary btn-sm tab-3-save-btn form-control" style=""><i class="fa fa-plus"></i> Ekle</button>
                </div> 
        	</div> 
        </div> 
    </form> 
    
<?php if(!empty($pills)) { ?>    
    <table class="table table-hover table-striped table-bordered content-container">
        <thead>
            <th style="display:none;">#id</th>
            <th>İlaç</th>
            <th>Doz</th>
            <th>Başlangıç Tarihi</th>
            <th>Kullanma Nedeni</th>
            <th></th>
        </thead>
        <tbody>

            <?php foreach($pills as $pill) { ?>

                <tr>
                    <td style="display:none;">#<?php echo $pill->id; ?></td>
                    <td class="w200 text-center"><?php echo $pill->name; ?></td>
                    <td class="w200 text-center"><?php echo $pill->dose; ?></td>
                    <td class="w200 text-center"><?php echo get_readable_date($pill->startDate); ?></td>
                    <td class="w200 text-center"><?php echo $pill->reason; ?></td>
                    <td class="w50 text-center">
                        <button
                            data-url="<?php echo base_url("patient/delete_pill/$appointmentId".'_'."$pill->id"); ?>"
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
    <button class="btn btn-danger btn-md tab-3-btn-prev" style="width:120px;"><i class="fa fa-reply"></i> Geri</button>
    <button class="btn btn-primary btn-md tab-3-btn-next" style="width:120px;">İleri <i class="fa fa-check"></i></button>
    </div> 
    <hr class="widget-separator">
    
<script>
	$(document).ready(function(){

		$(".tab-3-save-btn").on("click",function(){
			$("#patientPillForm")[0].submit();
		});
		
		$(".tab-3-btn-prev").on("click",function(){
			$('#tabs a[href="#tab-2"]').trigger('click');
		});
		
		$(".tab-3-btn-next").on("click",function(){
			$('#tabs a[href="#tab-4"]').trigger('click');
		});
		
	})
</script>