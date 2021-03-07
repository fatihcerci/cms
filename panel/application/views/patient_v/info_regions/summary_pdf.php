<style>
    th, td {
      padding: 15px !important;
    }
</style>
<?php if(!empty($info)) { ?>


	<table border="0" style="width:100%" cellpadding="5">
		<tr>
        	<th colspan="2" style="text-align:center;"><b>KİŞİ BİLGİLERİ</b></th>
        </tr>
    </table>

	<table border="1" style="width:100%" cellpadding="5">
        <tr>
        	<td>T.C Kimlik Numarası</td>
            <td><?php echo $info->tckn; ?></td>
        </tr>
        <tr>
        	<td>Adı</td>
            <td><?php echo $info->name; ?></td>
        </tr>
        <tr>
        	<td>Soyadı</td>
            <td><?php echo $info->surname; ?></td>
        </tr>
        <tr>
        	<td>Doğum Tarihi</td>
            <td><?php echo $info->birthDate; ?></td>
        </tr>
        <tr>
        	<td>Cinsiyet</td>
            <td><?php if($info->gender == "E") { echo "Erkek"; } else if($info->gender == "K") { echo "Kadın"; } ?></td>
        </tr>
        <tr>
        	<td>Boy</td>
            <td><?php echo $info->height; ?></td>
        </tr>
        <tr>
        	<td>Kilo</td>
            <td><?php echo $info->weight; ?></td>
        </tr>
        <tr>
        	<td>İl</td>
            <td><?php echo $info->province; ?></td>
        </tr>
        <tr>
        	<td>İlçe</td>
            <td><?php echo $info->district; ?></td>
        </tr>
        <tr>
        	<td>Adres</td>
            <td><?php echo $info->address; ?></td>
        </tr>
        <tr>
        	<td>Meslek</td>
            <td><?php echo $info->job; ?></td>
        </tr>
        <tr>
        	<td>E-posta Adresi</td>
            <td><?php echo $info->email; ?></td>
        </tr>
        <tr>
        	<td>Telefon Numarası</td>
            <td><?php echo $info->phone; ?></td>
        </tr>
	</table>
	<br/>
	<br/>
	<br/>
	<table border="0" style="width:100%" cellpadding="5">
		<tr>
        	<th colspan="2" style="text-align:center;"><b>ŞİKAYETLER</b></th>
        </tr>
    </table>
    <br/>
	<?php if(!empty($complaints)) { ?>
		<table border="1" style="width:100%" cellpadding="5">
			<tr>
                <td><b>Rahatsızlık</b></td>
                <td><b>Şiddet</b></td>
                <td><b>Uygulanan Tedavi</b></td>
            </tr>
            <tbody>
				<?php foreach($complaints as $complaint) { ?>
    				<tr>
                        <td><?php echo $complaint->description; ?></td>
                        <td><?php if($complaint->violence == "0") { echo "Hafif"; } else if($complaint->violence == "1") { echo "Orta"; } else if($complaint->violence == "2") { echo "Ağır"; } ?></td>
                        <td><?php echo $complaint->treatment_applied; ?></td>
                    </tr>
                <?php } ?>  
            </tbody>
		</table>
	<?php } ?>   
	
	
	<br/>
	<br/>
	<br/>
	<table border="0" style="width:100%" cellpadding="5">
		<tr>
        	<th colspan="2" style="text-align:center;"><b>İLAÇLAR</b></th>
        </tr>
    </table>
    <br/>
	<?php if(!empty($pills)) { ?>
		<table border="1" style="width:100%" cellpadding="5">
			<tr>
                <td><b>İlaç</b></td>
                <td><b>Doz</b></td>
                <td><b>Başlangıç Tarihi</b></td>
                <td><b>Kullanma Nedeni</b></td>
            </tr>
            <tbody>
				<?php foreach($pills as $pill) { ?>
    				<tr>
                        <td><?php echo $pill->name; ?></td>
                        <td><?php echo $pill->dose; ?></td>
                        <td><?php echo get_readable_date($pill->startDate); ?></td>
                        <td><?php echo $pill->reason; ?></td>
                    </tr>
                <?php } ?>  
            </tbody>
		</table>
	<?php } ?>   
	
	
	
<?php } ?>      