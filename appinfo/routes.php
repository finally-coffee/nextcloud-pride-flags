<?php

return [
	'routes' => [
		['name' => 'settings#get', 'url' => '/settings', 'verb' => 'GET'],
		['name' => 'settings#set', 'url' => '/settings', 'verb' => 'POST'],
		['name' => 'settings#getGlobal', 'url' => '/settings/global', 'verb' => 'GET'],
		['name' => 'settings#setGlobal', 'url' => '/settings/global', 'verb' => 'POST'],
	]
];
