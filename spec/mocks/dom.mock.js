(function prepareDOM (document)
{
    'use strict';

    document.body.innerHTML = `
        <div class="main-header">
            <ul class="menu">
                <li><a href="#">link</a></li>
            </ul>
            <div class="hiring-banner"></div>
        </div>

        <div class="jumbotron home">
            <div class="container">
                <h1></h1>
                <p class="col-md-10 col-md-offset-1 col-sm-12"></p>
                <div class="btn-group">
                    <div class="btn-primary"></div>
                    <div class="btn-secondary"></div>
                </div>
            </div>
        </div>

        <section></section>
        <hr />
        <footer></footer>
    `;
})(document);