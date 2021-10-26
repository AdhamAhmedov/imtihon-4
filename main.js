let elUserList = document.querySelector(".user-list");
let elPostList = document.querySelector(".list-post");
let elComent = document.querySelector(".list-coment");
//template
let userTemplate = document.querySelector("#js-user-template").content;
let postTemplate = document.querySelector("#js-post-template").content;
let commentTemplate = document.querySelector("#js-comment-template").content;

//user unit
let elFragment = document.createDocumentFragment();

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => appendUser(data))

let renderUser = function (object) {
    let userNameTemplate = userTemplate.cloneNode(true);

    userNameTemplate.querySelector(".js-name").textContent = object.name;
    userNameTemplate.querySelector(".js-user").textContent = object.username;
    userNameTemplate.querySelector(".name-btn").setAttribute("data-id", `${object.id}`)

    elFragment.appendChild(userNameTemplate);
};

elUserList.innerHTML = "";

let appendUser = function (array) {
    array.forEach(function (object) {

        renderUser(object);
    });
    elUserList.appendChild(elFragment);
};

// 2======================================================================

const test = function (id) {
    let elPostFragment = document.createDocumentFragment();

    let renderPost = function (objectPost) {
        let elpostTemplate = postTemplate.cloneNode(true);

        elpostTemplate.querySelector(".js-post-title").textContent = objectPost.title;
        elpostTemplate.querySelector(".js-post-body").textContent = objectPost.body;
        elpostTemplate.querySelector(".post-btn").setAttribute("data-id", `${objectPost.id}`)

        elPostFragment.appendChild(elpostTemplate);
    };

    let appenPost = function (postarray) {
        let nimadir = postarray.filter((el) => el.userId == id);
        nimadir.forEach(function (objectPost) {
            renderPost(objectPost);
        });
        elPostList.appendChild(elPostFragment);
    };

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => appenPost(data));
};

elUserList.addEventListener("click", function (e) {
    elPostList.innerHTML = "";
    let userId = e.target.dataset.id
    test(userId)
});

// 3===============================================================================

const commentsTest = function (idi) {

    let elCommentFragment = document.createDocumentFragment();

    let renderComment = function (objectComment) {
        let elCommentTemplate = commentTemplate.cloneNode(true);

        elCommentTemplate.querySelector(".comment-name").textContent = objectComment.name;
        elCommentTemplate.querySelector(".comment-email").textContent = objectComment.email;
        elCommentTemplate.querySelector(".comment-body").textContent = objectComment.body;

        elCommentFragment.appendChild(elCommentTemplate);
    };

    let appendComment = function (commentarr) {
        let some = commentarr.filter((elem) => elem.postId == idi);
        some.forEach(function (objectComment) {
            renderComment(objectComment);
        });
        elComent.appendChild(elCommentFragment);
    };

    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => appendComment(data))
};

elPostList.addEventListener("click", function (ev) {
    elComent.innerHTML = "";
    let postId = ev.target.dataset.id
    commentsTest(postId);
});


