function contriblisten() {
  $(".contrib").click(function() {
    var talk = $(this).attr("talk")
    var position = $(this).offset();
    var contain = $("#talk-content");
    contain.show();
    var contposition = contain.offset()
    contposition.top = position.top;
    contain.offset(contposition);
    contain.html(getTalk(talk));
  });
  $(".invited").click(function() {
    var talk = $(this).attr("talk")
    var position = $(this).offset();
    var contain = $("#talk-content");
    contain.show();
    var contposition = contain.offset()
    contposition.top = position.top;
    contain.offset(contposition);
    contain.html(getTalk(talk));
  });
}

function getTalk(talk) {
  var talks = {
    "day11": "Quantum advantage with shallow circuits <br>David Gosset",
    "day12": "Architectures for quantum simulation showing quantum supremacy <br> Juan Bermejo-Vega, Dominik Hangleiter, Martin Schwarz, Robert Raussendorf and Jens Eisert",
    "day13": "Improved reversible and quantum circuits for Karatsuba-based integer multiplication <br> Alex Parent, Martin Roetteler and Michele Mosca",
    "day14": "A new Holant dichotomy inspired by quantum computation <br>Miriam Backens",
    "day15": "Universal Quantum Hamiltonians <br>Stephen Piddock",
    "day16": "Reinforcement Learning Using Quantum Boltzmann Machines <br>Anna Levit, Daniel Crawford, Jaspreet Oberoi, Pooya Ronagh and Navid Ghadermarzy",
    "day17": "Extended Learning Graphs for Triangle Finding<br> Titouan Carette, Frederic Magniez and Mathieu Lauriere",
    "day38": "Guaranteed recovery of quantum processes from few measurements<br> Martin Kliesch, Richard Kueng, Jens Eisert and David Gross",
    "day39": "Multi-qubit Randomized Benchmarking Using Few Samples <br>Jonas Helsen, Joel J. Wallman, Steven T. Flammia and Stephanie Wehner",
    "day310": "Superfast maximum likelihood reconstruction for quantum tomography Jiangwei Shang, Zhengyun Zhang and Hui Khoon Ng",
    "day21": "BQP-completeness of Scattering in Scalar Quantum Field Theory<br>Stephen Jordan",
    "day22": "The Complexity of Simulating Local Measurements on Quantum Systems<br> Sevag Gharibian and Justin Yirka",
    "day23": "Multiparty Quantum Communication Complexity of Triangle Finding<br> Francois Le Gall and Shogo Nakajima",
    "day24": "Quantum hedging in two-round prover-verifier interactions<br> Srinivasan Arunachalam, Abel Molina and Vincent Russo",
    "day25": "Moderate Deviation Analysis for Classical-Quantum Channels and Quantum Hypothesis Testing<br> Hao-Chung Cheng and Min-Hsiu Hsieh<br> Merged with <br>Moderate deviation analysis for classical communication over quantum channels Christopher Chubb, Vincent Tan and Marco Tomamichel",
    "day26": "Gaussian states minimize the output entropy of one-mode quantum Gaussian channels <br>Giacomo De Palma, Dario Trevisan and Vittorio Giovannetti",
    "day27": "The third law as a single inequality<br>Henrik Wilming and Rodrigo Gallego",
    "day28": "Mixing properties of stochastic quantum Hamiltonians<br>Emilio Onorati, Oliver Buerschaper, Martin Kliesch, Winton Brown, Albert H. Werner and Jens Eisert",
    "day29": "Simulating positive-operator-valued measures with projective measurements<br>Michal Oszmaniec, Leonardo Guerini, Peter Wittek and Anotnio Ac&iacute;n",
    "day210": "Efficient unitary designs with nearly time-independent Hamiltonian dynamics<br> Yoshifumi Nakata, Christoph Hirche, Masato Koashi and Andreas Winter",
    "day211": "Code properties from holographic geometries<br>Fernando Pastawski and John Preskill",
    "day212": "Entanglement renormalization, quantum error correction, and bulk causality<br> Michael Kastoryano and Isaac Kim",
    "day31": "Hyperbolic and Semi-Hyperbolic Surface Codes for Quantum Storage<br> Barbara Terhal",
    "day32": "Limits on the storage of quantum information in a volume of space<br>Steve Flammia, Jeongwan Haah, Michael Kastoryano and Isaac Kim",
    "day33": "Approximate symmetries of Hamiltonians<br> Christopher Chubb and Steve Flammia",
    "day34": "Entanglement and Nonlocality in Infinite 1D Systems<br> Zizhu Wang, Sukhwinder Singh and Miguel Navascu&eacute;s",
    "day35": "Device-independent randomness generation with sublinear shared quantum resources<br>C&eacute;dric Bamps, Serge Massar and Stefano Pironio",
    "day36": "Quantum-Secure Symmetric-Key Cryptography Based on Hidden Shifts<br> Gorjan Alagic and Alexander Russell",
    "day37": "Provably secure key establishment against quantum adversaries<br>Alexandrs Belovs, Gilles Brassard, Peter H&oslash;yer, Marc Kaplan, Sophie Laplante and Louis Salvail",
    "day18": "All Pure Bipartite Entangled States can be Self-Tested<br> Andrea Coladangelo, Koon Tong Goh and Valerio Scarani",
    "day19": "A single entangled system is an unbounded source of nonlocal correlations and of certified random numbers<br>Florian John Curchod, Markus Johansson, Remigiusz Augusiak, Matty Hoban, Peter Wittek and Antonio Ac&iacute;n",
    "day110": "Semi-device-independent framework based on natural physical assumptions<br>Thomas Van Himbeeck, Erik Woodhead, Nicolas Cerf, Raul Garcia-Patron and StefanoPironio",
  };

return(talks[talk])
}


$(document).ready(function() {
    contriblisten();
    $("#talk-content").hide()
});
