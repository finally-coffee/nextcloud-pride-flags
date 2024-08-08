<?php

namespace OCA\PrideFlags\Settings;

use OCA\PrideFlags\AppConstants;
use OCP\IConfig;

class AppSettings {
	public const FOLDER_VARIANT = 'folderVariant';
	public const BUTTON_VARIANT = 'buttonVariant';

	public function __construct(private IConfig $config) {
	}

	public function getStringSetting($userId, string $key, string $default = ''): string {
		return $this->config->getUserValue(AppConstants::APP_ID, $userId, $key) ?: $default;
	}

	public function setStringSetting($userId, string $key, string $value): void {
		$this->config->setUserValue(AppConstants::APP_ID, $userId, $key, $value);
	}

	public function getAll($userId): array {
		return [
			AppSettings::FOLDER_VARIANT => $this->getStringSetting($userId, AppSettings::FOLDER_VARIANT, 'pride'),
			AppSettings::BUTTON_VARIANT => $this->getStringSetting($userId, AppSettings::BUTTON_VARIANT, 'trans'),
		];
	}

	public function set($userId, $folder, $button): void {
		$this->setStringSetting($userId, AppSettings::FOLDER_VARIANT, $folder);
		$this->setStringSetting($userId, AppSettings::BUTTON_VARIANT, $button);
	}
}
