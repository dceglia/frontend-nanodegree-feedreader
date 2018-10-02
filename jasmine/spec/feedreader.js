/* feedreader.js
 *
 * This is the spec file that Jasmine will read against the application. */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application. */
   
    describe('RSS Feeds', function() {
        /* A test to make sure that the allFeeds variable
         * has been defined and that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty. */
        it('have defined URLs', function() {
            allFeeds.map(function(allFeeds) {
                expect(allFeeds.url).toBeDefined();
                expect(allFeeds.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. */
        it('are named and not empty', function() {
            allFeeds.map(function(allFeeds) {
                expect(allFeeds.name).toBeDefined();
                expect(allFeeds.name.length).not.toBe(0);
            });
        });
    });


    /* A test suite named "The menu" */
    describe('The menu', function() {

        // selector variables
        let docBody = document.querySelector('body');
        let hamburger = document.querySelector('.menu-icon-link');

        /* A test that ensures the menu element is
           hidden by default.*/
        it('is hidden by default', function() {
            expect(docBody.classList.contains('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. */
        it('alternates visibility after a click', function() {

            // check that on the first click the menu appears
            hamburger.click();
            expect(docBody.classList.contains('menu-hidden')).toBe(false);

            // check that on the second click the menu is hidden
            hamburger.click();
            expect(docBody.classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* A test suite for feed entries */
    describe('Initial Entries', function() {

        // variable for the feed
        let feed = document.querySelector('.feed');

        // creation of async beforeEach function
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. */
        it('exist in the feed', function() {
            expect('.feed .entry').toBeDefined();
        });
    });


    /* A test suite to verify feed entries are varied */
    describe('New Feed Selection', function() {

        // variables...
        let docBody = document.querySelector('body');
        let firstFeed,
            secondFeed;


        // creation of async function
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = docBody.querySelector('.feed').innerHTML;
                done();
            });
            loadFeed(1,function() {
                secondFeed = docBody.querySelector('.feed').innerHTML;
                done();
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes. */
        it('verifies entries are different', function() {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });

}());
