
export const axios = {
    refreshToken :function getPrefreshToken(url){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        // Thêm header Authorization vào yêu cầu
        var token = localStorage.getItem('refreshToken');
        if (token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
        xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                console.log(xhr)
                return(xhr.responseText);
            } else {
                console.error("Error:", xhr.status, xhr);
            }
        }
        };

        xhr.send();
    },
    getNewToken : function getNewToken(url){
       this.refreshToken(url)
       .then((res) => {
            alert("token new: " + res.token);
    
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
    
            return res; // Resolve the promise with the entire response
        })
        .catch((error) => {
            console.error('Error refreshing token:', error);
            throw error; // Reject the promise with the error
            return null;
        });
    }
}