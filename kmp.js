"use strict";


// Searches for the given pattern string in the given text string using the Knuth-Morris-Pratt string matching algorithm.
// If the pattern is found, this returns the index of the start of the earliest match in 'text'. Otherwise -1 is returned.
function kmpSearch(pattern, text) {
	if (pattern.length == 0)
		return 0;  // Immediate match
	
	// Compute longest suffix-prefix table
	var lsp = [0];  // Base case
	for (let i = 1; i < pattern.length; i++) {          
        
        var j = lsp[i - 1];  // Start by assuming we're extending the previous LSP
        console.log({j});

		while (j > 0 && pattern.charAt(i) != pattern.charAt(j))
			j = lsp[j - 1];
		if (pattern.charAt(i) == pattern.charAt(j))
			{j++;}
		lsp.push(j);
    }
    
    console.log(lsp);
    
	
	// Walk through text string
	var j = 0;  // Number of chars matched in pattern
	for (var i = 0; i < text.length; i++) {
		while (j > 0 && text.charAt(i) != pattern.charAt(j))
			j = lsp[j - 1];  // Fall back in the pattern
		if (text.charAt(i) == pattern.charAt(j)) {
			j++;  // Next char matched, increment position
			if (j == pattern.length)
				return i - (j - 1);
		}
	}
	return -1;  // Not found
}

let returnedValue = kmpSearch("abacabab","abacaabaccabacab");

console.log(returnedValue);
