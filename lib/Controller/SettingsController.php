<?php

declare(strict_types=1);

namespace OCA\PrideFlags\Controller;

use OCA\PrideFlags\Settings\AppSettings;

use Closure;
use OCP\IRequest;
use OCP\IConfig;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;

class SettingsController extends Controller {

	public function __construct($appName, IRequest $request, private AppSettings $appSettings, private $userId) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function get(): JSONResponse {
		return $this->makeJSONResponse(fn () => $this->appSettings->getAll($this->userId));
	}

	#[NoAdminRequired]
	public function set(string $folderVariant, string $buttonVariant): JSONResponse {
		$this->appSettings->set($this->userId, $folderVariant, $buttonVariant);
		return $this->makeJSONResponse(fn () => $this->appSettings->getAll($this->userId));
	}

	protected function makeJSONResponse(Closure $closure): JSONResponse {
		try {
			return new JSONResponse($closure(), HTTP::STATUS_OK);
		} catch (Exception $e) {
			return new JSONResponse(['message' => $e->getMessage()], HTTP::INTERNAL_SERVER_ERROR);
		}
	}
}
