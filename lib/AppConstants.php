<?php

declare(strict_types=1);

namespace OCA\PrideFlags;

abstract class AppConstants {
	public const APP_ID = 'pride_flags';
	public enum Variants: string {
		case PRIDE = "Pride";
		case TRANS = "Trans Pride";
		case PAN = "Pansexual Pride";
		case BI = "Bisexual Pride";
		case ASEXUAL = "Asexual Pride";
		case LESBIAN = "Lesbian Pride";
		case NONBINARY = "Non-binary Pride";
		case NONE = "No customisation";
	}
}
