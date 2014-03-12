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

    it('The price change when updating quantity', function () {
        expect(element(by.binding('product.price * quantity')).getText()).toEqual('$15.34');
        var qty = element(by.model('quantity'));
        qty.clear();
        /*browser.debugger();*/
        qty.sendKeys(2);
        expect(element(by.binding('product.price * quantity')).getText()).toEqual('$30.68');
    });

    it('The image url is correct', function () {
        expect(element(by.css('.photo')).getAttribute('src')).toEqual('http://localhost:3000/img/catalog/1.jpg');
    });

});