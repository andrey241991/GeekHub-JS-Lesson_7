(function () {
    let postsForComments = [];
    const btnGetUsers = document.querySelector('.get-users');
    const usersContainer = document.querySelector('.content-container__users');
    const userInfo = document.querySelector('.content-container__user-info');
    btnGetUsers.addEventListener('click', getUsers);

    function getUsers() {
        const promise = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onload = function () {
                resolve(this.response);
            }
            request.open("GET", "https://jsonplaceholder.typicode.com/users", false);
            request.send();
        });

        promise
            .then(
                result => parseUsers(result),
                error => alert("Rejected: " + error.message)
            );

        function parseUsers(result) {
            const users = [];
            let res = JSON.parse(result)
            res.forEach(element => {
                let user = {
                    id: element.id,
                    name: element.name
                }
                users.push(user);
            });
            setUsers(users);
        }
    }

    function setUsers(users) {
        clear(usersContainer);
        users.forEach(user => {
            let div = document.createElement('div');
            div.innerHTML = user.name;
            div.classList.add('user');
            usersContainer.appendChild(div);
            div.addEventListener('click', () => getUserPosts(user.id));
        });
    }

    function clear(container) {
        while (container.firstChild) {
            container.firstChild.remove();
        }
    }

    function getUserPosts(id) {
        const promise = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onload = function () {
                resolve(this.response);
            }
            request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`, false);
            request.send();
        });

        promise
            .then(
                result => parseUserPosts(result),
                error => alert("Rejected: " + error.message)
            );

        function parseUserPosts(result) {
            posts = [];
            let res = JSON.parse(result)
            res.forEach(element => {
                let post = {
                    id: element.id,
                    title: element.title,
                }
                posts.push(post);
            });
            setPosts(posts);
        }
    }

    function setPosts(posts) {
        postsForComments = posts;
        clear(userInfo);
        posts.forEach(post => {
            let div = document.createElement('div');
            div.innerHTML = post.title;
            div.classList.add('user');
            userInfo.appendChild(div);

            let span = document.createElement('span');
            span.innerHTML = '5';
            span.classList.add('commentsNumber');
            div.appendChild(span);

            div.addEventListener('click', () => getUserComments(post.id));
        });
        getCommentsCount();
    }


    function getCommentsCount(){
        let childs =  userInfo.childNodes;
        console.log('childs', childs);
        postsForComments.forEach(item =>{
            const promise = new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.onload = function () {
                    resolve(this.response);
                }
                request.open("GET", `https://jsonplaceholder.typicode.com/comments?postId=${item.id}`, false);
                request.send();
            });

            promise
            .then(
                result => parsePostCount(result),
                error => alert("Rejected: " + error.message)
            );

            function parsePostCount(result){
                let res = JSON.parse(result);
                let count = res.length
                let id = res[0].postId;
                childs.forEach((child, index) =>{
                     if(index + 1 === id){
                         let firstChild = child.children[0];
                         firstChild.innerHTML = count;
                     }
                });
            }
        });
    }



    function getUserComments(id) {
        const promise = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onload = function () {
                resolve(this.response);
            }
            request.open("GET", `https://jsonplaceholder.typicode.com/comments?postId=${id}`, false);
            request.send();
        });

        promise
            .then(
                result => parseUserComments(result),
                error => alert("Rejected: " + error.message)
            );

        function parseUserComments(result) {
            comments = [];
            let res = JSON.parse(result)
            res.forEach(element => {
                let comment = {
                    body: element.body,
                }
                comments.push(comment);
            });
            setComments(comments);
        }
    }

    function setComments(comments) {
        clear(userInfo);
        comments.forEach(comment => {
            let div = document.createElement('div');
            div.innerHTML = comment.body;
            div.classList.add('comment');
            userInfo.appendChild(div);
        });
    }

})();