<style>
    @media (min-width: 992px) {
      .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
      }
    }
</style>



    			
<div class="col-md-12 col-md-center">
	<div class="panel panel-primary" style="min-height:421px;">
		<div class="panel-heading " style="padding:12px !important;">
			<span class="pull-left big-icon"><a href="<?php echo base_url("appointments"); ?>" style="color:#fff;"><i class="fa fa-reply"></i> &nbsp;Randevu Ekranına Dön</a></span>
			<h4 class="panel-title text-center" style="margin-right: 160px;text-transform:none !important;">Hasta Bilgileri</h4>
		</div>
		
		<div class="widget">
			<div class="m-b-lg nav-tabs-horizontal">
				<!-- tabs list -->
				<div id="tabs">
    				<ul class="nav nav-tabs" activeTab="<?php echo $tab ?>" role="tablist">
    					<li role="presentation" class="active"><a href="#tab-1" aria-controls="tab-6" role="tab" data-toggle="tab">Genel Bilgiler</a></li>
    					<li role="presentation"><a href="#tab-2" aria-controls="tab-1" role="tab" data-toggle="tab">Şikayetler</a></li>
    					<li role="presentation"><a href="#tab-3"  aria-controls="tab-2" role="tab" data-toggle="tab">İlaçlar</a></li>
    					<li role="presentation"><a href="#tab-4"  aria-controls="tab-3" role="tab" data-toggle="tab">Özet</a></li>
    				</ul><!-- .nav-tabs -->
    			

    				<!-- Tab panes -->
    				<div class="tab-content p-md">
    					<div role="tabpanel" class="tab-pane in active fade" id="tab-1" style="min-height:300px;">
    						<?php $this->load->view("patient_v/info_regions/general_info"); ?>
    					</div>
    					
    					
    					<div role="tabpanel" class="tab-pane fade" id="tab-2" style="min-height:300px;">
    						<?php $this->load->view("patient_v/info_regions/complaints"); ?>
    					</div><!-- .tab-pane  -->
    
    					
    					<div role="tabpanel" class="tab-pane fade" id="tab-3" style="min-height:300px;">
    						<?php $this->load->view("patient_v/info_regions/pills"); ?>
    					</div>
    					
    					
    					
    					<div role="tabpanel" class="tab-pane fade" id="tab-4" style="min-height:300px;">
    						<?php $this->load->view("patient_v/info_regions/summary"); ?>
    					</div>
    					
    				</div>
    				
				</div>
				
			</div>
		</div>	
	</div>	
</div><!-- END column -->

<script>
	$(document).ready(function(){
	
		var loaded = false;
		
		$("#tabs").tabs({
            activate: function(event, ui) {
            	if(loaded) {
            		var id = document.getElementById("appointmentId").value;
            		var tabid = "#"+ui["newPanel"][0].id;

            		var params = id+"_"+ui["newPanel"][0].id;
            		
            		var url = "<?php echo base_url("patient/info_form/"); ?>" +params;
            		window.location.href = url;
            		
            	}
            }
        });
        
        
		$(".createAppointment").on("click",function(){
    		swal({
                text: 'Randevu kaydedilecektir, devam etmek istiyor musunuz?',
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
		
		var navTab = $('.nav-tabs').attr("activeTab");
		$('#tabs a[href='+navTab+']').trigger('click');

		loaded=true;
	})
</script>