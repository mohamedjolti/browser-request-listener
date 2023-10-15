export const postXhrfaildUrlNotFound = function () {
    return new Promise(function(resolve){
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

        const data = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        });
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 201) {
                const post = JSON.parse(xhr.responseText);
                resolve(post)
            } 
        };
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState == 4) {
                console.log("dude")
            }
        })
        xhr.onerror = () => {
            console.log('An error occurred, not able to process the request.');
        };
        xhr.open('POST', apiUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
    })
}