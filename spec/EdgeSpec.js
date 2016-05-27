describe('Edge', function() {
    var myEdge;
    var la = new Vertex("LA");
    var nyc = new Vertex("NYC");
    beforeEach(function() {
        myEdge = new Edge(nyc, la, 10);
    });

    describe('init', function() {
    	it('initializes with a source vertex', function() {
    		expect(myEdge.source).toEqual(nyc);
    	});

    	it('initializes with a destination vertex', function() {
    		expect(myEdge.dest).toEqual(la);
    	});

    	it('initializes with a weight', function() {
    		expect(myEdge.weight).toEqual(10);
    	});



    });
});