$(document).ready(function() {
    $('.delete-article').on('click', function(e) {
        $target = $(e.target);
        const articleId = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/article/' + articleId,
            success: (response) => {
                alert('Deleting Article');
                window.location.href='/';
            },
            error: () => {
                console.log(err);
            }
        })
    })
});