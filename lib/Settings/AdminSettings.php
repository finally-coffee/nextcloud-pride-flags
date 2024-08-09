<?php

declare(strict_types=1);

namespace OCA\PrideFlags\Settings;

use OCA\PrideFlags\AppConstants;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;
use OCP\Util;

class AdminSettings implements ISettings {
	public function getForm(): TemplateResponse {
		Util::addScript(AppConstants::APP_ID, 'pride-settings-global');
		return new TemplateResponse(AppConstants::APP_ID, 'server-settings', []);
	}

	public function getSection(): string {
		return AppConstants::APP_ID;
	}

	public function getPriority(): int {
		return 50;
	}
}
