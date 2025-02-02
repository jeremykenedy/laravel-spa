<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\PersonalDataExport\Jobs\CreatePersonalDataExportJob;

class PersonalDataExportJob extends CreatePersonalDataExportJob
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    public $queue = 'personal-data-exports-queue';
}
