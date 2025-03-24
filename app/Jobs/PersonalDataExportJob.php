<?php

namespace App\Jobs;

use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\PersonalDataExport\Jobs\CreatePersonalDataExportJob;

class PersonalDataExportJob extends CreatePersonalDataExportJob
{
    use Dispatchable;
    use InteractsWithQueue;
    use SerializesModels;

    public $queue = 'personal-data-exports-queue';
}
