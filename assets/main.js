let movieList = document.getElementById('movie-list');
let movieDetail = document.getElementById('movie-detail');

function showAllMovie() {
    movieList.classList.remove('hidden');
    movieList.classList.add('flex');

    movieDetail.classList.add('hidden');
    $('#movie-list').html('');

    if ($('#input-search').val() == '') {
        $value = 'Batman';
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
                $('.title').html(`Search Result for "` + $value + `"`);
                let movies = hasil.Search;
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <a class="w-full lg:w-1/5 md:w-1/2 px-5 mb-5 hover:cursor-pointer see-more" data-id="` + data.imdbID + `">
                            <div class="mb-3">
                                <img src="` + data.Poster + `">
                            </div>
                            <h1 class="text-base lg:text-xl text-white font-bold">` + data.Title + `</h1>
                            <p class="text-sm lg:text-base text-white font-thin">` + data.Year + `</p>
                        </a>
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


$('#movie-list').on('click', '.see-more', function () {
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


                $('.title').html(``);
                movieList.classList.add('hidden');
                movieDetail.classList.remove('hidden');
                movieDetail.classList.add('flex');

                $('#movie-detail').html(`
                    <div class="w-full lg:w-[30%] md:w-[40%] py-5 mb-5 self-center align-middle">
                        <img src="` + movie.Poster + `">
                    </div>
                    <div class="w-full lg:w-[50%] md:w-[60%] md:pl-5 mb-5 self-center">
                        <div class="[&>*]:text-white">
                            <h1 class="font-bold text-lg lg:text-4xl uppercase mb-3">
                                ` + movie.Title + ` (` + movie.Year + `) 
                                <span class="bg-slate-400 text-white text-sm px-1">` + movie.Rated + `</span>
                            </h1>
                            <p class="font-thin mb-3">` + movie.Genre + `</p>
                            <hr class="mb-5">
                            <p class="mb-3">` + movie.Plot + `</p>
                            <hr class="mb-5">
                            <table class="table-fixed mb-5">
                                <tbody class="[&>tr]:mb-10">
                                    <tr>
                                        <th scope="row" class="pr-5 text-left font-medium">Directed by</th>
                                        <td  class="ml-10">` + movie.Director + `</td>
                                    </tr>
                                    <tr>
                                        <td scope="row" class="pr-5 text-left font-medium">Written by</td>
                                        <td>` + movie.Writer + `</td>
                                    </tr>
                                    <tr>
                                        <td scope="row" class="pr-5 text-left font-medium">Cast</td>
                                        <td>` + movie.Actors + `</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `)
            } else {
                $('#movie-list').html(`<h5 class="text-rose-500 text-center">` + movie.Error + `</h6>`)
            }
        }
    })
})