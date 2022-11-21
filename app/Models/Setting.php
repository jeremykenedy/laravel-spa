<?php

namespace App\Models;

use QCod\Settings\Setting\Setting as OriginalSetting;

class Setting extends OriginalSetting
{
    protected $table = 'settings';
}
