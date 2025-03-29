<?php

declare(strict_types = 1);
use OCA\PrideFlags\AppConstants;

?>
<div class="pride_flags_user_settings">
	<div class="settings-section section hidden">
		<h2 class="settings_section__name">Personal preferences</h2>
		<div class="user-settings folder-flavour" style="margin-left: 40px; display: flex;">
			<label for="user-settings-folder-flavour-select" style="display: flex; width: 100px;">Folders</label>
			<select id="user-settings-folder-flavour-select" style="display: flex; width: 200px;">
			<?php foreach (AppConstants\Variants::cases() as $variant): ?>
				<option value="<?= strtolower($variant->name) ?>"><?= $variant->value ?></option>
			<?php endforeach ?>
			</select>
		</div>
		<div class="user-settings button-flavour" style="margin-left: 40px; display: flex;">
			<label for="user-settings-button-flavour-select" style="display: flex; width: 100px;">Buttons</label>
			<select id="user-settings-button-flavour-select" style="display: flex; width: 200px;">
			<?php foreach (AppConstants\Variants::cases() as $variant): ?>
				<option value="<?= strtolower($variant->name) ?>"><?= $variant->value ?></option>
			<?php endforeach ?>
			</select>
		</div>
		<button class="settings-pride-submit button primary" style="margin-left: 40px; display: flex; width: 80px; text-align: center;">Save</button>
	</div>
</div>
