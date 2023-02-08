<?php

namespace BiffBangPow\Extension;

use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;

class SecurityAdminExtension extends DataExtension
{
    public function updateEditForm(&$form)
    {
        $fields = $form->Fields();
        $fields->push(HeaderField::create('Bulk Management'));
        $fields->push(TextareaField::create('bulkdelete', 'Bulk Delete Members')->setRows(20)
            ->setDescription('Add member emails here to bulk-delete.  One per line.'));
        $fields->push(LiteralField::create('bulkdeleteaction', '<button>Delete Members</button>'));
    }
}
