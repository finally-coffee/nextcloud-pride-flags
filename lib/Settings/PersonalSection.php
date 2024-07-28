<?php

declare(strict_types=1);

namespace OCA\PrideFlags\Settings;

use OCA\PrideFlags\AppConstants;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIConSection;

class PersonalSection implements IIconSection {
	public function __construct(private IL10N $l10n, private IURLGenerator $urlGenerator) {}

	public function getID(): string {
		return AppConstants::APP_ID;
	}

	public function getName(): string {
		return 'Pride';
	}

	public function getPriority(): int {
		return 100;
	}

	public function getIcon(): string {
		return $this->urlGenerator->imagePath('core', 'actions/settings-dark.svg');
	}
}
