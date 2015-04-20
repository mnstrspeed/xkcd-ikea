var interval;

$(document).ready(function() {
    function tryCompile(el) {
        try {
            var source = $(el).val();
            eval(source);
            
            return true;
        } catch (e) {
            if (e instanceof SyntaxError) {
                return false;
            }
        }
    }

    var chars = "abcdefghijklmnopqrstuvwxyz1234567890!*%&()_+-=';:/?.>,< ";

    function randomMutate() {
        var source = $('#codeview').val();
        var pos = Math.floor(Math.random() * (source.length + 2));
        var c = Math.floor(Math.random() * chars.length);
        
        var n = '';
        if (c > 1) {
           n = chars[c - 1]; 
        }

        $('#codeview').val(source.substr(0, pos) + n + source.substr(pos + 1));
    }

    $('#codeview').on('change keyup paste', function() {
        if (tryCompile(this)) {
            $('#codeview').addClass('done');
            clearInterval(interval);
        }
    });

    // mutate every 100ms
    interval = setInterval(randomMutate, 1);
});
