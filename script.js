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
                if(r != 'Not Found') {
                    parser = new DOMParser();
                    dom = parser.parseFromString(r, 'text/html');
                    let contributions = dom.querySelectorAll('h2.f4')[1].innerText;
                    console.log(contributions);
                    userScores.push({
                        username : x,
                        score : parseInt(contributions.split(" ")[6].replace(",",""))
                    });
                    $('#render').html(`${userScores.length} of ${usernames.length} done...`);
                    resolve(x);               
                }
                else{
                    resolve(x);
                }
            },
            error : () => {
                resolve(x);
            }
        }); 
        })
    );

    Promise.all(usernames).then((v) => {
        userScores = userScores.sort((a,b) => b.score - a.score);
        let str = '<ol>';
        for(let i in userScores) {
            str += `<li>${userScores[i].username} - ${userScores[i].score}</li>`;
        }
        str += '</ol>';
        $('#render').html(str);
    }).catch((e) => {

    });

}
