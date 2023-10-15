
export const postXhrSuccess = function () {
    return new Promise(function(resolve){
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

        const data = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        });
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState == 4) {
                resolve(JSON.parse(this.response))
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