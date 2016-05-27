describe('Vertex', function() {
    var myVertex;

    beforeEach(function() {
        myVertex = new Vertex("NYC");
    });


    describe('init', function() {
    	it('initializes with a label', function() {
    		expect(myVertex.label).toEqual("NYC");
    	});
    });
});