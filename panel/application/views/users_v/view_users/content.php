<div class="row">
    <div class="col-md-12">
        <h4 class="m-b-lg">
            Çalışan Listesi
        </h4>
    </div><!-- END column -->
    <div class="col-md-12">
        <div class="widget p-lg">

            <?php if(empty($users)) { ?>

                <div class="alert alert-info text-center">
                    <p>Çalışan kaydı bulunmamaktadır.</p>
                </div>

            <?php } else { ?>

                <table class="table table-hover table-striped table-bordered content-container">
                    <thead>
                        <th>Ad Soyad</th>
                        <th>Proje</th>
                        <th>Unvan</th>
                        <th>E-posta</th>
                        <th>Doğum Yeri</th>
                        <th>Doğum Tarihi</th>
                        <th>İşe Giriş Tarihi</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <?php foreach($users as $user) { ?>
                            <tr>
                                <td class="text-center"><?php echo $user->full_name; ?></td>
                                <td class="text-center"><?php echo $user->project; ?></td>
                                <td class="text-center"><?php echo $user->title; ?></td>
                                <td class="text-center"><?php echo $user->email; ?></td>
                                <td class="text-center"><?php echo $user->birthPlace; ?></td>
                                <td class="text-center"><?php echo get_readable_date($user->birthDate); ?></td>
                                <td class="text-center"><?php echo get_readable_date($user->recruitmentDate); ?></td>
                                <td class="text-center w50">
                                    <a href="<?php echo base_url("users/view_profile/$user->id"); ?>" class="btn btn-sm btn-primary btn-outline"><i class="fa fa-search"></i></a>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            <?php } ?>
        </div><!-- .widget -->
    </div><!-- END column -->
</div>