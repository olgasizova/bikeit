$(document).ready(doOnLoad);



function doOnLoad() {

    window.user = { id: ''}


    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top', size: 100, resizable: false, hidden: false, content: 'top' },
            { type: 'left', size: 200, resizable: true, hidden: true, content: 'left' },
            { type: 'main', content: 'main' },
            { type: 'preview', size: '50%', resizable: true, hidden: true, content: 'preview' },
            { type: 'right', size: 200, resizable: true, hidden: true, content: 'right' },
            { type: 'bottom', size: 50, resizable: false, hidden: false, content: 'bottom' }
        ]
    });

    window.w2Layout = w2ui['layout'];

    w2Layout.load('top', 'html/part_header.html');



    if (!window.user.id) {
        showLogin();
    }
}

function showLogin() {

    w2Layout.load('main', 'html/part_login.html', '', function () {

        var $frmLogin = $('#form-login').w2form({
            name: 'form-login',
            //recid: window.user.id,
            url: '/public/mocks/login-success.json',
            fields: [
                { field: 'email', type: 'email', required: true },
                { field: 'pwd', type: 'password', required: true }
            ],

            actions: {
                reset: function (target,data) {
                    this.clear();
                },
                save: function (target, data) {
                    if(this.validate())
                      return;

                    this.request(function (data) {
                        console.log(data);
                    });
                }
            }

        });

        $('#form-login').fadeIn(1000);
    });






}

