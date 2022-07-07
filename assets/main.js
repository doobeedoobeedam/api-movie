function showAllMovie() {
    $('#movie-list').html('');

    if ($('#input-search').val() == '') {
        $value = 'X-Men';
    } else {
        $value = $('#input-search').val()
    }

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': '52fd7e9d',
            's': $value
        },
        success: function (hasil) {
            if (hasil.Response == "True") {
                $('.title').html(`Search Result for "`+ $value + `"`);
                let movies = hasil.Search;
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="w-full lg:w-1/5 md:w-1/2 px-5 mb-5">
                            <div class="mb-3">
                                <img src="` + data.Poster + `">
                            </div>
                            <h1 class="text-base lg:text-xl text-white font-bold">` + data.Title + `</h1>
                            <p class="text-sm lg:text-base text-white font-thin">` + data.Year + `</p>
                        </div>
                    `)
                });
            } else {
                $('#movie-list').html(`<h5 class="text-rose-500 text-center">` + hasil.Error + `</h6>`)
            }
        }
    })
}

showAllMovie();

$('#button-search').on('click', function () {
    showAllMovie();
})

$('#input-search').on('keyup', function (even) {
    if (even.keyCode === 13) {
        showAllMovie();
    }
})

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': '52fd7e9d',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response == "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img src="` + movie.Poster + `" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item">` + movie.Title + `</li>
                            <li class="list-group-item">` + movie.Year + `</li>
                            <li class="list-group-item">` + movie.Released + `</li>
                        </ul>
                    </div>
                </div>
            </div>
                `)
            }
        }
    })
})