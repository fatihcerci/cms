<div class="row">
    <div class="col-md-12">
        <h4 class="m-b-lg">
            Onay Bekleyen Kullanıcı Listesi
        </h4>
    </div><!-- END column -->
    <div class="col-md-12">
        <div class="widget p-lg">

            <?php if(empty($items)) { ?>

                <div class="alert alert-info text-center">
                    <p>Burada herhangi bir veri bulunmamaktadır.</p>
                </div>

            <?php } else { ?>

                <table class="table table-hover table-striped table-bordered content-container">
                    <thead>
                        <th style="display:none;">#id</th>
                        <th>TCKN</th>
                        <th>Ad Soyad</th>
                        <th>Telefon</th>
                        <th>E-posta</th>
                        <th>İstek Tarihi</th>
                        <th>İşlemler</th>
                    </thead>
                    <tbody>

                        <?php foreach($items as $item) { ?>

                            <tr>
                                <td style="display:none;">#<?php echo $item->id; ?></td>
                                <td class="text-center"><?php echo $item->tckn; ?></td>
                                <td class="text-center"><?php echo $item->full_name; ?></td>
                                <td class="text-center"><?php echo $item->phone; ?></td>
                                <td class="text-center"><?php echo $item->email; ?></td>
                                <td class="text-center"><?php echo get_readable_datetime($item->createdAt); ?></td>
                                <td class="text-center w200">
                                    <button
                                        data-url="<?php echo base_url("users/delete/$item->id"); ?>"
                                        class="btn btn-sm btn-danger btn-outline remove-btn">
                                        <i class="fa fa-trash"></i> Sil
                                    </button>
                                    <a href="<?php echo base_url("users/approve_form/$item->id"); ?>" class="btn btn-sm btn-info btn-outline"><i class="fa fa-pencil-square-o"></i> Onay Formu</a>
                                </td>
                            </tr>

                        <?php } ?>

                    </tbody>

                </table>

            <?php } ?>

        </div><!-- .widget -->
    </div><!-- END column -->
</div>