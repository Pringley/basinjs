// global app object
var app = app || {};

(function() {

    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;
    var db = new PouchDB('basin');
    var $nav = $('.nav');
    var $view = $('.view');

    function renderView(id) {
        console.log('querying ' + id);
        db.query(id).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log("query failed");
            console.log(error);
        });
    }

    function renderNav() {
        db.get('_design/user').then(function(doc) {
            var views = _.keys(doc.views) || [];
            _.each(views, function(view) {
                var id = 'user/' + view;
                var $li = $('<li/>').html(view);
                $li.click(function() { renderView(id); });
                $nav.append($li);
            });
        }).catch(function(error) {
            if (error.status !== 404) {
                console.log("could not fetch user ddoc");
                console.log(error);
            }
        });
    }

    var remoteCouch = 'http://127.0.0.1:5984/basin';
    db.sync(remoteCouch, {live: true});
    renderNav();

})();
