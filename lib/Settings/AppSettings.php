<?php

namespace OCA\PrideFlags\Settings;

use OCA\PrideFlags\AppConstants;
use OCP\IConfig;

class AppSettings {
	public const FOLDER_VARIANT = 'folderVariant';
	public const BUTTON_VARIANT = 'buttonVariant';

	public function __construct(private IConfig $config) {
	}

	public function getStringSetting(string $key, string $default = ''): string {
		return $this->config->getAppValue(AppConstants::APP_ID, $key) ?: $default;
	}

	public function setStringSetting(string $key, string $value): void {
		$this->config->setAppValue(AppConstants::APP_ID, $key, $value);
	}

	public function getAll(): array {
		return [
			AppSettings::FOLDER_VARIANT => $this->getStringSetting(AppSettings::FOLDER_VARIANT, 'pride'),
			AppSettings::BUTTON_VARIANT => $this->getStringSetting(AppSettings::BUTTON_VARIANT, 'trans'),
		];
	}

	public function set($folder, $button): void {
		$this->setStringSetting(AppSettings::FOLDER_VARIANT, $folder);
		$this->setStringSetting(AppSettings::BUTTON_VARIANT, $button);
	}
}
