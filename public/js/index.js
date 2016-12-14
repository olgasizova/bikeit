$(document).ready(doOnLoad);



function doOnLoad() {

    window.user = {
        id:0,
        lname:'',
        fname:'',
        pwd:'',
        email:'',
        imgurl:'url(http://res.cloudinary.com/sdlc-consulting-inc/image/upload/v1481396362/picture-icon_uvdswy.png)'
    }

    //here is a layout as per w2ui framework credit W2ui.com
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top', size: 100, resizable: false, hidden: false, content: '' },
            { type: 'left', size: 300, resizable: true, hidden: true, content: '' },
            { type: 'main', content: '' },
            { type: 'preview', size: '50%', resizable: true, hidden: true, content: '' },
            { type: 'right', size: 300, resizable: true, hidden: true, content: '' },
            { type: 'bottom', size: 50, resizable: false, hidden: false, content: '' }
        ]
    });

    window.w2Layout = w2ui['layout'];

    w2Layout.load('top', 'html/part_header.html');
    w2Layout.load('main', 'html/part_landing_main.html');
    w2Layout.load('bottom', 'html/part_footer.html');


    setUser(window.user);

}

function setUser(loginUser){
    window.user = loginUser;
    //var imgurl = 'url(' + window.user.imgurl +')';
    //var imgurl = window.user.imgurl;
    $('div.profile-circle-photo').css('background-image',window.user.imgurl);
    
    if (window.user.id) { 
        showDashboard();
        w2Layout.show('left');
        w2Layout.show('right');
    }

}



function showLogin() {
    w2Layout.load('main', 'html/part_login.html', '', initLogin);
}

function initLogin() {

// partial credit to W2ui.com for form definition
        var $frm = $('#form-login').w2form({
            name: 'form-login',
            //recid: window.user.id,
            url: '/getuser',
            fields: [
                { field: 'email', type: 'email', required: true },
                { field: 'pwd', type: 'password', required: true }
            ],

            actions: {
                signup: function (target, data) {
                    showSignUp();
                },
                login: function (target, data) {
                    this.save(data,function(res) {
                        setUser(res[0]);
                    }
                  );
                }
            }

        });

        $('#form-login').fadeIn(1000);


}


function showSignUp() {
    w2Layout.load('main', 'html/part_signup.html', '', initSignUp);
}

function initSignUp() {
        window.setTimeout(function(){


//partial credit to W2ui.com for form definition
        var $frm = $('#form-signup').w2form({
            name: 'form-signup',
            //recid: window.user.id,
            url: '/signup',
            fields: [
                { field: 'email', type: 'email', required: true },
                { field: 'pwd', type: 'password', required: true },
                { field: 'fname', type: 'text', required: true },
                { field: 'lname', type: 'text', required: true }
             ],

            actions: {
                save: function (target, data) {
                    let imgurl = $('#image-upload').css('background-image');
                    window.user.imgurl = imgurl;;
                    let addData = {'imgurl':imgurl};
                    this.save(addData,function(res) {
                        
                        setUser(res[0]);
                    });
                }
            }

        });

        initImageUpload();

        $('#form-signup').fadeIn(1000);
        
    },100)

}

function showDashboard(){
  w2Layout.load('main', 'html/part_dashboard.html', '', initDashboard);
}

function initDashboard() {


//partial credit to W2ui.com for form definition
        var $frm = $('#form-dashboard').w2form({
            name: 'form-dashboard',
            //recid: window.user.id,
            url: '/addtrip',
            fields: [
                { field: 'country', type: 'text', required: true },
                { field: 'city', type: 'text', required: true },
                { field: 'start_addr', type: 'text', required: true },
                { field: 'end_addr', type: 'text', required: true },
                { field: 'meet_date', type: 'date', required: true },
                { field: 'meet_time', type: 'time', required: true }

            ],

            actions: {
                join: function (target, data) {
                    // showSignUp();
                }
            }

        });

        $('#form-login').fadeIn(1000);




}


