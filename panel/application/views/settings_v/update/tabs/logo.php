<div role="tabpanel" class="tab-pane fade" id="tab-7">

    <div class="row">

        <div class="col-md-2">
            <img
                src="<?php echo get_logo($viewFolder, $item->logo); ?>"
                alt="<?php echo $item->company_name; ?>"
                class="img-responsive"
                style="margin: 0px auto"
            >
        </div>

        <div class="form-group col-md-6">
            <label>Logo Seçimi</label>
            <input type="file" name="logo" class="form-control">
        </div>

    </div>

</div><!-- .tab-pane  -->