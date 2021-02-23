<?php 
    $announcement = get_last_announcement(); 
?>
<!-- Central Modal Large -->
<div class="modal fade" id="dogumGunuPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
    <!--Content-->
    <div class="modal-content">
      <!--Header-->
      <div class="modal-header">
      
        <h4 class="modal-title w-100" id="myModalLabel">Doğum Günü</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Body-->
      <div class="modal-body">
        Doğum Günü
      </div>
      <!--Footer-->
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Kapat</button>
        <button data-popup-id="dogumGunu-1" 
        		data-url="<?php echo base_url("duyuru-bir-daha-gosterme") ?>"  
        		data-csrf-key="<?php echo $this->security->get_csrf_token_name(); ?>" 
        		data-csrf-value="<?php echo $this->security->get_csrf_hash(); ?>" 
        		
        		type="button" class="btn btn-danger dogumGunuBirDahaGostermeBtn" data-dismiss="modal">Bir daha gösterme</button>
      </div>
    </div>
    <!--/.Content-->
    </div>
</div>
    
 
    
<?php 
$duyuru_id = "duyuru-".$announcement->id;
$duyuru_popup_cookie = get_cookie($duyuru_id);

if($duyuru_popup_cookie != "true") { ?>

    <div class="modal fade" id="duyuruPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Header-->
<!--           <div class="modal-header"> -->
          	<div class="panel panel-danger">
    			<div class="panel-heading" style="padding: 12px; !important">
            	<h4 class="modal-title w-100 text-center" id="myModalLabel"><?php echo $announcement->title ?></h4>
            	</div>
            </div>
<!--           </div> -->
          <!--Body-->
          <div class="modal-body">
            <?php echo $announcement->description ?>
          </div>
          <!--Footer-->
          <div class="modal-footer text-center">
          	<button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
            <button data-popup-id="duyuru-<?php echo $announcement->id ?>" 
            		data-url="<?php echo base_url("duyuru-bir-daha-gosterme") ?>"  
            		data-csrf-key="<?php echo $this->security->get_csrf_token_name(); ?>" 
            		data-csrf-value="<?php echo $this->security->get_csrf_hash(); ?>" 
            		
            		type="button" class="btn btn-primary duyuruBirDahaGostermeBtn" data-dismiss="modal">Bir daha gösterme</button>
          </div>
        </div>
        <!--/.Content-->
        </div>
    </div>
<?php } ?>
    
    

<script>
	$(document).ready(function(){
		$('#duyuruPopup').modal('show');
		
		$(".duyuruBirDahaGostermeBtn").click(function(){
			
			var $url = $(this).data("url");
			var $id = $(this).data("popup-id");
			
			var $data = {
				url : $url,
				popup_id : $id
			}
			
			var csrf_key = $(this).data("csrf-key");
			var csrf_value = $(this).data("csrf-value");
			
			$data[csrf_key] = csrf_value;
			
			$.post($url, $data, function(){
// 				$('#dogumGunuPopup').modal('show');
			});
		});
		
		$(".dogumGunuBirDahaGostermeBtn").click(function(){
			
			var $url = $(this).data("url");
			var $id = $(this).data("popup-id");
			
			var $data = {
				url : $url,
				popup_id : $id
			}
			
			var csrf_key = $(this).data("csrf-key");
			var csrf_value = $(this).data("csrf-value");
			
			$data[csrf_key] = csrf_value;
			
			$.post($url, $data, function(){
			
			});
		});
	}) 
	
	
</script>