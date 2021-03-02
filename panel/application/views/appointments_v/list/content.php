<style>
    @media (min-width: 992px) {
      .col-md-center {
        float: none;
        margin-left: auto;
        margin-right: auto;
      }
    }
</style>

<div class="row">
    <div class="col-md-12" >
        <h4 class="m-b-lg text-center">
            Randevu Listesi
            <a href="<?php echo base_url("appointments/new_form"); ?>" class="btn btn-outline btn-primary btn-xs pull-right"> <i class="fa fa-plus"></i> Yeni Ekle</a>
        </h4>
    </div><!-- END column -->
</div>
  

<div class="container-fluid">
    <div class="row justify-content-center">
    	<?php if(!empty($items)) { 
                foreach($items as $item) { ?>
        			<div class="col-md-3">
                		<div class="widget">
                			<div class="widget-body text-center">
                				<div class="big-icon m-b-md watermark"><i class="fa fa-3x <?php if($item->gender == "E") { ?> fa-male <?php } else { ?> fa-female <?php } ?>"></i></div>
                				<h4 class="m-b-md"><?php echo $item->name." ".$item->surname ?></h4>
                				<p class="text-muted m-b-lg">
                					<?php echo $item->email ?> <br>
                					<?php echo $item->phone ?> <br>
                					<b><?php echo get_readable_datetime($item->appointmentDate); ?></b>
                				</p>
                    			<hr class="widget-separator">
                				<a href="<?php echo base_url("appointments/update_form/$item->id"); ?>" class="btn p-v-md btn-primary" style="margin-top:15px;">Randevu Görüntüle</a>
                				<a href="<?php echo base_url("appointments/info_form/$item->id"); ?>" class="btn p-v-md btn-primary" style="margin-top:15px;">Hasta Bilgileri</a>
                			</div><!-- .widget-body -->
                		</div><!-- .widget -->
            		</div><!-- END column -->
        	<?php }
        }
        ?>
	</div>
</div>
	
	<!-- 
    <div class="col-md-12">
        <div class="widget p-lg">

            <?php if(empty($items)) { ?>

                <div class="alert alert-info text-center">
                    <p>Burada herhangi bir veri bulunmamaktadır. Eklemek için lütfen <a href="<?php echo base_url("appointments/new_form"); ?>">tıklayınız</a></p>
                </div>

            <?php } else { ?>

                <table class="table table-hover table-striped table-bordered content-container">
                    <thead>
                        <th style="display:none;">#id</th>
                        <th>Randevu Tarihi</th>
                        <th>TCKN</th>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Doğum Tarihi</th>
                        <th>E-posta</th>
                        <th>Telefon</th>
                        <th>Durum</th>
                        <th></th>
                    </thead>
                    <tbody>

                        <?php foreach($items as $item) { ?>

                            <tr id="ord-<?php echo $item->id; ?>">
                                <td style="display:none;">#<?php echo $item->id; ?></td>
                                <td class="text-center"><?php echo get_readable_datetime($item->appointmentDate); ?></td>
                                <td class="text-center"><?php echo $item->tckn; ?></td>
                                <td class="text-center"><?php echo $item->name; ?></td>
                                <td class="text-center"><?php echo $item->surname; ?></td>
                                <td class="w200 text-center"><?php echo get_readable_date($item->birthDate); ?></td>
                                <td class="text-center"><?php echo $item->email; ?></td>
                                <td class="text-center"><?php echo $item->phone; ?></td>
                                <td class="text-center w100">
                                    <input
                                        data-url="<?php echo base_url("appointments/isActiveSetter/$item->id"); ?>"
                                        class="isActive"
                                        type="checkbox"
                                        data-switchery
                                        data-color="#10c469"
                                        <?php echo ($item->isActive) ? "checked" : ""; ?>
                                    />
                                </td>
                                <td class="text-center w200">
                                    <button
                                        data-url="<?php echo base_url("appointments/delete/$item->id"); ?>"
                                        class="btn btn-sm btn-danger btn-outline remove-btn">
                                        <i class="fa fa-trash"></i> Sil
                                    </button>
                                    <a href="<?php echo base_url("appointments/update_form/$item->id"); ?>" class="btn btn-sm btn-info btn-outline"><i class="fa fa-pencil-square-o"></i> Düzenle</a>
                                </td>
                            </tr>

                        <?php } ?>

                    </tbody>

                </table>

            <?php } ?>

        </div>
    </div>
     -->
</div>