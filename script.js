const apiBase = 'http://werella.com/api/?user=';
let userScores = [];

let run = () => {

    userScores = [];

    let usernames = $('#usernames').val().split(/\r?\n/);

    usernames = usernames.map(x => new Promise((resolve, reject) => {
        $.ajax({
            url : apiBase + x,
            type : 'GET',
            success : (r) => {
                parser = new DOMParser();
                dom = parser.parseFromString(r, 'text/html');
                let contributions = dom.querySelectorAll('h2.f4')[1].innerText;

                userScores.push({
                    username : x,
                    score : parseInt(contributions.split(" ")[6].replace(",",""))
                });
                resolve(x);
            },
            error : () => {
                resolve(x);
            }
        }); 
        })
    );




    Promise.all(usernames).then((v) => {
        userScores = userScores.sort((a,b) => a.score < b.score);
        $('#render').html(JSON.stringify(userScores));
    });


}
