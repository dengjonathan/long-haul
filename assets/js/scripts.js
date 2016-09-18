// A $( document ).ready() block.
$( document ).ready(function() {

	// DropCap.js
	var dropcaps = document.querySelectorAll(".dropcap");
	window.Dropcap.layout(dropcaps, 2);

	// Responsive-Nav
	var nav = responsiveNav(".nav-collapse");

	// Round Reading Time
    $(".time").text(function (index, value) {
      return Math.round(parseFloat(value));
    });

  // generate random pithy saying
  var genSaying = function() {
    var sayings = [
      ' drives a Subie hatchback',
      '\'s dog has really short legs',
      ' builds the future',
      ' dreams big dreams',
      ' can\'t smell things that well',
      ' likes nature',
      ' wakes up early and goes to bed late',
      ' orders two lunches',
      ' frankly, is a little low-brow',
      ' has the legs of a sloth',
      ' thinks flat is better than nested',
      ' tries to minimize side effects',
      ' thinks namespaces are a honking good idea',
      ' is traversing the graph',
      ' invested in Hooli before it was public',
      ' wears socks and sandals',
      ' is kind of a brogrammer',
      ' likes reading Raymond Carver',
      ' laughs really awkwardly',
      ' openly admits to liking G-Eazy',
      ' dates a lawyer, but is still cool, really',
      ' collects cotton sweatshirts',
      ' hacks the world',
      ' is a fumbler with RegEx',
      ' thinks practicality beats purity',
      ' is a JavaScript nerd',
      ' is not afraid to go where things are hacky',
      ' is making this 😜 face',
      ' would rather be 🏊',
      ' ships the code'
    ];
    var index = Math.floor(Math.random() * sayings.length);
    $('.pithy-saying').text(sayings[index]);
  }
    $('.pithy-saying').click(genSaying);
    genSaying();
});


