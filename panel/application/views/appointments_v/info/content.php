<style>
    @media (min-width: 992px) {
      .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
      }
    }
</style>



    			
<div class="col-md-8 col-md-center">
	<div class="panel panel-primary" style="min-height:421px;">
		<div class="panel-heading " style="padding:12px !important;">
			<span class="pull-left big-icon"></span>
			<h4 class="panel-title text-center" style="padding-left:20px;text-transform:none !important;">Kişi Bilgileri</h4>
		</div>
		
		<div class="widget">
			<div class="m-b-lg nav-tabs-horizontal">
				<!-- tabs list -->
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#tab-1" aria-controls="tab-6" role="tab" data-toggle="tab">Genel Bilgiler</a></li>
					<li role="presentation"><a href="#tab-2" aria-controls="tab-1" role="tab" data-toggle="tab">Şikayetler</a></li>
					<li role="presentation"><a href="#tab-3"  aria-controls="tab-2" role="tab" data-toggle="tab">Hastalıklar</a></li>
					<li role="presentation"><a href="#tab-4"  aria-controls="tab-3" role="tab" data-toggle="tab">İlaçlar</a></li>
					<li role="presentation"><a href="#tab-5"  aria-controls="tab-4" role="tab" data-toggle="tab">Uyku Düzeni</a></li>
					<li role="presentation"><a href="#tab-6"  aria-controls="tab-5" role="tab" data-toggle="tab">Egzersiz ve Hareket</a></li>
					<li role="presentation"><a href="#tab-7"  aria-controls="tab-6" role="tab" data-toggle="tab">Beslenme</a></li>
				</ul><!-- .nav-tabs -->

				<!-- Tab panes -->
				<div class="tab-content p-md">
					<div role="tabpanel" class="tab-pane in active fade" id="tab-1" style="min-height:300px;">
					
						<div class="row">
    						<div class="col-md-4">
                                <div class="form-group">
                                    <label>TCKN</label>
                                    <input class="form-control" readonly name="tckn" value="<?php echo $item->tckn; ?>">
                                </div>
                                <div class="form-group">
                                    <label>Doğum Tarihi</label>
                                    <input class="form-control" readonly name="birthDate" value="<?php echo $item->birthDate ?>">
                                </div>
                            </div><!-- END column -->
                            
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Ad</label>
                                    <input class="form-control" readonly name="name" value="<?php echo $item->name; ?>">
                                </div>
                                <div class="form-group">
                                    <label>Eposta</label>
                                    <input class="form-control" readonly name="email" value="<?php echo $item->email ?>">
                                </div>
                            </div><!-- END column -->
                            
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Soyad</label>
                                    <input class="form-control" readonly name="surname" value="<?php echo $item->surname; ?>">
                                </div>
                                <div class="form-group">
                                    <label>Telefon</label>
                                    <input class="form-control" readonly name="phone" value="<?php echo $item->phone ?>">
                                </div>
                            </div><!-- END column -->
                          </div>  
                          <hr class="widget-separator">
                          <div class="widget-body text-center">
                          	<button class="btn btn-primary btn-md tab-1-btn" style="width:120px;">İleri <i class="fa fa-check"></i></button>
                          </div> 
                          <hr class="widget-separator">
					</div><!-- .tab-pane  -->
					
					
					<div role="tabpanel" class="tab-pane fade" id="tab-2">
						<h4 class="m-b-md">Şikayetler</h4>
					</div><!-- .tab-pane  -->



					<div role="tabpanel" class="tab-pane fade" id="tab-3">
						<h4 class="m-b-md">Hastalıklar</h4>
					</div>
					
					
					
					<div role="tabpanel" class="tab-pane fade" id="tab-4">
						<h4 class="m-b-md">İlaçlar</h4>
					</div>
					
					
					
					<div role="tabpanel" class="tab-pane fade" id="tab-5">
						<h4 class="m-b-md">Uyku Düzeni</h4>
					</div>
					
					
					
					<div role="tabpanel" class="tab-pane fade" id="tab-6">
						<h4 class="m-b-md">Egzersiz ve Hareket</h4>
					</div>
					
					
					
					<div role="tabpanel" class="tab-pane fade" id="tab-7">
						<h4 class="m-b-md">Beslenme</h4>
					</div>
				</div>
			</div>
		</div>	
	</div>	
</div><!-- END column -->

<script>
	$(document).ready(function(){
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
		
		$(".tab-1-btn").on("click",function(){
    		 $('.nav-tabs a[href="#tab-2"]').tab('show');	
		});
	})
</script>