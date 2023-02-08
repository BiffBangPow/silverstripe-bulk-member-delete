<?php

namespace BiffBangPow\BulkMemberDelete\Control;

use BiffBangPow\BulkMemberDelete\Helper\MemberHelper;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Security\SecurityToken;


class BulkActionController extends Controller
{
    private static $allowed_actions = [
        'process' => 'ADMIN'
    ];

    public function index()
    {
        return $this->httpError(404);
    }

    public function process(HTTPRequest $request)
    {
        if (!$request->isAjax()) {
            return $this->httpError(404);
        }

        if (SecurityToken::getSecurityID() !== $request->postVar('security')) {
            return $this->httpError(403);
        }

        $members = trim($request->postVar('members'));

        if ($members === '') {
            $status = -1;
            $message = _t(__CLASS__ . '.nomembers', 'Please enter the email addresses you wish to delete.  One per line.');
        } else {
            $helper = new MemberHelper();
            $helper->setMembers($members)
                ->deleteMembers();
            $status = 1;
            $message = $helper->getResults();
        }

        return json_encode([
            'status' => $status,
            'message' => $message
        ]);
    }
}
