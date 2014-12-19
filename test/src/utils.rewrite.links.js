var utils = require("../../lib/utils");
var assert = require("chai").assert;

describe("Rewriting Domains", () => {

    var proxyUrl = "192.168.0.4:3002";

    describe("when rewriting 'example.com' links", () => {

        var regex, fn;
        var testRegex;
        before(() => {
            var rewrite = utils.rewriteLinks({hostname: "example.com", port: 80}, proxyUrl);
            regex = rewrite.match;
            fn = rewrite.fn;
            testRegex = function (string) {
                return string.replace(regex, fn);
            };
        });

        it("should not replace domains that are not inside attribute", () => {
            var actual = testRegex("<h1>example.com</h1>");
            var expected = "<h1>example.com</h1>";
            assert.equal(expected, actual);
        });
        it("should replace CSS LINK", () => {
            var actual = testRegex("<link href='http://example.com/css/styles'>example.com</link>");
            var expected = "<link href='//192.168.0.4:3002/css/styles'>example.com</link>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (2)", () => {
            var actual = testRegex("<a href='http://example.com'></a>");
            var expected = "<a href='//192.168.0.4:3002/'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (23)", () => {
            var actual = testRegex("<a href='http://example.com/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (3)", () => {
            var actual = testRegex("<a href='http://example.com/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (4)", () => {
            var actual = testRegex("<a href='https://example.com/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (5)", () => {
            var actual = testRegex("<a href='/example.com/sub/dir'></a>");
            var expected = "<a href='/192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (6)", () => {
            var actual = testRegex("<a href='example.com/sub/dir'></a>");
            var expected = "<a href='192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (6)", () => {
            /*jshint ignore:start*/
            var actual = testRegex('<a href="http://example.com" class="active" title="Home">Home</a><a href="http://example.com/information" class="" title="Info">Info</a>');
            var expected = '<a href="//192.168.0.4:3002/" class="active" title="Home">Home</a><a href="//192.168.0.4:3002/information" class="" title="Info">Info</a>';
            assert.equal(actual, expected);
            /*jshint ignore:end*/
        });
        it("should use the regex to replace links (7)", () => {
            var actual = testRegex("<a href='http://example.com/sub/dir/example.com/css/styles.css'></a><a href='http://example.com/sub/dir/example.com/css/styles.css'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir/example.com/css/styles.css'></a><a href='//192.168.0.4:3002/sub/dir/example.com/css/styles.css'></a>";
            assert.equal(actual, expected);
        });
    });
    describe("when rewriting 'localhost:8000' links", () => {

        var regex, fn;
        var testRegex;
        before(() => {
            var rewrite = utils.rewriteLinks({hostname: "localhost:8000", port: 80}, proxyUrl);
            regex = rewrite.match;
            fn = rewrite.fn;
            testRegex = function (string) {
                return string.replace(regex, fn);
            };
        });
        it("should use the regex to replace links (1)", () => {
            var actual = testRegex("<a href='http://localhost:8000'></a>");
            var expected = "<a href='//192.168.0.4:3002/'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (1)", () => {
            var actual = testRegex("<a href='http://localhost:8000'></a>");
            var expected = "<a href='//192.168.0.4:3002/'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (2)", () => {
            var actual = testRegex("<a href='http://localhost:8000/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (3)", () => {
            var actual = testRegex("<a href='http://localhost:8000/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (4)", () => {
            var actual = testRegex("<a href='https://localhost:8000/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (5)", () => {
            var actual = testRegex("<a href='/localhost:8000/sub/dir'></a>");
            var expected = "<a href='/192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links (6)", () => {
            var actual = testRegex("<a href='localhost:8000/sub/dir'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir'></a>";
            assert.equal(actual, expected);
        });
        it("should use the regex to replace links that contain hashes", () => {
            var actual = testRegex("<a href='http://localhost:8000/sub/dir/#search'></a>");
            var expected = "<a href='//192.168.0.4:3002/sub/dir/#search'></a>";
            assert.equal(actual, expected);
        });
    });
});