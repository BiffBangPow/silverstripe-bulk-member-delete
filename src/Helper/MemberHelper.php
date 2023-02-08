<?php

namespace BiffBangPow\BulkMemberDelete\Helper;

use SilverStripe\Security\Member;

class MemberHelper
{
    private $deleted = 0;
    private $invalid = [];
    private $notFound = [];
    private $memberEmails = [];


    /**
     * Delete the members based on their email
     * @return $this
     */
    public function deleteMembers()
    {
        foreach ($this->memberEmails as $email) {
            $this->deleteMemberRecord(trim($email));
        }
        return $this;
    }

    /**
     * Add the list of member emails
     * @param string $members
     * @return $this
     */
    public function setMembers(string $members)
    {
        $this->memberEmails = explode("\n", $members);
        return $this;
    }

    /**
     * @return array
     */
    public function getResults()
    {
        return [
            'deleted' => $this->deleted,
            'invalid' => $this->invalid,
            'notfound' => $this->notFound
        ];
    }

    /**
     * Check and delete the record
     * @param $email
     * @return void
     */
    private function deleteMemberRecord($email)
    {
        $valid = filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$valid) {
            $this->invalid[] = $email;
        }

        $member = Member::get_one(Member::class, [
            'Email' => $email
        ]);
        if (!$member) {
            $this->notFound[] = $email;
        } else {
            $member->delete();
            $this->deleted++;
        }
    }
}
