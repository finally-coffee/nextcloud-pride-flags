<?php
declare(strict_types=1);

namespace OCA\PrideFlags\AppInfo;

use OCA\PrideFlags\AppConstants;
use OCP\Util;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\IConfig;

class Application extends App implements IBootstrap {
	const APP_ID = AppConstants::APP_ID;
	public function __construct(array $urlParams = []) {
		parent::__construct(AppConstants::APP_ID, $urlParams);
	}

	public function register(IRegistrationContext $ctx): void {
		$config = \OC::$server->get(IConfig::class);
	}

	public function boot(IBootContext $ctx): void {
		Util::addStyle(AppConstants::APP_ID, 'pride');
		Util::addScript(AppConstants::APP_ID, 'pride');
	}
}
