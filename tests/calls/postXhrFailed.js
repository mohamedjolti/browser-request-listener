export const postXhrfaildUrlNotFound = function () {
    const apiUrl = 'https://jsonplaceholder.typicode.com/errr';

    const data = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
    });
    const xhr = new window.XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 201) {
            const post = JSON.parse(xhr.responseText);
            console.log(post);
        } else {
            console.log('Server response:', xhr.status);
        }
    };
    xhr.onerror = () => {
        console.log('An error occurred, not able to process the request.');
    };
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}