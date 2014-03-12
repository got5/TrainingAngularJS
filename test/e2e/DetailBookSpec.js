/**
 * Created by pierremarot on 12/03/2014.
 */
describe("Detail Book Page", function () {

    beforeEach(function(){
        browser.get('http://localhost:3000/#/book/1');
    });

    it("Check Book Name", function () {
        expect(element(by.binding('product.name')).getText()).toEqual('ANGULARJS');
    });

});