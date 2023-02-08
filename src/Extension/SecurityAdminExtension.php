<?php

namespace BiffBangPow\BulkMemberDelete\Extension;

use SilverStripe\Forms\HiddenField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Security\SecurityToken;
use SilverStripe\View\HTML;
use SilverStripe\View\Requirements;

class SecurityAdminExtension extends DataExtension
{
    public function updateEditForm(&$form)
    {
        $fields = $form->Fields();
        $fields->push(HeaderField::create('Bulk Management'));
        $fields->push(TextareaField::create('bbp-bulkdelete-members', 'Bulk Delete Members')->setRows(20)
            ->setDescription('Add member emails here to bulk-delete.  One per line.'));

        $button = HTML::createTag('button', [
            'id' => 'bbp-bulkdelete-action',
            'data-url' => 'bbp-bulkdelete/process'
        ],
            _t(__CLASS__ . '.delete', 'Delete Members')
        );

        $div = HTML::createTag('div', [
           'id' =>  'bbp-bulkdelete-response'
        ]);

        $fields->push(LiteralField::create('bulkdeleteaction', $button));
        $fields->push(LiteralField::create('bulkdeleteresponse', $div));
        $fields->push(HiddenField::create('bbp-bulkdelete-secID')->setValue(SecurityToken::getSecurityID()));
    }

    public function onAfterInit()
    {
        Requirements::javascript('biffbangpow/silverstripe-bulk-member-delete:client/dist/javascript/bulkdelete.js');
    }
}
