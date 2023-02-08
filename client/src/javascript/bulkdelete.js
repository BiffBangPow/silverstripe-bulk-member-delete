const BulkDelete = class {

    initButtonActions() {
        this.actionButton.addEventListener('click', () => {
            this.submitData();
        });
    }

    processResponse(res, classInstance) {
        if (res.target.status != 200) {
            classInstance.messageDiv.innerHTML('<p>Sorry, there was a problem.  Please try again');
        } else {
            let resData = JSON.parse(res.target.responseText);

            if (resData.status === 1) {

                let message = '<p><br><strong>Deleted ' + resData.message.deleted + ' accounts</strong></p>';
                if (resData.message.invalid.length > 0) {
                    message += '<p><strong>Invalid addresses:</strong></p><ul>';
                    resData.message.invalid.forEach(address => {
                        message += '<li>' + address + '</li>';
                    });
                    message += '</ul>';
                }
                if (resData.message.notfound.length > 0) {
                    message += '<p><strong>Not found on the system:</strong></p>';
                    resData.message.notfound.forEach(address => {
                        message += '<li>' + address + '</li>';
                    });
                    message += '</ul>';
                }

                message += '<p><br><strong>Please refresh the page to update the member list</strong></p>';
                classInstance.memberList.value = '';
                classInstance.memberList.classList.remove('changed');
                document.getElementById('Form_EditForm').classList.remove('changed');
                classInstance.messageDiv.innerHTML = message;
            }
            else {
                classInstance.messageDiv.innerHTML = resData.message;
            }
        }
        classInstance.actionButton.removeAttribute('disabled');
    }

    processError(classInstance) {
        classInstance.messageDiv.innerHTML('<p>Sorry, there was a problem.  Please refresh the page and try again.</p>');
        classInstance.actionButton.removeAttribute('disabled');
    }

    submitData() {
        let processURL = this.actionButton.dataset.url;
        let XHR = new XMLHttpRequest();
        let FD = new FormData();
        let BD = this;
        FD.append('members', this.memberList.value);
        FD.append('security', this.security.value);
        this.actionButton.setAttribute('disabled', 'disabled');
        this.messageDiv.innerHTML = '<p>Processing..</p>';
        XHR.open('POST', processURL);
        XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        XHR.addEventListener("error", () => {
            this.processError(BD);
        });
        XHR.addEventListener("load", function (res) {
            BD.processResponse(res, BD);
        });
        XHR.send(FD);
    }

    constructor() {
        this.actionButton = document.getElementById('bbp-bulkdelete-action');
        this.messageDiv = document.getElementById('bbp-bulkdelete-response');
        this.security = document.getElementById('bbp-bulkdelete-secID');
        this.memberList = document.getElementById('bbp-bulkdelete-members');
    }

}


document.addEventListener("DOMContentLoaded", () => {
    let bulkDelete = new BulkDelete();
    bulkDelete.initButtonActions();
});



