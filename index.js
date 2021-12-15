(function () {

    async function getPageContent() {
        currentPageLink = window.location.search;
        atricleNumber = new URLSearchParams(window.location.search).get('id');
        prevPage = new URLSearchParams(window.location.search).get('prevpage');
        const response = await fetch(`https://gorest.co.in/public-api/posts/?id=${atricleNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bc1aa960a4c63d95101c5ab29acbb3ec68aa7fd8c0816b93c7360a0dd009f040'
            },
        })
        const pageContent = await response.json();
        console.log(pageContent.data)
        return { page: pageContent.data[0], prevPageNumber: prevPage }

    }

    function createPageContent(content, prevPageNumber) {
        const div = document.createElement('div');
        div.classList.add('row', 'justify-content-center');
        const divCol = document.createElement('div');
        divCol.classList.add('col-10');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('card');
        contentDiv.style = 'width: 100%';
        const contentBody = document.createElement('div');
        contentBody.classList.add('card-body');
        contentBody.style = 'min-height: 200px';
        const title = document.createElement('h5');
        title.classList.add('card-title');
        console.log(content.title)
        title.textContent = content.title;
        const body = document.createElement('p');
        body.classList.add('card-text');
        body.textContent = content.body;

        contentBody.append(title);
        contentBody.append(body);
        contentDiv.append(contentBody);

        divCol.append(contentDiv);
        const spaceDiv = document.createElement('div')
        spaceDiv.style = 'height: 30px';
        returnButton = document.createElement('a');
        returnButton.classList.add('nav-link');
        
        if (prevPageNumber > 1) {
            returnButton.href = 'http://127.0.0.1:5500/?page=' + prevPageNumber;
        }
        else {
            returnButton.href = 'http://127.0.0.1:5500';
        }
        returnButton.textContent = 'Назад';
        spaceDiv.append(returnButton);
        divCol.append(spaceDiv);
        div.append(divCol);


        return div;
    }

    async function getAllContent() {
        currentPageLink = window.location.search;
        pageNumber = new URLSearchParams(window.location.search).get('page');
        if (pageNumber) {
            pageNumberPostfix = `?page=${pageNumber}`;
        }
        else {
            pageNumberPostfix = '';
        }
        const response = await fetch(`https://gorest.co.in/public/v1/posts${pageNumberPostfix}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bc1aa960a4c63d95101c5ab29acbb3ec68aa7fd8c0816b93c7360a0dd009f040'
            },
        })
        const allPages = await response.json();
        return { pages: allPages.meta, content: allPages.data, currentPageLink: currentPageLink }

    }

    function createNavBar(allPages, pageNumber) {
        const div = document.createElement('div');
        div.classList.add('row', 'justify-content-center');
        divCol = document.createElement('div');
        divCol.classList.add('col-2');
        const nav = document.createElement('nav');
        nav.classList.add('nav')
        const ul = document.createElement('ul');
        ul.classList.add('pagination');

        const liPrev = document.createElement('li');
        liPrev.classList.add('page-item');
        if (!allPages.pagination.links.previous) {
            liPrev.classList.add('disabled');
        }
        const prevPage = document.createElement('a');
        prevPage.classList.add('page-link');
        if (!allPages.pagination.links.previous) {
            prevPage.href = '#';
        }
        else if (new URL(allPages.pagination.links.previous).searchParams.get('page') === '1') {
            prevPage.href = 'http://127.0.0.1:5500';
        }
        else {
            prevPage.href = 'http://127.0.0.1:5500/?page=' + new URL(allPages.pagination.links.previous).searchParams.get('page');
        }

        prevPage.textContent = 'prev';
        liPrev.append(prevPage);

        const liThis = document.createElement('li');
        const thisPage = document.createElement('a');
        thisPage.classList.add('page-link');
        const thisLink = 'http://127.0.0.1:5500/?page=' + new URL(allPages.pagination.links.current).searchParams.get('page');
        thisPage.href = thisLink;
        thisPage.textContent = allPages.pagination.page;
        liThis.append(thisPage);

        const liNext = document.createElement('li');
        liNext.classList.add('page-link');
        liNext.classList.add('disabled');
        const nextPage = document.createElement('a');
        if (!allPages.pagination.links.next) {
            liNext.classList.add('disabled');
        }
        else if (new URL(allPages.pagination.links.next).searchParams.get('page') > allPages.pagination.pages) {
            liNext.classList.add('disabled');
        }
        else {
            nextPage.href = 'http://127.0.0.1:5500/?page=' + new URL(allPages.pagination.links.next).searchParams.get('page');
        }

        nextPage.textContent = 'next';
        liNext.append(nextPage);

        ul.append(liPrev);
        ul.append(liThis);
        ul.append(liNext);
        nav.append(ul);
        divCol.append(nav);
        div.append(divCol);
        return div;
    }

    function createContent(content, pagePostfix) {
        pageNumber = new URLSearchParams(pagePostfix).get('page');
        const div = document.createElement('div');
        div.classList.add('row', 'justify-content-center');
        const divCol = document.createElement('div');
        divCol.classList.add('col-10');
        for (contentItem of content) {
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('card');
            contentDiv.style = 'width: 100%';
            const contentBody = document.createElement('div');
            contentBody.classList.add('card-body');
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = contentItem.title;
            const body = document.createElement('p');
            body.classList.add('card-text');
            body.textContent = contentItem.body;


            contentLink = document.createElement('a');
            // contentLink.classList.add('card-link');
            contentLink.classList.add('nav-link');
            if (pageNumber) {
                contentLink.href = `/page.html?id=${contentItem.id}&prevpage=${pageNumber}`;
            }
            else {
                contentLink.href = `/page.html?id=${contentItem.id}`;
            }
            
            contentLink.textContent = 'Подробнее';
            contentBody.append(title);
            contentBody.append(body);
            contentBody.append(contentLink);
            contentDiv.append(contentBody);

            divCol.append(contentDiv);
            const spaceDiv = document.createElement('div')
            spaceDiv.style = 'height: 30px';
            divCol.append(spaceDiv);
            div.append(divCol);
        }
        return div;
    }

    async function createBlogForm() {
        div = document.createElement('div');
        div.classList.add('row', 'justify-content-center');
        divH1 = document.createElement('div');
        divH1.classList.add('col-4');
        h1 = document.createElement('h1');
        h1.textContent = 'Welcome to my blog';
        h1.classList.add('h1');
        divH1.append(h1);
        div.append(divH1);
        form = document.getElementById('blog-form');
        form.append(div);

        if (window.location.pathname === '/') {
            allPages = await getAllContent();
            content = createContent(allPages.content, allPages.currentPageLink);
            navbar = createNavBar(allPages.pages, allPages.currentPageLink);
        }
        else {
            pageContent = await getPageContent();
            content = createPageContent(pageContent.page, pageContent.prevPageNumber);
            navbar = '';
        }


        form.append(content);
        form.append(navbar);


    }
    createBlogForm();




    // getAllPages()

})();